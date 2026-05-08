const crypto = require('crypto');

const ACCESS_TOKEN_TTL_SECONDS = 24 * 60 * 60;
const REFRESH_TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60;

// In-memory cache — loaded once from MongoDB on first call
let _cachedJwtSecret = null;

function getJwtSecret() {
  return String(process.env.JWT_SECRET || '').trim();
}

// Call this at server startup with the db collections object.
// Loads (or generates) a persistent JWT secret from MongoDB so the
// same secret survives every Render deploy regardless of env vars.
async function initJwtSecret(collections) {
  try {
    const doc = await collections.appConfig.findOne({ key: 'jwtSecret' });
    if (doc && doc.value) {
      _cachedJwtSecret = String(doc.value);
      return;
    }
    // First ever boot — generate and persist
    const generated = crypto.randomBytes(48).toString('hex');
    await collections.appConfig.updateOne(
      { key: 'jwtSecret' },
      { $set: { key: 'jwtSecret', value: generated, createdAt: new Date() } },
      { upsert: true }
    );
    _cachedJwtSecret = generated;
  } catch (_) {
    // DB not ready yet — fall back to env var (will retry on next token op)
  }
}

function ensureJwtSecret() {
  // Priority: env var → cached DB secret → throw
  const envSecret = getJwtSecret();
  if (envSecret) return envSecret;
  if (_cachedJwtSecret) return _cachedJwtSecret;
  throw new Error('JWT_SECRET not configured. Call initJwtSecret() on startup.');
}

function normalizeRole(role) {
  return String(role || 'USER').trim().toUpperCase() === 'ADMIN' ? 'ADMIN' : 'USER';
}

function base64UrlEncode(value) {
  return Buffer.from(value, 'utf8')
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64UrlDecode(value) {
  const normalized = String(value || '')
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  const paddingLength = (4 - (normalized.length % 4)) % 4;
  const padded = normalized + '='.repeat(paddingLength);
  return Buffer.from(padded, 'base64').toString('utf8');
}

function signHmacSha256(input, secret) {
  return crypto
    .createHmac('sha256', secret)
    .update(input)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(String(left || ''), 'utf8');
  const rightBuffer = Buffer.from(String(right || ''), 'utf8');
  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }
  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function buildClaims(user) {
  const userId = String(user?.id || user?.userId || '').trim();
  if (!userId) {
    throw new Error('User id is required for token generation');
  }

  const claims = {
    sub: userId,
    role: normalizeRole(user?.role),
    username: String(user?.username || '').trim(),
    email: String(user?.email || '')
      .trim()
      .toLowerCase()
  };

  const adminRole = String(user?.adminRole || '').trim().toUpperCase();
  if (adminRole) {
    claims.adminRole = adminRole;
  }

  const scope = String(user?.scope || '').trim().toLowerCase();
  if (scope) {
    claims.scope = scope;
  }

  const sessionId = String(user?.sessionId || '').trim();
  if (sessionId) {
    claims.sessionId = sessionId;
  }

  return claims;
}

function createJwt(payload, expiresInSeconds) {
  const secret = ensureJwtSecret();
  const nowSeconds = Math.floor(Date.now() / 1000);

  const headerSegment = base64UrlEncode(
    JSON.stringify({
      alg: 'HS256',
      typ: 'JWT'
    })
  );

  const payloadSegment = base64UrlEncode(
    JSON.stringify({
      ...payload,
      iat: nowSeconds,
      exp: nowSeconds + Number(expiresInSeconds || 0)
    })
  );

  const signingInput = `${headerSegment}.${payloadSegment}`;
  const signature = signHmacSha256(signingInput, secret);
  return `${signingInput}.${signature}`;
}

function verifyJwt(token) {
  const secret = ensureJwtSecret();
  const rawToken = String(token || '').trim();
  const [headerSegment, payloadSegment, signatureSegment] = rawToken.split('.');
  if (!headerSegment || !payloadSegment || !signatureSegment) {
    throw new Error('Invalid token');
  }

  const signingInput = `${headerSegment}.${payloadSegment}`;
  const expectedSignature = signHmacSha256(signingInput, secret);
  if (!safeEqual(signatureSegment, expectedSignature)) {
    throw new Error('Invalid token signature');
  }

  let payload = null;
  try {
    payload = JSON.parse(base64UrlDecode(payloadSegment));
  } catch (error) {
    throw new Error('Invalid token payload');
  }

  const nowSeconds = Math.floor(Date.now() / 1000);
  if (!Number.isFinite(payload.exp) || payload.exp <= nowSeconds) {
    throw new Error('Token expired');
  }

  return payload;
}

function signAccessToken(user) {
  const claims = buildClaims(user);
  return createJwt(
    {
      ...claims,
      typ: 'access'
    },
    ACCESS_TOKEN_TTL_SECONDS
  );
}

function signRefreshToken(user) {
  const claims = buildClaims(user);
  return createJwt(
    {
      ...claims,
      typ: 'refresh',
      jti: crypto.randomUUID()
    },
    REFRESH_TOKEN_TTL_SECONDS
  );
}

function createTokenPair(user) {
  const issuedAt = Date.now();
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  return {
    accessToken,
    refreshToken,
    accessTokenExpiresAt: issuedAt + ACCESS_TOKEN_TTL_SECONDS * 1000,
    refreshTokenExpiresAt: issuedAt + REFRESH_TOKEN_TTL_SECONDS * 1000
  };
}

function verifyAccessToken(token) {
  return verifyJwt(token);
}

function verifyRefreshToken(token) {
  const decoded = verifyJwt(token);
  if (String(decoded?.typ || '').trim().toLowerCase() !== 'refresh') {
    throw new Error('Invalid refresh token type');
  }
  return decoded;
}

function hashRefreshToken(refreshToken) {
  return crypto.createHash('sha256').update(String(refreshToken || ''), 'utf8').digest('hex');
}

module.exports = {
  ACCESS_TOKEN_TTL_SECONDS,
  REFRESH_TOKEN_TTL_SECONDS,
  initJwtSecret,
  ensureJwtSecret,
  normalizeRole,
  createTokenPair,
  verifyAccessToken,
  verifyRefreshToken,
  hashRefreshToken
};
