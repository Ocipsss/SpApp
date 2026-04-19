import { z } from 'zod';

export const memberSchema = z.object({
  kode_member: z.string().min(4, "Kode member minimal 4 karakter"),
  nama_member: z.string().min(2, "Nama harus diisi"),
  nomor_telepon: z.string().regex(/^[0-9]+$/, "Hanya boleh angka").min(10, "Minimal 10 digit"),
  alamat: z.string().optional(),
});

export type MemberInput = z.infer<typeof memberSchema>;
