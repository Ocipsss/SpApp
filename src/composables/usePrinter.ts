import { ref } from 'vue';
import EscPosEncoder from 'esc-pos-encoder';
import { pengaturanService } from '@/database/services/pengaturanService';

export function usePrinter() {
  const isPrinting = ref(false);

  const printStruk = async (transaksi: any, items: any[]) => {
    isPrinting.value = true;
    try {
      const config = await pengaturanService.getPengaturan();
      const encoder = new EscPosEncoder();

      // Membangun format struk
      let result = encoder
        .initialize()
        .align('center')
        .line(config?.nama_toko || 'TOKO KITA')
        .line(config?.alamat_toko || '')
        .line('--------------------------------')
        .align('left');

      items.forEach(item => {
        result.line(`${item.nama_produk}`)
              .line(`${item.qty} x ${item.harga} = ${item.qty * item.harga}`);
      });

      const resultBuffer = result
        .line('--------------------------------')
        .align('center')
        .line('Terima Kasih')
        .encode();

      // Di sini hubungkan dengan library Bluetooth/USB yang ada di package.json Anda
      // Misal: navigator.bluetooth.requestDevice(...) atau library serupa
      console.log("Binary data siap dikirim ke printer thermal");
      
      return true;
    } catch (err) {
      console.error("Gagal print:", err);
      return false;
    } finally {
      isPrinting.value = false;
    }
  };

  return { isPrinting, printStruk };
}
