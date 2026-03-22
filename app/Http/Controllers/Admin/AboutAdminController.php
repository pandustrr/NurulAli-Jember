<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutAdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/About/Index', [
            'settings' => SiteSetting::all()->pluck('value', 'key')
        ]);
    }

    public function update(Request $request)
    {
        $settings = $request->except(['_token', '_method']);

        foreach ($settings as $key => $value) {
            SiteSetting::updateOrCreate(
                ['key' => $key],
                ['value' => is_array($value) ? json_encode($value) : $value]
            );
        }

        return redirect()->back()->with('success', 'Informasi sekolah berhasil diperbarui.');
    }
}
