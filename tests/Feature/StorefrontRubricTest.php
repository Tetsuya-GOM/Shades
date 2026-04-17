<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StorefrontRubricTest extends TestCase
{
    use RefreshDatabase;

    public function test_checkout_requires_authentication(): void
    {
        $response = $this->get('/checkout');

        $response->assertRedirect('/login');
    }

    public function test_admin_can_access_product_management_create_and_edit_pages(): void
    {
        $this->seed(DatabaseSeeder::class);

        $admin = User::query()->where('is_admin', true)->firstOrFail();
        $product = Product::query()->firstOrFail();

        $this->actingAs($admin)->get(route('admin.products.create'))->assertOk();
        $this->actingAs($admin)->get(route('admin.products.edit', $product))->assertOk();
    }

    public function test_admin_can_access_order_details_page(): void
    {
        $this->seed(DatabaseSeeder::class);

        $admin = User::query()->where('is_admin', true)->firstOrFail();
        $order = Order::query()->firstOrFail();

        $this->actingAs($admin)->get(route('admin.orders.show', $order))->assertOk();
    }
}
