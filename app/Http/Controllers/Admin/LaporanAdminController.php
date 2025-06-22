<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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
        $laporan = DB::table('setoran')
        ->join('sampah', 'setoran.sampah_id', '=', 'sampah.id')
        ->join('users', 'setoran.user_id', '=', 'users.id')
        ->selectRaw('
            DATE_FORMAT(setoran.tanggal, "%d-%m-%Y") as periode,
            setoran.user_id,
            CONCAT(
                users.name, " ", LPAD(users.rt,2,"0"), "/", LPAD(users.rw,2,"0"), 
                IF(users.kontak IS NOT NULL AND users.kontak != "", CONCAT(" - ", users.kontak), "")
            ) as user_name,
            sampah.nama_sampah as sampah_nama,
            SUM(setoran.berat_dalam_kg) as total_berat
        ')
        ->groupByRaw('periode, setoran.user_id, sampah.nama_sampah, users.name, users.rt, users.rw, users.kontak')
        ->orderByRaw('MAX(setoran.tanggal) DESC')
        ->get();

    
        $userCount = DB::table('setoran')
            ->selectRaw('DATE_FORMAT(tanggal, "%d-%m-%Y") as periode, COUNT(DISTINCT user_id) as total_user_setor')
            ->groupByRaw('periode')
            ->get()
            ->keyBy('periode');
    
        return Inertia::render('Admin/LaporanAdmin', [
            'laporan' => $laporan,
            'userCount' => $userCount,
        ]);
    }
    public function exportExcel()
    {
        $laporan = DB::table('setoran')
        ->join('sampah', 'setoran.sampah_id', '=', 'sampah.id')
        ->join('users', 'setoran.user_id', '=', 'users.id')
        ->selectRaw('
            DATE_FORMAT(setoran.tanggal, "%d-%m-%Y") as periode,
            setoran.user_id,
            CONCAT(
                users.name, " ", LPAD(users.rt,2,"0"), "/", LPAD(users.rw,2,"0"), 
                IF(users.kontak IS NOT NULL AND users.kontak != "", CONCAT(" - ", users.kontak), "")
            ) as user_name,
            sampah.nama_sampah as sampah_nama,
            SUM(setoran.berat_dalam_kg) as total_berat
        ')
        ->groupByRaw('periode, setoran.user_id, sampah.nama_sampah, users.name, users.rt, users.rw, users.kontak')
        ->orderByRaw('MAX(setoran.tanggal) DESC')
        ->get();

    
        return Excel::download(new LaporanAdminExport($laporan), 'laporan_admin.xlsx');
    }
        
    
}
