import Dexie, { type EntityTable } from 'dexie';

// ########## BASE SCHEMA ##########

interface BaseSchema {
  id: string; // Menggunakan String untuk NanoID
  updated_at: number; // Timestamp numerik
  is_deleted: 0 | 1; // 0 = false, 1 = true untuk optimasi
}

// ########## INTERFACES ##########

// --- 1. Modul Master Data ---
export interface Produk extends BaseSchema {
  kode_produk: string;
  nama_produk: string;
  tipe_produk: string;
  id_kategori: string;
  merk: string;
  gambar: string;
}

export interface SatuanProduk extends BaseSchema {
  id_produk: string;
  nama_satuan: string;
  faktor_konversi: number;
  harga_beli: number;
  harga_jual: number;
  harga_member: number;
  satuan_dasar: 0 | 1;
}

export interface Kategori extends BaseSchema {
  nama_kategori: string;
}

export interface MetodePembayaran extends BaseSchema {
  nama_metode: string;
  kode_akun: string;
  biaya_tambahan: number;
  status_aktif: 0 | 1;
  kategori_metode: string;
}

export interface Pengguna extends BaseSchema {
  nama_pengguna: string;
  nama_lengkap: string;
  kata_sandi: string;
  peran: string;
  status_aktif: 0 | 1;
  dibuat_pada: number;
}

export interface PengaturanToko extends BaseSchema {
  nama_toko: string;
  alamat_toko: string;
  pesan_struk: string;
  logo_toko: string;
  device_address_printer: string;
  lebar_kertas: number;
}

// --- 2. Modul Operasional & Stok ---
export interface Stok extends BaseSchema {
  id_produk: string;
  id_satuan: string;
  satuan_dasar: string;
  jumlah: number;
  tanggal_kadaluarsa: number;
  lokasi_rak: string;
}

export interface Agen extends BaseSchema {
  nama_agen: string;
  nomor_telepon: string;
  alamat: string;
  keterangan: string;
}

export interface HargaAgen extends BaseSchema {
  id_agen: string;
  id_produk: string;
  id_satuan: string;
  harga_beli: number;
  terakhir_update: number;
}

// --- 3. Modul Penjualan & Layanan ---
export interface Transaksi extends BaseSchema {
  id_member: string;
  nomor_struk: string;
  total_harga: number;
  total_laba: number;
  metode_pembayaran: string;
  nama_member: string;
  status_sinkronisasi: 0 | 1;
  id_kasir: string;
  total_bayar: number;
  kembalian: number;
}

export interface TransaksiDetail extends BaseSchema {
  id_transaksi: string;
  id_produk: string;
  nama_satuan: string;
  jumlah: number;
  harga_beli_saat_ini: number;
  harga_jual_saat_ini: number;
  id_layanan_tambahan: string;
  biaya_layanan_saat_ini: number;
  catatan_khusus: string;
  subtotal: number;
}

export interface LayananDigital extends BaseSchema {
  nama_layanan: string;
  biaya_admin: number;
  id_kategori: string;
}

export interface TransaksiLayananDigital extends BaseSchema {
  id_layanan_digital: string;
  nomor_tujuan: string;
  nominal_transaksi: number;
  biaya_admin_saat_ini: number;
  total_bayar: number;
  metode_pembayaran: string;
  id_member: string;
  id_kasir: string;
  status_transaksi: string;
  dibuat_pada: number;
}

export interface LayananTambahan extends BaseSchema {
  nama_layanan: string;
  biaya_tambahan: number;
}

export interface KategoriLayanan extends BaseSchema {
  id_kategori: string;
  id_layanan_tambahan: string;
}

// --- 4. Modul Pelanggan & Keuangan ---
export interface Member extends BaseSchema {
  kode_member: string;
  nama_member: string;
  nomor_telepon: string;
  alamat: string;
  total_poin: number;
  tanggal_registrasi: number;
  status_aktif: 0 | 1;
}

export interface Hutang extends BaseSchema {
  id_member: string;
  id_transaksi: string;
  total_hutang: number;
  sisa_hutang: number;
  tanggal_jatuh_tempo: number;
  status_lunas: 0 | 1;
}

export interface PembayaranHutang extends BaseSchema {
  id_hutang: string;
  jumlah_bayar: number;
  metode_pembayaran_hutang: string;
  tanggal_bayar: number;
  id_kasir: string;
}

// --- 5. Modul Audit & Pelaporan ---
export interface LogAktivitas extends BaseSchema {
  id_pengguna: string;
  aksi: string;
  tabel_terkait: string;
  id_data_terkait: string;
  data_sebelumnya: any; 
  data_sesudah: any;
  perangkat: string;
  dibuat_pada: number;
}

export interface RingkasanBulanan extends BaseSchema {
  total_omzet: number;
  total_laba: number;
  total_pengeluaran: number;
}

// ########## DATABASE CONFIG ##########

export type SinarPagiDB = Dexie & {
  produk: EntityTable<Produk, 'id'>;
  satuan_produk: EntityTable<SatuanProduk, 'id'>;
  kategori: EntityTable<Kategori, 'id'>;
  metode_pembayaran: EntityTable<MetodePembayaran, 'id'>;
  pengguna: EntityTable<Pengguna, 'id'>;
  pengaturan_toko: EntityTable<PengaturanToko, 'id'>;
  stok: EntityTable<Stok, 'id'>;
  agen: EntityTable<Agen, 'id'>;
  harga_agen: EntityTable<HargaAgen, 'id'>;
  transaksi: EntityTable<Transaksi, 'id'>;
  transaksi_detail: EntityTable<TransaksiDetail, 'id'>;
  layanan_digital: EntityTable<LayananDigital, 'id'>;
  transaksi_layanan_digital: EntityTable<TransaksiLayananDigital, 'id'>;
  layanan_tambahan: EntityTable<LayananTambahan, 'id'>;
  kategori_layanan: EntityTable<KategoriLayanan, 'id'>;
  member: EntityTable<Member, 'id'>;
  hutang: EntityTable<Hutang, 'id'>;
  pembayaran_hutang: EntityTable<PembayaranHutang, 'id'>;
  log_aktivitas: EntityTable<LogAktivitas, 'id'>;
  ringkasan_bulanan: EntityTable<RingkasanBulanan, 'id'>;
};

const db = new Dexie('SinarPagiDB') as SinarPagiDB;

// Menggunakan 'id' tanpa '++' untuk mendukung String (NanoID)
// Simbol '&' digunakan untuk Unique Index
db.version(1).stores({
  produk: "id, &kode_produk, nama_produk, id_kategori, updated_at, is_deleted",
  satuan_produk: "id, id_produk, is_deleted",
  kategori: "id, &nama_kategori, is_deleted",
  metode_pembayaran: "id, nama_metode, status_aktif, is_deleted",
  pengguna: "id, &nama_pengguna, peran, status_aktif, is_deleted",
  pengaturan_toko: "id",
  stok: "id, id_produk, id_satuan, tanggal_kadaluarsa, is_deleted",
  agen: "id, nama_agen, is_deleted",
  harga_agen: "id, id_agen, id_produk, is_deleted",
  transaksi: "id, &nomor_struk, id_member, status_sinkronisasi, updated_at, is_deleted",
  transaksi_detail: "id, id_transaksi, id_produk, is_deleted",
  layanan_digital: "id, nama_layanan, id_kategori, is_deleted",
  transaksi_layanan_digital: "id, id_layanan_digital, status_transaksi, dibuat_pada, is_deleted",
  layanan_tambahan: "id, nama_layanan, is_deleted",
  kategori_layanan: "id, id_kategori, id_layanan_tambahan, is_deleted",
  member: "id, &kode_member, nama_member, nomor_telepon, is_deleted",
  hutang: "id, id_member, id_transaksi, status_lunas, tanggal_jatuh_tempo, is_deleted",
  pembayaran_hutang: "id, id_hutang, id_kasir, tanggal_bayar, is_deleted",
  log_aktivitas: "id, id_pengguna, aksi, tabel_terkait, dibuat_pada",
  ringkasan_bulanan: "id, updated_at"
});

export { db };