// JWT Simulation Helper - Generates standard 3-part header.payload.signature

export const base64UrlEncode = (str) => {
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

export const base64UrlDecode = (str) => {
  let output = str.replace(/-/g, '+').replace(/_/g, '/');
  switch (output.length % 4) {
    case 0: break;
    case 2: output += '=='; break;
    case 3: output += '='; break;
    default: break;
  }
  return decodeURIComponent(escape(atob(output)));
};

export const createSimulatedJwt = (user, expiresInSeconds = 7200) => {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    sub: user.username || 'user',
    name: user.name || user.username || 'User',
    iat: now,
    exp: now + expiresInSeconds,
    iss: 'assignment7-auth'
  };

  const encHeader = base64UrlEncode(JSON.stringify(header));
  const encPayload = base64UrlEncode(JSON.stringify(payload));
  const encSignature = base64UrlEncode(`sig_${user.username || 'user'}_${now}`);

  return `${encHeader}.${encPayload}.${encSignature}`;
};

export const decodeSimulatedJwt = (token) => {
  try {
    if (!token || typeof token !== 'string') return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const header = JSON.parse(base64UrlDecode(parts[0]));
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    const now = Math.floor(Date.now() / 1000);
    const isExpired = payload.exp ? now > payload.exp : false;

    return {
      raw: token,
      header,
      payload,
      signature: parts[2],
      isExpired,
      isValid: !isExpired
    };
  } catch (err) {
    console.error('Failed to decode simulated JWT', err);
    return null;
  }
};
