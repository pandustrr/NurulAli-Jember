<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('pendaftars', function (Blueprint $table) {
            $table->string('file_kk')->nullable()->after('school_origin');
            $table->string('file_akte')->nullable()->after('file_kk');
            $table->string('file_ijazah')->nullable()->after('file_akte');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pendaftars', function (Blueprint $table) {
            $table->dropColumn(['file_kk', 'file_akte', 'file_ijazah']);
        });
    }
};
