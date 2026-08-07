import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, CheckCircle2, Calendar, Clock, MapPin, Smartphone, Wrench, ShieldCheck, 
  ArrowRight, ArrowLeft, Truck, Store, Sparkles, User, Mail, Phone, FileText 
} from 'lucide-react';
import { DEVICE_CATEGORIES, DEVICE_BRANDS, DEVICE_MODELS, REPAIR_ISSUES, MODEL_PRICING_MAP } from '../data/repairData';


export default function BookingModal({ isOpen, onClose, initialSelection }) {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('smartphone');
  const [brand, setBrand] = useState('apple');
  const [model, setModel] = useState('iPhone 15 Pro');
  const [issueId, setIssueId] = useState('screen');
  const [serviceMode, setServiceMode] = useState('store'); // 'store' | 'onsite' | 'mailin'
  const [selectedDate, setSelectedDate] = useState('2026-07-22');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [selectedLocation, setSelectedLocation] = useState('Downtown Flagship Hub (124 Tech Way)');
  
  // Customer details
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');

  // Submitted ticket status
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  // Handle pre-filled selection if passed from estimator or service cards
  useEffect(() => {
    if (initialSelection) {
      if (initialSelection.category) setCategory(initialSelection.category);
      if (initialSelection.brand) setBrand(initialSelection.brand);
      if (initialSelection.model) setModel(initialSelection.model);
      if (initialSelection.issue?.id) setIssueId(initialSelection.issue.id);
    }
  }, [initialSelection]);

  if (!isOpen) return null;

  const currentIssue = REPAIR_ISSUES.find((i) => i.id === issueId) || REPAIR_ISSUES[0];
  const modelPrice = MODEL_PRICING_MAP[model]?.prices?.[issueId];
  const displayPrice = modelPrice != null ? `$${modelPrice}` : 'Quote upon inspection';

  const locations = [
    'Downtown Flagship Hub (124 Tech Way)',
    'Westside Tech Plaza (88 Grand Ave)',
    'North Metro Store (402 Park Blvd)'
  ];

  const timeSlots = [
    '09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '03:30 PM', '05:00 PM'
  ];

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    const newId = `FIX-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(newId);
    setIsSubmitted(true);

    // Trigger celebration confetti
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in duration-200 my-8">
        
        {/* Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-orange text-white flex items-center justify-center font-bold">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold">Book Repair Appointment</h3>
              <p className="text-[11px] text-slate-400">Instant scheduling & 3-Month Warranty</p>
            </div>
          </div>

          <button
            onClick={resetForm}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        {!isSubmitted && (
          <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-500">
            <span className={step >= 1 ? 'text-brand-navy' : ''}>1. Device & Issue</span>
            <span>&rarr;</span>
            <span className={step >= 2 ? 'text-brand-navy' : ''}>2. Service Mode</span>
            <span>&rarr;</span>
            <span className={step >= 3 ? 'text-brand-navy' : ''}>3. Date & Location</span>
            <span>&rarr;</span>
            <span className={step >= 4 ? 'text-brand-navy' : ''}>4. Confirm</span>
          </div>
        )}

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            /* Confirmation Screen */
            <div className="text-center py-6 space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div className="space-y-2">
                <h4 className="text-2xl font-extrabold text-slate-900">Repair Ticket Booked!</h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Your appointment has been confirmed. A receipt and calendar invite have been sent to <strong>{customerEmail || 'your email'}</strong>.
                </p>
              </div>

              {/* Ticket Summary Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-md mx-auto text-left space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-xs font-semibold text-slate-500">Ticket Reference ID</span>
                  <span className="text-base font-mono font-extrabold text-brand-navy">{ticketId}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block">Device</span>
                    <strong className="text-slate-800">{model}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Issue</span>
                    <strong className="text-brand-orange">{currentIssue.title}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Date & Time</span>
                    <strong className="text-slate-800">{selectedDate} at {selectedTime}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Estimated Cost</span>
                    <strong className="text-slate-900">{displayPrice}</strong>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={resetForm}
                  className="w-full sm:w-auto orange-gradient-btn text-white px-8 py-3 rounded-xl font-bold text-sm"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitBooking}>
              
              {/* STEP 1: Device & Issue */}
              {step === 1 && (
                <div className="space-y-5">
                  <h4 className="text-lg font-bold text-slate-900">Step 1: What device needs repair?</h4>
                  
                  {/* Category */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">Category</label>
                    <div className="grid grid-cols-3 gap-2">
                      {DEVICE_CATEGORIES.slice(0, 3).map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setCategory(cat.id);
                            const b = DEVICE_BRANDS[cat.id]?.[0]?.id || 'apple';
                            setBrand(b);
                            setModel(DEVICE_MODELS[b]?.[0] || '');
                          }}
                          className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                            category === cat.id ? 'bg-brand-navy text-white border-brand-navy' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Brand & Model */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Brand</label>
                      <select
                        value={brand}
                        onChange={(e) => {
                          setBrand(e.target.value);
                          setModel(DEVICE_MODELS[e.target.value]?.[0] || '');
                        }}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                      >
                        {(DEVICE_BRANDS[category] || []).map((b) => (
                          <option key={b.id} value={b.id}>{b.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Exact Model</label>
                      <select
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                      >
                        {(DEVICE_MODELS[brand] || []).map((m, idx) => (
                          <option key={idx} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Issue */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">Select Issue</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {REPAIR_ISSUES.map((iss) => (
                        <button
                          key={iss.id}
                          type="button"
                          onClick={() => setIssueId(iss.id)}
                          className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                            issueId === iss.id ? 'bg-brand-orange/15 border-brand-orange text-slate-900 font-bold' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span>{iss.title}</span>
                          <span className="text-slate-400 font-medium text-[11px]">{iss.timeEst}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className='pt-4 flex items-center gap-4' > 


                    <div className="w-3/4
                                    bg-slate-50
                                    border
                                    border-slate-200
                                    rounded-xl
                                    p-3
                                    text-xs
                                    text-slate-600
                                    font-medium">
                      <p>Our repairs use carefully tested, orignal and  compatible parts. When genuine original parts are available through our suppliers, we'll notify you before the repair</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="orange-gradient-btn text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2"
                      >
                      Next: Service Mode <ArrowRight className="w-4 h-4" />
                    </button>
                    
                  </div>
                </div>
              )}

              {/* STEP 2: Service Mode */}
              {step === 2 && (
                <div className="space-y-5">
                  <h4 className="text-lg font-bold text-slate-900">Step 2: Choose how you want service</h4>
                  
                  <div className="space-y-3">
                    {/* Store Drop-off */}
                    <div
                      onClick={() => setServiceMode('store')}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-4 ${
                        serviceMode === 'store' ? 'border-brand-navy bg-brand-navy/5' : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-brand-navy text-white flex items-center justify-center shrink-0">
                        <Store className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-slate-900">In-Store Express Visit (Most Popular)</h5>
                        <p className="text-xs text-slate-500 mt-0.5">Drop off at our flagship store and wait in our lounge with complimentary Wi-Fi.</p>
                      </div>
                    </div>

                    {/* On-Site Tech Van */}
                    <div
                      onClick={() => setServiceMode('onsite')}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-4 ${
                        serviceMode === 'onsite' ? 'border-brand-navy bg-brand-navy/5' : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-brand-orange text-white flex items-center justify-center shrink-0">
                        <Truck className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-slate-900">Mobile Van to Doorstep (+$15)</h5>
                        <p className="text-xs text-slate-500 mt-0.5">Our cleanroom mobile unit comes to your home or office address.</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 py-2.5 rounded-xl font-bold text-xs bg-slate-100 text-slate-700"
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="orange-gradient-btn text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2"
                    >
                      Next: Date & Location <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Date, Time & Location */}
              {step === 3 && (
                <div className="space-y-5">
                  <h4 className="text-lg font-bold text-slate-900">Step 3: Pick Date & Time Slot</h4>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">Service Location</label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                    >
                      {locations.map((loc, i) => (
                        <option key={i} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Preferred Date</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Time Slot</label>
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                      >
                        {timeSlots.map((ts, i) => (
                          <option key={i} value={ts}>{ts}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 rounded-xl font-bold text-xs bg-slate-100 text-slate-700"
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="orange-gradient-btn text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2"
                    >
                      Next: Contact Info <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Contact Details & Submit */}
              {step === 4 && (
                <div className="space-y-5">
                  <h4 className="text-lg font-bold text-slate-900">Step 4: Contact Information</h4>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Full Name</label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Alex Johnson"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-brand-navy"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Email Address</label>
                        <div className="relative">
                          <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="email"
                            required
                            placeholder="alex@example.com"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-brand-navy"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Phone Number</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="tel"
                            required
                            placeholder="(555) 019-2834"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-brand-navy"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Notes / Additional Symptoms (Optional)</label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Back glass also slightly scratched..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-brand-navy"
                      />
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-brand-navy/5 border border-brand-navy/15 rounded-xl p-4 text-xs space-y-1.5">
                    <div className="flex justify-between text-slate-700">
                      <span>Device: <strong>{model}</strong></span>
                      <span>Service: <strong>{currentIssue.title}</strong></span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>Schedule: <strong>{selectedDate} ({selectedTime})</strong></span>
                      <span className="text-brand-orange font-extrabold text-sm">Est. Price: {displayPrice}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-5 py-2.5 rounded-xl font-bold text-xs bg-slate-100 text-slate-700"
                    >
                      Back
                    </button>

                    <button
                      type="submit"
                      className="orange-gradient-btn text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg flex items-center gap-2"
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
