# 📂 Folder: Utils (Utilities)

## Deskripsi
Folder ini berisi fungsi-fungsi pembantu (*helper functions*) yang bersifat murni (**Pure Functions**). Fungsi di sini biasanya bertugas mengolah data sederhana dan tidak memiliki ketergantungan pada State Vue atau lifecycle komponen.

## Isi
- `formatCurrency.ts`: Mengubah angka menjadi format Rupiah (IDR).
- `dateFormatter.ts`: Fungsi untuk memformat tanggal mentah menjadi teks yang mudah dibaca.
- `barcodeGenerator.ts`: Logika sederhana untuk memvalidasi atau memproses string barcode.
- `unitConverter.ts`: Fungsi untuk menghitung konversi satuan (misal: Dus ke Pcs).

## Alasan Penggunaan
- **Testability:** Karena bersifat *pure functions* (input sama selalu menghasilkan output yang sama), fungsi-fungsi di sini sangat mudah diuji menggunakan **Vitest**.
- **Reusability:** Fungsi ini bisa dipakai di mana saja, baik di dalam *Composables*, *Store*, atau langsung di komponen UI.
- **Portability:** Kode di sini sangat bersih dari dependensi framework, sehingga jika suatu saat kamu berganti framework, logika utilitas ini tetap bisa digunakan.

> **Prinsip:** Jika sebuah fungsi tidak butuh `ref`, `reactive`, atau akses ke `store`, maka tempat terbaiknya adalah di folder **Utils**.