// <do-tracking>: halaman untuk cari DO atau NIM, lihat riwayat perjalanan, dan tambah status baru
const DoTrackingOptions = {
  props: ["dataUt"],
  data() {
    return {
      kataKunci: "",
      kataAktif: "",
      tampilForm: false,
      nomorAktif: "",
      keterangan: ""
    };
  },
  computed: {
    // hasil pencarian hanya tampil setelah pengguna menekan Enter; sebelum itu kosong
    hasilPencarian() {
      const semua = this.dataUt.tracking;
      const kata = this.kataAktif.toLowerCase();
      if (kata === "") return {};
      const hasil = {};
      const diri = this;
      Object.keys(semua).forEach(function(nomor) {
        const d = semua[nomor];
        const cocok = nomor.toLowerCase().includes(kata) || String(d.nim).includes(kata);
        if (cocok) hasil[nomor] = d;
      });
      return hasil;
    }
  },
  methods: {
    cari() {
      this.kataAktif = this.kataKunci.trim();
    },
    resetCari() {
      this.kataKunci = "";
      this.kataAktif = "";
    },
    statusDo(status) {
      if (status === "Tiba") return { warna: "hijau", teks: status };
      if (status === "Dalam Perjalanan") return { warna: "kuning", teks: status };
      return { warna: "abu", teks: status };
    },
    namaEkspedisi(kode) {
      const e = this.dataUt.pengirimanList.find(function(p) { return p.kode === kode; });
      return e ? e.kode + " - " + e.nama : kode;
    },
    detailPaket(nomor) {
      const d = this.dataUt.tracking[nomor];
      const kode = d.paket;
      return this.dataUt.paket.find(function(p) { return p.kode === kode; }) || { nama: "-" };
    },
    pilihKartu(nomor) {
      this.nomorAktif = nomor;
      this.keterangan = "";
    },
    batalProgress() {
      this.nomorAktif = "";
      this.keterangan = "";
    },
    sekarang() {
      const d = new Date();
      const dua = function(n) { return String(n).padStart(2, "0"); };
      return d.getFullYear() + "-" + dua(d.getMonth() + 1) + "-" + dua(d.getDate()) +
        " " + dua(d.getHours()) + ":" + dua(d.getMinutes()) + ":" + dua(d.getSeconds());
    },
    tambahProgress() {
      if (this.nomorAktif === "" || this.keterangan === "") return;
      this.dataUt.tracking[this.nomorAktif].perjalanan.push({
        waktu: this.sekarang(),
        keterangan: this.keterangan
      });
      this.keterangan = "";
      this.nomorAktif = "";
    }
  }
};
