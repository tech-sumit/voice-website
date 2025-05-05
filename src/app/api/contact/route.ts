import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import siteConfig from '@/config/site.json';

// Initialize Resend with your API key
// Get your API key from https://resend.com after signing up
// Add RESEND_API_KEY to your .env.local file
const resend = new Resend(process.env.RESEND_API_KEY);

// Define maximum lengths for fields
const MAX_LENGTHS = {
  name: 100,
  email: 100,
  company: 100,
  phone: 20,
  message: 5000, // 5000 characters max for message
};

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

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const { name, email, company, phone, message } = formData;
    
    // Initial validation - required fields
    if (!name || !email || !message) {
      return NextResponse.json({ 
        error: 'Name, email, and message are required' 
      }, { 
        status: 400 
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
      console.log(sanitizedData);
      return NextResponse.json({ 
        success: true, 
        warning: 'Email not sent - RESEND_API_KEY not configured' 
      });
    }
    
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
    const { data, error } = await resend.emails.send({
      from: `Contact Form <noreply@${process.env.NEXT_PUBLIC_SITE_DOMAIN || 'yourdomain.com'}>`,
      to: siteConfig.company.email,
      subject: `New contact form submission from ${sanitizedData.name}`,
      html: emailHtml,
      replyTo: sanitizedData.email,
    });
    
    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }
    
    console.log('Email sent successfully:', data);
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
} 