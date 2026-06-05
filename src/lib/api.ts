import { APPS_SCRIPT_URL, DEMO_MODE } from './utils';
import {
  demoStoreInfo, demoProducts, demoPromos,
  demoShopee, demoReviews
} from '../data';

// Helper: POST đến Apps Script
// Apps Script yêu cầu redirect:follow và KHÔNG set Content-Type header
async function postToGAS(payload: object) {
  const res = await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    redirect: 'follow',
    body: JSON.stringify(payload),
  });
  return res.json();
}

// ── LOAD DỮ LIỆU BAN ĐẦU ────────────────────────────────────
export async function loadStoreData() {
  if (DEMO_MODE || !APPS_SCRIPT_URL) {
    return {
      cuaHang: demoStoreInfo,
      sanPham: demoProducts,
      shopee:  demoShopee,
      suKien:  demoPromos,
    };
  }
  try {
    const res = await fetch(APPS_SCRIPT_URL + '?t=' + Date.now());
    const data = await res.json();
    if (data.success) return data;
    throw new Error(data.error);
  } catch {
    // Fallback về demo nếu lỗi
    return {
      cuaHang: demoStoreInfo,
      sanPham: demoProducts,
      shopee:  demoShopee,
      suKien:  demoPromos,
    };
  }
}

// ── ĐẶT HÀNG ────────────────────────────────────────────────
export async function datHang(payload: {
  maDon: string;
  hoTen: string;
  soDienThoai: string;
  hinhThuc: 'giaohang' | 'tulay';
  diaChiNhanHang?: string;
  ghiChu: string;
  phuongThucThanhToan: 'CODE' | 'CK';
  tongTien: number;
  cart: {
    SP_id: string;
    tenSanPham: string;
    danhMuc: string;
    donViTinh: string;
    soLuong: number;
    giaBan: number;
  }[];
}) {
  if (DEMO_MODE || !APPS_SCRIPT_URL) {
    // Giả lập thành công ở demo mode
    await new Promise(r => setTimeout(r, 800));
    return { success: true, maDon: payload.maDon };
  }
  return postToGAS({ action: 'datHang', ...payload });
}

// ── ĐĂNG KÝ HỘI VIÊN ────────────────────────────────────────
export async function dangKyHoiVien(payload: {
  hoTen: string;
  soDienThoai: string;
  ngaySinh?: string;
  gioiTinh?: string;
  diaChi?: string;
}) {
  if (DEMO_MODE || !APPS_SCRIPT_URL) {
    await new Promise(r => setTimeout(r, 600));
    return {
      success: true,
      maHV: 'HV' + Date.now().toString().slice(-6),
      hoTen: payload.hoTen,
      diemTichLuy: 10,
    };
  }
  return postToGAS({ action: 'dangKyHoiVien', ...payload });
}

// ── GỬI ĐÁNH GIÁ ────────────────────────────────────────────
export async function guiDanhGia(payload: {
  maDon?: string;
  soDienThoai?: string;
  tenSanPham: string;
  soSao: number;
  binhLuan: string;
}) {
  if (DEMO_MODE || !APPS_SCRIPT_URL) {
    await new Promise(r => setTimeout(r, 400));
    return { success: true };
  }
  return postToGAS({ action: 'guiDanhGia', ...payload });
}

// ── CHAT AI ──────────────────────────────────────────────────
export async function chatAI(history: { role: 'user' | 'assistant'; content: string }[]) {
  if (DEMO_MODE || !APPS_SCRIPT_URL) {
    await new Promise(r => setTimeout(r, 800));
    const q = history[history.length - 1]?.content?.toLowerCase() || '';
    if (q.includes('giá') || q.includes('bao nhiêu'))
      return { success: true, reply: 'Cút quay đặc biệt 8.000đ/con, cút thường 6.000đ/con. Combo 5 con + cơm chỉ 45.000đ thôi ạ!' };
    if (q.includes('ship') || q.includes('giao'))
      return { success: true, reply: 'Shop giao hàng tận nơi ạ, giao trong khoảng 30 phút tùy khu vực nha bạn!' };
    if (q.includes('hội viên') || q.includes('thành viên'))
      return { success: true, reply: 'Đăng ký hội viên hoàn toàn miễn phí, nhận ngay 10 điểm và nhiều ưu đãi. Bấm nút "Hội Viên" trên header nha bạn!' };
    return { success: true, reply: 'Xin chào! Shop chuyên cút quay vàng ươm giòn rụm. Bạn cần hỏi gì về menu, giao hàng hay ưu đãi không ạ?' };
  }
  return postToGAS({ action: 'chatAI', history });
}