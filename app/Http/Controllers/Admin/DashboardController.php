<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $salesByStatus = Order::query()
            ->select('status', DB::raw('count(*) as aggregate'))
            ->groupBy('status')
            ->pluck('aggregate', 'status');

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'revenue' => (float) Order::query()->sum('total_amount'),
                'orders' => Order::query()->count(),
                'customers' => User::query()->where('is_admin', false)->count(),
                'lowStock' => Product::query()->where('inventory', '<=', 12)->count(),
            ],
            'salesByStatus' => $salesByStatus,
            'recentOrders' => Order::query()->latest('placed_at')->take(5)->get(),
            'topProducts' => Product::query()->orderByDesc('featured')->orderBy('inventory')->take(5)->get(),
        ]);
    }
}
