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
  if (imagePath.startsWith("http")) return imagePath;
  // imagePath may be like /images/..., so construct full URL
  return apiUrl(imagePath);
}

export { API_BASE, apiUrl, getImageUrl };
