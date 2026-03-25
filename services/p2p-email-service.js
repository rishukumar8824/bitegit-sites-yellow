const { sendRawEmail } = require('./auth-email-service');
const T = require('./email-templates');

async function trySend(to, subjectStr, html, text) {
  if (!to) return;
  try {
    await sendRawEmail({ to, subject: subjectStr, html, text: text || subjectStr });
  } catch (err) {
    console.warn('[p2p-email] send failed:', err.message);
  }
}

function createP2PEmailService() {
  /**
   * Seller receives this when a buyer places an order.
   */
  async function sendOrderCreated(sellerEmail, order) {
    await trySend(
      sellerEmail,
      T.subject('New P2P order placed'),
      T.p2pOrderNotification({
        buyerUsername: order.buyerUsername || order.buyerEmail || 'A buyer',
        orderId:       order.id || order._id,
        orderNo:       order.reference || order.orderNo || order.id,
        antiPhishingCode: order.antiPhishingCode || ''
      }),
      `New P2P order from ${order.buyerUsername || 'a buyer'}. Order #${order.reference || order.id}`
    );
  }

  /**
   * Seller receives this when buyer marks payment as sent.
   * Prompts seller to verify bank/UPI and release crypto.
   */
  async function sendOrderPaid(sellerEmail, order) {
    await trySend(
      sellerEmail,
      T.subject('Buyer has completed payment — please release'),
      T.p2pCryptoRelease({
        toEmail:      sellerEmail,
        buyerUsername: order.buyerUsername || order.buyerEmail || 'Buyer',
        amountInr:    order.amountInr || order.fiatAmount || 0,
        paymentMethod: order.paymentMethod || 'UPI',
        upiId:        order.upiId || order.paymentDetails || '',
        antiPhishingCode: order.antiPhishingCode || ''
      }),
      `Buyer has sent payment for order #${order.reference || order.id}. Verify your account and release crypto.`
    );
  }

  /**
   * Buyer receives this when seller releases crypto.
   */
  async function sendOrderReleased(buyerEmail, order) {
    await trySend(
      buyerEmail,
      T.subject('Crypto released — order complete'),
      T.p2pOrderCompleted({
        toEmail:     buyerEmail,
        orderId:     order.id || order._id,
        orderNo:     order.reference || order.orderNo || order.id,
        assetAmount: order.assetAmount || order.cryptoAmount || 0,
        asset:       order.asset || 'USDT',
        antiPhishingCode: order.antiPhishingCode || ''
      }),
      `Your crypto has been released. Order #${order.reference || order.id} completed.`
    );
  }

  /**
   * Both buyer and/or seller receive this when an order is cancelled.
   */
  async function sendOrderCancelled(email, order) {
    await trySend(
      email,
      T.subject('P2P order cancelled'),
      T.p2pOrderCanceled({
        toEmail:    email,
        orderNo:    order.reference || order.orderNo || order.id,
        canceledBy: order.canceledBy || order.cancelledBy || 'the other party',
        antiPhishingCode: order.antiPhishingCode || ''
      }),
      `P2P order #${order.reference || order.id} has been cancelled.`
    );
  }

  /**
   * Admin receives this when a dispute is raised.
   */
  async function sendDisputeRaised(adminEmail, order, raisedBy) {
    await trySend(
      adminEmail,
      T.subject('P2P dispute raised — action required'),
      T.p2pDisputeRaised({
        toEmail:   adminEmail,
        raisedBy:  raisedBy || 'A user',
        orderId:   order.id || order._id,
        orderNo:   order.reference || order.orderNo || order.id,
        antiPhishingCode: order.antiPhishingCode || ''
      }),
      `Dispute raised on order #${order.reference || order.id} by ${raisedBy}. Review in admin panel.`
    );
  }

  return {
    sendOrderCreated,
    sendOrderPaid,
    sendOrderReleased,
    sendOrderCancelled,
    sendDisputeRaised
  };
}

module.exports = { createP2PEmailService };

// ── Standalone KYC emails ─────────────────────────────────────────────────

async function sendKycApprovedEmail(toEmail, username) {
  return sendRawEmail({
    to:      toEmail,
    subject: T.subject('KYC approved — you can now trade'),
    html:    T.kycApproved({ toEmail, username }),
    text:    `Your KYC has been approved on ${T.APP_NAME}. You can now trade on P2P.`
  });
}

async function sendKycRejectedEmail(toEmail, username, reason) {
  return sendRawEmail({
    to:      toEmail,
    subject: T.subject('KYC update — action required'),
    html:    T.kycRejected({ toEmail, username, reason }),
    text:    `Your KYC submission was not approved. Reason: ${reason || 'See email for details.'}. Please resubmit.`
  });
}

module.exports.sendKycApprovedEmail = sendKycApprovedEmail;
module.exports.sendKycRejectedEmail = sendKycRejectedEmail;
