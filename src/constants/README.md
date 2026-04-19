# 📂 Folder: Constants

## Deskripsi
Tempat penyimpanan nilai-nilai statis (tetap) yang bersifat *read-only*. Folder ini berfungsi sebagai pusat referensi untuk semua teks atau angka yang memiliki makna khusus dalam aplikasi.

## Isi
- **App Config:** Nama aplikasi, versi, atau limit pagination.
- **Business Logic:** Daftar kategori produk, tipe satuan (pcs, ctn, pack), dan status transaksi (SUCCESS, PENDING, FAILED).
- **Format:** Format tanggal global atau simbol mata uang.

## Alasan Penggunaan
- **Single Source of Truth:** Jika nama sebuah status perlu diubah, kamu hanya perlu menggantinya di satu file ini, bukan di seluruh aplikasi.
- **Avoid Magic Strings:** Menghindari error akibat typo. Menggunakan `STATUS.SUCCESS` jauh lebih aman daripada mengetik string `"success"` berulang kali di berbagai komponen.
- **Intellisense:** Memudahkan proses coding karena editor akan memberikan saran otomatis saat kamu mengetik nama constant.

> **Naming Convention:** Disarankan menggunakan format **UPPER_SNAKE_CASE** untuk nama variabelnya, contoh: `export const DEFAULT_UNIT = 'pcs'`.