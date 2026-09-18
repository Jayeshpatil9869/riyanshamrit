import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Lock, FileText } from 'lucide-react';

export const ShippingPolicyPage: React.FC = () => {
  return (
    <div className="w-full pt-8 pb-24">
      <div className="kanva-container max-w-3xl">
        <div className="py-12 border-b border-[rgba(26,28,24,0.08)]">
          <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-[#757d5c] font-semibold block mb-2">
            DISPATCH TRANSPARENCY
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1a1c18] font-normal">
            Shipping & Delivery Policy
          </h1>
          <p className="text-xs text-[#1a1c18]/50 font-mono mt-2">Last Updated: January 2025</p>
        </div>

        <div className="py-10 space-y-8 text-xs sm:text-sm text-[#1a1c18]/80 font-body leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-xl text-[#1a1c18]">1. Direct Sangamner Dispatch</h2>
            <p>
              All orders are fulfilled directly from our ISO 9001:2015 and GMP-certified central storage laboratory located in Sangamner, Ahmednagar, Maharashtra. We maintain strict batch freshness controls; no stock is warehoused in non-temperature-regulated transit hubs.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl text-[#1a1c18]">2. Delivery Timelines</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Maharashtra & Goa:</strong> 2 to 3 business days.</li>
              <li><strong>Metro Cities (Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata):</strong> 3 to 4 business days.</li>
              <li><strong>Rest of India:</strong> 4 to 6 business days.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl text-[#1a1c18]">3. Complimentary Delivery Tier</h2>
            <p>
              All orders with a subtotal exceeding ₹999 qualify for 100% complimentary Pan-India courier transit. For orders below ₹999, a nominal subsidised charge of ₹80 is applied at checkout.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl text-[#1a1c18]">4. Tamper-Evident Packaging</h2>
            <p>
              Liquid decoctions and herbal oils are bottled in UV-protective amber glass or food-safe recyclable HDPE bottles, double-sealed with holographic security shrink wraps. If your package outer seal arrives compromised, please refuse delivery and notify our helpline immediately.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export const RefundPolicyPage: React.FC = () => {
  return (
    <div className="w-full pt-8 pb-24">
      <div className="kanva-container max-w-3xl">
        <div className="py-12 border-b border-[rgba(26,28,24,0.08)]">
          <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-[#757d5c] font-semibold block mb-2">
            PATRON ASSURANCE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1a1c18] font-normal">
            Cancellation & Refund Policy
          </h1>
          <p className="text-xs text-[#1a1c18]/50 font-mono mt-2">Last Updated: January 2025</p>
        </div>

        <div className="py-10 space-y-8 text-xs sm:text-sm text-[#1a1c18]/80 font-body leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-xl text-[#1a1c18]">1. Order Cancellation Window</h2>
            <p>
              Patrons may cancel any order prior to physical dispatch from our Sangamner warehouse (within approximately 4 hours of placing the order). Once an airway bill (AWB) is assigned to the carrier, cancellation is no longer possible in transit.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl text-[#1a1c18]">2. 7-Day Replacement & Refund Window</h2>
            <p>
              Because Ayurvedic formulations are consumable wellness items, opened or consumed bottles cannot be returned for hygienic reasons. However, we honor full replacements or refunds within 7 calendar days if:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>The outer security seal arrived damaged, broken, or leaking during courier handling.</li>
              <li>An incorrect formulation or volume was dispatched.</li>
              <li>The item has an expired manufacturing date.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl text-[#1a1c18]">3. Refund Processing Time</h2>
            <p>
              Approved refunds are credited back to the original payment source (UPI, Credit Card, or Net Banking) within 5 to 7 business banking days.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="w-full pt-8 pb-24">
      <div className="kanva-container max-w-3xl">
        <div className="py-12 border-b border-[rgba(26,28,24,0.08)]">
          <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-[#757d5c] font-semibold block mb-2">
            PATRON CONFIDENTIALITY
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1a1c18] font-normal">
            Privacy Policy & Data Ethics
          </h1>
          <p className="text-xs text-[#1a1c18]/50 font-mono mt-2">Last Updated: January 2025</p>
        </div>

        <div className="py-10 space-y-8 text-xs sm:text-sm text-[#1a1c18]/80 font-body leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-xl text-[#1a1c18]">1. Zero Commercial Data Brokering</h2>
            <p>
              Riyansh Multitrade Pvt. Ltd. does not sell, rent, or lease patron contact records, consultation inquiries, or order details to third-party advertising syndicates. All information collected is strictly utilized to deliver your Ayurvedic regimens and facilitate Vaidya consultations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl text-[#1a1c18]">2. Health Information Encryption</h2>
            <p>
              Notes regarding pre-existing medical conditions or doshic imbalances shared via our contact or consultation forms are treated with strict confidentiality under Indian medical privacy standards.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl text-[#1a1c18]">3. Payment Data Security</h2>
            <p>
              We do not store credit/debit card credentials on our servers. All monetary settlements are routed via PCI-DSS compliant gateways (PayU / ICICI Bank UPI).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <div className="w-full pt-8 pb-24">
      <div className="kanva-container max-w-3xl">
        <div className="py-12 border-b border-[rgba(26,28,24,0.08)]">
          <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-[#757d5c] font-semibold block mb-2">
            LEGAL REGULATORY NOTICE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1a1c18] font-normal">
            Terms of Service & Disclaimer
          </h1>
          <p className="text-xs text-[#1a1c18]/50 font-mono mt-2">Last Updated: January 2025</p>
        </div>

        <div className="py-10 space-y-8 text-xs sm:text-sm text-[#1a1c18]/80 font-body leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-xl text-[#1a1c18]">1. Ayurvedic Proprietary Formulations</h2>
            <p>
              Products listed on this platform are classical Ayurvedic medicines and food supplements manufactured under license from the Food and Drug Administration (FDA) Maharashtra, adhering to the Ayurvedic Formulary of India (AFI) and Pharmacopoeia standards.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl text-[#1a1c18]">2. Medical Disclaimer</h2>
            <p>
              Content, product write-ups, and recommendations presented on this site are intended solely for educational and traditional health-maintenance purposes. They do not constitute a substitute for acute allopathic medical diagnosis. If you are pregnant, nursing, or undergoing chemotherapy or organ transplantation, consult your physician before initiating any herbal protocol.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl text-[#1a1c18]">3. Jurisdiction & Dispute Resolution</h2>
            <p>
              Any disputes arising from purchases or use of this website shall be subject to the exclusive jurisdiction of the competent courts in Sangamner / Ahmednagar District, Maharashtra, India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
