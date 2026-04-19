import { db } from '@/database/db';
import type { Pengguna } from '@/database/db';
import { generateNanoID } from '@/utils/nanoid';

export const penggunaService = {
  /**
   * Mengambil semua data pengguna yang aktif
   */
  async getAll() {
    return await db.pengguna
      .where('is_deleted')
      .equals(0)
      .toArray();
  },

  /**
   * Mengambil detail pengguna berdasarkan ID
   */
  async getById(id: string) {
    return await db.pengguna.get(id);
  },

  /**
   * Mengambil data pengguna berdasarkan username (untuk keperluan login)
   */
  async getByUsername(username: string) {
    return await db.pengguna
      .where('nama_pengguna')
      .equals(username)
      .first();
  },

  /**
   * Membuat pengguna baru
   */
  async create(data: Omit<Pengguna, 'id' | 'updated_at' | 'is_deleted' | 'dibuat_pada'>) {
    const timestamp = Date.now();
    const newPengguna: Pengguna = {
      ...data,
      id: generateNanoID(),
      dibuat_pada: timestamp,
      updated_at: timestamp,
      is_deleted: 0,
    };

    return await db.pengguna.add(newPengguna);
  },

  /**
   * Memperbarui data pengguna
   */
  async update(id: string, data: Partial<Omit<Pengguna, 'id' | 'dibuat_pada'>>) {
    return await db.pengguna.update(id, {
      ...data,
      updated_at: Date.now(),
    });
  },

  /**
   * Menghapus pengguna secara lunak (Soft Delete)
   */
  async softDelete(id: string) {
    return await db.pengguna.update(id, {
      is_deleted: 1,
      updated_at: Date.now(),
    });
  },

  /**
   * Mengubah status aktif/nonaktif pengguna
   */
  async toggleStatus(id: string, status: 0 | 1) {
    return await db.pengguna.update(id, {
      status_aktif: status,
      updated_at: Date.now(),
    });
  }
};
