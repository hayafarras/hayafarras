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

    // --- BAGIAN YANG TADI ERROR DI SINI ---
    const regFormElement = document.querySelector("#register-form form");
    if (regFormElement) {
        regFormElement.addEventListener("submit", function(e) {
            const pass = document.getElementById("newPass").value;
            const confirm = document.getElementById("confirmPass").value;

            if (pass !== confirm) {
                e.preventDefault(); 
                alert("Kata sandi konfirmasi tidak cocok!");
            }
        }); // <-- Pastikan ada penutup ini
    } // <-- Dan penutup ini
}); // <-- Penutup DOMContentLoaded

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

// Fungsi untuk ikon mata di kata sandi
function toggleVisibility(inputId, iconId) {
    const passwordInput = document.getElementById(inputId);
    const eyeIcon = document.getElementById(iconId);

    if (passwordInput.type === "password") {
        // Ubah input jadi terlihat
        passwordInput.type = "text";
        // Ubah ikon jadi mata tertutup (garis miring)
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    } else {
        // Ubah kembali jadi titik-titik
        passwordInput.type = "password";
        // Ubah ikon jadi mata terbuka
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    }
}

// Fungsi untuk menyalin alamat jika ceklis dicentang
function copyAlamat() {
    const alamatIdentitas = document.getElementById('alamatIdentitas');
    const alamatSekarang = document.getElementById('alamatSekarang');
    const checkbox = document.getElementById('samaAlamat');

    if (checkbox.checked) {
        alamatSekarang.value = alamatIdentitas.value;
        alamatSekarang.readOnly = true; // Opsional: mengunci input agar tidak diedit manual
    } else {
        alamatSekarang.value = "";
        alamatSekarang.readOnly = false;
    }
}

// Fungsi untuk memunculkan kolom "Lainnya" pada pekerjaan
function checkPekerjaan() {
    const select = document.getElementById('pekerjaanSelect');
    const lainnyaDiv = document.getElementById('pekerjaanLainnya');
    
    if (select.value === 'lainnya') {
        lainnyaDiv.style.display = 'block';
    } else {
        lainnyaDiv.style.display = 'none';
    }
}

// Fungsi untuk kesamaan new pass dan confirm pass
const newPass = document.getElementById('newPass');
const confirmPass = document.getElementById('confirmPass');

function validatePassword() {
  if (newPass.value !== confirmPass.value) {
    // Memberikan pesan error jika tidak sama
    confirmPass.setCustomValidity("Kata sandi tidak cocok!");
  } else {
    // Kosongkan pesan error jika sudah sama
    confirmPass.setCustomValidity('');
  }
}

// Jalankan fungsi setiap kali user mengetik di kedua field tersebut
newPass.onchange = validatePassword;
confirmPass.onkeyup = validatePassword;
