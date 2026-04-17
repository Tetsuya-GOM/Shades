<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $products = Product::query()
            ->with('category')
            ->when($request->string('search')->toString(), function ($query, $search) {
                $query->where(function ($subQuery) use ($search) {
                    $subQuery
                        ->where('name', 'like', "%{$search}%")
                        ->orWhere('sku', 'like', "%{$search}%")
                        ->orWhere('frame_style', 'like', "%{$search}%");
                });
            })
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'filters' => $request->only('search'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Products/Form', [
            'product' => null,
            'categories' => Category::query()->orderBy('name')->get(['id', 'name']),
            'artworkOptions' => ['aviator', 'square', 'round', 'shield', 'optical'],
        ]);
    }

    public function store(AdminProductRequest $request): RedirectResponse
    {
        $product = Product::query()->create($this->payload($request));

        return redirect()
            ->route('admin.products.edit', $product)
            ->with('success', 'Product created.');
    }

    public function edit(Product $product): Response
    {
        $product->load('category');

        return Inertia::render('Admin/Products/Form', [
            'product' => $product,
            'categories' => Category::query()->orderBy('name')->get(['id', 'name']),
            'artworkOptions' => ['aviator', 'square', 'round', 'shield', 'optical'],
        ]);
    }

    public function update(AdminProductRequest $request, Product $product): RedirectResponse
    {
        $product->update($this->payload($request, $product));

        return back()->with('success', 'Product updated.');
    }

    public function toggleAvailability(Product $product): RedirectResponse
    {
        $product->update(['active' => ! $product->active]);

        return back()->with('success', "Availability updated for {$product->name}.");
    }

    public function destroy(Product $product): RedirectResponse
    {
        if ($product->image_path) {
            Storage::disk('public')->delete($product->image_path);
        }

        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Product deleted.');
    }

    private function payload(AdminProductRequest $request, ?Product $product = null): array
    {
        $validated = $request->validated();

        $payload = [
            ...collect($validated)->except(['image', 'remove_image'])->all(),
            'slug' => Str::slug($validated['slug']),
        ];

        if ($request->boolean('remove_image') && $product?->image_path) {
            Storage::disk('public')->delete($product->image_path);
            $payload['image_path'] = null;
        }

        if ($request->hasFile('image')) {
            if ($product?->image_path) {
                Storage::disk('public')->delete($product->image_path);
            }

            $payload['image_path'] = $request->file('image')->store('products', 'public');
        }

        return $payload;
    }
}
