import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Member } from '../types';
import { useStore } from '../store';
import { dangKyHoiVien } from '../lib/api';                  // ← THÊM MỚI
import { X, Gift, Award, Star, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const memberSchema = z.object({
  fullName: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  phone: z.string().regex(/^(0[35789])[0-9]{8}$/, "Số điện thoại không hợp lệ"),
  dob: z.string().optional(),
  gender: z.enum(['Nam', 'Nữ', 'Khác']).optional(),
  address: z.string().optional()
});

export default function MemberModal({ onClose }: { onClose: () => void }) {
  const { member, setMember, addToast } = useStore();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);         // ← THÊM MỚI

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      dob: '',
      gender: 'Nữ' as 'Nam' | 'Nữ' | 'Khác',
      address: ''
    }
  });

  // ← HÀM NÀY ĐÃ ĐƯỢC SỬA: gọi API thật, có loading state
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const result = await dangKyHoiVien({
        hoTen:       data.fullName,
        soDienThoai: data.phone,
        ngaySinh:    data.dob || '',
        gioiTinh:    data.gender || '',
        diaChi:      data.address || '',
      });

      if (result.success) {
        const newMember: Member = {
          'Mã HV':         result.maHV,
          'Họ tên':        data.fullName,
          'SĐT':           data.phone,
          'Điểm tích lũy': result.diemTichLuy || 10,
        };
        setMember(newMember);
        addToast('🎉 Đăng ký hội viên thành công! Tặng ngay 10 điểm.', 'success');
      } else {
        addToast(result.error || 'Đăng ký thất bại!', 'error');
      }
    } catch {
      addToast('Lỗi kết nối, thử lại sau!', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // ← HÀM NÀY BỊ THIẾU trong file cũ
  const logout = () => {
    setMember(null);
    addToast('Đã đăng xuất hội viên.', 'info');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-bg-dark/80 backdrop-blur-sm" />
        
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-lg bg-surface-dark border border-gold-500/30 rounded-2xl shadow-2xl overflow-hidden"
        >
          <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-bg-dark/50 hover:bg-gold-500 hover:text-bg-dark p-2 rounded-full text-cream-100 transition-colors">
            <X className="w-5 h-5" />
          </button>

          {member ? (
            <div className="p-8">
              <h3 className="text-2xl font-display font-bold text-cream-50 mb-6 text-center">Thẻ Hội Viên</h3>
              
              {/* Card Visual */}
              <div className="relative w-full aspect-[1.6/1] rounded-xl overflow-hidden mb-8 shadow-[0_10px_30px_rgba(200,146,42,0.2)]">
                <div className="absolute inset-0 bg-gradient-to-br from-surface-dark via-amber-900 to-crimson-800" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20 mix-blend-overlay" />
                <div className="absolute inset-0 border-[3px] border-gold-500/20 rounded-xl m-2 pointer-events-none" />
                
                <div className="relative h-full flex flex-col p-8">
                  <div className="flex justify-between items-start mb-auto">
                    <h4 className="font-display font-bold text-xl sm:text-2xl text-gold-500 drop-shadow-md">CÚT QUAY VIỆT</h4>
                    <span className="text-xs font-mono text-cream-200/50 tracking-wider">MEMBER</span>
                  </div>
                  
                  <div>
                    <p className="text-cream-200/60 text-xs mb-1 uppercase tracking-widest">Tên thành viên</p>
                    <p className="text-2xl font-display font-bold text-cream-50 uppercase tracking-widest drop-shadow-md mb-2">{member['Họ tên']}</p>
                    
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-lg border border-gold-500/20 backdrop-blur-md">
                        <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                        <span className="font-mono font-bold text-gold-500 text-lg">{member['Điểm tích lũy']}</span>
                        <span className="text-xs text-cream-100">C-Point</span>
                      </div>
                      <span className="font-mono text-cream-200/40 text-sm tracking-widest">{member['Mã HV']}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-bg-dark border border-gold-500/20 p-4 rounded-xl text-center">
                  <p className="text-xl font-bold text-cream-50 font-mono mb-1">{member['Điểm tích lũy']}</p>
                  <p className="text-xs text-cream-200/60">Điểm hiện tại</p>
                </div>
                <div className="bg-bg-dark border border-gold-500/20 p-4 rounded-xl text-center">
                  <p className="text-xl font-bold text-cream-50 font-mono mb-1">0</p>
                  <p className="text-xs text-cream-200/60">Phần quà đã đổi</p>
                </div>
              </div>

              <button onClick={logout} className="w-full py-3 rounded-xl border border-red-500/50 text-red-500 font-bold hover:bg-red-500/10 transition-colors">
                Đăng xuất
              </button>
            </div>
          ) : (
            <div className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-display font-bold text-gradient mb-2">Đăng Ký Hội Viên</h3>
                <p className="text-cream-200/70">Nhận ngay đặc quyền & ưu đãi hấp dẫn</p>
              </div>

              {!isRegistering ? (
                <div className="space-y-6">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3 text-cream-100">
                      <div className="mt-0.5 bg-gold-500/20 p-1.5 rounded-full text-gold-500 shrink-0"><Gift className="w-4 h-4" /></div>
                      <div><strong className="text-gold-400">Quà sinh nhật đặc biệt</strong><p className="text-sm text-cream-200/60">Giảm 20% tổng bill trong tháng sinh nhật</p></div>
                    </li>
                    <li className="flex items-start gap-3 text-cream-100">
                      <div className="mt-0.5 bg-gold-500/20 p-1.5 rounded-full text-gold-500 shrink-0"><Award className="w-4 h-4" /></div>
                      <div><strong className="text-gold-400">Tích điểm đổi quà</strong><p className="text-sm text-cream-200/60">Mỗi 10k = 1 điểm. Đổi cút quay miễn phí.</p></div>
                    </li>
                    <li className="flex items-start gap-3 text-cream-100">
                      <div className="mt-0.5 bg-gold-500/20 p-1.5 rounded-full text-gold-500 shrink-0"><Zap className="w-4 h-4" /></div>
                      <div><strong className="text-gold-400">Ưu tiên flash sale</strong><p className="text-sm text-cream-200/60">Thông báo sớm nhất các dịp xả hàng, sale lớn.</p></div>
                    </li>
                  </ul>

                  <button 
                    onClick={() => setIsRegistering(true)}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-500 to-amber-700 hover:from-gold-400 hover:to-gold-600 font-bold text-bg-dark shadow-lg transition-transform active:scale-95 text-lg"
                  >
                    Đăng ký & Nhận 10đ
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-cream-200/80 mb-1">Họ tên *</label>
                    <input {...register('fullName')} className="w-full px-4 py-2.5 bg-bg-dark border border-gold-500/20 rounded-xl text-cream-100 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all outline-none" placeholder="Nguyễn Văn A" />
                    {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message as string}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-cream-200/80 mb-1">Số điện thoại *</label>
                    <input {...register('phone')} type="tel" className="w-full px-4 py-2.5 bg-bg-dark border border-gold-500/20 rounded-xl text-cream-100 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all outline-none" placeholder="09xxxx..." />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message as string}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-cream-200/80 mb-1">Ngày sinh</label>
                      <input {...register('dob')} type="date" className="w-full px-4 py-2.5 bg-bg-dark border border-gold-500/20 rounded-xl text-cream-100 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-cream-200/80 mb-1">Giới tính</label>
                      <select {...register('gender')} className="w-full px-4 py-2.5 bg-bg-dark border border-gold-500/20 rounded-xl text-cream-100 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all outline-none">
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button type="button" onClick={() => setIsRegistering(false)} className="flex-1 py-3 rounded-xl border border-gold-500/30 text-gold-500 font-bold hover:bg-gold-500/10 transition-colors">
                      Quay lại
                    </button>
                    {/* ← disabled khi đang gửi lên server */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-[2] py-3 rounded-xl bg-gold-500 text-bg-dark font-bold hover:bg-gold-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading
                        ? <span className="animate-spin w-4 h-4 border-2 border-bg-dark border-t-transparent rounded-full" />
                        : 'Hoàn tất đăng ký'
                      }
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
