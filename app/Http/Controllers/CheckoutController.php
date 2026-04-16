<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckoutStoreRequest;
use App\Models\Order;
use App\Services\CartService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    public function __construct(private readonly CartService $cartService)
    {
    }

    public function index(Request $request): Response|RedirectResponse
    {
        $summary = $this->cartService->summary($request);

        if ($summary['count'] === 0) {
            return redirect()->route('shop.index');
        }

        return Inertia::render('Checkout/Index', [
            'cart' => $summary,
            'paymentMethods' => [
                ['value' => 'card', 'label' => 'Card', 'description' => 'Secure checkout with instant confirmation.'],
                ['value' => 'cod', 'label' => 'Cash on Delivery', 'description' => 'Best for Metro Manila doorstep purchases.'],
                ['value' => 'bank_transfer', 'label' => 'Bank Transfer', 'description' => 'Manual payment confirmation within the day.'],
            ],
        ]);
    }

    public function store(CheckoutStoreRequest $request): RedirectResponse
    {
        $summary = $this->cartService->summary($request);

        abort_if($summary['count'] === 0, 422, 'Your cart is empty.');

        $order = DB::transaction(function () use ($request, $summary) {
            $order = Order::query()->create([
                ...$request->validated(),
                'user_id' => $request->user()?->id,
                'order_number' => 'SHD-'.str_pad((string) random_int(1000, 9999), 4, '0', STR_PAD_LEFT),
                'status' => $request->payment_method === 'card' ? 'paid' : 'pending',
                'subtotal_amount' => $summary['subtotal'],
                'shipping_amount' => $summary['shipping'],
                'total_amount' => $summary['total'],
                'placed_at' => now(),
            ]);

            foreach ($summary['items'] as $item) {
                $product = $item['product'];
                $product->decrement('inventory', min($product->inventory, $item['quantity']));

                $order->items()->create([
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'product_slug' => $product->slug,
                    'selected_color' => $item['selected_color'],
                    'product_snapshot' => [
                        'artwork_key' => $product->artwork_key,
                        'category' => $product->category?->name,
                        'frame_style' => $product->frame_style,
                        'material' => $product->material,
                    ],
                    'unit_price' => $product->price,
                    'quantity' => $item['quantity'],
                    'line_total' => $item['line_total'],
                ]);
            }

            return $order->load('items');
        });

        $this->cartService->destroy($request);

        return redirect()->route('orders.success', $order->order_number);
    }

    public function success(string $orderNumber): Response
    {
        $order = Order::query()
            ->with('items')
            ->where('order_number', $orderNumber)
            ->firstOrFail();

        return Inertia::render('Orders/Success', [
            'order' => $order,
        ]);
    }
}
