import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
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
  Shield
} from 'lucide-react';

// KKN Student Profile Images
import allyaImg from './assets/Allya.JPG';
import ayunImg from './assets/Ayun.JPG';
import nicholasImg from './assets/Nicholas.JPG';
import raditImg from './assets/Radit.png';
import revinaImg from './assets/Revina.JPG';

const API_URL = "http://127.0.0.1:8080/api/v1";

function ProtectedRoute({ token, children }) {
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function LandingPage({ token, user, logout }) {
  return (
    <div className="bg-[#FBFCF8] text-[#111827] min-h-screen flex flex-col justify-between relative overflow-hidden select-none">
      
      {/* Decorative Top Accent Line */}
      <div className="h-[3px] bg-gradient-to-r from-[#1E6BFF] via-[#14B8A6] to-[#1E6BFF] w-full z-50 absolute top-0 left-0" />

      {/* NAVIGATION BAR (Persis Auralis) */}
      <header className="w-full h-24 flex items-center justify-between px-8 max-w-7xl mx-auto z-40 relative">
        {/* Left Logo */}
        <div className="flex items-center gap-3">
          <div className="w-[18px] h-[18px] rounded-full bg-gradient-to-tr from-[#1E6BFF] to-[#14B8A6] shadow-sm" />
          <span className="font-sans font-bold text-[19px] tracking-tight text-[#111827]">TOGA Berdaya</span>
        </div>

        {/* Center Menu Links */}
        <nav className="hidden lg:flex items-center gap-10 text-[13px] font-medium text-[#4B5563] tracking-wide">
          <a href="#katalog" className="hover:text-[#111827] transition-colors duration-200">Katalog</a>
          <Link to="/users" className="hover:text-[#111827] transition-colors duration-200">Pengguna</Link>
          <a href="#khasiat" className="hover:text-[#111827] transition-colors duration-200">Khasiat Medis</a>
          <a href="#sejarah" className="hover:text-[#111827] transition-colors duration-200">Sejarah</a>
          <a href="#monitoring" className="hover:text-[#111827] transition-colors duration-200 flex items-center gap-0.5">
            Monitoring
            <span className="text-[10px] text-[#1E6BFF] font-semibold align-super -mt-2 font-mono">(26)</span>
          </a>
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
              Sebuah ekosistem digitalisasi Tanaman Obat Keluarga (TOGA) hasil kolaborasi lintas disiplin tim KKN Universitas Diponegoro untuk memberdayakan warga RW 1 Tingkir Lor dalam kemandirian herba dan integrasi pengetahuan botani.
            </p>

            <div className="mt-10 flex items-center gap-5">
              <button className="bg-gradient-to-r from-[#1E6BFF] to-[#14B8A6] text-white font-semibold px-8 py-4 rounded-lg text-xs font-mono uppercase tracking-wider transition-all shadow-md shadow-primary/20 hover:opacity-95 active:scale-95">
                Jelajahi Katalog
              </button>
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
                    <span className="text-[9px] uppercase text-white/40 block font-mono">Verification Code</span>
                    <span className="font-medium text-white/80">KKN-2026-TINGKIR-LOR</span>
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
                  className="w-7 h-7 rounded-full object-cover border border-gray-150" 
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
                  className="w-7 h-7 rounded-full object-cover border border-gray-150" 
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
                  className="w-7 h-7 rounded-full object-cover border border-gray-150" 
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
                  className="w-7 h-7 rounded-full object-cover border border-gray-150" 
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
                  className="w-7 h-7 rounded-full object-cover border border-gray-150" 
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
          <span className="hover:text-[#111827] cursor-pointer">Buku Panduan</span>
          <span className="text-gray-300">|</span>
          <span className="hover:text-[#111827] cursor-pointer">Peta Bedeng</span>
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
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;

    setError('');
    setIsSubmitting(true);
    try {
      await login(username, password);
      // Success triggers redirection via token state
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login gagal. Periksa kembali username dan password Anda.');
    } finally {
      setIsSubmitting(false);
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
          <div className="w-[18px] h-[18px] rounded-full bg-gradient-to-tr from-[#1E6BFF] to-[#14B8A6] shadow-sm" />
          <span className="font-sans font-bold text-[19px] tracking-tight text-[#111827]">TOGA Berdaya</span>
        </div>
      </header>

      {/* CENTER CARD CONTAINER */}
      <main className="flex-grow flex items-center justify-center px-6 z-10 relative">
        <div className="w-full max-w-[420px] bg-white border border-[#E5E7EB] rounded-[5px] p-8 md:p-10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] animate-in fade-in zoom-in-95 duration-355 ease-out">
          
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
                className="w-full px-3.5 py-3 border border-[#D1D5DB] rounded-[5px] text-sm bg-white text-[#111827] focus:outline-none focus:border-[#1E6BFF] focus:ring-1 focus:ring-[#1E6BFF] transition-colors duration-200 placeholder:text-gray-400 font-sans font-normal"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#374151] mb-2 tracking-wide uppercase">
                Password
              </label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-3.5 py-3 border border-[#D1D5DB] rounded-[5px] text-sm bg-white text-[#111827] focus:outline-none focus:border-[#1E6BFF] focus:ring-1 focus:ring-[#1E6BFF] transition-colors duration-200 placeholder:text-gray-400 font-sans font-normal"
              />
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
              <a href="#forgot" className="text-[#1E6BFF] hover:underline hover:opacity-90 transition-all font-semibold">
                Forgot password
              </a>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#1E6BFF] hover:bg-[#1a5cd4] text-white text-sm font-semibold py-3.5 rounded-[5px] transition-all duration-200 mt-6 shadow-md hover:shadow-lg active:scale-[0.98] disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '', role: 'staff' });
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    alert("Operasi Edit dan Hapus user dinonaktifkan di backend untuk menjaga integrasi database utama.");
  };

  // Helper to map creator IDs to usernames for visual display
  const getCreatorUsername = (createdById) => {
    if (!createdById) return 'System';
    const creator = users.find(u => u.id === createdById);
    return creator ? creator.username : `ID: ${createdById}`;
  };

  return (
    <div className="bg-[#FBFCF8] text-[#111827] min-h-screen flex flex-col justify-between relative overflow-hidden select-none font-sans">
      
      {/* Decorative Top Accent Line */}
      <div className="h-[3px] bg-gradient-to-r from-[#1E6BFF] via-[#14B8A6] to-[#1E6BFF] w-full z-50 absolute top-0 left-0" />

      {/* Decorative Glows */}
      <div className="w-[600px] h-[600px] bg-gradient-to-tr from-[#1E6BFF]/5 via-[#14B8A6]/5 to-transparent rounded-full blur-[120px] absolute -right-24 -top-24 -z-10 pointer-events-none" />
      <div className="w-[600px] h-[600px] bg-gradient-to-bl from-[#14B8A6]/5 via-[#1E6BFF]/5 to-transparent rounded-full blur-[120px] absolute -left-24 -bottom-24 -z-10 pointer-events-none" />

      {/* NAVIGATION BAR */}
      <header className="w-full h-24 flex items-center justify-between px-8 max-w-7xl mx-auto z-40 relative">
        <div className="flex items-center gap-3">
          <div className="w-[18px] h-[18px] rounded-full bg-gradient-to-tr from-[#1E6BFF] to-[#14B8A6] shadow-sm" />
          <span className="font-sans font-bold text-[19px] tracking-tight text-[#111827]">TOGA Berdaya</span>
        </div>

        <nav className="hidden lg:flex items-center gap-10 text-[13px] font-medium text-[#4B5563] tracking-wide">
          <Link to="/" className="hover:text-[#111827] transition-colors duration-200">Katalog</Link>
          <Link to="/users" className="text-[#1E6BFF] font-semibold border-b-2 border-[#1E6BFF] py-1 tracking-wide">Pengguna</Link>
          <a href="/#khasiat" className="hover:text-[#111827] transition-colors duration-200">Khasiat Medis</a>
          <a href="/#sejarah" className="hover:text-[#111827] transition-colors duration-200">Sejarah</a>
        </nav>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 bg-[#F3F4F6] px-3.5 py-1.5 rounded-[28px] border border-gray-200 shadow-sm">
            <Shield className="w-3.5 h-3.5 text-[#1E6BFF]" />
            <span className="text-[11px] font-bold text-[#111827] font-mono uppercase">
              {user?.username} ({user?.role})
            </span>
          </div>
          <button 
            onClick={logout}
            className="rounded-[28px] bg-[#10151C] text-white px-[22px] py-2.5 text-xs font-semibold hover:bg-red-600 transition-all duration-300 shadow-sm active:scale-95 flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" /> Keluar
          </button>
        </div>
      </header>

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
                  users.map((item) => (
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
                          <button 
                            onClick={handleActionWarning}
                            disabled={user?.role === 'staff'}
                            className={`p-1.5 rounded transition-all ${
                              user?.role === 'staff' 
                                ? 'text-gray-300 cursor-not-allowed opacity-40' 
                                : 'text-[#4B5563] hover:text-[#1E6BFF] hover:bg-blue-50'
                            }`}
                            title={user?.role === 'staff' ? "Akses Dibatasi (View-Only)" : "Edit Pengguna"}
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
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
    localStorage.setItem("token", accessToken);
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
