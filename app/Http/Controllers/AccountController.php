<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $orders = $request->user()
            ->orders()
            ->with('items')
            ->latest('placed_at')
            ->take(5)
            ->get();

        return Inertia::render('Account/Dashboard', [
            'orders' => $orders,
        ]);
    }
}
