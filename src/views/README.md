# 📂 Folder: Views (Pages)

## Deskripsi
Folder ini berisi komponen Vue utama yang berfungsi sebagai satu halaman penuh. Setiap file di sini biasanya terhubung langsung dengan satu rute di **Vue Router**.

## Isi
- `Dashboard.vue`: Halaman ringkasan statistik penjualan dan stok.
- `inventory/ProductList.vue`: Halaman utama manajemen barang.
- `sales/Cashier.vue`: Antarmuka mesin kasir (POS).
- `reports/TransactionHistory.vue`: Laporan riwayat transaksi.

## Alasan Penggunaan
- **Routing Entry Point:** Memudahkan identifikasi file mana yang bertanggung jawab atas tampilan di URL tertentu (misal: `/inventory` -> `ProductList.vue`).
- **Orchestration:** Views tidak berisi kode UI detail, melainkan bertugas memanggil komponen dari `src/components/`, data dari `src/stores/`, dan logika dari `src/composables/`.
- **Page-Level Logic:** Mengelola siklus hidup halaman, seperti mengambil data awal saat halaman pertama kali dibuka (*onMounted*).

> **Struktur Folder:** Untuk aplikasi besar seperti Sinar Pagi, sangat disarankan mengelompokkan views ke dalam sub-folder sesuai fitur (contoh: folder `inventory/`, `sales/`, `auth/`) agar tidak menumpuk di root folder views.