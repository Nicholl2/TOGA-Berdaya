import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Droplets, 
  Flame, 
  CheckCircle2, 
  XCircle, 
  Scale, 
  Beaker, 
  Timer, 
  Info,
  Sparkles,
  Heart,
  Calendar,
  BookOpen
} from 'lucide-react';

export default function PanduanInfo({ onBack }) {
  const [activeSubTab, setActiveSubTab] = useState('poc'); // 'poc' or 'toga'

  return (
    <div className="min-h-screen bg-[#FBFCF8] text-[#1F2937] font-sans antialiased selection:bg-[#E0F2FE] selection:text-[#0369A1]">
      
      {/* HEADER BAR */}
      <header className="sticky top-0 bg-[#FBFCF8]/80 backdrop-blur-md border-b border-[#E5E7EB]/60 z-50">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-semibold text-[#4B5563] hover:text-[#111827] transition-colors duration-200 group cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-200" />
            <span>Kembali</span>
          </button>
          <span className="text-xs font-mono font-bold tracking-widest text-[#14B8A6] uppercase">
            Panduan Edukasi
          </span>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-[#ECFDF5] to-[#FBFCF8] py-8 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D1FAE5] text-[#065F46] text-xs font-bold font-mono tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" /> KKN UNDIP Tingkir Lor 2026
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#111827] leading-tight">
            Panduan TOGA & Pupuk Organik Cair
          </h1>
          <p className="mt-2 text-sm text-[#4B5563] max-w-xl mx-auto leading-relaxed">
            Basis pengetahuan praktis untuk budidaya Tanaman Obat Keluarga dan mandiri pupuk organik di pekarangan rumah desa.
          </p>

          {/* Sub Tab Switcher */}
          <div className="mt-8 flex justify-center p-1 bg-[#F3F4F6] rounded-xl max-w-sm mx-auto shadow-sm">
            <button
              onClick={() => setActiveSubTab('poc')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all duration-200 uppercase tracking-wider font-mono flex items-center justify-center gap-1.5 cursor-pointer ${
                activeSubTab === 'poc'
                  ? 'bg-white text-[#111827] shadow-sm'
                  : 'text-[#4B5563] hover:text-[#111827]'
              }`}
            >
              <Droplets className="w-4 h-4 text-[#10B981]" />
              Panduan POC
            </button>
            <button
              onClick={() => setActiveSubTab('toga')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all duration-200 uppercase tracking-wider font-mono flex items-center justify-center gap-1.5 cursor-pointer ${
                activeSubTab === 'toga'
                  ? 'bg-white text-[#111827] shadow-sm'
                  : 'text-[#4B5563] hover:text-[#111827]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#3B82F6]" />
              Pengolahan TOGA
            </button>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-3xl mx-auto px-4 py-8 pb-20">
        
        {/* ========================================================================= */}
        {/* PANDUAN POC (PUPUK ORGANIK CAIR) */}
        {/* ========================================================================= */}
        {activeSubTab === 'poc' && (
          <article className="space-y-12">
            
            {/* INTRO */}
            <div className="prose prose-slate max-w-none text-[#4B5563] leading-relaxed text-sm">
              <p>
                <strong>Pupuk Organik Cair (POC)</strong> merupakan pupuk berbentuk cairan yang berasal dari dekomposisi bahan-bahan organik dengan bantuan mikroorganisme. Penggunaan POC terbukti meningkatkan kesuburan tanah secara alami, menyuburkan perakaran, serta aman dan ramah lingkungan untuk tanaman TOGA dan sayuran warga.
              </p>
            </div>

            {/* ALAT DAN BAHAN */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#111827] mb-4 flex items-center gap-2">
                <Beaker className="w-5 h-5 text-[#10B981]" />
                Alat & Bahan Pembuatan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <h3 className="font-bold text-[#374151] mb-2 font-mono uppercase tracking-wider text-[10px]">Alat Utama:</h3>
                  <ul className="space-y-1.5 list-disc list-inside text-[#4B5563]">
                    <li>Botol plastik besar (wadah fermentasi)</li>
                    <li>Botol plastik kecil (tempat keluar gas)</li>
                    <li>Selang plastik ukuran kecil</li>
                    <li>Lem tembak & isi lem tembak</li>
                    <li>Gelas ukur & sendok takar</li>
                    <li>Wadah besar (ember) & pengaduk</li>
                    <li>Timbangan dapur</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#374151] mb-2 font-mono uppercase tracking-wider text-[10px]">Bahan Baku:</h3>
                  <ul className="space-y-1.5 list-disc list-inside text-[#4B5563]">
                    <li>Sampah organik (sisa buah / sayur)</li>
                    <li>EM4 Pertanian (starter mikroba)</li>
                    <li>Molase / tetes tebu (sumber nutrisi mikroba)</li>
                    <li>Air bersih / Air cucian beras</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* PERBANDINGAN TAKARAN */}
            <div className="bg-gradient-to-r from-[#F0FDF4] to-[#ECFDF5] rounded-2xl border border-[#D1FAE5] p-6">
              <h2 className="text-lg font-bold text-[#065F46] mb-3 flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#10B981]" />
                Formulasi Perbandingan Takaran
              </h2>
              <div className="space-y-4 text-xs text-[#065F46]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/60 p-4 rounded-xl border border-[#A7F3D0]/50">
                    <p className="font-bold text-xs mb-1">Skala Kecil (1 kg):</p>
                    <p className="text-xs font-medium">1 kg Sampah organik + 20 ml EM4 + 20 ml Molase + 2 Liter air.</p>
                  </div>
                  <div className="bg-white/60 p-4 rounded-xl border border-[#A7F3D0]/50">
                    <p className="font-bold text-xs mb-1">Skala Sedang (5 kg):</p>
                    <p className="text-xs font-medium">5 kg Sampah organik + 100 ml EM4 + 100 ml Molase + 10 Liter air.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] p-4 rounded-xl text-xs mt-3">
                  <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>
                    <strong>PENTING:</strong> Selalu sisakan ruang kosong sekitar <strong>20 - 25%</strong> dari kapasitas wadah botol fermentasi agar gas hasil fermentasi memiliki ruang dan wadah tidak meledak.
                  </p>
                </div>
              </div>
            </div>

            {/* LANGKAH-LANGKAH PEMBUATAN */}
            <div>
              <h2 className="text-xl font-extrabold text-[#111827] mb-6">Langkah-Langkah Pembuatan POC</h2>
              <ol className="space-y-6">
                
                {/* Step 1 */}
                <li className="flex gap-4">
                  <div className="flex-shrink-0 bg-emerald-100 text-emerald-700 font-bold rounded-full h-8 w-8 flex items-center justify-center font-mono">
                    1
                  </div>
                  <div className="pt-0.5">
                    <h3 className="font-bold text-[#111827] text-sm">Pencacahan Sampah Organik</h3>
                    <p className="text-xs text-[#4B5563] mt-1 leading-relaxed">
                      Cacah sampah organik (sisa potongan sayur atau kulit buah) menjadi potongan-potongan kecil. Semakin kecil ukuran cacahan, semakin cepat proses dekomposisi terjadi.
                    </p>
                    <img 
                      src="/assets/panduan_poc_step1.jpg" 
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&auto=format&fit=crop&q=60"; }}
                      alt="Cacah Sampah Organik" 
                      className="w-full h-auto max-h-60 rounded-xl shadow-sm object-cover my-4" 
                    />
                  </div>
                </li>

                {/* Step 2 */}
                <li className="flex gap-4">
                  <div className="flex-shrink-0 bg-emerald-100 text-emerald-700 font-bold rounded-full h-8 w-8 flex items-center justify-center font-mono">
                    2
                  </div>
                  <div className="pt-0.5">
                    <h3 className="font-bold text-[#111827] text-sm">Pengisian Botol Wadah Utama</h3>
                    <p className="text-xs text-[#4B5563] mt-1 leading-relaxed">
                      Masukkan cacahan sampah organik yang sudah dipotong tadi ke dalam wadah botol plastik fermentasi berukuran besar.
                    </p>
                  </div>
                </li>

                {/* Step 3 */}
                <li className="flex gap-4">
                  <div className="flex-shrink-0 bg-emerald-100 text-emerald-700 font-bold rounded-full h-8 w-8 flex items-center justify-center font-mono">
                    3
                  </div>
                  <div className="pt-0.5">
                    <h3 className="font-bold text-[#111827] text-sm">Pembuatan Larutan Nutrisi</h3>
                    <p className="text-xs text-[#4B5563] mt-1 leading-relaxed">
                      Di dalam wadah terpisah (ember), masukkan air cucian beras, EM4, dan Molase. Aduk menggunakan pengaduk secara merata hingga seluruh bahan larut dan tercampur sempurna.
                    </p>
                    <img 
                      src="/assets/panduan_poc_step3.jpg" 
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=800&auto=format&fit=crop&q=60"; }}
                      alt="Pencampuran Larutan EM4 dan Molase" 
                      className="w-full h-auto max-h-60 rounded-xl shadow-sm object-cover my-4" 
                    />
                  </div>
                </li>

                {/* Step 4 */}
                <li className="flex gap-4">
                  <div className="flex-shrink-0 bg-emerald-100 text-emerald-700 font-bold rounded-full h-8 w-8 flex items-center justify-center font-mono">
                    4
                  </div>
                  <div className="pt-0.5">
                    <h3 className="font-bold text-[#111827] text-sm">Penyatuan Bahan</h3>
                    <p className="text-xs text-[#4B5563] mt-1 leading-relaxed">
                      Tuangkan campuran larutan air, EM4, dan Molase tersebut secara perlahan ke dalam botol utama yang telah berisi sampah organik.
                    </p>
                  </div>
                </li>

                {/* Step 5 */}
                <li className="flex gap-4">
                  <div className="flex-shrink-0 bg-emerald-100 text-emerald-700 font-bold rounded-full h-8 w-8 flex items-center justify-center font-mono">
                    5
                  </div>
                  <div className="pt-0.5">
                    <h3 className="font-bold text-[#111827] text-sm">Pemasangan Selang Gas</h3>
                    <p className="text-xs text-[#4B5563] mt-1 leading-relaxed">
                      Lubangi bagian tengah tutup botol besar (wadah fermentasi) dan tutup botol kecil (botol gas pembuangan) menggunakan paku atau solder. Masukkan selang plastik kecil ke lubang tutup botol besar, lalu gunakan lem tembak untuk merekatkan selang agar tidak ada kebocoran gas.
                    </p>
                  </div>
                </li>

                {/* Step 6 */}
                <li className="flex gap-4">
                  <div className="flex-shrink-0 bg-emerald-100 text-emerald-700 font-bold rounded-full h-8 w-8 flex items-center justify-center font-mono">
                    6
                  </div>
                  <div className="pt-0.5">
                    <h3 className="font-bold text-[#111827] text-sm">Menghubungkan Botol Pembuangan</h3>
                    <p className="text-xs text-[#4B5563] mt-1 leading-relaxed">
                      Isi botol kecil dengan air bersih. Masukkan ujung selang lainnya yang berasal dari botol besar ke dalam botol kecil tersebut hingga tercelup air, kemudian tutup kedua botol tersebut.
                    </p>
                    <img 
                      src="/assets/panduan_poc_step6.jpg" 
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=60"; }}
                      alt="Sistem Selang Pembuangan Gas POC" 
                      className="w-full h-auto max-h-60 rounded-xl shadow-sm object-cover my-4" 
                    />
                  </div>
                </li>

                {/* Step 7 */}
                <li className="flex gap-4">
                  <div className="flex-shrink-0 bg-emerald-100 text-emerald-700 font-bold rounded-full h-8 w-8 flex items-center justify-center font-mono">
                    7
                  </div>
                  <div className="pt-0.5">
                    <h3 className="font-bold text-[#111827] text-sm">Proses Fermentasi & Pengocokan</h3>
                    <p className="text-xs text-[#4B5563] mt-1 leading-relaxed">
                      Letakkan instalasi botol POC di tempat yang teduh, sejuk, dan tidak terpapar oleh sinar matahari langsung. Selama minggu pertama, lakukan pengocokan wadah secara berkala perlahan agar proses fermentasi menyebar secara merata.
                    </p>
                  </div>
                </li>

                {/* Step 8 */}
                <li className="flex gap-4">
                  <div className="flex-shrink-0 bg-emerald-100 text-emerald-700 font-bold rounded-full h-8 w-8 flex items-center justify-center font-mono">
                    8
                  </div>
                  <div className="pt-0.5">
                    <h3 className="font-bold text-[#111827] text-sm">Penyaringan & Penggunaan</h3>
                    <p className="text-xs text-[#4B5563] mt-1 leading-relaxed">
                      Setelah didiamkan selama <strong>2-3 minggu</strong>, POC siap digunakan. Saring cairan menggunakan kain penyaring untuk memisahkan cairan POC murni dari ampas padatnya. Ampas padat sisa penyaringan dapat dimanfaatkan lebih lanjut sebagai kompos padat.
                    </p>
                  </div>
                </li>

              </ol>
            </div>

            {/* INDIKATOR KEBERHASILAN (TABEL) */}
            <div>
              <h2 className="text-lg font-bold text-[#111827] mb-4">Indikator Keberhasilan Fermentasi</h2>
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-xs text-left text-gray-500">
                  <thead className="text-[10px] text-gray-700 uppercase bg-gray-50 font-mono">
                    <tr>
                      <th scope="col" className="px-4 py-3">Indikator</th>
                      <th scope="col" className="px-4 py-3 text-emerald-700 bg-emerald-50">POC Berhasil</th>
                      <th scope="col" className="px-4 py-3 text-rose-700 bg-rose-50">POC Gagal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-150">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-gray-900 bg-gray-50">Aroma/Bau</th>
                      <td className="px-4 py-3 text-emerald-800 bg-emerald-50/30">Asam segar, mirip aroma tape/fermentasi</td>
                      <td className="px-4 py-3 text-rose-800 bg-rose-50/30">Busuk menyengat seperti sampah/comberan</td>
                    </tr>
                    <tr>
                      <th className="px-4 py-3 font-semibold text-gray-900 bg-gray-50">Warna</th>
                      <td className="px-4 py-3 text-emerald-800 bg-emerald-50/30">Coklat kekuningan hingga coklat kehitaman jernih</td>
                      <td className="px-4 py-3 text-rose-800 bg-rose-50/30">Hitam pekat kotor dan berlendir</td>
                    </tr>
                    <tr>
                      <th className="px-4 py-3 font-semibold text-gray-900 bg-gray-50">Gas / Busa</th>
                      <td className="px-4 py-3 text-emerald-800 bg-emerald-50/30">Muncul busa di awal, lalu berkurang setelah ~2 minggu</td>
                      <td className="px-4 py-3 text-rose-800 bg-rose-50/30">Botol terus menggembung kencang, busa berlebih</td>
                    </tr>
                    <tr>
                      <th className="px-4 py-3 font-semibold text-gray-900 bg-gray-50">Endapan</th>
                      <td className="px-4 py-3 text-emerald-800 bg-emerald-50/30">Ampas mengendap di dasar, cairan atas relatif jernih</td>
                      <td className="px-4 py-3 text-rose-800 bg-rose-50/30">Ampas mengembang di atas, cairan keruh pekat</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* CARA PENGAPLIKASIAN */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-[#111827] flex items-center gap-2">
                <Timer className="w-5 h-5 text-blue-500" />
                Cara & Aturan Pengaplikasian POC
              </h2>
              
              <div className="text-xs text-[#4B5563] space-y-3 leading-relaxed">
                <div className="p-3 bg-blue-50 border border-blue-100 text-blue-800 rounded-xl">
                  <p className="font-bold">Langkah Penting Sebelum Digunakan:</p>
                  <p className="mt-0.5">Jangan pernah menyiramkan cairan POC murni langsung ke tanaman! Campurkan dahulu <strong>10 - 20 ml POC</strong> (setara 1 - 2 tutup botol kemasan) ke dalam <strong>1 Liter air bersih</strong>, lalu aduk rata.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="border border-gray-100 p-4 rounded-xl">
                    <p className="font-bold text-gray-800 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-blue-500" />
                      1. Penyiraman Akar
                    </p>
                    <p className="mt-1 text-[11px]">Siramkan larutan campuran POC di sekitar lingkar perakaran tanaman sebanyak kurang lebih <strong>200 - 300 ml</strong> per lubang/tanaman. Pastikan media tanah basah lembab, jangan sampai tergenang air.</p>
                  </div>
                  <div className="border border-gray-100 p-4 rounded-xl">
                    <p className="font-bold text-gray-800 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-blue-500" />
                      2. Penyemprotan Daun
                    </p>
                    <p className="mt-1 text-[11px]">Semprotkan campuran larutan secara tipis dan merata ke bagian permukaan bawah daun. Penyerapan nutrisi tanaman akan berjalan jauh lebih efektif lewat celah stomata daun.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 font-mono text-[10px]">
                  <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span><strong>Frekuensi:</strong> Rutin 1 kali setiap 1 - 2 minggu.</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-2">
                    <Timer className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span><strong>Waktu:</strong> Pagi (06:00-09:00) / Sore (16:00-18:00).</span>
                  </div>
                </div>
              </div>
            </div>

          </article>
        )}

        {/* ========================================================================= */}
        {/* PENGOLAHAN TANAMAN OBAT KELUARGA (TOGA) */}
        {/* ========================================================================= */}
        {activeSubTab === 'toga' && (
          <article className="space-y-12">
            
            {/* INTRO */}
            <div className="prose prose-slate max-w-none text-[#4B5563] leading-relaxed text-sm">
              <p>
                Bagian ini menjelaskan petunjuk pengolahan mandiri hasil panen Tanaman Obat Keluarga (TOGA) untuk mengobati keluhan penyakit ringan sehari-hari secara aman berdasarkan buku panduan bioteknologi KKN.
              </p>
            </div>

            {/* RECIPES */}
            <div className="space-y-6">
              
              {/* Recipe 1 */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[#111827] text-base">Ramuan Kencur (Obat Batuk Tradisional)</h3>
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-700 font-mono text-[9px] font-bold rounded-full uppercase tracking-wider">Kencur</span>
                </div>
                <div className="mt-4 text-xs text-[#4B5563] space-y-3">
                  <div>
                    <p className="font-bold text-gray-800">Cara 1 (Praktis):</p>
                    <p className="mt-0.5">Ambil 5 gram kencur segar, cuci bersih dengan air mengalir. Kunyah rimpang kencur tersebut secara perlahan hingga halus, lalu telan langsung cairannya.</p>
                  </div>
                  <div className="border-t border-gray-100 pt-3">
                    <p className="font-bold text-gray-800">Cara 2 (Perasan & Madu):</p>
                    <p className="mt-0.5">Parut 10 gram kencur segar yang sudah dicuci bersih, kemudian peras ampasnya menggunakan kain bersih. Campurkan air perasan kencur tersebut dengan madu secukupnya. Minum ramuan ini sekaligus 3 kali sehari secara teratur (pagi, siang, dan sore).</p>
                  </div>
                </div>
              </div>

              {/* Recipe 2 */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[#111827] text-base">Rebusan Sambiloto (Obat Penurun Demam)</h3>
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-mono text-[9px] font-bold rounded-full uppercase tracking-wider">Sambiloto</span>
                </div>
                <p className="mt-3 text-xs text-[#4B5563] leading-relaxed">
                  Ambil beberapa lembar daun sambiloto segar. Rebus daun sambiloto tersebut dengan menggunakan <strong>2 gelas air bersih</strong> hingga airnya menyusut dan hanya menyisakan <strong>1 gelas air saja</strong>. Saring air rebusan herbal tersebut, dinginkan hingga hangat, dan minum segera secara rutin.
                </p>
              </div>

              {/* Recipe 3 */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[#111827] text-base">Perasan Kunyit (Obat Pegal Linu & Perut Kembung)</h3>
                  <span className="px-2.5 py-1 bg-amber-50 text-amber-700 font-mono text-[9px] font-bold rounded-full uppercase tracking-wider">Kunyit</span>
                </div>
                <p className="mt-3 text-xs text-[#4B5563] leading-relaxed">
                  Kupas kulit rimpang kunyit secukupnya lalu cuci hingga bersih. Parut atau haluskan kunyit tersebut. Tambahkan 2 sendok makan air panas matang ke dalam kunyit halus, aduk rata. Peras parutan menggunakan saringan kain, tampung airnya, lalu minum air perasan hangat tersebut secara teratur.
                </p>
              </div>

              {/* Recipe 4 */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[#111827] text-base">Ramuan Air Sirih (Obat Alami Penghilang Gatal)</h3>
                  <span className="px-2.5 py-1 bg-teal-50 text-teal-700 font-mono text-[9px] font-bold rounded-full uppercase tracking-wider">Daun Sirih</span>
                </div>
                <p className="mt-3 text-xs text-[#4B5563] leading-relaxed">
                  Petik 5-7 lembar daun sirih segar, cuci bersih. Remas daun sirih di dalam air bersih secukupnya lalu diamkan selama kurang lebih 30 menit hingga air menyusut dan berubah warna. Basuhkan air remasan sirih tersebut ke area kulit tubuh yang gatal sehabis mandi dengan cara ditepuk-tepuk lembut.
                </p>
              </div>

              {/* Recipe 5 */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[#111827] text-base">Rebusan Jahe & Sereh (Pegal Linu & Masuk Angin)</h3>
                  <span className="px-2.5 py-1 bg-orange-50 text-orange-700 font-mono text-[9px] font-bold rounded-full uppercase tracking-wider">Jahe & Sereh</span>
                </div>
                <div className="mt-3 text-xs text-[#4B5563] space-y-2">
                  <p><strong>Bahan:</strong> 1 jempol Jahe Merah + 2 batang Sereh + 1 Gelas air + 1 sdm Gula Merah + Seujung sendok Garam dapur.</p>
                  <p className="border-t border-gray-100 pt-2 leading-relaxed">
                    <strong>Cara Pengolahan:</strong> Bakar rimpang jahe sebentar lalu geprek/memarkan. Memarkan pula batang sereh. Rebus jahe geprek dan sereh dengan segelas air hingga mendidih dan menyusut sedikit. Tambahkan gula merah dan garam dapur, aduk hingga larut. Angkat, diamkan hingga suam-suam kuku, saring, dan minum selagi hangat pada waktu pagi dan sore hari.
                  </p>
                </div>
              </div>

            </div>

          </article>
        )}

      </main>
    </div>
  );
}
