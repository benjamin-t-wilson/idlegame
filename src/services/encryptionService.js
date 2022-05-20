import CryptoJS from 'react-native-crypto-js';
import {CIPHER} from '@env';

export const encodeString = text => {
  return CryptoJS.AES.encrypt(text, CIPHER).toString();
};

export const decodeString = encrypted => {
  const bytes = CryptoJS.AES.decrypt(encrypted, CIPHER);
  return bytes.toString(CryptoJS.enc.Utf8);
};
