import { db } from '@/database/db';
import type { LogAktivitas } from '@/database/db';
import { generateNanoID } from '@/utils/nanoid';

export const logService = {
  /**
   * Mencatat aktivitas baru ke database
   */
  async addLog(data: Omit<LogAktivitas, 'id' | 'updated_at' | 'is_deleted' | 'dibuat_pada'>) {
    const timestamp = Date.now();
    const newLog: LogAktivitas = {
      ...data,
      id: generateNanoID(),
      dibuat_pada: timestamp,
      updated_at: timestamp,
      is_deleted: 0,
    };

    return await db.log_aktivitas.add(newLog);
  },

  /**
   * Mengambil log berdasarkan tabel tertentu (misal: semua perubahan pada tabel 'produk')
   */
  async getByTable(tableName: string) {
    return await db.log_aktivitas
      .where('tabel_terkait')
      .equals(tableName)
      .reverse()
      .sortBy('dibuat_pada');
  },

  /**
   * Mengambil log berdasarkan pengguna tertentu
   */
  async getByUser(idPengguna: string) {
    return await db.log_aktivitas
      .where('id_pengguna')
      .equals(idPengguna)
      .reverse()
      .sortBy('dibuat_pada');
  },

  /**
   * Mengambil log untuk data spesifik (misal: riwayat perubahan satu produk tertentu)
   */
  async getByDataReference(idData: string) {
    return await db.log_aktivitas
      .where('id_data_terkait')
      .equals(idData)
      .reverse()
      .sortBy('dibuat_pada');
  },

  /**
   * Menghapus log lama (Maintenance)
   * Menghapus log yang lebih tua dari timestamp yang ditentukan
   */
  async clearOldLogs(beforeTimestamp: number) {
    return await db.log_aktivitas
      .where('dibuat_pada')
      .below(beforeTimestamp)
      .delete();
  }
};
