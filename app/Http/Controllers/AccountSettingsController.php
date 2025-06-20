<?php

// namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use Illuminate\Support\Str;

// class AccountSettingsController extends Controller
// {
//     public function index()
//     {
//         $user = auth()->user();

//         return inertia('AccountSettings', [
//             'user' => [
//                 'name' => $user->name,
//                 'avatar' => $user->avatar ? '/storage/avatars/' . basename($user->avatar) : null,
//                 'email' => $user->email,
//                 'email_verified_at' => $user->email_verified_at,
//                 'rt' => $user-> $rt,
//                 'rw' => $user-> $rw,
//                 'alamat' => $user-> $request->alamat,
//                 'kontak' => $user-> $request->kontak,
//             ],
//         ]);
//     }

//     public function update(Request $request)
//     {
//         $validated = $request->validate([
//             'name' => 'required|string|max:255',
//             'avatar' => 'nullable|image|max:2048',
//         ]);

//         $user = auth()->user();
//         $user->name = $validated['name'];

//         if ($request->hasFile('avatar')) {
//             // Gunakan nama file lama jika ada, jika tidak buat nama baru
//             $avatarFileName = ($user->avatar && basename($user->avatar) === 'avatar.png')
//             ? Str::uuid() . '.' . $request->file('avatar')->getClientOriginalExtension()
//             : ($user->avatar ? basename($user->avatar) : $request->file('avatar')->hashName());
        
//             // Hapus avatar lama jika ada
//             $this->deleteOldAvatar($user->avatar);

//             // Simpan avatar baru dengan nama lama atau nama baru
//             $avatarPath = $request->file('avatar')->storeAs('avatars', $avatarFileName, 'public');
//             $user->avatar = $avatarPath;
//         }

//         $user->save();

//         return redirect()->back()->with('status', 'Pengaturan akun berhasil diperbarui.');
//     }

//     private function deleteOldAvatar($avatarPath)
//     {
//         if ($avatarPath) {
//             $fullPath = storage_path('app/public/' . $avatarPath);
//             if (file_exists($fullPath)) {
//                 unlink($fullPath);
//             }
//         }
//     }
// }
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AccountSettingsController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        return inertia('AccountSettings', [
            'user' => [
                'name' => $user->name,
                'avatar' => $user->avatar ? '/storage/avatars/' . basename($user->avatar) : null,
                'email' => $user->email,
                'email_verified_at' => $user->email_verified_at,
                'rt' => $user->rt,
                'rw' => $user->rw,
                'alamat' => $user->alamat,
                'kontak' => $user->kontak,
            ],
        ]);
    }

    public function update(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'avatar' => 'nullable|image|max:2048',
        'rt' => 'nullable|string|max:10',
        'rw' => 'nullable|string|max:10',
        'alamat' => 'nullable|string|max:255',
        'kontak' => 'nullable|string|max:20',
    ]);

    // Format RT dan RW jadi dua digit
    $rt = $request->rt;
    $rw = $request->rw;

    if (strlen($rt) === 1) {
        $rt = '0' . $rt;
    }

    if (strlen($rw) === 1) {
        $rw = '0' . $rw;
    }

    $user = auth()->user();
    $user->name = $validated['name'];
    $user->rt = $rt;
    $user->rw = $rw;
    $user->alamat = $validated['alamat'] ?? null;
    $user->kontak = $validated['kontak'] ?? null;

    if ($request->hasFile('avatar')) {
        $avatarFileName = ($user->avatar && basename($user->avatar) === 'avatar.png')
            ? Str::uuid() . '.' . $request->file('avatar')->getClientOriginalExtension()
            : ($user->avatar ? basename($user->avatar) : $request->file('avatar')->hashName());

        $this->deleteOldAvatar($user->avatar);

        $avatarPath = $request->file('avatar')->storeAs('avatars', $avatarFileName, 'public');
        $user->avatar = $avatarPath;
    }

    $user->save();

    return redirect()->back()->with('status', 'Pengaturan akun berhasil diperbarui.');
}


    private function deleteOldAvatar($avatarPath)
    {
        if ($avatarPath) {
            $fullPath = storage_path('app/public/' . $avatarPath);
            if (file_exists($fullPath)) {
                unlink($fullPath);
            }
        }
    }
}
