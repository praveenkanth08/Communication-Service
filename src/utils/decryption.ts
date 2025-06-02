import { encryptionConfig } from "@/config/encryptionConfig";
import { EncryptionHelper } from "@Mahe-5563/commons";

export async function checkHMACDecryption(
  payload: any,
  signature: string,
  ts: number,
  nonce: string
): Promise<any> {
  const encryptionHelper = new EncryptionHelper(encryptionConfig);
  const encryptedData = await encryptionHelper.hmacDecryption(
    payload,
    signature,
    ts,
    nonce
  );

  return encryptedData;
}
