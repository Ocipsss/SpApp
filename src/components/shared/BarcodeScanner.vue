<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useScanner } from '@/composables/useScanner';

const emit = defineEmits(['detected']);
const { isScanning, startScan, stopScan } = useScanner();

onMounted(() => {
  startScan('reader');
});

onUnmounted(() => {
  stopScan();
});
</script>

<template>
  <div class="relative overflow-hidden rounded-2xl bg-black aspect-video">
    <div id="reader" class="w-full"></div>
    <div v-if="isScanning" class="absolute inset-0 border-2 border-blue-500 animate-pulse pointer-events-none"></div>
    <div class="absolute bottom-4 left-0 right-0 text-center">
      <p class="text-white text-xs bg-black/50 inline-block px-3 py-1 rounded-full">
        Arahkan kamera ke barcode produk
      </p>
    </div>
  </div>
</template>
