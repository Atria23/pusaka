<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class AdminAirMiddleware
{
    public function handle($request, Closure $next)
    {
        if (!Auth::check() || !Auth::user()->hasRole('admin-air')) {
            abort(403, 'Unauthorized');
        }

        return $next($request);
    }
}
