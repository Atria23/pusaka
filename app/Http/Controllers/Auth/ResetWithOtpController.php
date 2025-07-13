<?php

// namespace App\Http\Controllers\Auth;

// use App\Http\Controllers\Controller;
// use App\Models\User;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Cache;
// use Illuminate\Support\Facades\Hash;
// use Illuminate\Validation\ValidationException;
// use Inertia\Inertia;

// class ResetWithOtpController extends Controller
// {
//     public function create(Request $request)
//     {
//         return Inertia::render('Auth/ResetPasswordOtp', [
//             'kontak' => $request->kontak ?? '',
//         ]);
//     }

//     public function store(Request $request)
//     {
//         $request->validate([
//             'kontak'   => 'required|string|regex:/^08[0-9]{8,13}$/',
//             'otp'      => 'required|digits:6',
//             'password' => ['required', 'confirmed', 'min:6'],
//         ]);

//         $otpKey = 'otp_' . $request->kontak;
//         $cachedOtp = Cache::get($otpKey);

//         if (!$cachedOtp || $cachedOtp != $request->otp) {
//             throw ValidationException::withMessages([
//                 'otp' => 'Kode OTP tidak valid atau sudah kadaluarsa.',
//             ]);
//         }

//         $user = User::where('kontak', $request->kontak)->first();

//         if (!$user) {
//             throw ValidationException::withMessages([
//                 'kontak' => 'Nomor tidak ditemukan.',
//             ]);
//         }

//         $user->update([
//             'password' => Hash::make($request->password),
//         ]);

//         Cache::forget($otpKey);

//         return redirect()->route('login')->with('status', 'Password berhasil diubah, silakan login.');
//     }
// }


























namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Hautelook\Phpass\PasswordHash;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ResetWithOtpController extends Controller
{
    public function create(Request $request)
    {
        return Inertia::render('Auth/ResetPasswordOtp', [
            'kontak' => $request->kontak ?? '',
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'kontak'   => 'required|string|regex:/^08[0-9]{8,13}$/',
            'otp'      => 'required|digits:6',
            'password' => ['required', 'confirmed', 'min:6'],
        ]);

        $otpKey = 'otp_' . $request->kontak;
        $cachedOtp = Cache::get($otpKey);

        if (!$cachedOtp || $cachedOtp != $request->otp) {
            throw ValidationException::withMessages([
                'otp' => 'Kode OTP tidak valid atau sudah kadaluarsa.',
            ]);
        }

        $user = User::where('kontak', $request->kontak)->first();

        if (!$user) {
            throw ValidationException::withMessages([
                'kontak' => 'Nomor tidak ditemukan.',
            ]);
        }

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        // ✅ Update password WordPress
        try {
            $hasher = new PasswordHash(8, true);
            $hashedPassword = $hasher->HashPassword($request->password);
        
            DB::connection('wordpress')
                ->table('users') // ganti dengan 'wp6b_users' jika prefix tidak otomatis
                ->where('user_email', $user->email)
                ->update(['user_pass' => $hashedPassword]);
        } catch (\Exception $e) {
            logger()->error('Gagal update password WordPress dari OTP reset', [
                'kontak' => $user->kontak,
                'email' => $user->email,
                'error' => $e->getMessage(),
            ]);
        }

        Cache::forget($otpKey);

        return redirect()->route('login')->with('status', 'Password berhasil diubah, silakan login.');
    }
}
