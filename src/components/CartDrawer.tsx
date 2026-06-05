import { useStore } from '../store';
import { formatGia } from '../lib/utils';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CartDrawer({ onCheckout }: { onCheckout: () => void }) {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQuantity, clearCart } = useStore();
  
  const total = cart.reduce((sum, item) => sum + item['Giá bán'] * item.quantity, 0);

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setCartOpen(false)}
        className="absolute inset-0 bg-bg-dark/70 backdrop-blur-sm"
      />
      
      {/* Drawer */}
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-md h-full bg-surface-dark border-l border-gold-500/30 flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gold-500/20 bg-bg-dark/50">
          <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-gold-500/10 rounded-full text-cream-200 transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-gold-500">
            <ShoppingBag className="w-5 h-5" />
            <h3 className="font-display font-bold text-xl">Giỏ Hàng</h3>
          </div>
          {cart.length > 0 ? (
            <button onClick={clearCart} className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors">Xóa hết</button>
          ) : <div className="w-9"></div>}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
          <AnimatePresence>
            {cart.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center opacity-60"
              >
                <div className="w-32 h-32 mb-6 bg-gold-500/10 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-12 h-12 text-gold-500" />
                </div>
                <p className="text-xl font-display font-bold text-cream-100 mb-2">Giỏ hàng trống</p>
                <p className="text-sm text-cream-200/60">Hãy chọn vài món ngon nhé!</p>
                <button 
                  onClick={() => setCartOpen(false)}
                  className="mt-6 px-6 py-2 rounded-full border border-gold-500 text-gold-500 font-medium hover:bg-gold-500 hover:text-bg-dark transition-colors"
                >
                  Xem thực đơn
                </button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                    key={item.cartItemId} 
                    className="flex gap-4 p-3 rounded-xl bg-bg-dark border border-gold-500/20"
                  >
                    <img src={item['Link hình ảnh']} alt={item['Tên sản phẩm']} className="w-20 h-20 rounded-lg object-cover" />
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-medium text-cream-50 text-sm leading-tight">{item['Tên sản phẩm']}</h4>
                        <button onClick={() => removeFromCart(item.cartItemId)} className="text-cream-200/40 hover:text-red-400 transition-colors p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-cream-200/50 mt-1">ĐVT: {item['Đơn vị tính']}</p>
                      
                      <div className="flex justify-between items-end mt-auto pt-2">
                        <p className="font-bold text-gold-500">{formatGia(item['Giá bán'])}</p>
                        <div className="flex items-center gap-2 bg-surface-dark rounded-lg p-1 border border-gold-500/20">
                          <button onClick={() => updateQuantity(item.cartItemId, -1)} className="text-cream-200 hover:text-gold-500 p-1">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-bold text-cream-50">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.cartItemId, 1)} className="text-cream-200 hover:text-gold-500 p-1">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-gold-500/20 bg-bg-dark">
            <div className="flex justify-between mb-4">
              <span className="text-cream-200/70">Tổng cộng</span>
              <span className="text-xl font-bold text-gold-500 font-mono">{formatGia(total)}</span>
            </div>
            <button 
              onClick={() => {
                setCartOpen(false);
                onCheckout();
              }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-500 to-amber-700 hover:from-gold-400 hover:to-gold-600 font-bold text-bg-dark shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              Tiến hành thanh toán <ShoppingBag className="w-5 h-5" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
