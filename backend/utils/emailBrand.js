require('dotenv').config();

// Blockfuse mark served from the API's /assets route. Email clients block
// `data:` URIs (Gmail, Outlook), so base64-inlined images render as broken —
// a plain HTTPS URL is what actually shows up. Render injects
// RENDER_EXTERNAL_URL automatically; API_PUBLIC_URL is the override for other
// hosts (Railway, a custom API domain, …).
const API_ORIGIN = (
  process.env.API_PUBLIC_URL ||
  process.env.RENDER_EXTERNAL_URL ||
  'http://localhost:5000'
).replace(/\/+$/, '');
const LOGO_URL = `${API_ORIGIN}/assets/block_fuse_logo.png`;

const BRAND = {
  accent: '#A544D2',
  accentDark: '#4E2EF5',
  text: '#17121C',
  muted: '#6B6572',
  line: '#EAE6EE',
  bg: '#F5F3F7',
  card: '#FFFFFF',
};

/**
 * Wrap an HTML email body in the Blockfuse brand frame: mark + wordmark up
 * top, a card with optional CTA, and a footer. Table-based layout for
 * mail-client compatibility.
 */
const wrapEmail = ({ eyebrow, title, bodyHtml, button }) => {
  const buttonHtml = button
    ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:26px 0 4px;">
        <tr>
          <td align="center" style="border-radius:999px;background:${BRAND.accent};background-image:linear-gradient(120deg,${BRAND.accent} 0%,${BRAND.accentDark} 100%);">
            <a href="${button.url}" style="display:inline-block;padding:13px 30px;border-radius:999px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none;">${button.label}</a>
          </td>
        </tr>
      </table>`
    : '';

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:${BRAND.bg};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.bg};">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">
            <tr>
              <td align="center" style="padding-bottom:22px;">
                <img src="${LOGO_URL}" alt="Blockfuse Labs" style="display:block;width:90px;height:auto;" />
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:bold;color:${BRAND.text};letter-spacing:-0.01em;margin-top:8px;">Blockfuse&nbsp;Labs</div>
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.22em;color:${BRAND.muted};text-transform:uppercase;margin-top:3px;">Engineering talent from Jos, Nigeria</div>
              </td>
            </tr>
            <tr>
              <td style="background:${BRAND.card};border:1px solid ${BRAND.line};border-radius:16px;padding:32px 36px;">
                ${eyebrow ? `<div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:0.22em;color:${BRAND.accent};text-transform:uppercase;margin-bottom:10px;">${eyebrow}</div>` : ''}
                <h1 style="margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:bold;color:${BRAND.text};line-height:1.25;">${title}</h1>
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:${BRAND.muted};">
                  ${bodyHtml}
                </div>
                ${buttonHtml}
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:22px 24px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:${BRAND.muted};">
                <div>Blockfuse Labs — Jos, Plateau State, Nigeria</div>
                <div style="margin-top:4px;"><a href="mailto:hello@blockfuselabs.xyz" style="color:${BRAND.accent};text-decoration:none;">hello@blockfuselabs.xyz</a></div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

module.exports = { wrapEmail };