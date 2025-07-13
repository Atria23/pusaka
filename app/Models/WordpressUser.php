<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WordpressUser extends Model
{
    protected $connection = 'wordpress';
    protected $table = 'users';

    protected $fillable = [ 
        'user_login',
        'user_pass',
        'user_nicename',
        'user_email',
        'user_registered',
        'user_status',
        'display_name',
    ];

    public $timestamps = false;
}
