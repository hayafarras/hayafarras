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
  container.innerHTML = ''; // Hapus data statis bawaan HTML

  kegiatan.forEach(item => {
    // Logika tombol: Jika status 'Selesai', tombol tidak bisa diklik
    const isSelesai = item.status.toLowerCase() === 'selesai';
    const btnLabel = isSelesai ? 'Pendaftaran Tutup' : 'Daftar Sekarang';
    const btnClass = isSelesai ? 'btn-regis disabled' : 'btn-regis';
    
    // Tentukan class warna status
    let statusClass = 'status-mendatang';
    if(isSelesai) statusClass = 'status-selesai';
    if(item.status.toLowerCase() === 'aktif') statusClass = 'status-aktif';

    container.innerHTML += `
      <div class="event-card-v2">
        <div class="card-image-wrapper">
          <img src="${item.image_url || 'https://via.placeholder.com/400x200'}" alt="${item.judul}">
          <span class="status-label ${statusClass}">${item.status}</span>
        </div>
        <div class="card-body">
          <span class="tag">${item.kategori}</span>
          <small style="display:block; color:#2563eb; font-weight:700; margin-bottom:5px;">
            ${item.tanggal}
          </small>
          <h4>${item.judul}</h4>
          <p>${item.deskripsi.substring(0, 100)}...</p>
          <div class="card-footer">
            <a href="${item.registrasi}" target="_blank" class="${btnClass}">${btnLabel}</a>
          </div>
        </div>
      </div>
    `;
  });
}

document.addEventListener('DOMContentLoaded', loadKegiatan);
