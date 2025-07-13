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
    public function create()
    {
        $roles = Role::select('id', 'name')->orderBy('name')->get();

        return inertia('Apps/Users/Create', [
            'roles' => $roles
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'rt' => $request->rt,
            'rw' => $request->rw,
            'alamat' => $request->alamat,
            'kontak' => $request->kontak,
            'pengelola_air_id' => $request->pengelola_air_id,
        ]);

        $user->assignRole($request->selectedRoles);

        return to_route('manage-users.index');
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
    public function destroy($id)
    {
        $ids = explode(',', $id);

        if (count($ids) > 0) {
            User::whereIn('id', $ids)->delete();
        } else {
            User::findOrFail($id)->delete();
        }

        return back();
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
