import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  X, CheckCircle2, ArrowRight, Truck, Store, User, Mail, Phone
} from 'lucide-react';
import { DEVICE_CATEGORIES, REPAIR_ISSUES } from '../data/repairData';
import { buildBookingWhatsAppMessage, getWhatsAppUrl } from '../data/contactConfig';
import logoImg from '../assets/logo.png';

const POPULAR_ISSUES = REPAIR_ISSUES.filter((i) => i.popular);
const OTHER_ISSUE = { id: 'other', title: 'Other', timeEst: 'Varies' };

export default function BookingModal({ isOpen, onClose, initialSelection }) {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('smartphone');
  const [modelInput, setModelInput] = useState('');
  const [issueId, setIssueId] = useState('screen');
  const [customIssueText, setCustomIssueText] = useState('');
  const [serviceMode, setServiceMode] = useState('walkin');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  useEffect(() => {
    if (initialSelection) {
      if (initialSelection.category) setCategory(initialSelection.category);
      if (initialSelection.model) setModelInput(initialSelection.model);
      if (initialSelection.issue?.id) {
        const isPopular = POPULAR_ISSUES.some((i) => i.id === initialSelection.issue.id);
        if (isPopular) {
          setIssueId(initialSelection.issue.id);
        } else {
          setIssueId('other');
          setCustomIssueText(initialSelection.issue.title || '');
        }
      }
    }
  }, [initialSelection]);

  if (!isOpen) return null;

  const categoryName = DEVICE_CATEGORIES.find((c) => c.id === category)?.name || category;
  const currentIssue = REPAIR_ISSUES.find((i) => i.id === issueId);
  const issueLabel = issueId === 'other'
    ? customIssueText.trim()
    : (currentIssue?.title || '');

  const confirmStep = serviceMode === 'delivery' ? 4 : 3;
  const isConfirmStep = step === confirmStep;

  const serviceLabel = serviceMode === 'delivery'
    ? 'Doorstep Pickup & Delivery'
    : 'Walk-in Repair';

  const validateStep1 = () => {
    if (!modelInput.trim()) return false;
    if (issueId === 'other' && customIssueText.trim().length < 10) return false;
    return true;
  };

  const handleNextFromStep1 = () => {
    if (validateStep1()) setStep(2);
  };

  const handleNextFromStep2 = () => {
    setStep(3);
  };

  const handleNextFromAddress = () => {
    if (deliveryAddress.trim().length >= 15) setStep(4);
  };

  const handleBackFromConfirm = () => {
    if (serviceMode === 'delivery') setStep(3);
    else setStep(2);
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();

    const message = buildBookingWhatsAppMessage({
      categoryName,
      modelInput: modelInput.trim(),
      issueLabel,
      serviceMode,
      deliveryAddress: deliveryAddress.trim(),
      customerName,
      customerPhone,
      customerEmail,
      notes,
    });

    window.open(getWhatsAppUrl(message), '_blank');

    const newId = `FIX-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(newId);
    setIsSubmitted(true);

    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const resetForm = () => {
    setStep(1);
    setIsSubmitted(false);
    onClose();
  };

  const progressSteps = serviceMode === 'delivery'
    ? ['1. Device & Issue', '2. Service Mode', '3. Pickup Address', '4. Confirm']
    : ['1. Device & Issue', '2. Service Mode', '3. Confirm'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-gray-900 rounded-3xl max-w-2xl w-full shadow-2xl border border-gray-800 overflow-hidden relative animate-in fade-in zoom-in duration-200 my-8">

        <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="Olive ifixit logo" className="w-8 h-8 rounded-lg object-contain shrink-0" />
            <div>
              <h3 className="text-base font-bold">Book Repair Appointment</h3>
              <p className="text-[11px] text-gray-400">Quick booking via WhatsApp & 3-Month Warranty</p>
            </div>
          </div>

          <button
            onClick={resetForm}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isSubmitted && (
          <div className="bg-gray-800 px-6 py-3 border-b border-gray-700 flex items-center justify-between text-xs font-bold text-gray-400">
            {progressSteps.map((label, idx) => (
              <React.Fragment key={label}>
                {idx > 0 && <span>&rarr;</span>}
                <span className={step >= idx + 1 ? 'text-brand-gold' : ''}>{label}</span>
              </React.Fragment>
            ))}
          </div>
        )}

        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-900 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div className="space-y-2">
                <h4 className="text-2xl font-extrabold text-white">Repair Ticket Booked!</h4>
                <p className="text-sm text-gray-400 max-w-md mx-auto">
                  Your booking details have been sent via WhatsApp. We&apos;ll confirm shortly.
                </p>
              </div>

              <div className="bg-black border border-gray-800 rounded-2xl p-5 max-w-md mx-auto text-left space-y-3">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                  <span className="text-xs font-semibold text-gray-500">Ticket Reference ID</span>
                  <span className="text-base font-mono font-extrabold text-brand-gold">{ticketId}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500 block">Device</span>
                    <strong className="text-white">{categoryName} — {modelInput}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Issue</span>
                    <strong className="text-brand-gold">{issueLabel}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Service</span>
                    <strong className="text-white">{serviceLabel}</strong>
                  </div>
                  {serviceMode === 'delivery' && (
                    <div className="col-span-2">
                      <span className="text-gray-500 block">Address</span>
                      <strong className="text-white">{deliveryAddress}</strong>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={resetForm}
                  className="w-full sm:w-auto gold-gradient-btn px-8 py-3 rounded-xl font-bold text-sm"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitBooking}>

              {step === 1 && (
                <div className="space-y-5">
                  <h4 className="text-lg font-bold text-white">Step 1: What device needs repair?</h4>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1.5">Category</label>
                    <div className="grid grid-cols-3 gap-2">
                      {DEVICE_CATEGORIES.slice(0, 3).map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setCategory(cat.id)}
                          className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                            category === cat.id ? 'bg-brand-gold text-black border-brand-gold' : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-700'
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1.5">Device Model</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. iPhone 14 Pro, Galaxy S23, MacBook Air M2"
                      value={modelInput}
                      onChange={(e) => setModelInput(e.target.value)}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-xs font-bold text-gray-200 focus:ring-2 focus:ring-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1.5">Select Issue</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {POPULAR_ISSUES.map((iss) => (
                        <button
                          key={iss.id}
                          type="button"
                          onClick={() => setIssueId(iss.id)}
                          className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                            issueId === iss.id ? 'bg-brand-gold/15 border-brand-gold text-white font-bold' : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-700'
                          }`}
                        >
                          <span>{iss.title}</span>
                          <span className="text-gray-500 font-medium text-[11px]">{iss.timeEst}</span>
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setIssueId('other')}
                        className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                          issueId === 'other' ? 'bg-brand-gold/15 border-brand-gold text-white font-bold' : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-700'
                        }`}
                      >
                        <span>{OTHER_ISSUE.title}</span>
                        <span className="text-gray-500 font-medium text-[11px]">{OTHER_ISSUE.timeEst}</span>
                      </button>
                    </div>
                  </div>

                  {issueId === 'other' && (
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1.5">Describe your device problem</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="e.g. Speaker crackles during calls, device overheats while charging, fingerprint sensor stopped working..."
                        value={customIssueText}
                        onChange={(e) => setCustomIssueText(e.target.value)}
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-xs text-white focus:ring-2 focus:ring-brand-gold"
                      />
                      <p className="text-[11px] text-gray-500 mt-1.5">
                        Tell us what&apos;s wrong so our technician can prepare the right parts and tools.
                      </p>
                    </div>
                  )}

                  <div className="pt-4 flex items-center gap-4">
                    <div className="w-3/4 bg-black border border-gray-800 rounded-xl p-3 text-xs text-gray-400 font-medium">
                      <p>Our repairs use carefully tested, original and compatible parts. When genuine original parts are available through our suppliers, we&apos;ll notify you before the repair.</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleNextFromStep1}
                      disabled={!validateStep1()}
                      className="gold-gradient-btn px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next: Service Mode <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <h4 className="text-lg font-bold text-white">Step 2: Choose how you want service</h4>

                  <div className="space-y-3">
                    <div
                      onClick={() => setServiceMode('walkin')}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-4 ${
                        serviceMode === 'walkin' ? 'border-brand-gold bg-brand-gold/5' : 'border-gray-700 hover:bg-gray-800'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-brand-gold text-black flex items-center justify-center shrink-0">
                        <Store className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-white">Walk-in Repair</h5>
                        <p className="text-xs text-gray-400 mt-0.5">Visit our store and drop off your device.</p>
                      </div>
                    </div>

                    <div
                      onClick={() => setServiceMode('delivery')}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-4 ${
                        serviceMode === 'delivery' ? 'border-brand-gold bg-brand-gold/5' : 'border-gray-700 hover:bg-gray-800'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-brand-gold text-black flex items-center justify-center shrink-0">
                        <Truck className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-white">Doorstep Pickup & Delivery</h5>
                        <p className="text-xs text-gray-400 mt-0.5">We pick up and return your device to your address.</p>
                        <p className="text-xs text-brand-gold mt-1 font-semibold">Free within 5 km of store vicinity.</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 py-2.5 rounded-xl font-bold text-xs bg-gray-800 text-gray-300"
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      onClick={handleNextFromStep2}
                      className="gold-gradient-btn px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2"
                    >
                      {serviceMode === 'delivery' ? 'Next: Pickup Address' : 'Next: Confirm'} <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && serviceMode === 'delivery' && (
                <div className="space-y-5">
                  <h4 className="text-lg font-bold text-white">Step 3: Pickup Address</h4>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1.5">Pickup & Delivery Address</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="House/flat no., street, landmark, area, pin code"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-xs text-white focus:ring-2 focus:ring-brand-gold"
                    />
                    <p className="text-[11px] text-gray-500 mt-1.5">
                      We&apos;ll pick up and return your device to this address (free within 5 km).
                    </p>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 rounded-xl font-bold text-xs bg-gray-800 text-gray-300"
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      onClick={handleNextFromAddress}
                      disabled={deliveryAddress.trim().length < 15}
                      className="gold-gradient-btn px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next: Confirm <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {isConfirmStep && (
                <div className="space-y-5">
                  <h4 className="text-lg font-bold text-white">
                    Step {confirmStep}: Contact Information
                  </h4>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1">Full Name</label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Alex Johnson"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-xs font-semibold text-white focus:ring-2 focus:ring-brand-gold"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 mb-1">Email Address</label>
                        <div className="relative">
                          <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                          <input
                            type="email"
                            required
                            placeholder="alex@example.com"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-xs font-semibold text-white focus:ring-2 focus:ring-brand-gold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-400 mb-1">Phone Number</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                          <input
                            type="tel"
                            required
                            placeholder="(555) 019-2834"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-xs font-semibold text-white focus:ring-2 focus:ring-brand-gold"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1">Notes / Additional Symptoms (Optional)</label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Back glass also slightly scratched..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-xl text-xs text-white focus:ring-2 focus:ring-brand-gold"
                      />
                    </div>
                  </div>

                  <div className="bg-black border border-gray-800 rounded-xl p-4 text-xs space-y-1.5">
                    <div className="flex justify-between text-gray-400">
                      <span>Device: <strong className="text-white">{categoryName} — {modelInput}</strong></span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Issue: <strong className="text-brand-gold">{issueLabel}</strong></span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Service: <strong className="text-white">{serviceLabel}</strong></span>
                    </div>
                    {serviceMode === 'delivery' && (
                      <div className="text-gray-400">
                        <span>Address: <strong className="text-white">{deliveryAddress}</strong></span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 flex justify-between">
                    <button
                      type="button"
                      onClick={handleBackFromConfirm}
                      className="px-5 py-2.5 rounded-xl font-bold text-xs bg-gray-800 text-gray-300"
                    >
                      Back
                    </button>

                    <button
                      type="submit"
                      className="gold-gradient-btn px-8 py-3 rounded-xl font-bold text-sm shadow-lg flex items-center gap-2"
                    >
                      Confirm Repair Booking
                    </button>
                  </div>
                </div>
              )}

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
