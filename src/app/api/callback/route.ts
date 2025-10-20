import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import siteConfig from '@/config/site.json';
import supportedLanguages from '@/config/languages';
import { initiateCall, logCallRequest } from '@/lib/call';

// Do NOT initialize Resend at module scope to avoid build-time errors
// when RESEND_API_KEY is not set. Initialize within the handler after checks.

// Define maximum length for phone field
const MAX_LENGTH = {
  phone: 20,
};

// Simple in-memory rate limiting (reset on server restart)
// In production, use Redis or similar for persistent rate limiting
const ipRequestCounts = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_MAX = 50; // Max requests per window
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour window

// Validate phone number format
function isValidPhone(phone: string): boolean {
  if (!phone) return false;
  
  // Enhanced phone validation - properly handles international formats with country codes
  // Allows for formats like: +1-123-456-7890, +44 7911 123456, etc.
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]*[0-9]{1,5}[-\s.]*[0-9]{1,5}[-\s.]*[0-9]{1,9}$/;
  
  // Extract digits only for length validation
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Valid international numbers should have between 7 and 15 digits
  // (including country code but excluding formatting characters)
  return phoneRegex.test(phone) && digitsOnly.length >= 7 && digitsOnly.length <= 15;
}

// Sanitize input to prevent XSS attacks
function sanitizeInput(input: string): string {
  if (!input) return '';
  
  // Convert to string if it's not already
  const str = String(input);
  
  // Replace HTML tags with their encoded equivalents
  return str
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// Verify reCAPTCHA token
async function verifyRecaptcha(token: string, action: string = 'CALLBACK'): Promise<boolean> {
  try {
    // Get the reCAPTCHA secret key
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    
    if (recaptchaSecret) {
      console.log('🔒 Using Direct reCAPTCHA API verification');
      
      // Make the verification request to Google's API
      const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
      const response = await fetch(verifyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: recaptchaSecret,
          response: token,
          // You can optionally include the user's IP
          // remoteip: userIP
        })
      });
      
      if (!response.ok) {
        console.error('❌ reCAPTCHA verification failed:', response.statusText);
        return false;
      }
      
      const data = await response.json();
      
      // Check if verification was successful
      if (!data.success) {
        console.error('❌ reCAPTCHA verification failed with error codes:', data['error-codes']);
        return false;
      }
      
      // Check if the action matches (for v3)
      if (data.action && data.action !== action) {
        console.error(`❌ Action mismatch. Expected: ${action}, Got: ${data.action}`);
        return false;
      }
      
      // For v3, check the score
      if (data.score !== undefined) {
        console.log(`✅ reCAPTCHA verification successful with score: ${data.score}`);
        return data.score >= 0.5; // Adjust threshold as needed
      }
      
      // Success without score (e.g. for v2)
      console.log('✅ reCAPTCHA verification successful');
      return true;
    }
    
    // No verification method available
    console.warn('⚠️ No reCAPTCHA verification method configured. Missing RECAPTCHA_SECRET_KEY');
    
    // In production, fail verification when not configured
    if (process.env.NODE_ENV === 'production') {
      console.error('❌ reCAPTCHA verification failed: Missing configuration in production');
      return false;
    }
    
    // In development, allow without verification
    console.warn('⚠️ Allowing request without reCAPTCHA verification (DEVELOPMENT MODE ONLY)');
    return true;
  } catch (error) {
    console.error('❌ reCAPTCHA verification error:', error);
    return false;
  }
}

// Check rate limit for an IP address
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = ipRequestCounts.get(ip);
  
  if (!record) {
    // First request from this IP
    ipRequestCounts.set(ip, { count: 1, timestamp: now });
    return true;
  }
  
  // Reset counter if outside window
  if (now - record.timestamp > RATE_LIMIT_WINDOW_MS) {
    ipRequestCounts.set(ip, { count: 1, timestamp: now });
    return true;
  }
  
  // Check if over limit
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  // Increment counter
  record.count += 1;
  ipRequestCounts.set(ip, record);
  return true;
}

// Validate language code against supported languages
function isValidLanguage(language: string): boolean {
  if (!language) return false;
  return supportedLanguages.some(lang => lang.code === language);
}

export async function POST(request: Request) {
  try {
    // Get IP address for rate limiting (using X-Forwarded-For or direct)
    // In production, you'd use a more robust solution depending on your hosting
    const ip = request.headers.get('x-forwarded-for') || 'unknown-ip';
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ 
        error: 'Too many requests, please try again later'
      }, { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': RATE_LIMIT_MAX.toString(),
          'X-RateLimit-Reset': new Date(Date.now() + RATE_LIMIT_WINDOW_MS).toISOString()
        }
      });
    }
    
    const data = await request.json();
    const { phoneNumber, language, captchaToken, name, expectedFlow, templateId } = data;
    
    // Log template ID if available
    console.log(`Using template: ${templateId || 'custom' || expectedFlow}`);
    
    // Validate phone number
    if (!phoneNumber) {
      return NextResponse.json({ 
        error: 'Phone number is required' 
      }, { 
        status: 400 
      });
    }
    
    // Validate language
    if (!language) {
      return NextResponse.json({ 
        error: 'Language selection is required' 
      }, { 
        status: 400 
      });
    }

    if (!isValidLanguage(language)) {
      return NextResponse.json({ 
        error: 'Selected language is not supported' 
      }, { 
        status: 400 
      });
    }
    
    // Validate reCAPTCHA token
    if (!captchaToken) {
      return NextResponse.json({ 
        error: 'Security verification failed. Please try again.' 
      }, { 
        status: 400 
      });
    }
    
    // Verify reCAPTCHA token
    const isValidCaptcha = await verifyRecaptcha(captchaToken, 'CALLBACK');
    if (!isValidCaptcha) {
      return NextResponse.json({ 
        error: 'Security verification failed. Please refresh the page and try again.' 
      }, { 
        status: 403 
      });
    }
    
    // Validate input length and format
    const validationErrors = [];
    
    if (phoneNumber.length > MAX_LENGTH.phone) {
      validationErrors.push(`Phone number must be ${MAX_LENGTH.phone} characters or less`);
    }
    
    if (!isValidPhone(phoneNumber)) {
      validationErrors.push('Please provide a valid phone number');
    }
    
    // Check if phone number starts with +91 (Indian numbers only)
    if (!phoneNumber.includes('+91')) {
      validationErrors.push('Currently, we only support Indian phone numbers (+91)');
    }
    
    // Validate expected flow
    if (!expectedFlow) {
      validationErrors.push('Conversation flow is required');
    }
    
    // Limit expected conversation flow length to 5000 characters
    if (expectedFlow && expectedFlow.length > 5000) {
      validationErrors.push('Conversation flow must be 5000 characters or less');
    }
    
    // Return validation errors if any
    if (validationErrors.length > 0) {
      return NextResponse.json({ 
        error: validationErrors.join('. ') 
      }, { 
        status: 400 
      });
    }
    
    // Sanitize the inputs
    const sanitizedPhone = sanitizeInput(phoneNumber);
    const sanitizedLanguage = sanitizeInput(language);
    
    // Use default values when name/flow not provided
    const defaultName = 'Customer';
    const defaultFlow = `You are an AI voice-agent for voice-ai company. 
Speak in friendly, professional English. 

1. Greet & Identify  
   "Hello! This is the AI assistant at voice-ai. "

2. Invite Inquiry  
   "How can I help you today?"

3. Handle Questions  
   • If the question is about a product or feature, give a concise, accurate answer.  
   • If the caller asks about pricing and specific details tell them to visit the website - pixpoc.in.  
   • After each answer, ask:  
     "Is there anything else you'd like to know?"  
   • Loop until the caller has no further questions.

4. Confirm Satisfaction  
   "Have I answered all your questions, or is there anything else I can help you with?"

5. Close Politely  
   "Thank you for chatting with voice-ai. Have a great day!"
`;

    
    // Use provided values or defaults
    const sanitizedName = sanitizeInput(name || defaultName);
    const sanitizedExpectedFlow = sanitizeInput(expectedFlow || defaultFlow);
    
    // Initialize response objects
    let emailResult = { success: false };
    
    // Initiate the call using our call service
    const callResult = await initiateCall({
      phoneNumber: sanitizedPhone,
      language: sanitizedLanguage,
      name: sanitizedName,
      expectedFlow: sanitizedExpectedFlow
    });
    
    // Log the call request for monitoring and debugging
    logCallRequest(
      sanitizedPhone, 
      sanitizedLanguage, 
      callResult.success, 
      callResult.callId, 
      callResult.error
    );
    
    // If Resend API key is not configured, just log the message and continue
    if (!process.env.RESEND_API_KEY) {
      console.log('RESEND_API_KEY not found. Callback request (not sent):');
      console.log({ phoneNumber: sanitizedPhone });
      emailResult = { success: false };
    } else {
      // Initialize Resend only when the API key is present
      const resend = new Resend(process.env.RESEND_API_KEY as string);
      // Format the email notification with a professional template
      const emailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>New Callback Request</title>
            <style type="text/css">
              body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; line-height: 1.5; }
              table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse !important; }
              img { -ms-interpolation-mode: bicubic; max-width: 100%; }
              .container { max-width: 600px; margin: 0 auto; }
              .header { background-color: #6366F1; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background-color: #ffffff; padding: 20px; }
              .footer { background-color: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
              .info-item { padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
              .info-item:last-child { border-bottom: none; }
              .label { font-weight: bold; color: #374151; }
              h1 { margin: 0; font-size: 22px; font-weight: bold; }
              .logo { font-size: 24px; font-weight: bold; color: white; margin-bottom: 10px; }
              .urgent { color: #ef4444; font-weight: bold; }
              .button { display: inline-block; background-color: #6366F1; color: white; text-decoration: none; padding: 10px 20px; border-radius: 4px; margin-top: 15px; }
              .call-status { margin-top: 15px; padding: 10px; border-radius: 4px; }
              .call-success { background-color: #ecfdf5; color: #059669; }
              .call-error { background-color: #fef2f2; color: #dc2626; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">${siteConfig.name}</div>
                <div class="urgent">⚡ URGENT: New Callback Request</div>
              </div>
              
              <div class="content">
                <p>You've received a new callback request from your website:</p>
                
                <div class="info-item">
                  <span class="label">Phone Number:</span> <a href="tel:${sanitizedPhone}">${sanitizedPhone}</a> <span class="label">(International Format)</span>
                </div>
                
                <div class="info-item">
                  <span class="label">Preferred Language:</span> ${supportedLanguages.find(lang => lang.code === sanitizedLanguage)?.name || sanitizedLanguage}
                </div>
                
                <div class="info-item">
                  <span class="label">Requested on:</span> ${new Date().toLocaleString()}
                </div>
                
                ${callResult.success 
                  ? `<div class="call-status call-success">
                      ✅ Automated call has been initiated. Call ID: ${callResult.callId || 'Not available'}
                    </div>`
                  : `<div class="call-status call-error">
                      ❌ Automated call could not be initiated: ${callResult.error || 'Unknown error'}. 
                      Please call the customer manually as soon as possible.
                    </div>`
                }
                
                <p>This customer is waiting for an immediate callback. ${!callResult.success ? 'Please contact them as soon as possible.' : ''}</p>
                
                <a href="tel:${sanitizedPhone}" class="button">Call Customer Now</a>
              </div>
              
              <div class="footer">
                <p>This notification was sent from the callback form on your ${siteConfig.name} website.</p>
                <p>&copy; ${new Date().getFullYear()} ${siteConfig.company.name}. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `;
      
      // Send notification email using Resend
      const { error } = await resend.emails.send({
        from: `Callback Request <noreply@${process.env.NEXT_PUBLIC_SITE_DOMAIN || 'example.com'}>`,
        to: siteConfig.company.email,
        subject: `🔴 URGENT: New callback request - ${sanitizedPhone}`,
        html: emailHtml,
      });
      
      if (error) {
        console.error('Email service error:', error);
        emailResult = { success: false };
      } else {
        emailResult = { success: true };
      }
    }
    
    // Return success if either email or call was successful
    if (emailResult.success || callResult.success) {
      const response = NextResponse.json({ 
        success: true,
        callInitiated: callResult.success,
        emailSent: emailResult.success
      });
      
      // Set cache control headers
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      response.headers.set('Pragma', 'no-cache');
      response.headers.set('Expires', '0');
      response.headers.set('Surrogate-Control', 'no-store');
      
      return response;
    } else {
      // Both email and call failed
      return NextResponse.json(
        { error: 'Unable to process your request at this time' },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('Callback request error:', error);
    // Generic error message to avoid leaking implementation details
    return NextResponse.json(
      { error: 'Unable to process your request' },
      { status: 500 }
    );
  }
} 