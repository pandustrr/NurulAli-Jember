<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Lembaga;
use App\Models\SiteSetting;
use App\Models\PpdbSetting;
use App\Models\Pendaftar;
use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PublicController extends Controller
{
    public function home()
    {
        $settings = SiteSetting::all()->pluck('value', 'key');
        $lembagas = Lembaga::all();
        return Inertia::render('Public/Home/Index', [
            'settings' => $settings,
            'lembagas' => $lembagas
        ]);
    }

    public function about()
    {
        $settings = SiteSetting::all()->pluck('value', 'key');
        return Inertia::render('Public/About/Index', [
            'settings' => $settings
        ]);
    }

    public function lembaga()
    {
        $lembagas = Lembaga::all();
        $settings = SiteSetting::all()->pluck('value', 'key');
        return Inertia::render('Public/Lembaga/Index', [
            'lembagas' => $lembagas,
            'settings' => $settings
        ]);
    }

    public function infoPpdb()
    {
        $ppdb_settings = PpdbSetting::all()->pluck('value', 'key');
        $settings = SiteSetting::all()->pluck('value', 'key');
        return Inertia::render('Public/InfoPpdb/Index', [
            'ppdb_settings' => $ppdb_settings,
            'settings' => $settings
        ]);
    }

    public function pendaftaran()
    {
        $settings = SiteSetting::all()->pluck('value', 'key');
        return Inertia::render('Public/Pendaftaran/Index', [
            'settings' => $settings
        ]);
    }

    public function storePendaftaran(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'nik' => 'required|string|size:16',
            'place_birth' => 'required|string|max:255',
            'date_birth' => 'required|date',
            'parent_name' => 'required|string|max:255',
            'whatsapp' => 'required|string|max:20',
            'address' => 'required|string',
            'school_origin' => 'required|string|max:255',
            'payment_method' => 'required|in:cash,transfer',
        ]);

        $pendaftar = Pendaftar::create([
            ...$validated,
            'reg_id' => 'REG-' . date('Ymd') . '-' . strtoupper(Str::random(5)),
            'status' => 'pending',
            'payment_status' => 'unpaid',
            'total_bill' => 500000,
        ]);

        return back()->with('success', 'Pendaftaran Berhasil! ID Registrasi: ' . $pendaftar->reg_id);
    }

    public function kontak()
    {
        $settings = SiteSetting::all()->pluck('value', 'key');
        return Inertia::render('Public/Kontak/Index', [
            'settings' => $settings
        ]);
    }

    public function sendMessage(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        Message::create($validated);

        return back()->with('success', 'Pesan Anda telah dikirim! Terima kasih.');
    }
}
