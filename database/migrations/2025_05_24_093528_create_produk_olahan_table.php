<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('produk_olahan', function (Blueprint $table) {
            $table->id('id');
            $table->string('nama_produk', 100);
            $table->foreignId('sampah_id')->constrained('sampah');
            $table->string('foto')->nullable();
            $table->string('link_pembelian')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('produk_olahan');
    }
};
