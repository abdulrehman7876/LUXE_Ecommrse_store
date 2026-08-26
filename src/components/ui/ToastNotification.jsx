import { CheckCircle, AlertCircle, Info, X } from "lucide-react";
import { useEffect } from "react";
import { useApp } from "../../hooks/useApp";

function Toast({ toast, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(toast.id), 3500);
    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-600" />,
    error: <AlertCircle className="h-5 w-5 text-red-600" />,
    info: <Info className="h-5 w-5 text-brand-600" />,
  };

  return (
    <div
      role="alert"
      className="flex items-center gap-3 rounded-xl border border-brand-200 bg-white px-4 py-3 shadow-lg transition-all duration-300"
    >
      {icons[toast.type] || icons.info}
      <p className="flex-1 text-sm font-medium text-brand-800">
        {toast.message}
      </p>
      <button
        onClick={() => onClose(toast.id)}
        className="text-brand-400 hover:text-brand-600"
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function ToastNotification() {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 sm:bottom-6 sm:right-6">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={removeToast} />
      ))}
    </div>
  );
}
