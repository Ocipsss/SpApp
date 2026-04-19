# 📂 Folder: Types

## Deskripsi
Folder ini berisi definisi tipe data (**Interfaces** dan **Type Aliases**) yang digunakan di seluruh aplikasi. Ini adalah fondasi utama agar aplikasi memiliki *type-safety* yang kuat.

## Isi
- `product.ts`: Definisi struktur objek Produk (id, nama, sku, harga, stok).
- `transaction.ts`: Struktur data transaksi, item belanja, dan invoice.
- `user.ts`: Tipe data untuk profil pengguna dan peran (Role).
- `api.ts`: Definisi bentuk respon dari server atau Firebase.

## Alasan Penggunaan
- **Type Safety:** Mencegah error "undefined" atau salah tipe data (misal: menjumlahkan string dengan angka) sejak tahap koding, bukan saat aplikasi dijalankan.
- **Enhanced Intellisense:** Memberikan saran otomatis (autocomplete) yang sangat akurat saat kamu mengetik di file `.vue` atau `.ts`.
- **Documentation by Code:** Tipe data bertindak sebagai dokumentasi hidup. Cukup melihat file interface untuk tahu data apa saja yang tersedia dalam sebuah objek.

> **Catatan:** Jika tipe data dihasilkan otomatis dari **Zod** di folder `schemas/`, kamu bisa meng-export-nya di sini agar konsisten. Hindari penggunaan tipe `any` agar manfaat TypeScript tetap maksimal.