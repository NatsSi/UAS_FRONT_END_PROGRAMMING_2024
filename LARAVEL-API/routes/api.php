<?php

use App\Http\Controllers\API\V1\EventController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'v1', 
    //'middleware' => 'auth:sanctum'
    ], function() {
    Route::apiResource('/events', EventController::class);
    Route::apiResource('/create-event', EventController::class);
});