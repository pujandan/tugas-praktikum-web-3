// <status-badge>: label status stok atau pengiriman, kalau dihover muncul catatannya
const StatusBadgeOptions = {
  props: ["warna", "teks", "catatanHtml"],
  data() {
    return { tampil: false };
  }
};
