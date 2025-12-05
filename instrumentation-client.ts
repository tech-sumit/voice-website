import posthog from 'posthog-js'

// Determine the API host based on environment
const getApiHost = () => {
  // In browser, use reverse proxy to bypass ad blockers
  // Using /ph-data instead of /ingest to avoid ad blocker filters
  if (typeof window !== 'undefined') {
    return window.location.origin + '/ph-data'
  }
  // Fallback to direct PostHog URL (server-side or if window not available)
  return process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'
}

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: getApiHost(),
  ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com', // Keep this as PostHog URL for dashboard links
  person_profiles: 'identified_only',
  capture_pageview: false, // We'll capture pageviews manually in the provider
  capture_pageleave: true,
  
  // Enable comprehensive session tracking
  session_recording: {
    recordCrossOriginIframes: true,
  },
  
  // Autocapture settings for detailed user interaction tracking
  autocapture: {
    dom_event_allowlist: ['click', 'change', 'submit'], // Track clicks, form changes, and submissions
    url_allowlist: [], // Track all URLs
    element_allowlist: [], // Track all elements
    css_selector_allowlist: [], // Track all selectors
  },
  
  // Capture performance metrics
  capture_performance: true,
  
  // Enable IP geolocation (country, city, region/state)
  ip: true, // PostHog will use IP to determine location
  
  // Capture initial referrer and UTM parameters
  persistence: 'localStorage+cookie',
  
  defaults: '2025-11-30'
});
