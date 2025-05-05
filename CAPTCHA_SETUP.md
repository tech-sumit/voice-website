# Setting Up reCAPTCHA for the Callback Form

This document provides instructions for setting up Google reCAPTCHA v3 to protect the callback form from spam and bots.

## Getting reCAPTCHA Keys

1. Go to the [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Sign in with your Google account
3. Click on the "+" button to register a new site
4. Enter a label for your site (e.g., "VoiceAI Website")
5. Choose "reCAPTCHA v3" as the type
6. Add your domains (e.g., yourdomain.com, localhost for development)
7. Accept the Terms of Service and click "Submit"
8. You'll receive two keys:
   - Site Key (public key for your frontend)
   - Secret Key (private key for your backend)

## Configuring Environment Variables

Add the following environment variables to your `.env.local` file:

```
# reCAPTCHA keys
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

For development purposes, you can use Google's test keys:
- Site Key: `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`
- Secret Key: `6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe`

⚠️ **Important:** Replace these test keys with your actual keys before deploying to production!

## How reCAPTCHA Works in This Implementation

1. The reCAPTCHA component is loaded invisibly in the form
2. When the user submits the form, reCAPTCHA verification is executed
3. The verification token is sent with the form data to the server
4. The server verifies the token with Google's API
5. If verification passes, the form submission is processed
6. If verification fails, an error message is shown to the user

## Security Considerations

- The reCAPTCHA secret key should never be exposed to the client side
- Always verify tokens on the server side, even if they're validated on the client
- Update reCAPTCHA keys periodically for enhanced security
- Monitor for any unusual submission patterns in your server logs

## Debugging

If you encounter issues with reCAPTCHA:

1. Check browser console for any JavaScript errors
2. Ensure environment variables are correctly set
3. Verify that your domain is correctly registered in the reCAPTCHA admin console
4. For local development, ensure `localhost` is included in the allowed domains
5. Check server logs for verification errors

## Additional Resources

- [Google reCAPTCHA Documentation](https://developers.google.com/recaptcha/docs/v3)
- [React Google reCAPTCHA Package](https://github.com/dozoisch/react-google-recaptcha) 