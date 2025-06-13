<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('penukaran', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('voucher_id')->constrained('vouchers')->cascadeOnDelete();
            $table->integer('poin_dipakai');
            $table->timestamp('tanggal')->useCurrent();
            $table->enum('status', ['belum diredeem', 'sudah diredeem'])->default('belum diredeem'); // Status penukaran
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('penukaran');
    }
};
