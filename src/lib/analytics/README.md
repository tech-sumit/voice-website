# Analytics Module

This module provides comprehensive analytics integration using PostHog.

## Structure

```
src/lib/analytics/
├── index.ts            # Main exports (use this for imports)
├── client.ts           # Client-side tracking functions
├── provider.tsx        # PostHog PageView provider component
├── README.md           # This file
└── ANALYTICS_DATA.md   # Complete list of captured data points
```

## Usage

### Import tracking functions

```typescript
import { trackEvent, identifyUser, resetUser } from '@/lib/analytics'

// Track a custom event
trackEvent('button_clicked', { button_name: 'Subscribe' })

// Identify a user
identifyUser('user_123', { email: 'user@example.com' })

// Reset user (on logout)
resetUser()
```

### Available Functions

- `trackEvent(eventName, properties?)` - Track custom events
- `identifyUser(userId, properties?)` - Identify users
- `resetUser()` - Reset user session
- `setUserProperties(properties)` - Update user properties
- `getPostHog()` - Get PostHog instance for advanced usage

### PageView Tracking

The `PostHogPageView` component is automatically included in the root layout and tracks page navigation.

## Configuration

Set these environment variables in `.env.local`:

```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_your_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```
