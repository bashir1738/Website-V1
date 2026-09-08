const stripTags = (value) => value
  .replace(/<[^>]*>/g, '')
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#x27;/g, "'")
  .trim();

const sanitizeValue = (value) => {
  if (typeof value === 'string') return stripTags(value);
  if (Array.isArray(value)) return value.map(sanitizeValue);
  if (value && typeof value === 'object') {
    const out = {};
    Object.keys(value).forEach((key) => {
      out[key] = sanitizeValue(value[key]);
    });
    return out;
  }
  return value;
};

const sanitize = (req, res, next) => {
  if (req.body && typeof req.body === 'object' && !Array.isArray(req.body)) {
    req.body = sanitizeValue(req.body);
  }
  next();
};

module.exports = sanitize;