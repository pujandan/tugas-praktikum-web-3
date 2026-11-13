# SITTA UT: Tugas Praktik 3 Pemrograman Berbasis Web (STSI4209)

Aplikasi front-end pemesanan dan monitoring bahan ajar Universitas Terbuka, dibangun dengan Vue.js 2 (CDN) dalam satu halaman dengan tiga tab: Stok Bahan Ajar (filter, urutkan, tambah, ubah, hapus dengan konfirmasi), Tracking Delivery Order (cari DO/NIM, riwayat perjalanan, tambah progress), dan Pesan Bahan Ajar (formulir pemesanan dengan nomor DO otomatis). Data dummy dari `data/dataBahanAjar.json`, tanpa backend. Sesuai ketentuan Tugas Praktik 3, kode diorganisasikan dengan Vue Component dan Template terpisah: lima custom element dengan template di folder `templates/`.

## Informasi Akademik

| | |
| **Nama** | Pujan Daniar |
| **NIM** | 053074671 |
| **Prodi / Fakultas** | Sistem Informasi, FST |
| **Mata Kuliah** | Pemrograman Berbasis Web (STSI4209) |
| **UPBJJ UT** | 24, UPBJJ Bandung |
| **Video** | https:// (tempel link rekaman penjelasan) |

Universitas Terbuka, 2026

## Akses Aplikasi

Aplikasi sudah online dan bisa diakses di: **https://tugas-web.daniar.dev**

## Data Dummy untuk Mencoba

**Tracking:** cari nomor `DO2025-0001` (status "Dalam Perjalanan" dengan riwayat perjalanan) atau NIM `123456789`. Hasil pencarian baru muncul setelah menekan Enter; tekan Esc untuk mereset.

**Stok:** filter UT-Daerah lalu pilih Kategori (muncul setelah UT-Daerah dipilih), centang "Perlu Re-Order" untuk melihat stok di bawah safety atau habis, urutkan berdasarkan judul/stok/harga, atau Reset Filter. Klik ikon pensil untuk mengubah data dan ikon tempat sampah untuk menghapus dengan konfirmasi.

**Tambah dan Pesan:** tombol "Tambah Bahan Ajar" membuka formulir di bawah tabel (Enter untuk menyimpan). Formulir pemesanan membuat DO baru dengan nomor otomatis (DO-tahun-sequence), detail isi paket muncul saat paket dipilih, tanggal kirim berformat Indonesia, dan total harga berformat Rupiah.

## Struktur

```
tugas3-vue-ut/
├─ index.html                # root: mount #app, navigasi 3 tab
├─ assets/css/style.css      # gaya global (font Inter, kartu, tabel, badge)
├─ data/dataBahanAjar.json   # sumber data (JSON, di-fetch saat aplikasi dibuka)
├─ js/
│  ├─ app.js                 # root: filter global (Rupiah, buah, tanggal ID) + registrasi komponen
│  ├─ services/api.js        # fetch data JSON dan fetch template komponen
│  └─ components/
│     ├─ stock-table.js      # <ba-stock-table>
│     ├─ do-tracking.js      # <do-tracking>
│     ├─ order-form.js       # <order-form>
│     ├─ status-badge.js     # <status-badge>
│     └─ app-modal.js        # <app-modal>
├─ templates/                # template tiap komponen (file HTML terpisah)
└─ font/inter.ttf
```
