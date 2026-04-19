import { z } from 'zod';

export const transaksiDetailSchema = z.object({
  id_produk: z.string(),
  jumlah: z.number().positive("Jumlah harus lebih dari 0"),
  harga_satuan: z.number().min(0),
  subtotal: z.number().min(0)
});

export const transaksiSchema = z.object({
  metode_pembayaran: z.enum(['tunai', 'transfer', 'qris', 'hutang']),
  total_bayar: z.number().min(0),
  nominal_terima: z.number().min(0),
  kembalian: z.number().min(0),
  items: z.array(transaksiDetailSchema).nonempty("Keranjang tidak boleh kosong")
});

export type TransaksiInput = z.infer<typeof transaksiSchema>;
