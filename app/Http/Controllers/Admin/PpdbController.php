<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PpdbController extends Controller
{
    public function index()
    {
        // Menampilkan halaman admin: Kelola Data Pendaftar
        return Inertia::render('Admin/DataPendaftar');
    }
}
