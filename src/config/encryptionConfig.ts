// src/configs/encryption.config.ts
import { EncryptionConfig } from "@Mahe-5563/commons";


export const encryptionConfig: EncryptionConfig = {
  secret: process.env.ENCRYPT_TOKEN || "",
};
