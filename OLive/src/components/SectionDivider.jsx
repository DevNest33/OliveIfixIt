import React from 'react';
import { BrandMark } from './BrandLogo';

export default function SectionDivider() {
  return (
    <div className="bg-brand-bg px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center gap-4 py-6">
        <span className="flex-1 h-px bg-brand-gold/15" />
        <BrandMark size="sm" />
        <span className="flex-1 h-px bg-brand-gold/15" />
      </div>
    </div>
  );
}
