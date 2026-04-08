document.addEventListener("DOMContentLoaded", async function() {
        const SB_URL = 'https://zybrhmbjvhzrvpykgpux.supabase.co';
        const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5YnJobWJqdmh6cnZweWtncHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMTY5MDUsImV4cCI6MjA4ODg5MjkwNX0.o301u_q0OAhElangyonZdKCRgxDMuTtoahictrGyHxA';
        const _supabase = supabase.createClient(SB_URL, SB_KEY);

        // 1. Ambil ID dari URL (?id=...)
        const params = new URLSearchParams(window.location.search);
        const eventId = params.get('id');

        if (!eventId) {
            document.body.innerHTML = "ID Kegiatan tidak ditemukan.";
            return;
        }

        // 2. Ambil data dari Supabase
        const { data: event, error } = await _supabase
            .from('kegiatan')
            .select('*')
            .eq('kegiatan_id', eventId)
            .single();

        if (error || !event) {
            console.error("Error:", error);
            document.getElementById('loading-state').innerHTML = "Kegiatan tidak ditemukan.";
            return;
        }

        // 3. Masukkan data ke HTML
        document.getElementById('event-image').src = event.image_url || 'https://via.placeholder.com/800x400';
        document.getElementById('event-title').innerText = event.judul;
        document.getElementById('event-description').innerText = event.deskripsi;
        document.getElementById('event-location').innerText = event.lokasi || "Lokasi tidak ditentukan";
        
        // Format Tanggal
        const opsiTgl = { day: 'numeric', month: 'long', year: 'numeric' };
        document.getElementById('event-date').innerText = new Date(event.tanggal).toLocaleDateString('id-ID', opsiTgl);

        // Kategori & Status Badge
        const catElem = document.getElementById('event-category');
        catElem.innerText = event.kategori;
        catElem.className = `badge cat-${event.kategori.toLowerCase()}`;

        const statusElem = document.getElementById('event-status');
        statusElem.innerText = event.status;
        const s = event.status.toLowerCase();
        const statusClass = s.includes('mendatang') || s.includes('datang') ? 'status-mendatang' : 
                            s.includes('langsung') ? 'status-berlangsung' : 'status-berakhir';
        statusElem.className = `badge ${statusClass}`;

        // Tombol Registrasi
        const regBtn = document.getElementById('event-reg-btn');
        if (s.includes('akhir')) {
            regBtn.innerText = "Kegiatan Telah Berakhir";
            regBtn.classList.add('btn-disabled');
        } else {
            regBtn.href = event.registrasi || "#";
        }

        // Tampilkan konten, sembunyikan loader
        document.getElementById('loading-state').style.display = 'none';
        document.getElementById('event-detail-content').style.display = 'block';
    });