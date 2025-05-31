// 1. Fungsi untuk peta interaktif
document.addEventListener("DOMContentLoaded", function () {
  // Set tahun saat ini di footer
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  // 2. Fitur komentar dengan tampilan di testimoni box
  const komentarForm = document.querySelector(".formulir-komentar");
  const tombolKirim = document.getElementById("tombol-kirim");
  const tombolReset = document.getElementById("tombol-reset");
  const testimoniBox = document.querySelector(".testimoni-box");

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
    const displayName = isAnonymous ? "Anonim" : name;

    // Konversi rating ke bintang
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      stars += i <= rating ? "★" : "☆";
    }

    newComment.innerHTML = `
                    <img src="https://img.icons8.com/ios-filled/50/4a4a4a/user.png" alt="user">
                    <div class="isi-testimoni">
                        <strong>${displayName}</strong>
                        <div class="bintang">${stars}</div>
                        <p>${comment}</p>
                    </div>
                `;

    // Tambahkan komentar baru di atas komentar yang sudah ada
    testimoniBox.insertBefore(newComment, testimoniBox.firstChild);
  }

  // Event listener untuk tombol kirim
  tombolKirim.addEventListener("click", function () {
    const name = document.getElementById("nama").value;
    const comment = document.getElementById("ulasan").value;
    const rating = parseInt(document.getElementById("rating-value").value);
    const isAnonymous = document.getElementById("anonim").checked;
    const captchaInput = document.getElementById("captcha-input").value;

    // Validasi form
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

    // Tambahkan komentar
    addComment(name, comment, rating, isAnonymous);

    // Reset form
    document.getElementById("nama").value = "";
    document.getElementById("ulasan").value = "";
    document.getElementById("captcha-input").value = "";
    document.getElementById("anonim").checked = false;

    // Reset rating
    stars.forEach((star) => {
      star.classList.remove("active");
      star.textContent = "☆";
    });
    ratingValue.value = "0";

    // Generate CAPTCHA baru
    currentCaptcha = generateCaptcha();
    document.getElementById("captcha-display").textContent = currentCaptcha;

    alert("Komentar berhasil dikirim!");
  });

  // Event listener untuk tombol reset
  tombolReset.addEventListener("click", function () {
    document.getElementById("nama").value = "";
    document.getElementById("ulasan").value = "";
    document.getElementById("captcha-input").value = "";
    document.getElementById("anonim").checked = false;

    // Reset rating
    stars.forEach((star) => {
      star.classList.remove("active");
      star.textContent = "☆";
    });
    ratingValue.value = "0";

    // Generate CAPTCHA baru
    currentCaptcha = generateCaptcha();
    document.getElementById("captcha-display").textContent = currentCaptcha;
  });

  // 7. Mirror ke platform di halaman kontak
  // Link sudah diset di HTML dengan target="_blank" untuk membuka di tab baru

  // Fitur tambahan: Auto scroll ke peta saat tombol lokasi diklik
  document.querySelector(".lokasi-btn").addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".bagian-lokasi").scrollIntoView({
      behavior: "smooth",
    });
  });
});
