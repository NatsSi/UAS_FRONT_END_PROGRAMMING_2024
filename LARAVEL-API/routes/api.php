<?php

use App\Http\Controllers\API\V1\EventController;

use App\Http\Controllers\API\V1\MemberController;
use App\Http\Controllers\API\V1\AuthController;
use App\Http\Controllers\API\V1\BlogController;
use App\Http\Controllers\API\V1\VideoController;
use App\Http\Controllers\API\V1\MentorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'v1',], function() {
    Route::apiResource('/events', EventController::class);
    Route::apiResource('/members', MemberController::class);
    Route::apiResource('/blogs', BlogController::class);
    Route::apiResource('/add-video', VideoController::class);
    Route::apiResource('/list-videos', VideoController::class);
    Route::apiResource('/mentors', MentorController::class);

    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    Route::get('/list-videos/{video}', [VideoController::class, 'show']);
    Route::put('/list-videos-update/{video}', [VideoController::class, 'update']);

    Route::get('members/email/{email}', [MemberController::class, 'show']);
    
});