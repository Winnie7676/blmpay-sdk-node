# BLMPay Node.js SDK

Official Node.js SDK for BLMPay API v1. Node.js 18+.

## Install from GitHub

Until the npm registry release is published, install directly from the official repository:

```bash
npm install github:Winnie7676/blmpay-sdk-node
```

The package name is `@blmsoft/blmpay`, so use it normally after installation:

```js
import BlmPay from '@blmsoft/blmpay';

const blmpay = new BlmPay({
  apiKey: process.env.BLMPAY_API_KEY
});

const balance = await blmpay.getBalance();
```

The SDK covers payments, balance, payment links, invoices, payouts, payout fee quotes, supported banks, recipient name lookup, webhooks and USDT.

Never expose a live merchant secret key in browser JavaScript or a public frontend build.

OpenAPI: https://github.com/Winnie7676/blmpay-openapi

MIT License. Powered by BLMSoft.
