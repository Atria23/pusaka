<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('pengelola_air_id')
                  ->nullable()
                  ->constrained('pengelola_air')
                  ->onDelete('set null')
                  ->after('kontak');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['pengelola_air_id']);
            $table->dropColumn('pengelola_air_id');
        });
    }
};
