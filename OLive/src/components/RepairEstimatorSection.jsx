import React, { useState } from 'react';
import { DEVICE_CATEGORIES, DEVICE_BRANDS, DEVICE_MODELS, REPAIR_ISSUES } from '../data/repairData';
import { Calculator, CheckCircle2, Clock, ShieldCheck, ArrowRight, Sparkles, Smartphone, Tablet, Laptop, Watch } from 'lucide-react';

const categoryIcons = {
  Smartphone,
  Tablet,
  Laptop,
  Watch
};

export default function RepairEstimatorSection({ onBookWithSelection }) {
  const [selectedCategory, setSelectedCategory] = useState('smartphone');
  const [selectedBrand, setSelectedBrand] = useState('apple');
  const [selectedModel, setSelectedModel] = useState('iPhone 15 Pro');
  const [selectedIssueId, setSelectedIssueId] = useState('screen');

  // Handle Category Change
  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    const availableBrands = DEVICE_BRANDS[catId] || [];
    if (availableBrands.length > 0) {
      const firstBrand = availableBrands[0].id;
      setSelectedBrand(firstBrand);
      const availableModels = DEVICE_MODELS[firstBrand] || [];
      setSelectedModel(availableModels[0] || '');
    }
  };

  // Handle Brand Change
  const handleBrandChange = (brandId) => {
    setSelectedBrand(brandId);
    const availableModels = DEVICE_MODELS[brandId] || [];
    setSelectedModel(availableModels[0] || '');
  };

  const selectedIssue = REPAIR_ISSUES.find((i) => i.id === selectedIssueId) || REPAIR_ISSUES[0];
  
  // Calculate price multiplier based on category
  let multiplier = 1;
  if (selectedCategory === 'laptop') multiplier = 1.6;
  if (selectedCategory === 'tablet') multiplier = 1.3;
  const estimatedPrice = Math.round(selectedIssue.basePrice * multiplier);

  return (
    <section id="estimator" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative Gradient Background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-navy/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-extrabold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            Instant Repair Calculator
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Get an Immediate <span className="text-brand-orange">Price Estimate</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            No surprise bills. Select your device parameters below to reveal exact parts & labor cost in real-time.
          </p>
        </div>

        {/* Main Estimator Layout Box */}
        <div className="mt-12 bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800 grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Selection Inputs (8 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Device Category */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-brand-orange mb-2.5">
                1. Select Device Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {DEVICE_CATEGORIES.map((cat) => {
                  const Icon = categoryIcons[cat.icon] || Smartphone;
                  const active = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`p-3.5 rounded-xl border text-left flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                        active
                          ? 'bg-brand-navy border-brand-orange text-white shadow-lg ring-2 ring-brand-orange/30'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${active ? 'text-brand-orange' : 'text-slate-400'}`} />
                      <span className="text-xs font-bold">{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Brand */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-brand-orange mb-2.5">
                2. Choose Brand
              </label>
              <div className="flex flex-wrap gap-2">
                {(DEVICE_BRANDS[selectedCategory] || []).map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => handleBrandChange(brand.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedBrand === brand.id
                        ? 'bg-white text-slate-900 shadow-md font-extrabold'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {brand.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Select Model Dropdown */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-brand-orange mb-2">
                3. Choose Exact Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-orange"
              >
                {(DEVICE_MODELS[selectedBrand] || []).map((mod, idx) => (
                  <option key={idx} value={mod} className="bg-slate-900 text-white">
                    {mod}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 4: Choose Issue */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-brand-orange mb-2.5">
                4. What needs fixing?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {REPAIR_ISSUES.map((issue) => {
                  const active = selectedIssueId === issue.id;
                  return (
                    <button
                      key={issue.id}
                      onClick={() => setSelectedIssueId(issue.id)}
                      className={`px-4 py-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                        active
                          ? 'bg-brand-orange/20 border-brand-orange text-white font-bold'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <span className="truncate pr-2">{issue.title}</span>
                      <span className={`text-[11px] font-bold ${active ? 'text-brand-orange' : 'text-slate-400'}`}>
                        ${Math.round(issue.basePrice * multiplier)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Live Estimate Result Box (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-brand-navy/90 to-slate-950 p-6 sm:p-8 rounded-2xl border border-white/15 flex flex-col justify-between space-y-6 shadow-2xl relative">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400">Estimate Summary</span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Locked Price
                </span>
              </div>

              <div>
                <div className="text-xs text-slate-400">Selected Device</div>
                <div className="text-lg font-bold text-white mt-0.5">{selectedModel}</div>
                <div className="text-xs text-brand-orange font-semibold mt-0.5">{selectedIssue.title}</div>
              </div>

              {/* Big Price Display */}
              <div className="py-4 bg-white/5 rounded-2xl px-5 border border-white/10 text-center">
                <span className="text-xs font-medium text-slate-400 block">Total Estimated Cost</span>
                <div className="text-4xl sm:text-5xl font-extrabold text-white mt-1 tracking-tight">
                  ${estimatedPrice}
                  <span className="text-xs text-slate-400 font-normal ml-1">all-inclusive</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Includes Original Grade-A Parts + Labor + 1-Yr Guarantee</p>
              </div>

              {/* Duration & Features */}
              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-400">
                    <Clock className="w-4 h-4 text-brand-orange" /> Estimated Time:
                  </span>
                  <span className="font-bold text-white">{selectedIssue.timeEst}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> Warranty:
                  </span>
                  <span className="font-bold text-white">365 Days Full Coverage</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-brand-navy-light" /> Diagnostics:
                  </span>
                  <span className="font-bold text-emerald-400">FREE ($0)</span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={() => onBookWithSelection({
                category: selectedCategory,
                brand: selectedBrand,
                model: selectedModel,
                issue: selectedIssue,
                price: estimatedPrice
              })}
              className="w-full orange-gradient-btn text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-orange-glow cursor-pointer"
            >
              Book This Repair Now
              <ArrowRight className="w-5 h-5" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
