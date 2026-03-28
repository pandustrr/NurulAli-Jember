<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lembaga extends Model
{
    protected $fillable = [
        'title',
        'subtitle',
        'description',
        'detailed_description',
        'icon',
        'color',
        'image',
        'prices',
        'admin_name',
        'username',
        'email',
        'password',
        'contact'
    ];

    protected $casts = [
        'prices' => 'array',
    ];
}
