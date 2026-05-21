<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GameController;

// TEST RUTE POST PALING SEDERHANA
Route::post('games', function (Request $request) {
    return response()->json([
        'status' => 'success',
        'data' => $request->all()
    ], 201);
});

Route::get('games', [GameController::class, 'index']);
Route::get('games/{game}', [GameController::class, 'show']);

Route::put('games/{game}', [GameController::class, 'update']);
Route::delete('games/{game}', [GameController::class, 'destroy']);
