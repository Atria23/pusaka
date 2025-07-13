<?php

namespace App\Http\Controllers;

use App\Models\PengelolaAir;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PengelolaAirController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/PengelolaAir/Index', [
            'pengelolaAir' => PengelolaAir::orderBy('nama')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/PengelolaAir/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'alamat' => 'nullable|string',
            'keterangan' => 'nullable|string',
        ]);

        PengelolaAir::create($request->all());

        return redirect()->route('admin.pengelola-air.index')->with('success', 'Data berhasil ditambahkan.');
    }

    public function edit(PengelolaAir $pengelolaAir)
    {
        return Inertia::render('Admin/PengelolaAir/Edit', [
            'pengelolaAir' => $pengelolaAir,
        ]);
    }

    public function update(Request $request, PengelolaAir $pengelolaAir)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'alamat' => 'nullable|string',
            'keterangan' => 'nullable|string',
        ]);

        $pengelolaAir->update($request->all());

        return redirect()->route('admin.pengelola-air.index')->with('success', 'Data berhasil diperbarui.');
    }

    public function destroy(PengelolaAir $pengelolaAir)
    {
        $pengelolaAir->delete();

        return redirect()->route('admin.pengelola-air.index')->with('success', 'Data berhasil dihapus.');
    }
}
