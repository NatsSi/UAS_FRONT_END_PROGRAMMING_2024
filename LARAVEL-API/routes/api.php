<?php

use App\Http\Controllers\API\V1\EventController;
use App\Http\Controllers\API\V1\MemberController;
use App\Http\Controllers\API\V1\VideoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'v1', 
    //'middleware' => 'auth:sanctum'
    ], function() {
    Route::apiResource('/events', EventController::class);
    Route::apiResource('/members', MemberController::class);
    Route::apiResource('/add-video', VideoController::class);
    Route::apiResource('/list-videos', VideoController::class);
    
    Route::get('/list-videos/{video}', [VideoController::class, 'show']);
    Route::put('/list-videos-update/{video}', [VideoController::class, 'update']);
});


