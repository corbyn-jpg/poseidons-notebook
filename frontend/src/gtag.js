// gtag helper
export const GA_TRACKING_ID = 'G-F429F48ZL6';

// send a pageview
export const pageview = (url) => {
  if (typeof window.gtag !== 'function') return;
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// send specific events
export const event = ({ action, category, label, value }) => {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
