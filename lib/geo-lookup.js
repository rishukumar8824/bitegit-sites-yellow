const http = require('http'); // ip-api.com free tier = HTTP only (HTTPS = paid)

// Simple in-memory cache: IP -> { data, ts }
const _cache = new Map();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Lookup country, city, region for an IP address using ip-api.com (free, no key needed).
 * Returns { country, city, region, timezone, lat, lon } — all empty/zero on failure.
 */
function getIpLocation(ip) {
  return new Promise((resolve) => {
    const empty = { country: '', city: '', region: '', timezone: '', lat: 0, lon: 0 };

    if (!ip || /^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|::1|localhost)/i.test(ip)) {
      return resolve(empty);
    }

    // Serve from cache if fresh
    const cached = _cache.get(ip);
    if (cached && (Date.now() - cached.ts) < CACHE_TTL) {
      return resolve(cached.data);
    }

    const url = `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,country,regionName,city,lat,lon,timezone`;

    const req = http.get(url, { timeout: 4000 }, (res) => {
      let raw = '';
      res.on('data', (c) => { raw += c; });
      res.on('end', () => {
        try {
          const d = JSON.parse(raw);
          if (d.status === 'success') {
            const result = {
              country:  d.country    || '',
              region:   d.regionName || '',
              city:     d.city       || '',
              timezone: d.timezone   || '',
              lat:      d.lat        || 0,
              lon:      d.lon        || 0,
            };
            _cache.set(ip, { data: result, ts: Date.now() });
            resolve(result);
          } else {
            resolve(empty);
          }
        } catch {
          resolve(empty);
        }
      });
    });

    req.on('error', () => resolve(empty));
    req.on('timeout', () => { req.destroy(); resolve(empty); });
  });
}

module.exports = { getIpLocation };
