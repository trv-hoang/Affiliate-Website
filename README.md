# 🌸 Beauty & Lifestyle Product Showcase

Website giới thiệu sản phẩm với theme hồng pastel, responsive mobile, sử dụng Google Sheets làm database.

## ✨ Features

- 🎨 **Theme hồng pastel** đẹp mắt, hiện đại
- 📱 **Responsive** hoàn hảo cho mobile
- 🚀 **Lazy loading** images cho performance tối ưu
- 📊 **Google Sheets** làm database - dễ dàng cập nhật
- 🔗 **Share button** chia sẻ link website
- ⚡ **Vite + React** siêu nhanh

## 🔧 Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Google Sheets

#### Cấu trúc Sheet cần tạo:

**Sheet 1: "Profile"**
```
Field    | Value
---------|--------------------------------
name     | Your Name
title    | Your Title/Bio
avatar   | https://your-avatar-url.jpg
youtube  | https://youtube.com/@...
facebook | https://facebook.com/...
tiktok   | https://tiktok.com/@...
```

**Sheet 2: "Products"**
```
ID | Name | Image | Link | Order | Active
---|------|-------|------|-------|-------
1  | Sản phẩm A | https://... | https://shopee.vn/... | 1 | TRUE
2  | Sản phẩm B | https://... | https://lazada.vn/... | 2 | TRUE
```

#### Share Sheet Publicly:
1. Click "Share" → "Anyone with the link can view"
2. Copy Sheet ID từ URL: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`

### 3. Configure .env

```env
VITE_SHEET_ID=your_sheet_id_here
```

### 4. Run Development

```bash
npm run dev
```

Website chạy tại: http://localhost:5173

## 📝 Cập nhật sản phẩm

1. Mở Google Sheet
2. Edit trực tiếp (Add/Edit/Delete products)
3. Save
4. Website tự động fetch data mới (cache 5 phút)

## 🚀 Deploy

### Vercel (Recommended)
1. Push to GitHub
2. Import vào Vercel
3. Add env: `VITE_SHEET_ID`
4. Deploy!

## 📂 Structure

```
src/
├── components/common/    # Reusable components
├── hooks/               # Custom hooks
├── pages/               # Pages
├── services/            # API services
└── styles/              # Theme & CSS
```

## 🐛 Troubleshooting

**Sheet không load?**
- Check sheet đã public chưa
- Sheet ID đúng chưa
- Cấu trúc sheet đúng format chưa

**Images không hiển thị?**
- URL phải public
- Recommend: Imgur, Google Drive (public), Cloudinary

---

Made with 💖 and React
