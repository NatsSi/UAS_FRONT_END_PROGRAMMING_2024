<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Member extends Model
{
    /** @use HasFactory<\Database\Factories\MembersFactory> */
    use HasFactory;

     /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $collection = 'members';

    protected $primaryKey = 'id';

    protected $fillable = [
        'email',
        'subscription_type',
        'payment_method',
        'password',
        'subscription_date'
    ];
}
