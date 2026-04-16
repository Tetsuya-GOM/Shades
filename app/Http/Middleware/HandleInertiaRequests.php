<?php

namespace App\Http\Middleware;

use App\Models\Category;
use App\Services\CartService;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'categories' => fn () => Category::query()->orderBy('name')->get(['id', 'name', 'slug']),
            'cart' => fn () => app(CartService::class)->summary($request),
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
            ],
        ];
    }
}
