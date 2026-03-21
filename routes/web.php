<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Public\PublicController;
use App\Http\Controllers\Admin\PpdbController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// --- AREA PUBLIK (Akses Terbuka) ---
Route::get('/', function () {
    return Inertia::render('Public/Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/about', [PublicController::class, 'about'])->name('about');
Route::get('/lembaga', [PublicController::class, 'lembaga'])->name('lembaga');
Route::get('/info-ppdb', [PublicController::class, 'infoPpdb'])->name('info-ppdb');
Route::get('/pendaftaran', [PublicController::class, 'pendaftaran'])->name('pendaftaran');
Route::get('/kontak', [PublicController::class, 'kontak'])->name('kontak');


// --- AREA ADMIN (Butuh Login) ---
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');

    // Route untuk Admin mengelola PPDB
    Route::get('/admin/pendaftar', [PpdbController::class, 'index'])->name('admin.pendaftar');
});

// Profile Management Bawaan Breeze
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
