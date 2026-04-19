import { db } from '@/database/db';
import type { Stok } from '@/database/db';
import { generateNanoID } from '@/utils/nanoid';

export const stokService = {
  /**
   * Mengambil semua data stok yang aktif
   */
  async getAll() {
    return await db.stok
      .where('is_deleted')
      .equals(0)
      .toArray();
  },

  /**
   * Mengambil stok berdasarkan produk tertentu
   */
  async getByProduk(idProduk: string) {
    return await db.stok
      .where('id_produk')
      .equals(idProduk)
      .and(item => item.is_deleted === 0)
      .toArray();
  },

  /**
   * Menambah entri stok baru (misal: saat barang masuk/kulakan)
   */
  async create(data: Omit<Stok, 'id' | 'updated_at' | 'is_deleted'>) {
    const timestamp = Date.now();
    const newStok: Stok = {
      ...data,
      id: generateNanoID(),
      updated_at: timestamp,
      is_deleted: 0,
    };

    return await db.stok.add(newStok);
  },

  /**
   * Memperbarui jumlah stok secara langsung (Adjustment)
   */
  async updateJumlah(id: string, jumlahBaru: number) {
    return await db.stok.update(id, {
      jumlah: jumlahBaru,
      updated_at: Date.now(),
    });
  },

  /**
   * Mengurangi stok berdasarkan transaksi (Auto-deduct)
   * Mencari stok tertua atau berdasarkan kriteria tertentu
   */
  async kurangiStok(idProduk: string, jumlahKurang: number) {
    const daftarStok = await db.stok
      .where('id_produk')
      .equals(idProduk)
      .and(s => s.is_deleted === 0 && s.jumlah > 0)
      .sortBy('tanggal_kadaluarsa'); // FIFO sederhana

    let sisaPotong = jumlahKurang;

    return await db.transaction('rw', db.stok, async () => {
      for (const entri of daftarStok) {
        if (sisaPotong <= 0) break;

        if (entri.jumlah >= sisaPotong) {
          await db.stok.update(entri.id, {
            jumlah: entri.jumlah - sisaPotong,
            updated_at: Date.now()
          });
          sisaPotong = 0;
        } else {
          sisaPotong -= entri.jumlah;
          await db.stok.update(entri.id, {
            jumlah: 0,
            updated_at: Date.now()
          });
        }
      }
      
      if (sisaPotong > 0) {
        // Logika opsional jika stok tidak mencukupi (stok minus)
      }
    });
  },

  /**
   * Mengambil daftar stok yang mendekati kadaluarsa
   */
  async getExpiredSoon(limitTimestamp: number) {
    return await db.stok
      .where('tanggal_kadaluarsa')
      .below(limitTimestamp)
      .and(item => item.is_deleted === 0 && item.jumlah > 0)
      .toArray();
  },

  /**
   * Menghapus entri stok secara lunak
   */
  async softDelete(id: string) {
    return await db.stok.update(id, {
      is_deleted: 1,
      updated_at: Date.now(),
    });
  }
};
