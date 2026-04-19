import { db } from '@/database/db';
import type { LayananDigital, KategoriLayanan } from '@/database/db';
import { generateNanoID } from '@/utils/nanoid';

export const layananDigitalService = {
  /**
   * Mengambil semua layanan digital yang aktif
   */
  async getAll() {
    return await db.layanan_digital
      .where('is_deleted')
      .equals(0)
      .toArray();
  },

  /**
   * Mengambil detail layanan digital berdasarkan ID
   */
  async getById(id: string) {
    return await db.layanan_digital.get(id);
  },

  /**
   * Mengambil layanan digital berdasarkan kategori tertentu
   */
  async getByKategori(idKategori: string) {
    return await db.layanan_digital
      .where('id_kategori')
      .equals(idKategori)
      .and(item => item.is_deleted === 0)
      .toArray();
  },

  /**
   * Membuat layanan digital baru
   */
  async create(data: Omit<LayananDigital, 'id' | 'updated_at' | 'is_deleted'>) {
    const timestamp = Date.now();
    const newLayanan: LayananDigital = {
      ...data,
      id: generateNanoID(),
      updated_at: timestamp,
      is_deleted: 0,
    };

    return await db.layanan_digital.add(newLayanan);
  },

  /**
   * Memperbarui data layanan digital
   */
  async update(id: string, data: Partial<Omit<LayananDigital, 'id'>>) {
    return await db.layanan_digital.update(id, {
      ...data,
      updated_at: Date.now(),
    });
  },

  /**
   * Menghapus layanan digital secara lunak (Soft Delete)
   */
  async softDelete(id: string) {
    return await db.layanan_digital.update(id, {
      is_deleted: 1,
      updated_at: Date.now(),
    });
  },

  // --- Operasional Kategori Layanan ---

  /**
   * Menghubungkan kategori dengan layanan tambahan
   */
  async linkKategoriLayanan(idKategori: string, idLayananTambahan: string) {
    const id = generateNanoID();
    const timestamp = Date.now();
    
    const mapping: KategoriLayanan = {
      id,
      id_kategori: idKategori,
      id_layanan_tambahan: idLayananTambahan,
      updated_at: timestamp,
      is_deleted: 0
    };

    return await db.kategori_layanan.add(mapping);
  },

  /**
   * Mengambil daftar layanan tambahan berdasarkan kategori
   */
  async getLayananTambahanByKategori(idKategori: string) {
    return await db.kategori_layanan
      .where('id_kategori')
      .equals(idKategori)
      .and(item => item.is_deleted === 0)
      .toArray();
  }
};
