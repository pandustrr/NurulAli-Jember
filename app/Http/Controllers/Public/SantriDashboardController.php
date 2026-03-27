<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Pendaftar;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;

class SantriDashboardController extends Controller
{
    public function login(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $pendaftar = Pendaftar::where('username', $validated['username'])->first();

        if (!$pendaftar) {
            return back()->withErrors([
                'username' => 'Username tidak ditemukan.',
            ]);
        }

        // Check if custom password exists, otherwise fallback to reg_id
        $passwordMatch = $pendaftar->password 
            ? \Illuminate\Support\Facades\Hash::check($validated['password'], $pendaftar->password)
            : $pendaftar->reg_id === $validated['password'];

        if (!$passwordMatch) {
            return back()->withErrors([
                'password' => 'Kata sandi salah.',
            ]);
        }

        Session::put('santri_id', $pendaftar->id);

        return redirect()->route('santri.dashboard');
    }

    public function profile()
    {
        $santriId = Session::get('santri_id');

        if (!$santriId) {
            return redirect()->route('santri.login')->with('error', 'Silakan login terlebih dahulu.');
        }

        $santri = Pendaftar::findOrFail($santriId);

        return Inertia::render('Public/Santri/Profile', [
            'santri' => $santri,
            'settings' => SiteSetting::getMap(),
        ]);
    }

    public function updateProfile(Request $request)
    {
        $santriId = Session::get('santri_id');
        if (!$santriId) return redirect()->route('santri.login');

        $santri = Pendaftar::findOrFail($santriId);

        $validated = $request->validate([
            'username' => 'required|string|max:255|unique:pendaftars,username,' . $santriId,
            'password' => 'nullable|string|min:4|confirmed',
        ]);

        $santri->username = $validated['username'];
        if (!empty($validated['password'])) {
            $santri->password = \Illuminate\Support\Facades\Hash::make($validated['password']);
        }
        $santri->save();

        return back()->with('success', 'Profile berhasil diperbarui.');
    }

    public function index()
    {
        $santriId = Session::get('santri_id');

        if (!$santriId) {
            return redirect()->route('santri.login')->with('error', 'Silakan login terlebih dahulu.');
        }

        $santri = Pendaftar::findOrFail($santriId);

        return Inertia::render('Public/Santri/Dashboard', [
            'santri' => $santri,
            'settings' => SiteSetting::getMap(),
        ]);
    }

    public function logout()
    {
        Session::forget('santri_id');
        return redirect()->route('santri.login')->with('success', 'Anda telah berhasil keluar.');
    }
}
