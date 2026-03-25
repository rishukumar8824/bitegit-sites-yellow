const nodemailer = require('nodemailer');

const BRAND_NAME = String(process.env.APP_NAME || 'BITEGIT')
  .trim()
  .toUpperCase();
const BRAND_ACCENT = '#f0b90b';
const BRAND_DARK = '#181a20';
let providerConfigLogged = false;

function firstNonEmptyEnv(...values) {
  for (const value of values) {
    const normalized = String(value || '').trim();
    if (normalized) {
      return normalized;
    }
  }
  return '';
}

function escapeHtml(input) {
  return String(input || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildEmailShell({ title, subtitle, bodyHtml }) {
  return `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;color:#111;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 12px;">
      <tr>
        <td align="center">
          <table width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;background:#ffffff;border:1px solid #e5e7eb;">
            <tr>
              <td style="background:${BRAND_DARK};padding:20px 28px;">
                <div style="font-size:32px;font-weight:800;letter-spacing:0.5px;color:${BRAND_ACCENT};">${BRAND_NAME}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <h1 style="margin:0 0 10px;font-size:34px;line-height:1.1;color:#111;">${escapeHtml(title)}</h1>
                <p style="margin:0 0 22px;font-size:16px;line-height:1.5;color:#374151;">${escapeHtml(subtitle)}</p>
                ${bodyHtml}
                <p style="margin:28px 0 0;font-size:14px;line-height:1.6;color:#4b5563;"><em>This is an automated message, please do not reply.</em></p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 28px;border-top:1px solid #e5e7eb;">
                <p style="margin:0 0 8px;font-size:13px;line-height:1.5;color:#4b5563;">
                  Keep your account secure. Never share verification codes with anyone.
                </p>
                <p style="margin:0;font-size:12px;line-height:1.5;color:#6b7280;">
                  © ${new Date().getUTCFullYear()} ${BRAND_NAME}. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
}

function resolveTransportConfig() {
  const resendApiKey = firstNonEmptyEnv(process.env.RESEND_API_KEY, process.env.RESEND);
  const resendFromEmail = firstNonEmptyEnv(
    process.env.RESEND_FROM_EMAIL,
    process.env.MAIL_FROM,
    process.env.SMTP_FROM_EMAIL
  );
  const smtpHost = firstNonEmptyEnv(process.env.SMTP_HOST);
  const smtpPortRaw = String(process.env.SMTP_PORT || '').trim();
  const smtpUser = firstNonEmptyEnv(process.env.SMTP_USER);
  const smtpPass = firstNonEmptyEnv(process.env.SMTP_PASS);
  const smtpFromEmail = firstNonEmptyEnv(process.env.SMTP_FROM_EMAIL, process.env.MAIL_FROM);
  const smtpSecureRaw = String(process.env.SMTP_SECURE || '')
    .trim()
    .toLowerCase();
  const gmailUser = firstNonEmptyEnv(process.env.GMAIL_USER);
  const gmailAppPassword = firstNonEmptyEnv(process.env.GMAIL_APP_PASSWORD);

  if (!providerConfigLogged) {
    providerConfigLogged = true;
    console.log('[auth-email] runtime provider env detection', {
      hasResendApiKey: Boolean(resendApiKey),
      hasResendFromEmail: Boolean(resendFromEmail),
      hasResendAliasKey: Boolean(String(process.env.RESEND || '').trim()),
      hasMailFromAlias: Boolean(String(process.env.MAIL_FROM || '').trim()),
      hasSmtpHost: Boolean(smtpHost),
      hasSmtpUser: Boolean(smtpUser),
      hasSmtpPass: Boolean(smtpPass),
      hasSmtpFromEmail: Boolean(smtpFromEmail),
      hasGmailUser: Boolean(gmailUser),
      hasGmailAppPassword: Boolean(gmailAppPassword),
      nodeEnv: String(process.env.NODE_ENV || 'development')
    });
  }

  const providers = [];

  if (resendApiKey && resendFromEmail) {
    providers.push({
      provider: 'resend',
      resendApiKey,
      fromEmail: resendFromEmail
    });
  }

  if (smtpHost && smtpUser && smtpPass) {
    const parsedPort = Number.parseInt(smtpPortRaw || '587', 10);
    const smtpPort = Number.isFinite(parsedPort) ? parsedPort : 587;
    const secure = smtpSecureRaw ? smtpSecureRaw === 'true' : smtpPort === 465;
    providers.push({
      provider: 'smtp',
      transporter: nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure,
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      }),
      fromEmail: smtpFromEmail || smtpUser
    });
  }

  if (gmailUser && gmailAppPassword) {
    providers.push({
      provider: 'gmail',
      transporter: nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: gmailUser,
          pass: gmailAppPassword
        }
      }),
      fromEmail: gmailUser
    });
  }

  return { providers };
}

async function sendViaProvider({ to, subject, text, html }) {
  const cfg = resolveTransportConfig();
  if (!cfg.providers || cfg.providers.length === 0) {
    return { delivered: false, reason: 'missing_email_provider_config' };
  }

  let lastReason = 'delivery_failed';
  for (const provider of cfg.providers) {
    if (!provider || !provider.fromEmail) {
      lastReason = 'missing_email_provider_config';
      continue;
    }

    if (provider.provider === 'resend') {
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${provider.resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: provider.fromEmail,
            to: [to],
            subject,
            html,
            text
          })
        });

        if (response.ok) {
          return { delivered: true, reason: 'sent_via_resend' };
        }
        const errorText = await response.text();
        lastReason = `resend_error:${errorText}`;
        continue;
      } catch (error) {
        lastReason = `resend_error:${error.message}`;
        continue;
      }
    }

    try {
      await provider.transporter.sendMail({
        from: provider.fromEmail,
        to,
        subject,
        text,
        html
      });
      return { delivered: true, reason: `sent_via_${provider.provider}` };
    } catch (error) {
      lastReason = `smtp_error:${error.message}`;
      continue;
    }
  }

  return { delivered: false, reason: lastReason };
}

function createOtpTemplate({ title, code, expiresInMinutes, note }) {
  const safeCode = escapeHtml(code);
  const safeNote = escapeHtml(note);
  const bodyHtml = `
    <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#111;">Your verification code:</p>
    <div style="display:inline-block;background:#fff7d1;border:1px solid #f0b90b;border-radius:8px;padding:10px 16px;font-size:32px;font-weight:800;letter-spacing:3px;color:#111;">
      ${safeCode}
    </div>
    <p style="margin:16px 0 0;font-size:15px;line-height:1.7;color:#111;">
      This code is valid for <strong>${Number(expiresInMinutes)} minutes</strong>.
    </p>
    <p style="margin:8px 0 0;font-size:15px;line-height:1.7;color:#111;">${safeNote}</p>
  `;

  return buildEmailShell({
    title,
    subtitle: 'Security verification required',
    bodyHtml
  });
}

function createNewDeviceTemplate({ email, loginTimeUtc, ipAddress, userAgent, location }) {
  const bodyHtml = `
    <h2 style="margin:0 0 14px;font-size:30px;line-height:1.15;color:#111;">New Device or IP Login Detected</h2>
    <p style="margin:0 0 14px;font-size:16px;line-height:1.6;color:#111;">
      We detected a login attempt for <strong>${escapeHtml(email)}</strong> from a new device or IP address.
      If this was not you, reset your password immediately.
    </p>
    <table cellpadding="0" cellspacing="0" style="font-size:15px;line-height:1.8;color:#111;">
      <tr><td style="padding-right:10px;"><strong>Time:</strong></td><td>${escapeHtml(loginTimeUtc)}</td></tr>
      <tr><td style="padding-right:10px;"><strong>Device:</strong></td><td>${escapeHtml(userAgent)}</td></tr>
      <tr><td style="padding-right:10px;"><strong>IP Address:</strong></td><td>${escapeHtml(ipAddress)}</td></tr>
      <tr><td style="padding-right:10px;"><strong>Location:</strong></td><td>${escapeHtml(location)}</td></tr>
    </table>
  `;

  return buildEmailShell({
    title: 'New Device Login Alert',
    subtitle: 'Review your recent account activity',
    bodyHtml
  });
}

function createAuthEmailService() {
  const T = require('./email-templates');

  async function sendSignupOtpEmail(email, code, { expiresInMinutes = 10 } = {}) {
    return sendViaProvider({
      to: email,
      subject: T.subject('Verification code'),
      text: `Your ${T.APP_NAME} signup verification code is ${code}. Valid for ${expiresInMinutes} minutes.`,
      html: T.otpEmail({
        heading: 'Verify your email',
        toEmail: email,
        code,
        expiresInMinutes,
        note: "You're signing up for " + T.APP_NAME + ". Enter this code to verify your email address."
      })
    });
  }

  async function sendForgotPasswordOtpEmail(email, code, { expiresInMinutes = 10 } = {}) {
    return sendViaProvider({
      to: email,
      subject: T.subject('Verification code'),
      text: `Your ${T.APP_NAME} password reset code is ${code}. Valid for ${expiresInMinutes} minutes.`,
      html: T.otpEmail({
        heading: 'Reset your password',
        toEmail: email,
        code,
        expiresInMinutes,
        note: 'You requested a password reset. Use the code above to proceed. If this was not you, secure your account immediately.'
      })
    });
  }

  async function sendLoginOtpEmail(email, code, { expiresInMinutes = 10 } = {}) {
    return sendViaProvider({
      to: email,
      subject: T.subject('Verification code'),
      text: `Your ${T.APP_NAME} login verification code is ${code}. Valid for ${expiresInMinutes} minutes.`,
      html: T.otpEmail({
        heading: 'Login verification',
        toEmail: email,
        code,
        expiresInMinutes,
        note: 'A login attempt was made to your account. Never share this code with anyone, including support.'
      })
    });
  }

  async function sendNewDeviceLoginAlert(email, metadata = {}) {
    const T2 = require('./email-templates');
    const loginTimeUtc = metadata.loginTimeUtc || new Date().toISOString().replace('T', ' ').replace('Z', ' UTC');
    const ipAddress = metadata.ipAddress || 'Unknown';
    const userAgent = metadata.userAgent || 'Unknown';
    const location  = metadata.location  || 'Unknown';
    return sendViaProvider({
      to: email,
      subject: T2.subject('New device or IP login alert'),
      text: `New login detected on your ${T2.APP_NAME} account. Time: ${loginTimeUtc} | IP: ${ipAddress}`,
      html: T2.otpEmail({
        heading: 'New device login detected',
        toEmail: email,
        code: '',
        expiresInMinutes: 0,
        note: `We detected a login to your account from a new device or IP.\n\nTime: ${loginTimeUtc}\nDevice: ${userAgent}\nIP: ${ipAddress}\nLocation: ${location}\n\nIf this was not you, reset your password immediately.`
      })
    });
  }

  async function sendDepositSuccessEmail(email, summary = {}) {
    const T2 = require('./email-templates');
    const amount = String(summary.amount || 0);
    const asset  = String(summary.asset  || 'USDT').toUpperCase();
    const txTime = summary.txTime || new Date().toISOString().replace('T', ' ').slice(0, 19) + ' (UTC+8)';
    return sendViaProvider({
      to: email,
      subject: T2.subject('Deposit successful'),
      text: `Deposit successful. ${amount} ${asset} received.`,
      html: T2.depositSuccessful({ toEmail: email, amount, asset, txTime })
    });
  }

  async function sendWithdrawalSuccessEmail(email, summary = {}) {
    const T2 = require('./email-templates');
    const amount         = String(summary.amount || 0);
    const asset          = String(summary.asset  || 'USDT').toUpperCase();
    const address        = String(summary.address || 'N/A');
    const txId           = String(summary.transactionId || 'N/A');
    const withdrawalTime = summary.withdrawalTime || new Date().toISOString().replace('T', ' ').slice(0, 19) + ' (UTC+8)';
    return sendViaProvider({
      to: email,
      subject: T2.subject('Withdrawal successful'),
      text: `Withdrawal successful. ${amount} ${asset} sent to ${address}.`,
      html: T2.withdrawalSuccessful({ toEmail: email, amount, asset, withdrawalTime, address, txId })
    });
  }

  async function sendWithdrawalOtpEmail(email, code, summary = {}) {
    const T2 = require('./email-templates');
    const amount         = String(summary.amount || 0);
    const asset          = String(summary.asset  || 'USDT').toUpperCase();
    const address        = String(summary.address || 'N/A');
    const withdrawalTime = summary.withdrawalTime || new Date().toISOString().replace('T', ' ').slice(0, 19) + ' (UTC+8)';
    return sendViaProvider({
      to: email,
      subject: T2.subject('Verification code'),
      text: `Your ${T2.APP_NAME} withdrawal verification code is ${code}. Valid for 10 minutes.`,
      html: T2.withdrawalVerificationCode({ toEmail: email, code, withdrawalTime, amount, asset, address })
    });
  }

  return {
    sendSignupOtpEmail,
    sendForgotPasswordOtpEmail,
    sendLoginOtpEmail,
    sendNewDeviceLoginAlert,
    sendDepositSuccessEmail,
    sendWithdrawalSuccessEmail,
    sendWithdrawalOtpEmail
  };
}

async function sendRawEmail({ to, subject, html, text }) {
  return sendViaProvider({ to, subject, html, text: text || subject });
}

module.exports = {
  createAuthEmailService,
  sendRawEmail
};
