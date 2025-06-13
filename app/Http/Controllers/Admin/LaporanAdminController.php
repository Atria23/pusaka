<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LaporanAdmin;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Exports\LaporanAdminExport;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;
class LaporanAdminController extends Controller
{
    public function index()
    {
        $laporan = DB::table(DB::raw('(SELECT DATE_FORMAT(created_at, "%d-%m-%Y") as periode FROM setoran UNION SELECT DATE_FORMAT(created_at, "%d-%m-%Y") as periode FROM penukaran) as days'))
            ->select([
                DB::raw('periode'),
                DB::raw('(SELECT COUNT(*) FROM setoran WHERE DATE_FORMAT(created_at, "%d-%m-%Y") = periode) as total_aktivitas_setoran'),
                DB::raw('(SELECT SUM(poin_diperoleh) FROM setoran WHERE DATE_FORMAT(created_at, "%d-%m-%Y") = periode) as total_poin_didapat_user'),
                DB::raw('(SELECT COUNT(*) FROM penukaran WHERE DATE_FORMAT(created_at, "%d-%m-%Y") = periode) as total_aktivitas_penukaran'),
            ])
            ->groupBy('periode')
            ->orderByDesc('periode')
            ->get();

        return Inertia::render('Admin/LaporanAdmin', [
            'laporan' => $laporan
        ]);
    }

    
    public function exportExcel()
    {
        return Excel::download(new LaporanAdminExport, 'laporan_admin.xlsx');
    }
    
    public function exportPdf()
    {
        $laporan = LaporanAdmin::orderBy('periode', 'desc')->get();
        $pdf = Pdf::loadView('exports.laporan_admin_pdf', compact('laporan'));
        return $pdf->download('laporan_admin.pdf');
    }
    
}
