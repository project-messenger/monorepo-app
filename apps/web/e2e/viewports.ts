// Browser verification widths in CSS pixels; these are not CSS breakpoints.
const LANDING_VIEWPORT_WIDTHS = {
  desktop: 1440,
  mobile: 375,
  narrowMobile: 320,
} as const;

const AUTH_VIEWPORTS = {
  desktop: { width: LANDING_VIEWPORT_WIDTHS.desktop, height: 1000 },
  desktopShort: { width: LANDING_VIEWPORT_WIDTHS.desktop, height: 900 },
  laptop: { width: 1280, height: 800 },
  desktopBoundary: { width: 1024, height: 900 },
  belowDesktop: { width: 1023, height: 900 },
  tablet: { width: 768, height: 900 },
  mobile: { width: LANDING_VIEWPORT_WIDTHS.mobile, height: 900 },
  narrowMobile: { width: LANDING_VIEWPORT_WIDTHS.narrowMobile, height: 900 },
} as const;

export { AUTH_VIEWPORTS, LANDING_VIEWPORT_WIDTHS };
