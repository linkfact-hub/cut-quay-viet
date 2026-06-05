import { Product } from '../types';
import { formatGia, cn } from '../lib/utils';
import { Plus, Star } from 'lucide-react';
import { useStore } from '../store';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  avgRating?: number;
}

export default function ProductCard({ product, onClick, avgRating = 4.5 }: ProductCardProps) {
  const { addToCart, addToast } = useStore();
  const isOutOfStock = product['Trạng thái'] !== 'Còn hàng';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart({ ...product, cartItemId: Date.now().toString(), quantity: 1 });
    addToast(`Đã thêm ${product['Tên sản phẩm']} vào giỏ`, 'success');
  };

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      whileHover={!isOutOfStock ? { y: -4, borderColor: 'rgba(200, 146, 42, 0.8)', boxShadow: '0 8px 30px rgba(200,146,42,0.15)' } : {}}
      onClick={() => onClick(product)}
      className={cn(
        "group relative flex flex-col bg-surface-dark rounded-xl border border-gold-500/20 overflow-hidden cursor-pointer shadow-[0_4px_24px_rgba(200,146,42,0.05)] transition-all h-full",
        isOutOfStock && "opacity-60 cursor-not-allowed"
      )}
    >
      <div className="relative aspect-square w-full bg-amber-900/50 overflow-hidden">
        <img 
          src={product['Link hình ảnh']} 
          alt={product['Tên sản phẩm']}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-surface-dark/60 flex items-center justify-center backdrop-blur-[2px]">
            <span className="bg-red-500/80 text-white font-bold px-3 py-1 rounded-md text-sm">Hết hàng</span>
          </div>
        )}
        <div className="absolute top-2 left-2 bg-bg-dark/90 text-gold-400 text-xs font-semibold px-2 py-1 rounded border border-gold-500/30">
          {product['Danh mục']}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <h4 className="font-display font-semibold text-lg text-cream-50 leading-tight mb-1 group-hover:text-gold-400 transition-colors">
            {product['Tên sản phẩm']}
          </h4>
          <div className="flex items-center gap-1 text-xs text-cream-200/60 mb-1">
            <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
            <span className="font-medium text-gold-500">{avgRating.toFixed(1)}</span>
            <span>· 120+ đánh giá</span>
          </div>
          <p className="text-sm text-cream-200/50">ĐVT: {product['Đơn vị tính']}</p>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <p className="font-bold text-[1.1rem] text-gold-500 font-mono">
            {formatGia(product['Giá bán'])}
          </p>
          <button 
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="p-1.5 rounded-full bg-gold-500/10 text-gold-500 hover:bg-gold-500 hover:text-bg-dark transition-colors disabled:opacity-50"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
