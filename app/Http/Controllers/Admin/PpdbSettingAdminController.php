<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PpdbExample;
use App\Models\PpdbSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PpdbSettingAdminController extends Controller
{
    public function info()
    {
        return Inertia::render('Admin/InfoPpdb/Info', [
            'settings' => PpdbSetting::all()->pluck('value', 'key'),
        ]);
    }

    public function examples()
    {
        return Inertia::render('Admin/InfoPpdb/ContohGambar', [
            'gambar' => PpdbExample::all()
        ]);
    }

    public function storeExample(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'required|image|max:2048'
        ]);

        $path = $request->file('image')->store('ppdb', 'public');

        PpdbExample::create([
            'title' => $request->title,
            'image' => Storage::url($path)
        ]);

        return redirect()->back()->with('success', 'Contoh berkas berhasil ditambahkan.');
    }

    public function destroyExample(PpdbExample $example)
    {
        // Cleanup storage if local
        $path = str_replace('/storage/', '', $example->image);
        Storage::disk('public')->delete($path);

        $example->delete();

        return redirect()->back()->with('success', 'Contoh berkas berhasil dihapus.');
    }

    public function registration()
    {
        return Inertia::render('Admin/Pendaftaran/Registration', [
            'settings' => PpdbSetting::all()->pluck('value', 'key')
        ]);
    }

    public function update(Request $request)
    {
        $settings = $request->except(['_token', '_method']);

        foreach ($settings as $key => $value) {
            PpdbSetting::updateOrCreate(
                ['key' => $key],
                ['value' => is_array($value) ? json_encode($value) : $value]
            );
        }

        return redirect()->back()->with('success', 'Pengaturan berhasil diperbarui.');
    }
}
