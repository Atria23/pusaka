<?php

namespace App\Http\Controllers\AdminAir;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AdminAirDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('AdminAir/Dashboard');
    }
}
