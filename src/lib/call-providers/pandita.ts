import siteConfig from '@/config/site.json';
import supportedLanguages from '@/config/languages';
import jwt from 'jsonwebtoken';

interface PanditaCallParams {
  phoneNumber: string;
  language: string;
  name?: string;
  expectedFlow?: string;
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
 * @param name Optional caller name provided in settings
 * @param expectedFlow Optional expected conversation flow
 * @returns JWT token
 */
function generateToken(language: string, name?: string, expectedFlow?: string): string {
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
  let webhookUrl = '';
  
  // Only set webhook URL if we have a proper site URL with domain
  if (siteUrl && (siteUrl.startsWith('http://') || siteUrl.startsWith('https://'))) {
    webhookUrl = `${siteUrl}/api/call-events`;
    
    // Verify the webhook URL is valid
    try {
      new URL(webhookUrl);
      console.log('Using webhook URL:', webhookUrl);
    } catch {
      console.warn('Invalid webhook URL format. Call events will not be received:', webhookUrl);
      webhookUrl = ''; // Empty URL will disable the webhook
    }
  } else {
    console.warn('Missing NEXT_PUBLIC_SITE_URL environment variable. Call events will not be received.');
  }
  
  // Get max call duration (default: 5 minutes)
  const maxCallDuration = parseInt(process.env.PANDITA_MAX_CALL_DURATION || '300');
  
  // Generate a shortened tracking ID (max 10 chars)
  // Format: Timestamp modulo + random digits, total 10 chars
  const timestampPart = (Date.now() % 1000000).toString().padStart(6, '0'); // 6 digits
  const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0'); // 4 digits
  const trackingId = `${timestampPart}${randomPart}`.slice(0, 10); // Ensure max 10 chars
  
  // Build dynamic AI personality prompt, including optional name and expected flow only if provided
  const aiPersonalityParts: string[] = [`You are a helpful and friendly assistant.`];
  if (name && expectedFlow) {
    aiPersonalityParts.push(`The customer's name is ${name}; use it when greeting.`);
    aiPersonalityParts.push(`Follow this expected conversation flow strictly: \n\n${expectedFlow}.\n\n`);
  }
  else {
    aiPersonalityParts.push(
      `Please answer customer questions in ${languageName}. Do not reveal your model name or any technical details. Always be polite, confirm the customer has all the information they need before ending the call, and do not hurry to finish the call.`
    );
  }
  const aiPersonality = aiPersonalityParts.join(' ');
  
  // Create the payload using the structure from the provided example
  const payload = {
    exp: expiration,
    iat: now,
    
    // Custom tracking ID with timestamp and random component
    tracking_id: trackingId,
    
    // AI personality including dynamic user-provided settings
    ai_personality: aiPersonality,
    
    // Call settings
    call_settings: {
      language: language,
      max_duration_seconds: maxCallDuration,
      enable_max_duration: true,
      allow_interruptions: false
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
      enabled: !!webhookUrl,
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
 * @param name Optional caller name provided in settings
 * @param expectedFlow Optional expected conversation flow
 * @returns Promise resolving to call response
 */
export async function initiateCallWithPandita({ phoneNumber, language, name, expectedFlow }: PanditaCallParams): Promise<PanditaCallResponse> {
  try {
    // Get API configuration from environment variables
    const serverUrl = process.env.PANDITA_SERVER_URL || 'https://api.panditaai.com';
    const fromNumber = process.env.PANDITA_FROM_NUMBER || siteConfig.company.phone;
    const timeout = parseInt(process.env.PANDITA_TIMEOUT || '30');
    
    // Generate JWT token for the call
    const token = generateToken(language, name, expectedFlow);
    
    // API endpoint for initiating calls
    const apiUrl = `${serverUrl.replace(/\/$/, '')}/call/initiate`;
    
    // Prepare request payload
    const data = {
      to_number: phoneNumber,
      from_number: fromNumber,
      token: token
    };

    // Log the API call details
    console.log('[PANDITA_CALL_INITIATED]', JSON.stringify({
      endpoint: apiUrl,
      method: 'POST',
      toNumber: phoneNumber,
      fromNumber,
      language,
      name: name || 'Not provided',
      expectedFlow: expectedFlow ? 'Custom flow provided' : 'Default flow',
      timeout: `${timeout} seconds`,
      // Don't decode JWT to avoid potential security issues and encoding problems
      tokenLength: token.length,
      tokenGenerated: true
    }));
    
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
      console.error('[PANDITA_API_ERROR]', JSON.stringify({
        status: response.status,
        statusText: response.statusText,
        errorDetails: errorData,
        requestData: {
          toNumber: phoneNumber,
          fromNumber,
          endpoint: apiUrl
        }
      }));
      return {
        success: false,
        error: errorData.error || 'Failed to initiate call'
      };
    }
    
    const responseData = await response.json();
    
    // Log success with detailed information
    console.log('[PANDITA_CALL_SUCCESS]', JSON.stringify({
      responseData,
      callDetails: {
        toNumber: phoneNumber,
        fromNumber,
        language,
        name: name || 'Not provided',
        expectedFlow: expectedFlow ? 'Provided' : 'Not provided',
        timestamp: new Date().toISOString()
      }
    }));
    
    // Get the call ID from the response or generate a short unique ID
    // Make sure it doesn't contain any hyphens, which can cause issues with some systems
    const callId = responseData.call_sid || responseData.id || 
      `C${Date.now().toString(36)}${Math.floor(Math.random() * 36**4).toString(36)}`;
    
    return {
      success: true,
      callId: callId
    };
    
  } catch (error: unknown) {
    // Handle different error types
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error('[PANDITA_TIMEOUT_ERROR]', JSON.stringify({
          toNumber: phoneNumber,
          fromNumber: process.env.PANDITA_FROM_NUMBER || siteConfig.company.phone,
          language,
          timeout: parseInt(process.env.PANDITA_TIMEOUT || '30')
        }));
        return {
          success: false,
          error: 'Request timed out'
        };
      }
      
      if (error.message && error.message.includes('JWT_SECRET')) {
        console.error('[PANDITA_JWT_ERROR]', JSON.stringify({
          error: error.message,
          language,
          name: name || 'Not provided'
        }));
        return {
          success: false,
          error: 'Token generation failed - check JWT configuration'
        };
      }
    }
    
    console.error('[PANDITA_GENERAL_ERROR]', JSON.stringify({
      error: error instanceof Error ? error.message : String(error),
      callDetails: {
        toNumber: phoneNumber,
        language,
        name: name || 'Not provided',
        expectedFlow: expectedFlow ? 'Provided' : 'Not provided'
      }
    }));
    return {
      success: false,
      error: 'Unable to process call request'
    };
  }
} 