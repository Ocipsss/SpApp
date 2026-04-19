# 📂 Folder: Lib

## Deskripsi
Folder ini digunakan untuk melakukan inisialisasi dan konfigurasi pihak ketiga (library/SDK). Semua pengaturan awal library diletakkan di sini sebelum digunakan di seluruh aplikasi.

## Isi
- `sentry.ts`: Konfigurasi Sentry untuk monitoring error dan performa.
- `firebase.ts`: Inisialisasi Firebase SDK (App, Auth, Firestore).
- `dayjs.ts`: Pengaturan plugin Day.js (seperti timezone, locale Indonesia, atau format relatif).
- `axios.ts`: Konfigurasi instance Axios (Base URL, Timeout, Header).

## Alasan Penggunaan
- **Clean Entry Point:** Menjaga file `main.ts` tetap bersih. `main.ts` cukup meng-import file dari sini daripada berisi puluhan baris konfigurasi library.
- **Config Isolation:** Memisahkan logika konfigurasi vendor dari logika bisnis aplikasi.
- **Ease of Updates:** Jika suatu saat kamu ingin mengganti library (misal dari Day.js ke Date-fns), kamu memiliki titik sentral untuk melakukan transisi tersebut.

> **Catatan:** Jangan menaruh logika bisnis di sini. Folder ini murni untuk aspek teknis "penyambungan" library eksternal ke dalam ekosistem Vue kamu.