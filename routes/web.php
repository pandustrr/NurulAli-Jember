<?php

use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Public\PublicController;
use App\Http\Controllers\Admin\PpdbController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\LembagaAdminController;
use App\Http\Controllers\Admin\SettingAdminController;
use App\Http\Controllers\Admin\PpdbSettingAdminController;
use App\Http\Controllers\Admin\MessageAdminController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// --- AREA PUBLIK (Akses Terbuka) ---
Route::get('/', [PublicController::class, 'home'])->name('home');

Route::get('/about', [PublicController::class, 'about'])->name('about');
Route::get('/lembaga', [PublicController::class, 'lembaga'])->name('lembaga');
Route::get('/info-ppdb', [PublicController::class, 'infoPpdb'])->name('info-ppdb');
Route::get('/pendaftaran', [PublicController::class, 'pendaftaran'])->name('pendaftaran');
Route::post('/pendaftaran', [PublicController::class, 'storePendaftaran'])->name('pendaftaran.store');
Route::get('/kontak', [PublicController::class, 'kontak'])->name('kontak');
Route::post('/kontak', [PublicController::class, 'sendMessage'])->name('kontak.send');


// --- AREA ADMIN (Butuh Login) ---
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');

    // Route untuk Admin mengelola PPDB
    Route::get('/admin/pendaftar', [PpdbController::class, 'index'])->name('admin.pendaftar');
    Route::post('/admin/pendaftar/{pendaftar}/status', [PpdbController::class, 'updateStatus'])->name('admin.pendaftar.status');

    // CMS Management
    Route::resource('/admin/lembaga', LembagaAdminController::class)->names('admin.lembaga');
    Route::get('/admin/settings', [SettingAdminController::class, 'index'])->name('admin.settings');
    Route::post('/admin/settings', [SettingAdminController::class, 'update'])->name('admin.settings.update');
    Route::get('/admin/ppdb-info', [PpdbSettingAdminController::class, 'info'])->name('admin.ppdb-info');
    Route::get('/admin/ppdb-registration', [PpdbSettingAdminController::class, 'registration'])->name('admin.ppdb-registration');
    Route::post('/admin/ppdb-settings', [PpdbSettingAdminController::class, 'update'])->name('admin.ppdb-settings.update');
    Route::get('/admin/messages', [MessageAdminController::class, 'index'])->name('admin.messages');
    Route::post('/admin/messages/{message}/read', [MessageAdminController::class, 'markAsRead'])->name('admin.messages.read');
    Route::delete('/admin/messages/{message}', [MessageAdminController::class, 'destroy'])->name('admin.messages.destroy');
});

// Profile Management Bawaan Breeze
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
