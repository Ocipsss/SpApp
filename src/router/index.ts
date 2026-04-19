import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
  },
  
  // --- MODUL PENJUALAN ---
  {
    path: '/penjualan/kasir',
    name: 'kasir',
    component: () => import('@/views/penjualan/kasir/Kasir.vue'),
  },
  {
    path: '/penjualan/riwayat',
    name: 'riwayat-penjualan',
    component: () => import('@/views/penjualan/riwayat/Riwayat.vue'),
  },

  // --- MODUL PRODUK ---
  {
    path: '/produk/daftar-produk',
    name: 'daftar-produk',
    component: () => import('@/views/produk/daftar-produk/DaftarProduk.vue'),
  },
  {
    path: '/produk/kategori',
    name: 'kategori-produk',
    component: () => import('@/views/produk/kategori/Kategori.vue'),
  },
  {
    path: '/produk/pengaturan-harga',
    name: 'pengaturan-harga',
    component: () => import('@/views/produk/pengaturan-harga/PengaturanHarga.vue'),
  },
  {
    path: '/produk/stok-monitor',
    name: 'stok-monitor',
    component: () => import('@/views/produk/stok-monitor/StokMonitor.vue'),
  },
  {
    path: '/produk/tambah-produk',
    name: 'tambah-produk',
    component: () => import('@/views/produk/tambah-produk/TambahProduk.vue'),
  },

  // --- MODUL KEUANGAN ---
  {
    path: '/keuangan/arus-uang',
    name: 'arus-uang',
    component: () => import('@/views/keuangan/arus-uang/ArusUang.vue'),
  },
  {
    path: '/keuangan/laba',
    name: 'laba',
    component: () => import('@/views/keuangan/laba/Laba.vue'),
  },
  {
    path: '/keuangan/pengeluaran',
    name: 'pengeluaran',
    component: () => import('@/views/keuangan/pengeluaran/Pengeluaran.vue'),
  },
  {
    path: '/keuangan/piutang',
    name: 'piutang',
    component: () => import('@/views/keuangan/piutang/Piutang.vue'),
  },

  // --- MODUL MASTER DATA ---
  {
    path: '/master/data-agen',
    name: 'data-agen',
    component: () => import('@/views/master/data-agen/DataAgen.vue'),
  },
  {
    path: '/master/data-jasa',
    name: 'data-jasa',
    component: () => import('@/views/master/data-jasa/DataJasa.vue'),
  },
  {
    path: '/master/data-kasir',
    name: 'data-kasir',
    component: () => import('@/views/master/data-kasir/DataKasir.vue'),
  },
  {
    path: '/master/data-member',
    name: 'data-member',
    component: () => import('@/views/master/data-member/DataMember.vue'),
  },

  // --- MODUL LAPORAN ---
  {
    path: '/laporan/bulanan',
    name: 'laporan-bulanan',
    component: () => import('@/views/laporan/bulanan/Bulanan.vue'),
  },
  {
    path: '/laporan/harian',
    name: 'laporan-harian',
    component: () => import('@/views/laporan/harian/Harian.vue'),
  },

  // --- MODUL LAYANAN DIGITAL (PPOB/PULSA) ---
  {
    path: '/layanan-digital',
    name: 'layanan-digital',
    component: () => import('@/views/layanan-digital/LayananDigital.vue'),
  },

  // --- MODUL SISTEM & PENGATURAN ---
  {
    path: '/sistem/backup-restore',
    name: 'backup-restore',
    component: () => import('@/views/sistem/backup-restore/Backup.vue'),
  },
  {
    path: '/sistem/pengaturan-struk',
    name: 'pengaturan-struk',
    component: () => import('@/views/sistem/pengaturan-struk/PengaturanStruk.vue'),
  },
  {
    path: '/sistem/pengaturan-toko',
    name: 'pengaturan-toko',
    component: () => import('@/views/sistem/pengaturan-toko/PengaturanToko.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
