<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Video extends Model
{
    use HasFactory;

    protected $collection = 'videos';
    protected $primaryKey = '_id';

    // Kolom yang dapat diisi
    protected $fillable = [
        'title', 'publisher', 'link', 'type',
    ];

    // Kolom tanggal yang harus dikonversi menjadi Carbon instance
    protected $dates = ['created_at'];
}

