import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Lock, 
  Cpu, 
  BookOpen, 
  LogOut, 
  Shield, 
  Droplets 
} from 'lucide-react';
import togaLogo from './assets/TOGA-Logo.png';

export default function Navbar({ token, user, logout }) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'id';
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {/* DESKTOP HEADER (Hidden on Mobile) */}
      <header className="hidden md:flex w-full h-24 items-center justify-between px-8 max-w-7xl mx-auto z-40 relative bg-transparent font-sans">
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
            {t('navbar.catalog')}
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
            {t('navbar.users')}
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
            {t('navbar.monitoring')}
            <span className="text-[10px] text-[#1E6BFF] font-semibold align-super -mt-2 font-mono">(26)</span>
          </NavLink>

          <NavLink 
            to="/panduan" 
            className={({ isActive }) => 
              `transition-all duration-200 uppercase tracking-wider font-mono text-[11px] relative py-1 ` +
              (isActive 
                ? 'text-[#111827] font-bold after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-[#1E6BFF] after:rounded-full' 
                : 'text-[#4B5563] font-normal hover:text-[#111827]')
            }
          >
            {t('navbar.panduan')}
          </NavLink>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-[11px] font-bold font-mono tracking-wider">
            <span 
              onClick={() => i18n.changeLanguage('en')}
              className={`cursor-pointer transition-all duration-200 ${
                currentLanguage.startsWith('en') 
                  ? 'text-[#1E6BFF] font-black' 
                  : 'text-[#4B5563] hover:text-[#111827] font-normal'
              }`}
            >
              EN
            </span>
            <span className="text-gray-300">|</span>
            <span 
              onClick={() => i18n.changeLanguage('id')}
              className={`cursor-pointer transition-all duration-200 ${
                currentLanguage.startsWith('id') 
                  ? 'text-[#1E6BFF] font-black' 
                  : 'text-[#4B5563] hover:text-[#111827] font-normal'
              }`}
            >
              ID
            </span>
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
                className="rounded-[28px] bg-[#10151C] text-white px-[22px] py-2.5 text-xs font-semibold hover:bg-red-600 transition-all duration-300 shadow-sm active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" /> {t('navbar.logout')}
              </button>
            </div>
          ) : (
            <Link to="/login" className="rounded-[28px] bg-[#10151C] text-white px-[22px] py-2.5 text-xs font-semibold hover:bg-[#1E6BFF] transition-all duration-300 shadow-sm active:scale-95 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" /> {t('navbar.login')}
            </Link>
          )}
        </div>
      </header>

      {/* MOBILE HEADER (Visible on Mobile Only) */}
      <header className="md:hidden w-full h-16 flex items-center justify-between px-6 bg-white/90 backdrop-blur-md border-b border-[#E5E7EB] z-40 sticky top-0 font-sans">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src={togaLogo} alt="TOGA Logo" className="w-4 h-4 object-contain" />
          <span className="font-sans font-bold text-base tracking-tight text-[#111827]">TOGA Berdaya</span>
        </div>
        
        {/* Right Action */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-[10px] font-bold font-mono tracking-wider">
            <span 
              onClick={() => i18n.changeLanguage('en')}
              className={`cursor-pointer transition-all duration-200 ${
                currentLanguage.startsWith('en') ? 'text-[#1E6BFF] font-black' : 'text-[#4B5563] font-normal'
              }`}
            >
              EN
            </span>
            <span className="text-gray-300">|</span>
            <span 
              onClick={() => i18n.changeLanguage('id')}
              className={`cursor-pointer transition-all duration-200 ${
                currentLanguage.startsWith('id') ? 'text-[#1E6BFF] font-black' : 'text-[#4B5563] font-normal'
              }`}
            >
              ID
            </span>
          </div>

          {token && user && (
            <div className="flex items-center gap-1 text-[10px] font-bold text-[#1E6BFF] font-mono tracking-tight uppercase bg-blue-50 px-2 py-1 rounded-[12px] border border-blue-100">
              <Shield className="w-3 h-3" />
              <span>{user.username}</span>
            </div>
          )}
        </div>
      </header>

      {/* MOBILE BOTTOM NAVIGATION BAR (Visible on Mobile Only) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-[#E5E7EB] flex items-center justify-around z-40 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] px-2">
        <NavLink 
          to="/katalog" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center gap-1 transition-colors duration-150 ` + 
            (isActive ? 'text-[#1E6BFF] font-bold' : 'text-gray-500 hover:text-[#111827]')
          }
        >
          <BookOpen className="w-4.5 h-4.5" />
          <span className="text-[9px] font-semibold uppercase tracking-wider font-mono">{t('navbar.catalog')}</span>
        </NavLink>

        {token && user && (
          <NavLink 
            to="/users" 
            className={({ isActive }) => 
              `flex flex-col items-center justify-center gap-1 transition-colors duration-150 ` + 
              (isActive ? 'text-[#1E6BFF] font-bold' : 'text-gray-500 hover:text-[#111827]')
            }
          >
            <Shield className="w-4.5 h-4.5" />
            <span className="text-[9px] font-semibold uppercase tracking-wider font-mono">{t('navbar.users')}</span>
          </NavLink>
        )}

        <NavLink 
          to="/#monitoring" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center gap-1 transition-colors duration-150 ` + 
            (isActive && location.hash === '#monitoring' ? 'font-bold text-blue-600' : 'text-gray-500 hover:text-[#111827]')
          }
        >
          <Cpu className="w-4.5 h-4.5" />
          <span className="text-[9px] font-semibold uppercase tracking-wider font-mono">{t('navbar.monitoring')}</span>
        </NavLink>

        <NavLink 
          to="/panduan" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center gap-1 transition-colors duration-150 ` + 
            (isActive ? 'text-[#1E6BFF] font-bold' : 'text-gray-500 hover:text-[#111827]')
          }
        >
          <Droplets className="w-4.5 h-4.5" />
          <span className="text-[9px] font-semibold uppercase tracking-wider font-mono">{t('navbar.panduan')}</span>
        </NavLink>

        {token && user ? (
          <button 
            onClick={logout}
            className="flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-[#EF4444] transition-colors duration-150 cursor-pointer"
          >
            <LogOut className="w-4.5 h-4.5" />
            <span className="text-[9px] font-semibold uppercase tracking-wider font-mono">{t('navbar.logout')}</span>
          </button>
        ) : (
          <Link 
            to="/login" 
            className="flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-[#1E6BFF] transition-colors duration-150"
          >
            <Lock className="w-4.5 h-4.5" />
            <span className="text-[9px] font-semibold uppercase tracking-wider font-mono">{t('navbar.login')}</span>
          </Link>
        )}
      </div>
    </>
  );
}
