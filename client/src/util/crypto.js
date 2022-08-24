import CryptoJS from 'crypto-js';
const crypto = CryptoJS;

export const encrypt = (data, key) => {
    return crypto.AES.encrypt(JSON.stringify(data), key).toString();
};

export const decrypt = (text, key) => {
    try {
        const bytes = crypto.AES.decrypt(text, key);
        return JSON.parse(bytes.toString(crypto.enc.Utf8));
    } catch (err) {
        console.log(err);
        return;
    }
};
