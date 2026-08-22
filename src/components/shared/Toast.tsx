'use client';

import React from 'react';
import { useApp } from '@/lib/AppContext';
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => {
        let icon = <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />;
        let border = 'border-blue-200 bg-blue-50/95 text-blue-900';

        if (toast.type === 'success') {
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />;
          border = 'border-emerald-200 bg-emerald-50/95 text-emerald-950';
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />;
          border = 'border-amber-200 bg-amber-50/95 text-amber-950';
        } else if (toast.type === 'error') {
          icon = <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />;
          border = 'border-rose-200 bg-rose-50/95 text-rose-950';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-sm transition-all duration-300 transform translate-y-0 ${border}`}
          >
            {icon}
            <div className="flex-1 text-sm">
              <h5 className="font-semibold">{toast.title}</h5>
              <p className="mt-0.5 text-xs opacity-90 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
