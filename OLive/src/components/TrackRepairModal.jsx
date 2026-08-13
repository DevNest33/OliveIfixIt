import React, { useState } from 'react';
import { SAMPLE_TRACKING_ORDERS } from '../data/repairData';
import { X, Search, Wrench, CheckCircle2, ShieldCheck, UserCheck, AlertCircle } from 'lucide-react';
import useModalLock from '../hooks/useModalLock';

export default function TrackRepairModal({ isOpen, onClose }) {
  const [ticketInput, setTicketInput] = useState('');
  const [activeOrder, setActiveOrder] = useState(SAMPLE_TRACKING_ORDERS['FIX-9821']);
  const [notFound, setNotFound] = useState(false);

  useModalLock(isOpen, onClose);

  if (!isOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    const cleanId = ticketInput.trim().toUpperCase();
    if (SAMPLE_TRACKING_ORDERS[cleanId]) {
      setActiveOrder(SAMPLE_TRACKING_ORDERS[cleanId]);
      setNotFound(false);
    } else if (cleanId.startsWith('FIX-')) {
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
    <div
      className="fixed inset-0 z-50 flex flex-col sm:items-center sm:justify-center sm:p-4 bg-black/85 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Track repair status"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 sm:rounded-3xl max-w-xl w-full h-[100dvh] sm:h-auto sm:max-h-[92dvh] shadow-2xl border-0 sm:border border-gray-800 overflow-hidden relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-black text-white px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between shrink-0 border-b border-gray-800 pt-safe">
          <div className="flex items-center gap-2 min-w-0">
            <Search className="w-5 h-5 text-brand-gold shrink-0" />
            <h3 className="text-sm sm:text-base font-bold truncate">Track Live Repair Status</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close tracking"
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white flex items-center justify-center transition-colors shrink-0 touch-manipulation"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-6 pb-safe">

          <form onSubmit={handleSearch} className="space-y-2">
            <label className="block text-xs font-bold text-gray-400">Enter Repair Ticket Number</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="e.g. FIX-9821 or FIX-8840"
                value={ticketInput}
                onChange={(e) => setTicketInput(e.target.value)}
                className="flex-1 px-4 py-3 bg-black border border-gray-700 rounded-xl text-sm font-semibold uppercase text-white focus:ring-2 focus:ring-brand-gold"
              />
              <button
                type="submit"
                className="bg-brand-gold text-black px-5 py-3 rounded-xl font-bold text-sm hover:bg-brand-gold-light transition-colors touch-manipulation shrink-0"
              >
                Track Ticket
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-gray-500">
              <span>Try sample tickets:</span>
              <button
                type="button"
                onClick={() => {
                  setTicketInput('FIX-9821');
                  setActiveOrder(SAMPLE_TRACKING_ORDERS['FIX-9821']);
                  setNotFound(false);
                }}
                className="text-brand-gold font-bold hover:underline touch-manipulation py-1"
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
                className="text-brand-gold font-bold hover:underline touch-manipulation py-1"
              >
                FIX-8840
              </button>
            </div>
          </form>

          {notFound ? (
            <div className="p-4 bg-red-900/30 border border-red-800 rounded-xl text-red-400 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              Ticket ID not found. Please try FIX-9821 or create a new booking above.
            </div>
          ) : activeOrder && (
            <div className="bg-black rounded-2xl p-4 sm:p-5 border border-gray-800 space-y-5">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-gray-800">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-500">Order #{activeOrder.id}</span>
                  <h4 className="text-base font-extrabold text-white">{activeOrder.device}</h4>
                  <p className="text-xs text-brand-gold font-semibold">{activeOrder.issue}</p>
                </div>
                <div className="sm:text-right">
                  <span className="inline-block text-xs font-extrabold bg-brand-gold text-black px-3 py-1 rounded-full">
                    {activeOrder.status}
                  </span>
                  <span className="text-[10px] text-gray-500 block mt-1">Est: {activeOrder.estimatedCompletion}</span>
                </div>
              </div>

              <div className="space-y-3 pt-1">
                {activeOrder.steps.map((st, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {st.done ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                      ) : st.current ? (
                        <div className="w-5 h-5 rounded-full bg-brand-gold text-black flex items-center justify-center animate-pulse">
                          <Wrench className="w-3 h-3" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-gray-700 text-gray-500 flex items-center justify-center text-[10px]">
                          {i + 1}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h5 className={`text-xs font-bold ${st.done || st.current ? 'text-white' : 'text-gray-500'}`}>
                        {st.name}
                      </h5>
                      <span className="text-[10px] text-gray-500">{st.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-gray-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-gray-400">
                <span className="flex items-center gap-1.5 font-semibold">
                  <UserCheck className="w-4 h-4 text-brand-gold shrink-0" />
                  Assigned Tech: <strong className="text-white">{activeOrder.tech}</strong>
                </span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
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
