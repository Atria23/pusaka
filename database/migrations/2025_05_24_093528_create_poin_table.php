<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('poin', function (Blueprint $table) {
            $table->id('id');
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->integer('total_poin')->default(0);
            $table->timestamp('last_update')->useCurrent()->useCurrentOnUpdate();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('poin');
    }
};
