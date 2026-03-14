const SB_URL = 'https://zybrhmbjvhzrvpykgpux.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5YnJobWJqdmh6cnZweWtncHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMTY5MDUsImV4cCI6MjA4ODg5MjkwNX0.o301u_q0OAhElangyonZdKCRgxDMuTtoahictrGyHxA';
const _supabase = supabase.createClient(SB_URL, SB_KEY);

async function loadBookDetail() {
    const detailContainer = document.getElementById('detail-content');
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');

    if (!bookId) {
        detailContainer.innerHTML = "<div class='status-msg'>ID Buku tidak ditemukan.</div>";
        return;
    }

    try {
        // 1. Ambil Data Buku Utama
        const { data: buku, error: errBuku } = await _supabase
            .from('koleksi_buku')
            .select('*')
            .eq('buku_id', bookId)
            .single();

        if (errBuku || !buku) {
            detailContainer.innerHTML = "<div class='status-msg'>Buku tidak ditemukan.</div>";
            return;
        }

        // 2. Ambil Data Stok (Daftar Fisik Buku)
        const { data: stok, error: errStok } = await _supabase
            .from('stok_buku')
            .select('*')
            .eq('buku_id', bookId);

        // --- Generate Baris Tabel Detail Stok ---
        let stokRows = '';
        if (stok && stok.length > 0) {
            stokRows = stok.map(item => {
                const isTersedia = item.status && item.status.toLowerCase() === 'tersedia';
                const statusColor = isTersedia ? '#166534' : '#991b1b';
                const statusBg = isTersedia ? '#dcfce7' : '#fee2e2';
                
                return `
                    <tr>
                        <td style="font-family: monospace; font-weight: bold; color: #1e293b;">
                            ${item.kode_item || '-'}
                        </td>
                        <td>
                            <span style="padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; 
                                background: ${statusBg}; color: ${statusColor}; display: inline-block;">
                                ${item.status || 'Tidak diketahui'}
                            </span>
                        </td>
                        <td style="color: #475569;">
                            ${item.lokasi_perpustakaan || 'Perpustakaan Lentera Publika'}
                        </td>
                    </tr>
                `;
            }).join('');
        } else {
            stokRows = `<tr><td colspan="3" style="padding: 30px; text-align: center; color: #94a3b8;">Data item fisik buku tidak ditemukan.</td></tr>`;
        }

        // 3. Render ke HTML 
        detailContainer.innerHTML = `
    <div class="detail-container">
        <div class="left">
            <img src="${buku.gambar_url || 'https://via.placeholder.com/300x450?text=Tanpa+Cover'}" class="book-cover-large">
        </div>
        
        <div class="right">
            <div class="book-info">
                <h1>${buku.judul}</h1>
                <p class="author">${buku.pengarang}</p>
                
                <h3>Informasi Bibliografi</h3>
                <div class="info-grid">
                    <div class="info-label">ISBN</div><div class="info-value">${buku.ISBN || '-'}</div>
                    <div class="info-label">Penerbit</div><div class="info-value">${buku.penerbit} (${buku.tahun_terbit || '-'})</div>
                    <div class="info-label">Deskripsi Fisik</div><div class="info-value">${buku.deskripsi_fisik || '-'}</div>
                    <div class="info-label">Subjek</div><div class="info-value">${buku.subjek || '-'}</div>
                    <div class="info-label">Bahasa</div><div class="info-value">${buku.bahasa || 'Indonesia'}</div>
                    <div class="info-label">Nomor Panggil</div><div class="info-value" style="color: #2563eb; font-weight: bold;">${buku.nomor_panggil || '-'}</div>
                </div>

                <h3>Status Ketersediaan Item</h3>
                <div class="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Kode Item</th>
                                <th>Status</th>
                                <th>Lokasi</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${stokRows}
                        </tbody>
                    </table>
                </div>

                <h3>Sinopsis / Deskripsi</h3>
                <div class="synopsis-text">
                    ${buku.deskripsi || 'Tidak ada deskripsi tersedia untuk buku ini.'}
                </div>
            </div>
        </div>
    </div>
`;

    } catch (err) {
        console.error("Error loading detail:", err);
        detailContainer.innerHTML = "<div class='status-msg'>Terjadi kesalahan saat memuat data. Silakan coba lagi nanti.</div>";
    }
}

document.addEventListener("DOMContentLoaded", loadBookDetail);
