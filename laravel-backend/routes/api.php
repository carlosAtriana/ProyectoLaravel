<?php

use App\Http\Controllers\StudentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/hola', function () {
    return 'Hola men';
});


// Rutas para el controlador de estudiantes (StudentController) 
Route::get('/students', [StudentController::class, 'index']); 
Route::post('/students', [StudentController::class, 'store']); 
Route::get('/students/best', [StudentController::class, 'bestGrade']); 
Route::get('/students/worst', [StudentController::class, 'worstGrade']);
Route::delete('/students/{id}', [StudentController::class, 'destroy']);
