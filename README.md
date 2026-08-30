# BLMPay Node.js SDK

Official BLMPay API v1 SDK foundation, version 0.1.0. Uses native `fetch` on Node 18+ and has no runtime dependencies.

```js
import BlmPay from '@blmsoft/blmpay';
const blmpay = new BlmPay({apiKey: process.env.BLMPAY_API_KEY});
const balance = await blmpay.getBalance();
```

Covers payments, balance, payment links, invoices, payouts, name lookup, webhooks and USDT.

Powered by BLMSoft.
