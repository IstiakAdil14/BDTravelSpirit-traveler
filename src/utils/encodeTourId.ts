// Simple base64url encode/decode placeholder.
// Replace with application-level encoding/encryption in production.

export function encodeTourId(id: string): string {
  const b64 = Buffer.from(id, 'utf8').toString('base64');
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeTourId(encoded: string): string {
  // restore padding
  let b64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
  const pad = b64.length % 4;
  if (pad) b64 += '='.repeat(4 - pad);
  return Buffer.from(b64, 'base64').toString('utf8');
}
