import { Promo } from '../types';
import { Clock } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export default function Promos({ promos }: { promos: Promo[] }) {
  if (!promos || promos.length === 0) return null;

  return (
    <section className="py-8 bg-surface-dark/50 border-b border-gold-500/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-xl font-display font-bold text-gold-500 mb-4 px-2">Sự kiện & Ưu đãi</h3>
        <div className="flex overflow-x-auto pb-4 gap-4 snap-x hide-scrollbar">
          {promos.map((promo, idx) => (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              key={promo.ID}
              className={cn(
                "relative min-w-[280px] sm:min-w-[320px] rounded-xl p-5 shrink-0 snap-start bg-gradient-to-br border border-gold-500/30 overflow-hidden",
                promo['Màu nền'] || 'from-surface-dark to-bg-dark'
              )}
            >
              <div className="absolute top-0 right-0 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>

              {promo['Nhãn nổi bật'] && (
                <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {promo['Nhãn nổi bật']}
                </span>
              )}
              <h4 className="text-lg font-bold text-cream-50 font-display mb-1">{promo['Tiêu đề']}</h4>
              <p className="text-sm text-cream-100/80 mb-4">{promo['Mô tả']}</p>
              
              {promo['Ngày kết thúc'] && (
                <div className="flex items-center gap-1.5 text-xs font-medium text-gold-300">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Kết thúc: {promo['Ngày kết thúc']}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
