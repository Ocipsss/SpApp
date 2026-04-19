# 📂 Folder: Public

## Deskripsi
Folder ini berisi aset statis yang akan disajikan secara langsung ke root aplikasi saat proses build. File di dalam folder ini **tidak akan diproses** oleh Vite (tidak ada minifikasi atau hashing nama file).

## Isi
- `icons/`: Berisi ikon aplikasi untuk kebutuhan PWA (ukuran 192x192, 512x512, dsb).
- `manifest.webmanifest`: File konfigurasi Progressive Web App (PWA) agar aplikasi dapat diinstal.
- `robots.txt`: Instruksi untuk mesin pencari (SEO).
- `vite.svg`: Logo atau aset statis lainnya.

## Alasan Penggunaan
- **Keamanan Nama File:** Menjamin file seperti manifest atau ikon PWA memiliki nama yang tetap agar bisa dideteksi oleh browser.
- **Direct Access:** File di sini dapat diakses langsung melalui URL root (contoh: `/robots.txt`).

> **Catatan:** Gunakan folder `src/assets/` jika file tersebut perlu di-import ke dalam file JavaScript/Vue.