<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Penukaran extends Model
{
    protected $table = 'penukaran'; // ✅ Tambahkan ini
    protected $fillable = ['user_id', 'voucher_id', 'poin_dipakai', 'status'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function voucher()
    {
        return $this->belongsTo(Voucher::class);
    }
}