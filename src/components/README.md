# 📂 Folder: Components

## Deskripsi
Folder ini berisi potongan UI (User Interface) yang dapat digunakan kembali (*reusable*) di berbagai bagian aplikasi. Komponen di sini bersifat modular dan tidak terikat langsung pada rute tertentu.

## Sub-folder yang Disarankan
- `ui/`: Komponen dasar/atomik (seperti Button, Input, Modal, Badge). Biasanya membungkus library seperti **Radix Vue**.
- `shared/`: Komponen pendukung fitur yang sering muncul (seperti `BarcodeScanner.vue`, `PriceSplitter.vue`, atau `DataCard.ts`).
- `forms/`: Komponen khusus input data yang sudah terintegrasi dengan **Vee-Validate** dan **Zod**.

## Alasan Penggunaan
- **Consistency:** Memastikan tampilan aplikasi seragam (misal: semua tombol memiliki desain yang sama).
- **Maintainability:** Jika ada perubahan desain pada satu elemen, kamu cukup mengubah satu file di sini.
- **Testing:** Komponen kecil lebih mudah diuji secara independen menggunakan **Vitest** dan **Vue Test Utils**.

> **Prinsip Penting:** Komponen di sini sebaiknya bersifat "dumb" (hanya menerima props dan memancarkan events). Hindari memanggil API langsung dari dalam komponen UI; biarkan folder `views/` atau `stores/` yang menangani logika data.