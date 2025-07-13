<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\WordpressUser;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Hautelook\Phpass\PasswordHash;
use Illuminate\Support\Facades\DB;

class UserSyncController extends Controller
{
    public function syncToWordPress()
{
    $users = User::all();
    $hasher = new PasswordHash(8, true); // WordPress use portable hashes

    foreach ($users as $user) {
        $exists = WordpressUser::where('user_email', $user->email)->first();

        if (!$exists) {
            // Gunakan password default yang akan langsung bisa dipakai login WordPress
            $passwordPlain = 'barubaru';
            $hashedPassword = $hasher->HashPassword($passwordPlain);

            // Tambahkan user ke wp_users
            $wpUser = WordpressUser::create([
                'user_login'      => $user->kontak,
                'user_pass'       => $hashedPassword,
                'user_nicename'   => Str::slug($user->name),
                'user_email'      => $user->email,
                'user_registered' => now(),
                'user_status'     => 0,
                'display_name'    => $user->name,
            ]);

            // Tambahkan role 'subscriber' ke wp_usermeta
            // DB::connection('wordpress')->table('usermeta')->insert([
            //     [
            //         'user_id'   => $wpUser->ID,
            //         'meta_key'  => 'wp6b_capabilities', // ✅ sesuaikan prefix
            //         'meta_value'=> serialize(['subscriber' => true]),
            //     ],
            //     [
            //         'user_id'   => $wpUser->ID,
            //         'meta_key'  => 'wp6b_user_level', // ✅ sesuaikan prefix
            //         'meta_value'=> '0',
            //     ]
            // ]);

            // Tambahkan role 'subscriber' ke wp_usermeta
            $prefix = env('WP_DB_PREFIX', 'wp6b_');

            DB::connection('wordpress')->table('usermeta')->insert([
                [
                    'user_id'    => $wpUser->ID,
                    'meta_key'   => $prefix . 'capabilities',
                    'meta_value' => serialize(['subscriber' => true]),
                ],
                [
                    'user_id'    => $wpUser->ID,
                    'meta_key'   => $prefix . 'user_level',
                    'meta_value' => '0',
                ]
            ]);
        }
    }

    return response()->json(['message' => 'Sinkronisasi selesai. Password default: barubaru']);
}

}
