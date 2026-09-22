import { Inngest } from "inngest";

/** Background jobs for Vercel (email, order, payment, SEO). */
export const inngest = new Inngest({ id: "riyanshamrit" });

export const sendOrderEmail = inngest.createFunction(
  { id: "send-order-email" },
  { event: "order/paid" },
  async ({ event, step }) => {
    await step.run("notify", async () => {
      // Wire email provider (Resend/SendGrid) using event.data
      return { orderId: event.data.orderId, queued: true };
    });
  },
);

export const rebuildSeoCache = inngest.createFunction(
  { id: "rebuild-seo-cache" },
  { event: "seo/invalidate" },
  async ({ event, step }) => {
    await step.run("invalidate", async () => ({
      entity: event.data.entityId,
    }));
  },
);
