import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { transaksiService } from '@/database/services/transaksiService';

export const useKasirStore = defineStore('kasir', () => {
  const itemKeranjang = ref<any[]>([]);
  const idMemberAktif = ref<string | null>(null);

  const totalHarga = computed(() => {
    return itemKeranjang.value.reduce((total, item) => total + (item.harga * item.qty), 0);
  });

  function tambahKeKeranjang(produk: any) {
    const eksis = itemKeranjang.value.find(i => i.id_produk === produk.id);
    if (eksis) {
      eksis.qty++;
    } else {
      itemKeranjang.value.push({
        id_produk: produk.id,
        nama: produk.nama_produk,
        harga: produk.harga_jual,
        qty: 1
      });
    }
  }

  async function prosesTransaksi(metodeBayar: string) {
    const payload = {
      total_bayar: totalHarga.value,
      metode_pembayaran: metodeBayar,
      id_member: idMemberAktif.value,
      // ... data lainnya
    };
    
    await transaksiService.simpanTransaksi(payload, itemKeranjang.value);
    itemKeranjang.value = []; // Kosongkan keranjang setelah sukses
  }

  return { 
    itemKeranjang, 
    totalHarga, 
    tambahKeKeranjang, 
    prosesTransaksi 
  };
});
