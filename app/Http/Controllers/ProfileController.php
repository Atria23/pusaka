<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\TransactionsHistory;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index()
    {
        // Ambil user yang sedang login
        $user = Auth::user();

        // Menyiapkan data user dengan nilai default jika kosong
        $userData = [
            'name' => optional($user)->name ?? 'Guest',
            'avatar' => $user->avatar ? '/storage/avatars/' . basename($user->avatar) : null,
            'email' => optional($user)->email ?? '@gmail.com', 
            'balance' => optional($user)->balance ?? 0,
            'points' => optional($user)->points ?? 0,
            'depositHistory' => optional($user)->depositHistory ?? [],
            // 'addMenu' => $user->hasRole('super-admin'),
            'addMenu' => $user->hasAnyRole(['admin', 'super-admin']),
        ];

        return Inertia::render('User/Profile', [
            'user' => $userData,
        ]);
    }
}
