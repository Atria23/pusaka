<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Sampah;
use App\Models\Setoran;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SetoranController extends Controller
{
    public function index(Request $request)
    {
        $sampah = Sampah::query()
            ->when($request->search, fn ($q) =>
                $q->where('nama_sampah', 'like', '%' . $request->search . '%'))
            ->get();

        return Inertia::render('Admin/Setoran', [
            'sampahList' => Sampah::all(),
            'setoranList' => Setoran::with(['user', 'sampah'])->latest()->get(),
            'users' => User::all(),
        ]);
    }
    
    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'sampah_id' => 'required|exists:sampah,id',
            'berat' => 'required|numeric|min:1', // input dalam gram
        ]);

        $sampah = Sampah::findOrFail($data['sampah_id']);
        $beratKg = $data['berat'] / 1000;
        $poin = round($beratKg * $sampah->harga_per_kg);

        $setoran = Setoran::create([
            'user_id' => $data['user_id'],
            'sampah_id' => $data['sampah_id'],
            'berat_dalam_kg' => $beratKg,
            'poin_diperoleh' => $poin
        ]);

        // Tambahkan poin ke user
        $user = $setoran->user;
        $user->points += $poin;
        $user->save();

        return redirect()->back()->with('message', 'Setoran berhasil ditambahkan.');
    }
    
    public function update(Request $request, Setoran $setoran)
    {
        $data = $request->validate([
            'berat_dalam_kg' => 'required|numeric|min:0.001',
        ]);

        $harga = $setoran->sampah->harga_per_kg;

        $poinBaru = round($data['berat_dalam_kg'] * $harga);
        $poinLama = $setoran->poin_diperoleh;

        $setoran->update([
            'berat_dalam_kg' => $data['berat_dalam_kg'],
            'poin_diperoleh' => $poinBaru
        ]);

        // Hitung selisih poin dan update user
        $selisih = $poinBaru - $poinLama;
        $user = $setoran->user;
        $user->points += $selisih;
        $user->save();

        return redirect()->back()->with('message', 'Setoran berhasil diperbarui.');
    }
    
    public function destroy(Setoran $setoran)
    {
        // Ambil user terkait
        $user = $setoran->user;
    
        // Kurangi poin dari user
        $user->points -= $setoran->poin_diperoleh;
        if ($user->points < 0) {
            $user->points = 0; // mencegah nilai negatif
        }
        $user->save();
    
        // Hapus setoran
        $setoran->delete();
    
        return redirect()->back()->with('message', 'Setoran berhasil dihapus.');
    }
    
    public function riwayat(Request $request)
    {
        $user = auth()->user();

        $setoran = Setoran::with('sampah')
            ->where('user_id', $user->id)
            ->latest()
            ->get();

        return Inertia::render('User/RiwayatSetoran', [
            'setoranList' => $setoran
        ]);
    }

}
