# 📂 Folder: Assets

## Deskripsi
Folder ini digunakan untuk menyimpan aset statis (gambar, font, gaya) yang akan **diproses oleh Vite**. File di sini biasanya di-import langsung ke dalam komponen Vue atau file CSS.

## Isi
- `images/`: Logo aplikasi, ilustrasi (SVG/PNG/JPG).
- `styles/`: File CSS global, variabel warna, atau konfigurasi Tailwind tambahan.
- `fonts/`: File font lokal (jika tidak menggunakan Google Fonts).

## Alasan Penggunaan
- **Optimization:** Vite akan melakukan optimasi (seperti minifikasi gambar) dan memberikan *hash* unik pada nama file saat build untuk menghindari masalah *caching* di browser.
- **Base64 Encoding:** Gambar berukuran kecil bisa otomatis diubah menjadi *inline strings* oleh Vite untuk mengurangi jumlah request HTTP.

> **Catatan:** Jangan menaruh file yang namanya tidak boleh berubah (seperti icon PWA) di sini. Gunakan folder `public/` untuk kebutuhan tersebut.