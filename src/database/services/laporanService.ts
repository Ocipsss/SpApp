import { db } from '@/database/db';
import type { RingkasanBulanan } from '@/database/db';
import { generateNanoID } from '@/utils/nanoid';

export const laporanService = {
  /**
   * Mengambil data ringkasan bulanan berdasarkan periode (bulan dan tahun)
   */
  async getRingkasanByPeriode(bulan: number, tahun: number) {
    return await db.ringkasan_bulanan
      .where({ bulan, tahun })
      .first();
  },

  /**
   * Update atau Create ringkasan bulanan secara otomatis
   * Fungsi ini dipanggil setiap kali ada transaksi sukses atau pengeluaran baru
   */
  async updateStatistikBulanan(bulan: number, tahun: number) {
    const startOfMonth = new Date(tahun, bulan - 1, 1).getTime();
    const endOfMonth = new Date(tahun, bulan, 0, 23, 59, 59).getTime();

    // 1. Hitung total omzet dan laba kotor dari transaksi
    const semuaTransaksi = await db.transaksi
      .where('updated_at')
      .between(startOfMonth, endOfMonth)
      .and(t => t.is_deleted === 0)
      .toArray();

    const totalOmzet = semuaTransaksi.reduce((sum, t) => sum + t.total_bayar, 0);
    
    // 2. Hitung total pengeluaran
    const semuaPengeluaran = await db.pengeluaran
      .where('updated_at')
      .between(startOfMonth, endOfMonth)
      .and(p => p.is_deleted === 0)
      .toArray();

    const totalPengeluaran = semuaPengeluaran.reduce((sum, p) => sum + p.jumlah, 0);

    const timestamp = Date.now();
    const existing = await this.getRingkasanByPeriode(bulan, tahun);

    if (existing) {
      return await db.ringkasan_bulanan.update(existing.id, {
        total_omzet: totalOmzet,
        total_pengeluaran: totalPengeluaran,
        total_laba_bersih: totalOmzet - totalPengeluaran, // Penyederhanaan
        updated_at: timestamp
      });
    } else {
      const newLaporan: RingkasanBulanan = {
        id: generateNanoID(),
        bulan,
        tahun,
        total_omzet: totalOmzet,
        total_pengeluaran: totalPengeluaran,
        total_laba_bersih: totalOmzet - totalPengeluaran,
        updated_at: timestamp,
        is_deleted: 0
      };
      return await db.ringkasan_bulanan.add(newLaporan);
    }
  },

  /**
   * Mengambil data untuk laporan harian (digunakan di views/laporan/harian)
   */
  async getLaporanHarian(tanggalMulai: number, tanggalSelesai: number) {
    const transaksi = await db.transaksi
      .where('updated_at')
      .between(tanggalMulai, tanggalSelesai)
      .and(t => t.is_deleted === 0)
      .toArray();

    const pengeluaran = await db.pengeluaran
      .where('updated_at')
      .between(tanggalMulai, tanggalSelesai)
      .and(p => p.is_deleted === 0)
      .toArray();

    return {
      transaksi,
      pengeluaran,
      totalOmzet: transaksi.reduce((sum, t) => sum + t.total_bayar, 0),
      totalPengeluaran: pengeluaran.reduce((sum, p) => sum + p.jumlah, 0)
    };
  },

  /**
   * Mengambil produk paling laku (Top Selling) berdasarkan detail transaksi
   */
  async getTopProducts(limit = 5) {
    const details = await db.transaksi_detail
      .where('is_deleted')
      .equals(0)
      .toArray();

    const counts: Record<string, number> = {};
    details.forEach(d => {
      counts[d.id_produk] = (counts[d.id_produk] || 0) + d.jumlah;
    });

    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit);
  }
};
