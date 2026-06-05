const IMAGE_BASE =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_IMAGE_PATH) ||
  'https://server.kabraemporium.com';

function normalizeSrc(src) {
  return src.replace('/uploads/uploads/', '/uploads/');
}

/**
 * Returns a backend-resized URL for an API image.
 * Falls back to the original src for non-backend URLs.
 */
export function resizeUrl(src, w) {
  if (!src || typeof src !== 'string') return src;
  if (!src.startsWith(IMAGE_BASE)) return src;
  const path = normalizeSrc(src).slice(IMAGE_BASE.length).replace(/^\//, '');
  return `${IMAGE_BASE}/api/img?src=${path}&w=${w}`;
}

/**
 * Builds a srcset string from an array of widths.
 * e.g. buildSrcSet(url, [300, 600, 900]) → "url?w=300 300w, url?w=600 600w, url?w=900 900w"
 */
export function buildSrcSet(src, widths) {
  if (!src || typeof src !== 'string') return '';
  return widths.map((w) => `${resizeUrl(src, w)} ${w}w`).join(', ');
}
