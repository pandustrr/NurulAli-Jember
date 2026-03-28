<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pendaftar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PpdbController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Pendaftaran/Index', [
            'pendaftars' => Pendaftar::latest()->get()
        ]);
    }

    public function update(Request $request, Pendaftar $pendaftar)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'nik' => 'required|string|size:16',
            'place_birth' => 'required|string|max:255',
            'date_birth' => 'required|date',
            'parent_name' => 'required|string|max:255',
            'whatsapp' => 'required|string|max:15',
            'address' => 'required|string',
            'school_origin' => 'required|string|max:255',
            'payment_method' => 'required|in:cash,transfer',
            'username' => 'nullable|string|max:255|unique:pendaftars,username,' . $pendaftar->id,
            'status' => 'required|in:pending,verified,rejected',
            'payment_status' => 'required|in:unpaid,paid,verified',
        ]);

        $pendaftar->update($validated);

        return redirect()->back()->with('success', 'Data pendaftar berhasil diperbarui.');
    }

    public function destroy(Pendaftar $pendaftar)
    {
        $pendaftar->delete();
        return redirect()->back()->with('success', 'Data pendaftar berhasil dihapus.');
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
    public function bulkUpdateUsernames(Request $request)
    {
        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:pendaftars,id',
            'prefix' => 'required|string',
            'start_number' => 'required|integer|min:0',
        ]);

        $ids = $validated['ids'];
        $prefix = $validated['prefix'];
        $currentNumber = $validated['start_number'];

        DB::transaction(function () use ($ids, $prefix, &$currentNumber) {
            foreach ($ids as $id) {
                $pendaftar = Pendaftar::find($id);
                if ($pendaftar && !$pendaftar->username) {
                    // Format number with leading zeros (e.g. 001, 042)
                    $formattedNumber = str_pad($currentNumber, 3, '0', STR_PAD_LEFT);
                    $pendaftar->update([
                        'username' => $prefix . $formattedNumber
                    ]);
                    $currentNumber++;
                }
            }
        });

        return redirect()->back()->with('success', 'Akun Santri berhasil dibuat secara massal.');
    }
}
