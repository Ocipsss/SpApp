import { nanoid } from 'nanoid';

/**
 * Generator ID unik untuk Sinar Pagi
 * Panjang 12 karakter sudah sangat aman untuk skala retail 
 * agar tidak bentrok (collision) saat sinkronisasi offline.
 */
export const generateId = (prefix: string = ''): string => {
  return prefix ? `${prefix}_${nanoid(12)}` : nanoid(12);
};