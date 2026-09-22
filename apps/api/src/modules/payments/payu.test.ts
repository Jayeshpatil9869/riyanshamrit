import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildPayUPaymentHash,
  verifyPayUWebhookHash,
  type PayUConfig,
} from "@riyanshamrit/payments";

describe("PayU hash", () => {
  const cfg: PayUConfig = {
    merchantKey: "key",
    merchantSalt: "salt",
    baseUrl: "https://test.payu.in",
  };

  it("builds deterministic payment hash", () => {
    const a = buildPayUPaymentHash(cfg, {
      txnid: "txn1",
      amount: "100.00",
      productinfo: "test",
      firstname: "A",
      email: "a@b.com",
      surl: "https://x/s",
      furl: "https://x/f",
    });
    const b = buildPayUPaymentHash(cfg, {
      txnid: "txn1",
      amount: "100.00",
      productinfo: "test",
      firstname: "A",
      email: "a@b.com",
      surl: "https://x/s",
      furl: "https://x/f",
    });
    assert.equal(a, b);
    assert.equal(a.length, 128);
  });

  it("rejects bad webhook hash", () => {
    assert.equal(
      verifyPayUWebhookHash(cfg, {
        status: "success",
        email: "a@b.com",
        firstname: "A",
        productinfo: "test",
        amount: "100.00",
        txnid: "txn1",
        hash: "nope",
      }),
      false,
    );
  });
});
