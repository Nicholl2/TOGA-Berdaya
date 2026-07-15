import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import togaLogo from './assets/TOGA-Logo.png';

export default function Monitoring() {
  const { t } = useTranslation();
  const [easterEgg, setEasterEgg] = useState('');

  useEffect(() => {
    const messages = [
      'Dirawat dengan 🤍 untuk orang tersayang',
      'Dijaga dengan 🖤 demi senyumanmu'
    ];
    // Memilih easter egg secara acak saat komponen dimuat
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setEasterEgg(randomMessage);
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-[70vh] md:min-h-[60vh] bg-[#FBFCF8] overflow-hidden rounded-2xl border border-gray-100 px-4 py-8 md:p-12">
      {/* Background Decorative Glow (Premium Accent) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[500px] md:h-[500px] bg-gradient-to-tr from-[#1E6BFF]/5 via-[#14B8A6]/5 to-transparent rounded-full blur-[80px] pointer-events-none -z-10" />

      {/* Main Content Card Container */}
      <div className="flex flex-col items-center text-center max-w-md w-full px-4 py-8 z-10">
        
        {/* Animated Badge Status */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1E6BFF]/10 text-[#1E6BFF] text-[10px] font-mono font-bold uppercase tracking-wider mb-6 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1E6BFF] animate-ping" />
          <span>{t('monitoring.status', 'Development Active')}</span>
        </div>

        {/* Floating Logo with Soft Pulse and Hover Effect */}
        <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-gray-100 flex items-center justify-center mb-6 transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#1E6BFF]/5 to-[#14B8A6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <img 
            src={togaLogo} 
            alt="TOGA Logo" 
            className="w-9 h-9 object-contain group-hover:rotate-6 transition-transform duration-300 animate-pulse" 
          />
        </div>

        {/* Clean, Minimalist Main Heading */}
        <h2 className="font-sans text-xl md:text-2xl font-bold tracking-tight text-gray-800">
          {t('monitoring.title', 'Halaman Masih dalam Pengembangan')}
        </h2>

        {/* Soft, Comfortable Sub-text */}
        <p className="text-sm text-gray-500 mt-2 max-w-[320px] mx-auto leading-relaxed">
          {t('monitoring.subtitle', 'Fitur monitoring agenda KKN sedang dipersiapkan untuk Anda.')}
        </p>

        {/* Interactive Progress Indicator (Modern Visual Touch) */}
        <div className="w-full bg-gray-100/80 rounded-full h-1 mt-8 max-w-[200px] overflow-hidden">
          <div className="bg-gradient-to-r from-[#1E6BFF] to-[#14B8A6] h-full w-[65%] rounded-full animate-pulse" />
        </div>
      </div>

      {/* Cute Easter Egg Footer (Pojok Kanan Bawah - Responsive Mobile/Desktop Position) */}
      {easterEgg && (
        <span className="absolute bottom-20 right-4 md:bottom-6 md:right-6 text-[10px] md:text-xs text-gray-400 italic tracking-wide select-none pointer-events-none">
          {easterEgg}
        </span>
      )}
    </div>
  );
}
