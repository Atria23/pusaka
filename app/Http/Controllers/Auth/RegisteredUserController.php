<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use App\Models\WordpressUser;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Hautelook\Phpass\PasswordHash;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }
        
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);
    
        $rt = $request->rt;
        $rw = $request->rw;
    
        // Jika panjang 1 digit, tambahkan 0 di depan
        if (strlen($rt) === 1) {
            $rt = '0' . $rt;
        }
    
        if (strlen($rw) === 1) {
            $rw = '0' . $rw;
        }
    
        // ✅ Simpan password plain untuk sinkronisasi
        $passwordPlain = $request->password;
    
        // Buat user di Laravel
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($passwordPlain),
            'rt' => $rt,
            'rw' => $rw,
            'alamat' => $request->alamat,
            'kontak' => $request->kontak,
        ]);
    
        $user->assignRole('user');
    
        $hasher = new \Hautelook\Phpass\PasswordHash(8, true);
    
    $exists = \App\Models\WordpressUser::where('user_email', $user->email)->first();
    
    if (!$exists) {
        $hashedPassword = $hasher->HashPassword($request->password);
    
        $wpUser = \App\Models\WordpressUser::create([
            'user_login'      => Str::slug($user->name),
            'user_pass'       => $hashedPassword,
            'user_nicename'   => Str::slug($user->name),
            'user_email'      => $user->email,
            'user_registered' => now(),
            'user_status'     => 0,
            'display_name'    =>  $user->name . ' - ' . $user->kontak . ' - ' . $user->email,
        ]);
    
        DB::connection('wordpress')->table('usermeta')->insert([
            [
                'user_id'   => $wpUser->ID,
                'meta_key'  => 'wp6b_capabilities', // ganti sesuai prefix kamu
                'meta_value'=> serialize(['subscriber' => true]),
            ],
            [
                'user_id'   => $wpUser->ID,
                'meta_key'  => 'wp6b_user_level',
                'meta_value'=> '0',
            ]
        ]);
    }

    try {
        event(new Registered($user));
    } catch (\Exception $e) {
        return back()->withErrors([
            'email' => 'Gagal mengirim email verifikasi. Silakan cek kembali email Anda atau hubungi admin.'
        ]);
    }

    Auth::login($user);

    return redirect(route('verification.notice', absolute: false));
}

} 
