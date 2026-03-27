<?php

namespace Database\Seeders;

use App\Models\PpdbSetting;
use Illuminate\Database\Seeder;

class PpdbSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ppdb = [
            'ppdb_info' => "Pendaftaran Santri Baru Pondok Pesantren Nurul Ali Jember dilakukan secara online melalui website ini.\n\nAlur Pendaftaran:\n1. Mengisi formulir pendaftaran pada halaman 'Pendaftaran'.\n2. Melakukan konfirmasi pembayaran biaya pendaftaran.\n3. Mengunggah berkas persyaratan (Akta, KK, Ijazah).\n4. Mengikuti tes seleksi (Wawancara & Baca Tulis Al-Qur'an).\n5. Pengumuman Kelulusan.\n6. Daftar ulang.",
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
            'form_config' => json_encode([
                'sections' => [
                    [
                        'id' => 'section_1',
                        'title' => 'Identitas Calon Santri',
                        'description' => 'Identitas Calon Santri',
                        'fields' => [
                            ['id' => 'f_name', 'key' => 'name', 'label' => 'Nama Lengkap', 'placeholder' => 'Nama Lengkap', 'type' => 'text', 'required' => true, 'example_id' => null],
                            ['id' => 'f_user', 'key' => 'username', 'label' => 'Nama Panggilan / Username', 'placeholder' => 'Username untuk login nanti', 'type' => 'text', 'required' => true, 'example_id' => null],
                            ['id' => 'f_nik', 'key' => 'nik', 'label' => 'NIK (Nomor Induk Kependudukan)', 'placeholder' => 'NIK (Nomor Induk Kependudukan)', 'type' => 'nik', 'required' => true, 'example_id' => null],
                            ['id' => 'f_pb', 'key' => 'place_birth', 'label' => 'Tempat Lahir', 'placeholder' => 'Tempat Lahir', 'type' => 'text', 'required' => true, 'example_id' => null],
                            ['id' => 'f_db', 'key' => 'date_birth', 'label' => 'Tanggal Lahir', 'placeholder' => 'Tanggal Lahir', 'type' => 'date', 'required' => true, 'example_id' => null],
                            ['id' => 'f_so', 'key' => 'school_origin', 'label' => 'Asal Sekolah', 'placeholder' => 'Asal Sekolah', 'type' => 'text', 'required' => true, 'example_id' => null],
                            ['id' => 'f_addr', 'key' => 'address', 'label' => 'Alamat Lengkap', 'placeholder' => 'Alamat Lengkap', 'type' => 'textarea', 'required' => true, 'example_id' => null],
                        ]
                    ],
                    [
                        'id' => 'section_2',
                        'title' => 'Data Orang Tua / Wali',
                        'description' => 'Orang Tua',
                        'fields' => [
                            ['id' => 'f_pn', 'key' => 'parent_name', 'label' => 'Nama Ayah/Ibu/Wali', 'placeholder' => 'Nama Ayah/Ibu/Wali', 'type' => 'text', 'required' => true, 'example_id' => null],
                            ['id' => 'f_wa', 'key' => 'whatsapp', 'label' => 'Nomor WhatsApp Aktif', 'placeholder' => 'Nomor WhatsApp Aktif', 'type' => 'tel', 'required' => true, 'example_id' => null],
                        ]
                    ],
                    [
                        'id' => 'section_3',
                        'title' => 'Berkas Persyaratan',
                        'description' => 'Upload Dokumen',
                        'fields' => [
                            ['id' => 'f_foto', 'key' => 'file_foto', 'label' => 'Upload Pas Foto Santri (3x4)', 'placeholder' => 'Upload Pas Foto Santri (3x4)', 'type' => 'file_img', 'required' => true, 'example_id' => null],
                            ['id' => 'f_kk', 'key' => 'file_kk', 'label' => 'Upload Kartu Keluarga (JPG/PNG)', 'placeholder' => 'Upload Kartu Keluarga (JPG/PNG)', 'type' => 'file_img', 'required' => true, 'example_id' => null],
                            ['id' => 'f_akte', 'key' => 'file_akte', 'label' => 'Upload Akta Kelahiran (JPG/PNG)', 'placeholder' => 'Upload Akta Kelahiran (JPG/PNG)', 'type' => 'file_img', 'required' => true, 'example_id' => null],
                            ['id' => 'f_ijazah', 'key' => 'file_ijazah', 'label' => 'Upload Ijazah Terakhir (Opsional)', 'placeholder' => 'Upload Ijazah Terakhir (Opsional)', 'type' => 'file_img', 'required' => false, 'example_id' => null],
                            ['id' => 'f_skhun', 'key' => 'file_skhun', 'label' => 'Upload SKHUN (Opsional)', 'placeholder' => 'Upload SKHUN (Opsional)', 'type' => 'file_img', 'required' => false, 'example_id' => null],
                            ['id' => 'f_kip', 'key' => 'file_kip', 'label' => 'Upload Kartu KIP (Jika Ada)', 'placeholder' => 'Upload Kartu KIP (Jika Ada)', 'type' => 'file_img', 'required' => false, 'example_id' => null],
                        ]
                    ]
                ]
            ]),
        ];

        foreach ($ppdb as $key => $value) {
            PpdbSetting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
