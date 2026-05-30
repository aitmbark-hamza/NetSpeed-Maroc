/**
 * Error reporting utility for production error tracking.
 * Configure with your error tracking service (Sentry, Rollbar, etc.)
 */

type ErrorContext = {
  boundary?: string;
  route?: string;
  [key: string]: unknown;
};

export function reportError(error: unknown, context: ErrorContext = {}) {
  // In development, log to console
  if (process.env.NODE_ENV === "development") {
    console.error("Error reported:", error, context);
    return;
  }

  // In production, send to error tracking service
  // Example: Sentry integration
  // if (typeof window !== "undefined" && window.__sentry__) {
  //   window.__sentry__.captureException(error, { contexts: { app: context } });
  // }

  // For now, just log to console in production as well
  console.error("Production error:", error, context);
}

/**
 * Global error handler for unhandled promise rejections
 */
export function setupGlobalErrorHandlers() {
  if (typeof window === "undefined") return;

  window.addEventListener("error", (event) => {
    reportError(event.error, {
      type: "uncaught_error",
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });

  window.addEventListener("unhandledrejection", (event) => {
    reportError(event.reason, {
      type: "unhandled_rejection",
    });
  });
}
