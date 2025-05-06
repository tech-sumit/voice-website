# Setting Up reCAPTCHA 

This document provides instructions for configuring reCAPTCHA in your VoiceAI application.

## Overview

reCAPTCHA protects your application from spam and abuse while providing a smooth user experience. VoiceAI supports two verification methods:

1. **Direct API Verification** (Recommended) - Simple HTTP-based verification using a secret key
2. **Google Cloud reCAPTCHA Enterprise** - Advanced verification through the Google Cloud API

## Method 1: Direct API Verification (Recommended)

This method is simpler and requires minimal setup.

### Step 1: Register Your Site

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Sign in with your Google account
3. Register a new site:
   - Select reCAPTCHA v3
   - Enter your domain name(s)
   - Accept the terms of service
   - Submit the form

### Step 2: Get Your Keys

After registration, you'll receive two keys:
- **Site Key** - Used in the frontend
- **Secret Key** - Used in the backend (keep this secure)

### Step 3: Configure Environment Variables

Add these variables to your `.env.local` file:

```
# reCAPTCHA settings
RECAPTCHA_SECRET_KEY=your-secret-key-here
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key-here
```

## Method 2: Google Cloud reCAPTCHA Enterprise

This method provides advanced features and analytics.

### Step 1: Set Up a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the reCAPTCHA Enterprise API
4. Set up authentication (create a service account and download the JSON key)

### Step 2: Register Your Key

1. In the Google Cloud Console, navigate to Security → reCAPTCHA Enterprise
2. Create a new key:
   - Select Web platform
   - Choose reCAPTCHA v3
   - Enter your domain(s)
   - Configure settings as needed

### Step 3: Configure Environment Variables

Add these variables to your `.env.local` file:

```
# Google Cloud reCAPTCHA Enterprise
RECAPTCHA_PROJECT_ID=your-project-id
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key-here
```

## Verifying Your Setup

To test your reCAPTCHA implementation:

1. Start your development server (`npm run dev`)
2. Navigate to the callback form
3. Fill in the form and submit
4. Check your server logs to verify reCAPTCHA is working:
   - You should see `Using direct reCAPTCHA verification API` or `Using Google Cloud reCAPTCHA Enterprise API`
   - A successful verification should show `reCAPTCHA score: [score]`

## Troubleshooting

If you encounter issues:

- **Invalid domain:** Make sure your domain is listed in the reCAPTCHA Admin Console
- **Missing keys:** Verify all environment variables are set correctly
- **Network errors:** Check that your server can reach the reCAPTCHA API
- **Score too low:** Adjust the threshold in the code (default is 0.5)

## Additional Resources

- [Official reCAPTCHA Documentation](https://developers.google.com/recaptcha/docs/verify)
- [reCAPTCHA v3 Documentation](https://developers.google.com/recaptcha/docs/v3)
- [Google Cloud reCAPTCHA Enterprise](https://cloud.google.com/recaptcha-enterprise/docs) 