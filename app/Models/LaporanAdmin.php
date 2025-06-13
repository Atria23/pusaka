<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LaporanAdmin extends Model
{
    use HasFactory;

    protected $table = 'laporan_admin';

    protected $fillable = [
        'periode',
        'total_aktivitas_setoran',
        'total_poin_didapat_user',
        'total_aktivitas_penukaran',
    ];
}
