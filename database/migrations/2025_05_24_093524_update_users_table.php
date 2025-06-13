<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Hapus kolom yang tidak diperlukan
            $table->dropColumn([
                'username',
                'phone_number',
                'pin',
                'balance',
                'referral_code',
                'membership_status',
            ]);

            // Tambahkan kolom baru
            $table->char('rt', 2)->nullable();
            $table->char('rw', 2)->nullable();
            $table->text('alamat')->nullable();
            $table->string('kontak', 20)->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Hapus kolom baru
            $table->dropColumn(['rt', 'rw', 'alamat', 'kontak']);

            // Tambahkan kembali kolom yang dihapus
            $table->string('username')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('pin')->nullable();
            $table->decimal('balance', 12, 2)->default(0);
            $table->string('referral_code', 100)->nullable();
            $table->string('membership_status')->default('basic');
        });
    }
};
