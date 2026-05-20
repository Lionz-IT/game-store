<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GameController;

Route::get('games', [GameController::class, 'index']);
Route::get('games/{game}', [GameController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('games', [GameController::class, 'store']);
    Route::put('games/{game}', [GameController::class, 'update']);
    Route::delete('games/{game}', [GameController::class, 'destroy']);
});
