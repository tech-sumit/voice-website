# Voice Configuration Guide

## Overview
This document describes the voice configuration for the VoiceAI platform, supporting both LMNT TTS and Sarvam TTS providers.

## Supported Languages

### LMNT TTS (Ultra-Low Latency) ⚡
Used for 21 international languages with ultra-low latency (<300ms):

- Arabic (ar)
- Chinese (zh)
- Dutch (nl)
- English US (en-US)
- French (fr)
- German (de)
- Hindi Nepal (hi-NE)
- Indonesian (id)
- Italian (it)
- Japanese (ja)
- Korean (ko)
- Polish (pl)
- Portuguese (pt)
- Russian (ru)
- Spanish (es)
- Swedish (sv)
- Thai (th)
- Turkish (tr)
- Ukrainian (uk)
- Urdu (ur)
- Vietnamese (vi)

**Voice Options:**
- **Female (Default):** Autumn - Warm, friendly with professional yet approachable tone
- **Male:** Ryan - Rhythmic voice with theatrical flair, excellent for customer service

### Sarvam TTS (Indian Languages) 🇮🇳
Used for 9 Indian languages:

- Bengali (bn-IN)
- English India (en-IN)
- Gujarati (gu-IN)
- Hindi India (hi-IN)
- Kannada (kn-IN)
- Malayalam (ml-IN)
- Marathi (mr-IN)
- Punjabi (pa-IN)
- Tamil (ta-IN)

**Voice Options:**
- **Female:** Manisha
- **Male:** Hitesh

## Voice Selection Logic

The system automatically selects the appropriate voice based on:
1. **Language:** Determines which TTS provider (LMNT or Sarvam) to use
2. **Gender Setting:** Uses the `PIXPOC_GENDER` environment variable (default: "male")

### Implementation Details

```typescript
function getVoiceName(gender: string, language: string): string {
  // Check if language uses LMNT TTS
  if (lmntLanguages.includes(language)) {
    return gender === 'female' ? 'autumn' : 'ryan';
  } else {
    // Sarvam TTS for Indian languages
    return gender === 'female' ? 'manisha' : 'hitesh';
  }
}
```

## Configuration

### Environment Variables

Set the gender preference in your `.env` or `.env.local` file:

```env
# Options: male, female
PIXPOC_GENDER=female
```

### Available LMNT Voices (Reference)

While we currently use only two voices, LMNT TTS supports additional options:

**Male Voices:**
- **Ryan** (Current) - Rhythmic voice with theatrical flair - excellent for customer service
- Evander - Weathered, husky voice with calm, comforting presence
- Zain - Smoky voice that's both kind and curious
- Brandon - Clear, stable American broadcaster voice

**Female Voices:**
- **Autumn** (Current, Default) - Warm, friendly with professional yet approachable tone
- Leah - Confident, expressive with dynamic intonation - great for support
- Natalie - Bright, youthful with animated, friendly energy
- Violet - Uplifting voice, warm and understanding for customer support

## Best Practices

1. **Default Configuration:** Use "female" gender with "autumn" voice for the most approachable tone
2. **Customer Service:** Both "autumn" and "ryan" voices are optimized for customer support
3. **Language Support:** All 30 languages are production-ready with appropriate voices
4. **Performance:** LMNT voices provide <300ms latency for real-time conversations

## Testing

To test different voice configurations:

1. Change the `PIXPOC_GENDER` environment variable
2. Restart the development server
3. Initiate a test call through the callback form
4. The system will automatically use the appropriate voice for the selected language

## Future Enhancements

Potential improvements to consider:
- Allow users to select voice preference during callback request
- Add voice personality customization (tone, speed, pitch)
- Support for additional LMNT voices per language
- Voice A/B testing for conversion optimization

