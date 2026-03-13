document.addEventListener("DOMContentLoaded", function() {
    // 1. TEMPLATE HEADER
    const headerHTML = `
        <div class="logo-title">
          <img src="logo.PNG" alt="Logo" class="logo">
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

    // 2. TEMPLATE FOOTER
    const footerHTML = `
        <p>© 2026 Perpustakaan Lentera Publika</p>
        <p style="margin-top: 5px; font-weight: 300; opacity: 0.8;">Mewujudkan Masyarakat Literat di Era Digital</p>
    `;

    const headerElement = document.querySelector("header");
    const footerElement = document.querySelector("footer");

    if(headerElement) headerElement.innerHTML = headerHTML;
    if(footerElement) footerElement.innerHTML = footerHTML;

    // 3. MENU ACTIVE
    const path = window.location.pathname.split("/").pop() || "index.html";
    const activeLink = document.getElementById("link-" + path.split(".")[0]);
    if(activeLink) activeLink.classList.add("active");

    // 4. LOGIKA FORM PENDAFTARAN
    const regFormElement = document.querySelector("#register-form form");
    if (regFormElement) {
        regFormElement.addEventListener("submit", function(e) {
            const pass = document.getElementById("newPass").value;
            const confirm = document.getElementById("confirmPass").value;

            if (pass !== confirm) {
                e.preventDefault(); 
                alert("Kata sandi konfirmasi tidak cocok!");
            } else {
                const idAnggota = document.getElementById('nomorIdentitas').value;
                const emailUser = document.querySelector('input[type="email"]').value;
                alert(`Pendaftaran Berhasil!\n\nID Anggota: ${idAnggota}\nEmail: ${emailUser}\n\nHarap simpan data ini untuk masuk.`);
            }
        });
    }

    // 5. LOGIKA KATALOG (SUPABASE)
    const bookContainer = document.getElementById('bookContainer');
    if (bookContainer) {
        const SB_URL = 'https://zybrhmbjvhzrvpykgpux.supabase.co';
        const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5YnJobWJqdmh6cnZweWtncHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMTY5MDUsImV4cCI6MjA4ODg5MjkwNX0.o301u_q0OAhElangyonZdKCRgxDMuTtoahictrGyHxA';
        const _supabase = supabase.createClient(SB_URL, SB_KEY);

        async function loadBooks() {
            const { data: books, error } = await _supabase.from('koleksi_buku').select('*');
            const loading = document.getElementById('loading');

            if (error) {
                if(loading) loading.innerHTML = "Gagal memuat data buku.";
                return;
            }

            if(loading) loading.style.display = 'none';
            bookContainer.innerHTML = '';

            books.forEach(buku => {
                // Seluruh kartu dibungkus tag <a> tanpa footer status/tombol
                bookContainer.innerHTML += `
                    <a href="detail-buku.html?id=${buku.id}" class="book-card-link" style="text-decoration: none; color: inherit; display: block;">
                        <div class="book-card">
                            <div class="book-cover">
                                <img src="${buku.image_url || 'https://via.placeholder.com/150x220?text=No+Cover'}" alt="Cover">
                            </div>
                            <h3 class="book-title">${buku.judul}</h3>
                            <p class="book-author">Oleh: ${buku.pengarang}</p>
                        </div>
                    </a>
                `;
            });
        }
        loadBooks();

        // 6. LOGIKA SEARCH (Klik Button/Enter)
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');

        function performSearch() {
            const term = searchInput.value.toLowerCase();
            const cards = document.querySelectorAll('.book-card-link');
            
            cards.forEach(card => {
                const title = card.querySelector('.book-title').innerText.toLowerCase();
                const author = card.querySelector('.book-author').innerText.toLowerCase();
                
                if (title.includes(term) || author.includes(term)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Listener Klik Tombol Search
        if (searchBtn) {
            searchBtn.addEventListener('click', performSearch);
        }

        // Listener Tombol Enter di Keyboard
        if (searchInput) {
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
        }
    }
});

// FUNGSI GLOBAL (PENTING: Di luar DOMContentLoaded)
function switchTab(type) {
    const loginForm = document.getElementById('login-form');
    const regForm = document.getElementById('register-form');
    const tabs = document.querySelectorAll('.tab');
    if (!loginForm || !regForm) return;

    if (type === 'login') {
        loginForm.style.display = 'block'; regForm.style.display = 'none';
        tabs[0].classList.add('active'); tabs[1].classList.remove('active');
    } else {
        loginForm.style.display = 'none'; regForm.style.display = 'block';
        tabs[0].classList.remove('active'); tabs[1].classList.add('active');
    }
}

function toggleVisibility(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (input.type === "password") {
        input.type = "text"; icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        input.type = "password"; icon.classList.replace("fa-eye-slash", "fa-eye");
    }
}

function updatePlaceholder() {
    const jenis = document.getElementById('jenisIdentitas').value;
    const inputNo = document.getElementById('nomorIdentitas');
    if (jenis === 'ktp' || jenis === 'kk') {
        inputNo.placeholder = "Masukkan NIK 16 digit";
    } else if (jenis === 'kitas') {
        inputNo.placeholder = "Masukkan No KITAS 11 digit";
    }
}

function copyAlamat() {
    const check = document.getElementById('samaAlamat');
    const asal = document.getElementById('alamatIdentitas');
    const skrg = document.getElementById('alamatSekarang');
    if (check.checked) { skrg.value = asal.value; skrg.readOnly = true; }
    else { skrg.value = ""; skrg.readOnly = false; }
}
