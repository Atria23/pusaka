<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Setoran;
use App\Models\ProdukOlahan;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;

class WelcomeController extends Controller
{
    public function index()
    {
        if (Auth::check()) {
            $user = Auth::user();

            if ($user->roles()->where('role_id', 4)->exists()) {
                return redirect()->route('mimin.dashboard');
            }

            if ($user->roles()->where('role_id', 6)->exists()) {
                return redirect()->route('admin.dashboard');
            }

            if ($user->roles()->where('role_id', 7)->exists()) {
                return redirect()->route('admin-air.dashboard');
            }

            return redirect()->route('user.dashboard');
        }

        // Data statistik yang benar
        $totalUsers = User::count();
        $totalSetoran = Setoran::count();
        $totalBeratSampah = Setoran::sum('berat_dalam_kg');
        $totalProdukOlahan = ProdukOlahan::count();

        return Inertia::render('Welcome', [
            'totalUsers' => number_format($totalUsers, 0, ',', '.'),
            'totalSetoran' => number_format($totalSetoran, 0, ',', '.'),
            'totalBeratSampah' => number_format($totalBeratSampah, 0, ',', '.'),
            'totalProdukOlahan' => number_format($totalProdukOlahan, 0, ',', '.'),
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }
}
