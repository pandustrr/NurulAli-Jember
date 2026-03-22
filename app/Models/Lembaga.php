<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lembaga extends Model
{
    protected $fillable = [
        'title',
        'description',
        'detailed_description',
        'icon',
        'color',
        'image'
    ];
}
