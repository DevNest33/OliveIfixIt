import React, { createContext, useContext, useState, useCallback } from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ title, description, variant = 'default', duration = 5000 }) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, title, description, variant }]);
    if (duration > 0) {
      setTimeout(() => removeToast(id), duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastPrimitives.Provider>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
        ))}
        <ToastPrimitives.Viewport />
      </ToastPrimitives.Provider>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}

const Toast = React.forwardRef(({ title, description, variant, onClose, ...props }, ref) => {
  const baseStyles = 'relative pointer-events-auto flex w-full items-center justify-between space-x-4 overflow-hidden rounded-xl border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full';
  
  const variants = {
    default: 'border-white/10 bg-gray-900/95 text-white',
    success: 'border-emerald-500/30 bg-emerald-900/30 text-white',
    error: 'border-red-500/30 bg-red-900/30 text-white',
  };

  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(baseStyles, variants[variant])}
      {...props}
    >
      <div className="grid gap-1">
        {title && <ToastPrimitives.Title className="text-sm font-semibold">{title}</ToastPrimitives.Title>}
        {description && <ToastPrimitives.Description className="text-sm opacity-90">{description}</ToastPrimitives.Description>}
      </div>
      <ToastPrimitives.Close className="absolute right-2 top-2 rounded-md p-1 text-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-gold">
        <X className="h-4 w-4" />
      </ToastPrimitives.Close>
    </ToastPrimitives.Root>
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

export { Toast };