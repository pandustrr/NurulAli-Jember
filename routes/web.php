<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// --- AREA PUBLIK ---
Route::get('/', function () {
    return Inertia::render('Public/Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/about', [PublicController::class, 'about'])->name('about');
Route::get('/info-ppdb', [PublicController::class, 'infoPpdb'])->name('info-ppdb');
Route::get('/pendaftaran', [PublicController::class, 'pendaftaran'])->name('pendaftaran');


// --- AREA ADMIN ---
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');

    // Nanti controller Admin di sini (contoh)
    // Route::get('/admin/pendaftar', [Admin\PpdbController::class, 'index'])->name('admin.pendaftar');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
