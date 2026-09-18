import React from 'react';
import { useCommerce } from '../context/CommerceContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCommerce();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[2000] flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between p-3.5 bg-[#1a1c18] text-[#f2f2ef] rounded-2xl shadow-[0_12px_32px_rgba(26,28,24,0.25)] border border-white/10 text-xs font-sans transition-all transform translate-y-0"
        >
          <div className="flex items-center gap-2.5">
            {toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            ) : toast.type === 'info' ? (
              <Info className="w-4 h-4 text-[#dac5a7] flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-[#757d5c] flex-shrink-0" />
            )}
            <span className="font-medium text-[#f2f2ef]">{toast.message}</span>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 text-white/50 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
