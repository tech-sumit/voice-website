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
    
    if (!process.env.RESEND_API_KEY) {
      console.log('RESEND_API_KEY not found. Demo request received for:', sanitizedEmail);
      return NextResponse.json({ success: true, warning: 'Email not sent - config missing' });
    }
    
    const resend = new Resend(process.env.RESEND_API_KEY as string);
    
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Demo Request</title>
          <style>
            body { font-family: sans-serif; line-height: 1.5; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #6366F1; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #fff; padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 8px 8px; }
            .label { font-weight: bold; color: #555; }
            .button { display: inline-block; background: #6366F1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Demo Request</h2>
            </div>
            <div class="content">
              <p>You have received a new demo request from the website.</p>
              <p><span class="label">Email:</span> <a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></p>
              <p><span class="label">Source:</span> Homepage Hero Section</p>
              <p><span class="label">Time:</span> ${new Date().toLocaleString()}</p>
              
              <a href="mailto:${sanitizedEmail}" class="button">Reply to User</a>
            </div>
          </div>
        </body>
      </html>
    `;
    
    const { error } = await resend.emails.send({
      from: `PixPoc Website <noreply@${process.env.NEXT_PUBLIC_SITE_DOMAIN || 'pixpoc.ai'}>`,
      to: siteConfig.company.email,
      subject: `🚀 New Demo Request: ${sanitizedEmail}`,
      html: emailHtml,
      replyTo: sanitizedEmail,
    });
    
    if (error) {
      console.error('Email service error:', error);
      return NextResponse.json({ error: 'Service unavailable' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Demo request error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

