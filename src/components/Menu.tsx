import { useState, useMemo } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface MenuProps {
  products: Product[];
  onOpenProduct: (product: Product) => void;
  searchQuery: string;
}

export default function Menu({ products, onOpenProduct, searchQuery }: MenuProps) {
  const [activeTab, setActiveTab] = useState('Tất cả');

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p['Danh mục']));
    return ['Tất cả', ...Array.from(cats)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch = p['Tên sản phẩm'].toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = activeTab === 'Tất cả' || p['Danh mục'] === activeTab;
      return matchSearch && matchCat;
    });
  }, [products, searchQuery, activeTab]);

  return (
    <section id="menu-section" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-3xl font-display font-bold text-gradient mb-2">Thực Đơn Đặc Sản</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"></div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto pb-4 mb-6 gap-2 hide-scrollbar sticky top-16 z-30 bg-bg-dark/80 backdrop-blur-md pt-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === cat 
                ? 'bg-gold-500 text-bg-dark shadow-[0_0_15px_rgba(200,146,42,0.4)]'
                : 'bg-surface-dark text-cream-200/80 hover:bg-surface-dark/80 hover:text-gold-400 border border-gold-500/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center text-cream-200/50">
          <p>Không tìm thấy món ăn nào!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.ID} 
              product={product} 
              onClick={onOpenProduct} 
              avgRating={4 + Math.random()} // random for demo
            />
          ))}
        </div>
      )}
    </section>
  );
}
