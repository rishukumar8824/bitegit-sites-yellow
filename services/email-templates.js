/**
 * Bitegit Email Templates — Premium Dark Theme (Binance / Bybit style)
 * Dark background · Gold + Teal + Blue accents · Bitcoin B logo
 */

const APP_NAME   = String(process.env.APP_NAME   || 'Bitegit').trim();
const APP_DOMAIN = String(process.env.APP_DOMAIN || 'bitegit.com').trim();
const SUPPORT    = `support@${APP_DOMAIN}`;
const YEAR       = new Date().getUTCFullYear();

// ─── Colors ───────────────────────────────────────────────────────────────
const C = {
  bg:        '#0b0e13',
  card:      '#131720',
  cardBorder:'#1e2433',
  header:    '#0d1018',
  gold:      '#f0b90b',
  teal:      '#00d4c8',
  blue:      '#2979ff',
  cyan:      '#00b8d9',
  green:     '#00c087',
  red:       '#f6465d',
  textPri:   '#e6eaf4',
  textSec:   '#8892a4',
  textMuted: '#4a5568',
  divider:   '#1e2433',
};

// ─── Bitcoin-style "B" Logo ─────────────────────────────────────────────
// Inline SVG: hexagon badge + stylized ₿ letterform
const LOGO_HTML = `
<table cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="vertical-align:middle;padding-right:10px;">
      <!-- Hexagon badge with Bitcoin B -->
      <div style="width:42px;height:42px;position:relative;display:inline-block;">
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Outer glow ring -->
          <circle cx="21" cy="21" r="20" fill="url(#goldGrad)" opacity="0.15"/>
          <!-- Main circle -->
          <circle cx="21" cy="21" r="19" fill="#1a1200"/>
          <circle cx="21" cy="21" r="19" fill="none" stroke="${C.gold}" stroke-width="1.5"/>
          <!-- Bitcoin B letterform -->
          <text x="21" y="27" text-anchor="middle"
                font-family="Georgia,serif" font-size="22" font-weight="900"
                fill="${C.gold}" letter-spacing="-1">B</text>
          <!-- Two horizontal ticks like ₿ -->
          <line x1="16" y1="13.5" x2="26" y2="13.5" stroke="${C.gold}" stroke-width="1.8" stroke-linecap="round"/>
          <line x1="16" y1="28.5" x2="26" y2="28.5" stroke="${C.gold}" stroke-width="1.8" stroke-linecap="round"/>
          <defs>
            <linearGradient id="goldGrad" x1="0" y1="0" x2="42" y2="42">
              <stop offset="0%" stop-color="${C.gold}"/>
              <stop offset="100%" stop-color="#ff9f00"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </td>
    <td style="vertical-align:middle;">
      <div style="font-size:22px;font-weight:900;letter-spacing:1px;
                  background:linear-gradient(90deg,${C.gold} 0%,#ffdb4d 50%,${C.teal} 100%);
                  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
                  background-clip:text;color:${C.gold};">
        ${APP_NAME.toUpperCase()}
      </div>
      <div style="font-size:9px;font-weight:600;letter-spacing:3px;color:${C.textMuted};
                  text-transform:uppercase;margin-top:1px;line-height:1;">
        CRYPTO EXCHANGE
      </div>
    </td>
  </tr>
</table>`;

// ─── Header bar with gradient stripe ───────────────────────────────────
const HEADER_ROW = `
  <tr>
    <td>
      <!-- Gold → Teal gradient top stripe -->
      <div style="height:3px;background:linear-gradient(90deg,${C.gold} 0%,${C.teal} 50%,${C.blue} 100%);"></div>
      <div style="background:${C.header};padding:20px 32px 18px;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td>${LOGO_HTML}</td>
            <td style="text-align:right;vertical-align:middle;">
              <span style="font-size:11px;color:${C.textMuted};letter-spacing:0.5px;">SECURE NOTIFICATION</span>
            </td>
          </tr>
        </table>
      </div>
    </td>
  </tr>`;

// ─── Premium graphic divider with hex/circuit pattern ──────────────────
const GRAPHIC_DIVIDER = `
  <tr>
    <td style="padding:0;line-height:0;">
      <div style="height:1px;background:linear-gradient(90deg,transparent 0%,${C.cardBorder} 20%,${C.gold}55 50%,${C.cardBorder} 80%,transparent 100%);"></div>
    </td>
  </tr>`;

// ─── Stats / feature bar (shown above footer on every email) ───────────
const FEATURE_BAR = `
  <tr>
    <td style="padding:28px 32px 20px;">
      <div style="height:1px;background:linear-gradient(90deg,transparent,${C.cardBorder},transparent);margin-bottom:24px;"></div>
      <!-- 3-column feature tiles -->
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <!-- Secure -->
          <td width="33%" style="text-align:center;padding:0 6px;">
            <div style="background:${C.card};border:1px solid ${C.cardBorder};border-radius:12px;padding:16px 10px;">
              <div style="width:36px;height:36px;border-radius:50%;
                           background:linear-gradient(135deg,#1a2a0d,#0d2211);
                           border:1px solid ${C.green}44;margin:0 auto 8px;
                           display:flex;align-items:center;justify-content:center;line-height:36px;text-align:center;">
                <span style="font-size:18px;">🔒</span>
              </div>
              <div style="font-size:12px;font-weight:700;color:${C.green};letter-spacing:0.3px;">Bank-Grade</div>
              <div style="font-size:10px;color:${C.textMuted};margin-top:2px;">Security</div>
            </div>
          </td>
          <!-- Fast -->
          <td width="33%" style="text-align:center;padding:0 6px;">
            <div style="background:${C.card};border:1px solid ${C.cardBorder};border-radius:12px;padding:16px 10px;">
              <div style="width:36px;height:36px;border-radius:50%;
                           background:linear-gradient(135deg,#1a1a08,#211a00);
                           border:1px solid ${C.gold}44;margin:0 auto 8px;
                           display:flex;align-items:center;justify-content:center;line-height:36px;text-align:center;">
                <span style="font-size:18px;">⚡</span>
              </div>
              <div style="font-size:12px;font-weight:700;color:${C.gold};letter-spacing:0.3px;">Lightning</div>
              <div style="font-size:10px;color:${C.textMuted};margin-top:2px;">Fast Trades</div>
            </div>
          </td>
          <!-- Support -->
          <td width="33%" style="text-align:center;padding:0 6px;">
            <div style="background:${C.card};border:1px solid ${C.cardBorder};border-radius:12px;padding:16px 10px;">
              <div style="width:36px;height:36px;border-radius:50%;
                           background:linear-gradient(135deg,#081a20,#001a22);
                           border:1px solid ${C.teal}44;margin:0 auto 8px;
                           display:flex;align-items:center;justify-content:center;line-height:36px;text-align:center;">
                <span style="font-size:18px;">💬</span>
              </div>
              <div style="font-size:12px;font-weight:700;color:${C.teal};letter-spacing:0.3px;">24/7 Live</div>
              <div style="font-size:10px;color:${C.textMuted};margin-top:2px;">Support</div>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>`;

// ─── Shared Footer ──────────────────────────────────────────────────────
function buildFooter(antiPhishingCode) {
  return `
  <!-- Feature bar -->
  ${FEATURE_BAR}

  <!-- Gradient divider -->
  <tr><td style="padding:0 32px;">
    <div style="height:1px;background:linear-gradient(90deg,transparent,${C.cardBorder},transparent);"></div>
  </td></tr>

  <!-- App download + social row -->
  <tr><td style="padding:20px 32px;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        <td style="vertical-align:top;">
          <div style="font-size:12px;font-weight:700;color:${C.textSec};letter-spacing:1px;text-transform:uppercase;margin-bottom:10px;">
            Download App
          </div>
          <table cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="padding-right:8px;">
                <a href="https://play.google.com" style="display:inline-block;background:#1a1d26;border:1px solid ${C.cardBorder};border-radius:8px;padding:7px 14px;text-decoration:none;">
                  <table cellpadding="0" cellspacing="0" border="0"><tr>
                    <td style="padding-right:5px;vertical-align:middle;font-size:15px;color:#fff;">&#9658;</td>
                    <td style="vertical-align:middle;">
                      <div style="font-size:8px;color:${C.textMuted};line-height:1.2;">GET IT ON</div>
                      <div style="font-size:11px;color:${C.textPri};font-weight:600;line-height:1.2;">Google Play</div>
                    </td>
                  </tr></table>
                </a>
              </td>
              <td>
                <a href="https://apps.apple.com" style="display:inline-block;background:#1a1d26;border:1px solid ${C.cardBorder};border-radius:8px;padding:7px 14px;text-decoration:none;">
                  <table cellpadding="0" cellspacing="0" border="0"><tr>
                    <td style="padding-right:5px;vertical-align:middle;font-size:15px;color:#fff;">&#63743;</td>
                    <td style="vertical-align:middle;">
                      <div style="font-size:8px;color:${C.textMuted};line-height:1.2;">Download on the</div>
                      <div style="font-size:11px;color:${C.textPri};font-weight:600;line-height:1.2;">App Store</div>
                    </td>
                  </tr></table>
                </a>
              </td>
            </tr>
          </table>
        </td>
        <td style="vertical-align:top;text-align:right;">
          <div style="font-size:12px;font-weight:700;color:${C.textSec};letter-spacing:1px;text-transform:uppercase;margin-bottom:10px;">
            Follow Us
          </div>
          <div>
            <a href="#" style="display:inline-block;width:30px;height:30px;border-radius:8px;background:#1a1d26;border:1px solid ${C.cardBorder};margin:0 3px 0 0;line-height:30px;text-align:center;font-size:12px;color:${C.teal};text-decoration:none;font-weight:700;">X</a>
            <a href="#" style="display:inline-block;width:30px;height:30px;border-radius:8px;background:#1a1d26;border:1px solid ${C.cardBorder};margin:0 3px 0 0;line-height:30px;text-align:center;font-size:12px;color:${C.blue};text-decoration:none;font-weight:700;">in</a>
            <a href="#" style="display:inline-block;width:30px;height:30px;border-radius:8px;background:#1a1d26;border:1px solid ${C.cardBorder};margin:0;line-height:30px;text-align:center;font-size:12px;color:${C.gold};text-decoration:none;font-weight:700;">T</a>
          </div>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- Anti-phishing code -->
  <tr><td style="padding:0 32px 16px;">
    <div style="background:#0f1219;border:1px solid ${C.gold}33;border-left:3px solid ${C.gold};
                border-radius:8px;padding:10px 16px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
        <td>
          <span style="font-size:11px;font-weight:700;color:${C.textMuted};text-transform:uppercase;letter-spacing:1px;">Anti-Phishing Code</span>
          <span style="font-size:13px;font-weight:700;color:${C.gold};margin-left:8px;">${antiPhishingCode || '—'}</span>
        </td>
        <td style="text-align:right;">
          <span style="font-size:10px;color:${C.textMuted};">Verify this code is yours</span>
        </td>
      </tr></table>
    </div>
  </td></tr>

  <!-- Help row -->
  <tr><td style="padding:0 32px 20px;">
    <p style="margin:0 0 4px;font-size:12px;color:${C.textMuted};line-height:1.7;">
      Need help? Visit our
      <a href="https://${APP_DOMAIN}/support" style="color:${C.teal};text-decoration:none;font-weight:600;">Help Center</a>
      or email us at
      <a href="mailto:${SUPPORT}" style="color:${C.teal};text-decoration:none;font-weight:600;">${SUPPORT}</a>
    </p>
    <p style="margin:0;font-size:11px;color:${C.textMuted};">* This email is sent automatically. Please do not reply.</p>
  </td></tr>

  <!-- Bottom gradient bar + copyright -->
  <tr><td style="padding:0;">
    <div style="height:1px;background:linear-gradient(90deg,transparent,${C.cardBorder},transparent);"></div>
    <div style="background:#080a0f;padding:14px 32px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
        <td>
          <span style="font-size:10px;color:${C.textMuted};">
            &copy; 2018–${YEAR} <span style="color:${C.gold};font-weight:700;">${APP_NAME}</span>. All rights reserved.
          </span>
        </td>
        <td style="text-align:right;">
          <span style="font-size:10px;color:${C.textMuted};">
            <a href="https://${APP_DOMAIN}/privacy" style="color:${C.textMuted};text-decoration:none;">Privacy</a>
            &nbsp;·&nbsp;
            <a href="https://${APP_DOMAIN}/terms" style="color:${C.textMuted};text-decoration:none;">Terms</a>
          </span>
        </td>
      </tr></table>
    </div>
    <!-- Bottom accent stripe -->
    <div style="height:3px;background:linear-gradient(90deg,${C.blue} 0%,${C.teal} 50%,${C.gold} 100%);"></div>
  </td></tr>
`;
}

// ─── Security note (small) ─────────────────────────────────────────────
const SECURITY_NOTE = `
  <div style="margin-top:20px;background:#0f1219;border:1px solid ${C.cardBorder};border-radius:8px;padding:10px 16px;">
    <span style="font-size:11px;color:${C.textMuted};">
      🔐 <strong style="color:${C.textSec};">${APP_NAME} staff will NEVER ask for your password, 2FA code or private keys.</strong>
    </span>
  </div>`;

// ─── Master shell ──────────────────────────────────────────────────────
function buildShell(contentRows, antiPhishingCode) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${APP_NAME}</title>
</head>
<body style="margin:0;padding:0;background:#060810;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
<!-- Outer wrapper -->
<table width="100%" cellpadding="0" cellspacing="0" style="background:#060810;padding:28px 12px;">
  <tr><td align="center">
    <!-- Email card — 600px wide -->
    <table width="600" cellpadding="0" cellspacing="0"
      style="max-width:600px;width:100%;background:${C.bg};border-radius:16px;overflow:hidden;
             border:1px solid ${C.cardBorder};">

      ${HEADER_ROW}
      ${GRAPHIC_DIVIDER}

      <!-- MAIN CONTENT -->
      ${contentRows}

      <!-- FOOTER -->
      ${buildFooter(antiPhishingCode)}

    </table>
    <!-- Subtle tagline below card -->
    <p style="margin:16px 0 0;font-size:11px;color:#2a3040;text-align:center;letter-spacing:1px;">
      SECURE · FAST · TRUSTED &nbsp;·&nbsp; ${APP_DOMAIN}
    </p>
  </td></tr>
</table>
</body>
</html>`;
}

function esc(v) {
  return String(v || '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ─── Detail info box (dark style) ──────────────────────────────────────
function detailBox(rows) {
  const rowsHtml = rows.map(([label, value, isHighlight], i) => {
    const bg = i % 2 === 0 ? C.card : '#0f1219';
    return `<tr style="background:${bg};">
      <td style="padding:10px 16px;font-size:12px;color:${C.textMuted};white-space:nowrap;
                 border-right:1px solid ${C.cardBorder};width:140px;letter-spacing:0.3px;
                 text-transform:uppercase;">${esc(label)}</td>
      <td style="padding:10px 16px;font-size:13px;color:${isHighlight ? C.teal : C.textPri};
                 font-weight:${isHighlight ? '700' : '500'};word-break:break-all;">${isHighlight ? value : esc(value)}</td>
    </tr>`;
  }).join('');
  return `<table width="100%" cellpadding="0" cellspacing="0"
    style="border:1px solid ${C.cardBorder};border-radius:10px;overflow:hidden;margin:16px 0;">
    ${rowsHtml}
  </table>`;
}

// ─── Status badge ──────────────────────────────────────────────────────
function statusBadge(label, color) {
  return `<span style="display:inline-block;background:${color}22;border:1px solid ${color}55;
                border-radius:20px;padding:4px 14px;font-size:12px;font-weight:700;
                color:${color};letter-spacing:0.5px;text-transform:uppercase;">${label}</span>`;
}

// ─── Amount hero block ─────────────────────────────────────────────────
function amountHero(amount, asset, subLabel) {
  return `
  <div style="background:linear-gradient(135deg,#0f1a0d,#0d1f18);border:1px solid ${C.green}33;
              border-radius:12px;padding:20px 24px;text-align:center;margin:16px 0;">
    <div style="font-size:36px;font-weight:900;color:${C.green};letter-spacing:-0.5px;">
      ${esc(amount)} <span style="font-size:20px;opacity:0.8;">${esc(asset || 'USDT')}</span>
    </div>
    <div style="font-size:12px;color:${C.textMuted};margin-top:4px;text-transform:uppercase;letter-spacing:1px;">${subLabel || 'Amount'}</div>
  </div>`;
}

// ═══════════════════════════════════════════════════════════════════
// 1. DEPOSIT SUCCESSFUL
// ═══════════════════════════════════════════════════════════════════
function depositSuccessful({ toEmail, amount, asset, txTime, antiPhishingCode }) {
  const content = `
  <tr><td style="padding:32px 32px 24px;">
    <!-- Status badge -->
    <div style="margin-bottom:16px;">${statusBadge('Deposit Confirmed', C.green)}</div>

    <h2 style="margin:0 0 6px;font-size:26px;font-weight:900;color:${C.textPri};letter-spacing:-0.3px;">
      Deposit <span style="color:${C.green};">Successful</span>
    </h2>
    <p style="margin:0 0 20px;font-size:14px;color:${C.textMuted};">
      Hi <strong style="color:${C.textSec};">${esc(toEmail)}</strong>, your funds have arrived.
    </p>

    ${amountHero(amount, asset, 'Credited to your wallet')}

    ${detailBox([
      ['Transaction Time', txTime || new Date().toISOString().replace('T',' ').slice(0,19) + ' (UTC+8)', false],
      ['Asset', asset || 'USDT', false],
      ['Amount Received', `${amount} ${asset || 'USDT'}`, false],
      ['Status', 'Completed', false],
    ])}

    <p style="margin:16px 0 0;font-size:13px;color:${C.textMuted};">
      Check your <a href="https://${APP_DOMAIN}/wallet" style="color:${C.teal};text-decoration:none;font-weight:600;">wallet dashboard</a> to view your updated balance.
    </p>
    ${SECURITY_NOTE}
  </td></tr>`;
  return buildShell(content, antiPhishingCode);
}

// ═══════════════════════════════════════════════════════════════════
// 2. WITHDRAWAL SUCCESSFUL
// ═══════════════════════════════════════════════════════════════════
function withdrawalSuccessful({ toEmail, amount, asset, withdrawalTime, address, txId, antiPhishingCode }) {
  const content = `
  <tr><td style="padding:32px 32px 24px;">
    <div style="margin-bottom:16px;">${statusBadge('Withdrawal Sent', C.teal)}</div>

    <h2 style="margin:0 0 6px;font-size:26px;font-weight:900;color:${C.textPri};letter-spacing:-0.3px;">
      Withdrawal <span style="color:${C.teal};">Successful</span>
    </h2>
    <p style="margin:0 0 20px;font-size:14px;color:${C.textMuted};">
      Hi <strong style="color:${C.textSec};">${esc(toEmail)}</strong>, your withdrawal has been processed.
    </p>

    ${detailBox([
      ['Time', withdrawalTime || new Date().toISOString().replace('T',' ').slice(0,19) + ' (UTC+8)', false],
      ['Amount Sent', `${amount} ${asset || 'USDT'}`, false],
      ['Network Address', `<span style="color:${C.teal};font-size:12px;">${esc(address || 'N/A')}</span>`, true],
      ['TxID', `<span style="color:${C.blue};font-size:12px;">${esc(txId || 'N/A')}</span>`, true],
      ['Status', 'Completed', false],
    ])}

    <div style="background:#0f1219;border:1px solid ${C.blue}33;border-radius:10px;padding:14px 18px;margin-top:8px;">
      <span style="font-size:12px;color:${C.textMuted};">
        ℹ️ Transaction may take a few minutes to confirm on-chain depending on network congestion.
      </span>
    </div>
    ${SECURITY_NOTE}
  </td></tr>`;
  return buildShell(content, antiPhishingCode);
}

// ═══════════════════════════════════════════════════════════════════
// 3. WITHDRAWAL VERIFICATION CODE
// ═══════════════════════════════════════════════════════════════════
function withdrawalVerificationCode({ toEmail, code, withdrawalTime, amount, asset, address, antiPhishingCode }) {
  const content = `
  <tr><td style="padding:32px 32px 24px;">
    <div style="margin-bottom:16px;">${statusBadge('Action Required', C.gold)}</div>

    <h2 style="margin:0 0 6px;font-size:26px;font-weight:900;color:${C.textPri};letter-spacing:-0.3px;">
      Confirm Your <span style="color:${C.gold};">Withdrawal</span>
    </h2>
    <p style="margin:0 0 20px;font-size:14px;color:${C.textMuted};">
      Hi <strong style="color:${C.textSec};">${esc(toEmail)}</strong>,
      enter this code to authorize your withdrawal.
    </p>

    <!-- OTP hero box -->
    <div style="background:linear-gradient(135deg,#1a1200,#0f1800);
                border:1px solid ${C.gold}55;border-radius:14px;
                padding:28px 24px;text-align:center;margin:0 0 20px;">
      <div style="font-size:11px;color:${C.textMuted};text-transform:uppercase;letter-spacing:2px;margin-bottom:12px;">
        Verification Code
      </div>
      <div style="font-size:48px;font-weight:900;letter-spacing:10px;color:${C.gold};
                  font-family:'Courier New',monospace;line-height:1;">
        ${esc(code)}
      </div>
      <div style="margin-top:14px;display:inline-block;background:${C.gold}22;border:1px solid ${C.gold}44;
                  border-radius:20px;padding:5px 16px;">
        <span style="font-size:12px;color:${C.gold};font-weight:600;">Valid for 10 minutes only</span>
      </div>
    </div>

    ${detailBox([
      ['Amount', `${amount} ${asset || 'USDT'}`, false],
      ['Withdrawal Address', `<span style="color:${C.teal};font-size:12px;">${esc(address || 'N/A')}</span>`, true],
      ['Requested At', withdrawalTime || '--', false],
    ])}

    <div style="background:#1a0a0a;border:1px solid ${C.red}33;border-radius:10px;padding:14px 18px;">
      <strong style="font-size:12px;color:${C.red};">⚠️ Never share this code.</strong>
      <span style="font-size:12px;color:${C.textMuted};"> ${APP_NAME} staff will never ask for it.</span>
    </div>
  </td></tr>`;
  return buildShell(content, antiPhishingCode);
}

// ═══════════════════════════════════════════════════════════════════
// 4. OTP — Signup / Login / Password Reset
// ═══════════════════════════════════════════════════════════════════
function otpEmail({ heading, toEmail, code, expiresInMinutes, note, antiPhishingCode }) {
  const content = `
  <tr><td style="padding:32px 32px 24px;">
    <div style="margin-bottom:16px;">${statusBadge('Verification Code', C.blue)}</div>

    <h2 style="margin:0 0 6px;font-size:26px;font-weight:900;color:${C.textPri};letter-spacing:-0.3px;">
      ${esc(heading)}
    </h2>
    <p style="margin:0 0 20px;font-size:14px;color:${C.textMuted};">
      Hi <strong style="color:${C.textSec};">${esc(toEmail)}</strong>.
      ${esc(note || 'Use the code below to verify your identity.')}
    </p>

    <!-- OTP hero -->
    <div style="background:linear-gradient(135deg,#080e1f,#0a1528);
                border:1px solid ${C.blue}55;border-radius:14px;
                padding:28px 24px;text-align:center;margin:0 0 20px;">
      <div style="font-size:11px;color:${C.textMuted};text-transform:uppercase;letter-spacing:2px;margin-bottom:12px;">
        One-Time Code
      </div>
      <div style="font-size:52px;font-weight:900;letter-spacing:12px;color:#fff;
                  font-family:'Courier New',monospace;line-height:1;
                  text-shadow:0 0 30px ${C.blue}66;">
        ${esc(code)}
      </div>
      <div style="margin-top:16px;display:inline-block;background:${C.blue}22;border:1px solid ${C.blue}44;
                  border-radius:20px;padding:5px 16px;">
        <span style="font-size:12px;color:${C.cyan};font-weight:600;">
          ⏱ Expires in ${Number(expiresInMinutes) || 10} minutes
        </span>
      </div>
    </div>

    <div style="background:#1a0a0a;border:1px solid ${C.red}33;border-radius:10px;padding:14px 18px;">
      <strong style="font-size:12px;color:${C.red};">⚠️ Do NOT share this code.</strong>
      <span style="font-size:12px;color:${C.textMuted};"> If you did not request this, secure your account immediately.</span>
    </div>
    ${SECURITY_NOTE}
  </td></tr>`;
  return buildShell(content, antiPhishingCode);
}

// ═══════════════════════════════════════════════════════════════════
// 5. P2P ORDER NOTIFICATION (seller: new order placed)
// ═══════════════════════════════════════════════════════════════════
function p2pOrderNotification({ buyerUsername, orderId, orderNo, antiPhishingCode }) {
  const content = `
  <tr><td style="padding:32px 32px 24px;">
    <div style="margin-bottom:16px;">${statusBadge('New P2P Order', C.teal)}</div>

    <h2 style="margin:0 0 6px;font-size:26px;font-weight:900;color:${C.textPri};letter-spacing:-0.3px;">
      Order <span style="color:${C.teal};">Placed</span>
    </h2>
    <p style="margin:0 0 20px;font-size:14px;color:${C.textMuted};">
      A buyer has placed a new P2P order on your ad.
    </p>

    <div style="background:linear-gradient(135deg,#071a18,#041212);
                border:1px solid ${C.teal}44;border-radius:14px;padding:20px 24px;margin:0 0 20px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
        <td>
          <div style="font-size:11px;color:${C.textMuted};text-transform:uppercase;letter-spacing:1px;">Buyer</div>
          <div style="font-size:20px;font-weight:800;color:${C.teal};margin-top:4px;">${esc(buyerUsername || 'A Buyer')}</div>
        </td>
        <td style="text-align:right;">
          <div style="font-size:11px;color:${C.textMuted};text-transform:uppercase;letter-spacing:1px;">Order No.</div>
          <div style="font-size:14px;font-weight:700;color:${C.gold};margin-top:4px;font-family:monospace;">${esc(orderNo || orderId || '--')}</div>
        </td>
      </tr></table>
    </div>

    <div style="background:#0f1219;border:1px solid ${C.cardBorder};border-radius:10px;padding:14px 18px;">
      <span style="font-size:13px;color:${C.textMuted};">
        ✅ Log in to <a href="https://${APP_DOMAIN}/p2p" style="color:${C.teal};text-decoration:none;font-weight:700;">${APP_DOMAIN}</a>
        → P2P → Orders to view and respond.
      </span>
    </div>
    ${SECURITY_NOTE}
  </td></tr>`;
  return buildShell(content, antiPhishingCode);
}

// ═══════════════════════════════════════════════════════════════════
// 6. P2P CRYPTO RELEASE (seller: buyer paid, please release)
// ═══════════════════════════════════════════════════════════════════
function p2pCryptoRelease({ toEmail, buyerUsername, amountInr, paymentMethod, upiId, antiPhishingCode }) {
  const content = `
  <tr><td style="padding:32px 32px 24px;">
    <div style="margin-bottom:16px;">${statusBadge('Payment Received — Release Required', C.gold)}</div>

    <h2 style="margin:0 0 6px;font-size:26px;font-weight:900;color:${C.textPri};letter-spacing:-0.3px;">
      Release <span style="color:${C.gold};">Crypto Now</span>
    </h2>
    <p style="margin:0 0 20px;font-size:14px;color:${C.textMuted};">
      Hi <strong style="color:${C.textSec};">${esc(toEmail)}</strong>,
      the buyer has marked payment as sent. Verify and release.
    </p>

    <!-- Payment confirmation card -->
    <div style="background:linear-gradient(135deg,#1a1400,#110f00);
                border:1px solid ${C.gold}44;border-radius:14px;padding:20px 24px;margin:0 0 16px;">
      <div style="font-size:11px;color:${C.textMuted};text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">
        Payment Details
      </div>
      <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
        <td>
          <div style="font-size:28px;font-weight:900;color:${C.gold};">
            ₹${esc(String(amountInr || 0))}
          </div>
          <div style="font-size:12px;color:${C.textMuted};margin-top:2px;">via ${esc(paymentMethod || 'UPI')}</div>
        </td>
        <td style="text-align:right;vertical-align:middle;">
          <div style="background:${C.gold}22;border:1px solid ${C.gold}44;border-radius:8px;padding:6px 14px;">
            <div style="font-size:11px;color:${C.textMuted};">Buyer</div>
            <div style="font-size:14px;font-weight:700;color:${C.gold};">${esc(buyerUsername || 'Buyer')}</div>
          </div>
        </td>
      </tr></table>
    </div>

    ${detailBox([
      ['Payment Method', paymentMethod || 'UPI', false],
      ['UPI / Account', upiId || 'Check in chat', false],
      ['Amount (INR)', `₹${String(amountInr || 0)}`, false],
    ])}

    <div style="background:#0f1a0d;border:1px solid ${C.green}44;border-radius:10px;padding:14px 18px;">
      <strong style="font-size:13px;color:${C.green};">✅ Steps:</strong>
      <ol style="margin:8px 0 0;padding-left:18px;font-size:13px;color:${C.textMuted};line-height:1.9;">
        <li>Check your bank/UPI app — confirm ₹${esc(String(amountInr || 0))} received</li>
        <li>Open the order on <a href="https://${APP_DOMAIN}/p2p" style="color:${C.teal};text-decoration:none;">${APP_DOMAIN}</a></li>
        <li>Click <strong style="color:${C.green};">Release Crypto</strong></li>
      </ol>
    </div>
    ${SECURITY_NOTE}
  </td></tr>`;
  return buildShell(content, antiPhishingCode);
}

// ═══════════════════════════════════════════════════════════════════
// 7. P2P ORDER CANCELED
// ═══════════════════════════════════════════════════════════════════
function p2pOrderCanceled({ toEmail, orderNo, canceledBy, antiPhishingCode }) {
  const content = `
  <tr><td style="padding:32px 32px 24px;">
    <div style="margin-bottom:16px;">${statusBadge('Order Cancelled', C.red)}</div>

    <h2 style="margin:0 0 6px;font-size:26px;font-weight:900;color:${C.textPri};letter-spacing:-0.3px;">
      P2P Order <span style="color:${C.red};">Cancelled</span>
    </h2>
    <p style="margin:0 0 20px;font-size:14px;color:${C.textMuted};">
      Hi <strong style="color:${C.textSec};">${esc(toEmail)}</strong>,
      your P2P order has been cancelled.
    </p>

    ${detailBox([
      ['Order No.', orderNo || '--', false],
      ['Cancelled By', canceledBy || 'Counterparty', false],
      ['Status', 'Cancelled', false],
    ])}

    <div style="background:#1a0a0a;border:1px solid ${C.red}33;border-radius:10px;padding:14px 18px;margin-top:8px;">
      <span style="font-size:13px;color:${C.textMuted};">
        No funds have been deducted. Visit
        <a href="https://${APP_DOMAIN}/p2p" style="color:${C.teal};text-decoration:none;font-weight:600;">P2P marketplace</a>
        to find a new trade.
      </span>
    </div>
    ${SECURITY_NOTE}
  </td></tr>`;
  return buildShell(content, antiPhishingCode);
}

// ═══════════════════════════════════════════════════════════════════
// 8. KYC APPROVED
// ═══════════════════════════════════════════════════════════════════
function kycApproved({ toEmail, username, antiPhishingCode }) {
  const content = `
  <tr><td style="padding:32px 32px 24px;">
    <div style="margin-bottom:16px;">${statusBadge('KYC Approved', C.green)}</div>

    <h2 style="margin:0 0 6px;font-size:26px;font-weight:900;color:${C.textPri};letter-spacing:-0.3px;">
      Identity <span style="color:${C.green};">Verified</span>
    </h2>
    <p style="margin:0 0 20px;font-size:14px;color:${C.textMuted};">
      Hi <strong style="color:${C.textSec};">${esc(username || toEmail)}</strong>,
      your identity verification has been approved.
    </p>

    <!-- Big checkmark hero -->
    <div style="background:linear-gradient(135deg,#071a0d,#041210);
                border:1px solid ${C.green}44;border-radius:16px;
                padding:32px 24px;text-align:center;margin:0 0 20px;">
      <div style="width:64px;height:64px;border-radius:50%;background:${C.green}22;
                  border:2px solid ${C.green};margin:0 auto 14px;
                  line-height:64px;text-align:center;font-size:32px;">✓</div>
      <div style="font-size:20px;font-weight:900;color:${C.green};letter-spacing:-0.3px;">
        You're Verified!
      </div>
      <div style="font-size:13px;color:${C.textMuted};margin-top:6px;">
        Full P2P trading access unlocked
      </div>
      <!-- Unlock features list -->
      <table cellpadding="0" cellspacing="0" border="0" style="margin:16px auto 0;">
        <tr>
          <td style="padding:4px 10px;font-size:12px;color:${C.green};">✔ Buy &amp; Sell P2P</td>
          <td style="padding:4px 10px;font-size:12px;color:${C.teal};">✔ Post Ads</td>
          <td style="padding:4px 10px;font-size:12px;color:${C.gold};">✔ Higher Limits</td>
        </tr>
      </table>
    </div>

    <div style="text-align:center;">
      <a href="https://${APP_DOMAIN}/p2p"
         style="display:inline-block;background:linear-gradient(135deg,${C.green},#00a070);
                color:#fff;font-size:14px;font-weight:700;text-decoration:none;
                border-radius:10px;padding:13px 36px;letter-spacing:0.5px;">
        Start Trading Now →
      </a>
    </div>
    ${SECURITY_NOTE}
  </td></tr>`;
  return buildShell(content, antiPhishingCode);
}

// ═══════════════════════════════════════════════════════════════════
// 9. KYC REJECTED
// ═══════════════════════════════════════════════════════════════════
function kycRejected({ toEmail, username, reason, antiPhishingCode }) {
  const reasonBlock = reason
    ? `<div style="background:#1a0a0a;border:1px solid ${C.red}44;border-radius:10px;padding:14px 18px;margin:12px 0;">
         <div style="font-size:11px;color:${C.textMuted};text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Reason</div>
         <div style="font-size:13px;color:${C.red};">${esc(reason)}</div>
       </div>` : '';
  const content = `
  <tr><td style="padding:32px 32px 24px;">
    <div style="margin-bottom:16px;">${statusBadge('KYC Update', C.red)}</div>

    <h2 style="margin:0 0 6px;font-size:26px;font-weight:900;color:${C.textPri};letter-spacing:-0.3px;">
      Verification <span style="color:${C.red};">Not Approved</span>
    </h2>
    <p style="margin:0 0 20px;font-size:14px;color:${C.textMuted};">
      Hi <strong style="color:${C.textSec};">${esc(username || toEmail)}</strong>,
      your KYC submission needs attention.
    </p>

    ${reasonBlock}

    <div style="background:#0f1219;border:1px solid ${C.cardBorder};border-radius:10px;padding:16px 18px;margin-top:12px;">
      <strong style="font-size:13px;color:${C.textSec};">How to resubmit:</strong>
      <ol style="margin:8px 0 0;padding-left:18px;font-size:13px;color:${C.textMuted};line-height:1.9;">
        <li>Open the <a href="https://${APP_DOMAIN}" style="color:${C.teal};text-decoration:none;">${APP_NAME}</a> app</li>
        <li>Go to <strong style="color:${C.textSec};">Profile → KYC Verification</strong></li>
        <li>Upload clear, well-lit document photos</li>
        <li>Submit for review</li>
      </ol>
    </div>
    ${SECURITY_NOTE}
  </td></tr>`;
  return buildShell(content, antiPhishingCode);
}

// ═══════════════════════════════════════════════════════════════════
// 10. P2P DISPUTE RAISED (admin alert)
// ═══════════════════════════════════════════════════════════════════
function p2pDisputeRaised({ toEmail, raisedBy, orderId, orderNo, antiPhishingCode }) {
  const content = `
  <tr><td style="padding:32px 32px 24px;">
    <div style="margin-bottom:16px;">${statusBadge('Dispute — Action Required', C.red)}</div>

    <h2 style="margin:0 0 6px;font-size:26px;font-weight:900;color:${C.textPri};letter-spacing:-0.3px;">
      P2P Dispute <span style="color:${C.red};">Raised</span>
    </h2>
    <p style="margin:0 0 20px;font-size:14px;color:${C.textMuted};">
      Admin action required. A dispute has been filed on the platform.
    </p>

    ${detailBox([
      ['Raised By', raisedBy || 'A User', false],
      ['Order No.', orderNo || orderId || '--', false],
      ['Priority', 'High', false],
    ])}

    <div style="background:linear-gradient(135deg,#1a0800,#120500);
                border:1px solid ${C.gold}55;border-radius:12px;padding:18px 20px;margin-top:8px;">
      <div style="font-size:14px;font-weight:700;color:${C.gold};margin-bottom:10px;">⚠️ Required Action</div>
      <div style="font-size:13px;color:${C.textMuted};line-height:1.8;">
        1. Log in to the admin panel<br/>
        2. Navigate to <strong style="color:${C.textSec};">P2P → Disputes</strong><br/>
        3. Review evidence and resolve the order
      </div>
    </div>
  </td></tr>`;
  return buildShell(content, antiPhishingCode);
}

// ═══════════════════════════════════════════════════════════════════
// 11. ORDER COMPLETED / CRYPTO RELEASED (buyer notification)
// ═══════════════════════════════════════════════════════════════════
function p2pOrderCompleted({ toEmail, orderId, orderNo, assetAmount, asset, antiPhishingCode }) {
  const content = `
  <tr><td style="padding:32px 32px 24px;">
    <div style="margin-bottom:16px;">${statusBadge('Order Complete', C.green)}</div>

    <h2 style="margin:0 0 6px;font-size:26px;font-weight:900;color:${C.textPri};letter-spacing:-0.3px;">
      Crypto <span style="color:${C.green};">Released!</span>
    </h2>
    <p style="margin:0 0 20px;font-size:14px;color:${C.textMuted};">
      Hi <strong style="color:${C.textSec};">${esc(toEmail)}</strong>,
      your order is complete. Funds are in your wallet.
    </p>

    ${amountHero(assetAmount, asset || 'USDT', 'Received in your wallet')}

    ${detailBox([
      ['Order No.', orderNo || orderId || '--', false],
      ['Asset', asset || 'USDT', false],
      ['Amount', `${assetAmount} ${asset || 'USDT'}`, false],
      ['Status', 'Completed ✓', false],
    ])}

    <div style="text-align:center;margin-top:20px;">
      <a href="https://${APP_DOMAIN}/p2p"
         style="display:inline-block;background:linear-gradient(135deg,${C.teal},${C.blue});
                color:#fff;font-size:14px;font-weight:700;text-decoration:none;
                border-radius:10px;padding:13px 36px;letter-spacing:0.5px;">
        Trade Again →
      </a>
    </div>
    ${SECURITY_NOTE}
  </td></tr>`;
  return buildShell(content, antiPhishingCode);
}

// ─── Subject helper ────────────────────────────────────────────────────────
function subject(title) {
  return `\u3010${APP_NAME}\u3011 ${title}`;
}

module.exports = {
  APP_NAME, APP_DOMAIN, SUPPORT,
  subject,
  depositSuccessful,
  withdrawalSuccessful,
  withdrawalVerificationCode,
  otpEmail,
  p2pOrderNotification,
  p2pCryptoRelease,
  p2pOrderCanceled,
  p2pOrderCompleted,
  kycApproved,
  kycRejected,
  p2pDisputeRaised
};
