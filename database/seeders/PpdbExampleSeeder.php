<?php

namespace Database\Seeders;

use App\Models\PpdbExample;
use Illuminate\Database\Seeder;

class PpdbExampleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $examples = [
            'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?auto=format&fit=crop&q=80&w=800',
        ];

        foreach ($examples as $img) {
            PpdbExample::updateOrCreate(['image' => $img]);
        }
    }
}
