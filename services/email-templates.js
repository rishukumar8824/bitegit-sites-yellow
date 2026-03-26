/**
 * Bitegit Email Templates — Pixel-match to Binance style
 * Black header · Teal brand · Gold CTA button · Full social footer
 */

const APP_NAME   = String(process.env.APP_NAME   || 'Bitegit').trim();
const APP_DOMAIN = String(process.env.APP_DOMAIN || 'bitegit.com').trim();
const SUPPORT    = `support@${APP_DOMAIN}`;
const YEAR       = new Date().getUTCFullYear();

const GOLD  = '#F0B90B';
const TEAL  = '#00c2b2';
const BLACK = '#1E2026';
const TEXT  = '#333333';
const MUTED = '#666666';

// ─── Binance-style diamond logo (teal) ────────────────────────────────────
const LOGO_HTML = `
<table cellpadding="0" cellspacing="0" border="0" align="center">
  <tr>
    <td align="center" valign="middle" style="padding-right:10px;">
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="15,3 27,15 15,27 3,15" fill="${TEAL}"/>
        <polygon points="15,9 21,15 15,21 9,15" fill="${BLACK}"/>
      </svg>
    </td>
    <td align="center" valign="middle">
      <span style="font-size:22px;font-weight:900;color:${TEAL};letter-spacing:1.5px;font-family:Arial,sans-serif;">
        ${APP_NAME.toUpperCase()}
      </span>
    </td>
  </tr>
</table>`;

function esc(v) {
  return String(v || '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ─── Gold CTA button ───────────────────────────────────────────────────────
function ctaButton(label, url) {
  return `
  <table cellpadding="0" cellspacing="0" border="0" style="margin:24px 0;">
    <tr>
      <td align="left">
        <a href="${url}" style="display:inline-block;background:${GOLD};color:#000000;
           font-size:16px;font-weight:700;text-decoration:none;padding:14px 32px;
           border-radius:4px;font-family:Arial,sans-serif;letter-spacing:0.2px;">
          ${label}
        </a>
      </td>
    </tr>
  </table>`;
}

// ─── Standard footer (Binance exact match) ────────────────────────────────
function buildFooter(antiPhishingCode) {
  return `
  <!-- Gold divider -->
  <tr><td style="padding:0 0 0 0;">
    <div style="height:1px;background:${GOLD};margin:8px 0 0 0;"></div>
  </td></tr>

  <!-- Stay connected -->
  <tr><td style="padding:24px 32px 8px;text-align:center;">
    <p style="margin:0 0 16px;font-size:16px;font-weight:700;color:${GOLD};font-family:Arial,sans-serif;">
      Stay connected!
    </p>
    <!-- Social icons row -->
    <table cellpadding="0" cellspacing="0" border="0" align="center">
      <tr>
        <td style="padding:0 6px;">
          <a href="https://twitter.com" style="display:inline-block;width:36px;height:36px;border-radius:50%;
             border:1px solid #CCCCCC;text-align:center;line-height:36px;font-size:14px;font-weight:700;
             color:#333;text-decoration:none;font-family:Arial,sans-serif;">X</a>
        </td>
        <td style="padding:0 6px;">
          <a href="https://t.me" style="display:inline-block;width:36px;height:36px;border-radius:50%;
             border:1px solid #CCCCCC;text-align:center;line-height:36px;font-size:14px;
             color:#333;text-decoration:none;font-family:Arial,sans-serif;">✈</a>
        </td>
        <td style="padding:0 6px;">
          <a href="https://facebook.com" style="display:inline-block;width:36px;height:36px;border-radius:50%;
             border:1px solid #CCCCCC;text-align:center;line-height:36px;font-size:14px;font-weight:700;
             color:#333;text-decoration:none;font-family:Arial,sans-serif;">f</a>
        </td>
        <td style="padding:0 6px;">
          <a href="https://linkedin.com" style="display:inline-block;width:36px;height:36px;border-radius:50%;
             border:1px solid #CCCCCC;text-align:center;line-height:36px;font-size:13px;font-weight:700;
             color:#333;text-decoration:none;font-family:Arial,sans-serif;">in</a>
        </td>
        <td style="padding:0 6px;">
          <a href="https://youtube.com" style="display:inline-block;width:36px;height:36px;border-radius:50%;
             border:1px solid #CCCCCC;text-align:center;line-height:36px;font-size:14px;
             color:#333;text-decoration:none;font-family:Arial,sans-serif;">▶</a>
        </td>
        <td style="padding:0 6px;">
          <a href="https://reddit.com" style="display:inline-block;width:36px;height:36px;border-radius:50%;
             border:1px solid #CCCCCC;text-align:center;line-height:36px;font-size:11px;font-weight:700;
             color:#333;text-decoration:none;font-family:Arial,sans-serif;">rdt</a>
        </td>
        <td style="padding:0 6px;">
          <a href="https://instagram.com" style="display:inline-block;width:36px;height:36px;border-radius:50%;
             border:1px solid #CCCCCC;text-align:center;line-height:36px;font-size:14px;
             color:#333;text-decoration:none;font-family:Arial,sans-serif;">&#128247;</a>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- Anti-phishing -->
  <tr><td style="padding:16px 32px 8px;">
    <p style="margin:0;font-size:14px;color:${TEXT};font-family:Arial,sans-serif;line-height:1.6;">
      To stay secure, setup your anti-phishing code
      <a href="https://${APP_DOMAIN}/settings/security" style="color:${TEAL};text-decoration:none;">here</a>${antiPhishingCode ? `&nbsp;&nbsp;<strong style="color:${BLACK};">Code: ${esc(antiPhishingCode)}</strong>` : ''}.
    </p>
  </td></tr>

  <!-- Disclaimer -->
  <tr><td style="padding:12px 32px 8px;">
    <p style="margin:0 0 10px;font-size:13px;color:${TEXT};font-family:Arial,sans-serif;line-height:1.7;">
      <strong>Disclaimer:</strong> Digital asset prices are subject to high market risk and
      price volatility. The value of your investment may go down or up, and you may not get
      back the amount invested. You are solely responsible for your investment decisions and
      ${esc(APP_NAME)} is not liable for any losses you may incur. Past performance is not a
      reliable predictor of future performance. You should only invest in products you are
      familiar with and where you understand the risks. You should carefully consider your
      investment experience, financial situation, investment objectives and risk tolerance and
      consult an independent financial adviser prior to making any investment. This material
      should not be construed as financial advice. For more information, see our
      <a href="https://${APP_DOMAIN}/terms" style="color:${TEAL};text-decoration:none;">Terms of Use</a>
      and
      <a href="https://${APP_DOMAIN}/risk" style="color:${TEAL};text-decoration:none;">Risk Warning</a>.
    </p>
    <p style="margin:0 0 10px;font-size:13px;color:${TEXT};font-family:Arial,sans-serif;line-height:1.7;">
      <strong>Kindly note:</strong> Please be aware of phishing sites and always make sure you
      are visiting the official ${esc(APP_DOMAIN)} website when entering sensitive data.
    </p>
    <p style="margin:0 0 10px;font-size:13px;color:${TEXT};font-family:Arial,sans-serif;line-height:1.7;">
      ${esc(APP_DOMAIN)} services are provided under applicable laws and regulations. For more
      information, please see our
      <a href="https://${APP_DOMAIN}/privacy" style="color:${TEAL};text-decoration:none;">Privacy Policy</a>.
    </p>
  </td></tr>

  <!-- Copyright -->
  <tr><td style="padding:12px 32px 28px;text-align:center;">
    <p style="margin:0;font-size:13px;color:${MUTED};font-family:Arial,sans-serif;">
      &copy; ${YEAR} ${esc(APP_DOMAIN)}, All Rights Reserved.
    </p>
  </td></tr>
`;
}

// ─── Security / did-not-do-this line ──────────────────────────────────────
const SECURITY_LINE = `
  <p style="margin:16px 0;font-size:15px;color:${TEXT};font-family:Arial,sans-serif;line-height:1.6;">
    Don't recognize this activity? Please
    <a href="https://${APP_DOMAIN}/reset-password" style="color:${TEAL};text-decoration:none;">reset your password</a>
    and contact
    <a href="https://${APP_DOMAIN}/support" style="color:${TEAL};text-decoration:none;">customer support</a>
    immediately.
  </p>`;

const AUTO_MSG = `
  <p style="margin:16px 0 0;font-size:15px;color:${TEXT};font-style:italic;
     font-family:Arial,sans-serif;line-height:1.6;">
    This is an automated message, please do not reply.
  </p>`;

// ─── Master shell ──────────────────────────────────────────────────────────
function buildShell(contentRows, antiPhishingCode) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
</head>
<body style="margin:0;padding:0;background:#F5F5F5;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F5F5;padding:20px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0"
      style="max-width:600px;width:100%;background:#FFFFFF;border-radius:4px;overflow:hidden;">

      <!-- BLACK HEADER with teal BITEGIT logo -->
      <tr>
        <td style="background:${BLACK};padding:20px 32px;text-align:center;">
          ${LOGO_HTML}
        </td>
      </tr>

      <!-- MAIN CONTENT -->
      ${contentRows}

      <!-- FOOTER -->
      ${buildFooter(antiPhishingCode)}

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

// ══════════════════════════════════════════════════════════════════
// 1. WITHDRAWAL SUCCESSFUL
// ══════════════════════════════════════════════════════════════════
function withdrawalSuccessful({ toEmail, amount, asset, withdrawalTime, address, txId, antiPhishingCode }) {
  const assetUpper = esc(String(asset || 'USDT').toUpperCase());
  const content = `
  <tr><td style="padding:32px 32px 8px;">
    <h1 style="margin:0 0 20px;font-size:26px;font-weight:700;color:${BLACK};
               font-family:Arial,sans-serif;line-height:1.2;">
      ${assetUpper} Withdrawal Successful
    </h1>
    <p style="margin:0 0 16px;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      You have successfully withdrawn <strong>${esc(String(amount))} ${assetUpper}</strong> from your account.
    </p>
    <p style="margin:0 0 4px;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      <strong>Withdrawal Address:</strong><br/>
      <span style="font-size:14px;word-break:break-all;">${esc(address || 'N/A')}</span>
    </p>
    <p style="margin:12px 0 0;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      <strong>Transaction ID:</strong><br/>
      <span style="font-size:14px;word-break:break-all;">${esc(txId || 'N/A')}</span>
    </p>
    ${ctaButton('Visit Your Dashboard', 'https://' + APP_DOMAIN + '/wallet')}
    ${SECURITY_LINE}
    <p style="margin:12px 0;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      Please check with the receiving platform or wallet as the transaction is already
      confirmed on the blockchain explorer.
    </p>
    ${AUTO_MSG}
  </td></tr>`;
  return buildShell(content, antiPhishingCode);
}

// ══════════════════════════════════════════════════════════════════
// 2. DEPOSIT SUCCESSFUL
// ══════════════════════════════════════════════════════════════════
function depositSuccessful({ toEmail, amount, asset, txTime, antiPhishingCode }) {
  const assetUpper = esc(String(asset || 'USDT').toUpperCase());
  const time = esc(txTime || new Date().toISOString().replace('T',' ').slice(0,19) + ' (UTC)');
  const content = `
  <tr><td style="padding:32px 32px 8px;">
    <h1 style="margin:0 0 20px;font-size:26px;font-weight:700;color:${BLACK};
               font-family:Arial,sans-serif;line-height:1.2;">
      ${assetUpper} Deposit Successful
    </h1>
    <p style="margin:0 0 16px;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      You have successfully deposited <strong>${esc(String(amount))} ${assetUpper}</strong> into your account.
    </p>
    <p style="margin:0 0 4px;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      <strong>Transaction Time:</strong><br/>
      <span style="font-size:14px;">${time}</span>
    </p>
    <p style="margin:12px 0 0;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      <strong>Amount Credited:</strong><br/>
      <span style="font-size:14px;">${esc(String(amount))} ${assetUpper}</span>
    </p>
    ${ctaButton('Visit Your Dashboard', 'https://' + APP_DOMAIN + '/wallet')}
    ${SECURITY_LINE}
    <p style="margin:12px 0;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      Your balance has been updated. Go to your assets to check the details.
    </p>
    ${AUTO_MSG}
  </td></tr>`;
  return buildShell(content, antiPhishingCode);
}

// ══════════════════════════════════════════════════════════════════
// 3. WITHDRAWAL VERIFICATION CODE
// ══════════════════════════════════════════════════════════════════
function withdrawalVerificationCode({ toEmail, code, withdrawalTime, amount, asset, address, antiPhishingCode }) {
  const assetUpper = esc(String(asset || 'USDT').toUpperCase());
  const content = `
  <tr><td style="padding:32px 32px 8px;">
    <h1 style="margin:0 0 20px;font-size:26px;font-weight:700;color:${BLACK};
               font-family:Arial,sans-serif;line-height:1.2;">
      Confirm Your Withdrawal
    </h1>
    <p style="margin:0 0 16px;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      You're initiating a withdrawal of <strong>${esc(String(amount))} ${assetUpper}</strong>.
      Enter the code below to confirm. The code expires in <strong>10 minutes</strong>.
    </p>
    <!-- Verification code box -->
    <table cellpadding="0" cellspacing="0" border="0" style="margin:20px 0;">
      <tr>
        <td style="background:#F8F8F8;border:1px solid #E0E0E0;border-radius:6px;
                   padding:16px 32px;text-align:center;">
          <span style="font-size:40px;font-weight:900;letter-spacing:8px;color:${BLACK};
                       font-family:'Courier New',monospace;">${esc(code)}</span>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 4px;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      <strong>Withdrawal Address:</strong><br/>
      <span style="font-size:14px;word-break:break-all;">${esc(address || 'N/A')}</span>
    </p>
    <p style="margin:12px 0;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      <strong>Amount:</strong> ${esc(String(amount))} ${assetUpper}
    </p>
    ${SECURITY_LINE}
    <p style="margin:0 0;font-size:15px;color:#CC0000;font-weight:700;line-height:1.7;font-family:Arial,sans-serif;">
      Never share this code with anyone, including ${esc(APP_NAME)} support.
    </p>
    ${AUTO_MSG}
  </td></tr>`;
  return buildShell(content, antiPhishingCode);
}

// ══════════════════════════════════════════════════════════════════
// 4. OTP — Login / Signup / Password Reset
// ══════════════════════════════════════════════════════════════════
function otpEmail({ heading, toEmail, code, expiresInMinutes, note, antiPhishingCode }) {
  const content = `
  <tr><td style="padding:32px 32px 8px;">
    <h1 style="margin:0 0 20px;font-size:26px;font-weight:700;color:${BLACK};
               font-family:Arial,sans-serif;line-height:1.2;">
      ${esc(heading)}
    </h1>
    <p style="margin:0 0 16px;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      ${esc(note || 'Your verification code is below.')}
    </p>
    <!-- OTP box -->
    <table cellpadding="0" cellspacing="0" border="0" style="margin:20px 0;">
      <tr>
        <td style="background:#F8F8F8;border:1px solid #E0E0E0;border-radius:6px;
                   padding:16px 32px;text-align:center;">
          <span style="font-size:40px;font-weight:900;letter-spacing:8px;color:${BLACK};
                       font-family:'Courier New',monospace;">${esc(code)}</span>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 16px;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      This code is valid for <strong>${Number(expiresInMinutes) || 10} minutes</strong>.
    </p>
    ${SECURITY_LINE}
    <p style="margin:0 0;font-size:15px;color:#CC0000;font-weight:700;line-height:1.7;font-family:Arial,sans-serif;">
      Never share this code with anyone, including ${esc(APP_NAME)} support staff.
    </p>
    ${AUTO_MSG}
  </td></tr>`;
  return buildShell(content, antiPhishingCode);
}

// ══════════════════════════════════════════════════════════════════
// 5. P2P — NEW ORDER PLACED (seller notification)
// ══════════════════════════════════════════════════════════════════
function p2pOrderNotification({ buyerUsername, orderId, orderNo, antiPhishingCode }) {
  const ref = esc(orderNo || orderId || '--');
  const content = `
  <tr><td style="padding:32px 32px 8px;">
    <h1 style="margin:0 0 20px;font-size:26px;font-weight:700;color:${BLACK};
               font-family:Arial,sans-serif;line-height:1.2;">
      New P2P Order Placed
    </h1>
    <p style="margin:0 0 16px;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      <strong>${esc(buyerUsername || 'A buyer')}</strong> has placed an order on your listing.
      Please review and respond promptly.
    </p>
    <p style="margin:0 0 4px;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      <strong>Order No.:</strong> ${ref}
    </p>
    ${ctaButton('View Order', 'https://' + APP_DOMAIN + '/p2p')}
    ${SECURITY_LINE}
    <p style="margin:12px 0;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      Please check with the buyer and confirm all payment details before releasing any assets.
    </p>
    ${AUTO_MSG}
  </td></tr>`;
  return buildShell(content, antiPhishingCode);
}

// ══════════════════════════════════════════════════════════════════
// 6. P2P — BUYER PAID, PLEASE RELEASE (seller)
// ══════════════════════════════════════════════════════════════════
function p2pCryptoRelease({ toEmail, buyerUsername, amountInr, paymentMethod, upiId, antiPhishingCode }) {
  const content = `
  <tr><td style="padding:32px 32px 8px;">
    <h1 style="margin:0 0 20px;font-size:26px;font-weight:700;color:${BLACK};
               font-family:Arial,sans-serif;line-height:1.2;">
      Payment Received — Please Release
    </h1>
    <p style="margin:0 0 16px;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      <strong>${esc(buyerUsername || 'Buyer')}</strong> has completed the payment of
      <strong>&#8377;${esc(String(amountInr || 0))}</strong>
      via <strong>${esc(paymentMethod || 'UPI')}</strong>.
    </p>
    <p style="margin:0 0 4px;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      <strong>Payment Method:</strong> ${esc(paymentMethod || 'UPI')}
    </p>
    <p style="margin:8px 0 0;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      <strong>UPI / Account ID:</strong> ${esc(upiId || 'Check in order chat')}
    </p>
    ${ctaButton('Verify & Release Crypto', 'https://' + APP_DOMAIN + '/p2p')}
    ${SECURITY_LINE}
    <p style="margin:12px 0;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      Please verify receipt of funds in your bank or UPI account before releasing.
      Do not release until you have confirmed the payment is in your account.
    </p>
    ${AUTO_MSG}
  </td></tr>`;
  return buildShell(content, antiPhishingCode);
}

// ══════════════════════════════════════════════════════════════════
// 7. P2P — ORDER CANCELLED
// ══════════════════════════════════════════════════════════════════
function p2pOrderCanceled({ toEmail, orderNo, canceledBy, antiPhishingCode }) {
  const content = `
  <tr><td style="padding:32px 32px 8px;">
    <h1 style="margin:0 0 20px;font-size:26px;font-weight:700;color:${BLACK};
               font-family:Arial,sans-serif;line-height:1.2;">
      P2P Order Cancelled
    </h1>
    <p style="margin:0 0 16px;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      Your P2P order has been cancelled by <strong>${esc(canceledBy || 'the other party')}</strong>.
      No funds have been deducted from your account.
    </p>
    <p style="margin:0 0 4px;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      <strong>Order No.:</strong> ${esc(orderNo || '--')}
    </p>
    ${ctaButton('Find a New Trade', 'https://' + APP_DOMAIN + '/p2p')}
    ${SECURITY_LINE}
    <p style="margin:12px 0;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      If you believe this was an error, please contact customer support immediately.
    </p>
    ${AUTO_MSG}
  </td></tr>`;
  return buildShell(content, antiPhishingCode);
}

// ══════════════════════════════════════════════════════════════════
// 8. KYC APPROVED
// ══════════════════════════════════════════════════════════════════
function kycApproved({ toEmail, username, antiPhishingCode }) {
  const content = `
  <tr><td style="padding:32px 32px 8px;">
    <h1 style="margin:0 0 20px;font-size:26px;font-weight:700;color:${BLACK};
               font-family:Arial,sans-serif;line-height:1.2;">
      Identity Verification Approved
    </h1>
    <p style="margin:0 0 16px;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      Hi <strong>${esc(username || toEmail)}</strong>,
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      Your KYC verification has been <strong style="color:#16a34a;">approved</strong>.
      You can now place buy and sell orders on ${esc(APP_NAME)} P2P.
    </p>
    ${ctaButton('Start Trading on P2P', 'https://' + APP_DOMAIN + '/p2p')}
    ${SECURITY_LINE}
    <p style="margin:12px 0;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      Please check with your account dashboard to see your updated trading limits.
    </p>
    ${AUTO_MSG}
  </td></tr>`;
  return buildShell(content, antiPhishingCode);
}

// ══════════════════════════════════════════════════════════════════
// 9. KYC REJECTED
// ══════════════════════════════════════════════════════════════════
function kycRejected({ toEmail, username, reason, antiPhishingCode }) {
  const content = `
  <tr><td style="padding:32px 32px 8px;">
    <h1 style="margin:0 0 20px;font-size:26px;font-weight:700;color:${BLACK};
               font-family:Arial,sans-serif;line-height:1.2;">
      KYC Verification Update
    </h1>
    <p style="margin:0 0 16px;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      Hi <strong>${esc(username || toEmail)}</strong>,
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      Your KYC submission was <strong style="color:#CC0000;">not approved</strong> at this time.
      ${reason ? `<br/><br/><strong>Reason:</strong> ${esc(reason)}` : ''}
    </p>
    ${ctaButton('Resubmit KYC', 'https://' + APP_DOMAIN + '/kyc')}
    ${SECURITY_LINE}
    <p style="margin:12px 0;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      Please ensure your documents are clear, valid and match your account details.
      Contact customer support if you need assistance.
    </p>
    ${AUTO_MSG}
  </td></tr>`;
  return buildShell(content, antiPhishingCode);
}

// ══════════════════════════════════════════════════════════════════
// 10. P2P — DISPUTE RAISED (admin alert)
// ══════════════════════════════════════════════════════════════════
function p2pDisputeRaised({ toEmail, raisedBy, orderId, orderNo, antiPhishingCode }) {
  const ref = esc(orderNo || orderId || '--');
  const content = `
  <tr><td style="padding:32px 32px 8px;">
    <h1 style="margin:0 0 20px;font-size:26px;font-weight:700;color:${BLACK};
               font-family:Arial,sans-serif;line-height:1.2;">
      P2P Dispute Raised — Action Required
    </h1>
    <p style="margin:0 0 16px;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      <strong>${esc(raisedBy || 'A user')}</strong> has raised a dispute on order
      <strong>${ref}</strong>. Please review and resolve in the admin panel.
    </p>
    <p style="margin:0 0 4px;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      <strong>Order No.:</strong> ${ref}
    </p>
    ${ctaButton('Review in Admin Panel', 'https://' + APP_DOMAIN + '/admin')}
    <p style="margin:12px 0;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      Navigate to <strong>Admin → P2P → Disputes</strong> to review evidence and resolve.
    </p>
    ${AUTO_MSG}
  </td></tr>`;
  return buildShell(content, antiPhishingCode);
}

// ══════════════════════════════════════════════════════════════════
// 11. P2P — ORDER COMPLETED / CRYPTO RELEASED (buyer)
// ══════════════════════════════════════════════════════════════════
function p2pOrderCompleted({ toEmail, orderId, orderNo, assetAmount, asset, antiPhishingCode }) {
  const assetUpper = esc(String(asset || 'USDT').toUpperCase());
  const ref = esc(orderNo || orderId || '--');
  const content = `
  <tr><td style="padding:32px 32px 8px;">
    <h1 style="margin:0 0 20px;font-size:26px;font-weight:700;color:${BLACK};
               font-family:Arial,sans-serif;line-height:1.2;">
      ${assetUpper} P2P Order Completed
    </h1>
    <p style="margin:0 0 16px;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      You have successfully received
      <strong>${esc(String(assetAmount))} ${assetUpper}</strong> from your P2P order.
      The funds are now available in your wallet.
    </p>
    <p style="margin:0 0 4px;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      <strong>Amount Received:</strong> ${esc(String(assetAmount))} ${assetUpper}
    </p>
    <p style="margin:8px 0 0;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      <strong>Order No.:</strong> ${ref}
    </p>
    ${ctaButton('Visit Your Dashboard', 'https://' + APP_DOMAIN + '/wallet')}
    ${SECURITY_LINE}
    <p style="margin:12px 0;font-size:15px;color:${TEXT};line-height:1.7;font-family:Arial,sans-serif;">
      Please check with your wallet to confirm the balance has been updated.
    </p>
    ${AUTO_MSG}
  </td></tr>`;
  return buildShell(content, antiPhishingCode);
}

// ─── Subject helper ────────────────────────────────────────────────────────
function subject(title) {
  return `[${APP_NAME}] ${title}`;
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
