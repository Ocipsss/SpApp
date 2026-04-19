import { db } from '@/database/db';
import type { Hutang, PembayaranHutang } from '@/database/db';
import { generateNanoID } from '@/utils/nanoid';

export const hutangService = {
  /**
   * Mengambil semua data hutang yang belum lunas
   */
  async getPiutangAktif() {
    return await db.hutang
      .where('status_lunas')
      .equals(0)
      .and(item => item.is_deleted === 0)
      .toArray();
  },

  /**
   * Mengambil riwayat hutang berdasarkan ID Member
   */
  async getByMember(idMember: string) {
    return await db.hutang
      .where('id_member')
      .equals(idMember)
      .and(item => item.is_deleted === 0)
      .toArray();
  },

  /**
   * Mencatat hutang baru dari transaksi
   */
  async create(data: Omit<Hutang, 'id' | 'updated_at' | 'is_deleted' | 'status_lunas'>) {
    const timestamp = Date.now();
    const newHutang: Hutang = {
      ...data,
      id: generateNanoID(),
      status_lunas: 0,
      updated_at: timestamp,
      is_deleted: 0,
    };

    return await db.hutang.add(newHutang);
  },

  /**
   * Mencatat pembayaran hutang
   * Mengupdate sisa hutang dan status lunas secara otomatis
   */
  async bayarHutang(idHutang: string, dataBayar: Omit<PembayaranHutang, 'id' | 'id_hutang' | 'updated_at' | 'is_deleted' | 'tanggal_bayar'>) {
    const timestamp = Date.now();
    
    return await db.transaction('rw', [db.hutang, db.pembayaran_hutang], async () => {
      const hutang = await db.hutang.get(idHutang);
      if (!hutang) throw new Error('Data hutang tidak ditemukan');

      const sisaBaru = hutang.sisa_hutang - dataBayar.jumlah_bayar;
      const statusLunas = sisaBaru <= 0 ? 1 : 0;

      // 1. Simpan riwayat pembayaran
      await db.pembayaran_hutang.add({
        ...dataBayar,
        id: generateNanoID(),
        id_hutang: idHutang,
        tanggal_bayar: timestamp,
        updated_at: timestamp,
        is_deleted: 0
      });

      // 2. Update data hutang
      await db.hutang.update(idHutang, {
        sisa_hutang: sisaBaru < 0 ? 0 : sisaBaru,
        status_lunas: statusLunas,
        updated_at: timestamp
      });

      return { sisaBaru, statusLunas };
    });
  },

  /**
   * Mengambil semua riwayat pembayaran untuk satu entri hutang
   */
  async getRiwayatPembayaran(idHutang: string) {
    return await db.pembayaran_hutang
      .where('id_hutang')
      .equals(idHutang)
      .and(item => item.is_deleted === 0)
      .toArray();
  },

  /**
   * Menghapus catatan hutang secara lunak
   */
  async softDelete(id: string) {
    return await db.hutang.update(id, {
      is_deleted: 1,
      updated_at: Date.now(),
    });
  }
};
