# BLMPay Node.js SDK

Official Node.js SDK for BLMPay API v1. Node.js 18+.

## Install from GitHub

Until the npm registry release is published, install directly from the official repository:

```bash
npm install github:blmsoft/blmpay-sdk-node
```

The package name is `@blmsoft/blmpay`:

```js
import BlmPay from '@blmsoft/blmpay';

const blmpay = new BlmPay({
  apiKey: process.env.BLMPAY_API_KEY,
  integrationOrigin: process.env.BLMPAY_INTEGRATION_ORIGIN // e.g. https://example.com
});

const balance = await blmpay.getBalance();
```

## Domain-bound API keys

New BLMPay API keys can be restricted to one HTTPS integration domain. When `integrationOrigin` is configured, this SDK automatically sends:

```http
X-BLMPay-Origin: https://example.com
```

Set it to the same HTTPS host saved on the API key in BLMPay. A mismatched host can be rejected with `403 integration_domain_not_allowed`; a restricted key with no identifiable origin can return `403 integration_origin_required`.

Legacy API keys that do not yet have an allowed domain remain backward compatible and do not require this option.

## API coverage

The SDK covers payments, balance, payment links, invoices, payouts, payout fee quotes, supported banks, recipient name lookup, webhooks and USDT.

## Security

Never expose a live merchant API key in browser JavaScript, a public frontend build, APK/IPA or source control. Keep privileged BLMPay credentials on your backend. Use a unique idempotency key for each new payment or payout attempt.

OpenAPI: https://github.com/blmsoft/blmpay-openapi
MCP: https://github.com/blmsoft/blmpay-mcp

MIT License. Powered by BLMSoft.
