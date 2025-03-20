import { AES, enc } from "crypto-js";

export function encrypt(
  userInfo: User & {
    uniqueId: string;
    token: string;
    myCouponCount: number;
  }
) {
  return AES.encrypt(JSON.stringify(userInfo), userInfo.uniqueId).toString();
}

export function decrypt(encryptedData: string, key: string) {
  return JSON.parse(AES.decrypt(encryptedData, key).toString(enc.Utf8));
}
