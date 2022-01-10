<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\CompanyController;
use App\Http\Controllers\API\OrderController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Category
Route::get('list-category', [CategoryController::class, 'index']);
Route::post('store-category', [CategoryController::class, 'store']);
Route::get('edit-category/{id}', [CategoryController::class, 'edit']);
Route::put('update-category/{id}', [CategoryController::class, 'update']);
Route::delete('delete-category/{id}', [CategoryController::class, 'destroy']);

// Company
Route::get('list-company', [CompanyController::class, 'index']);
Route::post('store-company', [CompanyController::class, 'store']);
Route::get('edit-company/{id}', [CompanyController::class, 'edit']);
Route::put('update-company/{id}', [CompanyController::class, 'update']);
Route::delete('delete-company/{id}', [CompanyController::class, 'destroy']);

// Order
Route::get('list-order', [OrderController::class, 'index']);
Route::post('store-order', [OrderController::class, 'store']);
Route::get('edit-order/{id}', [OrderController::class, 'edit']);
Route::put('update-order/{id}', [OrderController::class, 'update']);
Route::delete('delete-order/{id}', [OrderController::class, 'destroy']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
