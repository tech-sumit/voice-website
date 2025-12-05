This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# VoiceAI Website

Ultra-realistic AI Phone Calls for Business

## Overview

This website showcases VoiceAI, a platform for creating realistic AI phone agents that work 24/7, speak multiple languages, and integrate with existing business tools.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Security Features

### reCAPTCHA Integration

The callback form is protected by Google reCAPTCHA v3, which runs in the background without interrupting users. We use the Direct API Verification method (recommended) for validating tokens.

For setup instructions, see [RECAPTCHA_SETUP.md](./RECAPTCHA_SETUP.md).

Required environment variables for reCAPTCHA:
```
RECAPTCHA_SECRET_KEY=your-secret-key-here
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key-here
```

## Analytics Setup (PostHog)

This project includes comprehensive analytics using PostHog to track user behavior, location, device info, and more.

### Quick Setup:

1. Sign up for [PostHog](https://app.posthog.com/signup) (free account, no credit card)
2. Get your Project API Key from Project Settings
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_POSTHOG_KEY=phc_your_real_key_here
   NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
   ```
4. For Netlify deployment, add these same variables to your Netlify environment variables

### What Gets Tracked:
- ✅ **Location**: Country, State, City (via IP geolocation)
- ✅ **Timezone**: User's actual timezone
- ✅ **Device**: Browser, OS, screen size
- ✅ **Page Views**: All navigation automatically tracked
- ✅ **User Interactions**: Clicks, form submissions
- ✅ **Session Recordings**: Watch actual user sessions
- ✅ **Performance Metrics**: Page load times, network info

### Deployment Notes:
- Includes reverse proxy configuration (`netlify.toml`) to bypass ad blockers
- Uses `/ph-data` path instead of generic paths to avoid blocking
- See `DEPLOYMENT_CHECKLIST.md` for complete deployment guide
- See `src/lib/analytics/` for implementation details

## Contact Form Setup

To make the contact form functional and receive emails:

1. Sign up for an account on [Resend](https://resend.com)
2. Get your API key from the Resend dashboard
3. Create a `.env.local` file in the root of your project with the following content:
   ```
   # Resend API key for sending emails from the contact form
   RESEND_API_KEY=re_123456789

   # Your website domain (used for the 'from' email address)
   NEXT_PUBLIC_SITE_DOMAIN=yourdomain.com
   
   # PostHog Analytics
   NEXT_PUBLIC_POSTHOG_KEY=phc_your_real_key_here
   NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
   ```
4. Replace `re_123456789` with your actual API key from Resend
5. Replace `yourdomain.com` with your actual domain
6. Replace `phc_your_real_key_here` with your actual PostHog API key

When the contact form is submitted, you'll receive an email at the address configured in `src/config/site.json` under `company.email`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
