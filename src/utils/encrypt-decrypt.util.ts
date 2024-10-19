import { KeyConstant } from "@/constants/key.constant";
import CryptoES from "crypto-es";
import { AsyncStorageUtil } from "./async-storage.util";

export const EncryptDecryptUtil = {
  getMasterPassHash: (master_pass: string) => {
    const hash = CryptoES.SHA256(master_pass).toString();
    return hash;
  },
  encryptPass: async (pass: string) => {
    const hash = (await AsyncStorageUtil.getData(
      KeyConstant.AUTH_HASH_PASS
    )) as string;

    const encrypted = CryptoES.AES.encrypt(pass, hash);
    return encrypted.toString();
  },
  decryptPass: async (encrypted_str: string) => {
    const hash = (await AsyncStorageUtil.getData(
      KeyConstant.AUTH_HASH_PASS
    )) as string;

    const decrypted = CryptoES.AES.decrypt(encrypted_str, hash);
    return decrypted.toString(CryptoES.enc.Utf8);
  },
  encryptPassWithHas: (pass: string, hash: string) => {
    const encrypted = CryptoES.AES.encrypt(pass, hash);
    return encrypted.toString();
  },
};
