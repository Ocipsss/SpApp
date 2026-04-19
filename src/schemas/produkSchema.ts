import { z } from 'zod';

export const produkSchema = z.object({
  nama_produk: z.string().min(3, "Nama produk minimal 3 karakter"),
  barcode: z.string().min(1, "Barcode harus diisi"),
  id_kategori: z.string().min(1, "Kategori harus dipilih"),
  harga_jual: z.number().min(0, "Harga jual tidak boleh negatif"),
  stok_minimum: z.number().default(0),
  satuan_dasar: z.string().min(1, "Satuan harus diisi")
});

export type ProdukInput = z.infer<typeof produkSchema>;
