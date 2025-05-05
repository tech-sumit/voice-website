import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import siteConfig from '@/config/site.json';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Define maximum length for phone field
const MAX_LENGTH = {
  phone: 20,
};

// Simple in-memory rate limiting (reset on server restart)
// In production, use Redis or similar for persistent rate limiting
const ipRequestCounts = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_MAX = 2; // Max requests per window
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour window

// Validate phone number format
function isValidPhone(phone: string): boolean {
  if (!phone) return false;
  
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

// Verify reCAPTCHA token with Google
async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    
    // If no secret key, skip verification in development
    if (!recaptchaSecret) {
      console.warn('RECAPTCHA_SECRET_KEY not configured, skipping verification');
      return true;
    }
    
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${recaptchaSecret}&response=${token}`,
    });
    
    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
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
    
    const data = await request.json();
    const { phoneNumber, captchaToken } = data;
    
    // Validate phone number
    if (!phoneNumber) {
      return NextResponse.json({ 
        error: 'Phone number is required' 
      }, { 
        status: 400 
      });
    }
    
    // Validate reCAPTCHA token
    if (!captchaToken) {
      return NextResponse.json({ 
        error: 'CAPTCHA verification failed. Please try again.' 
      }, { 
        status: 400 
      });
    }
    
    // Verify reCAPTCHA token with Google
    const isValidCaptcha = await verifyRecaptcha(captchaToken);
    if (!isValidCaptcha) {
      return NextResponse.json({ 
        error: 'CAPTCHA verification failed. Please refresh the page and try again.' 
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
    
    // Return validation errors if any
    if (validationErrors.length > 0) {
      return NextResponse.json({ 
        error: 'Validation failed', 
        details: validationErrors 
      }, { 
        status: 400 
      });
    }
    
    // Sanitize the phone number
    const sanitizedPhone = sanitizeInput(phoneNumber);
    
    // If Resend API key is not configured, just log the message and return success
    if (!process.env.RESEND_API_KEY) {
      console.log('RESEND_API_KEY not found. Callback request (not sent):');
      console.log({ phoneNumber: sanitizedPhone });
      return NextResponse.json({ 
        success: true, 
        warning: 'Notification not sent - email service not configured' 
      });
    }
    
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
                <span class="label">Phone Number:</span> <a href="tel:${sanitizedPhone}">${sanitizedPhone}</a>
              </div>
              
              <div class="info-item">
                <span class="label">Requested on:</span> ${new Date().toLocaleString()}
              </div>
              
              <p>This customer is waiting for an immediate callback. Please contact them as soon as possible.</p>
              
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
    const { data: emailData, error } = await resend.emails.send({
      from: `Callback Request <noreply@${process.env.NEXT_PUBLIC_SITE_DOMAIN || 'example.com'}>`,
      to: siteConfig.company.email,
      subject: `🔴 URGENT: New callback request - ${sanitizedPhone}`,
      html: emailHtml,
    });
    
    if (error) {
      console.error('Email service error:', error);
      return NextResponse.json(
        { error: 'Unable to process your request at this time' },
        { status: 500 }
      );
    }
    
    // Return success with minimal information
    return NextResponse.json({ 
      success: true 
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store'
      }
    });
    
  } catch (error) {
    console.error('Callback request error:', error);
    // Generic error message to avoid leaking implementation details
    return NextResponse.json(
      { error: 'Unable to process your request' },
      { status: 500 }
    );
  }
} 