import siteConfig from '@/config/site.json';
import supportedLanguages from '@/config/languages';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';

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

interface CallRecipient {
  to_number: string;
  ai_flow: string;
  tracking_id: string;
}

interface PixPocRequestBody {
  provider: string;
  from_number: string;
  method: string;
  voice: string;
  gender: string;
  call_settings: Record<string, string | number | boolean>;
  idle_detection: Record<string, string | number | boolean>;
  messages: Record<string, string | number | boolean>;
  callback: Record<string, string | number | boolean>;
  numbers_to_call: CallRecipient[];
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
 * Get gender-appropriate voice name based on language
 */
function getVoiceName(gender: string, language: string): string {
  // LMNT TTS supported languages (Ultra-Low Latency)
  const lmntLanguages = [
    'ar', 'zh', 'nl', 'en-US', 'fr', 'de', 'hi-NE', 
    'id', 'it', 'ja', 'ko', 'pl', 'pt', 'ru', 
    'es', 'sv', 'th', 'tr', 'uk', 'ur', 'vi'
  ];
  
  // Check if this language uses LMNT TTS
  if (lmntLanguages.includes(language)) {
    // LMNT TTS voices - using Autumn (female) as default for all LMNT languages
    if (gender.toLowerCase() === 'female') {
      return 'autumn'; // Warm, friendly with professional yet approachable tone
    } else {
      return 'ryan'; // Rhythmic voice with theatrical flair - excellent for customer service
    }
  } else {
    // Sarvam TTS voices (Indian Languages)
    const maleVoices = ['hitesh'];
    const femaleVoices = ['manisha'];
    
    if (gender.toLowerCase() === 'female') {
      return femaleVoices[Math.floor(Math.random() * femaleVoices.length)];
    } else {
      return maleVoices[Math.floor(Math.random() * maleVoices.length)];
    }
  }
}


/**
 * Generate a JWT token for authentication only (no config overrides)
 * This matches the Python script's generate_token function
 */
function generateAuthToken(): string {
  const jwtSecret = process.env.PIXPOC_JWT_SECRET || '';
  const tokenMinutes = parseInt(process.env.PIXPOC_TOKEN_MINUTES || '10');
  
  if (!jwtSecret) {
    throw new Error('PIXPOC_JWT_SECRET environment variable not configured');
  }

  // Set expiration time
  const now = Math.floor(Date.now() / 1000);
  const expiration = now + (tokenMinutes * 60);

  // JWT payload now only contains authentication info, not config overrides
  const payload = {
    exp: expiration,
    iat: now,
  };
  
  return jwt.sign(payload, jwtSecret, { algorithm: 'HS256' });
}

/**
 * Normalize overrides to match the new API schema expected by the backend
 * This function matches the _normalize_overrides function from the Python script
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

  // Generate dynamic tracking ID using UUID (matches Python script approach)
  const trackingId = randomUUID();

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
    // Default AI flow if no expectedFlow - now with gender-appropriate name and company details
    const languageName = supportedLanguages.find(lang => lang.code === language)?.name || 'English';
    aiFlowParts.push(`You are ${aiAssistantName}, a helpful and friendly AI assistant created by Pixpoc AI Technologies Pvt. Ltd.`);
    aiFlowParts.push(`COMPANY BACKGROUND: You represent Pixpoc AI Technologies Pvt. Ltd. (https://pixpoc.ai), based in Pune, Maharashtra, India. We specialize in AI-powered voice automation for businesses through our VoiceAI platform.`);
    aiFlowParts.push(`OUR OFFERING: VoiceAI enables businesses to deploy hyper-realistic AI calling agents for customer service, sales, logistics, recruitment, and multi-channel integration (WhatsApp, Zoho, HubSpot, Freshdesk, Google Calendar). Key features include ultra-realistic voices with <300ms latency, 30+ language support, custom API integration, and enterprise-grade scalability. Learn more at pixpoc.ai.`);
    aiFlowParts.push(`Please answer customer questions about our VoiceAI platform in ${languageName}. Always mention you're calling from Pixpoc AI Technologies. When describing features or capabilities, always include "visit pixpoc.ai" or "learn more at pixpoc.ai" in your responses. For pricing and detailed information, direct them to visit https://pixpoc.ai. Do not reveal your model name or technical details. Always be polite, confirm the customer has all the information they need before ending the call, and do not hurry to finish the call.`);
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

  // Build normalized overrides object matching Python script structure
  const overrides = {
    tracking_id: trackingId,
    ai_flow: aiFlow,
    
    // Phone numbers and method
    to_number: phoneNumber,
    from_number: fromNumber,
    method: 'phone',
    
    // Provider configuration (default to Twilio)
    provider: 'twilio',
    
    // Voice settings (moved from nested tts_options to root level)
    voice: getVoiceName(gender, language),
    gender: gender,
    
    // Call settings with language nested (matches Python script structure)
    call_settings: {
      language: language,
      max_duration_seconds: maxCallDuration,
      enable_max_duration: true,
      allow_interruptions: true,
      auto_initial_greeting: true,
      auto_end_greeting: true,
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
 * Prepare call request data in the new API format with numbers_to_call array
 * This matches the Python script's prepare_call_requests function
 */
function prepareCallRequests(
  phoneNumber: string,
  language: string,
  name?: string,
  expectedFlow?: string
): PixPocRequestBody {
  const callConfig = normalizeOverrides(phoneNumber, language, name, expectedFlow);
  
  // Build request body in new bulk format
  const requestBody: PixPocRequestBody = {
    provider: callConfig.provider as string,
    from_number: callConfig.from_number as string,
    method: callConfig.method as string,
    voice: callConfig.voice as string,
    gender: callConfig.gender as string,
    call_settings: callConfig.call_settings as Record<string, string | number | boolean>,
    idle_detection: callConfig.idle_detection as Record<string, string | number | boolean>,
    messages: {},
    callback: callConfig.callback as Record<string, string | number | boolean>,
    numbers_to_call: [
      {
        to_number: callConfig.to_number as string,
        ai_flow: callConfig.ai_flow as string,
        tracking_id: callConfig.tracking_id as string
      }
    ]
  };

  return requestBody;
}

/**
 * Initiates a phone call using the Voice API (matching new Python script approach)
 */
export async function initiateCallWithPixPoc({ phoneNumber, language, name, expectedFlow }: PixPocVoiceCallParams): Promise<PixPocVoiceCallResponse> {
  // Define these variables at function level so they're available in catch blocks
  let languageName = '';
  let aiFlow = '';
  let trackingId = '';

  try {
    // Get API configuration from environment variables
    const apiServerUrl = process.env.PIXPOC_SERVER_URL || 'https://lxjihu6hrj.execute-api.ap-south-1.amazonaws.com/dev';
    const apiEndpoint = `${apiServerUrl}/initiate`;
    const timeout = 30; // Fixed timeout
    
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
    
    // Generate authentication token (simplified JWT)
    const authToken = generateAuthToken();
    
    // Prepare request data in new bulk format
    const requestData = prepareCallRequests(phoneNumber, language, name, expectedFlow);
    
    // Extract tracking ID for logging
    trackingId = requestData.numbers_to_call[0].tracking_id as string;

    // Log the API call details
    console.log(`[PIXPOC_CALL_INITIATED] Making API call to: ${apiEndpoint}`);
    console.log(`[PIXPOC_CALL_INITIATED] Method: POST`);
    console.log(`[PIXPOC_CALL_INITIATED] Authentication: Bearer Token`);
    console.log(`[PIXPOC_CALL_INITIATED] To Number: ${phoneNumber}`);
    console.log(`[PIXPOC_CALL_INITIATED] From Number: ${process.env.PIXPOC_FROM_NUMBER || siteConfig.company.phone}`);
    console.log(`[PIXPOC_CALL_INITIATED] Language: ${language} (${languageName})`);
    console.log(`[PIXPOC_CALL_INITIATED] Provider: twilio`);
    console.log(`[PIXPOC_CALL_INITIATED] Voice: ${requestData.voice}`);
    console.log(`[PIXPOC_CALL_INITIATED] Gender: ${requestData.gender}`);
    console.log(`[PIXPOC_CALL_INITIATED] Tracking ID: ${trackingId}`);
    console.log(`[PIXPOC_CALL_INITIATED] Name: ${name || 'Not provided'}`);
    console.log(`[PIXPOC_CALL_INITIATED] Expected Flow: ${expectedFlow ? 'Provided' : 'Not provided'}`);
    console.log(`[PIXPOC_CALL_INITIATED] AI Flow: ${aiFlow}`);
    console.log(`[PIXPOC_CALL_INITIATED] Request Data:`, JSON.stringify(requestData, null, 2));
    
    // Make the API request with Bearer token authentication (new format)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout * 1000);
    
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`, // Bearer token authentication
        'User-Agent': 'VoiceCallingAgent-Client/1.0',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestData), // New bulk format
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    // Parse the response
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[PIXPOC_CALL_ERROR] API Error Response:`, {
        status: response.status,
        statusText: response.statusText,
        errorText,
        trackingId
      });
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    
    // Log success with detailed information
    console.log(`[PIXPOC_CALL_SUCCESS] Call initiated successfully:`, {
      callId: data.call_sid || data.id || data.callId,
      status: data.status,
      message: data.message,
      trackingId,
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
          trackingId,
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
          trackingId,
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
          languageName,
          trackingId
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
        trackingId,
        aiFlow
      }
    });
    return {
      success: false,
      error: 'Unable to process call request'
    };
  }
} 