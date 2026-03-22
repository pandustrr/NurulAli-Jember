<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pendaftar;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PpdbController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/DataPendaftar', [
            'pendaftars' => Pendaftar::latest()->get()
        ]);
    }

    public function updateStatus(Request $request, Pendaftar $pendaftar)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,verified,rejected',
            'payment_status' => 'required|in:unpaid,paid,verified',
        ]);

        $pendaftar->update($validated);

        return redirect()->back()->with('success', 'Status pendaftar berhasil diperbarui.');
    }
}
