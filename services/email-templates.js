/**
 * Bitegit Email Templates — Pixel-match to Bitget style
 * Each template has a unique from-address label via subject prefix.
 */

const APP_NAME   = String(process.env.APP_NAME   || 'Bitegit').trim();
const APP_DOMAIN = String(process.env.APP_DOMAIN || 'bitegit.com').trim();
const SUPPORT    = `support@${APP_DOMAIN}`;
const YEAR       = new Date().getUTCFullYear();

// ─── Logo SVG (Bitget-style teal circle + letter) ─────────────────────────
const LOGO_HTML = `
<table cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="vertical-align:middle;padding-right:8px;">
      <div style="width:34px;height:34px;border-radius:8px;background:linear-gradient(135deg,#00c2b2,#00a89a);
                  display:flex;align-items:center;justify-content:center;text-align:center;
                  font-size:18px;font-weight:900;color:#fff;line-height:34px;">
        &#9651;
      </div>
    </td>
    <td style="vertical-align:middle;">
      <span style="font-size:20px;font-weight:800;color:#1a1a1a;letter-spacing:-0.3px;">${APP_NAME}</span>
    </td>
  </tr>
</table>`;

// ─── Shared Footer (same in every email) ──────────────────────────────────
function buildFooter(antiPhishingCode) {
  return `
  <!-- Divider -->
  <tr><td style="padding:0 28px;"><div style="height:1px;background:#e8eaed;margin:8px 0;"></div></td></tr>

  <!-- Help Section -->
  <tr><td style="padding:14px 28px 4px;">
    <p style="margin:0;font-size:13px;color:#555;line-height:1.7;">Any question or in need of help?</p>
    <p style="margin:4px 0 0;font-size:13px;color:#555;line-height:1.7;">
      You can refer to <a href="https://${APP_DOMAIN}/support" style="color:#00c2b2;text-decoration:none;">Help center</a>
      or send email <a href="mailto:${SUPPORT}" style="color:#00c2b2;text-decoration:none;">${SUPPORT}</a> to contact us
    </p>
    <p style="margin:4px 0 0;font-size:13px;color:#555;line-height:1.7;">
      Follow our <a href="https://twitter.com" style="color:#00c2b2;text-decoration:none;">X(Twitter)</a>
      for more <span style="color:#f0b90b;font-weight:700;">${APP_NAME}</span> updates.
    </p>
    <p style="margin:8px 0 0;font-size:12px;color:#888;">* This email is sent automatically and you do not need to reply.</p>
  </td></tr>

  <!-- Anti-Phishing Code -->
  <tr><td style="padding:14px 28px;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        <td style="border-left:3px solid #f0b90b;padding:4px 10px;">
          <span style="font-size:13px;font-weight:700;color:#1a1a1a;">Anti-Phishing Code : </span>
          <span style="font-size:13px;color:#555;">${antiPhishingCode || ''}</span>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- Download App -->
  <tr><td style="padding:4px 28px 16px;">
    <p style="margin:0 0 10px;font-size:13px;color:#555;">
      Download the <span style="color:#f0b90b;font-weight:700;">${APP_NAME}</span> App now<br/>
      <span style="font-size:12px;color:#888;">Stay updated on the go!</span>
    </p>
    <table cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding-right:10px;">
          <a href="https://play.google.com" style="display:inline-block;background:#000;border-radius:8px;padding:8px 16px;text-decoration:none;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding-right:6px;vertical-align:middle;font-size:16px;color:#fff;">&#9658;</td>
                <td style="vertical-align:middle;">
                  <div style="font-size:9px;color:#ccc;line-height:1.2;">GET IT ON</div>
                  <div style="font-size:13px;color:#fff;font-weight:600;line-height:1.2;">Google Play</div>
                </td>
              </tr>
            </table>
          </a>
        </td>
        <td>
          <a href="https://apps.apple.com" style="display:inline-block;background:#000;border-radius:8px;padding:8px 16px;text-decoration:none;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding-right:6px;vertical-align:middle;font-size:16px;color:#fff;">&#63743;</td>
                <td style="vertical-align:middle;">
                  <div style="font-size:9px;color:#ccc;line-height:1.2;">Download on the</div>
                  <div style="font-size:13px;color:#fff;font-weight:600;line-height:1.2;">App Store</div>
                </td>
              </tr>
            </table>
          </a>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- Divider -->
  <tr><td style="padding:0 28px;"><div style="height:1px;background:#e8eaed;"></div></td></tr>

  <!-- Social Icons -->
  <tr><td style="padding:12px 28px;text-align:center;">
    <a href="#" style="display:inline-block;width:28px;height:28px;border-radius:50%;background:#f0f0f0;margin:0 3px;line-height:28px;text-align:center;font-size:12px;color:#555;text-decoration:none;">t</a>
    <a href="#" style="display:inline-block;width:28px;height:28px;border-radius:50%;background:#f0f0f0;margin:0 3px;line-height:28px;text-align:center;font-size:12px;color:#555;text-decoration:none;">T</a>
    <a href="#" style="display:inline-block;width:28px;height:28px;border-radius:50%;background:#f0f0f0;margin:0 3px;line-height:28px;text-align:center;font-size:12px;color:#555;text-decoration:none;">f</a>
    <a href="#" style="display:inline-block;width:28px;height:28px;border-radius:50%;background:#f0f0f0;margin:0 3px;line-height:28px;text-align:center;font-size:12px;color:#555;text-decoration:none;">X</a>
    <a href="#" style="display:inline-block;width:28px;height:28px;border-radius:50%;background:#f0f0f0;margin:0 3px;line-height:28px;text-align:center;font-size:12px;color:#555;text-decoration:none;">Y</a>
    <a href="#" style="display:inline-block;width:28px;height:28px;border-radius:50%;background:#f0f0f0;margin:0 3px;line-height:28px;text-align:center;font-size:12px;color:#555;text-decoration:none;">&#9679;</a>
    <a href="#" style="display:inline-block;width:28px;height:28px;border-radius:50%;background:#f0f0f0;margin:0 3px;line-height:28px;text-align:center;font-size:12px;color:#555;text-decoration:none;">in</a>
  </td></tr>

  <!-- Privacy Note -->
  <tr><td style="padding:8px 28px 16px;">
    <p style="margin:0;font-size:11px;color:#999;line-height:1.6;">
      Note: Online support and staff of <span style="color:#f0b90b;font-weight:600;">${APP_NAME}</span> will never require your
      account' private information in any mail or communication and social tools, so please do not
      reveal your account information to anyone. Please contact us via above methods if you
      encounter any suspicious situation.
    </p>
    <p style="margin:8px 0 0;font-size:11px;color:#bbb;">&copy;2018-${YEAR} ${APP_DOMAIN} reserves all rights.</p>
  </td></tr>
`;
}

// ─── Master shell ──────────────────────────────────────────────────────────
function buildShell(contentRows, antiPhishingCode) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0"
      style="max-width:600px;width:100%;background:#fff;border-radius:4px;border:1px solid #e5e7eb;overflow:hidden;">

      <!-- LOGO HEADER -->
      <tr>
        <td style="padding:20px 28px;background:#fff;border-bottom:2px solid #00c2b2;">
          ${LOGO_HTML}
        </td>
      </tr>

      <!-- CONTENT -->
      ${contentRows}

      <!-- FOOTER -->
      ${buildFooter(antiPhishingCode)}

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function esc(v) {
  return String(v || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function detailBox(rows) {
  const rowsHtml = rows.map(([label, value, isLink]) =>
    `<tr>
      <td style="padding:7px 14px;font-size:13px;color:#888;white-space:nowrap;border-right:1px solid #f0f0f0;">${esc(label)}</td>
      <td style="padding:7px 14px;font-size:13px;color:${isLink ? '#00c2b2' : '#1a1a1a'};word-break:break-all;">${isLink ? value : esc(value)}</td>
    </tr>`
  ).join('');
  return `<table width="100%" cellpadding="0" cellspacing="0"
    style="border:1px solid #e8eaed;border-radius:8px;margin:14px 0;overflow:hidden;font-size:13px;">
    ${rowsHtml}
  </table>`;
}

// ══════════════════════════════════════════════════════════════════
// 1. DEPOSIT SUCCESSFUL
// ══════════════════════════════════════════════════════════════════
function depositSuccessful({ toEmail, amount, asset, txTime, antiPhishingCode }) {
  const maskedEmail = esc(toEmail);
  const content = `
  <tr><td style="padding:24px 28px 20px;">
    <h2 style="margin:0 0 10px;font-size:22px;font-weight:700;color:#1a1a1a;">Deposit successful</h2>
    <p style="margin:0 0 16px;font-size:14px;color:#555;">Hi ${maskedEmail},</p>
    <table cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="font-size:14px;color:#555;padding:2px 0;white-space:nowrap;">Transaction time&nbsp;:&nbsp;</td>
        <td style="font-size:14px;color:#1a1a1a;font-weight:500;">${esc(txTime || new Date().toISOString().replace('T',' ').slice(0,19) + ' (UTC+8)')}</td>
      </tr>
      <tr>
        <td style="font-size:14px;color:#555;padding:2px 0;white-space:nowrap;">Crypto received&nbsp;:&nbsp;</td>
        <td style="font-size:14px;color:#1a1a1a;font-weight:700;">${esc(amount)} ${esc(asset || 'USDT')}</td>
      </tr>
    </table>
    <p style="margin:16px 0 0;font-size:14px;color:#555;">Go to your assets to check for details.</p>
  </td></tr>`;
  return buildShell(content, antiPhishingCode);
}

// ══════════════════════════════════════════════════════════════════
// 2. WITHDRAWAL SUCCESSFUL
// ══════════════════════════════════════════════════════════════════
function withdrawalSuccessful({ toEmail, amount, asset, withdrawalTime, address, txId, antiPhishingCode }) {
  const maskedEmail = esc(toEmail);
  const box = detailBox([
    ['Withdrawal time', withdrawalTime || new Date().toISOString().replace('T',' ').slice(0,19) + ' (UTC+8)', false],
    ['Amount', `${amount} ${asset || 'USDT'}`, false],
    ['Withdrawal address', address || 'N/A', true],
    ['TxID', txId || 'N/A', true],
  ]);
  const content = `
  <tr><td style="padding:24px 28px 20px;">
    <h2 style="margin:0 0 10px;font-size:22px;font-weight:700;color:#1a1a1a;">Withdrawal successful</h2>
    <p style="margin:0 0 10px;font-size:14px;color:#555;">Hi ${maskedEmail},</p>
    <p style="margin:0 0 14px;font-size:14px;color:#555;">Withdrawal has been successful. Check the details below:</p>
    ${box}
  </td></tr>`;
  return buildShell(content, antiPhishingCode);
}

// ══════════════════════════════════════════════════════════════════
// 3. WITHDRAWAL VERIFICATION CODE (Confirm your withdrawal)
// ══════════════════════════════════════════════════════════════════
function withdrawalVerificationCode({ toEmail, code, withdrawalTime, amount, asset, address, antiPhishingCode }) {
  const maskedEmail = esc(toEmail);
  const content = `
  <tr><td style="padding:24px 28px 20px;">
    <h2 style="margin:0 0 10px;font-size:22px;font-weight:700;color:#1a1a1a;">Confirm your withdrawal</h2>
    <p style="margin:0 0 10px;font-size:14px;color:#555;">Hi ${maskedEmail},</p>
    <p style="margin:0 0 18px;font-size:14px;color:#555;line-height:1.6;">
      You're initiating a withdrawal. Ensure the withdrawal address is correct and confirm that
      you are the one performing this action before proceeding. Details are shown below.
    </p>

    <!-- OTP CODE BOX -->
    <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:16px;">
      <tr>
        <td style="background:#f8f9fa;border:1px solid #e8eaed;border-radius:8px;padding:14px 22px;text-align:center;">
          <div style="font-size:36px;font-weight:900;letter-spacing:6px;color:#1a1a1a;font-family:monospace;">${esc(code)}</div>
        </td>
        <td style="padding-left:14px;">
          <div style="background:#e6faf8;border-radius:6px;padding:8px 14px;font-size:13px;color:#00a89a;font-weight:600;line-height:1.5;">
            Your verification code<br/>will be valid for 10 minutes.
          </div>
        </td>
      </tr>
    </table>

    <!-- WITHDRAWAL DETAILS -->
    <table cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e8eaed;border-radius:8px;padding:10px 14px;width:auto;">
      <tr>
        <td style="font-size:13px;color:#888;padding:3px 14px 3px 0;">Withdrawal time</td>
        <td style="font-size:13px;color:#1a1a1a;">${esc(withdrawalTime || '--')}</td>
      </tr>
      <tr>
        <td style="font-size:13px;color:#888;padding:3px 14px 3px 0;">Amount</td>
        <td style="font-size:13px;color:#1a1a1a;font-weight:600;">${esc(amount)} ${esc(asset || 'USDT')}</td>
      </tr>
      <tr>
        <td style="font-size:13px;color:#888;padding:3px 14px 3px 0;">Address</td>
        <td style="font-size:13px;color:#00c2b2;word-break:break-all;max-width:280px;">${esc(address || 'N/A')}</td>
      </tr>
    </table>
  </td></tr>`;
  return buildShell(content, antiPhishingCode);
}

// ══════════════════════════════════════════════════════════════════
// 4. OTP (Signup / Login / Password Reset)
// ══════════════════════════════════════════════════════════════════
function otpEmail({ heading, toEmail, code, expiresInMinutes, note, antiPhishingCode }) {
  const maskedEmail = esc(toEmail);
  const content = `
  <tr><td style="padding:24px 28px 20px;">
    <h2 style="margin:0 0 10px;font-size:22px;font-weight:700;color:#1a1a1a;">${esc(heading)}</h2>
    <p style="margin:0 0 14px;font-size:14px;color:#555;">Hi ${maskedEmail},</p>
    <p style="margin:0 0 18px;font-size:14px;color:#555;line-height:1.6;">${esc(note || 'Your verification code is below.')}</p>

    <!-- OTP CODE BOX -->
    <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:16px;">
      <tr>
        <td style="background:#f8f9fa;border:1px solid #e8eaed;border-radius:8px;padding:14px 22px;text-align:center;">
          <div style="font-size:36px;font-weight:900;letter-spacing:6px;color:#1a1a1a;font-family:monospace;">${esc(code)}</div>
        </td>
        <td style="padding-left:14px;">
          <div style="background:#e6faf8;border-radius:6px;padding:8px 14px;font-size:13px;color:#00a89a;font-weight:600;line-height:1.5;">
            Your verification code<br/>will be valid for ${Number(expiresInMinutes) || 10} minutes.
          </div>
        </td>
      </tr>
    </table>
    <p style="margin:0;font-size:13px;color:#888;">Never share this code with anyone, including support staff.</p>
  </td></tr>`;
  return buildShell(content, antiPhishingCode);
}

// ══════════════════════════════════════════════════════════════════
// 5. P2P ORDER NOTIFICATION (seller gets this when buyer places order)
// ══════════════════════════════════════════════════════════════════
function p2pOrderNotification({ buyerUsername, orderId, orderNo, antiPhishingCode }) {
  const content = `
  <tr><td style="padding:24px 28px 20px;">
    <h2 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#1a1a1a;">
      <span style="color:#f0b90b;">P2P</span> trading: order notification
    </h2>
    <p style="margin:0;font-size:14px;color:#555;line-height:1.7;">
      <strong>${esc(buyerUsername || 'A buyer')}</strong> has placed an order.
      Check the order status now.
      Order no.<strong>${esc(orderNo || orderId || '--')}</strong>
    </p>
  </td></tr>`;
  return buildShell(content, antiPhishingCode);
}

// ══════════════════════════════════════════════════════════════════
// 6. P2P CRYPTO RELEASE (seller: buyer has paid, please release)
// ══════════════════════════════════════════════════════════════════
function p2pCryptoRelease({ toEmail, buyerUsername, amountInr, paymentMethod, upiId, antiPhishingCode }) {
  const maskedEmail = esc(toEmail);
  const upiRow = `
  <table width="100%" cellpadding="0" cellspacing="0"
    style="border:1px solid #e8eaed;border-radius:8px;margin:14px 0;overflow:hidden;">
    <tr>
      <td style="padding:10px 14px;font-size:13px;color:#888;border-right:1px solid #f0f0f0;white-space:nowrap;">UPI ID</td>
      <td style="padding:10px 14px;font-size:13px;color:#555;">${esc(upiId || 'ask in chat')}</td>
    </tr>
  </table>`;
  const content = `
  <tr><td style="padding:24px 28px 20px;">
    <h2 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#1a1a1a;">
      <span style="color:#f0b90b;">P2P</span> trading:
    </h2>
    <p style="margin:0 0 6px;font-size:14px;color:#555;">Hi ${maskedEmail}.</p>
    <p style="margin:0 0 14px;font-size:14px;color:#555;line-height:1.7;">
      <strong>${esc(buyerUsername || 'Buyer')}</strong> has completed the payment via
      <strong>${esc(paymentMethod || 'UPI')}</strong>.
      Confirm receipt of <strong>${esc(String(amountInr || 0))} INR</strong> in the following account.
      If the funds have been received, release the coins promptly.
    </p>
    ${upiRow}
  </td></tr>`;
  return buildShell(content, antiPhishingCode);
}

// ══════════════════════════════════════════════════════════════════
// 7. P2P ORDER CANCELED
// ══════════════════════════════════════════════════════════════════
function p2pOrderCanceled({ toEmail, orderNo, canceledBy, antiPhishingCode }) {
  const maskedEmail = esc(toEmail);
  const content = `
  <tr><td style="padding:24px 28px 20px;">
    <h2 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#1a1a1a;">
      <span style="color:#f0b90b;">P2P</span> trading:
    </h2>
    <p style="margin:0 0 6px;font-size:14px;color:#555;">Hi ${maskedEmail}.</p>
    <p style="margin:0 0 6px;font-size:14px;color:#555;line-height:1.7;">
      Your sell order has been canceled by the ${esc(canceledBy || 'buyer')}.
    </p>
    <p style="margin:0;font-size:14px;color:#555;">
      Order no.<strong>${esc(orderNo || '--')}</strong>
    </p>
  </td></tr>`;
  return buildShell(content, antiPhishingCode);
}

// ══════════════════════════════════════════════════════════════════
// 8. KYC APPROVED
// ══════════════════════════════════════════════════════════════════
function kycApproved({ toEmail, username, antiPhishingCode }) {
  const maskedEmail = esc(toEmail);
  const content = `
  <tr><td style="padding:24px 28px 20px;">
    <h2 style="margin:0 0 10px;font-size:22px;font-weight:700;color:#1a1a1a;">Identity verified ✅</h2>
    <p style="margin:0 0 10px;font-size:14px;color:#555;">Hi ${maskedEmail},</p>
    <p style="margin:0 0 16px;font-size:14px;color:#555;line-height:1.6;">
      Your KYC verification has been <strong style="color:#16a34a;">approved</strong>.
      You can now place buy and sell orders on ${esc(APP_NAME)} P2P.
    </p>
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:16px 20px;text-align:center;margin:10px 0;">
      <div style="font-size:28px;">✅</div>
      <div style="font-weight:700;color:#16a34a;font-size:15px;margin-top:6px;">Identity Verified</div>
      <div style="font-size:13px;color:#555;margin-top:4px;">You're all set to trade on P2P</div>
    </div>
  </td></tr>`;
  return buildShell(content, antiPhishingCode);
}

// ══════════════════════════════════════════════════════════════════
// 9. KYC REJECTED
// ══════════════════════════════════════════════════════════════════
function kycRejected({ toEmail, username, reason, antiPhishingCode }) {
  const maskedEmail = esc(toEmail);
  const reasonBox = reason
    ? `<div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:12px 16px;margin:12px 0;">
        <strong style="color:#dc2626;font-size:13px;">Reason:</strong>
        <p style="margin:4px 0 0;font-size:13px;color:#555;">${esc(reason)}</p>
      </div>` : '';
  const content = `
  <tr><td style="padding:24px 28px 20px;">
    <h2 style="margin:0 0 10px;font-size:22px;font-weight:700;color:#1a1a1a;">KYC verification update</h2>
    <p style="margin:0 0 10px;font-size:14px;color:#555;">Hi ${maskedEmail},</p>
    <p style="margin:0 0 8px;font-size:14px;color:#555;line-height:1.6;">
      Your KYC submission was <strong style="color:#dc2626;">not approved</strong> at this time.
    </p>
    ${reasonBox}
    <p style="margin:0;font-size:14px;color:#555;">Please resubmit with correct documents in the app.</p>
  </td></tr>`;
  return buildShell(content, antiPhishingCode);
}

// ══════════════════════════════════════════════════════════════════
// 10. P2P DISPUTE RAISED (admin alert)
// ══════════════════════════════════════════════════════════════════
function p2pDisputeRaised({ toEmail, raisedBy, orderId, orderNo, antiPhishingCode }) {
  const content = `
  <tr><td style="padding:24px 28px 20px;">
    <h2 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#1a1a1a;">
      <span style="color:#f0b90b;">P2P</span> Dispute — Admin Action Required
    </h2>
    <p style="margin:0 0 14px;font-size:14px;color:#555;line-height:1.7;">
      <strong>${esc(raisedBy || 'A user')}</strong> has raised a dispute on order
      <strong>${esc(orderNo || orderId || '--')}</strong>.
      Please review and resolve in the admin panel.
    </p>
    <div style="background:#fef3c7;border:1px solid #fde68a;border-radius:8px;padding:12px 16px;">
      <strong style="color:#92400e;font-size:13px;">⚠️ Action Required:</strong>
      <p style="margin:4px 0 0;font-size:13px;color:#78350f;">Login to admin panel → P2P → Disputes</p>
    </div>
  </td></tr>`;
  return buildShell(content, antiPhishingCode);
}

// ══════════════════════════════════════════════════════════════════
// 11. ORDER COMPLETED / CRYPTO RELEASED (buyer notification)
// ══════════════════════════════════════════════════════════════════
function p2pOrderCompleted({ toEmail, orderId, orderNo, assetAmount, asset, antiPhishingCode }) {
  const maskedEmail = esc(toEmail);
  const content = `
  <tr><td style="padding:24px 28px 20px;">
    <h2 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#1a1a1a;">
      <span style="color:#f0b90b;">P2P</span> trading: crypto released ✅
    </h2>
    <p style="margin:0 0 6px;font-size:14px;color:#555;">Hi ${maskedEmail}.</p>
    <p style="margin:0 0 14px;font-size:14px;color:#555;line-height:1.7;">
      The seller has released your crypto. Your
      <strong>${esc(assetAmount)} ${esc(asset || 'USDT')}</strong> is now available in your wallet.
    </p>
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:12px 16px;text-align:center;">
      <div style="font-size:22px;">✅</div>
      <div style="font-weight:700;color:#16a34a;font-size:14px;margin-top:4px;">Order Completed Successfully</div>
      <div style="font-size:12px;color:#555;margin-top:2px;">Order no. ${esc(orderNo || orderId || '--')}</div>
    </div>
  </td></tr>`;
  return buildShell(content, antiPhishingCode);
}

// ── Subject helpers ────────────────────────────────────────────────────────
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
