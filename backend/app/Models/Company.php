<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'companies';

    protected $dates = ['deleted_at'];
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'tag',
        'description'
    ];

    public $casts = [
        'id' => 'integer',
        'name'=>'string',
        'tag'=>'string',
        'description'=>'string'
    ];

    public static $rules = [
        'name' => 'required|min:2|max:200'
    ];

    public function orders(){
        return $this->hasMany('App\Models\Order');
    }
}
