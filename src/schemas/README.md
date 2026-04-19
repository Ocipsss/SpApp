# 📂 Folder: Schemas (Validations)

## Deskripsi
Folder ini berisi definisi struktur data dan aturan validasi menggunakan **Zod**. Di sini kita menentukan bagaimana bentuk data yang "sah" sebelum diproses lebih lanjut oleh aplikasi.

## Isi
- `productSchema.ts`: Validasi nama produk, SKU, harga (harus angka), dan stok minimum.
- `transactionSchema.ts`: Aturan untuk data penjualan, termasuk validasi array barang yang dibeli.
- `userSchema.ts`: Aturan untuk login (email valid, panjang password, dll).

## Alasan Penggunaan
- **Data Integrity:** Menjamin bahwa data yang masuk ke database (Dexie atau Firebase) sudah bersih dan sesuai format.
- **Reusable Validation:** Skema yang sama bisa dipakai di dua tempat sekaligus:
    1. Di UI (bersama **Vee-Validate**) untuk memunculkan pesan error saat user mengetik.
    2. Di Logika Import (saat membaca file **Excel/XLSX**) untuk memastikan data file tersebut tidak korup.
- **Auto-Type Generation:** Zod bisa secara otomatis menghasilkan tipe data TypeScript (`z.infer<typeof schema>`), sehingga kamu tidak perlu menulis interface secara manual lagi.

> **Tips:** Simpan semua pesan error (misal: "Harga tidak boleh negatif") di sini agar pesan peringatan di seluruh aplikasi seragam dan mudah diterjemahkan jika diperlukan.