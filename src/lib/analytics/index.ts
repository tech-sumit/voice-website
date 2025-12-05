/**
 * Analytics module - PostHog integration
 * 
 * This module provides a centralized analytics solution using PostHog.
 * It includes automatic page view tracking and helper functions for custom events.
 */

// Export client-side tracking functions
export {
  trackEvent,
  identifyUser,
  resetUser,
  setUserProperties,
  getPostHog,
  getUserContext,
  trackPagePerformance,
} from './client'

// Export provider component
export { PostHogPageView } from './provider'
