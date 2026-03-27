<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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
            SiteSetting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
