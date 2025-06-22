<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class LaporanAdminExport implements FromCollection, WithHeadings
{
    protected $laporan;

    public function __construct($laporan)
    {
        $this->laporan = $laporan;
    }

    public function collection()
    {
        return collect($this->laporan)->map(function ($item) {
            return [
                'Periode' => $item->periode,
                'Nama User' => $item->user_name,
                'Sampah' => $item->sampah_nama,
                'Total Berat (kg)' => number_format($item->total_berat, 3, ',', '.'), // Format angka: koma sebagai desimal
            ];
        });
    }

    public function headings(): array
    {
        return ['Periode', 'Nama User', 'Sampah', 'Total Berat (kg)'];
    }
}
