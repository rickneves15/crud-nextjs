<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('customers_id')->nullable()->after('id');
            $table->foreign('customers_id')->references('id')->on('customers')->onDelete('cascade');
            $table->string('street');
            $table->string('city');
            $table->string('state');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('addresses');
    }
};
