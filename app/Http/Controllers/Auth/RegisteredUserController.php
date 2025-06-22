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

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'rt' => $rt,
        'rw' => $rw,
        'alamat' => $request->alamat,
        'kontak' => $request->kontak,
    ]);

    // Assign role 'user'
    $user->assignRole('user');

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
