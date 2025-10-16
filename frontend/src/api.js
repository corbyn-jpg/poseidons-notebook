// api.js
// Centralized API base helper. Uses REACT_APP_API_URL if provided (production),
// otherwise falls back to a relative `/api` path so the frontend can be served
// from the same origin as the backend.

const API_BASE = process.env.REACT_APP_API_URL || "/api";

function apiUrl(path) {
  // If a full URL is passed, return as-is
  if (!path) return API_BASE;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  // Ensure leading slash
  if (!path.startsWith("/")) path = `/${path}`;
  return `${API_BASE}${path}`;
}

function getImageUrl(imagePath) {
  if (!imagePath) return null;

  // Normalize: coerce to string, trim whitespace and remove surrounding quotes
  let p = String(imagePath).trim();
  if ((p.startsWith('"') && p.endsWith('"')) || (p.startsWith("'") && p.endsWith("'"))) {
    p = p.slice(1, -1).trim();
  }

  // Return data URLs as-is
  if (p.toLowerCase().startsWith('data:')) return p;

  // Protocol-relative URLs (e.g. //example.com/image.jpg) -> assume https
  if (p.startsWith('//')) return `https:${p}`;

  // Absolute http(s) URLs -> return as-is
  if (/^https?:\/\//i.test(p)) return p;

  // imagePath may be like /images/..., so construct full URL via apiUrl
  return apiUrl(p);
}

export { API_BASE, apiUrl, getImageUrl };
