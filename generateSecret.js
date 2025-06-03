const crypto = require("crypto");

/**
 * Generate a cryptographically secure 32-byte secret key
 * @returns {string} Base64 encoded 32-byte secret key
 */
function generateSecretKey() {
  return crypto.randomBytes(64).toString("base64");
}

// Usage
const secretKey = generateSecretKey();
console.log("Secret Key:", secretKey);
