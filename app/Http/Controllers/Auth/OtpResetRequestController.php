<?php

// namespace App\Http\Controllers\Auth;

// use App\Http\Controllers\Controller;
// use App\Models\User;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Cache;
// use Illuminate\Support\Facades\Validator;
// use Illuminate\Support\Str;
// use Illuminate\Support\Facades\Log;
// use Illuminate\Support\Facades\Http;
// use Inertia\Inertia;

// class OtpResetRequestController extends Controller
// {
//     public function create()
//     {
//         return Inertia::render('Auth/ForgotPasswordOtp', [
//             'status' => session('status'),
//         ]);
//     }

//     public function store(Request $request)
//     {
//         $request->validate([
//             'kontak' => ['required', 'string', 'regex:/^08[0-9]{8,13}$/'],
//         ]);

//         $user = User::where('kontak', $request->kontak)->first();

//         if (! $user) {
//             return back()->withErrors(['kontak' => 'Nomor tidak terdaftar.']);
//         }

//         $otp = rand(100000, 999999);
//         $otpKey = 'otp_' . $request->kontak;

//         Cache::put($otpKey, $otp, now()->addMinutes(10)); // Simpan OTP 10 menit

//         // Kirim OTP (bisa disesuaikan dengan gateway SMS, contoh log):
//         Log::info("OTP untuk reset password kontak {$request->kontak} adalah $otp");

//         return back()->with([
//             'status' => 'Kode OTP berhasil dikirim',
//             'otp' => $otp,
//             'kontak' => $request->kontak,
//         ]);
//     }
// }



























namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use App\Mail\OtpAdminNotification;

class OtpResetRequestController extends Controller
{
    public function create()
    {
        return Inertia::render('Auth/ForgotPasswordOtp', [
            'status' => session('status'),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'kontak' => ['required', 'string', 'regex:/^08[0-9]{8,13}$/'],
        ]);

        $user = User::where('kontak', $request->kontak)->first();

        if (! $user) {
            return back()->withErrors(['kontak' => 'Nomor tidak terdaftar.']);
        }

        $otp = rand(100000, 999999);
        $otpKey = 'otp_' . $request->kontak;

        Cache::put($otpKey, $otp, now()->addMinutes(10)); // Simpan OTP 10 menit

        // Kirim OTP (bisa disesuaikan dengan gateway SMS, contoh log):
        Log::info("OTP untuk reset password kontak {$request->kontak} adalah $otp");

        // ✅ Kirim ke email admin
        $emails = explode(',', env('ADMIN_EMAIL'));
        foreach ($emails as $email) {
            Mail::to(trim($email))->send(new OtpAdminNotification($request->kontak, $otp));
        }

        return back()->with([
            'status' => 'Kode OTP berhasil dikirim',
            'otp' => $otp,
            'kontak' => $request->kontak,
        ]);
    }
}
