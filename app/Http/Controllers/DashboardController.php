<?php 
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'title' => 'Dashboard Admin',
            'menus' => [
                ['name' => 'Pengguna', 'route' => route('manage-users.index'), 'icon' => 'users'],
                // ['name' => 'Kelola Riwayat', 'route' => route('manage.history'), 'icon' => 'box'],
            ]
        ]);
    }
}
