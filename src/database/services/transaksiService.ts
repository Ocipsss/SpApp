import { db } from '@/database/db';
import type { Transaksi, TransaksiDetail } from '@/database/db';
import { generateNanoID } from '@/utils/nanoid';

export const transaksiService = {
  // Menyimpan transaksi penjualan baru
  async simpanTransaksi(
    transaksiData: Omit<Transaksi, 'id' | 'updated_at' | 'is_deleted' | 'status_sinkronisasi'>,
    itemPenjualan: Omit<TransaksiDetail, 'id' | 'id_transaksi' | 'updated_at' | 'is_deleted'>[]
  ) {
    const transaksiId = generateNanoID();
    const timestamp = Date.now();

    return await db.transaction('rw', [db.transaksi, db.transaksi_detail, db.stok], async () => {
      // 1. Simpan Header Transaksi
      await db.transaksi.add({
        ...transaksiData,
        id: transaksiId,
        status_sinkronisasi: 0, // Default 0 untuk diproses SyncManager nanti
        updated_at: timestamp,
        is_deleted: 0
      });

      // 2. Simpan Detail Transaksi & Update Stok (Looping)
      for (const item of itemPenjualan) {
        const detailId = generateNanoID();
        
        await db.transaksi_detail.add({
          ...item,
          id: detailId,
          id_transaksi: transaksiId,
          updated_at: timestamp,
          is_deleted: 0
        });

        // Logika pengurangan stok bisa ditambahkan di sini sesuai kebutuhan operasional
      }

      return transaksiId;
    });
  }
};
