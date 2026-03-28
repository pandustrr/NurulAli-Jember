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
            if (!Schema::hasColumn('pendaftars', 'username')) {
                $table->string('username')->nullable()->after('name');
            }
            if (!Schema::hasColumn('pendaftars', 'lembaga_ids')) {
                $table->json('lembaga_ids')->nullable()->after('username');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pendaftars', function (Blueprint $table) {
            $table->dropColumn('username');
        });
    }
};
