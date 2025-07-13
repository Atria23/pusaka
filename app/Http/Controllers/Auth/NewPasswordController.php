<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\WordpressUser;
use Hautelook\Phpass\PasswordHash;
use Illuminate\Support\Facades\DB;



class NewPasswordController extends Controller
{
    /**
     * Display the password reset view.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('Auth/ResetPassword', [
            'email' => $request->email,
            'token' => $request->route('token'),
        ]);
    }

    /**
     * Handle an incoming new password request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    // public function store(Request $request): RedirectResponse
    // {
    //     $request->validate([
    //         'token' => 'required',
    //         'email' => 'required|email',
    //         'password' => ['required', 'confirmed', Rules\Password::defaults()],
    //     ]);
    
    //     $status = Password::reset(
    //         $request->only('email', 'password', 'password_confirmation', 'token'),
    //         function ($user) use ($request) {
    //             $newPassword = $request->password;
    
    //             // ✅ Reset password di Laravel
    //             $user->forceFill([
    //                 'password' => Hash::make($newPassword),
    //                 'remember_token' => Str::random(60),
    //             ])->save();
    
    //             event(new PasswordReset($user));
    
    //             // ✅ Reset password di WordPress
    //             try {
    //                 $hasher = new PasswordHash(8, true);
    //                 $hashedPassword = $hasher->HashPassword($newPassword);
    
    //                 DB::connection('wordpress')
    //                     ->table('users') // TANPA prefix
    //                     ->where('user_email', $user->email)
    //                     ->update(['user_pass' => $hashedPassword]);
    //             } catch (\Exception $e) {
    //                 logger()->error('Gagal update password WordPress', [
    //                     'email' => $user->email,
    //                     'error' => $e->getMessage(),
    //                 ]);
    //             }
    //         }
    //     );
    
    //     if ($status == Password::PASSWORD_RESET) {
    //         return redirect()->route('reset.password.success')->with('status', __($status));
    //     }
    
    //     throw ValidationException::withMessages([
    //         'email' => [trans($status)],
    //     ]);
    // }
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);
    
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user) use ($request) {
                $newPassword = $request->password;
    
                // ✅ Reset password di Laravel
                $user->forceFill([
                    'password' => Hash::make($newPassword),
                    'remember_token' => Str::random(60),
                ])->save();
    
                event(new PasswordReset($user));
    
                // ✅ Reset password di WordPress
                try {
                    $hasher = new PasswordHash(8, true);
                    $hashedPassword = $hasher->HashPassword($newPassword);
    
                    DB::connection('wordpress')
                        ->table('users') // TANPA prefix
                        ->where('user_email', $user->email)
                        ->update(['user_pass' => $hashedPassword]);
                } catch (\Exception $e) {
                    logger()->error('Gagal update password WordPress', [
                        'email' => $user->email,
                        'error' => $e->getMessage(),
                    ]);
                }
            }
        );
    
        if ($status == Password::PASSWORD_RESET) {
            return redirect()->route('reset.password.success')->with('status', __($status));
        }
    
        throw ValidationException::withMessages([
            'email' => [trans($status)],
        ]);
    }
}
