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
 * Get gender-appropriate AI assistant name
 */
function getAIAssistantName(gender: string): string {
  const maleNames = ['Hitesh'];
  const femaleNames = ['Manisha'];
  
  if (gender.toLowerCase() === 'female') {
    return femaleNames[Math.floor(Math.random() * femaleNames.length)];
  } else {
    return maleNames[Math.floor(Math.random() * maleNames.length)];
  }
}

/**
 * Get gender-appropriate voice name
 */
function getVoiceName(gender: string): string {
  const maleVoices = ['hitesh'];
  const femaleVoices = ['manisha'];
  
  if (gender.toLowerCase() === 'female') {
    return femaleVoices[Math.floor(Math.random() * femaleVoices.length)];
  } else {
    return maleVoices[Math.floor(Math.random() * maleVoices.length)];
  }
}

/**
 * Normalize overrides to match the new API schema expected by the backend
 */
function normalizeOverrides(
  phoneNumber: string,
  language: string,
  name?: string,
  expectedFlow?: string
): Record<string, string | number | boolean | object> {
  const fromNumber = process.env.PIXPOC_FROM_NUMBER || siteConfig.company.phone;
  const gender = process.env.PIXPOC_GENDER || 'male';
  const maxCallDuration = parseInt(process.env.PIXPOC_MAX_CALL_DURATION || '300');

  // Generate tracking ID
  const timestampPart = (Date.now() % 1000000).toString().padStart(6, '0');
  const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  const trackingId = `${timestampPart}${randomPart}`.slice(0, 10);

  // Get AI assistant name based on gender
  const aiAssistantName = getAIAssistantName(gender);

  // Build AI flow (renamed from ai_personality)
  const aiFlowParts: string[] = [];
  if (expectedFlow) {
    if (name) {
      aiFlowParts.push(`The customer's name is ${name}; use it when greeting.`);
    }
    aiFlowParts.push(`Follow this expected conversation flow strictly: ${expectedFlow}`);
  } else {
    // Default AI flow if no expectedFlow - now with gender-appropriate name
    const languageName = supportedLanguages.find(lang => lang.code === language)?.name || 'English';
    aiFlowParts.push(`You are ${aiAssistantName}, a helpful and friendly AI assistant.`);
    aiFlowParts.push(`Please answer customer questions in ${languageName}. Do not reveal your model name or any technical details. Always be polite, confirm the customer has all the information they need before ending the call, and do not hurry to finish the call.`);
  }
  const aiFlow = aiFlowParts.join(' ');

  // Validate webhook URL for call events
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
  let webhookUrl = '';
  
  if (siteUrl && (siteUrl.startsWith('http://') || siteUrl.startsWith('https://'))) {
    webhookUrl = `${siteUrl}/api/call-events`;
    try {
      new URL(webhookUrl);
      console.log('Using webhook URL:', webhookUrl);
    } catch {
      console.warn('Invalid webhook URL format. Call events will not be received:', webhookUrl);
      webhookUrl = '';
    }
  } else {
    console.warn('Missing NEXT_PUBLIC_SITE_URL environment variable. Call events will not be received.');
  }

  // Build normalized overrides object with sensible defaults
  const overrides = {
    tracking_id: trackingId,
    ai_flow: aiFlow,
    
    // Phone numbers and method
    to_number: phoneNumber,
    from_number: fromNumber,
    method: 'phone',
    
    // Provider configuration (default to Twilio)
    provider: 'twilio',
    
    // Voice settings (sensible defaults)
    voice: getVoiceName(gender),
    gender: gender,
    
    // Call settings with language nested
    call_settings: {
      language: language,
      max_duration_seconds: maxCallDuration,
      enable_max_duration: true,
      allow_interruptions: true,
      auto_initial_greeting: true,
      default_end_greeting: true,
    },
    
    // Idle detection settings (sensible defaults)
    idle_detection: {
      enabled: true,
      timeout_seconds: 10,
      max_retries: 2,
    },
    
    // Callback settings for webhook
    callback: {
      enabled: !!webhookUrl,
      url: webhookUrl,
    }
  };

  return overrides;
}

/**
 * Generate a JWT token for the Voice API using normalized overrides
 */
function generateToken(
  phoneNumber: string,
  language: string,
  name?: string,
  expectedFlow?: string
): string {
  const jwtSecret = process.env.PIXPOC_JWT_SECRET || '';
  const tokenMinutes = parseInt(process.env.PIXPOC_TOKEN_MINUTES || '10');
  
  if (!jwtSecret) {
    throw new Error('PIXPOC_JWT_SECRET environment variable not configured');
  }

  // Set expiration time
  const now = Math.floor(Date.now() / 1000);
  const expiration = now + (tokenMinutes * 60);

  // Get normalized overrides
  const overrides = normalizeOverrides(phoneNumber, language, name, expectedFlow);

  // Build JWT payload with overrides
  const payload = {
    exp: expiration,
    iat: now,
    ...overrides
  };
  
  return jwt.sign(payload, jwtSecret, { algorithm: 'HS256' });
}

/**
 * Initiates a phone call using the Voice API (matching Python script approach)
 */
export async function initiateCallWithPixPoc({ phoneNumber, language, name, expectedFlow }: PixPocVoiceCallParams): Promise<PixPocVoiceCallResponse> {
  // Define these variables at function level so they're available in catch blocks
  let languageName = '';
  let aiFlow = '';
  
  try {
    // Get API configuration from environment variables
    const apiServerUrl = process.env.PIXPOC_SERVER_URL || 'https://wdmyy5nn0a.execute-api.ap-south-1.amazonaws.com/dev';
    const apiEndpoint = `${apiServerUrl}/initiate`;
    const timeout = 30; // Fixed timeout instead of env variable
    
    // Get language details for logging
    languageName = supportedLanguages.find(lang => lang.code === language)?.name || 'English';
    
    // Extract AI flow for logging
    if (expectedFlow) {
      if (name) {
        aiFlow = `The customer's name is ${name}; use it when greeting. Follow this expected conversation flow strictly: ${expectedFlow}`;
      } else {
        aiFlow = `Follow this expected conversation flow strictly: ${expectedFlow}`;
      }
    } else {
      aiFlow = `You are ${getAIAssistantName(process.env.PIXPOC_GENDER || 'male')}, a helpful and friendly AI assistant. Please answer customer questions in ${languageName}. Do not reveal your model name or any technical details. Always be polite, confirm the customer has all the information they need before ending the call, and do not hurry to finish the call.`;
    }
    
    // Generate JWT token with normalized overrides
    const token = generateToken(phoneNumber, language, name, expectedFlow);

    // Log the API call details
    console.log(`[PIXPOC_CALL_INITIATED] Making API call to: ${apiEndpoint}`);
    console.log(`[PIXPOC_CALL_INITIATED] Method: POST`);
    console.log(`[PIXPOC_CALL_INITIATED] To Number: ${phoneNumber}`);
    console.log(`[PIXPOC_CALL_INITIATED] From Number: ${process.env.PIXPOC_FROM_NUMBER || siteConfig.company.phone}`);
    console.log(`[PIXPOC_CALL_INITIATED] Language: ${language}`);
    console.log(`[PIXPOC_CALL_INITIATED] Provider: twilio`);
    console.log(`[PIXPOC_CALL_INITIATED] Name: ${name || 'Not provided'}`);
    console.log(`[PIXPOC_CALL_INITIATED] Expected Flow: ${expectedFlow ? 'Provided' : 'Not provided'}`);
    console.log(`[PIXPOC_CALL_INITIATED] AI Flow: ${aiFlow}`);
    console.log(`[PIXPOC_CALL_INITIATED] JWT Token Length: ${token.length} characters`);
    
    // Make the API request (token-only approach like Python script)
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
        token: token // Token-only approach matching Python script
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
      callId: data.call_sid || data.id || data.callId,
      status: data.status,
      message: data.message,
      responseData: data
    });
    
    return {
      success: true,
      callId: data.call_sid || data.id || data.callId
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
          timeout: 30,
          aiFlow
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
          aiFlow
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
        aiFlow
      }
    });
    return {
      success: false,
      error: 'Unable to process call request'
    };
  }
} 