import BlmPay from '../src/index.js';
const blmpay = new BlmPay({apiKey: process.env.BLMPAY_API_KEY});
console.log(await blmpay.getBalance());
