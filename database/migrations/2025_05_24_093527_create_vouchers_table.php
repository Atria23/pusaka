<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('vouchers', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 100);
            $table->text('deskripsi')->nullable();
            $table->integer('nilai_poin');
            $table->integer('stok')->default(0);
            $table->enum('status', ['tersedia', 'tidak tersedia'])->default('tersedia');
            $table->string('gambar')->nullable(); // kolom untuk menyimpan path gambar
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vouchers');
    }
};
