export class BlmPayError extends Error {
  constructor(message, {status = 0, errorCode = null, response = null} = {}) {
    super(message); this.name = 'BlmPayError'; this.status = status; this.errorCode = errorCode; this.response = response;
  }
}

export class BlmPay {
  constructor({ apiKey, baseUrl = 'https://pay.blmtec.co.tz/api/v1', timeoutMs = 30000 } = {}) {
    if (!apiKey) throw new TypeError('BLMPay apiKey is required');
    this.apiKey = apiKey; this.baseUrl = baseUrl.replace(/\/$/, ''); this.timeoutMs = timeoutMs;
  }
  listPayments = q => this.request('GET', '/payments', {query:q});
  getPayment = ref => this.request('GET', `/payments/${encodeURIComponent(ref)}`);
  createPayment = (body, idempotencyKey) => this.request('POST', '/payments', {body, idempotencyKey});
  getBalance = () => this.request('GET', '/balance');
  listPaymentLinks = () => this.request('GET', '/payment-links');
  createPaymentLink = body => this.request('POST', '/payment-links', {body});
  listInvoices = () => this.request('GET', '/invoices');
  createInvoice = body => this.request('POST', '/invoices', {body});
  listPayouts = q => this.request('GET', '/payouts', {query:q});
  getPayout = ref => this.request('GET', `/payouts/${encodeURIComponent(ref)}`);
  getPayoutFee = (amount, channel='mobile') => this.request('GET', '/payouts/fee', {query:{amount,channel}});
  listPayoutBanks = () => this.request('GET', '/payouts/banks');
  lookupPayoutName = body => this.request('POST', '/payouts/name-lookup', {body});
  createPayout = (body, idempotencyKey) => this.request('POST', '/payouts/send', {body,idempotencyKey});
  listWebhooks = () => this.request('GET', '/webhooks');
  createWebhook = body => this.request('POST', '/webhooks', {body});
  deleteWebhook = id => this.request('DELETE', `/webhooks/${Number(id)}`);
  activateUsdt = () => this.request('POST', '/usdt/activate', {body:{}});
  getUsdtAddress = () => this.request('GET', '/usdt/address');
  listUsdtTransfers = q => this.request('GET', '/usdt/transfers', {query:q});
  quoteUsdtWithdrawal = (address, amount, idempotencyKey) => this.request('POST', '/usdt/withdrawals/quote', {body:{address,amount},idempotencyKey});
  confirmUsdtWithdrawal = quoteReference => this.request('POST', '/usdt/withdrawals', {body:{quote_reference:quoteReference}});

  async request(method, path, {body, query, idempotencyKey} = {}) {
    const url = new URL(this.baseUrl + path);
    for (const [k,v] of Object.entries(query || {})) if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, String(v));
    const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), this.timeoutMs);
    const headers = {Authorization:`Bearer ${this.apiKey}`, Accept:'application/json'};
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    if (idempotencyKey) headers['Idempotency-Key'] = idempotencyKey;
    try {
      const res = await fetch(url, {method, headers, body: body === undefined ? undefined : JSON.stringify(body), signal:controller.signal});
      const text = await res.text(); let data;
      try { data = JSON.parse(text); } catch { throw new BlmPayError('BLMPay returned invalid JSON.', {status:res.status,response:text}); }
      if (!res.ok) throw new BlmPayError(data?.message || 'BLMPay request failed.', {status:res.status,errorCode:data?.error_code,response:data});
      return data;
    } catch (e) {
      if (e instanceof BlmPayError) throw e;
      throw new BlmPayError(e?.name === 'AbortError' ? 'BLMPay request timed out.' : 'BLMPay connection failed.', {response:e});
    } finally { clearTimeout(timer); }
  }
}

export default BlmPay;
