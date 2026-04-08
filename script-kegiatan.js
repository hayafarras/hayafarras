const SUPABASE_URL = 'https://zybrhmbjvhzrvpykgpux.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5YnJobWJqdmh6cnZweWtncHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMTY5MDUsImV4cCI6MjA4ODg5MjkwNX0.o301u_q0OAhElangyonZdKCRgxDMuTtoahictrGyHxA';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function loadKegiatan() {
  const { data: kegiatan, error } = await _supabase
    .from('kegiatan')
    .select('*')
    .order('tanggal', { ascending: true });

  if (error) {
    console.error("Gagal ambil data:", error);
    return;
  }

  const container = document.getElementById('events-container');
  container.innerHTML = ''; 

  kegiatan.forEach(item => {
    const isSelesai = item.status.toLowerCase() === 'selesai';
    
    // --- FORMAT TANGGAL KE BAHASA INDONESIA ---
    // Mengubah "2026-04-15" menjadi "15 April 2026"
    const dateObj = new Date(item.tanggal);
    const opsiTanggal = { day: 'numeric', month: 'long', year: 'numeric' };
    const tanggalCantik = dateObj.toLocaleDateString('id-ID', opsiTanggal);

    // Tentukan class warna status
    let statusClass = 'status-mendatang';
    if(isSelesai) statusClass = 'status-selesai';
    if(item.status.toLowerCase() === 'aktif') statusClass = 'status-aktif';

    // RENDER CARD (Sudah Clickable)
    container.innerHTML += `
      <a href="detail-kegiatan.html?id=${item.id}" style="text-decoration: none; color: inherit; display: block;">
        <div class="event-card-v2">
          <div class="card-image-wrapper">
            <img src="${item.image_url || 'https://via.placeholder.com/400x200'}" alt="${item.judul}">
            <span class="status-label ${statusClass}">${item.status}</span>
          </div>
          <div class="card-body">
            <span class="tag">${item.kategori}</span>
            <h4 style="margin-bottom: 5px;">${item.judul}</h4>
            <small style="display:flex; align-items:center; gap:5px; color:#64748b; font-weight:600;">
              <i class="far fa-calendar-alt"></i> ${tanggalCantik}
            </small>
          </div>
        </div>
      </a>
    `;
  });
}

document.addEventListener('DOMContentLoaded', loadKegiatan);
