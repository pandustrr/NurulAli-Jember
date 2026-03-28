<?php

use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Public\PublicController;
use App\Http\Controllers\Admin\PpdbController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\LembagaAdminController;
use App\Http\Controllers\Admin\AboutAdminController;
use App\Http\Controllers\Admin\KontakAdminController;
use App\Http\Controllers\Admin\PpdbSettingAdminController;
use App\Http\Controllers\Admin\MessageAdminController;
use App\Http\Controllers\Admin\SiteSettingAdminController;
use App\Http\Controllers\Public\SantriDashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// --- AREA PUBLIK (Akses Terbuka) ---
Route::get('/', [PublicController::class, 'home'])->name('home');

Route::get('/tentang', [PublicController::class, 'tentang'])->name('tentang');
Route::get('/lembaga', [PublicController::class, 'lembaga'])->name('lembaga');
Route::get('/info-ppdb', [PublicController::class, 'infoPpdb'])->name('info-ppdb');
Route::get('/pendaftaran', [PublicController::class, 'pendaftaran'])->name('pendaftaran');
Route::post('/pendaftaran', [PublicController::class, 'storePendaftaran'])->name('pendaftaran.store');
Route::get('/kontak', [PublicController::class, 'kontak'])->name('kontak');

// Santri Authentication
Route::get('/santri/login', [PublicController::class, 'santriLogin'])->name('santri.login');
Route::post('/santri/login', [SantriDashboardController::class, 'login'])->name('santri.login.store');
Route::get('/santri/dashboard', [SantriDashboardController::class, 'index'])->name('santri.dashboard');
Route::get('/santri/profile', [SantriDashboardController::class, 'profile'])->name('santri.profile');
Route::post('/santri/profile', [SantriDashboardController::class, 'updateProfile'])->name('santri.profile.update');
Route::post('/santri/logout', [SantriDashboardController::class, 'logout'])->name('santri.logout');

Route::post('/kontak', [PublicController::class, 'sendMessage'])->name('kontak.send');


// --- AREA ADMIN (Butuh Login) ---
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');

    // Route untuk Admin mengelola PPDB
    Route::get('/admin/pendaftar', [PpdbController::class, 'index'])->name('admin.pendaftar');
    Route::post('/admin/pendaftar/{pendaftar}/status', [PpdbController::class, 'updateStatus'])->name('admin.pendaftar.status');
    Route::put('/admin/pendaftar/{pendaftar}', [PpdbController::class, 'update'])->name('admin.pendaftar.update');
    Route::post('/admin/pendaftar/bulk-generate', [PpdbController::class, 'bulkUpdateUsernames'])->name('admin.pendaftar.bulk-generate');
    Route::delete('/admin/pendaftar/{pendaftar}', [PpdbController::class, 'destroy'])->name('admin.pendaftar.destroy');

    // CMS Management
    Route::get('/admin/lembaga/accounts', [LembagaAdminController::class, 'accounts'])->name('admin.lembaga.accounts');
    Route::resource('/admin/lembaga', LembagaAdminController::class)->names('admin.lembaga');
    Route::get('/admin/tentang', [AboutAdminController::class, 'index'])->name('admin.tentang');
    Route::post('/admin/tentang', [AboutAdminController::class, 'update'])->name('admin.tentang.update');
    Route::get('/admin/kontak', [KontakAdminController::class, 'index'])->name('admin.kontak');
    Route::post('/admin/kontak', [KontakAdminController::class, 'update'])->name('admin.kontak.update');
    Route::get('/admin/ppdb-info', [PpdbSettingAdminController::class, 'info'])->name('admin.ppdb-info');
    Route::get('/admin/ppdb-examples', [PpdbSettingAdminController::class, 'examples'])->name('admin.ppdb-examples');
    Route::post('/admin/ppdb-examples', [PpdbSettingAdminController::class, 'storeExample'])->name('admin.ppdb-examples.store');
    Route::delete('/admin/ppdb-examples/{example}', [PpdbSettingAdminController::class, 'destroyExample'])->name('admin.ppdb-examples.destroy');
    Route::get('/admin/ppdb-registration', [PpdbSettingAdminController::class, 'registration'])->name('admin.ppdb-registration');
    Route::get('/admin/ppdb-form', [PpdbSettingAdminController::class, 'form'])->name('admin.ppdb-form');
    Route::post('/admin/ppdb-settings', [PpdbSettingAdminController::class, 'update'])->name('admin.ppdb-settings.update');
    Route::get('/admin/messages', [MessageAdminController::class, 'index'])->name('admin.messages');
    Route::post('/admin/messages/{message}/read', [MessageAdminController::class, 'markAsRead'])->name('admin.messages.read');
    Route::delete('/admin/messages/{message}', [MessageAdminController::class, 'destroy'])->name('admin.messages.destroy');

    // Site Settings
    Route::get('/admin/site-settings', [SiteSettingAdminController::class, 'index'])->name('admin.site-settings');
    Route::post('/admin/site-settings', [SiteSettingAdminController::class, 'update'])->name('admin.site-settings.update');
});

// Profile Management Bawaan Breeze
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
