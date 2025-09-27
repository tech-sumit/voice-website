import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import siteConfig from '@/config/site.json';

// Initialize Resend with your API key
// Get your API key from https://resend.com after signing up
// Add RESEND_API_KEY to your .env.local file
// NOTE: Do not initialize Resend at module scope to avoid build-time errors
// when RESEND_API_KEY is not set. Initialize inside the handler after checks.

// Define maximum lengths for fields
const MAX_LENGTHS = {
  name: 100,
  email: 100,
  company: 100,
  phone: 20,
  message: 5000, // 5000 characters max for message
};

// Simple in-memory rate limiting (reset on server restart)
// In production, use Redis or similar for persistent rate limiting
const ipRequestCounts = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_MAX = 2; // Max requests per window
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour window

// Input validation functions
function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function isValidPhone(phone: string): boolean {
  // Allow empty phone (it's optional)
  if (!phone) return true;
  
  // Basic phone validation - allows various formats with optional country codes
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone);
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
async function verifyRecaptcha(token: string, action: string = 'CONTACT'): Promise<boolean> {
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
          response: token
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
    
    const formData = await request.json();
    const { name, email, company, phone, message, captchaToken } = formData;
    
    // Initial validation - required fields
    if (!name || !email || !message) {
      return NextResponse.json({ 
        error: 'Name, email, and message are required' 
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
    const isValidCaptcha = await verifyRecaptcha(captchaToken, 'CONTACT');
    if (!isValidCaptcha) {
      return NextResponse.json({ 
        error: 'Security verification failed. Please refresh the page and try again.' 
      }, { 
        status: 403 
      });
    }
    
    // Validate input length and format
    const validationErrors = [];
    
    // Name validation
    if (name.length > MAX_LENGTHS.name) {
      validationErrors.push(`Name must be ${MAX_LENGTHS.name} characters or less`);
    }
    
    // Email validation
    if (email.length > MAX_LENGTHS.email) {
      validationErrors.push(`Email must be ${MAX_LENGTHS.email} characters or less`);
    }
    if (!isValidEmail(email)) {
      validationErrors.push('Please provide a valid email address');
    }
    
    // Company validation (optional field)
    if (company && company.length > MAX_LENGTHS.company) {
      validationErrors.push(`Company name must be ${MAX_LENGTHS.company} characters or less`);
    }
    
    // Phone validation (optional field)
    if (phone && phone.length > MAX_LENGTHS.phone) {
      validationErrors.push(`Phone number must be ${MAX_LENGTHS.phone} characters or less`);
    }
    if (phone && !isValidPhone(phone)) {
      validationErrors.push('Please provide a valid phone number');
    }
    
    // Message validation
    if (message.length > MAX_LENGTHS.message) {
      validationErrors.push(`Message must be ${MAX_LENGTHS.message} characters or less`);
    }
    
    // Return validation errors if any
    if (validationErrors.length > 0) {
      return NextResponse.json({ 
        error: 'Validation failed', 
        details: validationErrors 
      }, { 
        status: 400 
      });
    }
    
    // Sanitize all inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email).toLowerCase(),
      company: company ? sanitizeInput(company) : '',
      phone: phone ? sanitizeInput(phone) : '',
      message: sanitizeInput(message),
    };
    
    // If Resend API key is not configured, just log the message and return success
    if (!process.env.RESEND_API_KEY) {
      console.log('RESEND_API_KEY not found. Contact form submission (not sent):');
      // Don't log full data to avoid exposing personal information
      console.log('Received contact form submission - email service not configured');
      return NextResponse.json({ 
        success: true, 
        warning: 'Email not sent - email service not configured' 
      });
    }
    
    // Initialize Resend only when the API key is present
    const resend = new Resend(process.env.RESEND_API_KEY as string);
    
    // Format the email content with a beautiful, professional template
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <title>New Contact Form Submission</title>
          <style type="text/css">
            body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; line-height: 1.5; }
            table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse !important; }
            img { -ms-interpolation-mode: bicubic; max-width: 100%; }
            .container { max-width: 600px; margin: 0 auto; }
            .header { background-color: #6366F1; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #ffffff; padding: 20px; }
            .footer { background-color: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
            .message-box { background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin-top: 20px; }
            .info-item { padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
            .info-item:last-child { border-bottom: none; }
            .label { font-weight: bold; color: #374151; }
            h1 { margin: 0; font-size: 22px; font-weight: bold; }
            h2 { font-size: 18px; color: #374151; margin-top: 25px; margin-bottom: 10px; }
            .logo { font-size: 24px; font-weight: bold; color: white; margin-bottom: 10px; }
            .message-text { white-space: pre-line; color: #4b5563; }
            .button { display: inline-block; background-color: #6366F1; color: white; text-decoration: none; padding: 10px 20px; border-radius: 4px; margin-top: 15px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">${siteConfig.name}</div>
              <div>New Contact Form Submission</div>
            </div>
            
            <div class="content">
              <p>You've received a new message from your website contact form:</p>
              
              <div class="info-item">
                <span class="label">Name:</span> ${sanitizedData.name}
              </div>
              
              <div class="info-item">
                <span class="label">Email:</span> <a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a>
              </div>
              
              ${sanitizedData.company ? `
                <div class="info-item">
                  <span class="label">Company:</span> ${sanitizedData.company}
                </div>
              ` : ''}
              
              ${sanitizedData.phone ? `
                <div class="info-item">
                  <span class="label">Phone:</span> <a href="tel:${sanitizedData.phone}">${sanitizedData.phone}</a>
                </div>
              ` : ''}
              
              <h2>Message:</h2>
              <div class="message-box">
                <div class="message-text">${sanitizedData.message.replace(/\n/g, '<br>')}</div>
              </div>
              
              <a href="mailto:${sanitizedData.email}" class="button">Reply to ${sanitizedData.name}</a>
            </div>
            
            <div class="footer">
              <p>This email was sent from the contact form on your ${siteConfig.name} website.</p>
              <p>&copy; ${new Date().getFullYear()} ${siteConfig.company.name}. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;
    
    // Send email using Resend with sanitized data
    const { error } = await resend.emails.send({
      from: `Contact Form <noreply@${process.env.NEXT_PUBLIC_SITE_DOMAIN || 'example.com'}>`,
      to: siteConfig.company.email,
      subject: `New contact form submission from ${sanitizedData.name}`,
      html: emailHtml,
      replyTo: sanitizedData.email,
    });
    
    if (error) {
      console.error('Email service error:', error);
      return NextResponse.json(
        { error: 'Unable to process your request at this time' },
        { status: 500 }
      );
    }
    
    // Return success with minimal information and security headers
    return NextResponse.json(
      { success: true },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'Surrogate-Control': 'no-store'
        }
      }
    );
    
  } catch (error) {
    console.error('Contact form error:', error);
    // Generic error message to avoid leaking implementation details
    return NextResponse.json(
      { error: 'Unable to process your request' },
      { status: 500 }
    );
  }
} 