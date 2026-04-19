<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useKasirStore } from '@/stores/kasirStore';
import { useProdukStore } from '@/stores/produkStore';
import { useScanner } from '@/composables/useScanner';
import { useCurrency } from '@/composables/useCurrency';

// Import Components dari folder yang sudah dibuat
import BaseButton from '@/components/ui/BaseButton.vue';
import BarcodeScanner from '@/components/shared/BarcodeScanner.vue';
import PriceSplitter from '@/components/shared/PriceSplitter.vue';

// Inisialisasi Store & Composables
const kasirStore = useKasirStore();
const produkStore = useProdukStore();
const { formatRupiah } = useCurrency();
const { scanResult, isScanning, startScan, stopScan } = useScanner();

// State Lokal UI
const showScanner = ref(false);
const isProcessing = ref(false);

// Load data produk saat view dibuka
onMounted(async () => {
  await produkStore.fetchProduk();
});

// Handler Scanner
const handleToggleScanner = () => {
  showScanner.value = !showScanner.value;
  if (!showScanner.value) stopScan();
};

const onBarcodeDetected = (barcode: string) => {
  const produk = produkStore.cariByBarcode(barcode);
  if (produk) {
    kasirStore.tambahKeKeranjang(produk);
    // Jika di HP, beri feedback getar
    if (navigator.vibrate) navigator.vibrate(50);
  }
};

// Handler Transaksi
const handleBayar = async () => {
  isProcessing.value = true;
  try {
    await kasirStore.prosesTransaksi('tunai');
    alert('Transaksi Berhasil Simpan!');
  } catch (error) {
    alert('Gagal memproses transaksi');
  } finally {
    isProcessing.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col h-screen bg-gray-50">
    <header class="p-4 bg-white border-b flex justify-between items-center sticky top-0 z-10">
      <div>
        <h1 class="text-lg font-bold text-gray-800">Penjualan Kasir</h1>
        <p class="text-xs text-gray-500">Item: {{ kasirStore.itemKeranjang.length }}</p>
      </div>
      <BaseButton 
        @click="handleToggleScanner" 
        :variant="showScanner ? 'danger' : 'secondary'" 
        size="sm"
      >
        {{ showScanner ? 'Tutup' : 'Scan' }}
      </BaseButton>
    </header>

    <div v-if="showScanner" class="bg-black p-4">
      <BarcodeScanner @detected="onBarcodeDetected" />
    </div>

    <main class="flex-1 overflow-y-auto p-4 space-y-3">
      <div v-if="kasirStore.itemKeranjang.length === 0" class="flex flex-col items-center justify-center h-64 opacity-30">
        <span class="text-4xl mb-2">🛒</span>
        <p class="text-sm font-medium">Keranjang masih kosong</p>
      </div>

      <div 
        v-for="item in kasirStore.itemKeranjang" 
        :key="item.id_produk"
        class="flex justify-between items-center p-3 bg-white rounded-2xl shadow-sm border border-gray-100"
      >
        <div class="flex-1">
          <h4 class="text-sm font-bold text-gray-800 line-clamp-1">{{ item.nama }}</h4>
          <p class="text-xs text-gray-400">{{ formatRupiah(item.harga) }}</p>
        </div>

        <div class="flex items-center gap-3">
          <button 
            @click="item.qty--" 
            class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200"
            :disabled="item.qty <= 1"
          >
            -
          </button>
          <span class="w-4 text-center font-bold text-sm">{{ item.qty }}</span>
          <button 
            @click="item.qty++" 
            class="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center active:bg-blue-100"
          >
            +
          </button>
        </div>
      </div>
    </main>

    <footer class="p-4 bg-white border-t border-gray-100 rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div class="flex justify-between items-center mb-4 px-2">
        <span class="text-sm font-medium text-gray-500">Total Pembayaran</span>
        <PriceSplitter :amount="kasirStore.totalHarga" size="lg" />
      </div>

      <div class="flex gap-2">
        <BaseButton 
          variant="secondary" 
          class="flex-1 py-4" 
          :disabled="kasirStore.itemKeranjang.length === 0"
          @click="kasirStore.itemKeranjang = []"
        >
          Reset
        </BaseButton>
        <BaseButton 
          variant="primary" 
          class="flex-[2] py-4 shadow-lg shadow-blue-200" 
          :loading="isProcessing"
          :disabled="kasirStore.itemKeranjang.length === 0"
          @click="handleBayar"
        >
          Proses Bayar
        </BaseButton>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Menghilangkan scrollbar tapi tetap bisa di scroll */
main::-webkit-scrollbar {
  display: none;
}
main {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
