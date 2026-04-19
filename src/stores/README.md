# 📂 Folder: Stores (State Management)

## Deskripsi
Folder ini berisi manajemen state global menggunakan **Pinia**. Di sinilah kita menyimpan data yang perlu diakses oleh banyak komponen atau halaman tanpa harus mengirim data melalui *props*.

## Isi
- `authStore.ts`: Menyimpan data user yang sedang login dan status hak akses (admin/kasir).
- `cartStore.ts`: Mengelola keranjang belanja sementara saat transaksi berlangsung.
- `inventoryStore.ts`: Menyimpan cache data produk agar pencarian terasa instan.
- `uiStore.ts`: Mengatur state antarmuka seperti status sidebar (terbuka/tertutup) atau tema (dark/light).

## Alasan Penggunaan
- **Global Accessibility:** Data seperti "Jumlah Barang di Keranjang" bisa diakses di komponen Header maupun di halaman Checkout secara bersamaan.
- **Persistence Integration:** Store bisa dihubungkan dengan `localStorage` atau `Dexie` agar state tidak hilang saat halaman di-refresh.
- **Reactive Updates:** Ketika data di store berubah, semua komponen yang menggunakan data tersebut akan otomatis diperbarui secara reaktif.

> **Tips:** Jangan masukkan semua data ke dalam store. Gunakan store hanya untuk data yang benar-benar dibutuhkan oleh lebih dari satu halaman. Jika data hanya dipakai di satu komponen, gunakan `ref()` lokal saja.