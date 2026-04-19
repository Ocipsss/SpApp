import { db } from '@/database/db';
import type { PengaturanToko } from '@/database/db';

export const pengaturanService = {
  /**
   * Mendapatkan pengaturan toko
   * Karena hanya ada satu pengaturan, kita ambil data pertama
   */
  async getPengaturan() {
    const data = await db.pengaturan_toko.toArray();
    return data[0] || null;
  },

  /**
   * Memperbarui atau membuat pengaturan toko baru
   * Menggunakan ID tetap 'toko_config' untuk memastikan hanya ada satu record
   */
  async savePengaturan(data: Omit<PengaturanToko, 'id' | 'updated_at' | 'is_deleted'>) {
    const timestamp = Date.now();
    const idConfig = 'toko_config'; // ID tetap untuk singleton pattern

    const existing = await db.pengaturan_toko.get(idConfig);

    if (existing) {
      return await db.pengaturan_toko.update(idConfig, {
        ...data,
        updated_at: timestamp
      });
    }

    const newConfig: PengaturanToko = {
      ...data,
      id: idConfig,
      updated_at: timestamp,
      is_deleted: 0,
    };

    return await db.pengaturan_toko.add(newConfig);
  },

  /**
   * Memperbarui alamat device printer secara spesifik
   */
  async updatePrinterAddress(address: string) {
    const config = await this.getPengaturan();
    if (!config) throw new Error('Pengaturan toko belum diinisialisasi');

    return await db.pengaturan_toko.update(config.id, {
      device_address_printer: address,
      updated_at: Date.now()
    });
  },

  /**
   * Reset pengaturan toko ke default (Soft Delete / Update)
   */
  async resetPengaturan() {
    const config = await this.getPengaturan();
    if (config) {
      return await db.pengaturan_toko.update(config.id, {
        is_deleted: 1,
        updated_at: Date.now()
      });
    }
  }
};
