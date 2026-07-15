# app/seed_plants.py
import asyncio
from sqlalchemy.future import select
from app.core.database import AsyncSessionLocal
from app.models.plant import Plant, PlantType  # Pastikan path model sesuai dengan backend lu

async def seed_plants():
    print("⏳ Menghubungkan ke Neon DB untuk seeding 10 data TOGA asli...")
    
    # Dataset asli dari frontend Nicholas
    plants_data = [
        {
            "name": "Jahe Merah",
            "latinName": "Zingiber officinale var. rubrum",
            "type": "toga",
            "image": "https://d4tlm.umsida.ac.id/wp-content/uploads/2025/09/ChatGPT-Image-Sep-29-2025-11_05_41-AM_11zon.jpg",
            "modules": {
                "khasiat": "Jahe merah kaya akan kandungan gingerol dan shogaol yang tinggi. Bermanfaat besar untuk meningkatkan daya tahan tubuh (imunomodulator), meredakan peradangan sendi (anti-inflamasi), meredakan batuk kering, serta menghangatkan tubuh.",
                "poc": "Gunakan Formula POC Fermentasi Urin Kelinci: Campurkan 1 liter POC dengan 15 liter air bersih. Tambahkan EM4 pertanian 10 ml sebagai agen mikroba aktif untuk memaksimalkan nutrisi nitrogen.",
                "aturan": "Siramkan larutan POC di sekitar perakaran Jahe Merah sebanyak 250ml per bedeng tanaman. Lakukan secara rutin setiap 1 minggu sekali pada pagi hari (pukul 07.00 - 09.00).",
                "sejarah": "Jahe Merah telah digunakan secara turun-temurun sejak kerajaan Hindu-Buddha di Nusantara sebagai jamu penghangat badan bagi para prajurit kerajaan sebelum maju ke medan perang."
            }
        },
        {
            "name": "Kunyit",
            "latinName": "Curcuma longa",
            "type": "toga",
            "image": "https://www.masjidalakbar.or.id/wp-content/uploads/2024/09/kunyit.jpg",
            "modules": {
                "khasiat": "Kandungan kurkumin yang melimpah memberikan warna kuning khas dan bertindak sebagai antioxiddan kuat. Efektif meredakan gangguan pencernaan (maag/dispepsia), memelihara fungsi hati, serta menurunkan kolesterol jahat.",
                "poc": "Formula POC Air Cucian Beras (Leri): Campurkan 500ml POC leri yang difermentasi dengan 10 liter air. Larutan ini kaya unsur fosfor untuk merangsang rimpang kunyit agar tumbuh lebat.",
                "aturan": "Semprotkan halus pada daun dan kocor di pangkat tanaman sebanyak 200ml per tanaman. Lakukan setiap 10 hari sekali pada sore hari (pukul 16.00 - 17.30).",
                "sejarah": "Tercatat dalam manuskrip kuno Jawa Serat Centhini sebagai ramuan jamu kunyit asam yang dikonsumsi oleh keluarga keraton untuk menjaga kesegaran tubuh dan kesehatan kulit."
            }
        },
        {
            "name": "Lidah Buaya",
            "latinName": "Aloe vera",
            "type": "toga",
            "image": "https://images.alodokter.com/dk0z4ums3/image/upload/v1653967589/attached_image/kenali-manfaat-lidah-buaya-untuk-jerawat-dan-cara-penggunaannya-0-alodokter.jpg",
            "modules": {
                "khasiat": "Gel lidah buaya mengandung aloin, enzim pembantu pencernaan, serta asam amino esensial. Sangat baik untuk mempercepat penyembuhan luka bakar ringan, meredakan iritasi kulit, serta melembapkan rambut secara alami.",
                "poc": "Formula POC Berbasis Sabut Kelapa: Encerkan 1 liter POC sabut kelapa (tinggi kalium) dengan 20 liter air. Sangat baik untuk mempertebal jaringan gel pada pelepah lidah buaya.",
                "aturan": "Kocorkan langsung ke media tanah di sekitar pangkal tanaman sebanyak 300ml. Hindari menyiram langsung ke sela-sela pelepah daun. Lakukan setiap 2 minggu sekali.",
                "sejarah": "Lidah Buaya dibawa oleh para pelaut kuno dari daerah beriklim kering Afrika Utara dan dibudidayakan di pekarangan rumah masyarakat Jawa sejak abad ke-19 sebagai pertolongan pertama luka luar."
            }
        },
        {
            "name": "Temulawak",
            "latinName": "Curcuma xanthorrhiza",
            "type": "toga",
            "image": "https://almaata.ac.id/wp-content/uploads/2025/05/assortment-ginger-wooden-board-1-1536x1025.jpg",
            "modules": {
                "khasiat": "Temulawak merupakan herba asli Indonesia yang mengandung kurkuminoid dan xanthorrhizol. Bermanfaat untuk meningkatkan nafsu makan (terutama pada anak-anak), mengatasi gangguan empedu, serta mencegah radang lambung.",
                "poc": "Formula POC Kotoran Kambing & Kompos Hijau: Campurkan 1 liter POC dengan 10 liter air. Kaya akan kalium dan nitrogen organik untuk mengoptimalkan pertumbuhan daun lebar temulawak.",
                "aturan": "Kocor tanah di sekitar bedeng temulawak sebanyak 250ml per lubang tanam. Aplikasikan setiap 1 minggu sekali pada pagi hari sebelum sinar matahari terlalu terik.",
                "sejarah": "Merupakan tanaman obat unggulan nasional yang telah dinobatkan sebagai 'Indonesian Ginseng' karena khasiat multimanfaatnya yang menyamai pamor ginseng Asia Timur."
            }
        },
        {
            "name": "Kencur",
            "latinName": "Kaempferia galanga",
            "type": "toga",
            "image": "https://umsu.ac.id/health/wp-content/uploads/2023/08/Manfaat-Kencur-untuk-Kesehatan-1140x570.jpg",
            "modules": {
                "khasiat": "Kencur memiliki kandungan minyak atsiri (sineol dan asam metil kanil) yang memberikan aroma harum yang khas. Berkhasiat meredakan batuk berdahak, mengatasi masuk angin, menghilangkan pegal linu, serta melegakan tenggorokan.",
                "poc": "Formula POC Kulit Bawang Merah & Air Kelapa: Encerkan 500ml POC kulit bawang (kaya ZPT alami/auksin) dengan 12 liter air bersih untuk mempercepat pertumbuhan tunas kencur.",
                "aturan": "Siramkan ke area media tumbuh kencur sebanyak 150ml per rumpun tanaman kecil. Lakukan penyiraman setiap 7-10 hari sekali.",
                "sejarah": "Menjadi bahan utama ramuan beras kencur, minuman penyegar tradisional yang biasa dijajakan oleh penjual jamu gendong sejak zaman Kerajaan Majapahit untuk memulihkan kebugaran para petani."
            }
        },
        {
            "name": "Lengkuas",
            "latinName": "Alpinia galanga",
            "type": "toga",
            "image": "https://r2media.ciputrahospital.com/2026/01/11080725/Manfaat-Lengkuas-1024x683.jpg",
            "modules": {
                "khasiat": "Mengandung senyawa galangin, beta-sitosterol, dan flavonoid. Berguna sebagai antijamur alami (mengobati penyakit kulit seperti panu), meredakan diare, serta mencegah infeksi bakteri patogen dalam tubuh.",
                "poc": "Formula POC Jerami & Kompos Daun Bambu: Campurkan 1 liter POC jerami (kaya silika) dengan 15 liter air bersih. Berguna mengokohkan batang lengkuas agar tumbuh tegak dan tidak mudah rebah.",
                "aturan": "Kocor langsung di sekeliling rumpun lengkuas sebanyak 350ml per rumpun dewasa. Aplikasikan setiap 2 minggu sekali.",
                "sejarah": "Lengkuas tercatat dalam sejarah rempah dunia sebagai komoditas ekspor berharga tinggi yang diperdagangkan dari pelabuhan Nusantara hingga ke Timur Tengah dan Eropa abad pertengahan."
            }
        },
        {
            "name": "Sambiloto",
            "latinName": "Andrographis paniculata",
            "type": "toga",
            "image": "https://cnc-magazine.oramiland.com/parenting/images/suplemen_daun_sambiloto.width-800.format-webp.webp",
            "modules": {
                "khasiat": "Sambiloto dikenal sebagai 'Raja Pahit' yang sangat efektif menurunkan demam (antipiretik), meredakan peradangan tenggorokan, meningkatkan sistem imun, serta menstabilkan kadar gula darah.",
                "poc": "Formula POC Berbasis Daun Kelor: Campurkan 1 liter POC kelor yang tinggi asam amino dengan 12 liter air untuk merangsang kekebalan alami daun sambiloto dari serangan hama ulat daun.",
                "aturan": "Siramkan ke tanah perakaran sambiloto sebanyak 200ml per tanaman setiap 10 hari sekali pada sore hari.",
                "sejarah": "Sambiloto telah lama tercatat dalam sistem pengobatan tradisional Ayurveda India dan jamu Nusantara sebagai tanaman pertahanan utama saat terjadi wabah demam musiman."
            }
        },
        {
            "name": "Kumis Kucing",
            "latinName": "Orthosiphon aristatus",
            "type": "toga",
            "image": "https://akcdn.detik.net.id/community/media/visual/2019/07/12/04f04fa3-0bd6-4be6-a202-319a985df583_43.jpeg?w=700&q=90",
            "modules": {
                "khasiat": "Memiliki sifat diuretik alami yang kuat. Sangat membantu melancarkan pembuangan air kecil, meluruhkan batu ginjal, meredakan gejala asam urat, serta menurunkan tekanan darah tinggi.",
                "poc": "Formula POC Cangkang Telur & Kompos: Campurkan 1 liter air rendaman cangkang telur fermentasi (tinggi kalsium) dengan 15 liter air bersih untuk memperkuat struktur batang kumis kucing.",
                "aturan": "Siramkan 250ml per rumpun tanaman. Hindari kondisi tanah yang terlalu tergenang air. Lakukan rutin setiap 1 minggu sekali pada pagi hari.",
                "sejarah": "Berasal dari wilayah Asia Tenggara, tanaman ini dijuluki 'Java Tea' oleh para penjajah Belanda yang mengekspornya ke Eropa sebagai obat herbal saluran kemih sejak abad ke-18."
            }
        },
        {
            "name": "Daun Sirih",
            "latinName": "Piper betle",
            "type": "toga",
            "image": "https://mentengfarma.com/cdn/shop/articles/089444400_1706924920-shutterstock_2312516329.jpg?v=1738056722",
            "modules": {
                "khasiat": "Mengandung zat antiseptik, anti-bakteri, dan kavikol yang tinggi. Sangat efektif untuk menghentikan mimisan secara tradisional, menjaga kebersihan rongga mulut, serta mengobati keputihan pada wanita.",
                "poc": "Formula POC Air Cucian Beras & Kulit Pisang: Campurkan 1 liter POC dengan 12 liter air bersih guna memicu pertumbuhan mikroba tanah yang baik untuk tanaman merambat.",
                "aturan": "Semprotkan merata ke tiang panjatan dan permukaan daun sirih sebanyak 200ml. Terapkan secara berkala 1 minggu sekali.",
                "sejarah": "Mengunyah sirih (menyirih) telah menjadi bagian penting ritual kultural serta simbolisasi penghormatan tamu agung di tanah Nusantara selama ribuan tahun."
            }
        },
        {
            "name": "Sereh",
            "latinName": "Cymbopogon nardus",
            "type": "toga",
            "image": "https://puskesmasmeninting-dikes.lombokbaratkab.go.id/media/crop/2025/03/12/57-20250312-133446-273518.jpg",
            "modules": {
                "khasiat": "Mengandung senyawa aktif sitronela tinggi yang berfungsi sebagai penolak nyamuk alami, meredakan stres, meredakan kram perut, dan memiliki sifat detoksifikasi racun tubuh.",
                "poc": "Formula POC Hasil Kompos Hijau: Encerkan 1 liter POC dengan 10 liter air jernih untuk merangsang rimbunnya pertumbuhan tunas baru pada rumpun sereh.",
                "aturan": "Siramkan langsung di sekitar pangkal rumpun tanaman sebanyak 300ml. Aplikasikan secara rutin setiap 5-7 hari sekali.",
                "sejarah": "Banyak dibudidayakan di perkarangan rumah penduduk pedesaan Jawa sebagai tanaman pembatas sekaligus benteng penolak hama pengganggu alami."
            }
        }
    ]

    async with AsyncSessionLocal() as session:
        async with session.begin():
            for p in plants_data:
                # Menghindari duplikasi entry data nama tanaman
                result = await session.execute(select(Plant).where(Plant.name == p["name"]))
                existing = result.scalar_one_or_none()
                
                # Menggabungkan modul panduan poc dan aturan pakai untuk kolom DB tunggal
                combined_poc = f"{p['modules']['poc']}\n\nAturan Pakai: {p['modules']['aturan']}"
                
                if existing:
                    # Jalur update jika data dengan nama tersebut sudah ada di tabel Neon
                    existing.latin_name = p.get("latinName")
                    existing.image_url = p.get("image")
                    existing.medical_benefit = p["modules"]["khasiat"]
                    existing.historical_funfact = p["modules"]["sejarah"]
                    existing.poc_dosage_guideline = combined_poc
                    print(f"🔄 Mengupdate data untuk: {p['name']}")
                    continue
                
                # Jalur insert baru
                new_plant = Plant(
                    name=p["name"],
                    latin_name=p.get("latinName"),
                    image_url=p.get("image"),
                    type=PlantType.toga,
                    medical_benefit=p["modules"]["khasiat"],
                    historical_funfact=p["modules"]["sejarah"],
                    poc_dosage_guideline=combined_poc
                )
                session.add(new_plant)
                print(f"   + Menambahkan ke DB: {p['name']}")
                
    print("\n🚀 SEEDING 10 DATA TOGA ASLI BERHASIL DISINKRONISASI KE NEON DB!")

if __name__ == "__main__":
    asyncio.run(seed_plants())