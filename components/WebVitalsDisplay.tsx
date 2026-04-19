'use client';

import React, { useEffect, useState } from 'react';
import { getWebVitalsMonitor, type WebVitalsMetrics } from '@/lib/webVitals';

interface MetricDisplay {
  label: string;
  value: number | string;
  unit: string;
  status: 'good' | 'needs-improvement' | 'poor' | 'pending';
}

const METRIC_THRESHOLDS = {
  LCP: { good: 2500, poor: 4000, unit: 'ms', label: 'Largest Contentful Paint' },
  FCP: { good: 1800, poor: 3000, unit: 'ms', label: 'First Contentful Paint' },
  INP: { good: 200, poor: 500, unit: 'ms', label: 'Interaction to Next Paint' },
  FID: { good: 100, poor: 300, unit: 'ms', label: 'First Input Delay' },
  CLS: { good: 0.1, poor: 0.25, unit: '', label: 'Cumulative Layout Shift' },
  TTFB: { good: 600, poor: 1200, unit: 'ms', label: 'Time to First Byte' },
};

export function WebVitalsDisplay() {
  const [metrics, setMetrics] = useState<WebVitalsMetrics>({});

  useEffect(() => {
    const monitor = getWebVitalsMonitor();
    const unsubscribe = monitor.subscribe((updatedMetrics) => {
      setMetrics(updatedMetrics);
    });

    // Initial update with current metrics
    setMetrics(monitor.getMetrics());

    return () => {
      unsubscribe();
    };
  }, []);

  const getStatus = (metric: string, value?: number): 'good' | 'needs-improvement' | 'poor' | 'pending' => {
    if (value === undefined) return 'pending';

    const threshold = METRIC_THRESHOLDS[metric as keyof typeof METRIC_THRESHOLDS];
    if (!threshold) return 'pending';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'good':
        return 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100';
      case 'needs-improvement':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100';
      case 'poor':
        return 'bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100';
    }
  };

  const displayMetrics: [string, MetricDisplay][] = Object.entries(
    METRIC_THRESHOLDS
  ).map(([key, config]) => {
    const value = metrics[key as keyof typeof metrics];
    const status = getStatus(key, value);

    return [
      key,
      {
        label: config.label,
        value: value !== undefined ? value : 'Measuring...',
        unit: config.unit,
        status,
      },
    ];
  }) as [string, MetricDisplay][];

  return (
    <div className="space-y-3">
      {displayMetrics.map(([key, metric]) => (
        <div
          key={key}
          className={`p-3 rounded-lg ${getStatusColor(metric.status)} transition-all duration-300`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-sm">{metric.label}</p>
              <p className="text-xs opacity-75 mt-1">
                {typeof metric.value === 'number' ? metric.value.toFixed(2) : metric.value}{' '}
                {metric.unit}
              </p>
            </div>
            <span className="text-xs font-medium uppercase tracking-wide">{metric.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Lightweight debug component that shows vital metrics in development
 */
export function WebVitalsDebug() {
  const [isOpen, setIsOpen] = useState(false);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-colors"
        title="Toggle Web Vitals Debug"
      >
        📊
      </button>

      {isOpen && (
        <div className="absolute bottom-12 right-0 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-2xl p-4 w-72">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-sm">Web Vitals</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>
          <WebVitalsDisplay />
        </div>
      )}
    </div>
  );
}
