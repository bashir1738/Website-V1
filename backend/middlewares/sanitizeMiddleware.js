/**
 * Sanitize middleware — strips HTML/script tags from all string body fields.
 *
 * IMPORTANT: We do NOT decode HTML entities after stripping. Decoding after
 * stripping reverses the sanitization (e.g. &lt;script&gt; survives the tag
 * strip then gets decoded back to <script>). Keep the encoded form; downstream
 * code (email templates) must use escHtml() for any value it interpolates.
 */
const sanitize = (req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    const stripTags = (str) => str.replace(/<[^>]*>/g, '').trim();

    const sanitizeValue = (val) => {
      if (typeof val === 'string') return stripTags(val);
      if (Array.isArray(val)) return val.map(sanitizeValue);
      return val;
    };

    Object.keys(req.body).forEach((key) => {
      req.body[key] = sanitizeValue(req.body[key]);
    });
  }
  next();
};

module.exports = sanitize;
