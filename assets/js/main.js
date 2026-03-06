document.addEventListener("DOMContentLoaded", function () {
  const calcBtn = document.getElementById("hitungHargaBtn");
  const calcResult = document.getElementById("hasilHarga");

  if (calcBtn && calcResult) {
    calcBtn.addEventListener("click", function () {
      const p = Number(document.getElementById("panjang").value); // cm
      const l = Number(document.getElementById("lebar").value); // cm

      if (isNaN(p) || isNaN(l) || p <= 0 || l <= 0) {
        calcResult.innerHTML = "Masukkan lebar dan tinggi yang valid!";
        calcResult.style.display = "block";
        return;
      }

      let luas = (p / 100) * (l / 100);

      // Logic untuk < 1 m²
      if (luas < 1) {
        const floor = Math.floor(luas);
        const decimal = luas - floor;

        if (decimal > 0) {
          if (decimal < 0.6) luas = floor + 0.6;
          else if (decimal < 0.8) luas = floor + 0.8;
          else luas = floor + 1.0;
        }
      }

      // Logic untuk ≥ 1 m²
      else {
        const lebarMeter = p / 100;
        const tinggiMeter = l / 100;

        // Ambil ukuran terkecil
        let ukuranTerkecil = Math.min(lebarMeter, tinggiMeter);
        let ukuranFinal;

        if (ukuranTerkecil === 1) {
          ukuranFinal = 1;
        } else if (ukuranTerkecil > 1 && ukuranTerkecil <= 1.5) {
          ukuranFinal = 1.5;
        } else if (ukuranTerkecil > 1.5 && ukuranTerkecil <= 2) {
          ukuranFinal = 2;
        } else if (ukuranTerkecil > 2 && ukuranTerkecil <= 3) {
          ukuranFinal = 3;
        } else if (ukuranTerkecil > 3) {
          ukuranFinal = 3;
        }

        // Hitung luas dari sisi terbesar × hasil pembulatan
        let sisiTerbesar = Math.max(lebarMeter, tinggiMeter);
        luas = sisiTerbesar * ukuranFinal;
      }

      // Hitung harga
      let hargaDasar = luas * 25000;
      let total = hargaDasar;

      calcResult.innerHTML = `
<div style="
    text-align:center;
    background: rgba(16,185,129,0.08);
    padding:14px 20px;
    border-radius:10px;
    display:inline-block;
    margin-top:10px;
">
    <span style="
        font-size:28px;
        font-weight:700;
        color:#10b981;
    ">
        Rp ${total.toLocaleString("id-ID")}
    </span>
</div>
`;
      calcResult.style.display = "block";
    });
  }
  //salam dari saya, klo masih bingung boleh tanya saya hehehe
});
