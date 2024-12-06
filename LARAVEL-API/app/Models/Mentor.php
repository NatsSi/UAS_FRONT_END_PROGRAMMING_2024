<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Mentor extends Model
{
    /** @use HasFactory<\Database\Factories\EventsFactory> */
    use HasFactory;

     /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $collection = 'mentors';

    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
        'email',
        'phone_number',
        'role',
        'rating',
    ];
}