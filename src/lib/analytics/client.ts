import posthog from 'posthog-js'

/**
 * Get comprehensive user context data
 * Includes timezone, language, screen info, and more
 */
export function getUserContext() {
  if (typeof window === 'undefined') return {}
  
  return {
    // Timezone and time
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezone_offset: new Date().getTimezoneOffset(),
    local_time: new Date().toISOString(),
    
    // Language and locale
    language: navigator.language,
    languages: navigator.languages,
    
    // Device and screen info
    screen_width: window.screen.width,
    screen_height: window.screen.height,
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight,
    pixel_ratio: window.devicePixelRatio,
    
    // Browser info
    user_agent: navigator.userAgent,
    platform: navigator.platform,
    vendor: navigator.vendor,
    
    // Connection info (if available)
    connection_type: (navigator as any).connection?.effectiveType || 'unknown',
    connection_downlink: (navigator as any).connection?.downlink || 'unknown',
    
    // Other
    cookie_enabled: navigator.cookieEnabled,
    online: navigator.onLine,
  }
}

/**
 * Send a custom event to PostHog with automatic user context
 * @param eventName - The name of the event
 * @param properties - Optional properties to attach to the event
 * 
 * @example
 * trackEvent('button_clicked', { button_name: 'Subscribe' })
 */
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined' && posthog) {
    const context = getUserContext()
    posthog.capture(eventName, {
      ...context,
      ...properties,
    })
  }
}

/**
 * Identify a user in PostHog
 * @param userId - Unique identifier for the user
 * @param properties - Optional user properties
 * 
 * @example
 * identifyUser('user_123', { email: 'user@example.com', name: 'John Doe' })
 */
export function identifyUser(userId: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined' && posthog) {
    posthog.identify(userId, properties)
  }
}

/**
 * Reset the PostHog user (useful for logout)
 */
export function resetUser() {
  if (typeof window !== 'undefined' && posthog) {
    posthog.reset()
  }
}

/**
 * Set user properties
 * @param properties - Properties to set for the current user
 * 
 * @example
 * setUserProperties({ plan: 'premium', company: 'Acme Inc' })
 */
export function setUserProperties(properties: Record<string, any>) {
  if (typeof window !== 'undefined' && posthog) {
    posthog.people.set(properties)
  }
}

/**
 * Get the PostHog instance (for advanced usage)
 */
export function getPostHog() {
  return posthog
}

/**
 * Track page performance metrics
 */
export function trackPagePerformance() {
  if (typeof window === 'undefined' || !posthog) return
  
  // Wait for page to fully load
  if (document.readyState === 'complete') {
    capturePerformanceMetrics()
  } else {
    window.addEventListener('load', capturePerformanceMetrics)
  }
}

function capturePerformanceMetrics() {
  if (typeof window === 'undefined' || !posthog) return
  
  const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
  
  if (perfData) {
    posthog.capture('page_performance', {
      page_load_time: perfData.loadEventEnd - perfData.fetchStart,
      dom_content_loaded: perfData.domContentLoadedEventEnd - perfData.fetchStart,
      dns_time: perfData.domainLookupEnd - perfData.domainLookupStart,
      tcp_time: perfData.connectEnd - perfData.connectStart,
      request_time: perfData.responseEnd - perfData.requestStart,
      response_time: perfData.responseEnd - perfData.responseStart,
      dom_processing_time: perfData.domComplete - perfData.domInteractive,
    })
  }
}
