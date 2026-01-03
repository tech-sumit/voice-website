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

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;
    const logoUrl = `${baseUrl.replace(/\/$/, '')}/logo.png`;

    // 1. Notification Template (To Team - Founders)
    const teamEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>New Demo Request</title>
          <style type="text/css">
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.5; margin: 0; padding: 0; background-color: #F5F1E8; color: #3D3935; }
            .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border: 2px solid #C8C4B8; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(26, 92, 84, 0.1); }
            .header-strip { background-color: #1A5C54; height: 6px; width: 100%; }
            .content { padding: 40px; }
            .footer { background-color: #F5F1E8; padding: 24px; text-align: center; font-size: 11px; color: #A09890; border-top: 1px solid #E7E3DF; font-family: ui-monospace, monospace; text-transform: uppercase; letter-spacing: 0.1em; }
            .info-item { padding: 16px 0; border-bottom: 1px solid #F3F1EF; }
            .info-item:last-child { border-bottom: none; }
            .label { font-size: 10px; font-weight: 800; color: #75B7AB; text-transform: uppercase; letter-spacing: 0.15em; display: block; margin-bottom: 6px; }
            .value { font-size: 16px; color: #171410; font-weight: 600; }
            .logo-container { text-align: center; margin-bottom: 32px; }
            .logo-img { height: 60px; width: auto; }
            .status-tag { display: inline-block; border: 1px solid #FF5722; color: #FF5722; font-size: 9px; font-weight: 800; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; }
            .button { display: inline-block; background-color: #1A5C54; color: #F5F1E8 !important; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 700; margin-top: 30px; text-transform: uppercase; font-size: 13px; letter-spacing: 0.05em; border-bottom: 4px solid #103732; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header-strip"></div>
            <div class="content">
              <div class="logo-container">
                <img src="${logoUrl}" alt="${siteConfig.name}" class="logo-img">
              </div>
              
              <div style="text-align: center;">
                <span class="status-tag">Inbound Signal</span>
                <h1 style="font-size: 22px; margin: 0 0 32px 0; font-weight: 800; color: #1A5C54; letter-spacing: -0.01em;">New Demo Request Detected</h1>
              </div>
              
              <div class="info-item">
                <span class="label">Primary Identifier</span>
                <span class="value"><a href="mailto:${sanitizedEmail}" style="color: #FF5722; text-decoration: none;">${sanitizedEmail}</a></span>
              </div>
              <div class="info-item">
                <span class="label">Traffic Source</span>
                <span class="value">Homepage Hero Section</span>
              </div>
              <div class="info-item">
                <span class="label">Timestamp (local)</span>
                <span class="value">${new Date().toLocaleString()}</span>
              </div>
              
              <div style="text-align: center;">
                <a href="mailto:${sanitizedEmail}" class="button">Initialize Response</a>
              </div>
            </div>
            <div class="footer">
              SYSTEM_NOTIFICATION :: ${siteConfig.company.name} :: v2.0
            </div>
          </div>
        </body>
      </html>
    `;

    // 2. Confirmation Template (To Customer)
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Your PixPoc Demo</title>
          <style type="text/css">
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #F5F1E8; color: #3D3935; }
            .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border: 2px solid #C8C4B8; border-radius: 20px; overflow: hidden; box-shadow: 0 15px 45px rgba(0,0,0,0.06); }
            .content { padding: 48px; }
            .footer { background-color: #F5F1E8; padding: 32px; text-align: center; font-size: 13px; color: #A09890; border-top: 1px solid #E7E3DF; }
            .logo-container { margin-bottom: 40px; }
            .logo-img { height: 60px; width: auto; }
            .button-container { text-align: center; margin: 40px 0; }
            .button { display: inline-block; background-color: #FF5722; color: #ffffff !important; text-decoration: none; padding: 18px 36px; border-radius: 14px; font-weight: 800; font-size: 16px; box-shadow: 0 6px 0 #CC3D1A; text-transform: uppercase; letter-spacing: 0.05em; }
            .button:hover { background-color: #FF6D3F; transform: translateY(-1px); }
            h2 { font-size: 32px; font-weight: 800; color: #1A5C54; margin-top: 0; letter-spacing: -0.03em; line-height: 1.1; }
            p { margin-bottom: 24px; font-size: 17px; color: #3D3935; }
            .highlight { color: #FF5722; font-weight: 700; }
            .founder-signoff { margin-top: 48px; padding-top: 24px; border-top: 2px solid #F5F1E8; font-weight: 700; color: #1A5C54; font-size: 16px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="content">
              <div class="logo-container">
                <img src="${logoUrl}" alt="${siteConfig.name}" class="logo-img">
              </div>
              <h2>Ready to see the future of voice?</h2>
              <p>Hello,</p>
              <p>We've received your request for a demo of our AI phone agents. Our founders are excited to show you how <span class="highlight">${siteConfig.name}</span> can automate your support and sales with ultra-realistic, low-latency AI conversations.</p>
              <p>The next step is simple: <strong>schedule a 15-minute discovery call</strong> so we can tailor a live demo to your specific use case.</p>
              
              <div class="button-container">
                <a href="https://calendly.com/pixpoc" class="button">BOOK YOUR DEMO SLOT</a>
              </div>
              
              <p>If you need anything else in the meantime, just reply to this email.</p>
              
              <div class="founder-signoff">
                Best regards,<br>
                The PixPoc Founders
              </div>
            </div>
            <div class="footer">
              <p>Sent via <a href="${siteConfig.url}" style="color: #1A5C54; text-decoration: none; font-weight: 700;">${siteConfig.name}</a> • Built for Enterprise Scale</p>
              <p style="margin-top: 12px; font-size: 11px; opacity: 0.7;">&copy; ${new Date().getFullYear()} ${siteConfig.company.name}. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Internal notification email
    const fromEmail: string = process.env.RESEND_FROM_EMAIL || `PixPoc Demo <onboarding@resend.dev>`;

    // Send to founders
    const teamEmailPromise = resend.emails.send({
      from: fromEmail,
      to: siteConfig.company.email,
      subject: `🚀 New Demo Request from ${sanitizedEmail}`,
      html: teamEmailHtml,
      replyTo: sanitizedEmail,
    });

    // Send to customer
    // The user explicitly requested it from founders@pixpoc.ai
    const customerEmailPromise = resend.emails.send({
      from: `PixPoc Founders <founders@pixpoc.ai>`,
      to: [sanitizedEmail],
      subject: `Next Steps: Your ${siteConfig.name} Demo`,
      html: customerEmailHtml,
    });

    const [teamResult, customerResult] = await Promise.all([
      teamEmailPromise,
      customerEmailPromise
    ]);

    if (teamResult.error || customerResult.error) {
      if (teamResult.error) console.error('Team email error:', teamResult.error);
      if (customerResult.error) console.error('Customer email error:', customerResult.error);

      // If at least one worked, we might want to return success but log the error
      // For now, let's be strict if the team notification fails
      if (teamResult.error) {
        return NextResponse.json(
          { error: 'Unable to process your request at this time' },
          { status: 500 }
        );
      }
    }

    // Return success
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

