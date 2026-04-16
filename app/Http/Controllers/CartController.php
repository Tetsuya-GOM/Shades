<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Services\CartService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function __construct(private readonly CartService $cartService)
    {
    }

    public function index(Request $request): Response
    {
        return Inertia::render('Cart/Index', [
            'cart' => $this->cartService->summary($request),
        ]);
    }

    public function store(Request $request, Product $product): RedirectResponse
    {
        $validated = $request->validate([
            'quantity' => ['required', 'integer', 'min:1', 'max:10'],
            'selected_color' => ['required', 'string'],
        ]);

        abort_if(! in_array($validated['selected_color'], $product->available_colors, true), 422);

        $this->cartService->add(
            $request,
            $product,
            min((int) $validated['quantity'], $product->inventory),
            $validated['selected_color'],
        );

        return back()->with('success', "{$product->name} was added to your cart.");
    }

    public function update(Request $request, string $itemId): RedirectResponse
    {
        $validated = $request->validate([
            'quantity' => ['required', 'integer', 'min:0', 'max:10'],
        ]);

        $this->cartService->update($request, $itemId, (int) $validated['quantity']);

        return back()->with('success', 'Cart updated.');
    }

    public function destroy(Request $request, string $itemId): RedirectResponse
    {
        $this->cartService->remove($request, $itemId);

        return back()->with('success', 'Item removed from cart.');
    }
}
