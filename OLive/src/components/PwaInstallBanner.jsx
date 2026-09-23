import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, X } from 'lucide-react';

const DISMISS_KEY = 'olive-pwa-install-dismissed';

function isStandaloneDisplay() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  );
}

export default function PwaInstallBanner({ visible = true }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    if (isStandaloneDisplay() || localStorage.getItem(DISMISS_KEY) === '1') {
      return undefined;
    }

    const onBeforeInstall = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', onBeforeInstall);
  }, []);

  const show = Boolean(visible && deferredPrompt);

  const dismiss = () => {
    setDeferredPrompt(null);
    localStorage.setItem(DISMISS_KEY, '1');
  };

  const install = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed z-30 left-[max(1rem,env(safe-area-inset-left))] bottom-[max(1rem,env(safe-area-inset-bottom))] w-[min(20.5rem,calc(100vw-6.5rem))]"
          role="dialog"
          aria-label="Install Olive ifixit app"
        >
          <div className="glass-card rounded-2xl p-4 shadow-2xl border-brand-gold/25">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-gold text-black flex items-center justify-center shrink-0">
                <Download className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-white leading-snug">
                  Install Olive ifixit
                </p>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  Add the app to your home screen for faster booking.
                </p>
              </div>
              <button
                type="button"
                onClick={dismiss}
                className="p-1 rounded-md text-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-gold"
                aria-label="Dismiss install prompt"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={install}
              className="gold-gradient-btn mt-3 w-full py-2.5 rounded-xl text-sm font-bold cursor-pointer"
            >
              Install app
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
