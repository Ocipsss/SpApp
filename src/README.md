# 📂 Folder: src/ (Sinar Pagi POS Core)

Ini adalah folder utama aplikasi. Pengembangan dilakukan dengan prinsip **Separation of Concerns (SoC)**: memisahkan logika bisnis, akses database, dan tampilan UI agar aplikasi ringan dan mudah dikelola dari perangkat mobile.

---

## 🏗️ Struktur Arsitektur

| Folder | Tanggung Jawab (Responsibility) | Prinsip SoC |
| :--- | :--- | :--- |
| `api/` | Integrasi dengan layanan eksternal (PPOB, Layanan Digital). | **External Bridge** |
| `assets/` | File statis seperti gambar, logo, dan ikon SVG. | **Static Resources** |
| `components/` | Komponen UI yang dapat digunakan kembali (Atomic Design). | **Visual Blocks** |
| `composables/` | Logika stateful yang bisa dipakai ulang (Scanner, Printer, Auth). | **Shared Logic** |
| `constants/` | Variabel tetap (konfigurasi pajak, kategori default, dll). | **Immutable Data** |
| `database/` | Definisi Dexie.js (`db.ts`) dan **Services** untuk CRUD. | **Data Access Layer** |
| `layout/` | Kerangka halaman (MainLayout dengan BottomNav/Sidebar). | **Structural Shell** |
| `lib/` | Inisialisasi library pihak ketiga (Firebase SDK). | **Third-party Config** |
| `router/` | Pengatur navigasi dan akses halaman (Navigation Guards). | **Traffic Control** |
| `schemas/` | Validasi data menggunakan Zod (Produk, Transaksi). | **Data Integrity** |
| `stores/` | State management global menggunakan Pinia. | **Global State** |
| `types/` | Definisi interface dan tipe data TypeScript. | **Type Safety** |
| `utils/` | Fungsi pembantu murni (ID Generator, Date Formatter). | **Pure Helpers** |
| `views/` | Halaman utama aplikasi (Orchestrator). | **Pages/Views** |

---

## 🚦 Aturan Alur Data (Data Flow)

Untuk menjaga kode tetap bersih, ikuti hierarki pemanggilan berikut:

1. **View** memanggil **Store** (Pinia).
2. **Store** memanggil **Service** (Database).
3. **Service** melakukan aksi ke **Dexie/Firebase**.
4. **Components** hanya menerima data via `props` dan mengirim aksi via `emits`.

> **⚠️ PENTING:** Jangan pernah memanggil `db.table` langsung di dalam file `.vue` di folder `views/`. Gunakan Service yang tersedia di `src/database/services/`.

---

## 🛠️ Catatan Pengembangan (Mobile Coding)

* **PWA Ready:** Pastikan setiap fitur baru dites dalam kondisi offline.
* **Performance:** Gunakan *Dynamic Import* di `router/index.ts` untuk memisahkan chunk kode agar aplikasi tetap cepat di HP dengan RAM terbatas.
* **Scaling:** Jika folder `components/` mulai penuh, pecah kembali ke sub-folder yang lebih spesifik (misal: `components/pos/`, `components/print/`).
