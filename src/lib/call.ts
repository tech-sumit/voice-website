import { initiateCallWithPandita } from './call-providers/pandita';

// Define the interface for call request parameters
export interface CallRequestParams {
  phoneNumber: string;
  language: string;
}

// Define the interface for call response
export interface CallResponse {
  success: boolean;
  callId?: string;
  error?: string;
}

/**
 * Initiates a call using the PanditaAI service
 * 
 * @param params Call request parameters (phone number and language)
 * @returns Promise resolving to the call response
 */
export async function initiateCall(params: CallRequestParams): Promise<CallResponse> {
  try {
    // Use PanditaAI as the call provider
    return await initiateCallWithPandita(params);
  } catch (error) {
    console.error(`Error in call initiation:`, error);
    return {
      success: false,
      error: 'Call service error'
    };
  }
}

/**
 * Logs call details for monitoring and debugging
 */
export function logCallRequest(phoneNumber: string, language: string, success: boolean, callId?: string, error?: string): void {
  console.log('Call Request Log:', {
    timestamp: new Date().toISOString(),
    phoneNumber,
    language,
    success,
    callId,
    error
  });
} 