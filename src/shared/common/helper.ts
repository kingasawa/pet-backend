import * as CryptoJS from 'crypto-js';
import { CIPHER_KEY, CIPHER_IV, CIPHER_MODE } from '@shared/common/constants'

export const encrypt = (data: string): string => {
  return CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(CIPHER_KEY), {
    iv: CryptoJS.enc.Utf8.parse(CIPHER_IV),
  }).toString();
}

export const decrypt = (data: string): string => {
  return CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(CIPHER_KEY), {
    iv: CryptoJS.enc.Utf8.parse(CIPHER_IV),
  }).toString(CryptoJS.enc.Utf8);
}