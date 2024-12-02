<?php

use App\Http\Controllers\API\V1\EventController;
use App\Http\Controllers\API\V1\MemberController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'v1', 
    //'middleware' => 'auth:sanctum'
    ], function() {
    Route::apiResource('/events', EventController::class);
    Route::apiResource('/members', MemberController::class);
    
});


