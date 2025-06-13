<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Setoran;
use Inertia\Inertia;

class UserDashboardController extends Controller
{
    // public function index()
    // {
    //     // Ambil user yang sedang login
    //     $user = Auth::user();

    //     // Cegah jika belum login
    //     if (!$user) {
    //         return Inertia::render('User/Dashboard', [
    //             'user' => [
    //                 'name' => 'Guest',
    //                 'transactions' => 0,
    //                 'balance' => 0,
    //                 'points' => 0,
    //                 'summary' => [
    //                     'total_setoran' => 0,
    //                     'tanggal_terakhir' => null,
    //                 ],
    //                 'latestTransactions' => [],
    //             ]
    //         ]);
    //     }

    //     // Gunakan model Setoran
    //     $setoranQuery = Setoran::where('user_id', $user->id);

    //     $totalSetoran = $setoranQuery->sum('berat_dalam_kg'); // atau kolom nilai lainnya
    //     $tanggalTerakhirSetoran = $setoranQuery->max('created_at');

    //     $latestTransactions = $setoranQuery
    //         ->latest()
    //         ->take(5)
    //         ->get();

    //     // Menyiapkan data untuk dashboard
    //     $userData = [
    //         'name' => $user->name,
    //         'transactions' => $setoranQuery->count(),
    //         'balance' => $user->balance ?? 0,
    //         'points' => $user->points ?? 0,
    //         'summary' => [
    //             'total_setoran' => $totalSetoran,
    //             'tanggal_terakhir' => $tanggalTerakhirSetoran,
    //         ],
    //         'latestTransactions' => $latestTransactions,
    //     ];

    //     return Inertia::render('User/Dashboard', [
    //         'user' => $userData,
    //     ]);
    // }

    public function index()
{
    $user = Auth::user();

    if (!$user) {
        return Inertia::render('User/Dashboard', [
            'user' => [
                'name' => 'Guest',
                'transactions' => 0,
                'balance' => 0,
                'points' => 0,
                'summary' => [
                    'total_setoran' => 0,
                    'total_poin' => 0,
                    'tanggal_terakhir' => null,
                ],
                'latestTransactions' => [],
            ]
        ]);
    }

    $setoranQuery = Setoran::where('user_id', $user->id);

    $totalSetoran = $setoranQuery->sum('berat_dalam_kg');
    $totalPoin = $setoranQuery->sum('poin_diperoleh');
    $tanggalTerakhirSetoran = $setoranQuery->max('created_at');

    $latestTransactions = $setoranQuery
    ->with('sampah') // <-- ini penting!
    ->latest()
    ->take(5)
    ->get();


    $userData = [
        'name' => $user->name,
        'transactions' => $setoranQuery->count(),
        'balance' => $user->balance ?? 0,
        'points' => $user->points ?? 0,
        'summary' => [
            'total_setoran' => $totalSetoran,
            'total_poin' => $totalPoin,
            'tanggal_terakhir' => $tanggalTerakhirSetoran,
        ],
        'latestTransactions' => $latestTransactions,
    ];

    return Inertia::render('User/Dashboard', [
        'user' => $userData,
    ]);
}

}
