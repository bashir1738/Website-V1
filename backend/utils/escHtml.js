/**
 * Escape a string for safe interpolation into an HTML context.
 * Use this for every user-supplied value that appears inside an HTML email body.
 *
 * @param {unknown} val - Any value to escape.
 * @returns {string} HTML-safe string.
 */
function escHtml(val) {
  return String(val ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

module.exports = { escHtml };
