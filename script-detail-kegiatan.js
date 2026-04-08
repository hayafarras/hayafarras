const SUPABASE_URL = 'https://zybrhmbjvhzrvpykgpux.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5YnJobWJqdmh6cnZweWtncHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMTY5MDUsImV4cCI6MjA4ODg5MjkwNX0.o301u_q0OAhElangyonZdKCRgxDMuTtoahictrGyHxA';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function loadEventDetail() {
    const container = document.getElementById('event-detail-content');
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');

    if (!eventId) {
        container.innerHTML = "<div style='text-align:center; padding:50px;'>ID Kegiatan tidak ditemukan.</div>";
        return;
    }

    try {
        const { data: event, error } = await _supabase
            .from('kegiatan')
            .select('*')
            .eq('id', eventId)
            .single();

        if (error || !event) {
            container.innerHTML = "<div style='text-align:center; padding:50px;'>Kegiatan tidak ditemukan.</div>";
            return;
        }

        // Format Tanggal Cantik (15 April 2026)
        const dateObj = new Date(event.tanggal);
        const tglCantik = dateObj.toLocaleDateString('id-ID', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });

        const isSelesai = event.status.toLowerCase() === 'selesai';

        container.innerHTML = `
            <img src="${event.image_url || 'https://via.placeholder.com/800x400'}" class="hero-image" alt="Event Image">
            
            <div class="event-header">
                <h1 class="event-title">${event.judul}</h1>
                <div class="event-meta">
                    <div class="meta-item"><i class="fas fa-calendar-alt"></i> ${tglCantik}</div>
                    <div class="meta-item"><i class="fas fa-tag"></i> ${event.kategori}</div>
                    <div class="meta-item"><i class="fas fa-info-circle"></i> Status: ${event.status}</div>
                </div>
            </div>

            <div class="description-container">
                <h3>Tentang Kegiatan</h3>
                <div class="description-text">
                    ${event.deskripsi}
                </div>
            </div>

            <div class="registration-box">
                <p style="margin-bottom: 20px; font-weight: 500; color: #475569;">
                    ${isSelesai ? 'Pendaftaran sudah berakhir.' : 'Tertarik mengikuti kegiatan ini?'}
                </p>
                <a href="${event.registrasi}" target="_blank" class="btn-register ${isSelesai ? 'disabled' : ''}">
                    ${isSelesai ? 'Pendaftaran Tutup' : 'Daftar Sekarang'}
                </a>
            </div>
        `;

    } catch (err) {
        console.error(err);
        container.innerHTML = "<div style='text-align:center; padding:50px;'>Terjadi gangguan koneksi.</div>";
    }
}

document.addEventListener('DOMContentLoaded', loadEventDetail);