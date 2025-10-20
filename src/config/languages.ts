export interface Language {
  code: string;
  name: string;
}

// List of supported languages by the voice AI system
const supportedLanguages: Language[] = [
  // LMNT TTS (Ultra-Low Latency) ⚡
  { code: "ar", name: "Arabic" },
  { code: "zh", name: "Chinese" },
  { code: "nl", name: "Dutch" },
  { code: "en-US", name: "English US" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "hi-NE", name: "Hindi New" },
  { code: "id", name: "Indonesian" },
  { code: "it", name: "Italian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "pl", name: "Polish" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "es", name: "Spanish" },
  { code: "sv", name: "Swedish" },
  { code: "th", name: "Thai" },
  { code: "tr", name: "Turkish" },
  { code: "uk", name: "Ukrainian" },
  { code: "ur", name: "Urdu" },
  { code: "vi", name: "Vietnamese" },
  
  // Sarvam TTS (Indian Languages) 🇮🇳
  { code: "bn-IN", name: "Bengali" },
  { code: "en-IN", name: "English India" },
  { code: "gu-IN", name: "Gujarati" },
  { code: "hi-IN", name: "Hindi" },
  { code: "kn-IN", name: "Kannada" },
  { code: "ml-IN", name: "Malayalam" },
  { code: "mr-IN", name: "Marathi" },
  { code: "pa-IN", name: "Punjabi" },
  { code: "ta-IN", name: "Tamil" },
];

export default supportedLanguages; 