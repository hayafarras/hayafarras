document.addEventListener("DOMContentLoaded", function() {
    // 1. TEMPLATE HEADER (BINGKAI ATAS)
    const headerHTML = `
        <div class="logo-title">
          <img src="logo.png" alt="Logo" class="logo">
          <h1>Lentera Publika</h1>
        </div>
        <nav>
          <a href="index.html" id="link-index">Beranda</a>
          <a href="katalog.html" id="link-katalog">Katalog</a>
          <a href="layanan.html" id="link-layanan">Layanan</a>
          <a href="kegiatan.html" id="link-kegiatan">Kegiatan</a>
          <a href="kontak.html" id="link-kontak">Kontak</a>
          <a href="masuk.html" id="link-masuk">Masuk/Daftar</a>
        </nav>
    `;

    // 2. TEMPLATE FOOTER (BINGKAI BAWAH)
    const footerHTML = `
        <p>© 2026 Perpustakaan Lentera Publika</p>
        <p style="margin-top: 5px; font-weight: 300; opacity: 0.8;">Mewujudkan Masyarakat Literat di Era Digital</p>
    `;

    // 3. PASANG KE HTML
    const headerElement = document.querySelector("header");
    const footerElement = document.querySelector("footer");

    if(headerElement) headerElement.innerHTML = headerHTML;
    if(footerElement) footerElement.innerHTML = footerHTML;

    // 4. OTOMATIS BIKIN MENU JADI PUTIH (ACTIVE)
    const path = window.location.pathname.split("/").pop() || "index.html";
    const activeLink = document.getElementById("link-" + path.split(".")[0]);
    if(activeLink) activeLink.classList.add("active");
});

// Fungsi ini ditaruh di luar DOMContentLoaded agar bisa diakses oleh atribut onclick di HTML
function switchTab(type) {
    const loginForm = document.getElementById('login-form');
    const regForm = document.getElementById('register-form');
    const tabs = document.querySelectorAll('.tab');

    // Cek dulu apakah elemennya ada (supaya tidak error di halaman lain yang tidak ada form loginnya)
    if (!loginForm || !regForm) return;

    if (type === 'login') {
        loginForm.style.display = 'block';
        regForm.style.display = 'none';
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
    } else {
        loginForm.style.display = 'none';
        regForm.style.display = 'block';
        tabs[0].classList.remove('active');
        tabs[1].classList.add('active');
    }
}
