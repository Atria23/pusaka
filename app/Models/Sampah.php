<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sampah extends Model
{
    use HasFactory;

    protected $table = 'sampah';

    protected $fillable = [
        'nama_sampah',
        'harga_per_kg',
        'image',
    ];

    public function setorans()
    {
        return $this->hasMany(Setoran::class);
    }

}