<?php
// app/Http/Controllers/Admin/LaporanPenggunaController.php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LaporanPengguna;
use Inertia\Inertia;

class LaporanPenggunaController extends Controller
{
    public function index()
    {
        $laporan = LaporanPengguna::with('user:id,name')
            ->latest()
            ->get();

        return Inertia::render('Admin/LaporanPengguna', [
            'laporan' => $laporan
        ]);
    }
}
