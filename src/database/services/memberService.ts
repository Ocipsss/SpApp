import { db } from '@/database/db';
import type { Member } from '@/database/db';
import { generateNanoID } from '@/utils/nanoid';

export const memberService = {
  /**
   * Mengambil semua data member yang aktif
   */
  async getAll() {
    return await db.member
      .where('is_deleted')
      .equals(0)
      .toArray();
  },

  /**
   * Mengambil detail member berdasarkan ID
   */
  async getById(id: string) {
    return await db.member.get(id);
  },

  /**
   * Mencari member berdasarkan kode atau nomor telepon
   */
  async searchMember(query: string) {
    return await db.member
      .filter((member) => {
        return (
          member.is_deleted === 0 &&
          (member.kode_member.includes(query) || member.nomor_telepon.includes(query))
        );
      })
      .toArray();
  },

  /**
   * Membuat member baru
   */
  async create(data: Omit<Member, 'id' | 'updated_at' | 'is_deleted' | 'tanggal_registrasi'>) {
    const timestamp = Date.now();
    const newMember: Member = {
      ...data,
      id: generateNanoID(),
      tanggal_registrasi: timestamp,
      updated_at: timestamp,
      is_deleted: 0,
    };

    return await db.member.add(newMember);
  },

  /**
   * Memperbarui data member
   */
  async update(id: string, data: Partial<Omit<Member, 'id' | 'tanggal_registrasi'>>) {
    return await db.member.update(id, {
      ...data,
      updated_at: Date.now(),
    });
  },

  /**
   * Menghapus member secara lunak (Soft Delete)
   */
  async softDelete(id: string) {
    return await db.member.update(id, {
      is_deleted: 1,
      updated_at: Date.now(),
    });
  },

  /**
   * Menambah atau mengurangi poin member
   */
  async updatePoin(id: string, jumlahPoin: number) {
    const member = await db.member.get(id);
    if (!member) throw new Error('Member tidak ditemukan');

    const poinBaru = (member.total_poin || 0) + jumlahPoin;
    
    return await db.member.update(id, {
      total_poin: poinBaru,
      updated_at: Date.now(),
    });
  }
};
