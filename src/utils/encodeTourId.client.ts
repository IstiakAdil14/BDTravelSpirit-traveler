// Client-safe base64url encode/decode (uses btoa/atob)
export function encodeTourIdClient(id: string): string {
  try {
    const b64 = btoa(unescape(encodeURIComponent(id)));
    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch {
    return id;
  }
}

export function decodeTourIdClient(enc: string): string {
  try {
    let b64 = enc.replace(/-/g, '+').replace(/_/g, '/');
    const pad = b64.length % 4;
    if (pad) b64 += '='.repeat(4 - pad);
    const str = decodeURIComponent(escape(atob(b64)));
    return str;
  } catch {
    return enc;
  }
}
