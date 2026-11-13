// <order-form>: formulir pemesanan bahan ajar, nomor DO-nya dibuat otomatis
const OrderFormOptions = {
  props: ["dataUt"],
  data() {
    return {
      form: {
        nim: "",
        nama: "",
        ekspedisi: "",
        paket: "",
        tanggalKirim: new Date().toISOString().slice(0, 10)
      },
      detailValidasi: "",
      pesanSukses: ""
    };
  },
  computed: {
    // nomor DO dibuat otomatis: DO + tahun sekarang + urutan berikutnya
    nomorBerikutnya() {
      const tahun = new Date().getFullYear();
      const pola = new RegExp("^DO" + tahun + "-(\\d+)$");
      let maks = 0;
      Object.keys(this.dataUt.tracking).forEach(function(nomor) {
        const cocok = nomor.match(pola);
        if (cocok) maks = Math.max(maks, Number(cocok[1]));
      });
      return "DO" + tahun + "-" + String(maks + 1).padStart(3, "0");
    },
    paketDipilih() {
      const kode = this.form.paket;
      return this.dataUt.paket.find(function(p) { return p.kode === kode; }) || null;
    }
  },
  watch: {
    // watcher: kalau ada DO baru yang tercatat, pesan sukses yang lama langsung dihapus
    nomorBerikutnya() {
      this.pesanSukses = "";
    }
  },
  methods: {
    validasi() {
      if (!this.form.nim) return "NIM wajib diisi";
      if (!/^\d{7,12}$/.test(this.form.nim)) return "NIM harus 7 sampai 12 digit angka";
      if (!this.form.nama) return "Nama wajib diisi";
      if (!this.form.ekspedisi) return "Ekspedisi wajib dipilih";
      if (!this.form.paket) return "Paket bahan ajar wajib dipilih";
      if (!this.form.tanggalKirim) return "Tanggal kirim wajib diisi";
      return "";
    },
    sekarang() {
      const d = new Date();
      const dua = function(n) { return String(n).padStart(2, "0"); };
      return d.getFullYear() + "-" + dua(d.getMonth() + 1) + "-" + dua(d.getDate()) +
        " " + dua(d.getHours()) + ":" + dua(d.getMinutes()) + ":" + dua(d.getSeconds());
    },
    kirim() {
      this.detailValidasi = this.validasi();
      if (this.detailValidasi !== "") return;
      const paket = this.paketDipilih;
      const nomor = this.nomorBerikutnya;
      const doBaru = {
        nim: this.form.nim,
        nama: this.form.nama,
        status: "Diproses",
        ekspedisi: this.form.ekspedisi,
        tanggalKirim: this.form.tanggalKirim,
        paket: paket.kode,
        total: paket.harga,
        perjalanan: [{
          waktu: this.sekarang(),
          keterangan: "Pesanan diterima di gudang UT"
        }]
      };
      this.$emit("tambah-do", { nomor: nomor, isi: doBaru });
      this.pesanSukses = "Pesanan tercatat dengan nomor " + nomor;
      this.detailValidasi = "";
      this.form.nim = "";
      this.form.nama = "";
      this.form.ekspedisi = "";
      this.form.paket = "";
    }
  }
};
