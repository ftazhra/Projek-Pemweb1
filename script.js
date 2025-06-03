//Lihat Selengkapnya destinasi
document.querySelectorAll('.detail-btn').forEach(function(button){
  button.addEventListener('click',function(){
    const link = this.getAttribute('data-link');
    if (link){
      window.location.href= link;
    }
  })
})

document.addEventListener("DOMContentLoaded", function () {
  // Set tahun saat ini di footer
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  // 2. Fitur komentar dengan tampilan di testimoni box
  const komentarForm = document.querySelector(".formulir-komentar");
  const tombolKirim = document.getElementById("tombol-kirim");
  const tombolReset = document.getElementById("tombol-reset");

  // Ganti nama variabel agar tidak bentrok:
  const testimoniBoxInDom = document.querySelector(".testimoni-box");

  // Fungsi untuk membuat kode CAPTCHA acak
  function generateCaptcha() {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 5; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  }

  // Generate CAPTCHA pertama kali
  let currentCaptcha = generateCaptcha();
  document.getElementById("captcha-display").textContent = currentCaptcha;

  // Refresh CAPTCHA
  document
    .getElementById("refresh-captcha")
    .addEventListener("click", function () {
      currentCaptcha = generateCaptcha();
      document.getElementById("captcha-display").textContent = currentCaptcha;
    });

  // Fitur rating bintang
  const stars = document.querySelectorAll(".star");
  const ratingValue = document.getElementById("rating-value");

  stars.forEach((star) => {
    star.addEventListener("click", function () {
      const value = this.getAttribute("data-value");
      ratingValue.value = value;

      // Set active class
      stars.forEach((s) => {
        if (s.getAttribute("data-value") <= value) {
          s.classList.add("active");
          s.textContent = "★";
        } else {
          s.classList.remove("active");
          s.textContent = "☆";
        }
      });
    });
  });

  // Fungsi untuk menambahkan komentar baru
  function addComment(name, comment, rating, isAnonymous) {
    const newComment = document.createElement("div");
    newComment.className = "satu-testimoni";

    // Jika anonim, ganti nama menjadi "Anonim"
    function maskName(name) {
      if (name.length <= 2) {
        return name[0] + "*".repeat(name.length - 1);
      } else {
        const firstChar = name[0];
        const lastChar = name[name.length - 1];
        const middleStars = "*".repeat(name.length - 2);
        return firstChar + middleStars + lastChar;
      }
    }

    const displayName = isAnonymous ? maskName(name) : name;

    // Konversi rating ke bintang
    let starsStr = "";
    for (let i = 1; i <= 5; i++) {
      starsStr += i <= rating ? "★" : "☆";
    }

    newComment.innerHTML = `
      <img src="https://img.icons8.com/ios-filled/50/4a4a4a/user.png" alt="user">
      <div class="isi-testimoni">
          <strong>${displayName}</strong>
          <div class="bintang">${starsStr}</div>
          <p>${comment}</p>
      </div>
    `;

    // Tambahkan komentar baru di atas komentar yang sudah ada
    testimoniBoxInDom.insertBefore(newComment, testimoniBoxInDom.firstChild);
  }

  // Event listener tombol kirim
  tombolKirim.addEventListener("click", function () {
    const name = document.getElementById("nama").value;
    const comment = document.getElementById("ulasan").value;
    const rating = parseInt(document.getElementById("rating-value").value);
    const isAnonymous = document.getElementById("anonim").checked;
    const captchaInput = document.getElementById("captcha-input").value;

    if (!name) {
      alert("Harap masukkan nama Anda");
      return;
    }
    if (rating === 0) {
      alert("Harap berikan rating");
      return;
    }
    if (captchaInput !== currentCaptcha) {
      alert("Kode CAPTCHA tidak sesuai!");
      return;
    }
    if (!comment) {
      alert("Harap masukkan komentar");
      return;
    }

    addComment(name, comment, rating, isAnonymous);

    // Reset form
    document.getElementById("nama").value = "";
    document.getElementById("ulasan").value = "";
    document.getElementById("captcha-input").value = "";
    document.getElementById("anonim").checked = false;

    stars.forEach((star) => {
      star.classList.remove("active");
      star.textContent = "☆";
    });
    ratingValue.value = "0";

    currentCaptcha = generateCaptcha();
    document.getElementById("captcha-display").textContent = currentCaptcha;

    alert("Komentar berhasil dikirim!");
  });

  // Event listener tombol reset
  tombolReset.addEventListener("click", function () {
    document.getElementById("nama").value = "";
    document.getElementById("ulasan").value = "";
    document.getElementById("captcha-input").value = "";
    document.getElementById("anonim").checked = false;

    stars.forEach((star) => {
      star.classList.remove("active");
      star.textContent = "☆";
    });
    ratingValue.value = "0";

    currentCaptcha = generateCaptcha();
    document.getElementById("captcha-display").textContent = currentCaptcha;
  });
});

// 3. Fitur Pergeseran Profil Pengelola Taman Kehati
const scrollArea = document.getElementById("scroll-area");
const panahKiri = document.querySelector(".panah-kiri");
const panahKanan = document.querySelector(".panah-kanan");

panahKiri.addEventListener("click", () => {
  scrollArea.scrollBy({
    left: -300,
    behavior: "smooth",
  });
});

panahKanan.addEventListener("click", () => {
  scrollArea.scrollBy({
    left: 300,
    behavior: "smooth",
  });
});

// 4. Fitur Pergeseran Komentar
// Ganti nama variabel agar tidak bentrok dengan yang di dalam DOMContentLoaded
const testimoniScrollBox = document.getElementById("testimoni-scroll");
const panahAtas = document.querySelector(".panah-atas");
const panahBawah = document.querySelector(".panah-bawah");

const scrollStep = 120; // jumlah pixel per klik, sesuaikan dengan tinggi testimoni

panahAtas.addEventListener("click", () => {
  testimoniScrollBox.scrollBy({
    top: -scrollStep,
    behavior: "smooth",
  });
});

panahBawah.addEventListener("click", () => {
  testimoniScrollBox.scrollBy({
    top: scrollStep,
    behavior: "smooth",
  });
});

// Fungsi untuk memuat data pengelola dari JSON
async function loadPengelolaData() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    displayPengelola(data.pengelola);
  } catch (error) {
    console.error("Gagal memuat data pengelola:", error);
  }
}

// Fungsi untuk menampilkan data pengelola
function displayPengelola(pengelola) {
  const container = document.getElementById("scroll-area");

  pengelola.forEach((orang) => {
    const card = document.createElement("div");
    card.className = "kartu-profil";

    card.innerHTML = `
            <img src="${orang.foto}" alt="avatar" />
            <h3>${orang.nama}</h3>
            ${orang.nip ? `<p><a href="#">${orang.nip}</a></p>` : ""}
            <p>${orang.jabatan}</p>
        `;

    container.appendChild(card);
  });
}

// Panggil fungsi saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  loadPengelolaData();

  // Kode untuk panah scroll tetap sama
  const scrollArea = document.getElementById("scroll-area");
  const panahKiri = document.querySelector(".panah-kiri");
  const panahKanan = document.querySelector(".panah-kanan");

  panahKiri.addEventListener("click", () => {
    scrollArea.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  });

  panahKanan.addEventListener("click", () => {
    scrollArea.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  });
});
