import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  X, CheckCircle2, ArrowRight, Truck, Store, User, Mail, Phone
} from 'lucide-react';
import { DEVICE_CATEGORIES, REPAIR_ISSUES } from '../data/repairData';
import { buildBookingWhatsAppMessage, getWhatsAppUrl } from '../data/contactConfig';
import useModalLock from '../hooks/useModalLock';
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

  const resetForm = useCallback(() => {
    setStep(1);
    setIsSubmitted(false);
    onClose();
  }, [onClose]);

  useModalLock(isOpen, resetForm);

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

  const totalSteps = serviceMode === 'delivery' ? 4 : 3;
  const confirmStep = serviceMode === 'delivery' ? 4 : 3;
  const isConfirmStep = step === confirmStep;

  const serviceLabel = serviceMode === 'delivery'
    ? 'Doorstep Pickup & Delivery'
    : 'Walk-in Repair';

  const progressSteps = serviceMode === 'delivery'
    ? ['Device & Issue', 'Service Mode', 'Pickup Address', 'Confirm']
    : ['Device & Issue', 'Service Mode', 'Confirm'];

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

    setIsSubmitted(true);

    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col sm:items-center sm:justify-center sm:p-4 bg-black/85 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Book repair appointment"
      onClick={resetForm}
    >
      <div
        className="bg-gray-900 sm:rounded-3xl max-w-2xl w-full h-[100dvh] sm:h-auto sm:max-h-[92dvh] shadow-2xl border-0 sm:border border-gray-800 overflow-hidden relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky header — always visible, easy to tap close */}
        <div className="bg-black text-white px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between shrink-0 border-b border-gray-800 pt-safe">
          <div className="flex items-center gap-2 min-w-0 pr-2">
            <img src={logoImg} alt="Olive ifixit logo" className="w-8 h-8 rounded-lg object-contain shrink-0" />
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold truncate">Book Repair Appointment</h3>
              <p className="text-[10px] sm:text-[11px] text-gray-400 truncate">Quick booking via WhatsApp</p>
            </div>
          </div>

          <button
            type="button"
            onClick={resetForm}
            aria-label="Close booking"
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white flex items-center justify-center transition-colors shrink-0 touch-manipulation"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {!isSubmitted && (
          <div className="bg-gray-800 px-4 sm:px-6 py-2.5 border-b border-gray-700 shrink-0">
            {/* Mobile: compact step indicator */}
            <div className="sm:hidden flex items-center justify-between text-xs font-bold">
              <span className="text-brand-gold">Step {step} of {totalSteps}</span>
              <span className="text-gray-400 truncate ml-2">{progressSteps[step - 1]}</span>
            </div>
            {/* Desktop: full progress bar */}
            <div className="hidden sm:flex items-center justify-between text-xs font-bold text-gray-400">
              {progressSteps.map((label, idx) => (
                <React.Fragment key={label}>
                  {idx > 0 && <span className="text-gray-600">&rarr;</span>}
                  <span className={step >= idx + 1 ? 'text-brand-gold' : ''}>
                    {idx + 1}. {label}
                  </span>
                </React.Fragment>
              ))}
            </div>
            {/* Mobile: progress dots */}
            <div className="sm:hidden flex items-center gap-1.5 mt-2">
              {progressSteps.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    step >= idx + 1 ? 'bg-brand-gold' : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-8 pb-safe">
          {isSubmitted ? (
            <div className="text-center py-4 sm:py-6 space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-900 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div className="space-y-2">
                <h4 className="text-xl sm:text-2xl font-extrabold text-white">Booking Sent!</h4>
                <p className="text-sm text-gray-400 max-w-md mx-auto px-2">
                  Your booking details have been sent via WhatsApp. We&apos;ll confirm and share all updates with you there.
                </p>
              </div>

              <div className="bg-black border border-gray-800 rounded-2xl p-4 sm:p-5 max-w-md mx-auto text-left space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
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
                    <div className="sm:col-span-2">
                      <span className="text-gray-500 block">Address</span>
                      <strong className="text-white">{deliveryAddress}</strong>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={resetForm}
                className="w-full sm:w-auto gold-gradient-btn px-8 py-3.5 rounded-xl font-bold text-sm touch-manipulation"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitBooking} className="pb-2">

              {step === 1 && (
                <div className="space-y-5">
                  <h4 className="text-base sm:text-lg font-bold text-white">What device needs repair?</h4>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1.5">Category</label>
                    <div className="grid grid-cols-3 gap-2">
                      {DEVICE_CATEGORIES.slice(0, 3).map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setCategory(cat.id)}
                          className={`p-3 rounded-xl border text-xs font-bold transition-all touch-manipulation min-h-[44px] ${
                            category === cat.id ? 'bg-brand-gold text-black border-brand-gold' : 'bg-gray-800 text-gray-300 active:bg-gray-700 border-gray-700'
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
                      placeholder="e.g. iPhone 14 Pro, Galaxy S23"
                      value={modelInput}
                      onChange={(e) => setModelInput(e.target.value)}
                      className="w-full p-3.5 bg-gray-800 border border-gray-700 rounded-xl text-sm font-semibold text-gray-200 focus:ring-2 focus:ring-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1.5">Select Issue</label>
                    <div className="grid grid-cols-1 gap-2">
                      {POPULAR_ISSUES.map((iss) => (
                        <button
                          key={iss.id}
                          type="button"
                          onClick={() => setIssueId(iss.id)}
                          className={`p-3.5 rounded-xl border text-left text-sm font-semibold flex items-center justify-between transition-all touch-manipulation min-h-[48px] ${
                            issueId === iss.id ? 'bg-brand-gold/15 border-brand-gold text-white font-bold' : 'bg-gray-800 text-gray-300 active:bg-gray-700 border-gray-700'
                          }`}
                        >
                          <span>{iss.title}</span>
                          <span className="text-gray-500 font-medium text-[11px] shrink-0 ml-2">{iss.timeEst}</span>
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setIssueId('other')}
                        className={`p-3.5 rounded-xl border text-left text-sm font-semibold flex items-center justify-between transition-all touch-manipulation min-h-[48px] ${
                          issueId === 'other' ? 'bg-brand-gold/15 border-brand-gold text-white font-bold' : 'bg-gray-800 text-gray-300 active:bg-gray-700 border-gray-700'
                        }`}
                      >
                        <span>{OTHER_ISSUE.title}</span>
                        <span className="text-gray-500 font-medium text-[11px] shrink-0 ml-2">{OTHER_ISSUE.timeEst}</span>
                      </button>
                    </div>
                  </div>

                  {issueId === 'other' && (
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1.5">Describe your device problem</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="e.g. Speaker crackles during calls, device overheats while charging..."
                        value={customIssueText}
                        onChange={(e) => setCustomIssueText(e.target.value)}
                        className="w-full p-3.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-brand-gold"
                      />
                      <p className="text-[11px] text-gray-500 mt-1.5">
                        Tell us what&apos;s wrong so our technician can prepare the right parts and tools.
                      </p>
                    </div>
                  )}

                  <div className="bg-black border border-gray-800 rounded-xl p-3 text-xs text-gray-400 font-medium">
                    <p>Our repairs use carefully tested, original and compatible parts. When genuine original parts are available through our suppliers, we&apos;ll notify you before the repair.</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextFromStep1}
                    disabled={!validateStep1()}
                    className="w-full gold-gradient-btn px-6 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                  >
                    Next: Service Mode <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <h4 className="text-base sm:text-lg font-bold text-white">Choose how you want service</h4>

                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => setServiceMode('walkin')}
                      className={`w-full p-4 rounded-2xl border-2 transition-all flex items-start gap-4 text-left touch-manipulation ${
                        serviceMode === 'walkin' ? 'border-brand-gold bg-brand-gold/5' : 'border-gray-700 active:bg-gray-800'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-brand-gold text-black flex items-center justify-center shrink-0">
                        <Store className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-white">Walk-in Repair</h5>
                        <p className="text-xs text-gray-400 mt-0.5">Visit our store and drop off your device.</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setServiceMode('delivery')}
                      className={`w-full p-4 rounded-2xl border-2 transition-all flex items-start gap-4 text-left touch-manipulation ${
                        serviceMode === 'delivery' ? 'border-brand-gold bg-brand-gold/5' : 'border-gray-700 active:bg-gray-800'
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
                    </button>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-sm bg-gray-800 text-gray-300 touch-manipulation"
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      onClick={handleNextFromStep2}
                      className="w-full sm:w-auto gold-gradient-btn px-6 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 touch-manipulation"
                    >
                      {serviceMode === 'delivery' ? 'Next: Pickup Address' : 'Next: Confirm'} <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && serviceMode === 'delivery' && (
                <div className="space-y-5">
                  <h4 className="text-base sm:text-lg font-bold text-white">Pickup Address</h4>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1.5">Pickup & Delivery Address</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="House/flat no., street, landmark, area, pin code"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full p-3.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-brand-gold"
                    />
                    <p className="text-[11px] text-gray-500 mt-1.5">
                      We&apos;ll pick up and return your device to this address (free within 5 km).
                    </p>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-sm bg-gray-800 text-gray-300 touch-manipulation"
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      onClick={handleNextFromAddress}
                      disabled={deliveryAddress.trim().length < 15}
                      className="w-full sm:w-auto gold-gradient-btn px-6 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                    >
                      Next: Confirm <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {isConfirmStep && (
                <div className="space-y-5">
                  <h4 className="text-base sm:text-lg font-bold text-white">Contact Information</h4>

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
                          className="w-full pl-9 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-xl text-sm font-semibold text-white focus:ring-2 focus:ring-brand-gold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                            className="w-full pl-9 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-xl text-sm font-semibold text-white focus:ring-2 focus:ring-brand-gold"
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
                            placeholder="+91 80193 49487"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="w-full pl-9 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-xl text-sm font-semibold text-white focus:ring-2 focus:ring-brand-gold"
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
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-brand-gold"
                      />
                    </div>
                  </div>

                  <div className="bg-black border border-gray-800 rounded-xl p-4 text-xs space-y-2">
                    <div className="text-gray-400">
                      <span className="text-gray-500">Device: </span>
                      <strong className="text-white">{categoryName} — {modelInput}</strong>
                    </div>
                    <div className="text-gray-400">
                      <span className="text-gray-500">Issue: </span>
                      <strong className="text-brand-gold">{issueLabel}</strong>
                    </div>
                    <div className="text-gray-400">
                      <span className="text-gray-500">Service: </span>
                      <strong className="text-white">{serviceLabel}</strong>
                    </div>
                    {serviceMode === 'delivery' && (
                      <div className="text-gray-400">
                        <span className="text-gray-500">Address: </span>
                        <strong className="text-white">{deliveryAddress}</strong>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleBackFromConfirm}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-sm bg-gray-800 text-gray-300 touch-manipulation"
                    >
                      Back
                    </button>

                    <button
                      type="submit"
                      className="w-full sm:w-auto gold-gradient-btn px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 touch-manipulation"
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
