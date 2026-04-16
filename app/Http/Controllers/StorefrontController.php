<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StorefrontController extends Controller
{
    public function home(): Response
    {
        $featuredProducts = Product::query()
            ->with('category')
            ->active()
            ->where('featured', true)
            ->take(4)
            ->get();

        $newArrivals = Product::query()
            ->with('category')
            ->active()
            ->where('new_arrival', true)
            ->take(4)
            ->get();

        $categories = Category::query()
            ->withCount('products')
            ->orderBy('name')
            ->get();

        return Inertia::render('Home', [
            'featuredProducts' => $featuredProducts,
            'newArrivals' => $newArrivals,
            'categories' => $categories,
            'stats' => [
                ['label' => 'Premium frames', 'value' => '28 curated styles'],
                ['label' => 'Lens protection', 'value' => 'UV400 + polarized picks'],
                ['label' => 'Shipping promise', 'value' => 'Dispatched within 48 hours'],
            ],
        ]);
    }

    public function shop(Request $request): Response
    {
        $products = Product::query()
            ->with('category')
            ->active()
            ->when($request->string('search')->toString(), function ($query, $search) {
                $query->where(function ($subQuery) use ($search) {
                    $subQuery
                        ->where('name', 'like', "%{$search}%")
                        ->orWhere('tagline', 'like', "%{$search}%")
                        ->orWhere('frame_style', 'like', "%{$search}%");
                });
            })
            ->when($request->string('category')->toString(), fn ($query, $category) => $query->whereHas('category', fn ($categoryQuery) => $categoryQuery->where('slug', $category)))
            ->when($request->string('style')->toString(), fn ($query, $style) => $query->where('frame_style', $style))
            ->when(
                $request->string('sort')->toString(),
                function ($query, $sort) {
                    return match ($sort) {
                        'price_asc' => $query->orderBy('price'),
                        'price_desc' => $query->orderByDesc('price'),
                        'newest' => $query->orderByDesc('new_arrival')->orderByDesc('created_at'),
                        default => $query->orderByDesc('featured')->orderBy('name'),
                    };
                },
                fn ($query) => $query->orderByDesc('featured')->orderBy('name')
            )
            ->paginate(8)
            ->withQueryString();

        return Inertia::render('Shop/Index', [
            'products' => $products,
            'filters' => $request->only(['search', 'category', 'style', 'sort']),
            'styles' => Product::query()->active()->select('frame_style')->distinct()->orderBy('frame_style')->pluck('frame_style'),
        ]);
    }

    public function show(Product $product): Response
    {
        abort_unless($product->active, 404);

        $product->load('category');

        $relatedProducts = Product::query()
            ->with('category')
            ->active()
            ->where('category_id', $product->category_id)
            ->whereKeyNot($product->id)
            ->take(4)
            ->get();

        return Inertia::render('Shop/Show', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
        ]);
    }
}
