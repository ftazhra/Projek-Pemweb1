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