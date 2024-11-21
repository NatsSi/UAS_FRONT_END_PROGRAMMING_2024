<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Event extends Model
{
    /** @use HasFactory<\Database\Factories\EventsFactory> */
    use HasFactory;

     /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $collection = 'events';

    protected $primaryKey = 'id';

    protected $fillable = [
        'title',
        'day',
        'place',
        'category',
        'date',
        'message',
        'sub_message',
        'author_1',
        'job_author_1',
        'author_2',
        'job_author_2',
        'image',
        'header',
        'body'
    ];
}