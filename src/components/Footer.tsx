import { StoreInfo } from '../types';
import Logo from './Logo';

export default function Footer({ storeInfo }: { storeInfo: StoreInfo }) {
  return (
    <footer className="border-t border-gold-500/20 bg-surface-dark pt-12 text-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <div className="flex items-center gap-3 mb-2">
            <Logo className="w-8 h-8 opacity-80" />
            <h3 className="font-display font-bold text-2xl text-gold-500">{storeInfo['Tên cửa hàng']}</h3>
          </div>
          <p className="text-sm text-cream-200/60 max-w-sm">{storeInfo['Slogan']}</p>
        </div>
        
        <div className="flex gap-4 sm:gap-8 text-sm font-medium text-cream-200/70">
          <a href="#" className="hover:text-gold-400 transition-colors">Trang chủ</a>
          <a href="#menu-section" className="hover:text-gold-400 transition-colors">Thực đơn</a>
          {storeInfo['Shopee Store'] && (
            <a href={storeInfo['Shopee Store']} target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">Shopee</a>
          )}
        </div>
      </div>
      
      <div className="border-t border-gold-500/10 py-6 text-center text-xs text-cream-200/40">
        &copy; {new Date().getFullYear()} {storeInfo['Tên cửa hàng']}. Thiết kế dành riêng.
      </div>
    </footer>
  );
}
