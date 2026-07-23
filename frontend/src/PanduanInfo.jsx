import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Droplets, 
  Scale, 
  Beaker, 
  Timer, 
  Info,
  Sparkles,
  BookOpen,
  Calendar,
  ShieldCheck,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import Navbar from './Navbar';

export default function PanduanInfo({ token, user, logout }) {
  const { t: tGlobal, i18n } = useTranslation();
  const [activeSubTab, setActiveSubTab] = useState('poc'); // 'poc' or 'toga'

  const language = i18n.language?.startsWith('en') ? 'en' : 'id';

  const content = {
    id: {
      badge: "KKN UNDIP TINGKIR LOR 2026",
      title: "Panduan TOGA & Pupuk Organik Cair",
      subtitle: "Basis pengetahuan praktis untuk budidaya Tanaman Obat Keluarga dan mandiri pupuk organik di pekarangan rumah desa.",
      btnPoc: "PANDUAN POC",
      btnToga: "PENGOLAHAN TOGA",
      pocDesc: "Pupuk Organik Cair (POC) merupakan pupuk berbentuk cairan yang berasal dari dekomposisi bahan-bahan organik dengan bantuan mikroorganisme. Penggunaan POC terbukti meningkatkan kesuburan tanah secara alami, menyuburkan perakaran, serta aman dan ramah lingkungan untuk tanaman TOGA dan sayuran warga.",
      
      // Alat & Bahan
      toolsTitle: "Alat & Bahan Pembuatan",
      toolsHeader: "Alat Utama:",
      materialsHeader: "Bahan Baku:",
      toolsList: [
        "Botol plastik besar (wadah fermentasi)",
        "Botol plastik kecil (tempat keluar gas)",
        "Selang plastik ukuran kecil",
        "Lem tembak & isi lem tembak",
        "Gelas ukur & sendok takar",
        "Wadah besar (ember) & pengaduk",
        "Timbangan dapur"
      ],
      materialsList: [
        "Sampah organik (sisa buah / sayur)",
        "EM4 Pertanian (starter mikroba)",
        "Molase / tetes tebu (sumber nutrisi mikroba)",
        "Air bersih / Air cucian beras"
      ],

      // Takaran
      formulaTitle: "Formulasi Perbandingan Takaran",
      formulaSmall: "Skala Kecil (1 kg):",
      formulaSmallDesc: "1 kg Sampah organik + 20 ml EM4 + 20 ml Molase + 2 Liter air.",
      formulaMedium: "Skala Sedang (5 kg):",
      formulaMediumDesc: "5 kg Sampah organik + 100 ml EM4 + 100 ml Molase + 10 Liter air.",
      importantNote: "PENTING: Selalu sisakan ruang kosong sekitar 20 - 25% dari kapasitas wadah botol fermentasi agar gas hasil fermentasi memiliki ruang dan wadah tidak meledak.",

      // Langkah Pembuatan
      stepsTitle: "Langkah-Langkah Pembuatan POC",
      steps: [
        {
          title: "Pencacahan Sampah Organik",
          desc: "Cacah sampah organik (sisa potongan sayur atau kulit buah) menjadi potongan-potongan kecil. Semakin kecil ukuran cacahan, semakin cepat proses dekomposisi terjadi."
        },
        {
          title: "Pengisian Botol Wadah Utama",
          desc: "Masukkan cacahan sampah organik yang sudah dipotong tadi ke dalam wadah botol plastik fermentasi berukuran besar."
        },
        {
          title: "Pembuatan Larutan Nutrisi",
          desc: "Di dalam wadah terpisah (ember), masukkan air cucian beras, EM4, dan Molase. Aduk menggunakan pengaduk secara merata hingga seluruh bahan larut dan tercampur sempurna."
        },
        {
          title: "Penyatuan Bahan",
          desc: "Tuangkan campuran larutan air, EM4, dan Molase tersebut secara perlahan ke dalam botol utama yang telah berisi sampah organik."
        },
        {
          title: "Pemasangan Selang Gas",
          desc: "Lubangi bagian tengah tutup botol besar (wadah fermentasi) dan tutup botol kecil (botol gas pembuangan) menggunakan paku atau solder. Masukkan selang plastik kecil ke lubang tutup botol besar, lalu gunakan lem tembak untuk merekatkan selang agar tidak ada kebocoran gas."
        },
        {
          title: "Menghubungkan Botol Pembuangan",
          desc: "Isi botol kecil dengan air bersih. Masukkan ujung selang lainnya yang berasal dari botol besar ke dalam botol kecil tersebut hingga tercelup air, kemudian tutup kedua botol tersebut."
        },
        {
          title: "Proses Fermentasi & Pengocokan",
          desc: "Letakkan instalasi botol POC di tempat yang teduh, sejuk, dan tidak terpapar oleh sinar matahari langsung. Selama minggu pertama, lakukan pengocokan wadah secara berkala perlahan agar proses fermentasi menyebar secara merata."
        },
        {
          title: "Penyaringan & Penggunaan",
          desc: "Setelah didiamkan selama 2-3 minggu, POC siap digunakan. Saring cairan menggunakan kain penyaring untuk memisahkan cairan POC murni dari ampas padatnya. Ampas padat sisa penyaringan dapat dimanfaatkan lebih lanjut sebagai kompos padat."
        }
      ],

      // Indikator Keberhasilan
      successIndicatorTitle: "Indikator Keberhasilan Fermentasi",
      indicatorHeader: "Indikator",
      successHeader: "POC Berhasil",
      failureHeader: "POC Gagal",
      indicatorRows: [
        { name: "Aroma/Bau", success: "Asam segar, mirip aroma tape/fermentasi", failure: "Busuk menyengat seperti sampah/comberan" },
        { name: "Warna", success: "Coklat kekuningan hingga coklat kehitaman jernih", failure: "Hitam pekat kotor dan berlendir" },
        { name: "Gas / Busa", success: "Muncul busa di awal, lalu berkurang setelah ~2 minggu", failure: "Botol terus menggembung kencang, busa berlebih" },
        { name: "Endapan", success: "Ampas mengendap di dasar, cairan atas relatif jernih", failure: "Ampas mengembang di atas, cairan keruh pekat" }
      ],

      // Cara Pengaplikasian
      applyTitle: "Cara & Aturan Pengaplikasian POC",
      importantApplyNote: "Langkah Penting Sebelum Digunakan: Jangan pernah menyiramkan cairan POC murni langsung ke tanaman! Campurkan dahulu 10 - 20 ml POC (setara 1 - 2 tutup botol kemasan) ke dalam 1 Liter air bersih, lalu aduk rata.",
      apply1Title: "1. Penyiraman Akar",
      apply1Desc: "Siramkan larutan campuran POC di sekitar lingkar perakaran tanaman sebanyak kurang lebih 200 - 300 ml per lubang/tanaman. Pastikan media tanah basah lembab, jangan sampai tergenang air.",
      apply2Title: "2. Penyemprotan Daun",
      apply2Desc: "Semprotkan campuran larutan secara tipis dan merata ke bagian permukaan bawah daun. Penyerapan nutrisi tanaman akan berjalan jauh lebih efektif lewat celah stomata daun.",
      frequency: "Frekuensi: Rutin 1 kali setiap 1 - 2 minggu.",
      timing: "Waktu: Pagi (06:00-09:00) / Sore (16:00-18:00).",

      // Pengolahan TOGA
      togaDesc: "Bagian ini menjelaskan petunjuk pengolahan mandiri hasil panen Tanaman Obat Keluarga (TOGA) untuk mengobati keluhan penyakit ringan sehari-hari secara aman berdasarkan buku panduan bioteknologi KKN.",
      recipes: [
        {
          title: "Ramuan Kencur (Obat Batuk Tradisional)",
          badge: "Kencur",
          content: [
            { subtitle: "Cara 1 (Praktis):", text: "Ambil 5 gram kencur segar, cuci bersih dengan air mengalir. Kunyah rimpang kencur tersebut secara perlahan hingga halus, lalu telan langsung cairannya." },
            { subtitle: "Cara 2 (Perasan & Madu):", text: "Parut 10 gram kencur segar yang sudah dicuci bersih, kemudian peras ampasnya menggunakan kain bersih. Campurkan air perasan kencur tersebut dengan madu secukupnya. Minum ramuan ini sekaligus 3 kali sehari secara teratur (pagi, siang, dan sore)." }
          ]
        },
        {
          title: "Rebusan Sambiloto (Obat Penurun Demam)",
          badge: "Sambiloto",
          text: "Ambil beberapa lembar daun sambiloto segar. Rebus daun sambiloto tersebut dengan menggunakan 2 gelas air bersih hingga airnya menyusut dan hanya menyisakan 1 gelas air saja. Saring air rebusan herbal tersebut, dinginkan hingga hangat, dan minum segera secara rutin."
        },
        {
          title: "Perasan Kunyit (Obat Pegal Linu & Perut Kembung)",
          badge: "Kunyit",
          text: "Kupas kulit rimpang kunyit secukupnya lalu cuci hingga bersih. Parut atau haluskan kunyit tersebut. Tambahkan 2 sendok makan air panas matang ke dalam kunyit halus, aduk rata. Peras parutan menggunakan saringan kain, tampung airnya, lalu minum air perasan hangat tersebut secara teratur."
        },
        {
          title: "Ramuan Air Sirih (Obat Alami Penghilang Gatal)",
          badge: "Daun Sirih",
          text: "Petik 5-7 lembar daun sirih segar, cuci bersih. Remas daun sirih di dalam air bersih secukupnya lalu diamkan selama kurang lebih 30 menit hingga air menyusut dan berubah warna. Basuhkan air remasan sirih tersebut ke area kulit tubuh yang gatal sehabis mandi dengan cara ditepuk-tepuk lembut."
        },
        {
          title: "Rebusan Jahe & Sereh (Pegal Linu & Masuk Angin)",
          badge: "Jahe & Sereh",
          text: "Bahan: 1 jempol Jahe Merah + 2 batang Sereh + 1 Gelas air + 1 sdm Gula Merah + Seujung sendok Garam dapur.",
          desc: "Cara Pengolahan: Bakar rimpang jahe sebentar lalu geprek/memarkan. Memarkan pula batang sereh. Rebus jahe geprek dan sereh dengan segelas air hingga mendidih dan menyusut sedikit. Tambahkan gula merah dan garam dapur, aduk hingga larut. Angkat, diamkan hingga suam-suam kuku, saring, dan minum selagi hangat pada waktu pagi dan sore hari."
        }
      ],
      btnHalal: "KEHALALAN BAHAN BAKU",
      halalTitle1: "Titik Kritis Kehalalan Bahan Baku TOGA & POC",
      halalTitle2: "Panduan Pendaftaran Sertifikasi Halal Gratis (SEHATI 2026)",
      halalDesc: "Bagian ini menjelaskan petunjuk standardisasi kehalalan dalam budidaya tanaman obat keluarga serta tata cara pendaftaran sertifikasi halal bagi warga Kelurahan Tingkir Lor berdasarkan program SEHATI BPJPH.",
      halalCards: [
        {
          title: "🌿 Bahan Alam & Herbals",
          desc: "Tanaman TOGA murni pada dasarnya halal. Pastikan pencucian menggunakan air mengalir untuk mensucikan kotoran tanah/pupuk hewani."
        },
        {
          title: "🧪 Media Fermentasi POC",
          desc: "Gunakan limbah murni sayur/buah/tanaman. Hindari limbah bangkai hewani, darah, atau bahan tambahan (starters) tanpa kepastian status halal."
        },
        {
          title: "🏺 Kebersihan Wadah & Alat",
          desc: "Pastikan alat pemotong, wadah olahan herbal, dan tong fermentasi terbebas dari sisa minyak/lemak hewani non-halal."
        }
      ],
      halalStepsTitle: "Alur Pendaftaran SEHATI 2026 (Sertifikasi Halal Gratis):",
      halalSteps: [
        {
          title: "Langkah 1 (Persiapan)",
          desc: "Siapkan KTP, NIB (Kategori Usaha Mikro/Kecil), dan daftar bahan baku olahan TOGA."
        },
        {
          title: "Langkah 2 (Registrasi)",
          desc: "Buat akun pelaku usaha di portal resmi SIHALAL BPJPH (ptsp.halal.go.id)."
        },
        {
          title: "Langkah 3 (Verifikasi PPH)",
          desc: "Proses pendampingan & pemeriksaan dokumen oleh Pendamping Proses Produk Halal (PPH)."
        },
        {
          title: "Langkah 4 (Sertifikat Terbit)",
          desc: "Sidang fatwa MUI & penerbitan Sertifikat Halal resmi oleh BPJPH."
        }
      ],
      btnSihalal: "Buka Portal SIHALAL BPJPH"
    },
    en: {
      badge: "UNDIP KKN TINGKIR LOR 2026",
      title: "TOGA & Liquid Organic Fertilizer Guide",
      subtitle: "Practical knowledge base for Family Medicinal Plants (TOGA) cultivation and self-reliance on organic fertilizer in village home yards.",
      btnPoc: "LOF GUIDE",
      btnToga: "TOGA PROCESSING",
      pocDesc: "Liquid Organic Fertilizer (LOF) is a liquid fertilizer derived from decomposition of organic materials with the help of microorganisms. The use of LOF is proven to increase soil fertility naturally, nourish root systems, and is safe and environmentally friendly for residents' TOGA and vegetable crops.",
      
      // Alat & Bahan
      toolsTitle: "Tools & Materials for Production",
      toolsHeader: "Main Tools:",
      materialsHeader: "Raw Materials:",
      toolsList: [
        "Large plastic bottle (fermentation vessel)",
        "Small plastic bottle (gas outlet)",
        "Small plastic hose",
        "Glue gun & glue sticks",
        "Measuring cup & measuring spoon",
        "Large container (bucket) & stirrer",
        "Kitchen scale"
      ],
      materialsList: [
        "Organic waste (fruit / vegetable scraps)",
        "Agriculture EM4 (microbial starter)",
        "Molasses / sugarcane juice (microbial nutrient source)",
        "Clean water / rice washing water"
      ],

      // Takaran
      formulaTitle: "Proportion Formulations",
      formulaSmall: "Small Scale (1 kg):",
      formulaSmallDesc: "1 kg Organic waste + 20 ml EM4 + 20 ml Molasses + 2 Liters of water.",
      formulaMedium: "Medium Scale (5 kg):",
      formulaMediumDesc: "5 kg Organic waste + 100 ml EM4 + 100 ml Molasses + 10 Liters of water.",
      importantNote: "IMPORTANT: Always leave about 20 - 25% of empty space inside the fermentation bottle so that the fermentation gases have room and the container does not burst.",

      // Langkah Pembuatan
      stepsTitle: "LOF Production Steps",
      steps: [
        {
          title: "Chopping Organic Waste",
          desc: "Chop organic waste (leftover vegetable scraps or fruit skins) into small pieces. The smaller the chop size, the faster the decomposition process occurs."
        },
        {
          title: "Filling Main Vessel",
          desc: "Insert the chopped organic waste into the large plastic fermentation bottle."
        },
        {
          title: "Preparing Nutrient Solution",
          desc: "In a separate container (bucket), mix rice washing water, EM4, and Molasses. Stir with a paddle thoroughly until all ingredients are completely dissolved and mixed."
        },
        {
          title: "Combining Materials",
          desc: "Slowly pour the mixed water, EM4, and Molasses solution into the main bottle filled with organic waste."
        },
        {
          title: "Installing Gas Hose",
          desc: "Make a hole in the center of the large bottle cap (fermentation vessel) and the small bottle cap (gas escape bottle) using a nail or soldering iron. Insert the small plastic hose into the hole of the large cap, then seal the hose with hot glue to prevent gas leaks."
        },
        {
          title: "Connecting Waste Bottle",
          desc: "Fill the small bottle with clean water. Insert the other end of the hose coming from the large bottle into the small bottle until it is submerged in water, then close both bottles."
        },
        {
          title: "Fermentation & Stirring Process",
          desc: "Place the LOF bottle installation in a shady, cool place, away from direct sunlight. During the first week, shake the container gently on a regular basis so the fermentation process spreads evenly."
        },
        {
          title: "Filtering & Usage",
          desc: "After leaving it for 2-3 weeks, the LOF is ready to use. Filter the liquid using a strainer cloth to separate pure liquid LOF from its solid dregs. The remaining solid dregs can be further utilized as solid compost."
        }
      ],

      // Indikator Keberhasilan
      successIndicatorTitle: "Fermentation Success Indicators",
      indicatorHeader: "Indicator",
      successHeader: "Successful LOF",
      failureHeader: "Failed LOF",
      indicatorRows: [
        { name: "Aroma/Smell", success: "Fresh sour, similar to tape/fermentation aroma", failure: "Pungent rotten odor like garbage/sewage" },
        { name: "Color", success: "Yellowish brown to clear blackish brown", failure: "Dirty pitch black and slimy" },
        { name: "Gas / Foam", success: "Foam appears at the beginning, then decreases after ~2 weeks", failure: "Bottle keeps swelling tightly, excessive long-lasting foam" },
        { name: "Sediment", success: "Dregs settle at the bottom, top liquid is relatively clear", failure: "Dregs float at the top, thick muddy liquid" }
      ],

      // Cara Pengaplikasian
      applyTitle: "LOF Application Method & Guidelines",
      importantApplyNote: "Crucial Step Before Use: Never pour pure liquid LOF directly onto plants! First mix 10 - 20 ml of LOF (equivalent to 1 - 2 bottle caps) with 1 Liter of clean water, and stir well.",
      apply1Title: "1. Root Watering",
      apply1Desc: "Pour the mixed LOF solution around the root zone of the plant about 200 - 300 ml per hole/plant. Make sure the soil media is damp, do not let water pool.",
      apply2Title: "2. Leaf Spraying",
      apply2Desc: "Spray the mixed solution thinly and evenly on the underside of the leaves. Absorption of plant nutrients will run far more effectively through the leaf stomata.",
      frequency: "Frequency: Regularly once every 1 - 2 weeks.",
      timing: "Time: Morning (06:00-09:00) / Afternoon (16:00-18:00).",

      // Pengolahan TOGA
      togaDesc: "This section explains instructions for manual processing of harvested Family Medicinal Plants (TOGA) to safely treat everyday minor illnesses based on the KKN biotechnology handbook.",
      recipes: [
        {
          title: "Kencur Remedy (Traditional Cough Medicine)",
          badge: "Kaempferia Galanga",
          content: [
            { subtitle: "Method 1 (Practical):", text: "Take 5 grams of fresh kencur, wash clean under running water. Chew the kencur rhizome slowly until fine, then swallow the liquid directly." },
            { subtitle: "Method 2 (Juice & Honey):", text: "Grate 10 grams of washed fresh kencur, then squeeze the pulp using a clean cloth. Mix the kencur juice with an appropriate amount of honey. Drink this remedy all at once 3 times a day regularly (morning, afternoon, and evening)." }
          ]
        },
        {
          title: "Sambiloto Decoction (Fever Reducer)",
          badge: "Andrographis Paniculata",
          text: "Take a few sheets of fresh sambiloto leaves. Boil the sambiloto leaves with 2 glasses of clean water until the water shrinks and leaves only 1 glass of water. Strain the herbal decoction, let it cool to lukewarm, and drink immediately on a regular basis."
        },
        {
          title: "Kunyit Juice (Body Aches & Stomach Bloating)",
          badge: "Turmeric",
          text: "Peel the skin of turmeric rhizome as needed, then wash clean. Grate or mash the turmeric. Add 2 tablespoons of warm boiled water to the mashed turmeric, mix well. Squeeze the mixture using a cloth filter, collect the juice, and drink the warm juice regularly."
        },
        {
          title: "Sirih Water Remedy (Natural Itch Reliever)",
          badge: "Betel Leaf",
          text: "Pick 5-7 sheets of fresh betel leaves, wash clean. Squeeze the betel leaves in a sufficient amount of clean water and let sit for about 30 minutes until the water shrinks and changes color. Apply the betel leaf water to the itchy area of the body after bathing by patting gently."
        },
        {
          title: "Jahe & Sereh Decoction (Body Aches & Colds)",
          badge: "Ginger & Lemongrass",
          text: "Ingredients: 1 thumb of Red Ginger + 2 Lemongrass stalks + 1 Glass of water + 1 tbsp Brown Sugar + A pinch of Salt.",
          desc: "Preparation: Roast the ginger rhizome briefly then crush/bruise it. Bruise the lemongrass stalks as well. Boil the crushed ginger and lemongrass with a glass of water until boiling and slightly reduced. Add brown sugar and salt, stir until dissolved. Remove, let stand until lukewarm, strain, and drink warm in the morning and evening."
        }
      ],
      btnHalal: "HALAL GUIDE",
      halalTitle1: "Halal Critical Points for TOGA & LOF Materials",
      halalTitle2: "Free Halal Certification Registration Guide (SEHATI 2026)",
      halalDesc: "This section explains the halal aspect standardization in family medicinal plant cultivation and the self-certification procedures for Tingkir Lor residents under the SEHATI program by BPJPH.",
      halalCards: [
        {
          title: "🌿 Natural Materials & Herbals",
          desc: "Pure TOGA plants are fundamentally halal. Ensure washing with running water to cleanse soil contaminants or animal fertilizers."
        },
        {
          title: "🧪 LOF Fermentation Media",
          desc: "Use pure vegetable/fruit/plant waste. Avoid animal carcasses, blood, or additives (starters) without clear halal status."
        },
        {
          title: "🏺 Container & Tool Cleanliness",
          desc: "Ensure cutting tools, herbal processing containers, and fermentation barrels are free from any non-halal animal grease/fat residues."
        }
      ],
      halalStepsTitle: "SEHATI 2026 Registration Workflow (Free Halal Certification):",
      halalSteps: [
        {
          title: "Step 1 (Preparation)",
          desc: "Prepare ID Card (KTP), Business Registration Number (NIB for Micro/Small enterprise), and the list of raw ingredients for TOGA products."
        },
        {
          title: "Step 2 (Registration)",
          desc: "Create a business owner account on the official BPJPH SIHALAL portal (ptsp.halal.go.id)."
        },
        {
          title: "Step 3 (PPH Verification)",
          desc: "Facilitation & document inspection process by the Halal Product Process (PPH) assistant."
        },
        {
          title: "Step 4 (Certificate Issued)",
          desc: "MUI fatwa assembly decision & official Halal Certificate issuance by BPJPH."
        }
      ],
      btnSihalal: "Open SIHALAL BPJPH Portal"
    }
  };

  const t = language === 'en' ? content.en : content.id;

  return (
    <div className="min-h-screen bg-[#FBFCF8] text-[#1F2937] font-sans antialiased selection:bg-[#E0F2FE] selection:text-[#0369A1] pb-24 md:pb-8">
      
      {/* Global Navbar */}
      <Navbar token={token} user={user} logout={logout} />

      {/* MAIN CONTENT AREA */}
      <main className="max-w-3xl mx-auto px-4 py-8">

        {/* HERO SECTION */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D1FAE5] text-[#065F46] text-[10px] font-bold font-mono tracking-wide uppercase mb-3">
            <Sparkles className="w-3 h-3" /> {t.badge}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#111827] leading-tight">
            {t.title}
          </h1>
          <p className="mt-3 text-xs md:text-sm text-[#4B5563] max-w-xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>

          {/* Sub Tab Switcher */}
          <div className="mt-8 flex justify-center p-1 bg-[#F3F4F6] rounded-xl max-w-md mx-auto shadow-sm">
            <button
              onClick={() => setActiveSubTab('poc')}
              className={`flex-1 py-2 px-2 text-xs font-bold rounded-lg transition-all duration-200 uppercase tracking-wider font-mono flex items-center justify-center gap-1.5 cursor-pointer ${
                activeSubTab === 'poc'
                  ? 'bg-white text-[#111827] shadow-sm'
                  : 'text-[#4B5563] hover:text-[#111827]'
              }`}
            >
              <Droplets className="w-4 h-4 text-[#10B981]" />
              <span className="hidden sm:inline">{t.btnPoc}</span>
              <span className="sm:hidden">POC</span>
            </button>
            <button
              onClick={() => setActiveSubTab('toga')}
              className={`flex-1 py-2 px-2 text-xs font-bold rounded-lg transition-all duration-200 uppercase tracking-wider font-mono flex items-center justify-center gap-1.5 cursor-pointer ${
                activeSubTab === 'toga'
                  ? 'bg-white text-[#111827] shadow-sm'
                  : 'text-[#4B5563] hover:text-[#111827]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#3B82F6]" />
              <span className="hidden sm:inline">{t.btnToga}</span>
              <span className="sm:hidden">TOGA</span>
            </button>
            <button
              onClick={() => setActiveSubTab('halal')}
              className={`flex-1 py-2 px-2 text-xs font-bold rounded-lg transition-all duration-200 uppercase tracking-wider font-mono flex items-center justify-center gap-1.5 cursor-pointer ${
                activeSubTab === 'halal'
                  ? 'bg-white text-[#111827] shadow-sm'
                  : 'text-[#4B5563] hover:text-[#111827]'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">{t.btnHalal}</span>
              <span className="sm:hidden">HALAL</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PANDUAN POC (PUPUK ORGANIK CAIR) */}
        {/* ========================================================================= */}
        {activeSubTab === 'poc' && (
          <div className="space-y-12">
            
            {/* INTRO */}
            <div className="prose prose-slate max-w-none text-[#4B5563] leading-relaxed text-xs md:text-sm">
              <p>{t.pocDesc}</p>
            </div>

            {/* ALAT DAN BAHAN */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-sm md:text-base font-bold text-[#111827] mb-4 flex items-center gap-2">
                <Beaker className="w-5 h-5 text-[#10B981]" />
                {t.toolsTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div>
                  <h3 className="font-bold text-[#374151] mb-2.5 font-mono uppercase tracking-wider text-[10px]">{t.toolsHeader}</h3>
                  <ul className="space-y-2 list-disc list-inside text-[#4B5563]">
                    {t.toolsList.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#374151] mb-2.5 font-mono uppercase tracking-wider text-[10px]">{t.materialsHeader}</h3>
                  <ul className="space-y-2 list-disc list-inside text-[#4B5563]">
                    {t.materialsList.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* PERBANDINGAN TAKARAN */}
            <div className="bg-gradient-to-r from-[#F0FDF4] to-[#ECFDF5] rounded-2xl border border-[#D1FAE5] p-6">
              <h2 className="text-sm md:text-base font-bold text-[#065F46] mb-4 flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#10B981]" />
                {t.formulaTitle}
              </h2>
              <div className="space-y-4 text-xs text-[#065F46]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/60 p-4 rounded-xl border border-[#A7F3D0]/50">
                    <p className="font-bold text-xs mb-1">{t.formulaSmall}</p>
                    <p className="text-xs font-medium">{t.formulaSmallDesc}</p>
                  </div>
                  <div className="bg-white/60 p-4 rounded-xl border border-[#A7F3D0]/50">
                    <p className="font-bold text-xs mb-1">{t.formulaMedium}</p>
                    <p className="text-xs font-medium">{t.formulaMediumDesc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] p-4 rounded-xl text-xs mt-3">
                  <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>{t.importantNote}</p>
                </div>
              </div>
            </div>

            {/* LANGKAH-LANGKAH PEMBUATAN */}
            <div>
              <h2 className="text-base md:text-lg font-extrabold text-[#111827] mb-6">{t.stepsTitle}</h2>
              <ol className="space-y-8">
                {t.steps.map((step, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 bg-emerald-100 text-emerald-700 font-bold rounded-full h-8 w-8 flex items-center justify-center font-mono">
                      {idx + 1}
                    </div>
                    <div className="pt-0.5 flex-grow">
                      <h3 className="font-bold text-[#111827] text-sm">{step.title}</h3>
                      <p className="text-xs text-[#4B5563] mt-1 leading-relaxed">{step.desc}</p>
                      
                      {/* Responsive Image Placeholders (Shown for steps 1, 3, 6) */}
                      {idx === 0 && (
                        <img 
                          src="/assets/panduan_poc_step1.jpg" 
                          onError={(e) => { e.target.src = "https://www.asterra.id/wp-content/uploads/2024/11/steptodown.com913473-1-scaled.jpg"; }}
                          alt="Step 1" 
                          className="w-full h-auto max-h-60 rounded-xl shadow-sm object-cover my-4" 
                        />
                      )}
                      {idx === 2 && (
                        <img 
                          src="/assets/panduan_poc_step3.jpg" 
                          onError={(e) => { e.target.src = "https://rricoid-assets.obs.ap-southeast-4.myhuaweicloud.com/berita/Biak/o/1744760344090-CUCIAN_BERAS_-_istockphoto/61g4gtwk5k7vumj.jpeg"; }}
                          alt="Step 3" 
                          className="w-full h-auto max-h-60 rounded-xl shadow-sm object-cover my-4" 
                        />
                      )}
                      {idx === 5 && (
                        <img 
                          src="/assets/panduan_poc_step6.jpg" 
                          onError={(e) => { e.target.src = "https://infoparlemen.com/wp-content/uploads/2022/02/0602-BDG-GBKP-Bandung-Timur-Sukseskan-Sasaran-Pelayanan-Kreatif-Merawat-Lingkungan-3.jpg"; }}
                          alt="Step 6" 
                          className="w-full h-auto max-h-60 rounded-xl shadow-sm object-cover my-4" 
                        />
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* INDIKATOR KEBERHASILAN (TABEL) */}
            <div>
              <h2 className="text-sm md:text-base font-bold text-[#111827] mb-4">{t.successIndicatorTitle}</h2>
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-xs text-left text-gray-500">
                  <thead className="text-[10px] text-gray-700 uppercase bg-gray-50 font-mono">
                    <tr>
                      <th scope="col" className="px-4 py-3">{t.indicatorHeader}</th>
                      <th scope="col" className="px-4 py-3 text-emerald-700 bg-emerald-50">{t.successHeader}</th>
                      <th scope="col" className="px-4 py-3 text-rose-700 bg-rose-50">{t.failureHeader}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-150">
                    {t.indicatorRows.map((row, idx) => (
                      <tr key={idx}>
                        <th className="px-4 py-3 font-semibold text-gray-900 bg-gray-50">{row.name}</th>
                        <td className="px-4 py-3 text-emerald-800 bg-emerald-50/30">{row.success}</td>
                        <td className="px-4 py-3 text-rose-800 bg-rose-50/30">{row.failure}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* CARA PENGAPLIKASIAN */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
              <h2 className="text-sm md:text-base font-bold text-[#111827] flex items-center gap-2">
                <Timer className="w-5 h-5 text-blue-500" />
                {t.applyTitle}
              </h2>
              
              <div className="text-xs text-[#4B5563] space-y-3 leading-relaxed">
                <div className="p-3.5 bg-blue-50 border border-blue-100 text-blue-800 rounded-xl">
                  <p className="font-bold">{t.importantApplyNote}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="border border-gray-100 p-4 rounded-xl">
                    <p className="font-bold text-gray-800 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-blue-500" />
                      {t.apply1Title}
                    </p>
                    <p className="mt-1.5 text-[11px] leading-relaxed">{t.apply1Desc}</p>
                  </div>
                  <div className="border border-gray-100 p-4 rounded-xl">
                    <p className="font-bold text-gray-800 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-blue-500" />
                      {t.apply2Title}
                    </p>
                    <p className="mt-1.5 text-[11px] leading-relaxed">{t.apply2Desc}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 font-mono text-[10px]">
                  <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{t.frequency}</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-2">
                    <Timer className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{t.timing}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* PENGOLAHAN TANAMAN OBAT KELUARGA (TOGA) */}
        {/* ========================================================================= */}
        {activeSubTab === 'toga' && (
          <div className="space-y-12">
            
            {/* INTRO */}
            <div className="prose prose-slate max-w-none text-[#4B5563] leading-relaxed text-xs md:text-sm">
              <p>{t.togaDesc}</p>
            </div>

            {/* RECIPES */}
            <div className="space-y-6">
              {t.recipes.map((recipe, idx) => (
                <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#111827] text-sm md:text-base">{recipe.title}</h3>
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 font-mono text-[9px] font-bold rounded-full uppercase tracking-wider">
                      {recipe.badge}
                    </span>
                  </div>
                  
                  {recipe.content ? (
                    <div className="mt-4 text-xs text-[#4B5563] space-y-3">
                      {recipe.content.map((c, cIdx) => (
                        <div key={cIdx} className={cIdx > 0 ? "border-t border-gray-100 pt-3" : ""}>
                          <p className="font-bold text-gray-800">{c.subtitle}</p>
                          <p className="mt-0.5 leading-relaxed">{c.text}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-3 text-xs text-[#4B5563] leading-relaxed space-y-2">
                      {recipe.text && <p className="font-bold text-gray-800">{recipe.text}</p>}
                      {recipe.desc && <p className="text-gray-600 border-t border-gray-100 pt-2">{recipe.desc}</p>}
                      {!recipe.text && !recipe.desc && <p>{recipe.text || recipe.desc}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* PANDUAN HALAL */}
        {/* ========================================================================= */}
        {activeSubTab === 'halal' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            
            {/* INTRO */}
            <div className="prose prose-slate max-w-none text-[#4B5563] leading-relaxed text-xs md:text-sm">
              <p>{t.halalDesc}</p>
            </div>

            {/* PART 1: Titik Kritis Kehalalan */}
            <div>
              <h2 className="text-sm md:text-base font-extrabold text-[#111827] mb-4 flex items-center gap-2 border-b border-gray-150 pb-2 font-sans uppercase tracking-wide">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                {t.halalTitle1}
              </h2>
              
              <div className="grid grid-cols-1 gap-4">
                {t.halalCards.map((card, idx) => (
                  <div key={idx} className="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4">
                    <div className="flex-grow text-xs md:text-sm">
                      <h4 className="font-bold text-gray-800 text-sm mb-1.5">{card.title}</h4>
                      <p className="text-gray-500 leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PART 2: Sertifikasi Halal Gratis (SEHATI) */}
            <div>
              <h2 className="text-sm md:text-base font-extrabold text-[#111827] mb-5 flex items-center gap-2 border-b border-gray-150 pb-2 font-sans uppercase tracking-wide">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                {t.halalTitle2}
              </h2>

              {/* Timeline Flow */}
              <div className="relative border-l border-emerald-100 ml-3 space-y-6">
                {t.halalSteps.map((step, idx) => (
                  <div key={idx} className="relative pl-6">
                    {/* Circle Node indicator */}
                    <div className="absolute -left-[9px] top-1 w-[18px] h-[18px] rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center font-mono text-[9px] font-bold text-emerald-600">
                      {idx + 1}
                    </div>
                    <div className="text-xs md:text-sm">
                      <h4 className="font-bold text-gray-800 text-sm">{step.title}</h4>
                      <p className="text-gray-500 mt-1 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* SIHALAL Portal Button */}
              <div className="mt-8 flex justify-center">
                <a 
                  href="https://ptsp.halal.go.id" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#10151C] hover:bg-emerald-600 active:bg-emerald-700 text-white font-mono text-xs font-bold uppercase tracking-wider py-4.5 px-8 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg hover:shadow-emerald-950/10 cursor-pointer"
                >
                  <span>{t.btnSihalal}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
