import { Product, StoreInfo, Promo, ShopeeItem, Review } from './types';

export const demoStoreInfo: StoreInfo = {
  'Tên cửa hàng': 'Cút Quay Việt',
  'Slogan': 'Cút quay đặc sản – Vàng ươm – Giòn rụm 🔥',
  'Địa chỉ': '123 Đường ABC, Phường XYZ, TP.HCM',
  'Số điện thoại': '0909123456',
  'Zalo': '0909123456',
  'Giờ mở cửa': '6:00 – 21:00 mỗi ngày',
  'Logo URL': 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=400&auto=format&fit=crop',
  'Hero Banner URL': '/Banner.png',
  'Mô tả ngắn': 'Cút quay giòn rụm, gia vị bí truyền – Giao hàng 30 phút',
  'Tên ngân hàng': 'Vietcombank',
  'Mã ngân hàng': 'VCB',
  'Số tài khoản': '1234567890',
  'Tên chủ TK': 'NGUYEN VAN A',
  'Shopee Store': 'https://shopee.vn/cutquayviet',
  'Facebook': 'https://facebook.com/cutquayviet',
  'Google Maps Embed URL': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5138139572412!2d106.69758001533427!3d10.772594692323671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f40a3b3b1bf%3A0x8053a473a216d1ba!2sBen%20Thanh%20Market!5e0!3m2!1sen!2s!4v1652331575791!5m2!1sen!2s'
};

export const demoProducts: Product[] = [
  { ID:"CQ001", "Tên sản phẩm":"Cút Quay Đặc Biệt", "Danh mục":"Cút Quay", "Giá bán":8000, "Đơn vị tính":"Con", "Link hình ảnh":"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600", "Trạng thái":"Còn hàng" },
  { ID:"CQ002", "Tên sản phẩm":"Cút Quay Thường", "Danh mục":"Cút Quay", "Giá bán":6000, "Đơn vị tính":"Con", "Link hình ảnh":"https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&w=600", "Trạng thái":"Còn hàng" },
  { ID:"CB001", "Tên sản phẩm":"Combo 5 Con + Cơm", "Danh mục":"Combo", "Giá bán":45000, "Đơn vị tính":"Phần", "Link hình ảnh":"https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600", "Trạng thái":"Còn hàng" },
  { ID:"CB002", "Tên sản phẩm":"Combo 10 Con", "Danh mục":"Combo", "Giá bán":75000, "Đơn vị tính":"Hộp", "Link hình ảnh":"https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=600", "Trạng thái":"Còn hàng" },
  { ID:"DU001", "Tên sản phẩm":"Nước Ngọt Lon", "Danh mục":"Đồ uống", "Giá bán":10000, "Đơn vị tính":"Lon", "Link hình ảnh":"https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600", "Trạng thái":"Còn hàng" },
  { ID:"DU002", "Tên sản phẩm":"Trà Đá", "Danh mục":"Đồ uống", "Giá bán":5000, "Đơn vị tính":"Ly", "Link hình ảnh":"https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600", "Trạng thái":"Còn hàng" },
  { ID:"CQ003", "Tên sản phẩm":"Cút Luộc Lá Chanh", "Danh mục":"Cút Luộc", "Giá bán":5000, "Đơn vị tính":"Con", "Link hình ảnh":"https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=600", "Trạng thái":"Còn hàng" },
  { ID:"CQ004", "Tên sản phẩm":"Cút Chiên Giòn", "Danh mục":"Cút Chiên", "Giá bán":7000, "Đơn vị tính":"Con", "Link hình ảnh":"https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600", "Trạng thái":"Hết hàng" },
];

export const demoPromos: Promo[] = [
  { ID: "PR1", "Tiêu đề": "Giảm 20% cho thành viên mới", "Loại": "giamgia", "Mô tả": "Đăng ký thành viên nhận ngay ưu đãi.", "Nhãn nổi bật": "HOT", "Màu nền": "from-crimson-800 to-amber-900" },
  { ID: "PR2", "Tiêu đề": "Mua 10 tặng 1", "Loại": "quatang", "Mô tả": "Mua 10 cút quay được tặng thêm 1 con.", "Màu nền": "from-gold-600 to-amber-800" },
];

export const demoShopee: ShopeeItem[] = [
  { ID: "S1", "Tên sản phẩm": "Sốt chấm cút quay đặc biệt (Chai 500ml)", "Hình ảnh": "https://placehold.co/200x200/EE4D2D/FFFFFF?text=Sot", "Link Affiliate": "https://shopee.vn" },
  { ID: "S2", "Tên sản phẩm": "Gia vị ướp cút quay bí truyền", "Hình ảnh": "https://placehold.co/200x200/EE4D2D/FFFFFF?text=Gia+vi", "Link Affiliate": "https://shopee.vn" }
];

export const demoReviews: Review[] = [
  { ID: "R1", "SĐT": "090***123", "Tên SP": "Cút Quay Đặc Biệt", "Sao": 5, "Bình luận": "Rất ngon, giòn rụm!", "Thời gian": "10/05/2026" },
  { ID: "R2", "SĐT": "091***456", "Tên SP": "Combo 5 Con + Cơm", "Sao": 4, "Bình luận": "Cơm hơi ít nhưng cút rất thấm vị.", "Thời gian": "09/05/2026" },
];
