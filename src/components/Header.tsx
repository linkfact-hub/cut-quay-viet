import { ShoppingCart, Search, User, Menu } from 'lucide-react';
import { StoreInfo } from '../types';
import { useStore } from '../store';
import { useState } from 'react';

import Logo from './Logo';

export default function Header({ storeInfo, onOpenMember }: { storeInfo: StoreInfo; onOpenMember: () => void }) {
  const { cart, setCartOpen, member, setSearchQuery } = useStore();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setSearchQuery(e.target.value);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-surface-dark/90 border-b border-gold-500/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Logo & Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <Logo className="w-10 h-10 shadow-[0_0_15px_rgba(200,146,42,0.3)] transition-transform hover:scale-105" />
          <div className="hidden sm:block">
            <h1 className="font-display font-bold text-xl text-gold-500 leading-tight">
              {storeInfo['Tên cửa hàng']}
            </h1>
            <p className="text-xs text-cream-200/70 truncate max-w-[200px]">
              {storeInfo['Slogan']}
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gold-500/50" />
          </div>
          <input
            type="text"
            placeholder="Tìm món..."
            value={searchValue}
            onChange={handleSearch}
            className="w-full pl-9 pr-4 py-2 bg-bg-dark border border-gold-500/20 rounded-full text-sm text-cream-100 placeholder-gold-500/30 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 transition-all"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button 
            onClick={onOpenMember}
            className="flex items-center gap-2 hover:bg-gold-500/10 p-2 rounded-lg transition-colors border border-transparent hover:border-gold-500/30"
          >
            <div className="bg-gold-500/20 p-1.5 rounded-full text-gold-500">
              <User className="h-4 w-4" />
            </div>
            {member ? (
              <div className="hidden md:block text-right">
                <p className="text-xs font-bold text-gold-500">{member['Điểm tích lũy']} điểm</p>
                <p className="text-[10px] text-cream-200/60 uppercase">{member['Họ tên']}</p>
              </div>
            ) : (
              <span className="hidden md:block text-sm text-gold-500 font-medium">Hội viên</span>
            )}
          </button>

          <button 
            onClick={() => setCartOpen(true)}
            className="relative p-2 text-cream-100 hover:text-gold-500 transition-colors"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-crimson-600 text-cream-50 text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </button>
        </div>
        
      </div>
    </header>
  );
}
