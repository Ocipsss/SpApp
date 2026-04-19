# 📂 Folder: Layout

## Deskripsi
Folder ini berisi komponen pembungkus (*wrapper*) yang menentukan struktur utama halaman aplikasi. Layout biasanya berisi elemen yang selalu muncul di banyak halaman, seperti Navigation Bar atau Sidebar.

## Isi
- `MainLayout.vue`: Layout utama dengan Sidebar untuk manajemen stok dan laporan.
- `CashierLayout.vue`: Layout khusus kasir (POS) yang fokus pada area kerja luas (seringkali tanpa sidebar agar tidak mengganggu).
- `AuthLayout.vue`: Layout sederhana untuk halaman Login atau Register.

## Alasan Penggunaan
- **DRY (Don't Repeat Yourself):** Kamu tidak perlu menulis ulang kode Header atau Sidebar di setiap halaman (view).
- **Flexibility:** Memudahkan perubahan struktur global. Jika ingin mengubah warna Sidebar, kamu cukup mengubahnya di satu file layout.
- **Dynamic Routing:** Di Vue Router, kamu bisa menentukan halaman mana menggunakan layout mana, sehingga transisi antar halaman terasa lebih halus.

> **Tips:** Gunakan komponen `<slot />` di dalam file layout agar konten dari folder `views/` bisa masuk dan tampil di tengah-tengah kerangka layout tersebut.