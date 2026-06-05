import { StoreInfo } from '../types';
import { Clock, MapPin, Phone, Star } from 'lucide-react';
import { motion } from 'motion/react';

import Logo from './Logo';

export default function Hero({ storeInfo }: { storeInfo: StoreInfo }) {
  const isShopOpen = () => {
    // Basic check for demo
    const hour = new Date().getHours();
    return hour >= 6 && hour < 21; // Assuming 6:00 - 21:00
  };

  const isOpen = isShopOpen();

  return (
    <section className="relative w-full min-h-[400px] flex items-center justify-center overflow-hidden border-b border-gold-500/20 shadow-[0_4px_24px_rgba(200,146,42,0.08)]">
      {/* Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={
          storeInfo['Hero Banner URL'] 
            ? { backgroundImage: `url(${storeInfo['Hero Banner URL']})` }
            : { backgroundImage: 'linear-gradient(to bottom right, #1A0A00, #2D1500)' }
        }
      >
        <div className="absolute inset-0 bg-bg-dark/50 sm:bg-bg-dark/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex flex-col items-center text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Logo className="w-24 h-24 sm:w-32 sm:h-32 shadow-[0_0_30px_rgba(200,146,42,0.3)] transition-transform hover:scale-105" />
        </motion.div>
        
        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-5xl sm:text-7xl font-display font-bold text-gradient mb-4 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] px-6 py-2 bg-black/40 backdrop-blur-md rounded-2xl inline-block border border-gold-500/20">
            {storeInfo['Tên cửa hàng']}
          </h2>
          <p className="text-lg sm:text-xl text-cream-200/80 mb-6 font-display italic">
            {storeInfo['Slogan']}
          </p>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-3 mb-8"
        >
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${isOpen ? 'bg-green-500/10 text-green-400 border-green-500/30' : 'bg-red-500/10 text-red-400 border-red-500/30'}`}>
            {isOpen ? '● Đang mở cửa' : '● Đã đóng cửa'}
          </span>
          <span className="px-3 py-1 rounded-full text-sm bg-surface-dark border border-gold-500/20 text-cream-100">
            🛵 Giao hàng nhanh
          </span>
          <span className="px-3 py-1 rounded-full text-sm bg-surface-dark border border-gold-500/20 text-cream-100">
            🔥 Cút quay tươi ngày
          </span>
          <span className="px-3 py-1 rounded-full text-sm bg-surface-dark border border-gold-500/20 text-cream-100">
            ⭐ Đặc sản Việt
          </span>
        </motion.div>

        <motion.button 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          onClick={() => document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-gradient-to-r from-gold-500 to-amber-700 hover:from-gold-400 hover:to-gold-600 text-bg-dark font-bold text-lg px-8 py-3 rounded-full shadow-[0_0_20px_rgba(200,146,42,0.4)] transition-all transform hover:scale-105 active:scale-95"
        >
          Đặt Món Ngay
        </motion.button>
      </div>
    </section>
  );
}
