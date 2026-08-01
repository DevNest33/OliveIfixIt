import React, { useState } from 'react';
import { SAMPLE_TRACKING_ORDERS } from '../data/repairData';
import { X, Search, Wrench, CheckCircle2, Clock, ShieldCheck, UserCheck, AlertCircle } from 'lucide-react';

export default function TrackRepairModal({ isOpen, onClose }) {
  const [ticketInput, setTicketInput] = useState('');
  const [activeOrder, setActiveOrder] = useState(SAMPLE_TRACKING_ORDERS['FIX-9821']);
  const [notFound, setNotFound] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    const cleanId = ticketInput.trim().toUpperCase();
    if (SAMPLE_TRACKING_ORDERS[cleanId]) {
      setActiveOrder(SAMPLE_TRACKING_ORDERS[cleanId]);
      setNotFound(false);
    } else if (cleanId.startsWith('FIX-')) {
      // Create dynamic order status for any newly generated FIX- code!
      setActiveOrder({
        id: cleanId,
        device: 'Your Submitted Device',
        issue: 'Scheduled Inspection & Repair',
        customerName: 'Valued Customer',
        status: 'Scheduled',
        step: 2,
        steps: [
          { name: 'Order Received & Ticket Generated', time: 'Just Now', done: true },
          { name: 'Initial Diagnostic Inspection', time: 'In Progress...', current: true },
          { name: 'Precision Assembly & Parts Swap', time: 'Pending', done: false },
          { name: 'Quality Assurance & Waterproof Seal', time: 'Pending', done: false },
          { name: 'Ready for Collection', time: 'Pending', done: false }
        ],
        tech: 'Senior Tech Marcus Vance',
        estimatedCompletion: 'Today at 04:30 PM'
      });
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in duration-200 my-8">
        
        {/* Header Bar */}
        <div className="bg-brand-navy text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-brand-orange" />
            <h3 className="text-base font-bold">Track Live Repair Status</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-2">
            <label className="block text-xs font-bold text-slate-600">Enter Repair Ticket Number</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. FIX-9821 or FIX-8840"
                value={ticketInput}
                onChange={(e) => setTicketInput(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold uppercase text-slate-800 focus:ring-2 focus:ring-brand-navy"
              />
              <button
                type="submit"
                className="bg-brand-navy text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-brand-navy-light transition-colors"
              >
                Track Ticket
              </button>
            </div>
            
            {/* Quick Demo Code Pills */}
            <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500">
              <span>Try sample tickets:</span>
              <button
                type="button"
                onClick={() => {
                  setTicketInput('FIX-9821');
                  setActiveOrder(SAMPLE_TRACKING_ORDERS['FIX-9821']);
                  setNotFound(false);
                }}
                className="text-brand-navy font-bold hover:underline"
              >
                FIX-9821
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => {
                  setTicketInput('FIX-8840');
                  setActiveOrder(SAMPLE_TRACKING_ORDERS['FIX-8840']);
                  setNotFound(false);
                }}
                className="text-brand-navy font-bold hover:underline"
              >
                FIX-8840
              </button>
            </div>
          </form>

          {notFound ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              Ticket ID not found. Please try FIX-9821 or create a new booking above.
            </div>
          ) : activeOrder && (
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-5">
              
              {/* Order Info Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Order #{activeOrder.id}</span>
                  <h4 className="text-base font-extrabold text-slate-900">{activeOrder.device}</h4>
                  <p className="text-xs text-brand-orange font-semibold">{activeOrder.issue}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block text-xs font-extrabold bg-brand-navy text-white px-3 py-1 rounded-full">
                    {activeOrder.status}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">Est: {activeOrder.estimatedCompletion}</span>
                </div>
              </div>

              {/* Progress Steps Timeline */}
              <div className="space-y-3 pt-1">
                {activeOrder.steps.map((st, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {st.done ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                      ) : st.current ? (
                        <div className="w-5 h-5 rounded-full bg-brand-orange text-white flex items-center justify-center animate-pulse">
                          <Wrench className="w-3 h-3" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center text-[10px]">
                          {i + 1}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h5 className={`text-xs font-bold ${st.done || st.current ? 'text-slate-900' : 'text-slate-400'}`}>
                        {st.name}
                      </h5>
                      <span className="text-[10px] text-slate-500">{st.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Technician Info */}
              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
                <span className="flex items-center gap-1.5 font-semibold">
                  <UserCheck className="w-4 h-4 text-brand-navy" />
                  Assigned Tech: <strong className="text-slate-900">{activeOrder.tech}</strong>
                </span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 1-Yr Warranty Active
                </span>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
