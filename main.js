/* main.js
   - Navbar hide on scroll (replay animation on show)
   - Mobile burger toggle
   - Small interactivity: Search button focus & sample CTA
*/

/* Wait DOM ready */
document.addEventListener("DOMContentLoaded", function () {
  // NAVBAR show/hide on scroll with animation reset

  /* ================================================================
   NAVBAR — Burger Menu Toggle
================================================================ */

  const burger = document.getElementById("burger");
  const navMenu = document.getElementById("navMenu");

  // buka / tutup menu
  function toggleMenu() {
    navMenu.classList.toggle("open");
    burger.classList.toggle("active");

    // aksesibilitas
    const expanded = burger.classList.contains("active");
    burger.setAttribute("aria-expanded", expanded);
  }

  // klik tombol burger
  if (burger) {
    burger.addEventListener("click", toggleMenu);
  }

  // klik luar untuk menutup
  document.addEventListener("click", (e) => {
    const clickInsideNav =
      navMenu.contains(e.target) || burger.contains(e.target);

    if (!clickInsideNav) {
      navMenu.classList.remove("open");
      burger.classList.remove("active");
      burger.setAttribute("aria-expanded", false);
    }
  });

  // tombol ESC menutup menu
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      navMenu.classList.remove("open");
      burger.classList.remove("active");
      burger.setAttribute("aria-expanded", false);
    }
  });

  /* ============================
     KALKULATOR LOGIC
============================= */

  (function kalkulatorCetak() {
    const btn = document.getElementById("hitungHargaBtn");
    const hasil = document.getElementById("hasilHarga");

    btn.addEventListener("click", function () {
      const p = Number(document.getElementById("panjang").value);
      const l = Number(document.getElementById("lebar").value);
      const opsi = document.querySelector(
        "input[name='opsiDesain']:checked"
      ).value;

      // Validasi input
      if (isNaN(p) || isNaN(l) || p <= 0 || l <= 0) {
        hasil.innerHTML = "Masukkan panjang dan lebar yang valid!";
        hasil.style.display = "block";
        return;
      }

      // Hitung m²
      let luas = (p / 100) * (l / 100);

      // BULATKAN MENGIKUTI ATURAN 0.6 - 0.8 - 1.0
      luas = roundByCustomRules(luas);

      // Harga dasar
      let hargaDasar = luas * 25000;

      // Tambahan desain
      let tambahan = 0;
      if (opsi === "desain50") tambahan = 15000;
      else if (opsi === "desain100") tambahan = 30000;

      let total = hargaDasar + tambahan;

      hasil.innerHTML = `
      Harga dasar : Rp ${hargaDasar.toLocaleString()}<br>
      Tambahan biaya desain : Rp ${tambahan.toLocaleString()}<br>
      Total Harga: <br>
      <strong>Rp ${total.toLocaleString("id-ID")}</strong>
    `;
      hasil.style.display = "block";
    });

    // === LOGIKA PEMBULATAN ===
    function roundByCustomRules(luas) {
      const floor = Math.floor(luas);
      const decimal = luas - floor;

      if (decimal === 0) return luas;

      if (decimal < 0.6) return floor + 0.6;
      if (decimal < 0.8) return floor + 0.8;

      return floor + 1.0;
    }
  })();
});

/* ============================================================
   WHATSAPP POPUP
============================================================ */

const waBtn = document.getElementById("waButton");
const waPopup = document.getElementById("waPopup");
const waClose = document.getElementById("waClose");

// Buka popup
waBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  waPopup.classList.toggle("hidden");
});

// Tutup popup
waClose?.addEventListener("click", () => waPopup.classList.add("hidden"));

// Tutup jika klik luar
document.addEventListener("click", (e) => {
  if (!waPopup.contains(e.target) && e.target !== waBtn) {
    waPopup.classList.add("hidden");
  }
});

// Tutup saat scroll
window.addEventListener("scroll", () => waPopup.classList.add("hidden"));

// Set WA admin
document.getElementById("waOpenBtn").href =
  "https://wa.me/628xxxxxxxxxx?text=Halo%20Admin";
