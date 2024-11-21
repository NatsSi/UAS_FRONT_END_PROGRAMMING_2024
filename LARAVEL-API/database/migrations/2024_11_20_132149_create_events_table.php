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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('day');
            $table->string('place');
            $table->string('category');
            $table->date('date');  
            $table->text('message');
            $table->text('sub_message');  
            $table->string('author_1');  
            $table->string('job_author_1');  
            $table->string('author_2');  
            $table->string('job_author_2');
            $table->string('image');
            $table->string('header');
            $table->text('body');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};