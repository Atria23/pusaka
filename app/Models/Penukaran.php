<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Penukaran extends Model
{
    protected $table = 'penukaran';
    protected $fillable = ['user_id', 'voucher_id', 'poin_dipakai', 'status'];

    public $incrementing = false; // Penting: non auto increment
    protected $keyType = 'string'; // Karena ULID itu string

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Str::ulid();
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function voucher()
    {
        return $this->belongsTo(Voucher::class);
    }
}
