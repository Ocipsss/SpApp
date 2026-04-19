import { ref, onUnmounted } from 'vue';
import { Html5Qrcode } from 'html5-qrcode';

export function useScanner() {
  const scanner = ref<Html5Qrcode | null>(null);
  const isScanning = ref(false);
  const scanResult = ref<string | null>(null);

  const startScan = async (elementId: string) => {
    try {
      scanner.value = new Html5Qrcode(elementId);
      isScanning.value = true;
      
      await scanner.value.start(
        { facingMode: "environment" }, // Kamera belakang
        { fps: 10, qrbox: { width: 250, height: 150 } },
        (decodedText) => {
          scanResult.value = decodedText;
          if (navigator.vibrate) navigator.vibrate(100);
          stopScan(); // Berhenti setelah dapat barcode
        },
        undefined // Ignore errors for performance
      );
    } catch (err) {
      console.error("Gagal memulai scanner:", err);
      isScanning.value = false;
    }
  };

  const stopScan = async () => {
    if (scanner.value && scanner.value.isScanning) {
      await scanner.value.stop();
      scanner.value = null;
    }
    isScanning.value = false;
  };

  onUnmounted(() => stopScan());

  return { isScanning, scanResult, startScan, stopScan };
}
