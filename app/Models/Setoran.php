<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setoran extends Model
{
    protected $table = 'setoran';

    protected $fillable = [
        'user_id',
        'sampah_id',
        'berat_dalam_kg',
        'poin_diperoleh',
        'tanggal'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function sampah()
    {
        return $this->belongsTo(Sampah::class);
    }
}
