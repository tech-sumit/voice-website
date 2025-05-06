import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import siteConfig from '@/config/site.json';

// Initialize Resend with API key if available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface CallInfo {
  call_sid: string;
  stream_sid: string;
  language_code: string;
  status: string;
  end_reason?: string;
}

interface Timing {
  start_time: string;
  end_time: string;
  duration_seconds: number;
}

interface Resources {
  transcript_s3_path?: string;
  recording_s3_path?: string;
}

interface PanditaWebhookPayload {
  call_info: CallInfo;
  timing: Timing;
  errors: Array<{ code: string; message: string }>;
  resources: Resources;
  server_info: Record<string, string>;
  tracking_id: string;
}

/**
 * Handles webhook callbacks from PanditaAI.
 * This endpoint receives status updates about ongoing calls.
 */
export async function POST(request: Request) {
  try {
    // Get the raw request body
    const body = await request.text();
    
    // Parse the JSON data
    let payload: PanditaWebhookPayload;
    try {
      payload = JSON.parse(body);
    } catch (e) {
      console.error('Failed to parse PanditaAI webhook payload:', e);
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }
    
    // Extract call data
    const { call_info, timing, resources, tracking_id } = payload;
    const { call_sid, language_code, status, end_reason } = call_info;
    
    // Log basic call information
    console.log(`Call Event: ID=${call_sid}, Status=${status}, Language=${language_code}, TrackingID=${tracking_id}`);
    
    // Process completed calls
    if (status === 'completed') {
      const duration = timing.duration_seconds;
      const formattedDuration = `${Math.floor(duration / 60)}m ${Math.round(duration % 60)}s`;
      
      // Log based on end reason
      switch (end_reason) {
        case 'end_task_frame':
          console.log(`Call completed normally. Duration: ${formattedDuration}`);
          break;
        case 'max_duration':
          console.log(`Call reached maximum duration limit. Duration: ${formattedDuration}`);
          break;
        case 'twilio_status_completed':
          console.log(`Call ended by carrier/network. Duration: ${formattedDuration}`);
          break;
        default:
          console.log(`Call completed with reason: ${end_reason}. Duration: ${formattedDuration}`);
      }
      
      // Check if we have a transcript
      if (resources.transcript_s3_path) {
        console.log(`Transcript available at: ${resources.transcript_s3_path}`);
        // Here you could initiate a background task to fetch and process the transcript
      }
      
      // Check if we have a recording
      if (resources.recording_s3_path) {
        console.log(`Recording available at: ${resources.recording_s3_path}`);
        // Here you could initiate a background task to fetch and process the recording
      }
      
      // Send email notification about completed call if Resend is configured
      if (resend && process.env.NEXT_PUBLIC_SITE_URL) {
        try {
          await sendCallCompletionEmail({
            callSid: call_sid,
            language: language_code,
            duration: formattedDuration,
            endReason: end_reason || 'unknown',
            hasTranscript: !!resources.transcript_s3_path,
            hasRecording: !!resources.recording_s3_path
          });
        } catch (emailError) {
          console.error('Failed to send call completion email:', emailError);
        }
      }
    }
    // Process other status updates if needed
    else {
      console.log(`Call ${status} with ID ${call_sid}`);
    }
    
    // Return success response
    return NextResponse.json({ 
      success: true,
      message: 'Event received successfully'
    });
    
  } catch (error) {
    console.error('Error processing call event:', error);
    
    // Return a generic error response
    return NextResponse.json(
      { error: 'Unable to process call event' },
      { status: 500 }
    );
  }
}

/**
 * Helper function to send email notification about completed calls
 */
async function sendCallCompletionEmail(data: {
  callSid: string;
  language: string;
  duration: string;
  endReason: string;
  hasTranscript: boolean;
  hasRecording: boolean;
}) {
  if (!resend) return;
  
  // Get language name
  const getLanguageName = (code: string) => {
    // Map language codes to readable names
    const languageMap: Record<string, string> = {
      'en-IN': 'English (India)',
      'hi-IN': 'Hindi',
      'mr-IN': 'Marathi',
      'gu-IN': 'Gujarati',
      'bn-IN': 'Bengali',
      'ta-IN': 'Tamil',
      'te-IN': 'Telugu',
      'kn-IN': 'Kannada',
      'ml-IN': 'Malayalam',
    };
    return languageMap[code] || code;
  };
  
  // Create email body
  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Call Completed</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #6366F1; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; border: 1px solid #ddd; }
          .footer { padding: 20px; text-align: center; font-size: 0.8em; color: #666; }
          .info-row { margin-bottom: 10px; }
          .label { font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${siteConfig.name} - Call Completed</h1>
          </div>
          <div class="content">
            <p>A customer call has been completed with the following details:</p>
            
            <div class="info-row">
              <span class="label">Call ID:</span> ${data.callSid}
            </div>
            
            <div class="info-row">
              <span class="label">Language:</span> ${getLanguageName(data.language)}
            </div>
            
            <div class="info-row">
              <span class="label">Duration:</span> ${data.duration}
            </div>
            
            <div class="info-row">
              <span class="label">End Reason:</span> ${data.endReason}
            </div>
            
            <div class="info-row">
              <span class="label">Transcript:</span> ${data.hasTranscript ? 'Available' : 'Not available'}
            </div>
            
            <div class="info-row">
              <span class="label">Recording:</span> ${data.hasRecording ? 'Available' : 'Not available'}
            </div>
            
            <p>Please check the dashboard for more details.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ${siteConfig.company.name}. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
  
  // Send email
  await resend.emails.send({
    from: `${siteConfig.name} <noreply@${process.env.NEXT_PUBLIC_SITE_DOMAIN || 'example.com'}>`,
    to: siteConfig.company.email,
    subject: `Call Completed - ${data.callSid}`,
    html: emailHtml,
  });
}

/**
 * Handles GET requests for webhook verification
 */
export async function GET(request: Request) {
  // Handle GET requests (used for webhook verification)
  const searchParams = new URL(request.url).searchParams;
  
  // Check if this is a challenge request
  const challenge = searchParams.get('challenge');
  if (challenge) {
    // Return the challenge value to verify ownership
    return NextResponse.json({ challenge });
  }
  
  // Generic response
  return NextResponse.json({ status: 'OK' });
} 