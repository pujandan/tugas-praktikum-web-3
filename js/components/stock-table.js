// <ba-stock-table>: halaman daftar stok bahan ajar lengkap dengan filter, urutan, dan kelola datanya
const StockTableOptions = {
  props: ["dataUt"],
  data() {
    return {
      judul: "Daftar Stok Bahan Ajar SITTA",
      filterUt: "semua",
      filterKategori: "semua",
      hanyaReorder: false,
      sortBy: "",
      arah: "naik",
      form: { kode: "", judul: "", kategori: "", upbjj: "", lokasiRak: "", harga: null, qty: null, safety: null },
      indeksEdit: -1,
      pesanError: "",
      modalHapus: null,
      tampilForm: false
    };
  },
  computed: {
    // daftar kategori menyesuaikan UT-Daerah yang sedang dipilih
    kategoriTersedia() {
      if (this.filterUt === "semua") return this.dataUt.kategoriList;
      const diri = this;
      return this.dataUt.kategoriList.filter(function(kat) {
        return this.dataUt.stok.some(function(b) {
          return b.upbjj === this.filterUt && b.kategori === kat;
        }, this);
      }, diri);
    },
    // semua filter dan pengurutan di satu computed biar hasilnya tidak dihitung ulang terus
    daftarTersaring() {
      let hasil = this.dataUt.stok;
      const diri = this;
      if (this.filterUt !== "semua") {
        hasil = hasil.filter(function(b) { return b.upbjj === diri.filterUt; });
      }
      if (this.filterUt !== "semua" && this.filterKategori !== "semua") {
        hasil = hasil.filter(function(b) { return b.kategori === diri.filterKategori; });
      }
      if (this.hanyaReorder) {
        hasil = hasil.filter(function(b) { return b.qty === 0 || b.qty < b.safety; });
      }
      if (this.sortBy !== "") {
        const kolom = this.sortBy;
        const arah = this.arah;
        hasil = hasil.slice().sort(function(a, b) {
          const kiri = a[kolom];
          const kanan = b[kolom];
          const banding = typeof kiri === "string" ? kiri.localeCompare(kanan) : kiri - kanan;
          return arah === "naik" ? banding : -banding;
        });
      }
      return hasil;
    }
  },
  watch: {
    // kalau UT-Daerah berganti, pilihan kategorinya ikut direset
    filterUt(nilai) {
      if (nilai === "semua") {
        this.filterKategori = "semua";
      } else if (!this.kategoriTersedia.includes(this.filterKategori)) {
        this.filterKategori = "semua";
      }
    }
  },
  methods: {
    statusWarna(buku) {
      if (buku.qty === 0) return "merah";
      if (buku.qty < buku.safety) return "kuning";
      return "hijau";
    },
    statusTeks(buku) {
      if (buku.qty === 0) return "Kosong";
      if (buku.qty < buku.safety) return "Menipis";
      return "Aman";
    },
    resetFilter() {
      this.filterUt = "semua";
      this.filterKategori = "semua";
      this.hanyaReorder = false;
      this.sortBy = "";
      this.arah = "naik";
    },
    cariIndeks(buku) {
      return this.dataUt.stok.findIndex(function(b) {
        return b.kode === buku.kode && b.upbjj === buku.upbjj;
      });
    },
    bukaFormBaru() {
      this.bersihkanForm();
      this.indeksEdit = -1;
      this.pesanError = "";
      this.tampilForm = true;
      this.gulirKeForm();
    },
    gulirKeForm() {
      this.$nextTick(function() {
        const form = document.getElementById("formStok");
        if (form) form.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    },
    mulaiEdit(buku) {
      this.indeksEdit = this.cariIndeks(buku);
      this.form = Object.assign({}, buku);
      this.pesanError = "";
      this.tampilForm = true;
      this.gulirKeForm();
    },
    batalEdit() {
      this.bersihkanForm();
      this.indeksEdit = -1;
      this.tampilForm = false;
    },
    bersihkanForm() {
      this.form = { kode: "", judul: "", kategori: "", upbjj: "", lokasiRak: "", harga: null, qty: null, safety: null };
    },
    validasi() {
      if (!this.form.kode || !this.form.judul) return "Kode dan judul mata kuliah wajib diisi";
      if (!this.form.kategori || !this.form.upbjj) return "Kategori dan UT-Daerah wajib dipilih";
      if (!this.form.lokasiRak) return "Lokasi rak wajib diisi";
      if (this.form.harga === null || this.form.harga < 0) return "Harga harus angka minimal 0";
      if (this.form.qty === null || this.form.qty < 0) return "Jumlah stok harus angka minimal 0";
      if (this.form.safety === null || this.form.safety < 0) return "Safety stock harus angka minimal 0";
      return "";
    },
    simpanForm() {
      this.pesanError = this.validasi();
      if (this.pesanError !== "") return;
      if (this.indeksEdit === -1) {
        const diri = this;
        const sudahAda = this.dataUt.stok.some(function(b) {
          return b.kode === diri.form.kode && b.upbjj === diri.form.upbjj;
        });
        if (sudahAda) {
          this.pesanError = "Kode tersebut sudah terdaftar di UT-Daerah ini";
          return;
        }
        this.dataUt.stok.push(Object.assign({}, this.form));
      } else {
        this.dataUt.stok[this.indeksEdit] = Object.assign({}, this.form);
        this.indeksEdit = -1;
      }
      this.bersihkanForm();
      this.tampilForm = false;
    },
    mintaHapus(buku) {
      this.modalHapus = buku;
    },
    konfirmasiHapus() {
      const indeks = this.cariIndeks(this.modalHapus);
      if (indeks !== -1) this.dataUt.stok.splice(indeks, 1);
      this.modalHapus = null;
    }
  }
};
