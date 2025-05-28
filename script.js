<script>
  const scrollArea = document.getElementById('scroll-area');
  const panahKiri = document.getElementById('panah-kiri');
  const panahKanan = document.getElementById('panah-kanan');

  panahKiri.addEventListener('click', () => {
    scrollArea.scrollBy({ left: -250, behavior: 'smooth' });
  });

  panahKanan.addEventListener('click', () => {
    scrollArea.scrollBy({ left: 250, behavior: 'smooth' });
  });
</script>
