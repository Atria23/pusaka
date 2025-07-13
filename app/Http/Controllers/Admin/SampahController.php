<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Models\Sampah;
use App\Http\Controllers\Controller;

class SampahController extends Controller
{
    // Admin: list sampah dengan sortir dan pagination
    public function index(Request $request)
    {
        $query = Sampah::query();

        if ($request->has('sort') && in_array($request->sort, ['asc', 'desc'])) {
            $query->orderBy('nama_sampah', $request->sort);
        } else {
            $query->orderBy('nama_sampah', 'asc');
        }

        $sampah = $query->paginate(20);

        return Inertia::render('Admin/Sampah', [
            'sampah' => $sampah,
            'filters' => $request->only('sort'),
        ]);
    }

    // User: list sampah dengan pencarian saja (tanpa pagination)
    public function userIndex(Request $request)
    {
        $sampah = Sampah::query()
            ->when($request->search, fn ($q) =>
                $q->where('nama_sampah', 'like', '%' . $request->search . '%'))
            ->get();

        return Inertia::render('User/SetoranSampah', [
            'sampahList' => $sampah,
        ]);
    }

    // Admin: tambah sampah
    public function store(Request $request)
    {
        $data = $request->validate([
            'nama_sampah' => 'required|string|max:100',
            'harga_per_kg' => 'required|numeric|min:0',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('sampah', 'public');
        }

        Sampah::create($data);

        return redirect()->back()->with('success', 'Sampah berhasil ditambahkan.');
    }

    // Admin: update sampah
    public function update(Request $request, $id)
    {
        $sampah = Sampah::findOrFail($id);

        $data = $request->validate([
            'nama_sampah' => 'required|string|max:100',
            'harga_per_kg' => 'required|numeric|min:0',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($sampah->image) {
                Storage::delete('public/' . $sampah->image);
            }

            $data['image'] = $request->file('image')->store('sampah', 'public');
        }

        $sampah->update($data);

        return redirect()->back()->with('success', 'Sampah berhasil diperbarui.');
    }

    // Admin: hapus sampah
    public function destroy($id)
    {
        $sampah = Sampah::findOrFail($id);

        if ($sampah->image) {
            Storage::disk('public')->delete($sampah->image);
        }

        $sampah->delete();

        return redirect()->back()->with('success', 'Sampah berhasil dihapus.');
    }
}
