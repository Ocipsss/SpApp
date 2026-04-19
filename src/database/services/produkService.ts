import { db } from '@/database/db';
import type { Produk, SatuanProduk } from '@/database/db';
import { generateNanoID } from '@/utils/nanoid'; // Asumsi fungsi export dari nanoid.ts

export const produkService = {
  // Mengambil semua produk yang aktif (is_deleted: 0)
  async getAll() {
    return await db.produk
      .where('is_deleted')
      .equals(0)
      .toArray();
  },

  // Mengambil detail produk beserta satuannya
  async getById(id: string) {
    const produk = await db.produk.get(id);
    if (!produk) return null;

    const satuan = await db.satuan_produk
      .where('id_produk')
      .equals(id)
      .toArray();

    return { ...produk, satuan };
  },

  // Menambah produk baru beserta satuan dasarnya
  async create(
    produkData: Omit<Produk, 'id' | 'updated_at' | 'is_deleted'>,
    satuanData: Omit<SatuanProduk, 'id' | 'id_produk' | 'updated_at' | 'is_deleted'>
  ) {
    const produkId = generateNanoID();
    const timestamp = Date.now();

    return await db.transaction('rw', [db.produk, db.satuan_produk], async () => {
      // 1. Simpan ke tabel produk
      await db.produk.add({
        ...produkData,
        id: produkId,
        updated_at: timestamp,
        is_deleted: 0
      });

      // 2. Simpan ke tabel satuan_produk
      await db.satuan_produk.add({
        ...satuanData,
        id: generateNanoID(),
        id_produk: produkId,
        updated_at: timestamp,
        is_deleted: 0
      });

      return produkId;
    });
  },

  // Soft delete produk (mengubah flag is_deleted menjadi 1)
  async softDelete(id: string) {
    const timestamp = Date.now();
    return await db.produk.update(id, {
      is_deleted: 1,
      updated_at: timestamp
    });
  }
};
