<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class SiteSettingAdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Settings/Index', [
            'settings' => SiteSetting::getMap(),
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->except(['_token', '_method']);

        foreach ($data as $key => $value) {
            if ($request->hasFile($key)) {
                // Handle file upload
                $setting = SiteSetting::where('key', $key)->first();
                
                // Delete old file if exists
                if ($setting && $setting->value) {
                    $oldPath = str_replace('/storage/', '', $setting->value);
                    Storage::disk('public')->delete($oldPath);
                }

                $path = $request->file($key)->store('site', 'public');
                $value = Storage::url($path);
            }

            SiteSetting::updateOrCreate(
                ['key' => $key],
                ['value' => is_array($value) ? json_encode($value) : $value]
            );
        }

        return redirect()->back()->with('success', 'Pengaturan berhasil diperbarui.');
    }
}
