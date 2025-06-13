<?php
// app/Models/LaporanPengguna.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LaporanPengguna extends Model
{
    protected $table = 'laporan_pengguna';

    protected $fillable = [
        'user_id',
        'kategori',
        'total_setoran',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
