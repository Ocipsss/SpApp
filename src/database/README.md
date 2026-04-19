# 📂 Folder: Database (Local Storage)

## Deskripsi
Folder ini adalah pusat pengelolaan data lokal menggunakan **IndexedDB** melalui library **Dexie.js**. Semua konfigurasi penyimpanan yang berjalan di sisi client (browser) berada di sini.

## Isi
- `db.ts`: Inisialisasi Dexie instance, definisi nama database, dan skema tabel (versi database).
- `schemas/`: (Opsional) Jika skema tabel sangat besar, definisinya dipisah ke sini.
- `SyncManager.ts`: Logika sinkronisasi yang mengatur kapan data lokal harus dikirim ke Firebase dan kapan data dari Firebase harus ditarik ke lokal.

## Alasan Penggunaan
- **Offline Capabilities:** Memungkinkan aplikasi tetap berfungsi (bisa input barang, transaksi kasir) meskipun koneksi internet terputus.
- **Performance:** Membaca data dari database lokal jauh lebih cepat daripada menunggu respon dari jaringan (API).
- **Data Persistence:** Data tetap tersimpan di browser user meskipun halaman di-refresh atau browser ditutup.

> **Peringatan:** Selalu lakukan migrasi versi database dengan hati-hati di file `db.ts` agar data user yang sudah tersimpan tidak hilang saat kamu memperbarui struktur tabel.