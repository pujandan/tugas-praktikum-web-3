// kumpulan fungsi untuk mengambil data JSON dan template halaman
const api = {
  async muatData() {
    const res = await fetch("data/dataBahanAjar.json");
    const json = await res.json();
    // di file json, tracking masih berupa array yang tiap isinya punya kunci nomor DO sendiri, jadi dirapikan dulu jadi satu object
    const tracking = {};
    json.tracking.forEach(function(entri) {
      Object.keys(entri).forEach(function(nomor) {
        tracking[nomor] = entri[nomor];
      });
    });
    json.tracking = tracking;
    return json;
  },
  async muatTemplate(nama) {
    const res = await fetch("templates/" + nama + ".html");
    return await res.text();
  }
};
