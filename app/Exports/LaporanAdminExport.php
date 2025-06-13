<?php

namespace App\Exports;

use App\Models\LaporanAdmin;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class LaporanAdminExport implements FromCollection, WithHeadings
{
    public function collection()
    {
        return LaporanAdmin::select('periode', 'total_aktivitas_setoran', 'total_poin_didapat_user', 'total_aktivitas_penukaran')->get();
    }

    public function headings(): array
    {
        return [
            'Periode',
            'Total Aktivitas Setoran',
            'Total Poin Didapat User',
            'Total Aktivitas Penukaran',
        ];
    }
}
