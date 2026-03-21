<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lembaga;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LembagaAdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Lembaga/Index', [
            'lembagas' => Lembaga::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string',
            'color' => 'nullable|string',
        ]);

        Lembaga::create($validated);

        return redirect()->back()->with('success', 'Lembaga berhasil ditambahkan.');
    }

    public function update(Request $request, Lembaga $lembaga)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string',
            'color' => 'nullable|string',
        ]);

        $lembaga->update($validated);

        return redirect()->back()->with('success', 'Lembaga berhasil diperbarui.');
    }

    public function destroy(Lembaga $lembaga)
    {
        $lembaga->delete();
        return redirect()->back()->with('success', 'Lembaga berhasil dihapus.');
    }
}
