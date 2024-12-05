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
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('category');
            $table->date('date');  
            $table->text('sub_message');  
            $table->string('author_1');  
            $table->string('job_author_1');  
            $table->string('image');
            $table->string('section1_title');
            $table->text('section1_content');
            $table->string('section2_title');
            $table->text('section2_content');
            $table->string('section3_title');
            $table->text('section3_content');
            $table->text('conclusion');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
