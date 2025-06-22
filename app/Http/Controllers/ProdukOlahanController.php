<?php

namespace App\Http\Controllers;

use App\Models\ProdukOlahan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Sampah;

class ProdukOlahanController extends Controller
{

public function index()
{
    $produkOlahan = ProdukOlahan::with('sampah')->get();
    $sampah = Sampah::select('id', 'nama_sampah')->get();

    return Inertia::render('Admin/ProdukOlahan', [
        'produkOlahan' => $produkOlahan,
        'sampah' => $sampah,
    ]);
}

    // // Index untuk user
    public function indexUser()
    {
        $produkOlahan = ProdukOlahan::with('sampah')->get();
        $kategoriSampah = Sampah::select('id', 'nama_sampah')->get();

        return Inertia::render('User/GaleriProduk', [
            'produkOlahan' => $produkOlahan,
            'kategoriSampah' => $kategoriSampah,
        ]);
    }

    // public function store(Request $request)
    // {
    //     $data = $request->validate([
    //         'nama_produk' => 'required|string|max:100',
    //         'sampah_id' => 'required|exists:sampah,id',
    //         'foto' => 'nullable|image|max:2048',
    //     ]);
    
    //     if ($request->hasFile('foto')) {
    //         $data['foto'] = $request->file('foto')->store('produk_olahan', 'public');
    //     }
    
    //     ProdukOlahan::create($data);
    
    //     return back()->with('message', 'Produk berhasil ditambahkan.');
    // }
    
    // public function update(Request $request, ProdukOlahan $produkOlahan)
    // {
    //     $data = $request->validate([
    //         'nama_produk' => 'required|string|max:100',
    //         'sampah_id' => 'required|exists:sampah,id',
    //         'foto' => 'nullable|image|max:2048',
    //     ]);
    
    //     if ($request->hasFile('foto')) {
    //         if ($produkOlahan->foto && \Storage::disk('public')->exists($produkOlahan->foto)) {
    //             \Storage::disk('public')->delete($produkOlahan->foto);
    //         }
    //         $data['foto'] = $request->file('foto')->store('produk_olahan', 'public');
    //     }
    
    //     $produkOlahan->update($data);
    
    //     return back()->with('message', 'Produk berhasil diperbarui.');
    // }

    public function store(Request $request)
{
    $data = $request->validate([
        'nama_produk' => 'required|string|max:100',
        'sampah_id' => 'required|exists:sampah,id',
        'foto' => 'nullable|image|max:2048',
        'link_pembelian' => 'nullable|url|max:255',
    ]);

    if ($request->hasFile('foto')) {
        $data['foto'] = $request->file('foto')->store('produk_olahan', 'public');
    }

    ProdukOlahan::create($data);

    return back()->with('message', 'Produk berhasil ditambahkan.');
}

public function update(Request $request, ProdukOlahan $produkOlahan)
{
    $data = $request->validate([
        'nama_produk' => 'required|string|max:100',
        'sampah_id' => 'required|exists:sampah,id',
        'foto' => 'nullable|image|max:2048',
        'link_pembelian' => 'nullable|url|max:255',
    ]);

    if ($request->hasFile('foto')) {
        if ($produkOlahan->foto && \Storage::disk('public')->exists($produkOlahan->foto)) {
            \Storage::disk('public')->delete($produkOlahan->foto);
        }
        $data['foto'] = $request->file('foto')->store('produk_olahan', 'public');
    }

    $produkOlahan->update($data);

    return back()->with('message', 'Produk berhasil diperbarui.');
}

    
public function destroy(ProdukOlahan $produkOlahan)
{
    // Hapus file gambar jika ada
    if ($produkOlahan->foto && \Storage::disk('public')->exists($produkOlahan->foto)) {
        \Storage::disk('public')->delete($produkOlahan->foto);
    }

    // Hapus data dari database
    $produkOlahan->delete();

    return redirect()->route('admin.produk-olahan.index')->with('message', 'Produk berhasil dihapus.');
}

}
