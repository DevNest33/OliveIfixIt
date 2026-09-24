import React, { useState, useCallback, useMemo } from 'react';
import { X, CheckCircle2, ChevronDown, Upload } from 'lucide-react';
import { buildWarrantyWhatsAppMessage, getWhatsAppUrl } from '../data/contactConfig';
import useModalLock from '../hooks/useModalLock';
import BrandLogo from './BrandLogo';

const WARRANTY_PERIODS = [
  { id: '1w', label: '1 Week', days: 7 },
  { id: '1m', label: '1 Month', months: 1 },
  { id: '3m', label: '3 Months', months: 3 },
  { id: '6m', label: '6 Months', months: 6 },
  { id: '9m', label: '9 Months', months: 9 },
  { id: '1y', label: '1 Year', months: 12 },
];

const NOT_COVERED = [
  'Physical damage — broken, cracked, bent, dented or damaged body/display/parts.',
  'Liquid / water damage, corrosion or rust.',
  'Damage caused by fall, shock, pressure, overheating, fire, short circuit or electrical surge.',
  'Unauthorized opening, repair, modification or tampering after delivery.',
  'Damage or faults caused by another technician/service centre.',
  'Software issues, virus/malware, OS updates, flashing, settings or data-related problems unless specifically included in the invoice.',
  'Damage caused by incompatible charger, adapter, battery or accessories.',
  'Faults in components that were not repaired/replaced by our service centre.',
  'Any new issue unrelated to the original repair.',
  'Data loss, software/data corruption, SIM card, memory card or personal information loss.',
];

const CUSTOMER_RESPONSIBILITY = [
  'Customer should take a complete backup of important data before submitting the device.',
  'The service centre is not responsible for loss of data or personal files during repair.',
  'Customer should check the device and accessories at the time of delivery.',
  'Warranty is non-transferable and applies only to the device/serial number mentioned on the invoice.',
];

const fieldClass = 'w-full p-3.5 bg-gray-800 border border-gray-700 rounded-xl text-sm font-semibold text-gray-200 focus:ring-2 focus:ring-brand-gold';

function parseLocalDate(iso) {
  const [year, month, day] = iso.split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function addMonthsClamped(date, months) {
  const result = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const originalDay = result.getDate();
  result.setMonth(result.getMonth() + months);
  if (result.getDate() < originalDay) result.setDate(0);
  return result;
}

function warrantyEndDate(deliveryIso, periodId) {
  const start = parseLocalDate(deliveryIso);
  const period = WARRANTY_PERIODS.find((item) => item.id === periodId);
  if (!start || !period) return null;
  if (period.days) {
    const result = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    result.setDate(result.getDate() + period.days);
    return result;
  }
  return addMonthsClamped(start, period.months);
}

function formatLongDate(date) {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function FieldLabel({ children }) {
  return <label className="block text-xs font-bold text-gray-400 mb-1.5">{children}</label>;
}

function SectionLabel({ children }) {
  return (
    <h4 className="text-xs uppercase font-extrabold tracking-widest text-brand-gold pt-1">
      {children}
    </h4>
  );
}

export default function WarrantyModal({ isOpen, onClose }) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deviceModel, setDeviceModel] = useState('');
  const [imei, setImei] = useState('');
  const [jobNumber, setJobNumber] = useState('');
  const [repair, setRepair] = useState('');
  const [periodId, setPeriodId] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [issue, setIssue] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileInputKey, setFileInputKey] = useState(0);
  const [termsOpen, setTermsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const resetForm = useCallback(() => {
    setCustomerName('');
    setCustomerPhone('');
    setDeviceModel('');
    setImei('');
    setJobNumber('');
    setRepair('');
    setPeriodId('');
    setDeliveryDate('');
    setIssue('');
    setFileName('');
    setFileInputKey((key) => key + 1);
    setTermsOpen(false);
    setIsSubmitted(false);
    onClose();
  }, [onClose]);

  useModalLock(isOpen, resetForm);

  const validTillDate = useMemo(
    () => warrantyEndDate(deliveryDate, periodId),
    [deliveryDate, periodId],
  );
  const validTillLabel = validTillDate ? formatLongDate(validTillDate) : '';
  const deliveryLabel = deliveryDate ? formatLongDate(parseLocalDate(deliveryDate)) : '';
  const periodLabel = WARRANTY_PERIODS.find((item) => item.id === periodId)?.label || '';

  const canSubmit = [
    customerName,
    customerPhone,
    deviceModel,
    jobNumber,
    repair,
    periodId,
    deliveryDate,
    issue,
  ].every((value) => value.trim());

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canSubmit || !validTillLabel) return;

    const message = buildWarrantyWhatsAppMessage({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      deviceModel: deviceModel.trim(),
      imei,
      jobNumber: jobNumber.trim(),
      repair: repair.trim(),
      warrantyPeriod: periodLabel,
      deliveryDate: deliveryLabel,
      validTill: validTillLabel,
      issue: issue.trim(),
      fileName,
    });

    window.open(getWhatsAppUrl(message), '_blank');
    setIsSubmitted(true);
  };

  const clearFile = () => {
    setFileName('');
    setFileInputKey((key) => key + 1);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col sm:items-center sm:justify-center sm:p-4 bg-black/85 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Warranty application"
      onClick={resetForm}
    >
      <div
        className="bg-gray-900 sm:rounded-3xl max-w-2xl w-full h-[100dvh] sm:h-auto sm:max-h-[92dvh] shadow-2xl border-0 sm:border border-gray-800 overflow-hidden relative flex flex-col animate-scale-in"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="bg-black text-white px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between shrink-0 border-b border-gray-800 pt-safe">
          <div className="flex items-center gap-3 min-w-0 pr-2">
            <BrandLogo size="sm" className="shrink-0" />
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold truncate">Warranty Application</h3>
              <p className="hidden sm:block text-[11px] text-gray-400 truncate">
                Submit your warranty details and our team will review your request.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={resetForm}
            aria-label="Close warranty application"
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white flex items-center justify-center transition-colors shrink-0 touch-manipulation"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-8 pb-safe">
          {isSubmitted ? (
            <div className="text-center py-4 sm:py-6 space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-900 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div className="space-y-2">
                <h4 className="text-xl sm:text-2xl font-extrabold text-white">Warranty Application Submitted</h4>
                <p className="text-sm text-gray-400 max-w-md mx-auto px-2">
                  Your request has been received. Our team will review your warranty details and contact you regarding the next steps.
                </p>
              </div>

              <button
                type="button"
                onClick={resetForm}
                className="w-full sm:w-auto gold-gradient-btn px-8 py-3.5 rounded-xl font-bold text-sm touch-manipulation"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 pb-2">
              <p className="sm:hidden text-sm text-gray-400">
                Submit your warranty details and our team will review your request.
              </p>
              <SectionLabel>Customer Details</SectionLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <FieldLabel>Customer Name</FieldLabel>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <FieldLabel>Phone Number</FieldLabel>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(event) => setCustomerPhone(event.target.value)}
                    className={fieldClass}
                  />
                </div>
              </div>

              <SectionLabel>Device Details</SectionLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <FieldLabel>Device / Model</FieldLabel>
                  <input
                    type="text"
                    required
                    value={deviceModel}
                    onChange={(event) => setDeviceModel(event.target.value)}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <FieldLabel>IMEI / Serial Number</FieldLabel>
                  <input
                    type="text"
                    value={imei}
                    onChange={(event) => setImei(event.target.value)}
                    className={fieldClass}
                  />
                </div>
              </div>

              <SectionLabel>Repair Details</SectionLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <FieldLabel>Job / Invoice Number</FieldLabel>
                  <input
                    type="text"
                    required
                    value={jobNumber}
                    onChange={(event) => setJobNumber(event.target.value)}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <FieldLabel>Repair / Service</FieldLabel>
                  <input
                    type="text"
                    required
                    value={repair}
                    onChange={(event) => setRepair(event.target.value)}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <FieldLabel>Warranty Period</FieldLabel>
                  <div className="relative">
                    <select
                      required
                      value={periodId}
                      onChange={(event) => setPeriodId(event.target.value)}
                      className={`${fieldClass} appearance-none pr-10 [color-scheme:dark]`}
                    >
                      <option value="" disabled>Select warranty period</option>
                      {WARRANTY_PERIODS.map((period) => (
                        <option key={period.id} value={period.id}>{period.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <FieldLabel>Delivery Date</FieldLabel>
                  <input
                    type="date"
                    required
                    value={deliveryDate}
                    onChange={(event) => setDeliveryDate(event.target.value)}
                    className={`${fieldClass} [color-scheme:dark]`}
                  />
                </div>
              </div>

              <div>
                <FieldLabel>Warranty Valid Till</FieldLabel>
                <div className="w-full p-3.5 bg-black border border-gray-800 rounded-xl text-sm font-semibold">
                  {validTillLabel ? (
                    <span className="text-brand-gold">{validTillLabel}</span>
                  ) : (
                    <span className="text-gray-500 font-medium">Select a delivery date and warranty period</span>
                  )}
                </div>
              </div>

              <SectionLabel>Issue</SectionLabel>
              <div>
                <FieldLabel>Issue / Problem Description</FieldLabel>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the issue you're experiencing..."
                  value={issue}
                  onChange={(event) => setIssue(event.target.value)}
                  className={fieldClass}
                />
              </div>

              <div>
                <SectionLabel>Attachment</SectionLabel>
                <div className="mt-3">
                  <FieldLabel>Upload Warranty Card / Invoice</FieldLabel>
                  <label className="flex items-center gap-3 w-full p-3.5 bg-gray-800 border border-dashed border-gray-700 rounded-xl cursor-pointer hover:border-brand-gold/40 transition-colors touch-manipulation">
                    <Upload className="w-4 h-4 text-brand-gold shrink-0" />
                    <span className="text-sm text-gray-400 truncate">
                      {fileName || 'Warranty card or invoice (optional)'}
                    </span>
                    <input
                      key={fileInputKey}
                      type="file"
                      accept="image/*,.pdf"
                      className="sr-only"
                      onChange={(event) => setFileName(event.target.files?.[0]?.name || '')}
                    />
                  </label>
                  {fileName && (
                    <button
                      type="button"
                      onClick={clearFile}
                      className="text-xs text-gray-400 hover:text-gray-200 mt-1.5 touch-manipulation"
                    >
                      Remove file
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setTermsOpen((open) => !open)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-white transition-colors cursor-pointer touch-manipulation min-h-[56px]"
                  aria-expanded={termsOpen}
                >
                  <span className="text-sm sm:text-base">Warranty Terms & Conditions</span>
                  <div className={`w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center shrink-0 transition-transform duration-300 ${termsOpen ? 'rotate-180 bg-brand-gold text-black' : 'text-gray-400'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {termsOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-0 text-gray-400 text-sm leading-relaxed border-t border-gray-800 space-y-4">
                    <div className="pt-4">
                      <p className="text-[11px] uppercase font-extrabold tracking-widest text-gray-300 mb-2">Warranty Terms</p>
                      <ol className="list-decimal pl-4 space-y-2">
                        <li>Warranty is applicable only to the specific repair/service or part mentioned on the job sheet/invoice.</li>
                        <li>Warranty covers repair-related defects in the repaired/replaced part, subject to technician inspection.</li>
                        <li>Warranty does not cover unrelated faults that develop after the device is delivered.</li>
                        <li>Warranty claim must be made within the warranty period mentioned above and the original invoice/warranty note should be produced.</li>
                      </ol>
                    </div>

                    <div>
                      <p className="text-[11px] uppercase font-extrabold tracking-widest text-gray-300 mb-2">Warranty Will Not Cover</p>
                      <ul className="list-disc pl-4 space-y-1.5">
                        {NOT_COVERED.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-[11px] uppercase font-extrabold tracking-widest text-gray-300 mb-2">Customer Responsibility</p>
                      <ul className="list-disc pl-4 space-y-1.5">
                        {CUSTOMER_RESPONSIBILITY.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-black border border-gray-800 rounded-xl p-3.5 text-xs text-gray-400 leading-relaxed">
                      All warranty claims are subject to inspection and diagnosis by our technician. The service centre will determine whether the reported fault is related to the previous repair and falls under the warranty. If physical damage, liquid damage, tampering or another excluded condition is found, the warranty claim may be rejected.
                    </div>

                    <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-xl p-3.5 text-xs text-gray-200">
                      <p className="font-extrabold text-brand-gold uppercase tracking-wider text-[11px] mb-1">Important</p>
                      <p>Please keep your Warranty Card / Invoice safely until the warranty period expires. Warranty does not mean replacement of the complete device; it applies only to the repair/service details.</p>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full gold-gradient-btn px-6 py-3.5 rounded-xl font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
              >
                Submit Warranty Application
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
