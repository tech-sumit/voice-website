import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import siteConfig from '@/config/site.json';

// Simple in-memory rate limiting (reset on server restart)
const ipRequestCounts = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_MAX = 5; // Max requests per window
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour window

// Input validation functions
function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// Sanitize input to prevent XSS attacks
function sanitizeInput(input: string): string {
  if (!input) return '';
  const str = String(input);
  return str.trim().replace(/[<>&"']/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '"': return '&quot;';
      case "'": return '&#x27;';
      default: return c;
    }
  });
}

// Verify reCAPTCHA token
async function verifyRecaptcha(token: string, action: string = 'CONTACT'): Promise<boolean> {
  try {
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    
    if (recaptchaSecret) {
      const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
      const response = await fetch(verifyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: recaptchaSecret,
          response: token
        })
      });
      
      if (!response.ok) return false;
      
      const data = await response.json();
      if (!data.success) return false;
      if (data.action && data.action !== action) return false;
      if (data.score !== undefined && data.score < 0.5) return false;
      
      return true;
    }
    
    if (process.env.NODE_ENV === 'production') {
      console.error('❌ reCAPTCHA verification failed: Missing configuration in production');
      return false;
    }
    
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
    ipRequestCounts.set(ip, { count: 1, timestamp: now });
    return true;
  }
  
  if (now - record.timestamp > RATE_LIMIT_WINDOW_MS) {
    ipRequestCounts.set(ip, { count: 1, timestamp: now });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  record.count += 1;
  ipRequestCounts.set(ip, record);
  return true;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown-ip';
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ 
        error: 'Too many requests, please try again later'
      }, { status: 429 });
    }
    
    const formData = await request.json();
    const { email, captchaToken } = formData;
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }
    
    // Verify reCAPTCHA token
    if (!captchaToken) {
      return NextResponse.json({ error: 'Security verification failed' }, { status: 400 });
    }
    
    const isValidCaptcha = await verifyRecaptcha(captchaToken, 'CONTACT');
    if (!isValidCaptcha) {
      return NextResponse.json({ error: 'Security verification failed' }, { status: 403 });
    }
    
    const sanitizedEmail = sanitizeInput(email).toLowerCase();
    
    // If Resend API key is not configured, just log the message and return success
    if (!process.env.RESEND_API_KEY) {
      console.log('RESEND_API_KEY not found. Demo request (not sent):');
      console.log({ email: sanitizedEmail });
      return NextResponse.json({ 
        success: true, 
        warning: 'Email not sent - email service not configured' 
      });
    }
    
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
          <title>New Demo Request</title>
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
            .urgent { color: #fbbf24; font-weight: bold; }
            .button { display: inline-block; background-color: #6366F1; color: white; text-decoration: none; padding: 10px 20px; border-radius: 4px; margin-top: 15px; }
            .source-badge { display: inline-block; background-color: #f3f4f6; color: #374151; padding: 5px 10px; border-radius: 4px; font-size: 12px; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">${siteConfig.name}</div>
              <div class="urgent">🚀 New Demo Request</div>
            </div>
            
            <div class="content">
              <p>You've received a new demo request from your website:</p>
              
              <div class="info-item">
                <span class="label">Email:</span> <a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a>
              </div>
              
              <div class="info-item">
                <span class="label">Source:</span> Homepage Hero Section
              </div>
              
              <div class="info-item">
                <span class="label">Requested on:</span> ${new Date().toLocaleString()}
              </div>
              
              <p style="margin-top: 20px;">This prospect is interested in learning more about ${siteConfig.name}. Please reach out to them promptly to schedule a demo.</p>
              
              <a href="mailto:${sanitizedEmail}" class="button">Reply to Prospect</a>
            </div>
            
            <div class="footer">
              <p>This notification was sent from the demo request form on your ${siteConfig.name} website.</p>
              <p>&copy; ${new Date().getFullYear()} ${siteConfig.company.name}. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;
    
    // Send notification email using Resend
    // Use RESEND_FROM_EMAIL env var if set, otherwise use onboarding domain for testing
    const fromEmail: string = process.env.RESEND_FROM_EMAIL || `Demo Request <onboarding@resend.dev>`;
    
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: 'founders@pixpoc.in',
      subject: `🚀 New Demo Request from ${sanitizedEmail}`,
      html: emailHtml,
      replyTo: sanitizedEmail,
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
    console.error('Demo request error:', error);
    // Generic error message to avoid leaking implementation details
    return NextResponse.json(
      { error: 'Unable to process your request' },
      { status: 500 }
    );
  }
}

