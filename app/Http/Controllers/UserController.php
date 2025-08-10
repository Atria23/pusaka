<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\UserRequest;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\DB;
use Hautelook\Phpass\PasswordHash;
use App\Models\PengelolaAir;
use Illuminate\Support\Facades\Hash; // <-- Tambahkan ini
use Illuminate\Support\Str; // <-- Tambahkan ini
use App\Models\WordpressUser; // <-- Tambahkan ini

class UserController extends Controller implements HasMiddleware
{
    /**
     * middleware
     */
    public static function middleware()
    {
        return [
            new Middleware('permission:users-data', only: ['index']),
            new Middleware('permission:users-create', only: ['create']),
            new Middleware('permission:users-update', only: ['update']),
            new Middleware('permission:users-destroy', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::select('id', 'points', 'name', 'avatar', 'email', 'created_at', 'rt', 'rw', 'alamat', 'kontak')
            ->with('roles')
            ->get();

        return inertia('ManageUsers', [
            'users' => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */

    //     public function create()
    // {
    //     // Ambil semua roles dan data pengelola air
    //     $roles = Role::all();
    //     $pengelolaList = PengelolaAir::all(); // Sesuaikan jika nama model atau query-nya berbeda

    //     // Render komponen Inertia 'ManageUsers/Create' dan kirimkan props yang dibutuhkan
    //     return inertia('ManageUserCreate', [
    //         'roles' => $roles,
    //         'pengelolaList' => $pengelolaList,
    //     ]);
    // }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(UserRequest $request)
    // {
    //     $user = User::create([
    //         'name' => $request->name,
    //         'email' => $request->email,
    //         'password' => bcrypt($request->password),
    //         'rt' => $request->rt,
    //         'rw' => $request->rw,
    //         'alamat' => $request->alamat,
    //         'kontak' => $request->kontak,
    //         'pengelola_air_id' => $request->pengelola_air_id,
    //     ]);

    //     $user->assignRole($request->selectedRoles);

    //     return to_route('manage-users.index');
    // }

    public function create()
    {
        return Inertia::render('ManageUsers/Create', [
            'roles' => Role::all(),
            'pengelolaList' => PengelolaAir::all(),
        ]);
    }

    /**
     * Menyimpan user baru ke database Laravel dan WordPress.
     */
    public function store(Request $request): RedirectResponse
    {
        // 1. Validasi Input
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|string|lowercase|email|max:255|unique:users,email',
            'kontak' => 'required|string|max:20|unique:users,kontak',
            'rt' => 'required|string|max:2',
            'rw' => 'required|string|max:2',
            'alamat' => 'required|string',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'pengelola_air_id' => 'nullable|exists:pengelola_air,id',
        ]);

        // 2. Format Data Tambahan (RT, RW, Email)
        $rt = str_pad($request->rt, 2, '0', STR_PAD_LEFT);
        $rw = str_pad($request->rw, 2, '0', STR_PAD_LEFT);
    
        $nomorHp = preg_replace('/[^0-9]/', '', $request->kontak);
        $email = $request->filled('email')
            ? strtolower(trim($request->email))
            : $nomorHp . '@pusaka.local';

        // 3. Buat User di Database Laravel
        $user = User::create([
            'name' => $request->name,
            'email' => $email,
            'password' => Hash::make($request->password),
            'rt' => $rt,
            'rw' => $rw,
            'alamat' => $request->alamat,
            'kontak' => $nomorHp,
            'pengelola_air_id' => $request->pengelola_air_id,
        ]);
    
        // Berikan role default 'user'
        $user->assignRole('user');
    
        // 4. Sinkronisasi ke WordPress
        $exists = WordpressUser::where('user_email', $email)->orWhere('user_login', $nomorHp)->first();
    
        if (!$exists) {
            // Gunakan Phpass untuk hash password WordPress
            $hasher = new PasswordHash(8, true);
            $hashedPassword = $hasher->HashPassword($request->password);
            
            $wpUser = WordpressUser::create([
                'user_login'    => $nomorHp,
                'user_pass'     => $hashedPassword,
                'user_nicename' => Str::slug($request->name),
                'user_email'    => $email,
                'user_registered' => now(),
                'user_status'   => 0,
                'display_name'  => $request->name,
            ]);
            
            // Tambahkan usermeta (capabilities & user level)
            $prefix = env('WP_DB_PREFIX', 'wp_');
    
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

        // 5. Redirect ke halaman index
        return to_route('manage-users.index')->with('success', 'Pengguna baru berhasil dibuat dan disinkronkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $roles = Role::select('id', 'name')->orderBy('name')->get();
        $pengelolaList = PengelolaAir::select('id', 'nama')->get();

        $user->load([
            'roles' => fn($query) => $query->select('id', 'name'),
            'roles.permissions' => fn($query) => $query->select('id', 'name'),
            'pengelolaAir:id,nama',
        ]);
    
        return inertia('ManageUserDetail', [
            'roles' => $roles,
            'pengelolaList' => $pengelolaList,
            'user' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, User $user)
    {
        $oldEmail = $user->email;

        // Update user Laravel
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'rt' => $request->rt,
            'rw' => $request->rw,
            'alamat' => $request->alamat,
            'kontak' => $request->kontak,
            'pengelola_air_id' => $request->pengelola_air_id,
        ]);

        // Simpan password baru jika diisi
        if ($request->filled('password')) {
            $user->update([
                'password' => bcrypt($request->password),
            ]);
        }

        $user->syncRoles($request->selectedRoles);

        // ==== UPDATE ke WordPress ====
        $displayName = $user->name . '_' . $user->kontak . '_' . $user->email;

        // Siapkan updater WordPress
        $wpUpdate = [
            'user_login'    => $user->kontak,
            'user_email'    => $user->email,
            'display_name'  => $displayName,
        ];

        // Jika password baru diisi, hash dengan format WordPress
        if ($request->filled('password')) {
            $hasher = new PasswordHash(8, true); // sama seperti WordPress
            $wpUpdate['user_pass'] = $hasher->HashPassword($request->password);
        }

        // Lakukan update ke wp_users
        DB::connection('wordpress')
            ->table('users') // ganti ke 'wp6b_users' jika prefix belum otomatis
            ->where('user_email', $oldEmail)
            ->update($wpUpdate);

        return to_route('manage-users.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    // public function destroy($id)
    // {
    //     $ids = explode(',', $id);

    //     if (count($ids) > 0) {
    //         User::whereIn('id', $ids)->delete();
    //     } else {
    //         User::findOrFail($id)->delete();
    //     }

    //     return back();
    // }
    public function destroy($id)
    {
        // 1. Konversi string ID (bisa tunggal atau jamak) menjadi array
        $laravelUserIds = explode(',', $id);

        // 2. Temukan semua user di database Laravel untuk mendapatkan detailnya
        // Kita butuh email & kontak untuk sinkronisasi penghapusan
        $usersToDelete = User::whereIn('id', $laravelUserIds)->get();

        // Jika tidak ada user yang ditemukan sama sekali, kembali dengan pesan error
        if ($usersToDelete->isEmpty()) {
            return back()->with('error', 'User yang akan dihapus tidak ditemukan.');
        }

        // 3. Kumpulkan email dan kontak dari user yang akan dihapus
        $emailsToDelete = $usersToDelete->pluck('email')->toArray();
        $kontaksToDelete = $usersToDelete->pluck('kontak')->toArray(); // 'kontak' adalah 'user_login' di WP

        // 4. Temukan user yang sesuai di database WordPress berdasarkan email ATAU kontak
        $wpUsers = WordpressUser::whereIn('user_email', $emailsToDelete)
                                  ->orWhereIn('user_login', $kontaksToDelete)
                                  ->get();

        // 5. Jika user WordPress ditemukan, hapus mereka beserta metadatanya
        if ($wpUsers->isNotEmpty()) {
            $wpUserIds = $wpUsers->pluck('ID')->toArray();

            // Hapus metadata terlebih dahulu (dari tabel wp_usermeta)
            // Menggunakan koneksi 'wordpress' secara eksplisit
            DB::connection('wordpress')
              ->table('usermeta')
              ->whereIn('user_id', $wpUserIds)
              ->delete();

            // Hapus user utama dari tabel wp_users
            WordpressUser::whereIn('ID', $wpUserIds)->delete();
        }

        // 6. Terakhir, setelah sinkronisasi selesai, hapus user dari database Laravel
        User::whereIn('id', $laravelUserIds)->delete();

        // 7. Kembali ke halaman sebelumnya dengan pesan sukses
        return back()->with('success', 'User yang dipilih berhasil dihapus dari sistem.');
    }

    public function show(User $user)
    {
        $user->load([
            'roles' => fn($query) => $query->select('id', 'name'),
            'roles.permissions' => fn($query) => $query->select('id', 'name')
        ]);

        return inertia('Admin/ManageUserView', [
            'user' => $user
        ]);
    }

}
