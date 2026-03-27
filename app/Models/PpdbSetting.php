<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PpdbSetting extends Model
{
    protected $fillable = ['key', 'value'];

    public static function getMap()
    {
        return self::all()->pluck('value', 'key');
    }
}
