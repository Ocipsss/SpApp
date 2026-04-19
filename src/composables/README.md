# 📂 Folder: Composables

## Deskripsi
Folder ini berisi fungsi-fungsi logika yang memanfaatkan **Vue Composition API** (fungsi yang diawali dengan kata `use...`). Di sini kita memisahkan logika bisnis yang kompleks agar tidak menumpuk di dalam komponen.

## Isi
- `useScanner.ts`: Logika integrasi kamera untuk scan barcode/QR.
- `usePrinter.ts`: Logika untuk berkomunikasi dengan printer ESC/POS.
- `useAuth.ts`: Logika login, logout, dan pengecekan sesi user.
- `useSync.ts`: Logika pemantauan status sinkronisasi Dexie ke Firebase.

## Alasan Penggunaan
- **Logic Reusability:** Logika yang sama (misal: format mata uang atau kalkulasi stok) bisa dipakai di banyak komponen tanpa duplikasi kode.
- **Clean Templates:** Membuat file `.vue` tetap ramping karena fokus pada tampilan, sementara logika beratnya "ditarik" dari sini.
- **Stateful Logic:** Berbeda dengan `utils/`, composables bisa memiliki *state* yang reaktif (menggunakan `ref` atau `reactive`).

> **Catatan:** Jika sebuah logika membutuhkan akses data global secara permanen, pertimbangkan untuk menggunakan **Pinia Store**. Composables lebih cocok untuk logika yang memiliki siklus hidup (lifecycle) tertentu.