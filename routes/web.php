<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Apps\PermissionController;
use App\Http\Controllers\Apps\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\User\UserDashboardController;
use App\Http\Controllers\Auth\AuthenticatedSessionController; 
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\EmailVerificationController;
use App\Http\Controllers\AccountSettingsController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PrivacyPolicyController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\Admin\LaporanAdminController;
use App\Http\Controllers\Admin\SampahController;
use App\Http\Controllers\Admin\SetoranController;
use App\Http\Controllers\VoucherController;
use App\Http\Controllers\PenukaranController;
use App\Http\Controllers\ProdukOlahanController;
use App\Http\Controllers\UserSyncController;
use App\Http\Controllers\Auth\OtpResetRequestController;
use App\Http\Controllers\Auth\ResetWithOtpController;
use App\Http\Controllers\PengelolaAirController;
use App\Http\Controllers\AdminAir\AdminAirDashboardController;
use App\Http\Controllers\Admin\BroadcastController;
// routes/web.php
use App\Http\Controllers\ChatController;

Route::middleware(['admin-air'])->prefix('admin-air')->group(function () {
    Route::get('/dashboard', [AdminAirDashboardController::class, 'index'])->name('admin-air.dashboard');
    Route::get('/penukarans', [PenukaranController::class, 'adminAirIndex'])->name('admin-air.penukarans.index');
    Route::put('/penukarans/{penukaran}/status', [PenukaranController::class, 'updateStatusRedeem'])->name('admin-air.penukarans.status');
});

Route::get('/reset-password-otp', [ResetWithOtpController::class, 'create'])->name('password.otp.reset');
Route::post('/reset-password-otp', [ResetWithOtpController::class, 'store'])->name('password.otp.reset.submit');
// Kontak/OTP reset (baru)
Route::get('/forgot-password-otp', [OtpResetRequestController::class, 'create'])->name('password.otp.request');
Route::post('/forgot-password-otp', [OtpResetRequestController::class, 'store'])->name('password.otp.send');

Route::get('/sync-users', [\App\Http\Controllers\UserSyncController::class, 'syncToWordPress']);

Route::get('reset-password-success', function () {
    return Inertia::render('Auth/ResetPasswordSuccess');
})->name('reset.password.success');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/', [WelcomeController::class, 'index']);

Route::get('/privacy-policy', [PrivacyPolicyController::class, 'index'])->name('privacy');

Route::middleware(['auth'])->group(function () {

// Halaman utama chat (GET)
Route::get('/chat', [ChatController::class, 'index'])->name('chat.index');
// routes/web.php
Route::post('/chat/send', [ChatController::class, 'send']);
    Route::get('/galeri-produk', [ProdukOlahanController::class, 'indexUser'])->name('produk-olahan.user.index');

    Route::get('vouchers', [VoucherController::class, 'listForUser'])->name('voucher');

    Route::get('penukaran', [PenukaranController::class, 'index'])->name('penukaran');
    Route::post('penukaran/tukar', [PenukaranController::class, 'tukar']);
    
    Route::get('/riwayat-setoran', [SetoranController::class, 'riwayat'])->name('user.riwayat');

    Route::get('/sampah', [SampahController::class, 'userIndex'])->name('setoran');

    // Menampilkan halaman verifikasi email
    Route::get('/email/verify', [EmailVerificationController::class, 'show'])
        ->name('verification.email');
    
        // Mengirim ulang link verifikasi
    Route::post('/email/verification-notification', [EmailVerificationController::class, 'send'])
        ->name('verification.send');

    Route::get('/account', [AccountSettingsController::class, 'index'])->name('account.settings');
    Route::post('/account', [AccountSettingsController::class, 'update'])->name('account.settings.update');
    
    Route::get('/dashboard', [UserDashboardController::class, 'index'])->name('user.dashboard');

    Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
});

Route::middleware(['admin'])->get('/admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');

Route::middleware(['admin-or-super-admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::post('/broadcast/test', [BroadcastController::class, 'test'])->name('broadcast.test');

    Route::get('/broadcast', [BroadcastController::class, 'create'])->name('broadcast.create');
    Route::post('/broadcast', [BroadcastController::class, 'store'])->name('broadcast.store');
    Route::resource('pengelola-air', PengelolaAirController::class);
    Route::resource('produk-olahan', ProdukOlahanController::class)->except(['show']);

    Route::resource('vouchers', VoucherController::class)->except(['show']);

    Route::get('penukarans', [PenukaranController::class, 'adminIndex']);
    Route::put('penukarans/{penukaran}/status', [PenukaranController::class, 'updateStatusRedeem']);

    Route::get('/laporan-admin', [LaporanAdminController::class, 'index'])->name('laporan.index');
    Route::get('/laporan-admin/export/excel', [LaporanAdminController::class, 'exportExcel'])->name('laporan.export.excel');
    Route::get('/laporan-admin/export/pdf', [LaporanAdminController::class, 'exportPdf'])->name('laporan.export.pdf');    
    Route::resource('vouchers', VoucherController::class)->except(['show', 'create', 'edit']);
    
    Route::get('/setoran', [SetoranController::class, 'index']);
    Route::post('/setoran', [SetoranController::class, 'store']);
    Route::put('/setoran/{setoran}', [SetoranController::class, 'update']);
    Route::delete('/setoran/{setoran}', [SetoranController::class, 'destroy']);

    Route::get('/view-users/{user}', [UserController::class, 'show'])->name('manage-users.show');

    Route::get('/sampah', [SampahController::class, 'index'])->name('sampah.index');
    Route::post('/sampah', [SampahController::class, 'store'])->name('sampah.store');
    Route::put('/sampah/{id}', [SampahController::class, 'update'])->name('sampah.update');
    Route::delete('/sampah/{id}', [SampahController::class, 'destroy'])->name('sampah.destroy');
});

Route::middleware(['super-admin'])->group(function () {
    Route::get('/mimin/dashboard', [DashboardController::class, 'index'])->name('mimin.dashboard');
    Route::resource('/manage-users', UserController::class)
        ->parameters(['manage-users' => 'user']) // <- ubah parameter jadi 'user'
        ->except('show')
        ->names([
            'index'   => 'manage-users.index',
            'create'  => 'manage-users.create',
            'store'   => 'manage-users.store',
            'edit'    => 'manage-users.edit',
            'update'  => 'manage-users.update',
            'destroy' => 'manage-users.destroy',
        ]);
});

require __DIR__.'/auth.php';