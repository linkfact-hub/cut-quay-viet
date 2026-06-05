import { useState } from 'react';
import { Product, Review } from '../types';
import { formatGia, cn } from '../lib/utils';
import { X, Plus, Minus, Star, MessagesSquare } from 'lucide-react';
import { useStore } from '../store';
import { demoReviews } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart, addToast } = useStore();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'info' | 'reviews'>('info');

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart({ ...product, cartItemId: Date.now().toString(), quantity: qty });
    addToast(`Đã thêm ${qty} ${product['Đơn vị tính']} x ${product['Tên sản phẩm']}`, 'success');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-bg-dark/80 backdrop-blur-sm"
        />
        
        {/* Modal Content */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative bg-surface-dark border border-gold-500/30 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-bg-dark/50 hover:bg-gold-500 hover:text-bg-dark p-2 rounded-full text-cream-100 transition-colors backdrop-blur-md"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex-1 overflow-y-auto">
            <div className="aspect-video w-full bg-bg-dark relative">
              <img src={product['Link hình ảnh']} alt={product['Tên sản phẩm']} className="w-full h-full object-cover opacity-90" />
            </div>
            
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-start gap-4 mb-2">
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-cream-50">{product['Tên sản phẩm']}</h3>
                <p className="text-xl sm:text-2xl font-bold text-gold-500 font-mono whitespace-nowrap">{formatGia(product['Giá bán'])}</p>
              </div>

              <div className="flex items-center gap-3 text-sm text-cream-200/60 mb-6 pb-6 border-b border-gold-500/10">
                <span className="px-2 py-1 bg-gold-500/10 text-gold-500 rounded font-medium border border-gold-500/20">{product['Danh mục']}</span>
                <span>Phân loại: {product['Đơn vị tính']}</span>
              </div>

              {/* Tabs */}
              <div className="flex gap-4 mb-6">
                <button 
                  onClick={() => setActiveTab('info')}
                  className={cn("text-lg font-display font-bold pb-1 border-b-2 transition-colors", activeTab === 'info' ? "border-gold-500 text-gold-500" : "border-transparent text-cream-200/50 hover:text-cream-200")}
                >
                  Thông tin
                </button>
                <button 
                  onClick={() => setActiveTab('reviews')}
                  className={cn("text-lg font-display font-bold pb-1 border-b-2 transition-colors flex items-center gap-2", activeTab === 'reviews' ? "border-gold-500 text-gold-500" : "border-transparent text-cream-200/50 hover:text-cream-200")}
                >
                  <MessagesSquare className="w-4 h-4" /> Đánh giá
                </button>
              </div>

              {activeTab === 'info' && (
                <div className="animate-in fade-in zoom-in-95 duration-200">
                  <p className="text-cream-100/80 leading-relaxed min-h-[100px]">
                    {product['Mô tả'] || 'Hương vị gia truyền đặc trưng, lớp vỏ giòn rụm màu cánh gián bắt mắt, thịt bên trong mềm ngọt thấm vị. Món ăn nhất định phải thử tại Cút Quay Việt.'}
                  </p>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="animate-in fade-in zoom-in-95 duration-200 space-y-4">
                  <div className="flex items-center gap-4 p-4 border border-gold-500/20 rounded-xl bg-gold-500/5">
                     <div className="text-4xl font-display font-bold text-gold-500">4.5</div>
                     <div>
                       <div className="flex gap-1 mb-1">
                         {[1,2,3,4,5].map(i => <Star key={i} className={cn("w-4 h-4", i <= 4 ? "fill-gold-500 text-gold-500" : i === 5 ? "fill-gold-500/50 text-gold-500" : "text-gold-500/20")} />)}
                       </div>
                       <span className="text-xs text-cream-200/60">Dựa trên {demoReviews.length} đánh giá</span>
                     </div>
                  </div>
                  
                  <div className="space-y-4 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                    {demoReviews.map(r => (
                      <div key={r.ID} className="p-3 border-b border-gold-500/10">
                        <div className="flex items-center justify-between mb-2">
                           <span className="font-bold text-sm text-cream-100">{r['SĐT']}</span>
                           <span className="text-xs text-cream-200/50">{r['Thời gian']}</span>
                        </div>
                        <div className="flex gap-1 mb-2">
                          {Array.from({length: 5}).map((_, i) => <Star key={i} className={cn("w-3 h-3", i < r['Sao'] ? "fill-gold-500 text-gold-500" : "text-gold-500/30")} />)}
                        </div>
                        <p className="text-sm text-cream-200/80">{r['Bình luận']}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
          
          <div className="border-t border-gold-500/20 p-4 sm:p-6 bg-surface-dark flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 bg-bg-dark rounded-full p-1 border border-gold-500/20">
              <button 
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="p-2 hover:bg-gold-500/20 rounded-full text-gold-500 transition-colors"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="w-8 text-center font-bold text-lg text-cream-50">{qty}</span>
              <button 
                onClick={() => setQty(q => q + 1)}
                className="p-2 hover:bg-gold-500/20 rounded-full text-gold-500 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-gradient-to-r from-gold-500 to-amber-700 hover:from-gold-400 hover:to-gold-600 text-bg-dark font-bold py-3.5 px-6 rounded-full shadow-lg transition-transform active:scale-95 text-center"
            >
              Thêm • {formatGia(product['Giá bán'] * qty)}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
