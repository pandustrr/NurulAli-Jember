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
            'phone' => '+62 812-3456-7890',
            'address' => 'Jl. Pendidikan No. 123, Jember, Jawa Timur',
            'maps_link' => 'https://maps.google.com',
        ];

        foreach ($settings as $key => $value) {
            SiteSetting::create(['key' => $key, 'value' => $value]);
        }

        // Lembaga
        $lembagas = [
            [
                'title' => 'Tahfidz Al-Qur\'an',
                'description' => 'Program unggulan menghafal Al-Qur\'an 30 Juz dengan mutqin. Menggunakan metode mutakhir yang memudahkan santri.',
                'icon' => '📖',
                'color' => 'bg-emerald-50 text-emerald-600'
            ],
            [
                'title' => 'Madrasah Tsanawiyah (MTs)',
                'description' => 'Setara SMP dengan kurikulum nasional terintegrasi pendidikan keislaman. Akreditasi A dari Kemenag.',
                'icon' => '🎓',
                'color' => 'bg-orange-50 text-orange-600'
            ],
            [
                'title' => 'Madrasah Aliyah (MA)',
                'description' => 'Setara SMA dengan tiga jurusan: IPA, IPS, dan Keagamaan. Lulusan siap kuliah dalam & luar negeri.',
                'icon' => '🏫',
                'color' => 'bg-blue-50 text-blue-600'
            ],
            [
                'title' => 'Ma\'had Bahasa',
                'description' => 'Program intensif Bahasa Arab dan Inggris untuk mempersiapkan santri bersaing di tingkat global.',
                'icon' => '🌐',
                'color' => 'bg-purple-50 text-purple-600'
            ],
            [
                'title' => 'Kegiatan Keagamaan',
                'description' => 'Sholat berjamaah, kajian kitab kuning, muhadharah, hadroh, dan berbagai kegiatan spiritual.',
                'icon' => '🌙',
                'color' => 'bg-rose-50 text-rose-600'
            ],
            [
                'title' => 'Organisasi Santri (OSIS)',
                'description' => 'Wadah pengembangan kepemimpinan, bakat, dan kreativitas santri melalui berbagai kegiatan organisasi.',
                'icon' => '👥',
                'color' => 'bg-amber-50 text-amber-600'
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
