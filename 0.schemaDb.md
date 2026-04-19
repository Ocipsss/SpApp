# 1. Modul Master Data (Katalog & Referensi)
Ini adalah data "dasar" atau pondasi. Tabel di sini jarang berubah, kecuali ada penambahan produk atau perubahan harga dari Anda sendiri.

# produk:
- id : string | Primary Key (saran: gunakan UUID atau ID dari Firestore).
- kode_produk : String | Kode unik/Barcode (SKU). Digunakan untuk scan barcode.
- nama_produk : String | Nama lengkap barang (Contoh: Kopi Kapal Api 20gr).
- tipe_produk : String: ('fisik' atau 'digital') | berguna agar sistem tahu produk mana yang harus memotong stok dan mana yang tidak (seperti jasa).
- id_kategori : String | Menghubungkan ke tabel kategori (misal: Minuman).
- merk : String | Nama brand barang tersebut.
- gambar : String | URL atau path foto produk (opsional).
- updated_at : number/timestamp | Untuk mengetahui data mana yang paling baru jika terjadi konflik antara HP dan Cloud.
- is_deleted : boolean | Jangan pernah benar-benar menghapus data (`hard delete`) di sistem sinkronisasi. Cukup tandai `true`. Jika kamu hapus permanen di HP, Firestore tidak akan tahu bahwa data itu harus dihapus juga di Cloud.

# satuan_produk:
- id : String | ID unik untuk baris ini.
- id_produk : String | Menghubungkan ke tabel produk.
- nama_satuan : String | Contoh: 'Dus', 'Pak', 'Pcs'.
- faktor_konversi : Number | Jumlah isi dalam satuan ini (misal: 1 Dus isi 24).
- harga_beli : number | Harga Modal dalam satuan pcs (selalu konversi ke satuan terkecil/pcs)
- harga_jual : number | Harga khusus untuk satuan ini.
- harga_member : number | Harga khusus untuk Member. (OPSIONAL)
- satuan_dasar : Boolean | Tandai true jika ini adalah satuan terkecil (eceran).
- updated_at : number/timestamp | Untuk mengetahui data mana yang paling baru jika terjadi konflik antara HP dan Cloud.
- is_deleted : boolean | Jangan pernah benar-benar menghapus data (`hard delete`) di sistem sinkronisasi. Cukup tandai `true`. Jika kamu hapus permanen di HP, Firestore tidak akan tahu bahwa data itu harus dihapus juga di Cloud.

# kategori:
- id : String | Primary Key (misal: makanan, obat, atk).
- nama_kategori : String | Nama yang muncul di layar (Contoh: Kebutuhan Pokok).
- updated_at : number/timestamp | Untuk mengetahui data mana yang paling baru jika terjadi konflik antara HP dan Cloud.
- is_deleted : boolean | Jangan pernah benar-benar menghapus data (`hard delete`) di sistem sinkronisasi. Cukup tandai `true`. Jika kamu hapus permanen di HP, Firestore tidak akan tahu bahwa data itu harus dihapus juga di Cloud.
- updated_at : number/timestamp | Untuk mengetahui data mana yang paling baru jika terjadi konflik antara HP dan Cloud.
- is_deleted : boolean | Jangan pernah benar-benar menghapus data (`hard delete`) di sistem sinkronisasi. Cukup tandai `true`. Jika kamu hapus permanen di HP, Firestore tidak akan tahu bahwa data itu harus dihapus juga di Cloud.

# metode_pembayaran:
- id : String | Primary Key (Contoh: 'TUNAI', 'QRIS', 'TEMPO').
- nama_metode : String | Nama yang muncul di tombol kasir (Contoh: 'TUNAI', 'QRIS', 'TEMPO').
- kode_akun : String | akan sangat membantu jika nanti kamu ingin melakukan pembukuan (akuntansi) yang lebih rapi (misal: masuk ke Kas Tunai atau Bank BCA).
- biaya_tambahan : number | Jika ada biaya admin tambahan untuk metode ini (misal: mesin EDC +1%). (OPSIONAL)
- status_aktif : Boolean | Untuk mengaktifkan atau mematikan metode bayar tertentu.
- kategori_metode : String | Pengelompokan (Contoh: 'Cash', 'Digital', 'Piutang').
- updated_at : number/timestamp | Untuk mengetahui data mana yang paling baru jika terjadi konflik antara HP dan Cloud.
- is_deleted : boolean | Jangan pernah benar-benar menghapus data (`hard delete`) di sistem sinkronisasi. Cukup tandai `true`. Jika kamu hapus permanen di HP, Firestore tidak akan tahu bahwa data itu harus dihapus juga di Cloud.

# pengguna: (OPSIONAL) | Password: Untuk tabel pengguna, pastikan Anda menggunakan library seperti bcryptjs atau argon2 untuk hashing sebelum disimpan ke IndexedDB (meskipun ini perangkat pribadi, tetaplah menjaga standar keamanan).

- id : String | Primary Key (ID unik pengguna).
- nama_pengguna : String | Username untuk login.
- nama_lengkap : String | Nama asli staf/kasir.
- kata_sandi : String | Password (disimpan dalam bentuk hash/terenkripsi).
- peran : String | Tingkatan akses (Contoh: 'Admin', 'Kasir').
- status_aktif : Boolean | Menentukan apakah user tersebut masih boleh login.
- dibuat_pada : number | Tanggal akun kasir dibuat.
- updated_at : number/timestamp | Untuk mengetahui data mana yang paling baru jika terjadi konflik antara HP dan Cloud.
- is_deleted : boolean | Jangan pernah benar-benar menghapus data (`hard delete`) di sistem sinkronisasi. Cukup tandai `true`. Jika kamu hapus permanen di HP, Firestore tidak akan tahu bahwa data itu harus dihapus juga di Cloud.

# pengaturan_toko:
- id : String | Biasanya cuma satu baris (id: 'config').
- nama_toko : String | Sinar Pagi.
- alamat_toko : String | Alamat lengkap.
- pesan_struk : String | Pesan penutup di struk.
- logo_toko : String | URL/Base64 logo jika ingin pakai gambar.
- device_address_printer : string | Menyimpan ID/Alamat Bluetooth printer terakhir yang terhubung.
- lebar_kertas : number | 58 atau 80 (untuk menyesuaikan layout struk).
- updated_at : number/timestamp | Untuk mengetahui data mana yang paling baru jika terjadi konflik antara HP dan Cloud.
- is_deleted : boolean | Jangan pernah benar-benar menghapus data (`hard delete`) di sistem sinkronisasi. Cukup tandai `true`. Jika kamu hapus permanen di HP, Firestore tidak akan tahu bahwa data itu harus dihapus juga di Cloud.


# 2. Modul Operasional & Stok
Modul ini berfungsi untuk mengelola ketersediaan barang di gudang dan rak toko.

# stok:
- id : String | Primary Key.
- id_produk : String | Referensi ke tabel produk.
- id_satuan : String | Menghubungkan ke tabel satuan_produk (menjelaskan apakah stok yang diinput dalam hitungan Pcs, Dus, atau Pak).
- satuan_dasar : String | menyimpan jumlah dalam satuan terkecil (satuan_dasar).
- jumlah : number | Total stok yang tersedia.
- tanggal_kadaluarsa : number | Jika barang memiliki masa berlaku. (OPSIONAL)
- lokasi_rak : String | Contoh: "Rak A1" atau "Gudang Depan". (OPSIONAL)
- updated_at : number/timestamp | Untuk mengetahui data mana yang paling baru jika terjadi konflik antara HP dan Cloud.
- is_deleted : boolean | Jangan pernah benar-benar menghapus data (`hard delete`) di sistem sinkronisasi. Cukup tandai `true`. Jika kamu hapus permanen di HP, Firestore tidak akan tahu bahwa data itu harus dihapus juga di Cloud.

# agen:
- id : String | Primary Key (ID unik agen).
- nama_agen : String | Nama toko atau nama sales (Contoh: 'Agen Sembako H. Mamat').
- nomor_telepon : String | Nomor kontak untuk memesan barang.
- alamat : string | Lokasi agen tersebut.
- keterangan : String | Catatan (misal: 'Bisa antar barang', 'Hanya terima tunai').
- updated_at : number/timestamp | Untuk mengetahui data mana yang paling baru jika terjadi konflik antara HP dan Cloud.
- is_deleted : boolean | Jangan pernah benar-benar menghapus data (`hard delete`) di sistem sinkronisasi. Cukup tandai `true`. Jika kamu hapus permanen di HP, Firestore tidak akan tahu bahwa data itu harus dihapus juga di Cloud.

# harga_agen:
- id : String | Primary Key.
- id_agen : String | Referensi ke tabel agen.
- id_produk : String | Referensi ke tabel produk.
- id_satuan : String | Referensi ke tabel satuan_produk (misal: Harga per 'Dus').
- harga_beli : number | Harga modal yang ditawarkan agen tersebut.
- terakhir_update : number | Tanggal terakhir harga ini diperbarui.
- updated_at : number/timestamp | Untuk mengetahui data mana yang paling baru jika terjadi konflik antara HP dan Cloud.
- is_deleted : boolean | Jangan pernah benar-benar menghapus data (`hard delete`) di sistem sinkronisasi. Cukup tandai `true`. Jika kamu hapus permanen di HP, Firestore tidak akan tahu bahwa data itu harus dihapus juga di Cloud.


# 3. Modul Penjualan & Layanan (Transaksi)

# transaksi:
- id : String | Primary Key (ID unik transaksi).
- id_member : String | Jika pembeli adalah member, kolom ini diisi. Jika pembeli umum (non-member), kolom ini dibiarkan kosong (null). (OPSIONAL)
- nomor_struk : String | Nomor nota (Contoh: POS-202310-0001).
- total_harga : number | Total belanja setelah diskon/pajak.
- total_laba : Number | Menghitung laba secara *real-time* saat transaksi selesai dan menyimpannya di tabel transaksi akan membuat laporan bulananmu menjadi **100x lebih cepat** daripada harus menghitung ulang dari tabel `transaksi_detail` setiap saat.
- metode_pembayaran : String | "Contoh: 'Tunai', 'QRIS', 'Tempo'.
- status_sinkronisasi : Boolean | "true jika sudah terkirim ke cloud, false jika masih di lokal.
- id_kasir : String | Menghubungkan ke tabel user/kasir yang bertugas.
- dibuat_pada : number | Tanggal dan waktu transaksi terjadi.
- total_bayar : number | Nominal uang yang diterima dari pelanggan (misal: bayar dengan uang Rp50.000).
- kembalian : number | Selisih antara total_bayar dengan total_harga yang dikembalikan ke pelanggan.
- updated_at : number/timestamp | Untuk mengetahui data mana yang paling baru jika terjadi konflik antara HP dan Cloud.
- is_deleted : boolean | Jangan pernah benar-benar menghapus data (`hard delete`) di sistem sinkronisasi. Cukup tandai `true`. Jika kamu hapus permanen di HP, Firestore tidak akan tahu bahwa data itu harus dihapus juga di Cloud.

# transaksi_detail:
- id : String | Primary Key.
- id_transaksi : String | Menghubungkan ke tabel transaksi.
- id_produk : String | Produk apa yang dibeli.
- nama_satuan : String | Satuan yang dipilih saat beli (Pcs/Dus).
- jumlah : Number | Berapa banyak yang dibeli.
- harga_beli_saat_ini : number | Pastikan diisi dengan harga beli per item saat itu. Ini krusial agar laporan laba rugi Anda tetap akurat meskipun bulan depan harga dari agen naik.
- harga_jual_saat_ini : number | Harga barang saat transaksi (penting jika besok harga naik).
- id_layanan_tambahan : String | (Nullable) Menghubungkan ke tabel layanan_tambahan.
- biaya_layanan_saat_ini : number | 
- catatan_khusus : String | Contoh: "Mie mateng banget" atau "Kopi tanpa gula".
- subtotal : number | Total: (Jumlah x Harga Barang) + Biaya Tambahan.
- updated_at : number/timestamp | Untuk mengetahui data mana yang paling baru jika terjadi konflik antara HP dan Cloud.
- is_deleted : boolean | Jangan pernah benar-benar menghapus data (`hard delete`) di sistem sinkronisasi. Cukup tandai `true`. Jika kamu hapus permanen di HP, Firestore tidak akan tahu bahwa data itu harus dihapus juga di Cloud.

# layanan_digital:
- id : String | Primary Key.
- nama_layanan : String | Contoh: 'Topup DANA', 'PLN Prabayar', 'Tarik Tunai'.'Setor Tunai'.
- biaya_admin : number | Biaya jasa yang dikenakan ke pelanggan (keuntungan Anda).
- id_kategori : String | Referensi ke tabel kategori (misal kategori: 'Jasa Layanan Digital').
- updated_at : number/timestamp | Untuk mengetahui data mana yang paling baru jika terjadi konflik antara HP dan Cloud.
- is_deleted : boolean | Jangan pernah benar-benar menghapus data (`hard delete`) di sistem sinkronisasi. Cukup tandai `true`. Jika kamu hapus permanen di HP, Firestore tidak akan tahu bahwa data itu harus dihapus juga di Cloud.

# transaksi_layanan_digital:
- id : String | Primary Key.
- id_layanan_digital : String | Referensi ke tabel layanan_digital.
- nomor_tujuan : String | Nomor HP, ID Pelanggan, atau Nomor Rekening.
- nominal_transaksi : number | Jumlah uang yang ditarik/disetor/topup (di luar admin).
- biaya_admin_saat_ini : number | Biaya admin saat transaksi dilakukan.
- total_bayar : number | Hasil dari (nominal_transaksi + biaya_admin_saat_ini).
- metode_pembayaran : String | Supaya Anda tahu uang hasil top-up itu masuk ke laci kasir (Tunai) atau masuk ke saldo bank Anda (QRIS).
- id_member : String | Referensi ke tabel member (opsional).
- id_kasir : String | Referensi ke tabel pengguna.
- status_transaksi : String | 'Berhasil', 'Gagal', 'Pending'.
- dibuat_pada : number | Waktu transaksi.
- updated_at : number/timestamp | Untuk mengetahui data mana yang paling baru jika terjadi konflik antara HP dan Cloud.
- is_deleted : boolean | Jangan pernah benar-benar menghapus data (`hard delete`) di sistem sinkronisasi. Cukup tandai `true`. Jika kamu hapus permanen di HP, Firestore tidak akan tahu bahwa data itu harus dihapus juga di Cloud.

# layanan_tambahan:
- id : String | Primary Key (Contoh: 'masak', 'seduh').
- nama_layanan : String | Nama jasa (Contoh: 'Jasa Masak Mie', 'Seduh Air Panas').
- biaya_tambahan : number | Harga jasanya (Contoh: Rp2.000 untuk masak).
- updated_at : number/timestamp | Untuk mengetahui data mana yang paling baru jika terjadi konflik antara HP dan Cloud.
- is_deleted : boolean | Jangan pernah benar-benar menghapus data (`hard delete`) di sistem sinkronisasi. Cukup tandai `true`. Jika kamu hapus permanen di HP, Firestore tidak akan tahu bahwa data itu harus dihapus juga di Cloud.

# kategori_layanan:
- id : String | Primary Key.
- id_kategori : String | Referensi ke tabel kategori.
- id_layanan_tambahan : String | Referensi ke tabel layanan_tambahan.
- updated_at : number/timestamp | Untuk mengetahui data mana yang paling baru jika terjadi konflik antara HP dan Cloud.
- is_deleted : boolean | Jangan pernah benar-benar menghapus data (`hard delete`) di sistem sinkronisasi. Cukup tandai `true`. Jika kamu hapus permanen di HP, Firestore tidak akan tahu bahwa data itu harus dihapus juga di Cloud.


# 4. Modul Pelanggan & Keuangan (CRM & Piutang)

# member:
- id : String | Primary Key (ID unik member).
- kode_member : String | Kode unik kartu member atau nomor HP (untuk pencarian cepat).
- nama_pelanggan : String | Nama lengkap member.
- nomor_telepon : String | Untuk keperluan kontak atau pengiriman struk digital.
- alamat : string | Alamat tempat tinggal member. (OPSIONAL)
- total_poin : Number | Akumulasi poin yang bisa ditukar dengan hadiah/diskon.
- tanggal_registrasi : number | Tanggal saat member pertama kali mendaftar.
- status_aktif : Boolean | Untuk mematikan member jika sudah tidak berlangganan.
- updated_at : number/timestamp | Untuk mengetahui data mana yang paling baru jika terjadi konflik antara HP dan Cloud.
- is_deleted : boolean | Jangan pernah benar-benar menghapus data (`hard delete`) di sistem sinkronisasi. Cukup tandai `true`. Jika kamu hapus permanen di HP, Firestore tidak akan tahu bahwa data itu harus dihapus juga di Cloud.

# hutang:
- id : String | Primary Key.
- id_member : String | Referensi ke tabel member (Siapa yang berhutang).
- id_transaksi : String | Referensi ke tabel transaksi (Dari belanjaan yang mana).
- total_hutang : number | Jumlah total hutang awal dari transaksi tersebut.
- sisa_hutang : number | Jumlah yang masih harus dibayar (berkurang jika dicicil).
- tanggal_jatuh_tempo : number | Tanggal batas akhir pembayaran (opsional).
- status_lunas : Boolean | true jika sudah bayar semua, false jika masih ada sisa.
- updated_at : number/timestamp | Untuk mengetahui data mana yang paling baru jika terjadi konflik antara HP dan Cloud.
- is_deleted : boolean | Jangan pernah benar-benar menghapus data (`hard delete`) di sistem sinkronisasi. Cukup tandai `true`. Jika kamu hapus permanen di HP, Firestore tidak akan tahu bahwa data itu harus dihapus juga di Cloud.

# pembayaran_hutang:
- id : String | Primary Key.
- id_hutang : String | Referensi ke tabel hutang.
- jumlah_bayar : number | Nominal uang yang dibayarkan saat mencicil.
- metode_pembayaran_hutang : Number | (misal: bayar hutang lewat transfer atau tunai).
- tanggal_bayar : number | Waktu saat cicilan diterima.
- id_kasir : String | Kasir yang menerima uang cicilan.
- updated_at : number/timestamp | Untuk mengetahui data mana yang paling baru jika terjadi konflik antara HP dan Cloud.
- is_deleted : boolean | Jangan pernah benar-benar menghapus data (`hard delete`) di sistem sinkronisasi. Cukup tandai `true`. Jika kamu hapus permanen di HP, Firestore tidak akan tahu bahwa data itu harus dihapus juga di Cloud.


# 5. Modul Audit & Pelaporan

# log_aktivitas:
- id : String | Primary Key.
- id_pengguna : String | Siapa yang melakukan aksi tersebut (Referensi ke tabel pengguna).
- aksi : String | Jenis tindakan (Contoh: 'HAPUS_TRANSAKSI', 'UBAH_STOK', 'LOGIN').
- tabel_terkait : String | Nama tabel yang dimodifikasi (Contoh: 'transaksi', 'stok').
- id_data_terkait : String | ID dari baris data yang diubah (misal ID transaksi yang dihapus).
- data_sebelumnya : JSON | Nilai data sebelum diubah (penting untuk pembuktian).
- data_sesudah : JSON | Nilai data setelah diubah.
- perangkat : String | Info perangkat (Contoh: 'Tablet-Kasir-01').
- dibuat_pada : number | Waktu persis kejadian.
- updated_at : number/timestamp | Untuk mengetahui data mana yang paling baru jika terjadi konflik antara HP dan Cloud.
- is_deleted : boolean | Jangan pernah benar-benar menghapus data (`hard delete`) di sistem sinkronisasi. Cukup tandai `true`. Jika kamu hapus permanen di HP, Firestore tidak akan tahu bahwa data itu harus dihapus juga di Cloud.

# ringkasan_bulanan:
- id : String | Primary Key (Contoh: '2026-04').
- total_omzet : number | Total penjualan kotor bulan itu.
- total_laba : number | Total keuntungan bersih bulan itu.
- total_pengeluaran : number | Jika Anda mencatat biaya listrik/gaji karyawan.
- updated_at : number/timestamp | Untuk mengetahui data mana yang paling baru jika terjadi konflik antara HP dan Cloud.
- is_deleted : boolean | Jangan pernah benar-benar menghapus data (`hard delete`) di sistem sinkronisasi. Cukup tandai `true`. Jika kamu hapus permanen di HP, Firestore tidak akan tahu bahwa data itu harus dihapus juga di Cloud.


