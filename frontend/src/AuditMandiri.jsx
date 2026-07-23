import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ClipboardCheck, 
  Download, 
  User, 
  Check, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  RotateCcw,
  Award,
  BookOpen
} from 'lucide-react';
import Navbar from './Navbar';

export default function AuditMandiri({ token, user, logout }) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'id';

  // Persistence using localStorage for PWA convenience
  const [checkedItems, setCheckedItems] = useState(() => {
    const saved = localStorage.getItem('toga_audit_checklist');
    return saved ? JSON.parse(saved) : [false, false, false, false, false, false];
  });

  useEffect(() => {
    localStorage.setItem('toga_audit_checklist', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const toggleCheck = (index) => {
    setCheckedItems(prev => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const resetAudit = () => {
    if (window.confirm(currentLang.startsWith('en') ? 'Are you sure you want to reset all checklist items?' : 'Apakah Anda yakin ingin mengatur ulang semua item checklist?')) {
      setCheckedItems([false, false, false, false, false, false]);
    }
  };

  const checkedCount = checkedItems.filter(Boolean).length;
  const percent = Math.round((checkedCount / 6) * 100);

  // Dynamic status styling based on compliance percentage
  const getStatusDetails = () => {
    if (checkedCount === 6) {
      return {
        text: t('audit.score_bar.status_100', 'Kepatuhan 100% - Sangat Baik'),
        bgColor: 'bg-emerald-50 border-emerald-200 text-emerald-700',
        fillColor: 'from-emerald-500 to-teal-500 shadow-emerald-200',
        icon: <CheckCircle2 className="w-5.5 h-5.5 text-emerald-600 animate-bounce" />,
        desc: currentLang.startsWith('en') 
          ? 'Congratulations! Your liquid fertilizer production conforms fully to standard operating procedures. Excellent job!' 
          : 'Selamat! Pengelolaan pembuatan POC Anda telah sepenuhnya mematuhi standar operasional (SOP) yang ditentukan.'
      };
    } else if (checkedCount >= 4) {
      return {
        text: t('audit.score_bar.status_good', { percent, defaultValue: `Kepatuhan ${percent}% - Baik` }),
        bgColor: 'bg-blue-50 border-blue-200 text-blue-700',
        fillColor: 'from-blue-500 to-[#1E6BFF] shadow-blue-200',
        icon: <Info className="w-5.5 h-5.5 text-blue-600" />,
        desc: currentLang.startsWith('en') 
          ? 'Good compliance level. Only a few steps need optimization to reach 100% standard quality.' 
          : 'Tingkat kepatuhan cukup baik. Hanya beberapa langkah lagi untuk mencapai kualitas standar 100% sempurna.'
      };
    } else if (checkedCount >= 2) {
      return {
        text: t('audit.score_bar.status_fair', { percent, defaultValue: `Kepatuhan ${percent}% - Cukup` }),
        bgColor: 'bg-amber-50 border-amber-200 text-amber-700',
        fillColor: 'from-amber-500 to-orange-500 shadow-amber-200',
        icon: <Info className="w-5.5 h-5.5 text-amber-600" />,
        desc: currentLang.startsWith('en') 
          ? 'Fair compliance level. Please pay closer attention to the unchecked steps for better results.' 
          : 'Tingkat kepatuhan cukup. Harap perhatikan kembali langkah-langkah yang belum terpenuhi demi hasil maksimal.'
      };
    } else {
      return {
        text: t('audit.score_bar.status_poor', { percent, defaultValue: `Kepatuhan ${percent}% - Perlu Ditingkatkan` }),
        bgColor: 'bg-rose-50 border-rose-200 text-rose-700',
        fillColor: 'from-rose-500 to-red-500 shadow-rose-200',
        icon: <AlertCircle className="w-5.5 h-5.5 text-rose-600" />,
        desc: currentLang.startsWith('en') 
          ? 'Urgent optimization required. Please review the recommended guidelines to ensure safe fermentation.' 
          : 'Perlu optimalisasi segera. Harap ikuti anjuran standar pengolahan untuk menghindari kegagalan fermentasi.'
      };
    }
  };

  const status = getStatusDetails();

  return (
    <div className="bg-[#FBFCF8] text-[#111827] min-h-screen flex flex-col justify-between relative overflow-hidden select-none pb-24 md:pb-0 font-sans">
      {/* Decorative Top Accent Line */}
      <div className="h-[3px] bg-gradient-to-r from-[#1E6BFF] via-[#14B8A6] to-[#1E6BFF] w-full z-50 absolute top-0 left-0" />
      
      {/* Shared Navbar */}
      <Navbar token={token} user={user} logout={logout} />

      {/* Background Decorative Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-gradient-to-tr from-emerald-100/20 via-teal-100/10 to-transparent rounded-full blur-[80px] pointer-events-none -z-10" />

      {/* Main Content */}
      <main className="flex-grow w-full max-w-4xl mx-auto px-4 md:px-8 py-10 z-10 relative">
        
        {/* Breadcrumb / Category Badge */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-mono font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>{currentLang.startsWith('en') ? 'Multidisciplinary KKN Program' : 'Program Kerja Multidisiplin'}</span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-800 leading-tight">
            {t('audit.title', 'Audit Mandiri & Kartu Kendali TOGA')}
          </h1>
          <p className="text-sm md:text-base text-gray-500 mt-3 leading-relaxed">
            {t('audit.subtitle', 'Instrumen pengawasan mandiri tata kelola pembuatan POC dan perawatan tanaman obat di rumah.')}
          </p>

        </div>

        {/* Audit Form Container */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-gray-150 shadow-xl shadow-emerald-950/5 p-6 md:p-10 mb-8 transition-all duration-300">
          
          {/* Form Header with Reset Action */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-5 mb-6">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
                <ClipboardCheck className="w-5.5 h-5.5 text-emerald-600" />
                {t('audit.checklist_title', 'Formulir Checklist Audit Kepatuhan POC')}
              </h2>
              <p className="text-xs text-gray-400 mt-1 font-sans">
                {t('audit.checklist_desc', 'Centang setiap langkah operasional yang telah Anda lakukan secara rutin di rumah.')}
              </p>
            </div>
            
            {/* Reset Button */}
            {checkedCount > 0 && (
              <button 
                onClick={resetAudit}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 font-mono font-medium transition-colors duration-250 py-1.5 px-2.5 rounded-lg hover:bg-red-50/50 cursor-pointer"
                title={currentLang.startsWith('en') ? 'Reset all items' : 'Atur ulang semua item'}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{currentLang.startsWith('en') ? 'Reset' : 'Reset'}</span>
              </button>
            )}
          </div>

          {/* Checklist Form Items */}
          <div className="grid grid-cols-1 gap-3.5 mb-8">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <div 
                key={index}
                onClick={() => toggleCheck(index)}
                className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                  checkedItems[index] 
                    ? 'bg-emerald-50/40 border-emerald-200/80 shadow-sm' 
                    : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'
                }`}
              >
                {/* Custom Checkbox */}
                <div className={`mt-0.5 w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 border transition-all duration-200 ${
                  checkedItems[index]
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}>
                  {checkedItems[index] && <Check className="w-4 h-4 stroke-[3px] animate-fade-in" />}
                </div>

                {/* Checklist Label */}
                <div className="flex-grow">
                  <p className={`text-sm md:text-base leading-relaxed transition-colors duration-200 ${
                    checkedItems[index] ? 'text-emerald-950 font-medium' : 'text-gray-700'
                  }`}>
                    {t(`audit.indicators.${index}`)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Compliance Score Bar & Status */}
          <div className="bg-gray-50/80 border border-gray-150 rounded-2xl p-5 md:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <span className="text-sm font-bold text-gray-700 font-mono tracking-wide uppercase">
                {t('audit.score_bar.title', 'Tingkat Kepatuhan')}
              </span>
              <span className="text-xs text-gray-400 font-mono">
                {t('audit.checked_count', { count: checkedCount, defaultValue: `${checkedCount} dari 6 indikator terpenuhi` })}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200/80 rounded-full h-3 overflow-hidden shadow-inner mb-4">
              <div 
                className={`h-full bg-gradient-to-r ${status.fillColor} transition-all duration-500 ease-out rounded-full`}
                style={{ width: `${percent}%` }}
              />
            </div>

            {/* Dynamic Status Badge & Description */}
            <div className="flex items-start gap-3 mt-4">
              <div className="flex-shrink-0 mt-0.5">
                {status.icon}
              </div>
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${status.bgColor} transition-all duration-300`}>
                  {status.text}
                </span>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed font-sans">
                  {status.desc}
                </p>
              </div>
            </div>
          </div>

          {/* PDF Download Action Button */}
          <div className="mt-8 flex justify-center">
            <a 
              href="/Lembar_Audit_Mandiri_TOGA.pdf" 
              download="Lembar_Audit_Mandiri_TOGA.pdf"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#10151C] hover:bg-emerald-600 active:bg-emerald-700 text-white font-mono text-xs font-bold uppercase tracking-wider py-4.5 px-8 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg hover:shadow-emerald-950/10 cursor-pointer"
            >
              <Download className="w-4 h-4 stroke-[2.5px]" />
              <span>{t('audit.download_btn', 'UNDUH LEMBAR AUDIT & LOGBOOK (PDF)')}</span>
            </a>
          </div>

        </div>

        {/* Logbook Information Footer Box */}
        <div className="bg-emerald-50/30 border border-emerald-100/50 rounded-2xl p-5 flex items-start gap-4 max-w-3xl mx-auto font-sans">
          <BookOpen className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-emerald-900/80 leading-relaxed">
            {currentLang.startsWith('en') ? (
              <p>
                <strong>About the instrument:</strong> The checklist above is a digitized form of the Physical Audit Sheet designed to help housewives and youth in Tingkir Lor track daily and weekly procedures of TOGA cultivation and Organic Fertilizer fermentation safely, preventing contamination or gas buildup failure.
              </p>
            ) : (
              <p>
                <strong>Tentang instrumen:</strong> Checklist di atas merupakan bentuk digitalisasi dari Lembar Audit Fisik yang dirancang untuk membantu ibu rumah tangga dan pemuda di Tingkir Lor memantau kepatuhan prosedur perawatan TOGA dan pembuatan POC agar aman dari pembusukan gagal maupun akumulasi gas berlebih.
              </p>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
