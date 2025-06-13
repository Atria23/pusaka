<?php

namespace App\Http\Controllers;

use App\Models\Penukaran;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PenukaranController extends Controller
{
    // User: lihat riwayat penukaran sendiri
    public function index()
    {
        $penukarans = Penukaran::with('voucher')
            ->where('user_id', Auth::id())
            ->latest()
            ->get();

        return inertia('User/Penukaran', compact('penukarans'));
    }

    // User: tukar voucher
    public function tukar(Request $request)
    {
        $request->validate(['voucher_id' => 'required|exists:vouchers,id']);

        $voucher = Voucher::findOrFail($request->voucher_id);
        $user = Auth::user();

        if ($voucher->stok <= 0) {
            return back()->withErrors(['Voucher habis stok.']);
        }

        if ($user->points < $voucher->nilai_poin) {
            return back()->withErrors(['Poin tidak mencukupi.']);
        }

        // Kurangi stok dan poin
        $voucher->decrement('stok');
        $user->decrement('points', $voucher->nilai_poin);

        $voucher->refresh();

        if ($voucher->stok == 0) {
            $voucher->update(['status' => 'tidak tersedia']);
        }

        Penukaran::create([
            'user_id' => $user->id,
            'voucher_id' => $voucher->id,
            'poin_dipakai' => $voucher->nilai_poin,
            'status' => 'belum diredeem'
        ]);

        return back()->with('message', 'Penukaran berhasil.');
    }

    // Admin: lihat semua penukaran
    public function adminIndex()
    {
        $penukarans = Penukaran::with(['voucher', 'user'])->latest()->get();

        return inertia('Admin/Penukaran', compact('penukarans'));
    }

    // Admin: update status redeem
    public function updateStatusRedeem(Request $request, Penukaran $penukaran)
    {
        $request->validate([
            'status' => 'required|in:belum diredeem,sudah diredeem'
        ]);

        $penukaran->update(['status' => $request->status]);

        return back()->with('message', 'Status redeem berhasil diperbarui.');
    }
}
