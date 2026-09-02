import BlmPay from '../src/index.js';

const blmpay = new BlmPay({
  apiKey: process.env.BLMPAY_API_KEY,
  integrationOrigin: process.env.BLMPAY_INTEGRATION_ORIGIN || null,
});

console.log(await blmpay.getBalance());
