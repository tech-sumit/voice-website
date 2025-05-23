import siteConfig from '@/config/site.json';
import supportedLanguages from '@/config/languages';
import jwt from 'jsonwebtoken';

interface PixPocVoiceCallParams {
  phoneNumber: string;
  language: string;
  name?: string;
  expectedFlow?: string;
}

interface PixPocVoiceCallResponse {
  success: boolean;
  callId?: string;
  error?: string;
}

/**
 * Generate a JWT token for PixPoc Voice API
 * 
 * @param language Language code for the call
 * @param name Optional caller name provided in settings
 * @param expectedFlow Optional expected conversation flow
 * @returns JWT token
 */
function generateToken(language: string, name?: string, expectedFlow?: string): string {
  const jwtSecret = process.env.PIXPOC_JWT_SECRET || '';
  const tokenMinutes = parseInt(process.env.PIXPOC_TOKEN_MINUTES || '10');
  
  if (!jwtSecret) {
    throw new Error('PIXPOC_JWT_SECRET environment variable not configured');
  }
  
  // Get language details
  const gender = process.env.PIXPOC_GENDER || 'female';
  
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
  const maxCallDuration = parseInt(process.env.PIXPOC_MAX_CALL_DURATION || '300');
  
  // Generate a shortened tracking ID (max 10 chars)
  // Format: Timestamp modulo + random digits, total 10 chars
  const timestampPart = (Date.now() % 1000000).toString().padStart(6, '0');
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
 * Initiates a phone call using the PixPoc Voice API
 * 
 * @param phoneNumber The customer's phone number in international format
 * @param language The preferred language code for the call
 * @param name Optional caller name provided in settings
 * @param expectedFlow Optional expected conversation flow
 * @returns Promise resolving to call response
 */
export async function initiateCallWithPixPoc({ phoneNumber, language, name, expectedFlow }: PixPocVoiceCallParams): Promise<PixPocVoiceCallResponse> {
  // Define these variables at function level so they're available in catch blocks
  let languageName = '';
  let aiPersonality = '';
  
  try {
    // Get API configuration from environment variables
    const apiServerUrl = process.env.PIXPOC_SERVER_URL || 'https://api.pixpoc.in';
    const apiEndpoint = `${apiServerUrl}/call/initiate`;
    const fromNumber = process.env.PIXPOC_FROM_NUMBER || siteConfig.company.phone;
    const timeout = parseInt(process.env.PIXPOC_TIMEOUT || '30');
    
    // Get language details for logging
    languageName = supportedLanguages.find(lang => lang.code === language)?.name || 'English';
    
    // Extract AI personality for logging - same logic as in generateToken
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
    aiPersonality = aiPersonalityParts.join(' ');
    
    // Generate JWT token for the call
    const token = generateToken(language, name, expectedFlow);

    // Log the API call details
    console.log(`[PIXPOC_CALL_INITIATED] Making API call to: ${apiEndpoint}`);
    console.log(`[PIXPOC_CALL_INITIATED] Method: POST`);
    console.log(`[PIXPOC_CALL_INITIATED] To Number: ${phoneNumber}`);
    console.log(`[PIXPOC_CALL_INITIATED] From Number: ${fromNumber}`);
    console.log(`[PIXPOC_CALL_INITIATED] Language: ${language}`);
    console.log(`[PIXPOC_CALL_INITIATED] Name: ${name || 'Not provided'}`);
    console.log(`[PIXPOC_CALL_INITIATED] Expected Flow: ${expectedFlow ? 'Provided' : 'Not provided'}`);
    console.log(`[PIXPOC_CALL_INITIATED] AI Personality: ${aiPersonality}`);
    console.log(`[PIXPOC_CALL_INITIATED] Max Call Duration: ${parseInt(process.env.PIXPOC_MAX_CALL_DURATION || '300')} seconds`);
    console.log(`[PIXPOC_CALL_INITIATED] JWT Token Length: ${token.length} characters`);
    
    // Make the API request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout * 1000);
    
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'VoiceCallingAgent-Client/1.0',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        to_number: phoneNumber,
        from_number: fromNumber,
        token: token
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    // Parse the response
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[PIXPOC_CALL_ERROR] API Error Response:`, {
        status: response.status,
        statusText: response.statusText,
        errorText
      });
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    
    // Log success with detailed information
    console.log(`[PIXPOC_CALL_SUCCESS] Call initiated successfully:`, {
      callId: data.call_sid,
      status: data.status,
      message: data.message
    });
    
    return {
      success: true,
      callId: data.call_sid
    };
    
  } catch (error: unknown) {
    // Handle different error types
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error('[PIXPOC_TIMEOUT_ERROR]', JSON.stringify({
          toNumber: phoneNumber,
          fromNumber: process.env.PIXPOC_FROM_NUMBER || siteConfig.company.phone,
          language,
          languageName,
          timeout: parseInt(process.env.PIXPOC_TIMEOUT || '30'),
          aiPersonality
        }));
        return {
          success: false,
          error: 'Request timed out'
        };
      }
      
      if (error.message && error.message.includes('JWT_SECRET')) {
        console.error('[PIXPOC_JWT_ERROR]', JSON.stringify({
          error: error.message,
          language,
          languageName,
          name: name || 'Not provided',
          aiPersonality
        }));
        return {
          success: false,
          error: 'Token generation failed - check JWT configuration'
        };
      }

      // Add specific handling for network errors
      if (error.message.includes('fetch failed') || error.message.includes('network')) {
        console.error('[PIXPOC_NETWORK_ERROR]', JSON.stringify({
          error: error.message,
          toNumber: phoneNumber,
          fromNumber: process.env.PIXPOC_FROM_NUMBER || siteConfig.company.phone,
          language,
          languageName
        }));
        return {
          success: false,
          error: 'Network error - please check your internet connection'
        };
      }
    }
    
    console.error(`[PIXPOC_CALL_ERROR] Failed to initiate call:`, {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      callDetails: {
        toNumber: phoneNumber,
        language,
        languageName,
        name: name || 'Not provided',
        expectedFlow: expectedFlow ? 'Provided' : 'Not provided',
        aiPersonality
      }
    });
    return {
      success: false,
      error: 'Unable to process call request'
    };
  }
} 