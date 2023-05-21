import { createHmac, BinaryToTextEncoding } from 'node:crypto';

/**
 * Create Keyed-Hashing representation for text
 * HMAC stands for Keyed-Hashing for Message Authentication.
 * @param text
 * @param secret
 * @param encoding
 * @param algorithm
 * @param addAlgorithmPrefix
 * @returns
 */
export const hmac = (
  text: string,
  secret: string,
  encoding: BinaryToTextEncoding = 'hex',
  algorithm = 'sha256',
  addAlgorithmPrefix = true,
) => {
  if (!text) return text;
  const hash = createHmac(algorithm, secret).update(text).digest(encoding);

  return addAlgorithmPrefix ? `${algorithm}=${hash}` : hash;
};
