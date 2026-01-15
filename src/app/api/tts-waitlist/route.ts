import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import siteConfig from '@/config/site.json';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email } = body;

        // Validate email
        if (!email || typeof email !== 'string') {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // If Resend API key is not configured, just log and return success
        if (!process.env.RESEND_API_KEY) {
            console.log('RESEND_API_KEY not found. TTS Waitlist signup (not sent):');
            console.log({ email });
            return NextResponse.json({
                success: true,
                message: 'Successfully joined the waitlist!'
            });
        }

        // Initialize Resend
        const resend = new Resend(process.env.RESEND_API_KEY as string);

        // Email content
        const fromEmail: string = process.env.RESEND_FROM_EMAIL || `PixPoc TTS <onboarding@resend.dev>`;

        const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #FF5722 0%, #FF7043 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .email-box { background: white; padding: 20px; border-radius: 6px; border-left: 4px solid #FF5722; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🎉 New TTS Waitlist Signup</h1>
            </div>
            <div class="content">
              <p>A new user has joined the TTS waitlist!</p>
              
              <div class="email-box">
                <strong>Email:</strong> ${email}
              </div>
              
              <p><strong>Timestamp:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
              
              <div class="footer">
                <p>This notification was sent from ${siteConfig.url}/tts</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

        // Send email to founders
        const { error } = await resend.emails.send({
            from: fromEmail,
            to: 'founders@pixpoc.ai',
            subject: `🎯 New TTS Waitlist Signup - ${email}`,
            html: htmlContent,
        });

        if (error) {
            console.error('Error sending email:', error);
            return NextResponse.json(
                { error: 'Failed to process waitlist signup' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Successfully joined the waitlist!'
        });

    } catch (error) {
        console.error('Waitlist API Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
