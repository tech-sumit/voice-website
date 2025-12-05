# Analytics Data Captured by PostHog

This document outlines all the data points captured by our PostHog integration.

## 🌍 Automatic Data (Captured by PostHog)

### Location Data (IP-based Geolocation)
PostHog automatically resolves these from the user's IP address:
- **Country** - e.g., "United States"
- **Region/State** - e.g., "California" 
- **City** - e.g., "San Francisco"
- **Continent** - e.g., "North America"
- **Latitude/Longitude** - Approximate coordinates

### Device & Browser Info
- **Browser** - Chrome, Firefox, Safari, Edge, etc.
- **Browser Version** - e.g., "Chrome 120.0.0"
- **Operating System** - Windows, macOS, Linux, iOS, Android
- **OS Version** - e.g., "macOS 14.1"
- **Device Type** - Desktop, Mobile, Tablet
- **Device Brand** - Apple, Samsung, Google, etc. (for mobile)

### Session & Engagement
- **Session ID** - Unique identifier for each session
- **Session Duration** - How long the user stayed
- **Page Views** - All pages visited
- **Referrer** - Where the user came from
- **UTM Parameters** - Campaign tracking (utm_source, utm_medium, utm_campaign, etc.)
- **Entry Page** - First page visited
- **Exit Page** - Last page before leaving

### Interaction Data (AutoCapture)
- **Clicks** - All button and link clicks
- **Form Submissions** - When forms are submitted
- **Form Changes** - When form fields are modified
- **Element Text** - Text of clicked elements
- **CSS Selectors** - Unique identifiers for clicked elements

## 📊 Custom Data (Captured by Our Code)

### Timezone & Time
- **Timezone** - e.g., "America/New_York", "Asia/Kolkata"
- **Timezone Offset** - Minutes from UTC
- **Local Time** - User's current local time
- **Visit Timestamp** - When the event occurred

### Language & Locale
- **Primary Language** - e.g., "en-US"
- **All Languages** - User's language preferences array

### Screen & Display
- **Screen Width** - Physical screen width in pixels
- **Screen Height** - Physical screen height in pixels
- **Viewport Width** - Browser window width
- **Viewport Height** - Browser window height
- **Pixel Ratio** - For retina/high-DPI displays

### Network & Connection
- **Connection Type** - 4g, 3g, 2g, slow-2g, wifi
- **Connection Speed** - Download speed (Mbps)
- **Online Status** - Whether user is online/offline

### Performance Metrics
- **Page Load Time** - Total time to load page
- **DOM Content Loaded** - Time until DOM is ready
- **DNS Time** - DNS lookup duration
- **TCP Time** - TCP connection time
- **Request Time** - Time to make HTTP request
- **Response Time** - Time to receive response
- **DOM Processing Time** - Time to process DOM

### Technical Details
- **User Agent** - Full browser user agent string
- **Platform** - Operating system platform
- **Vendor** - Browser vendor
- **Cookies Enabled** - Whether cookies are enabled
- **Pixel Ratio** - Screen pixel density

## 📈 Where to View This Data

### In PostHog Dashboard:

1. **Insights** - Create custom charts and funnels
   - Filter by country, city, browser, device, etc.
   - Group by any property (location, time, device)

2. **Persons** - View individual user profiles
   - See complete user journey
   - All properties and events for each user

3. **Session Recordings** - Watch actual user sessions
   - See exactly what users do
   - Filter by location, device, or any property

4. **Analytics Tab** - Quick overview
   - Geographic distribution map
   - Browser/OS breakdown
   - Device type distribution
   - Top pages and events

## 🔍 Example Queries in PostHog

### Users by Country
```
Event: $pageview
Group by: $geoip_country_name
```

### Users by State/Region
```
Event: $pageview
Group by: $geoip_subdivision_1_name
```

### Users by City
```
Event: $pageview
Group by: $geoip_city_name
```

### Users by Timezone
```
Event: $pageview or any custom event
Group by: timezone
```

### Mobile vs Desktop
```
Event: $pageview
Group by: $device_type
```

### Browser Distribution
```
Event: $pageview
Group by: $browser
```

## 🎯 Custom Event Tracking

You can track custom events with additional properties:

```typescript
import { trackEvent } from '@/lib/analytics'

// Example: Track demo booking
trackEvent('demo_booked', {
  demo_type: 'enterprise',
  preferred_date: '2024-01-15',
  company_size: '100-500',
  // User context (timezone, location, etc.) is added automatically
})
```

## 🔒 Privacy & Compliance

- IP addresses are processed for geolocation but can be anonymized
- No PII (Personally Identifiable Information) is captured by default
- Session recordings can be disabled or configured to mask sensitive data
- Full GDPR/CCPA compliance available through PostHog settings

## 🌐 PostHog Properties Reference

### Person Properties (User-level)
- `$geoip_country_code` - Two-letter country code (US, IN, GB)
- `$geoip_country_name` - Full country name
- `$geoip_subdivision_1_code` - State/region code (CA, NY, DL)
- `$geoip_subdivision_1_name` - State/region name (California, Delhi)
- `$geoip_city_name` - City name
- `$geoip_latitude` - Latitude coordinate
- `$geoip_longitude` - Longitude coordinate
- `$geoip_time_zone` - Timezone from IP
- `$browser` - Browser name
- `$browser_version` - Browser version
- `$os` - Operating system
- `$device_type` - desktop/mobile/tablet
- `$initial_referrer` - First referrer
- `$initial_utm_source` - First UTM source
- `timezone` - User's actual timezone (from our code)
- `language` - User's language preference

### Event Properties
All person properties plus:
- `$current_url` - Current page URL
- `$screen_height` - Screen height
- `$screen_width` - Screen width
- `$viewport_height` - Viewport height
- `$viewport_width` - Viewport width
- `$referrer` - Page referrer
- `$pathname` - URL pathname
- `$host` - Hostname
- Plus all custom properties from `getUserContext()`
