<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicController extends Controller
{
    /**
     * Halaman Utama sudah ditangani langsung di web.php untuk demo
     */
     
    public function about()
    {
        // TODO: Ambil profil, visi misi dari database jika dinamis
        return Inertia::render('Public/About');
    }

    public function infoPpdb()
    {
        return Inertia::render('Public/InfoPpdb');
    }

    public function pendaftaran()
    {
        // Tampilkan form pendaftaran
        return Inertia::render('Public/Pendaftaran');
    }
}
