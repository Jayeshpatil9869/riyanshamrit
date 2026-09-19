import React, { useState } from 'react';
import { useCommerce } from '../context/CommerceContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addToast } = useCommerce();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Ayurvedic Doctor Consultation',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast('Please fill out all required fields', 'error');
      return;
    }
    setIsSubmitted(true);
    addToast('Your consultation request has been submitted to our Vaidyas.', 'success');
  };

  return (
    <div className="w-full pt-24 sm:pt-28 lg:pt-32 pb-24">
      <div className="kanva-container">
        {/* Editorial Header */}
        <div className="py-12 sm:py-16 border-b border-[rgba(26,28,24,0.08)] max-w-3xl">
          <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-[#757d5c] font-semibold block mb-3">
            DIRECT VAIDYA & PATRON COMMUNION
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#1a1c18] font-normal leading-[1.08] tracking-[-0.03em]">
            Connect With Our Sangamner Dispensary.
          </h1>
          <p className="text-base sm:text-lg text-[#1a1c18]/70 font-body leading-relaxed mt-4">
            Whether you seek individualized dosage guidance from our registered Ayurvedic doctors, wish to enquire about distributor opportunities, or need assistance with an existing order, our dedicated team is at your service.
          </p>
        </div>

        {/* 2-Column Contact Grid */}
        <div className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[rgba(26,28,24,0.08)] shadow-xs">
            {isSubmitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#757d5c]/20 text-[#3c4433] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-[#1a1c18]">Message Received</h3>
                <p className="text-xs sm:text-sm text-[#1a1c18]/65 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#1a1c18]">{formData.name}</strong>. An Ayurvedic specialist or customer care representative from Sangamner will reach out within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: 'Ayurvedic Doctor Consultation', message: '' });
                  }}
                  className="mt-4 px-6 py-2.5 bg-[#1a1c18] text-white rounded-full text-xs font-medium hover:bg-[#3c4433] transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1.5 font-medium">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="E.g., Rajesh Patil"
                      className="w-full px-4 py-3 bg-[#f2f2ef] border border-[rgba(26,28,24,0.12)] rounded-xl text-xs sm:text-sm text-[#1a1c18] focus:outline-none focus:border-[#3c4433]"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1.5 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="rajesh@example.com"
                      className="w-full px-4 py-3 bg-[#f2f2ef] border border-[rgba(26,28,24,0.12)] rounded-xl text-xs sm:text-sm text-[#1a1c18] focus:outline-none focus:border-[#3c4433]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1.5 font-medium">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98224 00000"
                      className="w-full px-4 py-3 bg-[#f2f2ef] border border-[rgba(26,28,24,0.12)] rounded-xl text-xs sm:text-sm text-[#1a1c18] focus:outline-none focus:border-[#3c4433]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1.5 font-medium">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-[#f2f2ef] border border-[rgba(26,28,24,0.12)] rounded-xl text-xs sm:text-sm text-[#1a1c18] focus:outline-none focus:border-[#3c4433]"
                    >
                      <option value="Ayurvedic Doctor Consultation">Ayurvedic Doctor Consultation (Complimentary)</option>
                      <option value="Order Tracking & Delivery Support">Order Tracking & Delivery Support</option>
                      <option value="Product Formulation Guidance">Product Formulation Guidance</option>
                      <option value="Har Ghar Rozgar Franchise / Bulk">Har Ghar Rozgar Franchise / Bulk</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1.5 font-medium">
                    Detailed Message or Health Concern *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide context regarding your symptoms, current medications, or order reference ID..."
                    className="w-full px-4 py-3 bg-[#f2f2ef] border border-[rgba(26,28,24,0.12)] rounded-xl text-xs sm:text-sm text-[#1a1c18] focus:outline-none focus:border-[#3c4433]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#1a1c18] hover:bg-[#3c4433] text-white rounded-full text-xs font-medium tracking-wide transition-colors flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry to Sangamner</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Contact Details & Dispensary Hours (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 bg-[#e8e8e1] rounded-3xl border border-[rgba(26,28,24,0.08)] space-y-6">
              <h3 className="font-serif text-2xl text-[#1a1c18]">Direct Contact Channels</h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#1a1c18]/80">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#757d5c] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1a1c18] font-medium">Registered Office & Processing Plant</strong>
                    <span>Riyansh Multitrade Private Limited</span><br />
                    <span>Near Old Sangamner Stand, Ahmednagar Highway</span><br />
                    <span className="text-[#1a1c18]/60">Sangamner, Maharashtra 422605, India</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#757d5c] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1a1c18] font-medium">Patron Helpline & WhatsApp</strong>
                    <a href="tel:+919822488300" className="hover:text-[#3c4433] font-mono">
                      +91 98224 88300
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-[#757d5c] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1a1c18] font-medium">Electronic Mail</strong>
                    <a href="mailto:support@riyanshamrit.com" className="hover:text-[#3c4433] font-mono">
                      support@riyanshamrit.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#757d5c] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1a1c18] font-medium">Dispensary & Doctor Timings</strong>
                    <span>Monday – Saturday: 9:30 AM – 6:30 PM IST</span><br />
                    <span className="text-[#1a1c18]/60">Sunday: Closed for Herbal Prep</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[rgba(26,28,24,0.08)] flex items-center gap-2 text-xs text-[#3c4433]">
                <ShieldCheck className="w-4 h-4 text-[#757d5c]" />
                <span>Encrypted Patient Privacy • ISO 9001:2015 Standard</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
