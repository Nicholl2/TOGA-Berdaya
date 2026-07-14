import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { 
  Lock, 
  Cpu, 
  BookOpen, 
  Compass,
  Leaf,
  Pencil,
  Trash2,
  Plus,
  LogOut,
  Shield,
  Search,
  Eye,
  EyeOff
} from 'lucide-react';

// KKN Student Profile Images
import allyaImg from './assets/Allya.JPG';
import ayunImg from './assets/Ayun.JPG';
import nicholasImg from './assets/Nicholas.JPG';
import raditImg from './assets/Radit.png';
import revinaImg from './assets/Revina.JPG';
import togaLogo from './assets/TOGA-Logo.png';

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/v1";

const fallbackPlants = [
  {
    id: 1,
    name: "Jahe Merah",
    latinName: "Zingiber officinale var. rubrum",
    type: "toga",
    image: "https://d4tlm.umsida.ac.id/wp-content/uploads/2025/09/ChatGPT-Image-Sep-29-2025-11_05_41-AM_11zon.jpg",
    modules: {
      khasiat: "Jahe merah kaya akan kandungan gingerol dan shogaol yang tinggi. Bermanfaat besar untuk meningkatkan daya tahan tubuh (imunomodulator), meredakan peradangan sendi (anti-inflamasi), meredakan batuk kering, serta menghangatkan tubuh.",
      poc: "Gunakan Formula POC Fermentasi Urin Kelinci: Campurkan 1 liter POC dengan 15 liter air bersih. Tambahkan EM4 pertanian 10 ml sebagai agen mikroba aktif untuk memaksimalkan nutrisi nitrogen.",
      aturan: "Siramkan larutan POC di sekitar perakaran Jahe Merah sebanyak 250ml per bedeng tanaman. Lakukan secara rutin setiap 1 minggu sekali pada pagi hari (pukul 07.00 - 09.00).",
      sejarah: "Jahe Merah telah digunakan secara turun-temurun sejak kerajaan Hindu-Buddha di Nusantara sebagai jamu penghangat badan bagi para prajurit kerajaan sebelum maju ke medan perang."
    }
  },
  {
    id: 2,
    name: "Kunyit",
    latinName: "Curcuma longa",
    type: "toga",
    image: "https://www.masjidalakbar.or.id/wp-content/uploads/2024/09/kunyit.jpg",
    modules: {
      khasiat: "Kandungan kurkumin yang melimpah memberikan warna kuning khas dan bertindak sebagai antioksidan kuat. Efektif meredakan gangguan pencernaan (maag/dispepsia), memelihara fungsi hati, serta menurunkan kolesterol jahat.",
      poc: "Formula POC Air Cucian Beras (Leri): Campurkan 500ml POC leri yang difermentasi dengan 10 liter air. Larutan ini kaya unsur fosfor untuk merangsang rimpang kunyit agar tumbuh lebat.",
      aturan: "Semprotkan halus pada daun dan kocor di pangkat tanaman sebanyak 200ml per tanaman. Lakukan setiap 10 hari sekali pada sore hari (pukul 16.00 - 17.30).",
      sejarah: "Tercatat dalam manuskrip kuno Jawa Serat Centhini sebagai ramuan jamu kunyit asam yang dikonsumsi oleh keluarga keraton untuk menjaga kesegaran tubuh dan kesehatan kulit."
    }
  },
  {
    id: 3,
    name: "Lidah Buaya",
    latinName: "Aloe vera",
    type: "toga",
    image: "https://images.alodokter.com/dk0z4ums3/image/upload/v1653967589/attached_image/kenali-manfaat-lidah-buaya-untuk-jerawat-dan-cara-penggunaannya-0-alodokter.jpg",
    modules: {
      khasiat: "Gel lidah buaya mengandung aloin, enzim pembantu pencernaan, serta asam amino esensial. Sangat baik untuk mempercepat penyembuhan luka bakar ringan, meredakan iritasi kulit, serta melembapkan rambut secara alami.",
      poc: "Formula POC Berbasis Sabut Kelapa: Encerkan 1 liter POC sabut kelapa (tinggi kalium) dengan 20 liter air. Sangat baik untuk mempertebal jaringan gel pada pelepah lidah buaya.",
      aturan: "Kocorkan langsung ke media tanah di sekitar pangkal tanaman sebanyak 300ml. Hindari menyiram langsung ke sela-sela pelepah daun. Lakukan setiap 2 minggu sekali.",
      sejarah: "Lidah Buaya dibawa oleh para pelaut kuno dari daerah beriklim kering Afrika Utara dan dibudidayakan di pekarangan rumah masyarakat Jawa sejak abad ke-19 sebagai pertolongan pertama luka luar."
    }
  },
  {
    id: 4,
    name: "Temulawak",
    latinName: "Curcuma xanthorrhiza",
    type: "toga",
    image: "https://almaata.ac.id/wp-content/uploads/2025/05/assortment-ginger-wooden-board-1-1536x1025.jpg",
    modules: {
      khasiat: "Temulawak merupakan herba asli Indonesia yang mengandung kurkuminoid dan xanthorrhizol. Bermanfaat untuk meningkatkan nafsu makan (terutama pada anak-anak), mengatasi gangguan empedu, serta mencegah radang lambung.",
      poc: "Formula POC Kotoran Kambing & Kompos Hijau: Campurkan 1 liter POC dengan 10 liter air. Kaya akan kalium dan nitrogen organik untuk mengoptimalkan pertumbuhan daun lebar temulawak.",
      aturan: "Kocor tanah di sekitar bedeng temulawak sebanyak 250ml per lubang tanam. Aplikasikan setiap 1 minggu sekali pada pagi hari sebelum sinar matahari terlalu terik.",
      sejarah: "Merupakan tanaman obat unggulan nasional yang telah dinobatkan sebagai 'Indonesian Ginseng' karena khasiat multimanfaatnya yang menyamai pamor ginseng Asia Timur."
    }
  },
  {
    id: 5,
    name: "Kencur",
    latinName: "Kaempferia galanga",
    type: "toga",
    image: "https://umsu.ac.id/health/wp-content/uploads/2023/08/Manfaat-Kencur-untuk-Kesehatan-1140x570.jpg",
    modules: {
      khasiat: "Kencur memiliki kandungan minyak atsiri (sineol dan asam metil kanil) yang memberikan aroma harum yang khas. Berkhasiat meredakan batuk berdahak, mengatasi masuk angin, menghilangkan pegal linu, serta melegakan tenggorokan.",
      poc: "Formula POC Kulit Bawang Merah & Air Kelapa: Encerkan 500ml POC kulit bawang (kaya ZPT alami/auksin) dengan 12 liter air bersih untuk mempercepat pertumbuhan tunas kencur.",
      aturan: "Siramkan ke area media tumbuh kencur sebanyak 150ml per rumpun tanaman kecil. Lakukan penyiraman setiap 7-10 hari sekali.",
      sejarah: "Menjadi bahan utama ramuan beras kencur, minuman penyegar tradisional yang biasa dijajakan oleh penjual jamu gendong sejak zaman Kerajaan Majapahit untuk memulihkan kebugaran para petani."
    }
  },
  {
    id: 6,
    name: "Lengkuas",
    latinName: "Alpinia galanga",
    type: "toga",
    image: "https://r2media.ciputrahospital.com/2026/01/11080725/Manfaat-Lengkuas-1024x683.jpg",
    modules: {
      khasiat: "Mengandung senyawa galangin, beta-sitosterol, dan flavonoid. Berguna sebagai antijamur alami (mengobati penyakit kulit seperti panu), meredakan diare, serta mencegah infeksi bakteri patogen dalam tubuh.",
      poc: "Formula POC Jerami & Kompos Daun Bambu: Campurkan 1 liter POC jerami (kaya silika) dengan 15 liter air bersih. Berguna mengokohkan batang lengkuas agar tumbuh tegak dan tidak mudah rebah.",
      aturan: "Kocor langsung di sekeliling rumpun lengkuas sebanyak 350ml per rumpun dewasa. Aplikasikan setiap 2 minggu sekali.",
      sejarah: "Lengkuas tercatat dalam sejarah rempah dunia sebagai komoditas ekspor berharga tinggi yang diperdagangkan dari pelabuhan Nusantara hingga ke Timur Tengah dan Eropa abad pertengahan."
    }
  },
  {
    id: 7,
    name: "Sambiloto",
    latinName: "Andrographis paniculata",
    type: "toga",
    image: "https://cnc-magazine.oramiland.com/parenting/images/suplemen_daun_sambiloto.width-800.format-webp.webp",
    modules: {
      khasiat: "Sambiloto dikenal sebagai 'Raja Pahit' yang sangat efektif menurunkan demam (antipiretik), meredakan peradangan tenggorokan, meningkatkan sistem imun, serta menstabilkan kadar gula darah.",
      poc: "Formula POC Berbasis Daun Kelor: Campurkan 1 liter POC kelor yang tinggi asam amino dengan 12 liter air untuk merangsang kekebalan alami daun sambiloto dari serangan hama ulat daun.",
      aturan: "Siramkan ke tanah perakaran sambiloto sebanyak 200ml per tanaman setiap 10 hari sekali pada sore hari.",
      sejarah: "Sambiloto telah lama tercatat dalam sistem pengobatan tradisional Ayurveda India dan jamu Nusantara sebagai tanaman pertahanan utama saat terjadi wabah demam musiman."
    }
  },
  {
    id: 8,
    name: "Kumis Kucing",
    latinName: "Orthosiphon aristatus",
    type: "toga",
    image: "https://akcdn.detik.net.id/community/media/visual/2019/07/12/04f04fa3-0bd6-4be6-a202-319a985df583_43.jpeg?w=700&q=90",
    modules: {
      khasiat: "Memiliki sifat diuretik alami yang kuat. Sangat membantu melancarkan pembuangan air kecil, meluruhkan batu ginjal, meredakan gejala asam urat, serta menurunkan tekanan darah tinggi.",
      poc: "Formula POC Cangkang Telur & Kompos: Campurkan 1 liter air rendaman cangkang telur fermentasi (tinggi kalsium) dengan 15 liter air bersih untuk memperkuat struktur batang kumis kucing.",
      aturan: "Siramkan 250ml per rumpun tanaman. Hindari kondisi tanah yang terlalu tergenang air. Lakukan rutin setiap 1 minggu sekali pada pagi hari.",
      sejarah: "Berasal dari wilayah Asia Tenggara, tanaman ini dijuluki 'Java Tea' oleh para penjajah Belanda yang mengekspornya ke Eropa sebagai obat herbal saluran kemih sejak abad ke-18."
    }
  },
  {
    id: 9,
    name: "Daun Sirih",
    latinName: "Piper betle",
    type: "toga",
    image: "https://mentengfarma.com/cdn/shop/articles/089444400_1706924920-shutterstock_2312516329.jpg?v=1738056722",
    modules: {
      khasiat: "Memiliki sifat diuretik alami yang kuat. Sangat membantu melancarkan pembuangan air kecil, meluruhkan batu ginjal, meredakan gejala asam urat, serta menurunkan tekanan darah tinggi.",
      poc: "Formula POC Cangkang Telur & Kompos: Campurkan 1 liter air rendaman cangkang telur fermentasi (tinggi kalsium) dengan 15 liter air bersih untuk memperkuat struktur batang kumis kucing.",
      aturan: "Siramkan 250ml per rumpun tanaman. Hindari kondisi tanah yang terlalu tergenang air. Lakukan rutin setiap 1 minggu sekali pada pagi hari.",
      sejarah: "Berasal dari wilayah Asia Tenggara, tanaman ini dijuluki 'Java Tea' oleh para penjajah Belanda yang mengekspornya ke Eropa sebagai obat herbal saluran kemih sejak abad ke-18."
    }
  },
  {
    id: 10,
    name: "Sereh",
    latinName: "Cymbopogon nardus",
    type: "toga",
    image: "https://puskesmasmeninting-dikes.lombokbaratkab.go.id/media/crop/2025/03/12/57-20250312-133446-273518.jpg",
    modules: {
      khasiat: "Memiliki sifat diuretik alami yang kuat. Sangat membantu melancarkan pembuangan air kecil, meluruhkan batu ginjal, meredakan gejala asam urat, serta menurunkan tekanan darah tinggi.",
      poc: "Formula POC Cangkang Telur & Kompos: Campurkan 1 liter air rendaman cangkang telur fermentasi (tinggi kalsium) dengan 15 liter air bersih untuk memperkuat struktur batang kumis kucing.",
      aturan: "Siramkan 250ml per rumpun tanaman. Hindari kondisi tanah yang terlalu tergenang air. Lakukan rutin setiap 1 minggu sekali pada pagi hari.",
      sejarah: "Berasal dari wilayah Asia Tenggara, tanaman ini dijuluki 'Java Tea' oleh para penjajah Belanda yang mengekspornya ke Eropa sebagai obat herbal saluran kemih sejak abad ke-18."
    }
  }
];

function ProtectedRoute({ token, children }) {
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function Navbar({ token, user, logout }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="w-full h-24 flex items-center justify-between px-8 max-w-7xl mx-auto z-40 relative bg-transparent font-sans">
      {/* Left Logo */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
        <img src={togaLogo} alt="TOGA Logo" className="w-5 h-5 object-contain" />
        <span className="font-sans font-bold text-[19px] tracking-tight text-[#111827]">TOGA Berdaya</span>
      </div>

      {/* Center Menu Links */}
      <nav className="hidden lg:flex items-center gap-10 text-[13px] font-medium text-[#4B5563] tracking-wide">
        <NavLink 
          to="/katalog" 
          className={({ isActive }) => 
            `transition-all duration-200 uppercase tracking-wider font-mono text-[11px] relative py-1 ` +
            (isActive 
              ? 'text-[#111827] font-bold after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-[#1E6BFF] after:rounded-full' 
              : 'text-[#4B5563] font-normal hover:text-[#111827]')
          }
        >
          Katalog
        </NavLink>

        <NavLink 
          to="/users" 
          className={({ isActive }) => 
            `transition-all duration-200 uppercase tracking-wider font-mono text-[11px] relative py-1 ` +
            (isActive 
              ? 'text-[#111827] font-bold after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-[#1E6BFF] after:rounded-full' 
              : 'text-[#4B5563] font-normal hover:text-[#111827]')
          }
        >
          Pengguna
        </NavLink>

        <NavLink 
          to="/#monitoring" 
          className={({ isActive }) => 
            `transition-all duration-200 uppercase tracking-wider font-mono text-[11px] relative py-1 flex items-center gap-0.5 ` +
            (isActive && location.hash === '#monitoring'
              ? 'text-[#111827] font-bold after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-[#1E6BFF] after:rounded-full' 
              : 'text-[#4B5563] font-normal hover:text-[#111827]')
          }
        >
          Monitoring
          <span className="text-[10px] text-[#1E6BFF] font-semibold align-super -mt-2 font-mono">(26)</span>
        </NavLink>
      </nav>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1.5 text-[11px] font-bold font-mono tracking-wider">
          <span className="text-[#111827] cursor-pointer hover:opacity-80">EN</span>
          <span className="text-gray-300">|</span>
          <span className="text-[#111827] cursor-pointer hover:opacity-80">ID</span>
        </div>
        {token && user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#F3F4F6] px-3.5 py-1.5 rounded-[28px] border border-gray-200 shadow-sm">
              <Shield className="w-3.5 h-3.5 text-[#1E6BFF]" />
              <span className="text-[11px] font-bold text-[#111827] font-mono tracking-tight uppercase">
                {user.username} ({user.role})
              </span>
            </div>
            <button 
              onClick={logout}
              className="rounded-[28px] bg-[#10151C] text-white px-[22px] py-2.5 text-xs font-semibold hover:bg-red-600 transition-all duration-300 shadow-sm active:scale-95 flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" /> Keluar
            </button>
          </div>
        ) : (
          <Link to="/login" className="rounded-[28px] bg-[#10151C] text-white px-[22px] py-2.5 text-xs font-semibold hover:bg-[#1E6BFF] transition-all duration-300 shadow-sm active:scale-95 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" /> Login
          </Link>
        )}
      </div>
    </header>
  );
}

function LandingPage({ token, user, logout }) {
  return (
    <div className="bg-[#FBFCF8] text-[#111827] min-h-screen flex flex-col justify-between relative overflow-hidden select-none">
      
      {/* Decorative Top Accent Line */}
      <div className="h-[3px] bg-gradient-to-r from-[#1E6BFF] via-[#14B8A6] to-[#1E6BFF] w-full z-50 absolute top-0 left-0" />

      {/* Shared Navbar */}
      <Navbar token={token} user={user} logout={logout} />

      {/* HERO SECTION (Split Grid 2 Kolom, Scaled Up for Large Displays) */}
      <section className="w-full max-w-[90%] xl:max-w-[85%] mx-auto flex-grow flex items-center z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center w-full py-12 lg:py-0">
          
          {/* KOLOM KIRI (Typography Raksasa & Actions) */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            <h1 className="font-sans text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-[0.9] text-[#111827]">
              <span className="bg-gradient-to-r from-[#1E6BFF] via-[#2d7fff] to-[#14B8A6] bg-clip-text text-transparent font-semibold">Digital</span> <br />
              Knowledge Base for Kelurahan Tingkir Lor
            </h1>
            
            <p className="mt-8 text-base md:text-[17px] text-[#4B5563] max-w-xl leading-relaxed font-normal">
              Sebuah ekosistem digitalisasi Tanaman Obat Keluarga (TOGA) hasil kolaborasi lintas disiplin tim KKN Universitas Diponegoro untuk memberdayakan warga Tingkir Lor dalam kemandirian herba dan integrasi pengetahuan botani.
            </p>

            <div className="mt-10 flex items-center gap-5">
              <Link to="/katalog" className="bg-gradient-to-r from-[#1E6BFF] to-[#14B8A6] text-white font-semibold px-8 py-4 rounded-lg text-xs font-mono uppercase tracking-wider transition-all shadow-md shadow-primary/20 hover:opacity-95 active:scale-95 inline-flex items-center">
                Jelajahi Katalog
              </Link>
              <button className="bg-[#10151C] hover:bg-[#1E6BFF] text-white font-semibold px-8 py-4 rounded-lg text-xs font-mono uppercase tracking-wider transition-all shadow-md active:scale-95">
                Agenda Monitoring
              </button>
            </div>
          </div>

          {/* KOLOM KANAN (Scale Up Floating Cards & Expanded Avatars) */}
          <div className="lg:col-span-7 relative flex justify-end items-center h-[600px] lg:h-[680px] z-10 select-none pr-8">
            {/* Expanded background glow */}
            <div className="w-[650px] h-[650px] bg-gradient-to-tr from-[#1E6BFF]/5 via-[#14B8A6]/5 to-transparent rounded-full blur-[130px] absolute -right-16 -top-16 -z-10 pointer-events-none" />

            {/* CARD STACK COMPOSITION (Scaled Up 1.3x) */}
            <div className="relative w-[520px] h-[330px] mr-16">
              
              {/* CARD 1: Glowing Blue Gradient Card (Tilted left, resized) */}
              <div className="absolute top-[-40px] left-[-40px] w-[520px] h-[330px] rounded-[22px] bg-gradient-to-r from-[#1E6BFF] to-[#14B8A6] text-white p-8 shadow-2xl rotate-[-8deg] border border-white/10 flex flex-col justify-between z-10 transition-transform duration-500 hover:scale-102">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-white/70">Toga Digital Register</p>
                    <h3 className="text-base font-semibold tracking-wide mt-0.5">Zingiber officinale</h3>
                  </div>
                  <Cpu className="w-6 h-6 text-white/80" />
                </div>
                
                <div className="font-mono text-2xl tracking-widest my-3 select-all text-white/95">
                  Pelan-Pelan Pak Supir
                </div>

                <div className="flex justify-between items-end text-sm">
                  <div>
                    <span className="text-[9px] uppercase text-white/60 block font-mono">Botanist</span>
                    <span className="font-medium text-sm">Tim KKN Undip</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-white/60 block font-mono">Family</span>
                    <span className="font-medium text-sm">Zingiberaceae</span>
                  </div>
                </div>
              </div>

              {/* CARD 2: Dark Charcoal Card (Tilted right, resized, overlays card 1) */}
              <div className="absolute top-[60px] right-[-40px] w-[520px] h-[330px] rounded-[22px] bg-[#10151C] text-white p-8 shadow-2xl rotate-[6deg] border border-[#1C2531] overflow-hidden flex flex-col justify-between z-20 transition-transform duration-500 hover:scale-102">
                {/* Botanical Image Overlay */}
                <div className="absolute inset-0 opacity-[0.24] pointer-events-none mix-blend-luminosity">
                  <img 
                    src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=600" 
                    alt="Herb background" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-white/50">Bedeng Data Archive</p>
                    <h3 className="text-base font-semibold tracking-wide mt-0.5">Kelurahan Tingkir Lor</h3>
                  </div>
                  <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                  </div>
                </div>
                
                <div className="relative z-10 font-mono text-2xl tracking-widest my-3 text-white/90">
                  01286 01285 47219 47722
                </div>

                <div className="relative z-10 flex justify-between items-end text-sm">
                  <div>
                    <span className="text-[9px] uppercase text-white/40 block font-mono">Universitas Diponegoro</span>
                    <span className="font-medium text-white/80">KKN-R-II-2026-TINGKIR-LOR</span>
                  </div>
                  {/* Mastercard/Visa circle mockup: Auralis overlapping color circles */}
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-[#1E6BFF] opacity-95" />
                    <div className="w-8 h-8 rounded-full bg-[#14B8A6] opacity-95" />
                  </div>
                </div>
              </div>

              {/* FLOATING AVATARS COMPOSITION (KKN MEMBERS WITH ACADEMIC ROLES - Expanded Offsets) */}
              
              {/* 1. Allya (Bioteknologi) - Top Left of Card 1 */}
              <div className="absolute top-[-110px] left-[-90px] flex items-center gap-2.5 bg-white rounded-full pl-2.5 pr-4.5 py-1.5 shadow-xl border border-gray-100/80 z-30 transform hover:scale-105 transition-transform duration-300">
                <img 
                  src={allyaImg} 
                  alt="Allya" 
                  className="w-7 h-7 rounded-full object-cover border border-gray-155" 
                />
                <div className="text-left leading-tight">
                  <div className="text-[11px] font-bold text-[#111827]">Allya</div>
                  <div className="text-[9px] font-bold text-[#14B8A6] font-mono">Bioteknologi</div>
                </div>
              </div>

              {/* 2. Nicholas (Teknik Komputer) - Right of Card 1 */}
              <div className="absolute top-[0px] right-[-170px] flex items-center gap-2.5 bg-white rounded-full pl-2.5 pr-4.5 py-1.5 shadow-xl border border-gray-100/80 z-30 transform hover:scale-105 transition-transform duration-300">
                <img 
                  src={nicholasImg} 
                  alt="Nicholas" 
                  className="w-7 h-7 rounded-full object-cover border border-gray-155" 
                />
                <div className="text-left leading-tight">
                  <div className="text-[11px] font-bold text-[#111827]">Nicholas</div>
                  <div className="text-[9px] font-bold text-[#14B8A6] font-mono">Teknik Komputer</div>
                </div>
              </div>

              {/* 3. Revina (Teknologi Pangan) - Left Middle */}
              <div className="absolute top-[110px] left-[-180px] flex items-center gap-2.5 bg-white rounded-full pl-2.5 pr-4.5 py-1.5 shadow-xl border border-gray-100/80 z-30 transform hover:scale-105 transition-transform duration-300">
                <img 
                  src={revinaImg} 
                  alt="Revina" 
                  className="w-7 h-7 rounded-full object-cover border border-gray-155" 
                />
                <div className="text-left leading-tight">
                  <div className="text-[11px] font-bold text-[#111827]">Revina</div>
                  <div className="text-[9px] font-bold text-[#14B8A6] font-mono">Teknologi Pangan</div>
                </div>
              </div>

              {/* 4. Ayun (Keperawatan) - Left side of Card 2 */}
              <div className="absolute top-[230px] left-[-80px] flex items-center gap-2.5 bg-white rounded-full pl-2.5 pr-4.5 py-1.5 shadow-xl border border-gray-100/80 z-30 transform hover:scale-105 transition-transform duration-300">
                <img 
                  src={ayunImg} 
                  alt="Ayun" 
                  className="w-7 h-7 rounded-full object-cover border border-gray-155" 
                />
                <div className="text-left leading-tight">
                  <div className="text-[11px] font-bold text-[#111827]">Ayun</div>
                  <div className="text-[9px] font-bold text-[#14B8A6] font-mono">Keperawatan</div>
                </div>
              </div>

              {/* 5. Radit (Sejarah) - Bottom Right */}
              <div className="absolute bottom-[-130px] right-[-70px] flex items-center gap-2.5 bg-white rounded-full pl-2.5 pr-4.5 py-1.5 shadow-xl border border-gray-100/80 z-30 transform hover:scale-105 transition-transform duration-300">
                <img 
                  src={raditImg} 
                  alt="Radit" 
                  className="w-7 h-7 rounded-full object-cover border border-gray-155" 
                />
                <div className="text-left leading-tight">
                  <div className="text-[11px] font-bold text-[#111827]">Radit</div>
                  <div className="text-[9px] font-bold text-[#14B8A6] font-mono">Sejarah</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full h-20 flex items-center justify-between px-8 max-w-7xl mx-auto z-40 relative border-t border-[#E5E7EB]/50 text-xs text-[#4B5563] font-mono">
        <div className="flex items-center gap-2">
          <Leaf className="w-4 h-4 text-[#14B8A6]" />
          <span>© 2026 KKN Reguler Undip - Kelurahan Tingkir Lor</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hover:text-[#111827] cursor-pointer">Dirajut dengan Hati</span>
          <span className="text-gray-300">|</span>
          <span className="hover:text-[#111827] cursor-pointer">Pelan-Pelan Pak Supir</span>
        </div>
      </footer>

      {/* BOTTOM RIGHT CONTROLS */}
      <div className="fixed bottom-24 right-6 flex flex-col gap-3.5 z-40 select-none">
        <button 
          onClick={() => alert("Menampilkan Peta Lokasi Bedeng RW 1")}
          className="w-11 h-11 rounded-full bg-[#10151C] text-white flex items-center justify-center shadow-lg hover:bg-[#1E6BFF] transition-all hover:scale-105 active:scale-95 border border-white/5"
          title="Peta Bedeng"
        >
          <Compass className="w-5 h-5" />
        </button>
        <button 
          onClick={() => alert("Mengunduh E-Booklet Pengetahuan TOGA")}
          className="w-11 h-11 rounded-full bg-[#10151C] text-white flex items-center justify-center shadow-lg hover:bg-[#1E6BFF] transition-all hover:scale-105 active:scale-95 border border-white/5"
          title="E-Booklet"
        >
          <BookOpen className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}

function LoginPage({ token, user, login }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Forgot Password States
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetUsername, setResetUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const [isSubmittingReset, setIsSubmittingReset] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Rate Limiting / Cooldown States
  const [failedAttempts, setFailedAttempts] = useState(() => {
    return parseInt(localStorage.getItem('failed_attempts') || '0', 10);
  });
  const [cooldownTimeLeft, setCooldownTimeLeft] = useState(0);

  useEffect(() => {
    const checkCooldown = () => {
      const cooldownUntilStr = localStorage.getItem('cooldown_until');
      if (cooldownUntilStr) {
        const cooldownUntil = parseInt(cooldownUntilStr, 10);
        const now = Date.now();
        if (cooldownUntil > now) {
          const secondsLeft = Math.ceil((cooldownUntil - now) / 1000);
          setCooldownTimeLeft(secondsLeft);
        } else {
          localStorage.removeItem('cooldown_until');
          setFailedAttempts(0);
          localStorage.setItem('failed_attempts', '0');
          setCooldownTimeLeft(0);
        }
      }
    };

    checkCooldown();

    let intervalId = setInterval(() => {
      const cooldownUntilStr = localStorage.getItem('cooldown_until');
      if (cooldownUntilStr) {
        const cooldownUntil = parseInt(cooldownUntilStr, 10);
        const now = Date.now();
        if (cooldownUntil > now) {
          const secondsLeft = Math.ceil((cooldownUntil - now) / 1000);
          setCooldownTimeLeft(secondsLeft);
        } else {
          localStorage.removeItem('cooldown_until');
          setFailedAttempts(0);
          localStorage.setItem('failed_attempts', '0');
          setCooldownTimeLeft(0);
          clearInterval(intervalId);
        }
      } else {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [failedAttempts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cooldownTimeLeft > 0) return;
    if (!username.trim() || !password.trim()) return;

    setError('');
    setIsSubmitting(true);
    try {
      await login(username, password);
      // Reset failed attempts on success
      setFailedAttempts(0);
      localStorage.setItem('failed_attempts', '0');
      navigate('/');
    } catch (err) {
      console.error("Login error details:", err);
      
      const nextAttempts = failedAttempts + 1;
      setFailedAttempts(nextAttempts);
      localStorage.setItem('failed_attempts', nextAttempts.toString());

      if (nextAttempts >= 5) {
        const cooldownDuration = 30 * 1000; // 30 seconds
        const cooldownUntil = Date.now() + cooldownDuration;
        localStorage.setItem('cooldown_until', cooldownUntil.toString());
        setCooldownTimeLeft(30);
        setError("Terlalu banyak percobaan login gagal. Form dikunci sementara!");
      } else {
        if (err.message === 'Failed to fetch' || err.message.includes('fetch') || err.message.includes('Load failed')) {
          setError("Username atau Password salah.");
        } else {
          setError(`${err.message || 'Login gagal. Periksa kembali username dan password Anda.'} (Sisa percobaan: ${5 - nextAttempts})`);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (!resetUsername.trim() || !newPassword.trim() || !confirmPassword.trim()) return;

    setResetError('');
    setResetSuccess('');

    if (newPassword !== confirmPassword) {
      setResetError("Konfirmasi password tidak cocok!");
      return;
    }

    setIsSubmittingReset(true);
    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: resetUsername,
          new_password: newPassword
        })
      });

      if (response.ok) {
        setResetSuccess("Password berhasil diubah! Silakan kembali ke halaman login.");
        setResetUsername('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        const errData = await response.json().catch(() => ({}));
        setResetError(errData.detail || "Gagal mengubah password.");
      }
    } catch (err) {
      console.error("Reset password error:", err);
      setResetError("Koneksi gagal. Server backend FastAPI offline.");
    } finally {
      setIsSubmittingReset(false);
    }
  };

  if (token && user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-[#FBFCF8] text-[#111827] min-h-screen flex flex-col justify-between relative overflow-hidden select-none">
      
      {/* Decorative Top Accent Line */}
      <div className="h-[3px] bg-gradient-to-r from-[#1E6BFF] via-[#14B8A6] to-[#1E6BFF] w-full z-50 absolute top-0 left-0" />

      {/* Decorative Glows */}
      <div className="w-[600px] h-[600px] bg-gradient-to-tr from-[#1E6BFF]/5 via-[#14B8A6]/5 to-transparent rounded-full blur-[120px] absolute -right-24 -top-24 -z-10 pointer-events-none" />
      <div className="w-[600px] h-[600px] bg-gradient-to-bl from-[#14B8A6]/5 via-[#1E6BFF]/5 to-transparent rounded-full blur-[120px] absolute -left-24 -bottom-24 -z-10 pointer-events-none" />

      {/* NAVIGATION BAR */}
      <header className="w-full h-24 flex items-center justify-between px-8 max-w-7xl mx-auto z-40 relative">
        <div className="flex items-center gap-3">
          <img src={togaLogo} alt="TOGA Logo" className="w-5 h-5 object-contain" />
          <span className="font-sans font-bold text-[19px] tracking-tight text-[#111827]">TOGA Berdaya</span>
        </div>
      </header>

      {/* CENTER CARD CONTAINER */}
      <main className="flex-grow flex items-center justify-center px-6 z-10 relative">
        <div className="w-full max-w-[420px] bg-white border border-[#E5E7EB] rounded-[5px] p-8 md:p-10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] animate-in fade-in zoom-in-95 duration-355 ease-out">
          
          {isForgotPassword ? (
            <>
              {/* Back to Login Button */}
              <button 
                type="button"
                onClick={() => {
                  setIsForgotPassword(false);
                  setResetError('');
                  setResetSuccess('');
                }}
                className="text-xs font-semibold text-[#4B5563] hover:text-[#1E6BFF] transition-colors duration-200 flex items-center gap-1.5 mb-6 w-fit"
              >
                ← Kembali ke Login
              </button>

              {/* Sub-headline */}
              <p className="text-[11px] font-bold text-[#6B7280] tracking-wider uppercase mb-1.5 font-sans">
                Reset your credentials
              </p>

              {/* Headline */}
              <h2 className="text-3xl font-bold tracking-tight text-[#111827] mb-7 font-sans">
                Forgot password
              </h2>

              {resetError && (
                <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-600 rounded-[5px] text-xs font-semibold font-sans">
                  {resetError}
                </div>
              )}

              {resetSuccess && (
                <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-[5px] text-xs font-semibold font-sans">
                  {resetSuccess}
                </div>
              )}

              {/* Reset Password Form */}
              <form onSubmit={handleResetSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-2 tracking-wide uppercase">
                    Username
                  </label>
                  <input 
                    type="text" 
                    value={resetUsername}
                    onChange={(e) => setResetUsername(e.target.value)}
                    placeholder="Masukkan username Anda"
                    required
                    disabled={isSubmittingReset}
                    className="w-full px-3.5 py-3 border border-[#D1D5DB] rounded-[5px] text-sm bg-white text-[#111827] focus:outline-none focus:border-[#1E6BFF] focus:ring-1 focus:ring-[#1E6BFF] transition-colors duration-200 placeholder:text-gray-400 font-sans font-normal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-2 tracking-wide uppercase">
                    New Password
                  </label>
                  <div className="relative">
                    <input 
                      type={showNewPassword ? "text" : "password"} 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min. 6 karakter"
                      required
                      disabled={isSubmittingReset}
                      className="w-full pl-3.5 pr-10 py-3 border border-[#D1D5DB] rounded-[5px] text-sm bg-white text-[#111827] focus:outline-none focus:border-[#1E6BFF] focus:ring-1 focus:ring-[#1E6BFF] transition-colors duration-200 placeholder:text-gray-400 font-sans font-normal"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#4B5563] hover:text-[#111827] transition-colors duration-150 focus:outline-none flex items-center justify-center"
                    >
                      {showNewPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-2 tracking-wide uppercase">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input 
                      type={showConfirmPassword ? "text" : "password"} 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Ulangi password baru"
                      required
                      disabled={isSubmittingReset}
                      className="w-full pl-3.5 pr-10 py-3 border border-[#D1D5DB] rounded-[5px] text-sm bg-white text-[#111827] focus:outline-none focus:border-[#1E6BFF] focus:ring-1 focus:ring-[#1E6BFF] transition-colors duration-200 placeholder:text-gray-400 font-sans font-normal"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#4B5563] hover:text-[#111827] transition-colors duration-150 focus:outline-none flex items-center justify-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={isSubmittingReset}
                  className="w-full bg-[#1E6BFF] hover:bg-[#1a5cd4] text-white text-sm font-semibold py-3.5 rounded-[5px] transition-all duration-200 mt-6 shadow-md hover:shadow-lg active:scale-[0.98] disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmittingReset ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            </>
          ) : (
            <>
              {/* Back to Home Button */}
              <Link 
                to="/" 
                className="text-xs font-semibold text-[#4B5563] hover:text-[#1E6BFF] transition-colors duration-200 flex items-center gap-1.5 mb-6 w-fit"
              >
                ← Back to Home
              </Link>

              {/* Sub-headline */}
              <p className="text-[11px] font-bold text-[#6B7280] tracking-wider uppercase mb-1.5 font-sans">
                Please enter your details
              </p>

              {/* Headline */}
              <h2 className="text-3xl font-bold tracking-tight text-[#111827] mb-7 font-sans">
                Welcome back
              </h2>

              {error && (
                <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-600 rounded-[5px] text-xs font-semibold font-sans">
                  {error}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-2 tracking-wide uppercase">
                    Username
                  </label>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter (e.g. admin_kkn or staff_kkn)"
                    required
                    disabled={isSubmitting || cooldownTimeLeft > 0}
                    className="w-full px-3.5 py-3 border border-[#D1D5DB] rounded-[5px] text-sm bg-white text-[#111827] focus:outline-none focus:border-[#1E6BFF] focus:ring-1 focus:ring-[#1E6BFF] transition-colors duration-200 placeholder:text-gray-400 font-sans font-normal disabled:bg-gray-150 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-2 tracking-wide uppercase">
                    Password
                  </label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      disabled={isSubmitting || cooldownTimeLeft > 0}
                      className="w-full pl-3.5 pr-10 py-3 border border-[#D1D5DB] rounded-[5px] text-sm bg-white text-[#111827] focus:outline-none focus:border-[#1E6BFF] focus:ring-1 focus:ring-[#1E6BFF] transition-colors duration-200 placeholder:text-gray-400 font-sans font-normal disabled:bg-gray-150 disabled:cursor-not-allowed"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={cooldownTimeLeft > 0}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#4B5563] hover:text-[#111827] transition-colors duration-150 focus:outline-none flex items-center justify-center disabled:opacity-40"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Checkbox & Forgot Password */}
                <div className="flex items-center justify-between text-xs font-semibold text-[#4B5563] pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      className="rounded-[3px] border-[#D1D5DB] text-[#1E6BFF] focus:ring-[#1E6BFF] focus:ring-offset-0 w-4 h-4 cursor-pointer accent-[#1E6BFF]"
                    />
                    <span>Remember for 30 days</span>
                  </label>
                  <button 
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(true);
                      setError('');
                    }}
                    className="text-[#1E6BFF] hover:underline hover:opacity-90 transition-all font-semibold cursor-pointer"
                  >
                    Forgot password
                  </button>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={isSubmitting || cooldownTimeLeft > 0}
                  className="w-full bg-[#1E6BFF] hover:bg-[#1a5cd4] text-white text-sm font-semibold py-3.5 rounded-[5px] transition-all duration-200 mt-6 shadow-md hover:shadow-lg active:scale-[0.98] disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {cooldownTimeLeft > 0 
                    ? `Coba lagi dalam ${cooldownTimeLeft} detik` 
                    : (isSubmitting ? 'Signing in...' : 'Sign in')}
                </button>
              </form>
            </>
          )}

        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full h-20 flex items-center justify-between px-8 max-w-7xl mx-auto z-40 relative border-t border-[#E5E7EB]/50 text-xs text-[#4B5563] font-mono">
        <div className="flex items-center gap-2">
          <Leaf className="w-4 h-4 text-[#14B8A6]" />
          <span>© 2026 KKN Reguler Undip - Kelurahan Tingkir Lor</span>
        </div>
      </footer>

    </div>
  );
}

function UsersPage({ token, user, logout }) {
  const [users, setUsers] = useState([]);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '', role: 'staff' });
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit Staff Account States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({ username: '', password: '' });
  const [editFormError, setEditFormError] = useState('');
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);

  const fetchUsers = async () => {
    setIsTableLoading(true);
    setFetchError('');
    try {
      const response = await fetch(`${API_URL}/auth/users`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        const errData = await response.json().catch(() => ({}));
        setFetchError(errData.detail || 'Gagal memuat daftar pengguna.');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setFetchError('Koneksi API terputus. Backend sedang offline atau server tidak merespon.');
    } finally {
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const handleAddClick = () => {
    setFormData({ username: '', password: '', role: 'staff' });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username.trim() || !formData.password.trim()) return;

    setIsSubmitting(true);
    setFormError('');
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          role: formData.role
        })
      });

      if (response.ok) {
        setIsModalOpen(false);
        fetchUsers();
      } else {
        const errData = await response.json().catch(() => ({}));
        setFormError(errData.detail || 'Gagal membuat pengguna baru. Username mungkin sudah digunakan.');
      }
    } catch (err) {
      console.error('Error creating user:', err);
      setFormError('Koneksi API terputus. Server offline.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleActionWarning = () => {
    alert("Operasi Hapus user dinonaktifkan di backend untuk menjaga integrasi database utama.");
  };

  const handleEditClick = (targetUser) => {
    setEditingUser(targetUser);
    setEditFormData({ username: targetUser.username, password: '' });
    setEditFormError('');
    setIsEditModalOpen(true);
  };

  const handleEditModalSubmit = async (e) => {
    e.preventDefault();
    if (!editFormData.username.trim()) return;
    if (isSubmittingEdit) return;

    setIsSubmittingEdit(true);
    setEditFormError('');

    const payload = {
      username: editFormData.username
    };
    if (editFormData.password.trim()) {
      payload.password = editFormData.password;
    }

    try {
      const response = await fetch(`${API_URL}/auth/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setIsEditModalOpen(false);
        fetchUsers();
      } else {
        const errData = await response.json().catch(() => ({}));
        setEditFormError(errData.detail || 'Gagal memperbarui pengguna staff.');
      }
    } catch (err) {
      console.error('Error updating user:', err);
      setEditFormError('Koneksi API terputus. Server offline.');
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  // Helper to map creator IDs to usernames for visual display
  const getCreatorUsername = (createdById) => {
    if (!createdById) return 'System';
    const creator = users.find(u => u.id === createdById);
    return creator ? creator.username : `ID: ${createdById}`;
  };

  // Calculate paginated users
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-[#FBFCF8] text-[#111827] min-h-screen flex flex-col justify-between relative overflow-hidden select-none font-sans">
      
      {/* Decorative Top Accent Line */}
      <div className="h-[3px] bg-gradient-to-r from-[#1E6BFF] via-[#14B8A6] to-[#1E6BFF] w-full z-50 absolute top-0 left-0" />

      {/* Decorative Glows */}
      <div className="w-[600px] h-[600px] bg-gradient-to-tr from-[#1E6BFF]/5 via-[#14B8A6]/5 to-transparent rounded-full blur-[120px] absolute -right-24 -top-24 -z-10 pointer-events-none" />
      <div className="w-[600px] h-[600px] bg-gradient-to-bl from-[#14B8A6]/5 via-[#1E6BFF]/5 to-transparent rounded-full blur-[120px] absolute -left-24 -bottom-24 -z-10 pointer-events-none" />

      {/* Shared Navbar */}
      <Navbar token={token} user={user} logout={logout} />

      {/* DASHBOARD CONTENT */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-8 py-10 z-10 relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#111827] font-sans">
              Manajemen Pengguna
            </h1>
            <p className="text-sm text-[#4B5563] mt-1.5">
              Daftar pengguna terdaftar di sistem TOGA Berdaya dengan tingkat izin akses yang berbeda.
            </p>
          </div>

          {/* RBAC Top Bar Action */}
          <div>
            {user?.role === 'admin' ? (
              <button 
                onClick={handleAddClick}
                className="bg-[#1E6BFF] hover:bg-[#1a5cd4] text-white px-5 py-3 rounded-[5px] text-xs font-semibold transition-all duration-200 shadow-sm active:scale-95 flex items-center gap-1.5 animate-in fade-in slide-in-from-right-4 duration-300"
              >
                <Plus className="w-4 h-4" /> Tambah Pengguna Baru
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-[#FBFCF8] border border-[#E5E7EB] px-4 py-2.5 rounded-[5px]">
                <Lock className="w-3.5 h-3.5 text-[#6B7280]" />
                <span className="text-xs font-bold text-[#6B7280] font-mono uppercase tracking-wider">Mode Lihat-Saja (Staff)</span>
              </div>
            )}
          </div>
        </div>

        {fetchError && (
          <div className="mb-5 p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-[5px] text-xs font-semibold font-sans">
            {fetchError}
          </div>
        )}

        {/* USERS TABLE */}
        <div className="w-full overflow-x-auto border border-[#E5E7EB] bg-white rounded-[5px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]">
          {isTableLoading ? (
            <div className="p-12 flex flex-col items-center justify-center gap-2 bg-white rounded-[5px]">
              <div className="w-6 h-6 border-2 border-t-[#1E6BFF] border-gray-150 rounded-full animate-spin" />
              <span className="text-xs font-mono text-[#6B7280]">Memuat tabel pengguna...</span>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FBFCF8] border-b border-[#E5E7EB] text-[11px] font-bold text-[#6B7280] uppercase tracking-wider font-mono">
                  <th className="px-6 py-4">Username</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Dibuat Oleh</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB] font-sans">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-xs text-[#6B7280] font-mono">
                      Tidak ada data pengguna.
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map((item) => (
                    <tr key={item.id} className="hover:bg-[#FBFCF8]/60 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-[#111827]">{item.username}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-[3px] text-[10px] font-bold font-mono border uppercase tracking-wider ${
                          item.role === 'admin' 
                            ? 'bg-blue-50 text-[#1E6BFF] border-blue-100' 
                            : 'bg-teal-50 text-[#14B8A6] border-teal-100'
                        }`}>
                          {item.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#4B5563] font-mono">{getCreatorUsername(item.created_by)}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {user?.role === 'admin' && item.role === 'staff' ? (
                            <button 
                              onClick={() => handleEditClick(item)}
                              className="p-1.5 rounded transition-all text-[#4B5563] hover:text-[#1E6BFF] hover:bg-blue-50"
                              title="Edit Pengguna Staff"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                          ) : (
                            <button 
                              disabled
                              className="p-1.5 rounded transition-all text-gray-300 cursor-not-allowed opacity-40"
                              title="Akses Dibatasi"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                          )}
                          <button 
                            onClick={handleActionWarning}
                            disabled={user?.role === 'staff'}
                            className={`p-1.5 rounded transition-all ${
                              user?.role === 'staff' 
                                ? 'text-gray-300 cursor-not-allowed opacity-40' 
                                : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                            }`}
                            title={user?.role === 'staff' ? "Akses Dibatasi (View-Only)" : "Hapus Pengguna"}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Users Pagination Controls */}
        {!isTableLoading && totalPages > 1 && (
          <div className="flex items-center justify-between mt-5 bg-white border border-[#E5E7EB] px-4 py-3.5 rounded-[5px] shadow-[0_2px_8px_rgba(0,0,0,0.01)] animate-in fade-in duration-200">
            <div className="text-xs text-[#4B5563] font-mono">
              Menampilkan <span className="font-bold text-[#111827]">{Math.min(users.length, (currentPage - 1) * itemsPerPage + 1)}</span> - <span className="font-bold text-[#111827]">{Math.min(users.length, currentPage * itemsPerPage)}</span> dari <span className="font-bold text-[#111827]">{users.length}</span> Pengguna
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 border border-[#E5E7EB] text-xs font-semibold rounded-[3px] text-[#4B5563] bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all uppercase tracking-wider font-mono"
              >
                Sebelumnya
              </button>
              <span className="text-xs font-bold text-[#111827] font-mono px-3">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 border border-[#E5E7EB] text-xs font-semibold rounded-[3px] text-[#4B5563] bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all uppercase tracking-wider font-mono"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="w-full h-20 flex items-center justify-between px-8 max-w-7xl mx-auto z-40 relative border-t border-[#E5E7EB]/50 text-xs text-[#4B5563] font-mono">
        <div className="flex items-center gap-2">
          <Leaf className="w-4 h-4 text-[#14B8A6]" />
          <span>© 2026 KKN Reguler Undip - Kelurahan Tingkir Lor</span>
        </div>
      </footer>

      {/* ADD MODAL OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#10151C]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-[#E5E7EB] rounded-[5px] w-full max-w-[360px] p-6 shadow-xl animate-in zoom-in-95 duration-200">
            <h3 className="text-base font-bold text-[#111827] mb-4">
              Tambah Pengguna Baru
            </h3>
            
            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-[5px] text-xs font-semibold">
                {formError}
              </div>
            )}

            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-[#4B5563] mb-1.5 uppercase tracking-wider">Username</label>
                <input 
                  type="text" 
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="e.g. staff_kkn"
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 py-2.5 border border-[#D1D5DB] rounded-[5px] text-sm bg-white text-[#111827] focus:outline-none focus:border-[#1E6BFF] focus:ring-1 focus:ring-[#1E6BFF] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#4B5563] mb-1.5 uppercase tracking-wider">Password</label>
                <input 
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Min. 6 karakter"
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 py-2.5 border border-[#D1D5DB] rounded-[5px] text-sm bg-white text-[#111827] focus:outline-none focus:border-[#1E6BFF] focus:ring-1 focus:ring-[#1E6BFF] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#4B5563] mb-1.5 uppercase tracking-wider">Role</label>
                <select 
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full px-3 py-2.5 border border-[#D1D5DB] rounded-[5px] text-sm bg-white text-[#111827] focus:outline-none focus:border-[#1E6BFF] focus:ring-1 focus:ring-[#1E6BFF] transition-colors"
                >
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-[#E5E7EB] text-xs font-semibold text-[#4B5563] rounded-[5px] hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[#1E6BFF] hover:bg-[#1a5cd4] text-white text-xs font-semibold rounded-[5px] transition-colors disabled:bg-gray-400"
                >
                  {isSubmitting ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL OVERLAY */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-[#10151C]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-[#E5E7EB] rounded-[5px] w-full max-w-[360px] p-6 shadow-xl animate-in zoom-in-95 duration-200">
            <h3 className="text-base font-bold text-[#111827] mb-4">
              Edit Akun Staff
            </h3>
            
            {editFormError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-[5px] text-xs font-semibold">
                {editFormError}
              </div>
            )}

            <form onSubmit={handleEditModalSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-[#4B5563] mb-1.5 uppercase tracking-wider font-mono">Username Baru</label>
                <input 
                  type="text" 
                  value={editFormData.username}
                  onChange={(e) => setEditFormData({ ...editFormData, username: e.target.value })}
                  placeholder="e.g. staff_kkn_baru"
                  required
                  disabled={isSubmittingEdit}
                  className="w-full px-3 py-2.5 border border-[#D1D5DB] rounded-[5px] text-sm bg-white text-[#111827] focus:outline-none focus:border-[#1E6BFF] focus:ring-1 focus:ring-[#1E6BFF] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#4B5563] mb-1.5 uppercase tracking-wider font-mono">Password Baru (Kosongkan jika tidak diubah)</label>
                <input 
                  type="password" 
                  value={editFormData.password}
                  onChange={(e) => setEditFormData({ ...editFormData, password: e.target.value })}
                  placeholder="Masukkan password baru"
                  disabled={isSubmittingEdit}
                  className="w-full px-3 py-2.5 border border-[#D1D5DB] rounded-[5px] text-sm bg-white text-[#111827] focus:outline-none focus:border-[#1E6BFF] focus:ring-1 focus:ring-[#1E6BFF] transition-colors"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button 
                  type="button" 
                  onClick={() => setIsEditModalOpen(false)}
                  disabled={isSubmittingEdit}
                  className="px-4 py-2 border border-[#E5E7EB] text-xs font-semibold text-[#4B5563] rounded-[5px] hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmittingEdit}
                  className="px-4 py-2 bg-[#1E6BFF] hover:bg-[#1a5cd4] text-white text-xs font-semibold rounded-[5px] transition-colors disabled:bg-gray-400"
                >
                  {isSubmittingEdit ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

function KatalogPage({ token, user, logout }) {
  const [plants, setPlants] = useState(fallbackPlants);
  const [selectedPlant, setSelectedPlant] = useState(fallbackPlants[0]);
  const [activeTab, setActiveTab] = useState('khasiat'); // 'khasiat', 'poc', 'aturan', 'sejarah'
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination states for plants gallery
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // CRUD States
  const [isCrudModalOpen, setIsCrudModalOpen] = useState(false);
  const [crudMode, setCrudMode] = useState('create'); // 'create' or 'edit'
  const [crudError, setCrudError] = useState('');
  const [isSubmittingCrud, setIsSubmittingCrud] = useState(false);
  const [crudForm, setCrudForm] = useState({
    id: null,
    name: '',
    latinName: '',
    type: 'toga',
    medical_benefit: '',
    historical_funfact: '',
    poc_dosage_guideline: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Revoke the old object URL if any to prevent memory leaks
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const fetchPlants = async () => {
    try {
      const response = await fetch(`${API_URL}/plants`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          const mapped = data.map((item) => {
            const match = fallbackPlants.find(f => f.name.toLowerCase() === item.name.toLowerCase());
            const storedImage = localStorage.getItem(`plant_image_${item.id}`);
            return {
              id: item.id,
              name: item.name,
              latinName: item.latin_name || (match ? match.latinName : "Toga Herbal"),
              type: item.type,
              image: storedImage || (match ? match.image : "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=600"),
              modules: {
                khasiat: item.medical_benefit,
                poc: match ? match.modules.poc : "Formula POC khusus TOGA.",
                aturan: item.poc_dosage_guideline,
                sejarah: item.historical_funfact || "Bagian dari kekayaan botani herbal Kelurahan Tingkir Lor."
              }
            };
          });
          setPlants(mapped);
          setSelectedPlant((prev) => {
            if (prev) {
              const updated = mapped.find(p => p.id === prev.id);
              return updated || mapped[0];
            }
            return mapped[0];
          });
        } else {
          setPlants([]);
          setSelectedPlant(null);
        }
      }
    } catch (err) {
      console.error("API offline, using fallback data:", err);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const handleCloseCrudModal = () => {
    setIsCrudModalOpen(false);
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(null);
    setImagePreview(null);
  };

  const handleAddNewPlant = () => {
    setCrudForm({
      id: null,
      name: '',
      latinName: '',
      type: 'toga',
      medical_benefit: '',
      historical_funfact: '',
      poc_dosage_guideline: ''
    });
    setImageFile(null);
    setImagePreview(null);
    setCrudMode('create');
    setCrudError('');
    setIsCrudModalOpen(true);
  };

  const handleEditPlant = (plant) => {
    setCrudForm({
      id: plant.id,
      name: plant.name,
      latinName: plant.latinName || '',
      type: plant.type || 'toga',
      medical_benefit: plant.modules.khasiat || '',
      historical_funfact: plant.modules.sejarah === "Bagian dari kekayaan botani herbal Kelurahan Tingkir Lor." ? "" : plant.modules.sejarah,
      poc_dosage_guideline: plant.modules.aturan || ''
    });
    setImageFile(null);
    setImagePreview(plant.image || null);
    setCrudMode('edit');
    setCrudError('');
    setIsCrudModalOpen(true);
  };

  const handleDeletePlant = async (plant) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus tanaman ${plant.name}?`)) {
      return;
    }
    try {
      const response = await fetch(`${API_URL}/plants/${plant.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        alert("Tanaman berhasil dihapus");
        await fetchPlants();
      } else {
        const data = await response.json().catch(() => ({}));
        alert(data.detail || "Gagal menghapus tanaman");
      }
    } catch (err) {
      console.error("Error deleting plant:", err);
      alert("Terjadi kesalahan jaringan saat menghapus tanaman");
    }
  };

  const handleSubmitCrud = async (e) => {
    e.preventDefault();
    if (isSubmittingCrud) return;
    setCrudError('');
    setIsSubmittingCrud(true);

    const formData = new FormData();
    formData.append('name', crudForm.name);
    if (crudForm.latinName) {
      formData.append('latin_name', crudForm.latinName);
    }
    formData.append('type', crudForm.type);
    formData.append('medical_benefit', crudForm.medical_benefit);
    formData.append('poc_dosage_guideline', crudForm.poc_dosage_guideline);
    if (crudForm.historical_funfact) {
      formData.append('historical_funfact', crudForm.historical_funfact);
    }
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      let url = `${API_URL}/plants/`;
      let method = 'POST';

      if (crudMode === 'edit') {
        url = `${API_URL}/plants/${crudForm.id}`;
        method = 'PUT';
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const savedPlant = await response.json().catch(() => ({}));
        if (imageFile) {
          const reader = new FileReader();
          reader.onloadend = () => {
            localStorage.setItem(`plant_image_${savedPlant.id || crudForm.id}`, reader.result);
            fetchPlants();
          };
          reader.readAsDataURL(imageFile);
        } else {
          await fetchPlants();
        }
        handleCloseCrudModal();
      } else {
        const data = await response.json().catch(() => ({}));
        setCrudError(data.detail || "Gagal menyimpan perubahan. Koneksi server sibuk, silakan coba beberapa saat lagi.");
      }
    } catch (err) {
      console.error("Error submitting plant:", err);
      setCrudError("Gagal menyimpan perubahan. Koneksi server sibuk, silakan coba beberapa saat lagi.");
    } finally {
      setIsSubmittingCrud(false);
    }
  };

  const handlePlantSelect = (plant) => {
    if (plant.id === selectedPlant.id) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedPlant(plant);
      setIsTransitioning(false);
    }, 250);
  };

  const tabLabels = {
    khasiat: "Khasiat Medis",
    poc: "Formula POC",
    aturan: "Aturan Pakai",
    sejarah: "Sejarah"
  };

  // Filter plants based on search term
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (plant.latinName && plant.latinName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Calculate paginated plants
  const totalPages = Math.ceil(filteredPlants.length / itemsPerPage);
  const paginatedPlants = filteredPlants.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="bg-[#FBFCF8] text-[#111827] min-h-screen flex flex-col justify-between relative overflow-hidden select-none font-sans">
      
      {/* Decorative Top Accent Line */}
      <div className="h-[3px] bg-gradient-to-r from-[#1E6BFF] via-[#14B8A6] to-[#1E6BFF] w-full z-50 absolute top-0 left-0" />

      {/* Shared Navbar */}
      <Navbar token={token} user={user} logout={logout} />

      {/* MAIN SPLIT CONTENT */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-8 py-4 flex flex-col justify-center z-10 relative">
        
        {/* TOP SPLIT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center my-auto py-6">
          
          {/* LEFT CONTENT (Focused Text & Modules) */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            {/* Latin Name */}
            <span className="text-xs font-bold font-mono tracking-widest text-[#14B8A6] uppercase mb-2">
              {selectedPlant.latinName}
            </span>

            {/* Plant Name */}
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[#111827] leading-[1.0] font-sans">
              {selectedPlant.name}
            </h1>

            {/* Tab Switcher (4 KKN Modules) */}
            <div className="mt-8 flex flex-wrap gap-2 border-b border-[#E5E7EB] pb-3">
              {Object.keys(tabLabels).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-[3px] transition-all duration-200 uppercase tracking-wider font-mono ${
                    activeTab === tab
                      ? 'bg-[#1E6BFF] text-white shadow-sm'
                      : 'text-[#4B5563] hover:text-[#111827] hover:bg-gray-100'
                  }`}
                >
                  {tabLabels[tab]}
                </button>
              ))}
            </div>

            {/* Module Description */}
            <div className="mt-6 min-h-[140px] flex items-start">
              <p className={`text-base text-[#4B5563] leading-relaxed transition-all duration-300 ${
                isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
              }`}>
                {selectedPlant.modules[activeTab]}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button 
                onClick={() => alert("Mengunduh E-Booklet Pengetahuan TOGA...")}
                className="bg-[#10151C] hover:bg-[#1E6BFF] text-white px-6 py-3.5 rounded-[5px] text-xs font-bold font-mono uppercase tracking-wider transition-all duration-300 shadow-md active:scale-98"
              >
                Unduh Booklet Fisik
              </button>

              {token && user && (user.role === 'admin' || user.role === 'staff') && selectedPlant && (
                <button
                  onClick={() => handleEditPlant(selectedPlant)}
                  className="flex items-center gap-1.5 border border-[#E5E7EB] hover:bg-gray-50 text-[#4B5563] px-6 py-3.5 rounded-[5px] text-xs font-bold font-mono uppercase tracking-wider transition-colors duration-200 active:scale-98"
                >
                  <Pencil className="w-3.5 h-3.5" /> Edit Tanaman
                </button>
              )}

              {token && user && user.role === 'admin' && selectedPlant && (
                <button
                  onClick={() => handleDeletePlant(selectedPlant)}
                  className="flex items-center gap-1.5 text-[#EF4444] hover:text-red-700 hover:bg-red-50 px-4 py-3.5 rounded-[5px] text-xs font-bold font-mono uppercase tracking-wider transition-colors duration-200 active:scale-98"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Hapus
                </button>
              )}
            </div>
          </div>

          {/* RIGHT CONTENT (Focused Big Image) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end items-center relative h-[380px] lg:h-[420px]">
            {/* Background Glow */}
            <div className="w-[380px] h-[380px] bg-gradient-to-tr from-[#1E6BFF]/10 to-[#14B8A6]/10 rounded-full blur-[80px] absolute pointer-events-none -z-10" />

            {/* Large Plant Image Container */}
            <div className={`w-[280px] h-[280px] lg:w-[340px] lg:h-[340px] transition-all duration-300 flex items-center justify-center ${
              isTransitioning ? 'opacity-0 scale-95 rotate-2' : 'opacity-100 scale-100 rotate-0'
            }`}>
              <img 
                src={selectedPlant.image} 
                alt={selectedPlant.name}
                className="max-w-full max-h-full object-contain rounded-[20px] shadow-2xl border-4 border-white bg-white"
              />
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION (Horizontal Gallery View) */}
        <div className="w-full mt-10 mb-6">
          <div className="flex justify-between items-center mb-6 w-full">
            <p className="text-[11px] font-bold text-[#6B7280] tracking-widest uppercase font-mono">
              Katalog TOGA Berdaya
            </p>
            <div className="flex items-center gap-3">
              {token && user && (user.role === 'admin' || user.role === 'staff') && (
                <button
                  onClick={handleAddNewPlant}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-[28px] bg-[#1E6BFF] hover:bg-[#1a5cd4] text-white text-xs font-semibold transition-all duration-200 shadow-sm active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Tanaman Baru
                </button>
              )}
              {/* Search Bar Premium */}
              <div className="relative flex items-center px-4 py-1.5 rounded-[28px] bg-white border border-[#E5E7EB] focus-within:border-[#1E6BFF] focus-within:ring-1 focus-within:ring-[#1E6BFF]/20 transition-all duration-200 w-60">
                <Search className="w-3.5 h-3.5 text-[#9CA3AF] mr-2 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Cari tanaman obat..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-transparent border-none outline-none text-xs text-[#111827] placeholder-[#9CA3AF] w-full"
                />
              </div>
            </div>
          </div>

          {filteredPlants.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 border border-dashed border-[#E5E7EB] rounded-[5px] bg-white w-full">
              <Leaf className="w-8 h-8 text-[#9CA3AF] mb-2 animate-pulse" />
              <p className="text-sm font-semibold text-[#4B5563]">Tidak ada tanaman ditemukan</p>
              <p className="text-xs text-[#9CA3AF] mt-1">Coba gunakan kata kunci pencarian yang lain.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {paginatedPlants.map((plant) => (
                <div
                  key={plant.id}
                  onClick={() => handlePlantSelect(plant)}
                  className={`cursor-pointer bg-white border rounded-[5px] p-3 transition-all duration-300 select-none flex flex-col justify-between hover:shadow-md ${
                    selectedPlant.id === plant.id
                      ? 'border-[#1E6BFF] ring-2 ring-[#1E6BFF]/20 shadow-md scale-[1.02]'
                      : 'border-[#E5E7EB] hover:border-gray-300'
                  }`}
                >
                  {/* Thumbnail Image */}
                  <div className="w-full h-32 overflow-hidden rounded-[3px] bg-gray-50 border border-gray-100">
                    <img 
                      src={plant.image} 
                      alt={plant.name}
                      className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  {/* Info */}
                  <div className="mt-3.5 text-left">
                    <h4 className="text-sm font-bold text-[#111827] truncate">{plant.name}</h4>
                    <p className="text-[10px] font-medium text-[#6B7280] font-mono italic truncate">{plant.latinName}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Plants Gallery Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 bg-white border border-[#E5E7EB] px-4 py-3.5 rounded-[5px] shadow-[0_2px_8px_rgba(0,0,0,0.01)] animate-in fade-in duration-200">
              <div className="text-xs text-[#4B5563] font-mono">
                Menampilkan <span className="font-bold text-[#111827]">{Math.min(filteredPlants.length, (currentPage - 1) * itemsPerPage + 1)}</span> - <span className="font-bold text-[#111827]">{Math.min(filteredPlants.length, currentPage * itemsPerPage)}</span> dari <span className="font-bold text-[#111827]">{filteredPlants.length}</span> Tanaman
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3.5 py-1.5 border border-[#E5E7EB] text-xs font-semibold rounded-[3px] text-[#4B5563] bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 uppercase tracking-wider font-mono"
                >
                  Sebelumnya
                </button>
                <span className="text-xs font-bold text-[#111827] font-mono px-3">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3.5 py-1.5 border border-[#E5E7EB] text-xs font-semibold rounded-[3px] text-[#4B5563] bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 uppercase tracking-wider font-mono"
                >
                  Selanjutnya
                </button>
              </div>
            </div>
          )}
        </div>

      </main>

      {/* FOOTER */}
      <footer className="w-full h-20 flex items-center justify-between px-8 max-w-7xl mx-auto z-40 relative border-t border-[#E5E7EB]/50 text-xs text-[#4B5563] font-mono">
        <div className="flex items-center gap-2">
          <Leaf className="w-4 h-4 text-[#14B8A6]" />
          <span>© 2026 KKN Reguler Undip - Kelurahan Tingkir Lor</span>
        </div>
      </footer>

      {/* CRUD MODAL */}
      {isCrudModalOpen && (
        <div className="fixed inset-0 bg-[#10151C]/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white border border-[#E5E7EB] rounded-[8px] shadow-2xl max-w-lg w-full mx-4 overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#E5E7EB] bg-gray-50 flex items-center justify-between shrink-0">
              <h3 className="text-sm font-bold text-[#111827] font-mono uppercase tracking-wider">
                {crudMode === 'create' ? 'Tambah Tanaman Baru' : 'Edit Tanaman'}
              </h3>
              <button 
                onClick={handleCloseCrudModal}
                className="text-gray-400 hover:text-gray-600 font-mono text-sm"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitCrud} className="flex flex-col flex-grow overflow-hidden">
              {/* Scrollable Form Body */}
              <div className="p-6 space-y-4 overflow-y-auto flex-grow">
                {crudError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-[5px] text-xs font-mono text-red-600">
                    {crudError}
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-bold text-[#4B5563] mb-1.5 uppercase tracking-wider font-mono">Nama Tanaman</label>
                  <input 
                    type="text" 
                    required
                    value={crudForm.name}
                    onChange={(e) => setCrudForm({ ...crudForm, name: e.target.value })}
                    disabled={isSubmittingCrud}
                    placeholder="Misal: Kunyit"
                    className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[5px] text-sm bg-white text-[#111827] focus:outline-none focus:border-[#1E6BFF] focus:ring-1 focus:ring-[#1E6BFF] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#4B5563] mb-1.5 uppercase tracking-wider font-mono">Nama Latin</label>
                  <input 
                    type="text" 
                    value={crudForm.latinName}
                    onChange={(e) => setCrudForm({ ...crudForm, latinName: e.target.value })}
                    disabled={isSubmittingCrud}
                    placeholder="Contoh: Zingiber officinale"
                    className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[5px] text-sm bg-white text-[#111827] focus:outline-none focus:border-[#1E6BFF] focus:ring-1 focus:ring-[#1E6BFF] transition-colors italic"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#4B5563] mb-1.5 uppercase tracking-wider font-mono">Jenis Tanaman</label>
                  <select 
                    value={crudForm.type}
                    onChange={(e) => setCrudForm({ ...crudForm, type: e.target.value })}
                    disabled={isSubmittingCrud}
                    className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[5px] text-sm bg-white text-[#111827] focus:outline-none focus:border-[#1E6BFF] focus:ring-1 focus:ring-[#1E6BFF] transition-colors"
                  >
                    <option value="toga">TOGA (Tanaman Obat Keluarga)</option>
                    <option value="sayuran">Sayuran</option>
                    <option value="tanaman_hias">Tanaman Hias</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#4B5563] mb-1.5 uppercase tracking-wider font-mono">Khasiat Medis</label>
                  <textarea 
                    required
                    rows={3}
                    value={crudForm.medical_benefit}
                    onChange={(e) => setCrudForm({ ...crudForm, medical_benefit: e.target.value })}
                    disabled={isSubmittingCrud}
                    placeholder="Masukkan khasiat medis tanaman..."
                    className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[5px] text-sm bg-white text-[#111827] focus:outline-none focus:border-[#1E6BFF] focus:ring-1 focus:ring-[#1E6BFF] transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#4B5563] mb-1.5 uppercase tracking-wider font-mono">Formula POC & Aturan Pakai</label>
                  <textarea 
                    required
                    rows={3}
                    value={crudForm.poc_dosage_guideline}
                    onChange={(e) => setCrudForm({ ...crudForm, poc_dosage_guideline: e.target.value })}
                    disabled={isSubmittingCrud}
                    placeholder="Masukkan formula POC dan panduan aturan pakainya..."
                    className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[5px] text-sm bg-white text-[#111827] focus:outline-none focus:border-[#1E6BFF] focus:ring-1 focus:ring-[#1E6BFF] transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#4B5563] mb-1.5 uppercase tracking-wider font-mono">Cerita Sejarah / Fun Fact (Opsional)</label>
                  <textarea 
                    rows={2}
                    value={crudForm.historical_funfact}
                    onChange={(e) => setCrudForm({ ...crudForm, historical_funfact: e.target.value })}
                    disabled={isSubmittingCrud}
                    placeholder="Masukkan cerita sejarah singkat tanaman ini..."
                    className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[5px] text-sm bg-white text-[#111827] focus:outline-none focus:border-[#1E6BFF] focus:ring-1 focus:ring-[#1E6BFF] transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#4B5563] mb-1.5 uppercase tracking-wider font-mono">Foto Tanaman</label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    disabled={isSubmittingCrud}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-[5px] file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#1E6BFF] hover:file:bg-blue-100 cursor-pointer" 
                  />
                  {imagePreview && (
                    <div className="mt-3.5 w-full h-24 overflow-hidden rounded-[3px] bg-gray-50 border border-gray-100 flex items-center justify-center">
                      <img 
                        src={imagePreview || (crudMode === 'edit' && selectedPlant ? selectedPlant.image : '') || "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=600"} 
                        alt="Preview" 
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Fixed Footer */}
              <div className="px-6 py-4 border-t border-[#E5E7EB] bg-gray-50 flex items-center justify-end gap-2.5 shrink-0">
                <button 
                  type="button" 
                  onClick={handleCloseCrudModal}
                  disabled={isSubmittingCrud}
                  className="px-4 py-2 border border-[#E5E7EB] text-xs font-semibold text-[#4B5563] rounded-[5px] hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmittingCrud}
                  className="px-4 py-2 bg-[#1E6BFF] hover:bg-[#1a5cd4] text-white text-xs font-semibold rounded-[5px] transition-colors disabled:bg-gray-400"
                >
                  {isSubmittingCrud ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadProfile = async (authToken) => {
    if (!authToken) {
      setUser(null);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      }
    } catch (error) {
      console.error("Error loading user profile from backend:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProfile(token);
  }, [token]);

  const login = async (username, password) => {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.detail || "Username atau password salah");
    }

    const data = await response.json();
    const accessToken = data.access_token;

    // Fetch user profile immediately before updating token state to prevent race conditions on redirect
    const profileResponse = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!profileResponse.ok) {
      throw new Error("Gagal memuat profil setelah login.");
    }

    const profileData = await profileResponse.json();

    localStorage.setItem("token", accessToken);
    setUser(profileData);
    setToken(accessToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FBFCF8] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-t-[#1E6BFF] border-gray-200 animate-spin" />
          <span className="text-xs font-mono text-[#4B5563]">Memuat profil...</span>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage token={token} user={user} logout={logout} />} />
        <Route path="/login" element={<LoginPage token={token} user={user} login={login} />} />
        <Route path="/katalog" element={<KatalogPage token={token} user={user} logout={logout} />} />
        <Route 
          path="/users" 
          element={
            <ProtectedRoute token={token}>
              <UsersPage token={token} user={user} logout={logout} />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}
