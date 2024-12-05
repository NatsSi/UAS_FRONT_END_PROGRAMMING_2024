<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Blog extends Model
{
    /** @use HasFactory<\Database\Factories\BlogsFactory> */
    use HasFactory;

     /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $collection = 'blogs';

    protected $primaryKey = 'id';

    protected $fillable = [
        'title',
        'category',
        'date',
        'sub_message',
        'author_1',
        'job_author_1',
        'image',
        'section1_title',
        'section1_content',
        'section2_title',
        'section2_content',
        'section3_title',
        'section3_content',
        'conclusion'
    ];
}