// 1. Fitur Lihat Selengkapnya destinasi
// Lihat Selengkapnya destinasi
document.querySelectorAll('.detail-btn').forEach(function(button){
  // mencari semua elemen HTML yang memiliki class detail-btn
  // melakukan sesuatu pada masing-masing tombol yang ditemukan, agar semua tombol bisa diberi fungsi klik satu per satu.
  button.addEventListener('click',function(){
  // kalau tombolnya diklik, jalankan perintah yang ada di dalamnya
    const link = this.getAttribute('data-link');
  // this artinya tombol yang sedang diklik, dan mengambil nilai dari atribut data-link di tombol itu
    if (link){
  // jika ada link, maka arahkan ke link tersebut
      window.location.href= link;
  // ini akan mengarahkan ke halaman yang dituju
    }
  })
});

document.addEventListener("DOMContentLoaded", function () {
  // ini akan memastikan bahwa DOM sudah sepenuhnya dimuat sebelum menjalankan kode di dalamnya
  // menjalankan kode di dalamnya setelah halaman HTML selesai dimuat

  // set tahun saat ini di footer
  document.getElementById("current-year").textContent = new Date().getFullYear();
  // ini akan mengambil elemen dengan id current-year dan mengubah teksnya menjadi tahun saat ini, dengan menggunakan objek date untuk mendapatkan tahun saat ini dan mengambil dengan angka tahun dari objek date tersebut
  

// 2. Fitur komentar dengan tampilan di testimoni box
  const komentarForm = document.querySelector(".formulir-komentar");
  // mencari elemen HTML yang memiliki class formulir-komentar
  // const itu digunakan untuk mendeklarasikan variabel yang nilainya tidak akan berubah, dan querySelector itu digunakan untuk memilih elemen pertama yang cocok dengan selector yang diberikan
  const tombolKirim = document.getElementById("tombol-kirim");
  // getElementById itu digunakan untuk mengambil elemen HTML berdasarkan id-nya, dan tombol-kirim itu adalah id dari tombol yang akan digunakan untuk mengirim komentar
  const tombolReset = document.getElementById("tombol-reset");

  // ganti nama variabel agar tidak bentrok
  const testimoniBoxInDom = document.querySelector(".testimoni-box");

  // fungsi untuk membuat kode CAPTCHA acak
  function generateCaptcha() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 5; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  }

  // Generate CAPTCHA pertama kali
  window.currentCaptcha = generateCaptcha();
  // menyimpan CAPTCHA yang dihasilkan dalam variabel global, generateCaptcha itu akan menghasilkan kode CAPTCHA acak setiap kali dipanggil
  document.getElementById("captcha-display").textContent = window.currentCaptcha;
  // menampilkan CAPTCHA di elemen dengan id captcha-display, textContent itu digunakan untuk mengubah teks yang ditampilkan di elemen tersebut dengan sama dengan nilai dari window.currentCaptcha

  // Refresh CAPTCHA
  document.getElementById("refresh-captcha").addEventListener("click", function () {
    // menambahkan event listener pada tombol dengan id refresh-captcha, pada saat tombol tersebut diklik, fungsi ini akan dijalankan
    window.currentCaptcha = generateCaptcha();
    document.getElementById("captcha-display").textContent = window.currentCaptcha;
  });

// 3. Fitur rating bintang
  const stars = document.querySelectorAll(".star");
  // mencari semua elemen HTML yang memiliki class star, ini akan mengembalikan NodeList yang berisi semua elemen yang cocok dengan selector tersebut (node list seperti array, tapi dia hanya bisa diakses dengan cara tertentu, contohnya dengan forEach)
  const ratingValue = document.getElementById("rating-value");

  stars.forEach((star) => {
    // untuk setiap elemen star yang ditemukan, kita akan menambahkan event listener untuk menangani klik pada bintang tersebut
    // forEach itu digunakan untuk melakukan iterasi pada setiap elemen dalam NodeList, dan star itu adalah parameter yang mewakili setiap elemen dalam iterasi tersebut, yang akan digunakan untuk menambahkan event listener pada masing-masing bintang
    // tanda = > itu digunakan untuk mendeklarasikan fungsi panah (arrow function), yang merupakan cara singkat
    star.addEventListener("click", function () {
    // ketika bintang diklik, kita akan mendapatkan nilai dari atribut data-value pada bintang tersebut
      const value = this.getAttribute("data-value");
    // this di sini merujuk pada elemen yang sedang diklik, dan getAttribute itu digunakan untuk mengambil nilai dari atribut data-value pada elemen tersebut
      ratingValue.value = value;
    // mengubah nilai input tersembunyi dengan nilai yang dipilih, ratingValue itu adalah elemen input tersembunyi yang akan menyimpan nilai rating yang dipilih oleh pengguna, dan value itu adalah nilai yang diambil dari atribut data-value pada bintang yang diklik

      // Set active class
      stars.forEach((s) => {
        // untuk setiap bintang dalam NodeList stars, kita akan memeriksa apakah nilai data-value pada bintang tersebut kurang dari atau sama dengan nilai yang dipilih
        // s itu adalah parameter yang mewakili setiap elemen dalam iterasi tersebut, dan kita akan memeriksa apakah nilai data-value pada bintang tersebut kurang dari atau sama dengan nilai yang dipilih
        if (s.getAttribute("data-value") <= value) {
          // jika nilai data-value pada bintang tersebut kurang dari atau sama dengan nilai yang dipilih, kita akan menambahkan class active pada bintang tersebut
          s.classList.add("active");
          // classList itu adalah properti yang berisi daftar kelas CSS yang diterapkan pada elemen, dan add itu adalah metode yang digunakan untuk menambahkan kelas baru ke daftar kelas tersebut
          s.textContent = "★";
          // mengubah teks bintang menjadi simbol bintang terisi (★)
        } else {
          // jika nilai data-value pada bintang tersebut lebih besar dari nilai yang dipilih, kita akan menghapus class active dari bintang tersebut
          s.classList.remove("active");
          s.textContent = "☆";
          // teks bintang diubah menjadi simbol bintang kosong (☆) ketika ratingnya tidak aktif
        }
      });
    });
  });

  // Fungsi untuk menambahkan komentar baru
  function addComment(name, comment, rating, isAnonymous) {
    // membuat elemen baru untuk komentar, name itu adalah nama pengguna yang mengirim komentar, comment itu adalah isi komentar yang dikirim, rating itu adalah nilai rating yang diberikan oleh pengguna, dan isAnonymous itu adalah boolean yang menunjukkan apakah komentar tersebut anonim atau tidak
    // kita akan membuat elemen div baru untuk menampung komentar yang akan ditambahkan ke dalam testimoni box
    const newComment = document.createElement("div");
    newComment.className = "satu-testimoni";
    // memberikan class satu-testimoni pada elemen div baru yang dibuat, class ini akan digunakan untuk memberikan gaya pada komentar yang ditambahkan

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

    testimoniBoxInDom.insertBefore(newComment, testimoniBoxInDom.firstChild);
  }



  // Event listener tombol reset
  tombolReset.addEventListener("click", function () {
    // ketika tombol reset diklik, kita akan mengosongkan semua input dan mengatur ulang rating bintang
    document.getElementById("nama").value = "";
    // mengosongkan input nama
    document.getElementById("ulasan").value = "";
    document.getElementById("captcha-input").value = "";
    document.getElementById("anonim").checked = false;
    // false artinya checkbox anonim tidak dicentang dan akan diatur ulang ke kondisi tidak dicentang

    stars.forEach((star) => {
      star.classList.remove("active");
      // menghapus class active dari semua bintang
      star.textContent = "☆";
    });
    ratingValue.value = "0";

    window.currentCaptcha = generateCaptcha();
    document.getElementById("captcha-display").textContent = window.currentCaptcha;
  });

  // memanggil data pengelola
  loadPengelolaData();
});

// 4. Fitur Pergeseran Profil Pengelola Taman Kehati
const scrollArea = document.getElementById("scroll-area");
// mencari elemen dengan id scroll-area, yang akan digunakan untuk menampilkan profil pengelola taman kehati
const panahKiri = document.querySelector(".panah-kiri");
// mencari elemen dengan class panah-kiri, yang akan digunakan untuk menggeser profil ke kiri
const panahKanan = document.querySelector(".panah-kanan");
// mencari elemen dengan class panah-kanan, yang akan digunakan untuk menggeser profil ke kanan

panahKiri.addEventListener("click", () => {
  // menambahkan event listener pada panah kiri, ketika panah kiri diklik, maka akan menggeser scroll area ke kiri, event listener itu akan menangani klik pada elemen panah kiri
  scrollArea.scrollBy({
    // scrollBy itu digunakan untuk menggeser scroll area ke kiri atau kanan dengan jarak tertentu
    left: -300,
    // left itu adalah properti yang menentukan jarak penggeseran ke kiri, -300 berarti menggeser ke kiri sejauh 300 piksel
    behavior: "smooth",
    // behavior itu adalah properti yang menentukan bagaimana penggeseran dilakukan, "smooth" berarti penggeseran akan dilakukan dengan animasi yang halus
  });
});

panahKanan.addEventListener("click", () => {
  scrollArea.scrollBy({
    left: 300,
    behavior: "smooth",
  });
});

// 5. Fitur Pergeseran Komentar
const testimoniScrollBox = document.getElementById("testimoni-scroll");
// mencari elemen dengan id testimoni-scroll, yang akan digunakan untuk menampilkan komentar yang telah dikirim
const panahAtas = document.querySelector(".panah-atas");
// mencari elemen dengan class panah-atas, yang akan digunakan untuk menggeser komentar ke atas
const panahBawah = document.querySelector(".panah-bawah");
// mencari elemen dengan class panah-bawah, yang akan digunakan untuk menggeser komentar ke bawah

const scrollStep = 120;
// menentukan jarak penggeseran komentar, 120 piksel ke atas atau ke bawah

panahAtas.addEventListener("click", () => {
  testimoniScrollBox.scrollBy({
    top: -scrollStep,
    // top itu adalah properti yang menentukan jarak penggeseran ke atas, -scrollStep berarti menggeser ke atas sejauh 120 piksel
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
  // fungsi ini akan memuat data pengelola dari file JSON dan menampilkannya di halaman
  try {
    // mencoba untuk mengambil data dari file JSON
    const response = await fetch("data.json");
    // fetch itu digunakan untuk mengambil data dari file JSON, dan await itu digunakan untuk menunggu hingga data berhasil diambil
    const data = await response.json();
    // await response.json() itu digunakan untuk mengonversi respons dari server menjadi objek JavaScript, yang akan berisi data pengelola
    displayPengelola(data.pengelola);
    // memanggil fungsi displayPengelola untuk menampilkan data pengelola di halaman
  } catch (error) {
    // jika terjadi kesalahan saat mengambil data, maka akan menangkap kesalahan tersebut
    console.error("Gagal memuat data pengelola:", error);
    // menampilkan pesan kesalahan di konsol kalau terjadi kesalahan saat mengambil data
  }
}

// Fungsi untuk menampilkan data pengelola
function displayPengelola(pengelola) {
  // fungsi ini akan menerima data pengelola sebagai parameter dan menampilkannya di halaman
  // pengelola itu adalah array yang berisi objek-objek pengelola, setiap objek pengelola memiliki properti seperti nama, foto, nip, dan jabatan
  const container = document.getElementById("scroll-area");
  // mencari elemen dengan id scroll-area, yang akan digunakan untuk menampilkan profil pengelola

  pengelola.forEach((orang) => {
    const card = document.createElement("div");
    // membuat elemen div baru untuk setiap pengelola
    // card itu adalah elemen div yang akan digunakan untuk menampilkan profil pengelola, setiap pengelola akan memiliki card sendiri
    card.className = "kartu-profil";
    // memberikan class kartu-profil pada elemen div baru yang dibuat, class ini akan digunakan untuk memberikan gaya pada profil pengelola

    // mengisi konten card dengan informasi pengelola
    card.innerHTML = `
      <img src="${orang.foto}" alt="avatar" />
      <h3>${orang.nama}</h3>
      ${orang.nip ? `<p><a href="#">${orang.nip}</a></p>` : ""}
      <p>${orang.jabatan}</p>
    `;

    container.appendChild(card);
    // menambahkan card ke dalam container scroll-area, appendChild itu digunakan untuk menambahkan elemen baru ke dalam elemen yang sudah ada, dalam hal ini, card akan ditambahkan ke dalam container scroll-area
  });
}
