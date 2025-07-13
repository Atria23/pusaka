<?php

namespace App\Http\Controllers;

use App\Models\Voucher;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class VoucherController extends Controller
{
    // Admin: list semua voucher
    public function index()
    {
        $vouchers = Voucher::latest()->get();
        return Inertia::render('Admin/Vouchers', compact('vouchers'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nama' => 'required|string',
            'deskripsi' => 'nullable|string',
            'nilai_poin' => 'required|integer|min:1',
            'stok' => 'required|integer|min:0',
            'status' => 'required|in:tersedia,tidak tersedia',
            'gambar' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('gambar')) {
            $data['gambar'] = $request->file('gambar')->store('vouchers', 'public');
        }

        Voucher::create($data);

        return back()->with('message', 'Voucher berhasil ditambahkan.');
    }

    

public function update(Request $request, Voucher $voucher)
{
    $data = $request->validate([
        'nama' => 'required|string',
        'deskripsi' => 'nullable|string',
        'nilai_poin' => 'required|integer|min:1',
        'stok' => 'required|integer|min:0',
        'status' => 'required|in:tersedia,tidak tersedia',
        'gambar' => 'nullable|image|max:2048'
    ]);

    if ($request->hasFile('gambar')) {
        // Hapus gambar lama jika ada
        if ($voucher->gambar && Storage::disk('public')->exists($voucher->gambar)) {
            Storage::disk('public')->delete($voucher->gambar);
        }
        $data['gambar'] = $request->file('gambar')->store('vouchers', 'public');
    }

    $voucher->update($data);

    return back()->with('message', 'Voucher diperbarui.');
}


public function destroy(Voucher $voucher)
{
    // Hapus gambar dari storage jika ada
    if ($voucher->gambar && Storage::disk('public')->exists($voucher->gambar)) {
        Storage::disk('public')->delete($voucher->gambar);
    }

    $voucher->delete();

    return back()->with('message', 'Voucher dihapus.');
}


    // User: list voucher (bisa filter status tersedia)
    public function listForUser()
{
    $vouchers = Voucher::all(); // Bisa juga pakai filter kalau perlu
    $user = Auth::user();       // Ambil user yang login

    return inertia('User/Voucher', compact('vouchers', 'user'));
}
}
