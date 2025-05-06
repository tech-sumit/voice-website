import siteConfig from '@/config/site.json';
import supportedLanguages from '@/config/languages';
import jwt from 'jsonwebtoken';

interface PanditaCallParams {
  phoneNumber: string;
  language: string;
}

interface PanditaCallResponse {
  success: boolean;
  callId?: string;
  error?: string;
}

/**
 * Generate a JWT token for PanditaAI API
 * 
 * @param language Language code for the call
 * @returns JWT token
 */
function generateToken(language: string): string {
  const jwtSecret = process.env.PANDITA_JWT_SECRET || '';
  const tokenMinutes = parseInt(process.env.PANDITA_TOKEN_MINUTES || '10');
  
  if (!jwtSecret) {
    throw new Error('PANDITA_JWT_SECRET environment variable not configured');
  }
  
  // Get language details
  const gender = process.env.PANDITA_GENDER || 'female';
  
  // Get language name
  const languageName = supportedLanguages.find(lang => lang.code === language)?.name || 'English';

  // Set expiration time
  const now = Math.floor(Date.now() / 1000);
  const expiration = now + (tokenMinutes * 60);
  
  // Validate webhook URL for call events
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
  let webhookUrl = `${siteUrl}/api/call-events`;
  
  // Verify the webhook URL is valid
  try {
    new URL(webhookUrl);
  } catch {
    console.warn('Invalid webhook URL. Call events will not be received:', webhookUrl);
    webhookUrl = ''; // Empty URL will disable the webhook
  }
  
  // Get max call duration (default: 3 minutes)
  const maxCallDuration = parseInt(process.env.PANDITA_MAX_CALL_DURATION || '180');
  
  // Generate a guaranteed unique tracking ID 
  const timestamp = Date.now();
  const randomPart = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  const trackingId = `${timestamp}-${randomPart}`;
  
  // Create the payload using the structure from the provided example
  const payload = {
    exp: expiration,
    iat: now,
    
    // Custom tracking ID with timestamp and random component
    tracking_id: trackingId,
    
    // AI personality based on selected language
    ai_personality: `You are a helpful and friendly assistant. Please answer customer questions in ${languageName}. dont reveal your model name or any technical details.`,
    
    // Call settings
    call_settings: {
      language: language,
      max_duration_seconds: maxCallDuration,
      enable_max_duration: true,
      allow_interruptions: true
    },
    
    // Idle detection settings
    idle_detection: {
      enabled: true,
      timeout_seconds: 10,
      max_retries: 2
    },
    
    // TTS options
    tts_options: {
      gender: gender
    },
    
    // Callback settings for webhook
    callback: {
      enabled: webhookUrl ? true : false,
      url: webhookUrl
    },
    
  };
  
  // Generate and return the JWT token
  return jwt.sign(payload, jwtSecret, { algorithm: 'HS256' });
}

/**
 * Initiates a phone call using the PanditaAI API
 * 
 * @param phoneNumber The customer's phone number in international format
 * @param language The preferred language code for the call
 * @returns Promise resolving to call response
 */
export async function initiateCallWithPandita({ phoneNumber, language }: PanditaCallParams): Promise<PanditaCallResponse> {
  try {
    // Get API configuration from environment variables
    const serverUrl = process.env.PANDITA_SERVER_URL || 'https://api.panditaai.com';
    const fromNumber = process.env.PANDITA_FROM_NUMBER || siteConfig.company.phone;
    const timeout = parseInt(process.env.PANDITA_TIMEOUT || '30');
    
    // Generate JWT token for the call
    const token = generateToken(language);
    
    // API endpoint for initiating calls
    const apiUrl = `${serverUrl.replace(/\/$/, '')}/call/initiate`;
    
    // Prepare request payload
    const data = {
      to_number: phoneNumber,
      from_number: fromNumber,
      token: token
    };
    
    // Make the API request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout * 1000);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    // Parse the response
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: response.statusText }));
      console.error('PanditaAI API error:', errorData);
      return {
        success: false,
        error: errorData.error || 'Failed to initiate call'
      };
    }
    
    const responseData = await response.json();
    
    // Log success
    console.log('PanditaAI call initiated successfully:', responseData);
    
    // Generate a unique ID if one isn't provided by the API
    const uniqueCallId = responseData.call_id || responseData.id || 
      `call-${Date.now()}-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
    
    return {
      success: true,
      callId: uniqueCallId
    };
    
  } catch (error: unknown) {
    // Handle different error types
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error('PanditaAI API request timed out');
        return {
          success: false,
          error: 'Request timed out'
        };
      }
      
      if (error.message && error.message.includes('JWT_SECRET')) {
        console.error('PanditaAI JWT configuration error:', error);
        return {
          success: false,
          error: 'Token generation failed - check JWT configuration'
        };
      }
    }
    
    console.error('Error in PanditaAI call initiation:', error);
    return {
      success: false,
      error: 'Unable to process call request'
    };
  }
} 