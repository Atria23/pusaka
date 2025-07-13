<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PengelolaAir extends Model
{
    use HasFactory;
    protected $table = 'pengelola_air';

    protected $fillable = ['nama', 'alamat', 'keterangan'];

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}
