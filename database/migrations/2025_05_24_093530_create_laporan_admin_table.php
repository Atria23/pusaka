<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('laporan_admin', function (Blueprint $table) {
            $table->id('id');
            $table->date('periode');
            $table->integer('total_aktivitas_setoran');
            $table->integer('total_poin_didapat_user')->nullable();
            $table->integer('total_aktivitas_penukaran')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('laporan_admin');
    }
};
