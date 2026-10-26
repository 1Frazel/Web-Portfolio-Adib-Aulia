import { useEffect, useRef } from 'react';
import posthog from 'posthog-js';

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY;
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com';

let isInitialized = false;

/**
 * Initialize PostHog analytics once at application startup.
 */
export function initAnalytics() {
  if (isInitialized || typeof window === 'undefined' || !POSTHOG_KEY) return;

  try {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      person_profiles: 'always',
      capture_pageview: false, // Handled explicitly for SPA route transitions (/ vs /ui-ux)
      capture_pageleave: true,
      autocapture: true, // Enables heatmaps, rageclicks, and session replay
    });
    isInitialized = true;

    if (import.meta.env.DEV) {
      console.info('[Analytics] PostHog initialized successfully.');
    }
  } catch (err) {
    if (import.meta.env.DEV) {
      console.warn('[Analytics] Failed to initialize PostHog:', err);
    }
  }
}

/**
 * Returns 'ui-ux' or 'main' based on current pathname.
 */
export function getCurrentPortfolioPage() {
  if (typeof window === 'undefined') return 'main';
  const path = window.location.pathname.replace(/\/+$/, '').toLowerCase();
  return path.endsWith('/ui-ux') ? 'ui-ux' : 'main';
}

/**
 * Send a custom tracking event to PostHog with automatic page metadata.
 */
export function trackEvent(eventName, properties = {}) {
  if (typeof window === 'undefined') return;

  const payload = {
    portfolio_page: getCurrentPortfolioPage(),
    path: window.location.pathname,
    ...properties,
  };

  if (import.meta.env.DEV || window.localStorage?.getItem('debug_analytics') === 'true') {
    console.log(`%c[Analytics] ${eventName}`, 'color: #38bdf8; font-weight: 600;', payload);
  }

  try {
    if (isInitialized) {
      posthog.capture(eventName, payload);
    }
  } catch {
    // Ignore errors if blocked by browser extensions
  }
}

/**
 * Track SPA page views for both PostHog built-in $pageview and custom page_view.
 */
export function trackPageView(pageName, extraProperties = {}) {
  if (typeof window === 'undefined') return;

  const referrer = document.referrer || 'direct';
  const payload = {
    $current_url: window.location.href,
    portfolio_page: pageName,
    path: window.location.pathname,
    referrer,
    ...extraProperties,
  };

  if (import.meta.env.DEV || window.localStorage?.getItem('debug_analytics') === 'true') {
    console.log(`%c[Analytics] page_view (${pageName})`, 'color: #34d399; font-weight: 700;', payload);
  }

  try {
    if (isInitialized) {
      posthog.capture('$pageview', payload);
      posthog.capture('page_view', payload);
    }
  } catch {
    // Ignore errors if blocked by browser extensions
  }
}

/**
 * Hook: Tracks scroll depth milestones (25%, 50%, 75%, 100%) on the active page.
 */
export function useScrollDepthTracker(pageName) {
  useEffect(() => {
    const reachedMilestones = new Set();
    const milestones = [25, 50, 75, 100];

    function handleScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight <= 0) return;

      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      milestones.forEach((milestone) => {
        if (scrollPercent >= milestone && !reachedMilestones.has(milestone)) {
          reachedMilestones.add(milestone);
          trackEvent('scroll_depth_milestone', {
            portfolio_page: pageName,
            depth_percent: milestone,
          });
        }
      });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pageName]);
}

/**
 * Hook: Tracks section visibility, reading milestones (e.g. 15s, 30s, 60s),
 * and total active dwell time (pauses when browser tab is hidden).
 */
export function useSectionReadingTracker({
  sectionId,
  sectionName,
  eventPrefix = 'section',
  milestones = [10, 30, 60],
  extraProps = {},
}) {
  const extraPropsRef = useRef(extraProps);
  extraPropsRef.current = extraProps;

  useEffect(() => {
    const element = document.getElementById(sectionId);
    if (!element || typeof IntersectionObserver === 'undefined') return;

    let isVisible = false;
    let hasViewed = false;
    let activeSeconds = 0;
    let sessionSeconds = 0;
    const firedMilestones = new Set();

    const flushDwellTime = () => {
      if (sessionSeconds >= 3) {
        trackEvent(`${eventPrefix}_dwell_time`, {
          section_id: sectionId,
          section_name: sectionName,
          dwell_seconds: sessionSeconds,
          total_cumulative_seconds: activeSeconds,
          ...extraPropsRef.current,
        });
      }
      sessionSeconds = 0;
    };

    const intervalId = window.setInterval(() => {
      if (!isVisible || document.visibilityState !== 'visible') return;

      activeSeconds += 1;
      sessionSeconds += 1;

      milestones.forEach((milestone) => {
        if (activeSeconds === milestone && !firedMilestones.has(milestone)) {
          firedMilestones.add(milestone);
          const readingTier =
            milestone >= 45 ? 'deep_read' : milestone >= 15 ? 'engaged_read' : 'skimmed';

          trackEvent(`${eventPrefix}_read_milestone`, {
            section_id: sectionId,
            section_name: sectionName,
            milestone_seconds: milestone,
            reading_tier: readingTier,
            ...extraPropsRef.current,
          });
        }
      });
    }, 1000);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible = true;
            if (!hasViewed) {
              hasViewed = true;
              trackEvent(`${eventPrefix}_view`, {
                section_id: sectionId,
                section_name: sectionName,
                ...extraPropsRef.current,
              });
            }
          } else if (isVisible) {
            isVisible = false;
            flushDwellTime();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(element);

    return () => {
      window.clearInterval(intervalId);
      observer.disconnect();
      if (isVisible) {
        flushDwellTime();
      }
    };
  }, [sectionId, sectionName, eventPrefix]);
}

/**
 * Hook: Tracks Swiper carousel slide views, engaged reading (>= threshold seconds
 * while the carousel section is visible on screen), and per-slide dwell time.
 */
export function useCarouselSlideTracker({
  sectionId,
  category,
  items,
  activeIndex,
  engagedThresholdSec = 5,
}) {
  const isSectionVisibleRef = useRef(false);
  const viewedSlidesOnEnterRef = useRef(false);

  // Track whether the parent carousel section is currently in the viewport
  useEffect(() => {
    const element = document.getElementById(sectionId);
    if (!element || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isSectionVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [sectionId]);

  useEffect(() => {
    const item = items[activeIndex];
    if (!item) return;

    let dwellSeconds = 0;
    let hasFiredSlideView = false;
    let hasFiredEngaged = false;

    const baseProps = {
      slide_index: activeIndex,
      title: item.title,
      ...(item.job ? { job: item.job } : {}),
      ...(item.corporation ? { corporation: item.corporation } : {}),
      ...(item.skills ? { skills: item.skills } : {}),
    };

    const maybeFireSlideView = () => {
      if (!hasFiredSlideView && isSectionVisibleRef.current && document.visibilityState === 'visible') {
        hasFiredSlideView = true;
        viewedSlidesOnEnterRef.current = true;
        trackEvent(`${category}_slide_view`, baseProps);
      }
    };

    maybeFireSlideView();

    const intervalId = window.setInterval(() => {
      if (!isSectionVisibleRef.current || document.visibilityState !== 'visible') return;

      maybeFireSlideView();
      dwellSeconds += 1;

      if (dwellSeconds >= engagedThresholdSec && !hasFiredEngaged) {
        hasFiredEngaged = true;
        trackEvent(`${category}_read_engaged`, {
          ...baseProps,
          engaged_seconds: engagedThresholdSec,
        });
      }
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
      if (dwellSeconds >= 2) {
        trackEvent(`${category}_slide_dwell`, {
          ...baseProps,
          dwell_seconds: dwellSeconds,
        });
      }
    };
  }, [sectionId, category, items, activeIndex, engagedThresholdSec]);
}
