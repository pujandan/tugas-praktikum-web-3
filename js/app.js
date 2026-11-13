// Root aplikasi: ambil data dan template, daftarkan filter dan komponen, lalu jalankan Vue
(async function() {
  const data = await api.muatData();
  const [tplBadge, tplModal, tplStok, tplOrder, tplTrack] = await Promise.all([
    api.muatTemplate("status-badge"),
    api.muatTemplate("app-modal"),
    api.muatTemplate("stock-table"),
    api.muatTemplate("order-form"),
    api.muatTemplate("do-tracking")
  ]);

  // filter global biar tampilan angka dan tanggal lebih rapi
  Vue.filter("rupiah", function(nilai) {
    return "Rp " + Number(nilai || 0).toLocaleString("id-ID");
  });
  Vue.filter("buah", function(nilai) {
    return nilai + " buah";
  });
  Vue.filter("tanggalID", function(nilai) {
    if (!nilai) return "-";
    const bagian = String(nilai).split("-");
    const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return bagian[2] + " " + bulan[Number(bagian[1]) - 1] + " " + bagian[0];
  });

  Vue.component("status-badge", Object.assign({}, StatusBadgeOptions, { template: tplBadge }));
  Vue.component("app-modal", Object.assign({}, AppModalOptions, { template: tplModal }));
  Vue.component("ba-stock-table", Object.assign({}, StockTableOptions, { template: tplStok }));
  Vue.component("order-form", Object.assign({}, OrderFormOptions, { template: tplOrder }));
  Vue.component("do-tracking", Object.assign({}, DoTrackingOptions, { template: tplTrack }));

  new Vue({
    el: "#app",
    data: {
      tab: "stok",
      daftarTab: [
        { id: "stok", label: "Stok Bahan Ajar" },
        { id: "tracking", label: "Tracking DO" },
        { id: "order", label: "Pesan Bahan Ajar" }
      ],
      dataUt: data
    },
    methods: {
      tambahDo(payload) {
        this.dataUt.tracking[payload.nomor] = payload.isi;
      }
    }
  });
})();
