<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function about()
    {
        return Inertia::render('Public/About');
    }

    public function infoPpdb()
    {
        return Inertia::render('Public/InfoPpdb');
    }

    public function pendaftaran()
    {
        return Inertia::render('Public/Pendaftaran');
    }
}
