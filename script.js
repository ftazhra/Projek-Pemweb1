//bbutton kartu destinasi wisata
const buttons= document.querySelectorAll(".detail-btn");

buttons.forEach(button =>{
    button.addEventListener("click",()=>{
        window.location.href="Destinasi.html";
    });
});


// Untuk membuat auto scroll pada elemen
const scrollArea = document.getElementById("scroll-area");

    let scrollPos = 0;
    const scrollSpeed = 0.5; // makin besar makin cepat

    function autoScroll() {
        if (scrollArea) {
            scrollPos += scrollSpeed;
            if (scrollPos >= scrollArea.scrollWidth - scrollArea.clientWidth) {
                scrollPos = 0; // balik ke awal
            }
            scrollArea.scrollLeft = scrollPos;
        }
        requestAnimationFrame(autoScroll);
    }

    autoScroll(); // mulai auto scroll

//Bintang



    const bintangEls = document.querySelectorAll('.rating .bintang');

    bintangEls.forEach((bintang, index) => {
      bintang.addEventListener('click', () => {
        bintangEls.forEach(b => b.classList.remove('aktif'));
        for (let i = 0; i <= index; i++) {
          bintangEls[i].classList.add('aktif');
        }
        document.getElementById('rating').value = bintangEls[index].dataset.nilai;
        console.log("Rating dipilih: " + bintangEls[index].dataset.nilai);
      });
    });




