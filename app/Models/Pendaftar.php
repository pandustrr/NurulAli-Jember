<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pendaftar extends Model
{
    protected $fillable = [
        'reg_id',
        'name',
        'nik',
        'place_birth',
        'date_birth',
        'parent_name',
        'whatsapp',
        'address',
        'school_origin',
        'username',
        'password',
        'lembaga_ids',
        'status',
        'payment_status',
        'payment_method',
        'total_bill',
        'metadata'
    ];

    protected $hidden = [
        'password',
    ];
}
