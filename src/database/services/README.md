​📂 Folder: Database Services (Data Access Layer)
​Deskripsi
​Folder ini berfungsi sebagai Data Access Layer (DAL) yang mengisolasi semua perintah kueri ke Dexie.js. Setiap file di sini bertanggung jawab atas satu entitas atau modul tertentu untuk memastikan logika manipulasi data tidak tercampur dengan logika tampilan (UI).
​Isi
​Master Data Services:
​produkService.ts: Pengelolaan katalog produk, barcode, dan kategori.
​memberService.ts: Pengelolaan data pelanggan, loyalitas, dan poin.
​agenService.ts: Pengelolaan pemasok (agen) dan harga beli khusus.
​penggunaService.ts: Manajemen akun kasir dan hak akses.
​layananDigitalService.ts: Integrasi produk non-fisik (Pulsa, PPOB).
​Operasional & Keuangan:
​transaksiService.ts: Logika penyimpanan penjualan dan detail transaksi.
​stokService.ts: Kontrol inventaris, mutasi stok, dan Expiring Date.
​hutangService.ts: Pencatatan piutang member dan riwayat angsuran.
​pengaturanService.ts: Konfigurasi profil toko dan perangkat keras (printer).
​Audit & Reporting:
​logService.ts: Pencatatan jejak audit (Activity Log) untuk keamanan data.
​laporanService.ts: Agregasi data untuk statistik bulanan dan performa toko.
​Alasan Penggunaan
​Separation of Concerns (SoC): Memisahkan kueri database dari komponen Vue. Jika di masa depan database diganti, Anda hanya perlu mengubah file di folder ini.
​Atomicity (Transactions): Menggunakan fitur transaksi Dexie untuk memastikan operasi multi-tabel (seperti simpan transaksi + potong stok) berjalan sukses secara utuh atau gagal sama sekali (tidak setengah-setengah).
​Centralized Logic: Perhitungan penting seperti pengurangan poin atau sisa hutang dihitung di sini, sehingga hasilnya konsisten di seluruh bagian aplikasi.
​Aturan Penggunaan
​Gunakan Path Alias: Selalu gunakan @/database/db saat melakukan impor database.
​Soft Delete: Hindari penggunaan .delete(). Gunakan flag is_deleted: 1 agar data tetap bisa disinkronkan ke Firebase oleh SyncManager.
​Timestamp: Pastikan setiap fungsi create atau update memperbarui kolom updated_at dengan Date.now().
​NanoID: Gunakan generator dari @/utils/nanoid untuk setiap pembuatan ID baru agar tidak terjadi bentrok saat sinkronisasi offline-to-online.