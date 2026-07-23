import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Calculator, 
  X, 
  RotateCcw, 
  Info, 
  Coins, 
  TrendingUp, 
  DollarSign,
  Briefcase,
  Layers,
  Sparkles
} from 'lucide-react';

export default function PricingCalculator({ isOpen, onClose }) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'id';

  // State inputs for Cost-Plus Pricing
  const [bibit, setBibit] = useState(3000);
  const [media, setMedia] = useState(2500);
  const [polybag, setPolybag] = useState(1000);
  const [poc, setPoc] = useState(1500);
  const [label, setLabel] = useState(1000);
  const [markup, setMarkup] = useState(40); // in percent

  // Fixed Cost (Penyusutan Alat) - Preset as Rp 450 per unit
  const fixedCost = 450;

  // Presets
  const applyPresetJahe = () => {
    setBibit(3000);
    setMedia(2500);
    setPolybag(1000);
    setPoc(1500);
    setLabel(1000);
    setMarkup(40);
  };

  const applyPresetLidahBuaya = () => {
    setBibit(2000);
    setMedia(2000);
    setPolybag(1000);
    setPoc(1000);
    setLabel(1000);
    setMarkup(40);
  };

  const resetAll = () => {
    setBibit(0);
    setMedia(0);
    setPolybag(0);
    setPoc(0);
    setLabel(0);
    setMarkup(0);
  };

  // Real-time Calculations
  const variableCost = Number(bibit) + Number(media) + Number(polybag) + Number(poc) + Number(label);
  const hpp = variableCost + fixedCost;
  const marginLaba = Math.round(hpp * (Number(markup) / 100));
  const recommendedPrice = hpp + marginLaba;
  
  // Round to nearest 1,000
  const roundedPrice = Math.round(recommendedPrice / 1000) * 1000;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#10151C]/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200 font-sans">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 bg-[#FBFCF8] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              <Calculator className="w-5.5 h-5.5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-800">
                {t('calc.title', 'Kalkulator Simulasi Harga TOGA')}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                {t('calc.subtitle', 'Metode Cost-Plus Pricing untuk penetapan harga jual produk TOGA.')}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto flex-grow grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Inputs Section */}
          <div className="md:col-span-7 space-y-4">
            
            {/* Presets Row */}
            <div className="flex flex-wrap gap-2">
              <button 
                type="button" 
                onClick={applyPresetJahe}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-100 bg-red-50/50 hover:bg-red-50 text-red-700 text-xs font-mono font-medium transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-red-500" />
                <span>{t('calc.preset_jahe', 'Preset Jahe Merah')}</span>
              </button>
              <button 
                type="button" 
                onClick={applyPresetLidahBuaya}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-700 text-xs font-mono font-medium transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                <span>{t('calc.preset_lidah', 'Preset Lidah Buaya')}</span>
              </button>
            </div>

            {/* Variable Costs Grid */}
            <div className="bg-gray-50/50 border border-gray-150 rounded-xl p-4 space-y-3.5">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-1">
                <span className="text-xs font-bold text-gray-700 font-mono tracking-wide uppercase flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  {currentLang.startsWith('en') ? 'Variable Costs (VC)' : 'Biaya Variabel (VC)'}
                </span>
                <button 
                  type="button" 
                  onClick={resetAll} 
                  className="text-[10px] text-gray-400 hover:text-red-500 font-mono flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  {t('calc.reset', 'Reset')}
                </button>
              </div>

              {/* Seed Cost */}
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1 font-mono uppercase tracking-wide">
                  {t('calc.label_bibit', 'Biaya Bibit')}
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-xs font-semibold text-gray-400 font-mono">Rp</span>
                  <input 
                    type="number" 
                    value={bibit}
                    onChange={(e) => setBibit(e.target.value)}
                    placeholder="0"
                    min="0"
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>
              </div>

              {/* Media Tanam */}
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1 font-mono uppercase tracking-wide">
                  {t('calc.label_media', 'Media Tanam')}
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-xs font-semibold text-gray-400 font-mono">Rp</span>
                  <input 
                    type="number" 
                    value={media}
                    onChange={(e) => setMedia(e.target.value)}
                    placeholder="0"
                    min="0"
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>
              </div>

              {/* Polybag */}
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1 font-mono uppercase tracking-wide">
                  {t('calc.label_polybag', 'Polybag')}
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-xs font-semibold text-gray-400 font-mono">Rp</span>
                  <input 
                    type="number" 
                    value={polybag}
                    onChange={(e) => setPolybag(e.target.value)}
                    placeholder="0"
                    min="0"
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>
              </div>

              {/* POC */}
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1 font-mono uppercase tracking-wide">
                  {t('calc.label_poc', 'Pupuk Organik Cair (POC)')}
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-xs font-semibold text-gray-400 font-mono">Rp</span>
                  <input 
                    type="number" 
                    value={poc}
                    onChange={(e) => setPoc(e.target.value)}
                    placeholder="0"
                    min="0"
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>
              </div>

              {/* Label */}
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1 font-mono uppercase tracking-wide">
                  {t('calc.label_label', 'Stiker Label / Kemasan')}
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-xs font-semibold text-gray-400 font-mono">Rp</span>
                  <input 
                    type="number" 
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="0"
                    min="0"
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Markup Slider */}
            <div className="bg-gray-50/50 border border-gray-150 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[11px] font-bold text-gray-600 font-mono uppercase tracking-wide">
                  {t('calc.label_markup', 'Target Markup Laba (%)')}
                </label>
                <span className="text-sm font-bold text-emerald-700 font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  {markup}%
                </span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                step="5"
                value={markup}
                onChange={(e) => setMarkup(e.target.value)}
                className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-gray-200 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>

          </div>

          {/* Real-time Calculation Summary Section */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div className="bg-[#FBFCF8] border border-gray-150 rounded-2xl p-5 shadow-sm space-y-4 flex-grow h-full flex flex-col justify-between">
              
              <div>
                <h4 className="text-xs font-bold text-gray-700 font-mono tracking-wide uppercase flex items-center gap-1.5 border-b border-gray-100 pb-3 mb-4">
                  <Coins className="w-4.5 h-4.5 text-emerald-600" />
                  {t('calc.summary_title', 'Hasil Perhitungan Real-Time')}
                </h4>

                <div className="space-y-3 font-sans">
                  {/* VC Summary */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">{t('calc.total_vc', 'Total Biaya Variabel (VC)')}</span>
                    <span className="font-mono font-bold text-gray-700">Rp {variableCost.toLocaleString('id-ID')}</span>
                  </div>

                  {/* FC Summary */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500 flex items-center gap-1">
                      {t('calc.total_fc', 'Biaya Tetap / Penyusutan (FC)')}
                      <span className="group relative cursor-pointer" title={currentLang.startsWith('en') ? 'Equipment depreciation preset' : 'Preset penyusutan cangkul, sekop, ember'}>
                        <Info className="w-3.5 h-3.5 text-gray-400" />
                      </span>
                    </span>
                    <span className="font-mono font-semibold text-gray-600">Rp {fixedCost.toLocaleString('id-ID')}</span>
                  </div>

                  {/* HPP Summary */}
                  <div className="flex justify-between items-center text-xs border-t border-dashed border-gray-200 pt-2.5">
                    <span className="text-gray-700 font-medium">{t('calc.hpp', 'HPP per Unit (VC + FC)')}</span>
                    <span className="font-mono font-bold text-gray-800 bg-gray-100/60 px-2 py-0.5 rounded">
                      Rp {hpp.toLocaleString('id-ID')}
                    </span>
                  </div>

                  {/* Profit Margin Summary */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500 flex items-center gap-1">
                      {t('calc.margin', 'Margin Laba (Markup)')}
                      <span className="text-gray-400 font-mono">({markup}%)</span>
                    </span>
                    <span className="font-mono font-semibold text-emerald-700">+Rp {marginLaba.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>

              {/* Recommended Prices Area */}
              <div className="mt-8 border-t border-gray-100 pt-5 space-y-4">
                {/* Recommended Raw Price */}
                <div>
                  <div className="text-[10px] font-bold text-gray-400 font-mono tracking-wide uppercase flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                    {t('calc.rec_price', 'Harga Jual Rekomendasi')}
                  </div>
                  <div className="text-xl font-extrabold text-gray-800 mt-1 font-mono">
                    Rp {recommendedPrice.toLocaleString('id-ID')}
                  </div>
                </div>

                {/* Rounded Price */}
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3.5 shadow-sm">
                  <div className="text-[10px] font-bold text-emerald-800 font-mono tracking-wide uppercase">
                    {t('calc.rounded_price', 'Pembulatan Ribuan Terdekat')}
                  </div>
                  <div className="text-2xl font-black text-emerald-950 mt-1 font-mono">
                    Rp {roundedPrice.toLocaleString('id-ID')}
                  </div>
                  <p className="text-[9.5px] text-emerald-700 mt-1 leading-normal">
                    {currentLang.startsWith('en') 
                      ? '*Recommended for trading price standard to attract local buyers.'
                      : '*Dianjurkan sebagai standar harga jual fisik agar transaksi tunai lebih mudah.'}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-[#FBFCF8] flex items-center justify-between shrink-0">
          {/* PIC info */}
          <div className="text-[10px] text-gray-400 font-mono">
            Proker Rizal Krisnadhi (Akuntansi Perpajakan UNDIP 2026)
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="px-5 py-2.5 bg-[#10151C] hover:bg-emerald-600 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-md hover:shadow-emerald-950/10 cursor-pointer"
          >
            {currentLang.startsWith('en') ? 'Done' : 'Selesai'}
          </button>
        </div>

      </div>
    </div>
  );
}
