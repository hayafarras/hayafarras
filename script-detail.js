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

        // 2. Ambil Data Stok (Ketersediaan & Lokasi)
        const { data: stok, error: errStok } = await _supabase
            .from('stok_buku')
            .select('*')
            .eq('buku_id', bookId);

        // --- Logika Perhitungan Stok ---
        const totalBuku = stok ? stok.length : 0;
        
        // Menggunakan toLowerCase() agar tetap terhitung meski di DB tulisannya 'tersedia' atau 'Tersedia'
        const tersedia = stok ? stok.filter(s => s.status && s.status.toLowerCase() === 'tersedia').length : 0;
        const dipinjam = totalBuku - tersedia;

        // Ambil lokasi dari entri pertama di tabel stok_buku
        const lokasiPerpus = (stok && stok.length > 0) ? (stok[0].lokasi_perpustakaan || 'Lokasi tidak diatur') : '-';

        // 3. Render ke HTML
        detailContainer.innerHTML = `
            <div class="detail-container" style="animation: fadeIn 0.8s ease-out; grid-template-columns: 280px 1fr;">
                <div class="left">
                    <img src="${buku.gambar_url || 'https://via.placeholder.com/300x450?text=Tanpa+Cover'}" 
                         class="book-cover-large" alt="Cover">
                </div>

                <div class="right">
                    <div class="book-info">
                        <h1 style="margin-bottom: 0;">${buku.judul}</h1>
                        <p class="author" style="font-size: 20px; color: #475569; margin-bottom: 25px;">
                            ${buku.pengarang}
                        </p>
                        
                        <h3 style="color: #1e3a8a; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; font-size: 18px;">
                            Informasi Bibliografi
                        </h3>
                        
                        <div class="info-grid" style="border-top: none; padding-top: 15px; margin-bottom: 30px;">
                            <div class="info-label">ISBN</div>
                            <div class="info-value">${buku.ISBN || '-'}</div>
                            
                            <div class="info-label">Penerbit</div>
                            <div class="info-value">${buku.penerbit} ${buku.tahun_terbit ? '('+buku.tahun_terbit+')' : ''}</div>
                            
                            <div class="info-label">Edisi</div>
                            <div class="info-value">${buku.edisi || '-'}</div>

                            <div class="info-label">Deskripsi Fisik</div>
                            <div class="info-value">${buku.deskripsi_fisik || '-'}</div>

                            <div class="info-label">Subjek</div>
                            <div class="info-value">${buku.subjek || '-'}</div>

                            <div class="info-label">Bahasa</div>
                            <div class="info-value">${buku.bahasa || 'Indonesia'}</div>

                            <div class="info-label">Nomor Panggil</div>
                            <div class="info-value" style="font-family: monospace; font-weight: 700; color: #2563eb;">${buku.nomor_panggil || '-'}</div>
                        </div>

                        <h3 style="color: #1e3a8a; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; font-size: 18px;">
                            Ketersediaan Koleksi
                        </h3>
                        <div style="overflow-x: auto; margin-top: 15px; margin-bottom: 30px;">
                            <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left;">
                                <thead style="background: #f8fafc; color: #1e3a8a;">
                                    <tr>
                                        <th style="padding: 12px; border: 1px solid #e2e8f0;">Total Buku</th>
                                        <th style="padding: 12px; border: 1px solid #e2e8f0;">Tersedia</th>
                                        <th style="padding: 12px; border: 1px solid #e2e8f0;">Dipinjam</th>
                                        <th style="padding: 12px; border: 1px solid #e2e8f0;">Lokasi Perpustakaan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: 600;">${totalBuku} Eks.</td>
                                        <td style="padding: 12px; border: 1px solid #e2e8f0; color: #059669; font-weight: 600;">${tersedia} Eks.</td>
                                        <td style="padding: 12px; border: 1px solid #e2e8f0; color: #dc2626;">${dipinjam} Eks.</td>
                                        <td style="padding: 12px; border: 1px solid #e2e8f0;">${lokasiPerpus}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="synopsis" style="background: #f8faff; padding: 20px; border-radius: 15px; border: 1px solid #eef2ff;">
                            <h3 style="font-size: 18px;">Sinopsis / Deskripsi</h3>
                            <p style="font-size: 15px; color: #475569;">${buku.deskripsi || 'Tidak ada deskripsi tersedia.'}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

    } catch (err) {
        console.error(err);
        detailContainer.innerHTML = "<div class='status-msg'>Terjadi gangguan koneksi.</div>";
    }
}

document.addEventListener("DOMContentLoaded", loadBookDetail);