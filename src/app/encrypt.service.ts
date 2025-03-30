import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  private key: CryptoJS.lib.WordArray = CryptoJS.enc.Utf8.parse('252e80b4e5d9cfc8b369ad98dcc87b5f');

  encrypt(data: string): string {
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(data, this.key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });
    return iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);
  }

  decrypt(encryptedData: string): string {
    const parts = atob(encryptedData).split('::');
   // console.log(parts);  
    const encrypted = parts[0];
    const iv = CryptoJS.enc.Base64.parse(parts[1]);
  
    const decrypted = CryptoJS.AES.decrypt(encrypted, CryptoJS.enc.Utf8.parse('252e80b4e5d9cfc8b369ad98dcc87b5f'), {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

}
