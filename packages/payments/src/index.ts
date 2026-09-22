import { createHash } from "node:crypto";

export type PayUConfig = {
  merchantKey: string;
  merchantSalt: string;
  baseUrl: string;
};

export type PayUInitiateInput = {
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  phone?: string;
  surl: string;
  furl: string;
  udf1?: string;
};

export function payuHash(parts: string[]): string {
  return createHash("sha512").update(parts.join("|")).digest("hex");
}

/** Request hash: key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT */
export function buildPayUPaymentHash(
  cfg: PayUConfig,
  input: PayUInitiateInput,
): string {
  return payuHash([
    cfg.merchantKey,
    input.txnid,
    input.amount,
    input.productinfo,
    input.firstname,
    input.email,
    input.udf1 ?? "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    cfg.merchantSalt,
  ]);
}

/** Reverse hash for webhook: SALT|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key */
export function verifyPayUWebhookHash(
  cfg: PayUConfig,
  payload: Record<string, string>,
): boolean {
  const status = payload.status ?? "";
  const expected = payuHash([
    cfg.merchantSalt,
    status,
    "",
    "",
    "",
    "",
    "",
    payload.udf5 ?? "",
    payload.udf4 ?? "",
    payload.udf3 ?? "",
    payload.udf2 ?? "",
    payload.udf1 ?? "",
    payload.email ?? "",
    payload.firstname ?? "",
    payload.productinfo ?? "",
    payload.amount ?? "",
    payload.txnid ?? "",
    cfg.merchantKey,
  ]);
  return expected === (payload.hash ?? "");
}

export function buildPayUFormFields(
  cfg: PayUConfig,
  input: PayUInitiateInput,
): Record<string, string> {
  const hash = buildPayUPaymentHash(cfg, input);
  return {
    key: cfg.merchantKey,
    txnid: input.txnid,
    amount: input.amount,
    productinfo: input.productinfo,
    firstname: input.firstname,
    email: input.email,
    phone: input.phone ?? "",
    surl: input.surl,
    furl: input.furl,
    udf1: input.udf1 ?? "",
    hash,
    service_provider: "payu_paisa",
  };
}

export class PayUProvider {
  constructor(private readonly cfg: PayUConfig) {}

  initiate(input: PayUInitiateInput) {
    return {
      action: `${this.cfg.baseUrl.replace(/\/$/, "")}/_payment`,
      fields: buildPayUFormFields(this.cfg, input),
    };
  }

  verifyWebhook(payload: Record<string, string>) {
    return verifyPayUWebhookHash(this.cfg, payload);
  }
}

export interface PaymentProvider {
  initiate(input: PayUInitiateInput): { action: string; fields: Record<string, string> };
  verifyWebhook(payload: Record<string, string>): boolean;
}

export class PaymentService {
  constructor(private readonly provider: PaymentProvider) {}

  initiate(input: PayUInitiateInput) {
    return this.provider.initiate(input);
  }

  verifyWebhook(payload: Record<string, string>) {
    return this.provider.verifyWebhook(payload);
  }
}
