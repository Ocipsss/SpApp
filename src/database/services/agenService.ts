import { db } from '@/database/db';
import type { Agen, HargaAgen } from '@/database/db';
import { generateNanoID } from '@/utils/nanoid';

export const agenService = {
  /**
   * Mengambil semua data agen yang aktif
   */
  async getAll() {
    return await db.agen
      .where('is_deleted')
      .equals(0)
      .toArray();
  },

  /**
   * Mengambil detail agen berdasarkan ID
   */
  async getById(id: string) {
    return await db.agen.get(id);
  },

  /**
   * Membuat agen baru
   */
  async create(data: Omit<Agen, 'id' | 'updated_at' | 'is_deleted'>) {
    const timestamp = Date.now();
    const newAgen: Agen = {
      ...data,
      id: generateNanoID(),
      updated_at: timestamp,
      is_deleted: 0,
    };

    return await db.agen.add(newAgen);
  },

  /**
   * Memperbarui data agen
   */
  async update(id: string, data: Partial<Omit<Agen, 'id'>>) {
    return await db.agen.update(id, {
      ...data,
      updated_at: Date.now(),
    });
  },

  /**
   * Menghapus agen secara lunak (Soft Delete)
   */
  async softDelete(id: string) {
    return await db.agen.update(id, {
      is_deleted: 1,
      updated_at: Date.now(),
    });
  },

  // --- Operasional Harga Agen ---

  /**
   * Mengambil daftar harga khusus dari agen tertentu
   */
  async getHargaByAgen(idAgen: string) {
    return await db.harga_agen
      .where('id_agen')
      .equals(idAgen)
      .and(item => item.is_deleted === 0)
      .toArray();
  },

  /**
   * Mengatur atau memperbarui harga beli khusus dari agen untuk produk tertentu
   */
  async setHargaAgen(data: Omit<HargaAgen, 'id' | 'updated_at' | 'is_deleted' | 'terakhir_update'>) {
    const timestamp = Date.now();
    
    // Cek apakah sudah ada pengaturan harga untuk agen, produk, dan satuan yang sama
    const existing = await db.harga_agen
      .where({
        id_agen: data.id_agen,
        id_produk: data.id_produk,
        id_satuan: data.id_satuan
      })
      .first();

    if (existing) {
      return await db.harga_agen.update(existing.id, {
        harga_beli: data.harga_beli,
        terakhir_update: timestamp,
        updated_at: timestamp,
        is_deleted: 0
      });
    }

    const newHarga: HargaAgen = {
      ...data,
      id: generateNanoID(),
      terakhir_update: timestamp,
      updated_at: timestamp,
      is_deleted: 0,
    };

    return await db.harga_agen.add(newHarga);
  }
};
