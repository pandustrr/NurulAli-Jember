<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PpdbSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PpdbSettingAdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/PpdbSettings/Index', [
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

        return redirect()->back()->with('success', 'Pengaturan PPDB berhasil diperbarui.');
    }
}
