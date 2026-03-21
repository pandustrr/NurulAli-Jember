<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\SiteSetting;
use App\Models\Lembaga;
use App\Models\PpdbSetting;

class PublicDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Site Settings
        $settings = [
            'school_name' => 'Pondok Pesantren Nurul Ali',
            'vision' => 'Menjadi lembaga pendidikan Islam terkemuka yang melahirkan generasi berakhlak mulia, cerdas, dan mandiri berlandaskan Al-Qur\'an dan Sunnah.',
            'mission' => json_encode([
                'Menyelenggarakan pendidikan tahfizh Al-Qur\'an dengan metode yang efektif.',
                'Membina karakter santri melalui pembiasaan ibadah dan akhlak islami.',
                'Mengembangkan potensi akademik dan kewirausahaan santri.',
                'Menjalin ukhuwah islamiyah dengan masyarakat sekitar.'
            ]),
            'history' => 'Pondok Pesantren Nurul Ali didirikan dengan semangat untuk memberikan akses pendidikan Islam yang berkualitas bagi masyarakat Jember dan sekitarnya. Berawal dari sebuah majelis ta\'lim kecil, kini Nurul Ali terus berkembang menjadi pusat peradaban ilmu yang inklusiv dan modern namun tetap memegang teguh nilai-nilai kepesantrenan.',
            'email' => 'info@nurulali.sch.id',
            'phone' => '+62 812-3499-2811',
            'address' => 'Jl. Bringin No. 12, Sumberbulus, Ledokombo, Jember, Jawa Timur',
            'maps_link' => 'https://maps.google.com/maps?q=YAYASAN+NURUL+ALI+JEMBER&output=embed',
        ];

        foreach ($settings as $key => $value) {
            SiteSetting::create(['key' => $key, 'value' => $value]);
        }

        // Lembaga
        $lembagas = [
            [
                'title' => 'Tahfidz Al-Qur\'an',
                'description' => 'Program unggulan menghafal Al-Qur\'an 30 Juz dengan mutqin.',
                'detailed_description' => "Program Tahfidz Al-Qur'an di Pondok Pesantren Nurul Ali menggunakan metode Tikrar dan Talaqqi yang terstruktur. \n\nFasilitas:\n- Kamar khusus Tahfidz\n- Halaqah intensif 3 kali sehari\n- Sertifikat Hafizh 30 Juz\n- Pengajarn bersanad mutqin.",
                'image' => 'https://images.unsplash.com/photo-1585036156171-3839efc2296c?auto=format&fit=crop&q=80&w=800',
            ],
            [
                'title' => 'Madrasah Tsanawiyah (MTs)',
                'description' => 'Setara SMP dengan kurikulum nasional terintegrasi pendidikan keislaman.',
                'detailed_description' => "MTs Nurul Ali mengombinasikan Kurikulum Merdeka dengan kurikulum pesantren yang kuat. Fokus pada pembentukan karakter remaja dan dasar-dasar ilmu syar'i.\n\nEkstrakurikuler:\n- Pramuka Islam\n- Robotik\n- English Club\n- Arabic Club",
                'image' => 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800',
            ],
            [
                'title' => 'Madrasah Aliyah (MA)',
                'description' => 'Setara SMA dengan tiga jurusan: IPA, IPS, dan Keagamaan.',
                'detailed_description' => "MA Nurul Ali mempersiapkan santri untuk melanjutkan pendidikan ke perguruan tinggi ternama di dalam maupun luar negeri (seperti Al-Azhar Mesir atau Madinah).\n\nProgram Unggulan:\n- Bimbingan UTBK Intensif\n- Persiapan Da'i Muda\n- Karya Tulis Ilmiah Santri",
                'image' => 'https://images.unsplash.com/photo-1523050335392-9bc56753f77c?auto=format&fit=crop&q=80&w=800',
            ],
            [
                'title' => 'Ma\'had Bahasa',
                'description' => 'Program intensif Bahasa Arab dan Inggris tingkat lanjut.',
                'detailed_description' => "Ma'had Bahasa adalah lingkungan wajib bicara (Arabic & English area) yang membantu santri menguasai bahasa internasional secara aktif.\n\nTarget Output:\n- Skor TOEFL/IELTS Tinggi\n- Lancar Berpidato 2 Bahasa\n- Mampu Membaca Kitab Turats Tanpa Harakat",
                'image' => 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800',
            ],
            [
                'title' => 'Kegiatan Keagamaan',
                'description' => 'Pembiasaan ibadah harian dan kajian kitab kuning klasik.',
                'detailed_description' => "Kegiatan harian santri dirancang untuk membangun kedekatan spiritual dengan Allah SWT melalui dzikir, sholawat, dan kajian kitab-kitab muktabar.\n\nKegiatan Rutin:\n- Bahtsul Masail\n- Pembacaan Diba' dan Barzanji\n- Puasa Sunnah Berjamaah",
                'image' => 'https://images.unsplash.com/photo-1596193433486-02333accdc13?auto=format&fit=crop&q=80&w=800',
            ],
            [
                'title' => 'Organisasi Santri (OSIS)',
                'description' => 'Wadah pengembangan kepemimpinan dan manajemen organisasi santri.',
                'detailed_description' => "Melalui OSIS, santri diajarkan cara memimpin, bekerja sama dalam tim, dan mengelola berbagai agenda besar pesantren.\n\nDepartemen:\n- Departemen Dakwah\n- Departemen Olahraga\n- Departemen Kedisiplinan\n- Departemen Kebersihan",
                'image' => 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=800',
            ],
        ];

        foreach ($lembagas as $lembaga) {
            Lembaga::create($lembaga);
        }

        // PPDB Settings
        $ppdb = [
            'schedule' => json_encode([
                ['label' => 'Gelombang I', 'date' => '1 Januari - 28 Februari 2026', 'active' => false],
                ['label' => 'Gelombang II', 'date' => '1 Maret - 30 April 2026', 'active' => true],
                ['label' => 'Gelombang III', 'date' => '1 Mei - 30 Juni 2026', 'active' => false],
            ]),
            'requirements' => json_encode([
                'Fotokopi Akta Kelahiran (2 lembar)',
                'Fotokopi Kartu Keluarga (2 lembar)',
                'Fotokopi Ijazah/SKHUN terlegalisir (2 lembar)',
                'Pas foto 3x4 berlatar merah (4 lembar)',
                'Surat Rekomendasi dari sekolah asal',
                'Surat pernyataan kesanggupan orang tua',
                'Mengisi formulir pendaftaran online',
            ]),
            'fees' => json_encode([
                ['label' => 'Uang Pangkal', 'price' => 'Rp 3.500.000'],
                ['label' => 'SPP Bulanan', 'price' => 'Rp 850.000 / bulan'],
                ['label' => 'Biaya Asrama', 'price' => 'Rp 500.000 / bulan'],
                ['label' => 'Biaya Seragam', 'price' => 'Rp 750.000'],
            ]),
            'faqs' => json_encode([
                ['q' => "Kapan pendaftaran santri baru dibuka?", 'a' => "Pendaftaran Gelombang 1 dibuka mulai Januari hingga Maret..."],
                ['q' => "Apa saja syarat masuk Ponpes Nurul Ali?", 'a' => "Syarat utama meliputi ijazah terakhir, akta kelahiran..."],
                ['q' => "Apakah ada program beasiswa?", 'a' => "Ya, kami menyediakan beasiswa bagi santri berprestasi..."],
            ]),
        ];

        foreach ($ppdb as $key => $value) {
            PpdbSetting::create(['key' => $key, 'value' => $value]);
        }
    }
}
