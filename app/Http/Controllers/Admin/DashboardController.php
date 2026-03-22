<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pendaftar;
use App\Models\Message;
use App\Models\Lembaga;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_pendaftar' => Pendaftar::count(),
                'verified_pendaftar' => Pendaftar::where('status', 'verified')->count(),
                'pending_pendaftar' => Pendaftar::where('status', 'pending')->count(),
                'unread_messages' => Message::where('is_read', false)->count(),
                'total_lembaga' => Lembaga::count(),
            ],
            'recent_pendaftars' => Pendaftar::latest()->take(5)->get(),
        ]);
    }
}
