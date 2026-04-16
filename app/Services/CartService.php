<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class CartService
{
    public const SESSION_KEY = 'cart.items';
    public const SHIPPING_FLAT_RATE = 12.00;

    public function items(Request $request): Collection
    {
        $items = collect($request->session()->get(self::SESSION_KEY, []));

        if ($items->isEmpty()) {
            return collect();
        }

        $products = Product::query()
            ->with('category')
            ->whereIn('id', $items->pluck('product_id'))
            ->get()
            ->keyBy('id');

        return $items
            ->map(function (array $item) use ($products) {
                $product = $products->get($item['product_id']);

                if (! $product) {
                    return null;
                }

                $quantity = (int) $item['quantity'];
                $unitPrice = (float) $product->price;

                return [
                    'id' => $item['id'],
                    'quantity' => $quantity,
                    'selected_color' => $item['selected_color'],
                    'product' => $product,
                    'line_total' => round($unitPrice * $quantity, 2),
                ];
            })
            ->filter()
            ->values();
    }

    public function add(Request $request, Product $product, int $quantity, string $selectedColor): void
    {
        $items = collect($request->session()->get(self::SESSION_KEY, []));
        $itemId = $this->itemKey($product->id, $selectedColor);
        $existingIndex = $items->search(fn (array $item) => $item['id'] === $itemId);

        if ($existingIndex !== false) {
            $existing = $items->get($existingIndex);
            $items->put($existingIndex, [
                ...$existing,
                'quantity' => min($product->inventory, $existing['quantity'] + $quantity),
            ]);
        } else {
            $items->push([
                'id' => $itemId,
                'product_id' => $product->id,
                'selected_color' => $selectedColor,
                'quantity' => min($quantity, $product->inventory),
            ]);
        }

        $request->session()->put(self::SESSION_KEY, $items->values()->all());
    }

    public function update(Request $request, string $itemId, int $quantity): void
    {
        $items = collect($request->session()->get(self::SESSION_KEY, []))
            ->map(function (array $item) use ($itemId, $quantity) {
                if ($item['id'] !== $itemId) {
                    return $item;
                }

                return [
                    ...$item,
                    'quantity' => $quantity,
                ];
            })
            ->filter(fn (array $item) => $item['quantity'] > 0)
            ->values();

        $request->session()->put(self::SESSION_KEY, $items->all());
    }

    public function remove(Request $request, string $itemId): void
    {
        $items = collect($request->session()->get(self::SESSION_KEY, []))
            ->reject(fn (array $item) => $item['id'] === $itemId)
            ->values();

        $request->session()->put(self::SESSION_KEY, $items->all());
    }

    public function destroy(Request $request): void
    {
        $request->session()->forget(self::SESSION_KEY);
    }

    public function summary(Request $request): array
    {
        $items = $this->items($request);
        $subtotal = round($items->sum('line_total'), 2);
        $shipping = $subtotal > 0 ? self::SHIPPING_FLAT_RATE : 0;

        return [
            'items' => $items,
            'count' => $items->sum('quantity'),
            'subtotal' => $subtotal,
            'shipping' => $shipping,
            'total' => round($subtotal + $shipping, 2),
        ];
    }

    private function itemKey(int $productId, string $selectedColor): string
    {
        return $productId.':'.strtolower(str_replace(' ', '-', $selectedColor));
    }
}
