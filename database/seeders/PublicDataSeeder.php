<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\SiteSetting;
use App\Models\Lembaga;
use App\Models\PpdbSetting;
use App\Models\PpdbExample;

class PublicDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            SiteSettingSeeder::class,
            LembagaSeeder::class,
            PpdbSettingSeeder::class,
            PpdbExampleSeeder::class,
        ]);
    }
}
