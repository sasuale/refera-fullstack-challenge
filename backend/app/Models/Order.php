<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'orders';

    protected $dates = ['deleted_at'];
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'contact_name',
        'contact_phone',
        'real_estate',
        'description',
        'deadline',
        'company_id',
        'category_id'
    ];

    public $casts = [];

    public static $rules = [];

    protected $with = ['company', 'category'];
    public function company(){
        return $this->belongsTo('App\Models\Company', 'company_id');
    }
    
    public function category(){
        return $this->belongsTo('App\Models\Category', 'category_id');
    }
}
