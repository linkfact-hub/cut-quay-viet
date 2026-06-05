import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useStore } from '../store';
import { StoreInfo } from '../types';
import { formatGia, generateOrderCode } from '../lib/utils';
import { datHang } from '../lib/api';
import { X, CheckCircle, Smartphone, Truck, Store, CreditCard, Banknote, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Tên bắt buộc"),
  phone: z.string().regex(/^(0[35789])[0-9]{8}$/, "Số điện thoại không hợp lệ"),
  method: z.enum(['giaohang', 'tulay']),
  address: z.string().optional(),
  note: z.string().optional(),
}).refine(data => {
  if (data.method === 'giaohang' && !data.address) return false;
  return true;
}, {
  message: "Vui lòng nhập địa chỉ giao hàng",
  path: ["address"]
});

export default function CheckoutModal({ storeInfo, onClose }: { storeInfo: StoreInfo, onClose: () => void }) {
  const { cart, clearCart, member, addToast } = useStore();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [paymentMethod, setPaymentMethod] = useState<'CODE' | 'CK'>('CODE');
  const [orderCode, setOrderCode] = useState(() => generateOrderCode());

  const total = cart.reduce((sum, item) => sum + item['Giá bán'] * item.quantity, 0);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: member ? member['Họ tên'] : '',
      phone: member ? member['SĐT'] : '',
      method: "giaohang" as 'giaohang' | 'tulay',
      address: '',
      note: ''
    }
  });

  const methodVal = watch('method');
  const [isLoading, setIsLoading] = useState(false);

  const onProceed = () => {
    setStep(2);
  };

  const onConfirmOrder = async () => {
    const formVals = watch();
    setIsLoading(true);
    try {
      const result = await datHang({
        maDon: orderCode,
        hoTen: formVals.fullName,
        soDienThoai: formVals.phone,
        hinhThuc: formVals.method as 'giaohang' | 'tulay',
        diaChiNhanHang: formVals.address || '',
        ghiChu: formVals.note || '',
        phuongThucThanhToan: paymentMethod,
        tongTien: total,
        cart: cart.map(item => ({
          SP_id:      item.ID,
          tenSanPham: item['Tên sản phẩm'],
          danhMuc:    item['Danh mục'],
          donViTinh:  item['Đơn vị tính'],
          soLuong:    item.quantity,
          giaBan:     item['Giá bán'],
        })),
      });

      if (result.success) {
        clearCart();
        setStep(3);
      } else {
        addToast('Đặt hàng thất bại: ' + (result.error || 'Lỗi không xác định'), 'error');
      }
    } catch {
      addToast('Lỗi kết nối, thử lại sau nhé!', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const getVietQrUrl = () => {
    const bankCode = storeInfo['Mã ngân hàng'];
    const accNumber = storeInfo['Số tài khoản'];
    const accName = encodeURIComponent(storeInfo['Tên chủ TK']);
    return `https://img.vietqr.io/image/${bankCode}-${accNumber}-compact2.png?amount=${total}&addInfo=${orderCode}&accountName=${accName}`;
  };

  // Prevent rendering if cart is empty and we aren't in success step
  if (cart.length === 0 && step !== 3) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-bg-dark/80 backdrop-blur-sm" />
        
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-lg bg-surface-dark border border-gold-500/30 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {step !== 3 && (
            <div className="p-4 border-b border-gold-500/20 bg-bg-dark flex justify-between items-center">
              <h3 className="font-display font-bold text-xl text-cream-50">Thanh Toán ({step}/2)</h3>
              <button onClick={onClose} className="p-2 hover:bg-gold-500/20 rounded-full text-cream-200 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
            {step === 1 && (
              <form id="info-form" onSubmit={handleSubmit(onProceed)} className="space-y-5">
                <div className="space-y-4">
                  <h4 className="font-bold text-gold-500 mb-2">Thông tin liên hệ</h4>
                  <div>
                    <input {...register('fullName')} className="w-full px-4 py-3 bg-bg-dark border border-gold-500/20 rounded-xl text-cream-100 focus:border-gold-500 outline-none" placeholder="Họ tên người nhận *" />
                    {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message as string}</p>}
                  </div>
                  <div>
                    <input {...register('phone')} type="tel" className="w-full px-4 py-3 bg-bg-dark border border-gold-500/20 rounded-xl text-cream-100 focus:border-gold-500 outline-none" placeholder="Số điện thoại *" />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message as string}</p>}
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-gold-500/10">
                  <h4 className="font-bold text-gold-500 mb-2">Hình thức nhận hàng</h4>
                  <div className="flex gap-4">
                    <label className={`flex-1 flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${methodVal === 'giaohang' ? 'border-gold-500 bg-gold-500/10 text-gold-500' : 'border-gold-500/20 bg-bg-dark text-cream-200/60 hover:border-gold-500/50'}`}>
                      <input type="radio" value="giaohang" {...register('method')} className="hidden" />
                      <Truck className="w-6 h-6 mb-2" />
                      <span className="font-medium">Giao hàng</span>
                    </label>
                    <label className={`flex-1 flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${methodVal === 'tulay' ? 'border-gold-500 bg-gold-500/10 text-gold-500' : 'border-gold-500/20 bg-bg-dark text-cream-200/60 hover:border-gold-500/50'}`}>
                      <input type="radio" value="tulay" {...register('method')} className="hidden" />
                      <Store className="w-6 h-6 mb-2" />
                      <span className="font-medium">Tự đến lấy</span>
                    </label>
                  </div>

                  {methodVal === 'giaohang' ? (
                    <div>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gold-500/50" />
                        <input {...register('address')} className="w-full pl-10 pr-4 py-3 bg-bg-dark border border-gold-500/20 rounded-xl text-cream-100 focus:border-gold-500 outline-none" placeholder="Địa chỉ nhận hàng cụ thể *" />
                      </div>
                      {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address.message as string}</p>}
                    </div>
                  ) : (
                    <div className="p-4 bg-gold-500/10 rounded-xl border border-gold-500/20 font-medium">
                      <p className="text-sm text-gold-400 mb-1">Pick-up tại cửa hàng:</p>
                      <p className="text-cream-100">{storeInfo['Địa chỉ']}</p>
                    </div>
                  )}

                  <textarea {...register('note')} rows={2} className="w-full px-4 py-3 bg-bg-dark border border-gold-500/20 rounded-xl text-cream-100 focus:border-gold-500 outline-none resize-none" placeholder="Ghi chú thêm (VD: ít cay, lấy thêm muỗng...)" />
                </div>
              </form>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="bg-bg-dark p-4 rounded-xl border border-gold-500/20">
                  <h4 className="font-bold text-cream-50 mb-3 border-b border-gold-500/20 pb-2">Đơn hàng của bạn</h4>
                  <div className="space-y-2 mb-3 max-h-40 overflow-y-auto custom-scrollbar pr-2">
                     {cart.map(i => (
                       <div key={i.cartItemId} className="flex justify-between items-start text-sm">
                         <span className="text-cream-100">{i.quantity}x {i['Tên sản phẩm']}</span>
                         <span className="text-cream-200/70 font-mono whitespace-nowrap ml-4">{formatGia(i['Giá bán'] * i.quantity)}</span>
                       </div>
                     ))}
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold text-gold-500 pt-2 border-t border-gold-500/20">
                    <span>Tổng tiền</span>
                    <span className="font-mono">{formatGia(total)}</span>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-gold-500/10">
                  <h4 className="font-bold text-gold-500 mb-2">Phương thức thanh toán</h4>
                  
                  <div className="space-y-3">
                    <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'CODE' ? 'border-gold-500 bg-gold-500/10' : 'border-gold-500/20 bg-bg-dark'}`}>
                      <input type="radio" value="CODE" checked={paymentMethod === 'CODE'} onChange={() => setPaymentMethod('CODE')} className="hidden" />
                      <Banknote className={`w-6 h-6 ${paymentMethod === 'CODE' ? 'text-gold-500' : 'text-cream-200/50'}`} />
                      <div className="flex-1">
                        <p className={`font-medium ${paymentMethod === 'CODE' ? 'text-gold-500' : 'text-cream-100'}`}>Thanh toán khi nhận hàng (COD)</p>
                        <p className="text-xs text-cream-200/60">Chỉ thanh toán khi nhận đủ món</p>
                      </div>
                    </label>

                    <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'CK' ? 'border-gold-500 bg-gold-500/10' : 'border-gold-500/20 bg-bg-dark'}`}>
                      <input type="radio" value="CK" checked={paymentMethod === 'CK'} onChange={() => setPaymentMethod('CK')} className="hidden" />
                      <CreditCard className={`w-6 h-6 ${paymentMethod === 'CK' ? 'text-gold-500' : 'text-cream-200/50'}`} />
                      <div className="flex-1">
                        <p className={`font-medium ${paymentMethod === 'CK' ? 'text-gold-500' : 'text-cream-100'}`}>Chuyển khoản / Quét mã QR</p>
                        <p className="text-xs text-cream-200/60">Tự động nhận diện đơn hàng</p>
                      </div>
                    </label>
                  </div>
                  
                  {paymentMethod === 'CK' && (
                     <div className="bg-bg-dark p-4 rounded-xl border border-gold-500/20 mt-4 flex flex-col items-center gap-4 text-center">
                       <div className="bg-white p-3 rounded-xl shrink-0 w-48 h-48 sm:w-56 sm:h-56">
                         <img src={getVietQrUrl()} className="w-full h-full object-contain" alt="QR Code" />
                       </div>
                       <div className="text-sm flex flex-col justify-center items-center w-full">
                         <p className="text-cream-200/70 mb-1">Ngân hàng: <strong className="text-cream-100">{storeInfo['Tên ngân hàng']}</strong></p>
                         <p className="text-cream-200/70 mb-1">Số TK: <strong className="text-cream-100 font-mono tracking-wider text-base">{storeInfo['Số tài khoản']}</strong></p>
                         <p className="text-cream-200/70 mb-3">Chủ TK: <strong className="text-cream-100 uppercase">{storeInfo['Tên chủ TK']}</strong></p>
                         <div className="w-full bg-red-500/10 text-red-400 p-3 rounded-lg border border-red-500/20 text-xs sm:text-sm italic">
                           Vui lòng quét mã trên để thanh toán. Chúng tôi sẽ gọi xác nhận sau.
                         </div>
                       </div>
                     </div>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="py-8 flex flex-col items-center text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 15 }} className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </motion.div>
                <h3 className="text-3xl font-display font-bold text-gradient mb-2">Đặt Hàng Thành Công!</h3>
                <p className="text-cream-100 mb-6 max-w-sm">Mã đơn hàng của bạn là <strong className="text-gold-500 font-mono tracking-wider">{orderCode}</strong>. Cửa hàng sẽ sớm liên hệ xác nhận đơn hàng.</p>
                
                <div className="w-full space-y-3">
                  <a href={`tel:${storeInfo['Số điện thoại']}`} target="_top" className="relative z-10 flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-gold-500 to-amber-700 font-bold text-bg-dark rounded-xl shadow-lg cursor-pointer">
                     <Smartphone className="w-5 h-5" /> Gọi điện hỏi lại
                  </a>
                  <button onClick={onClose} className="w-full py-3.5 rounded-xl border border-gold-500/30 text-gold-500 font-bold hover:bg-gold-500/10 transition-colors">
                     Tiếp tục mua hàng
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {step !== 3 && (
            <div className="border-t border-gold-500/20 p-4 sm:p-5 bg-bg-dark flex gap-3">
               {step === 2 && (
                 <button type="button" onClick={() => setStep(1)} disabled={isLoading} className="px-6 py-3.5 rounded-xl border border-gold-500/30 text-gold-500 font-bold hover:bg-gold-500/10 transition-colors disabled:opacity-50">
                    Trở lại
                 </button>
               )}
               <button 
                 type={step === 1 ? 'submit' : 'button'}
                 form={step === 1 ? 'info-form' : undefined}
                 onClick={step === 2 ? onConfirmOrder : undefined}
                 disabled={isLoading}
                 className="flex-1 bg-gradient-to-r from-gold-500 to-amber-700 hover:from-gold-400 hover:to-gold-600 text-bg-dark font-bold py-3.5 px-6 rounded-xl shadow-lg transition-transform active:scale-95 text-center flex items-center justify-center gap-2 disabled:opacity-50 disabled:active:scale-100"
               >
                 {isLoading 
                   ? 'Đang xử lý...' 
                   : <>{step === 1 ? 'Tiếp tục' : 'Xác nhận đặt hàng'} <CheckCircle className="w-5 h-5" /></>
                 }
               </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
