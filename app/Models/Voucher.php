<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Voucher extends Model
{
    protected $fillable = ['nama', 'deskripsi', 'nilai_poin', 'stok', 'status', 'gambar'];

    public function penukarans()
    {
        return $this->hasMany(Penukaran::class);
    }
}