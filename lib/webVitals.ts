/**
 * Web Vitals Monitoring Utility
 * Tracks Core Web Vitals: LCP, FID/INP, CLS, FCP, TTFB
 */

export interface WebVitalsMetrics {
  LCP?: number;
  FCP?: number;
  FID?: number;
  INP?: number;
  CLS?: number;
  TTFB?: number;
  [key: string]: number | undefined;
}

export interface WebVitalsReport {
  metric: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType?: string;
}

class WebVitalsMonitor {
  private metrics: WebVitalsMetrics = {};
  private observers: Set<(metrics: WebVitalsMetrics) => void> = new Set();

  constructor() {
    this.initializeObservers();
  }

  private initializeObservers() {
    // LCP - Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          this.metrics.LCP = Math.round(lastEntry.renderTime || lastEntry.loadTime);
          this.notifyObservers();
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'], buffered: true });
      } catch (e) {
        console.warn('LCP observer failed:', e);
      }

      // FCP - First Contentful Paint
      try {
        const fcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const fcpEntry = entries.find((entry) => entry.name === 'first-contentful-paint');
          if (fcpEntry) {
            this.metrics.FCP = Math.round(fcpEntry.startTime);
            this.notifyObservers();
          }
        });
        fcpObserver.observe({ entryTypes: ['paint'], buffered: true });
      } catch (e) {
        console.warn('FCP observer failed:', e);
      }

      // CLS - Cumulative Layout Shift
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
              this.metrics.CLS = Math.round(clsValue * 1000) / 1000;
              this.notifyObservers();
            }
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'], buffered: true });
      } catch (e) {
        console.warn('CLS observer failed:', e);
      }

      // INP/FID - Interaction to Next Paint / First Input Delay
      try {
        const inpObserver = new PerformanceObserver((entryList) => {
          let maxINP = 0;
          for (const entry of entryList.getEntries()) {
            if ((entry as any).duration > maxINP) {
              maxINP = (entry as any).duration;
            }
          }
          if (maxINP > 0) {
            this.metrics.INP = Math.round(maxINP);
            this.notifyObservers();
          }
        });
        inpObserver.observe({ entryTypes: ['first-input', 'event'], buffered: true });
      } catch (e) {
        console.warn('INP/FID observer failed:', e);
      }
    }

    // TTFB - Time to First Byte
    this.getNavigationTiming();
  }

  private getNavigationTiming() {
    if ('PerformanceNavigationTiming' in window) {
      try {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          this.metrics.TTFB = Math.round(navigation.responseStart - navigation.fetchStart);
          this.notifyObservers();
        }
      } catch (e) {
        console.warn('Navigation timing failed:', e);
      }
    }
  }

  private notifyObservers() {
    this.observers.forEach((callback) => {
      callback(this.metrics);
    });
  }

  public getMetrics(): WebVitalsMetrics {
    return { ...this.metrics };
  }

  public subscribe(callback: (metrics: WebVitalsMetrics) => void): () => void {
    this.observers.add(callback);
    // Return unsubscribe function
    return () => {
      this.observers.delete(callback);
    };
  }

  public getRating(metric: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    // Google Web Vitals thresholds
    const thresholds: { [key: string]: [number, number] } = {
      LCP: [2500, 4000],
      FCP: [1800, 3000],
      INP: [200, 500],
      FID: [100, 300],
      CLS: [0.1, 0.25],
      TTFB: [600, 1200],
    };

    const [good, poor] = thresholds[metric] || [0, Infinity];

    if (value <= good) return 'good';
    if (value <= poor) return 'needs-improvement';
    return 'poor';
  }

  public getReport(): WebVitalsReport[] {
    const reports: WebVitalsReport[] = [];

    for (const [metric, value] of Object.entries(this.metrics)) {
      if (value !== undefined) {
        reports.push({
          metric,
          value,
          rating: this.getRating(metric, value),
          delta: 0,
          id: `${metric}-${Date.now()}`,
        });
      }
    }

    return reports;
  }
}

// Create singleton instance
let monitorInstance: WebVitalsMonitor | null = null;

export function getWebVitalsMonitor(): WebVitalsMonitor {
  if (!monitorInstance) {
    if (typeof window !== 'undefined') {
      monitorInstance = new WebVitalsMonitor();
    }
  }
  return monitorInstance as WebVitalsMonitor;
}

export function useWebVitals(callback?: (metrics: WebVitalsMetrics) => void) {
  if (typeof window === 'undefined') return;

  const monitor = getWebVitalsMonitor();

  if (callback) {
    return monitor.subscribe(callback);
  }

  return () => {
    // no-op if no callback
  };
}
