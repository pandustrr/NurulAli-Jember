<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Lembaga;
use App\Models\SiteSetting;
use App\Models\PpdbExample;
use App\Models\PpdbSetting;
use App\Models\Pendaftar;
use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class PublicController extends Controller
{
    public function home()
    {
        return Inertia::render('Public/Home/Index', [
            'settings' => SiteSetting::getMap(),
            'lembagas' => Lembaga::all()
        ]);
    }

    public function tentang()
    {
        return Inertia::render('Public/About/Index', [
            'settings' => SiteSetting::getMap()
        ]);
    }

    public function lembaga()
    {
        return Inertia::render('Public/Lembaga/Index', [
            'lembagas' => Lembaga::all(),
            'settings' => SiteSetting::getMap()
        ]);
    }

    public function infoPpdb()
    {
        return Inertia::render('Public/InfoPpdb/Index', [
            'ppdb_settings' => PpdbSetting::getMap(),
            'settings' => SiteSetting::getMap(),
        ]);
    }

    public function pendaftaran()
    {
        return Inertia::render('Public/Pendaftaran/Index', [
            'settings' => SiteSetting::getMap(),
            'ppdb_settings' => PpdbSetting::getMap(),
            'examples' => PpdbExample::all(),
            'lembagas' => Lembaga::all(),
        ]);
    }

    public function storePendaftaran(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'nik' => 'nullable|string|size:16',
            'lembaga_ids' => 'required|array|min:1',
            'place_birth' => 'nullable|string|max:255',
            'date_birth' => 'nullable|date',
            'parent_name' => 'nullable|string|max:255',
            'whatsapp' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'school_origin' => 'nullable|string|max:255',
            'payment_method' => 'required|in:cash,transfer',
            'metadata' => 'nullable|array',
        ]);

        // Dynamically Handle ALL file_ columns
        $uploadedFiles = [];
        foreach ($request->allFiles() as $key => $file) {
            if (str_starts_with($key, 'file_')) {
                $path = $file->store('pendaftaran/documents', 'public');
                $uploadedFiles[$key] = Storage::url($path);
            }
        }

        $metadata = $request->input('metadata', []);
        
        // Handle Additional Files in Metadata (if any)
        if ($request->has('metadata')) {
            foreach ($request->file('metadata', []) as $key => $file) {
                if ($file instanceof \Illuminate\Http\UploadedFile) {
                    $path = $file->store('pendaftaran/documents', 'public');
                    $metadata[$key] = Storage::url($path);
                }
            }
        }

        $ppdb_settings = PpdbSetting::getMap();

        $pendaftar = Pendaftar::create([
            ...$validated,
            ...$uploadedFiles,
            'metadata' => count($metadata) > 0 ? json_encode($metadata) : null,
            'lembaga_ids' => json_encode($validated['lembaga_ids']),
            'reg_id' => 'NA-' . date('Y') . '-' . strtoupper(Str::random(5)),
            'status' => 'pending',
            'payment_status' => 'unpaid',
            'total_bill' => $ppdb_settings['total_bill'] ?? 500000,
        ]);

        $lembaga_names = Lembaga::whereIn('id', $validated['lembaga_ids'])->pluck('title')->toArray();

        return back()->with([
            'success' => 'Pendaftaran Berhasil!',
            'registration' => [
                'reg_id' => $pendaftar->reg_id,
                'name' => $pendaftar->name,
                'lembaga_summary' => implode(', ', $lembaga_names)
            ]
        ]);
    }

    public function kontak()
    {
        return Inertia::render('Public/Kontak/Index', [
            'settings' => SiteSetting::getMap()
        ]);
    }

    public function santriLogin()
    {
        return Inertia::render('Public/Santri/Login', [
            'settings' => SiteSetting::getMap()
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
