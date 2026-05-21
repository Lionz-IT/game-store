<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GameController;

Route::get('games', [GameController::class, 'index']);
Route::get('games/{game}', [GameController::class, 'show']);

Route::post('games', [GameController::class, 'store'])->withoutMiddleware([\App\Http\Middleware\VerifyCsrfToken::class]);
Route::put('games/{game}', [GameController::class, 'update'])->withoutMiddleware([\App\Http\Middleware\VerifyCsrfToken::class]);
Route::delete('games/{game}', [GameController::class, 'destroy'])->withoutMiddleware([\App\Http\Middleware\VerifyCsrfToken::class]);
