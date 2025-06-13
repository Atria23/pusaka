<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProdukOlahan extends Model
{
    use HasFactory;

    protected $table = 'produk_olahan';

    protected $fillable = ['nama_produk', 'sampah_id', 'foto'];

    public function sampah()
    {
        return $this->belongsTo(Sampah::class);
    }
}
