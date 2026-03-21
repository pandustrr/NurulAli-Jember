<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lembaga;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

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
            'detailed_description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('lembaga', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        Lembaga::create($validated);

        return redirect()->back()->with('success', 'Lembaga berhasil ditambahkan.');
    }

    public function update(Request $request, Lembaga $lembaga)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'detailed_description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image
            if ($lembaga->image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $lembaga->image));
            }
            $path = $request->file('image')->store('lembaga', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        $lembaga->update($validated);

        return redirect()->back()->with('success', 'Lembaga berhasil diperbarui.');
    }

    public function destroy(Lembaga $lembaga)
    {
        if ($lembaga->image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $lembaga->image));
        }
        $lembaga->delete();
        return redirect()->back()->with('success', 'Lembaga berhasil dihapus.');
    }
}
