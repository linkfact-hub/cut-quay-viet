import { useStore } from '../store';
import { AnimatePresence, motion } from 'motion/react';
import { X, CheckCircle, Info, AlertTriangle } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useStore();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex flex-col gap-2 pointer-events-none w-full max-w-sm px-4">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl shadow-2xl border ${
              toast.type === 'success' ? 'bg-green-900/80 border-green-500/50' :
              toast.type === 'error' ? 'bg-red-900/80 border-red-500/50' :
              'bg-bg-dark/95 border-gold-500/50'
            } backdrop-blur-md`}
          >
            <div className="flex items-center gap-3">
              {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />}
              {toast.type === 'error' && <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-gold-500 shrink-0" />}
              <p className="text-sm font-medium text-cream-50">{toast.message}</p>
            </div>
            <button onClick={() => removeToast(toast.id)} className="text-cream-200/50 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
