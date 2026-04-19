import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { produkService } from '@/database/services/produkService';
import type { Produk } from '@/database/db';

export const useProdukStore = defineStore('produk', () => {
  const daftarProduk = ref<Produk[]>([]);
  const loading = ref(false);

  // Getter: Cari produk berdasarkan barcode untuk Kasir
  const cariByBarcode = computed(() => (barcode: string) => {
    return daftarProduk.value.find(p => p.barcode === barcode);
  });

  // Action: Load data dari IndexedDB ke State
  async function fetchProduk() {
    loading.value = true;
    try {
      daftarProduk.value = await produkService.getAll();
    } finally {
      loading.value = false;
    }
  }

  // Action: Tambah produk dan langsung update state (reaktif)
  async function tambahProduk(data: any, satuan: any) {
    const id = await produkService.create(data, satuan);
    await fetchProduk(); // Refresh state
    return id;
  }

  return { 
    daftarProduk, 
    loading, 
    cariByBarcode, 
    fetchProduk, 
    tambahProduk 
  };
});
