import { useEffect } from 'react';

/**
 * Google Analytics Integration Component
 * Add this component to your main App.jsx to track page views and events
 * 
 * Setup Instructions:
 * 1. Create a Google Analytics property and get your Measurement ID (G-XXXXXXXXXX)
 * 2. Replace 'G-YOUR_MEASUREMENT_ID' with your actual ID below
 * 3. The script will automatically load and track page views
 */

export const GoogleAnalytics = ({ measurementId = 'G-YOUR_MEASUREMENT_ID' }) => {
  useEffect(() => {
    if (measurementId === 'G-YOUR_MEASUREMENT_ID') {
      console.warn('⚠️ Google Analytics: Measurement ID not configured. Please set your ID.');
      return;
    }

    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script1);

    // Initialize Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', measurementId, {
      page_path: window.location.pathname,
      send_page_view: true,
    });

    // Store gtag globally for custom events
    window.gtag = gtag;

    // Track page views on route change
    const handleRouteChange = () => {
      if (window.gtag) {
        window.gtag('event', 'page_view', {
          page_path: window.location.pathname,
          page_title: document.title,
        });
      }
    };

    // Listen for history changes (for SPA navigation)
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [measurementId]);

  return null;
};

/**
 * Helper function to track custom events
 * Usage: trackEvent('button_click', { button_name: 'submit' })
 */
export const trackEvent = (eventName, eventData = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, eventData);
  } else {
    console.warn('⚠️ Google Analytics not initialized');
  }
};

/**
 * Helper function to track page views
 * Useful when you have manual route changes not caught by popstate
 */
export const trackPageView = (path, title) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
    });
  }
};

export default GoogleAnalytics;
