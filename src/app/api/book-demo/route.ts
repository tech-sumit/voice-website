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

    // 1. Notification Template (To Team)
    const teamEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>New Demo Request</title>
          <style type="text/css">
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.5; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; }
            .header { background-color: #1A5C54; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-top: none; }
            .footer { background-color: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none; }
            .info-item { padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
            .info-item:last-child { border-bottom: none; }
            .label { font-weight: bold; color: #374151; }
            .logo { font-size: 24px; font-weight: bold; color: white; margin-bottom: 10px; }
            .button { display: inline-block; background-color: #1A5C54; color: white; text-decoration: none; padding: 10px 20px; border-radius: 4px; margin-top: 15px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">${siteConfig.name}</div>
              <div style="font-weight: bold;">🚀 New Demo Request</div>
            </div>
            <div class="content">
              <p>You've received a new demo request:</p>
              <div class="info-item">
                <span class="label">Email:</span> <a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a>
              </div>
              <div class="info-item">
                <span class="label">Source:</span> Homepage Hero Section
              </div>
              <div class="info-item">
                <span class="label">Requested on:</span> ${new Date().toLocaleString()}
              </div>
              <p style="margin-top: 20px;">Please reach out promptly to schedule a demo.</p>
              <a href="mailto:${sanitizedEmail}" class="button">Reply to Prospect</a>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} ${siteConfig.company.name}. All rights reserved.</p>
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
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; }
            .header { background-color: #1A5C54; color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #ffffff; padding: 30px 20px; border: 1px solid #e5e7eb; border-top: none; }
            .footer { background-color: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none; }
            .logo { font-size: 26px; font-weight: bold; color: white; }
            .button { display: inline-block; background-color: #1A5C54; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">${siteConfig.name}</div>
            </div>
            <div class="content">
              <h2>Thanks for your interest in ${siteConfig.name}!</h2>
              <p>Hi there,</p>
              <p>We've received your request for a demo of our AI phone agents. Our founders would love to show you how we can help automate your support and sales calls with ultra-realistic AI.</p>
              <p><strong>The next step is to schedule a quick 15-minute discovery call.</strong> During this call, we'll understand your specific needs and show you a live demo tailored to your use case.</p>
              // <div style="text-align: center;">
              //   <a href="https://calendly.com/pixpoc" class="button">Book Your Demo Slot</a>
              // </div>
              <p style="margin-top: 30px;">If you have any immediate questions, feel free to reply to this email!</p>
              <p>Best regards,<br>The PixPoc Founders</p>
            </div>
            <div class="footer">
              <p>You received this email because you requested a demo on <a href="${siteConfig.url}">${siteConfig.url}</a>.</p>
              <p>&copy; ${new Date().getFullYear()} ${siteConfig.company.name}. All rights reserved.</p>
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

