<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, HasRoles, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar',
        'rt',
        'rw',
        'alamat',
        'kontak',
        'pengelola_air_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Accessor for the avatar.
     */
    protected function avatar(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value != null ? asset('/storage/' . $value) : asset('avatar.png'),
        );
    }

    /**
     * Check if the user is a super admin.
     */
    public function isSuperAdmin()
    {
        return $this->hasRole('super-admin');
    }

    // Relasi ke Store
    public function store(): HasOne
    {
        return $this->hasOne(Store::class);
    }

    // Relasi ke Deposit
    public function deposits(): HasMany
    {
        return $this->hasMany(Deposit::class);
    }

    // Relasi ke Transaction
    public function transactions(): HasMany
    {
        return $this->hasMany(\App\Models\Transaction::class);
    }

    /**
     * Get all permissions for the user.
     */
    public function getPermissions()
    {
        return $this->getAllPermissions()->mapWithKeys(function ($permission) {
            return [
                $permission['name'] => true,
            ];
        });
    }

    public function pengelolaAir(): BelongsTo
    {
        return $this->belongsTo(PengelolaAir::class);
    }

}
