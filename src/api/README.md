# 📂 Folder: API

## Deskripsi
Folder ini berfungsi sebagai gerbang utama (Gateway) untuk semua komunikasi data dengan layanan eksternal atau cloud. Semua fungsi yang melakukan *network request* dikumpulkan di sini.

## Isi
- **Konfigurasi Client:** Inisialisasi Axios instance atau Firebase App SDK.
- **Service Functions:** Fungsi-fungsi seperti `getProducts()`, `postTransaction()`, atau `fetchInventory()`.
- **Interceptors:** Logika untuk menangani token autentikasi atau handling error global (misal: otomatis logout jika token expired).

## Alasan Penggunaan
- **Centralized Network Logic:** Jika URL API berubah, kamu hanya perlu mengubahnya di satu tempat, bukan di setiap komponen.
- **Clean Components:** Komponen Vue tidak perlu tahu detail teknis cara mengambil data; mereka cukup memanggil fungsi dari folder ini.
- **Error Handling:** Memudahkan penerapan logika *retry* atau notifikasi error yang seragam di seluruh aplikasi.

> **Tips:** Karena proyek ini menggunakan Firebase, gunakan folder ini untuk membungkus (wrapping) fungsi Firestore agar logika database cloud tidak tercampur dengan logika tampilan.