<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('eyebrow')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('sku')->unique();
            $table->string('tagline')->nullable();
            $table->text('description');
            $table->decimal('price', 10, 2);
            $table->decimal('compare_price', 10, 2)->nullable();
            $table->unsignedInteger('inventory')->default(0);
            $table->string('material');
            $table->string('frame_style');
            $table->string('lens_type');
            $table->string('tint');
            $table->decimal('rating', 3, 2)->default(4.80);
            $table->unsignedInteger('review_count')->default(0);
            $table->json('available_colors');
            $table->json('highlights');
            $table->boolean('featured')->default(false);
            $table->boolean('new_arrival')->default(false);
            $table->boolean('active')->default(true);
            $table->string('artwork_key');
            $table->timestamps();
        });

        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('order_number')->unique();
            $table->string('status')->default('pending');
            $table->string('customer_name');
            $table->string('customer_email');
            $table->string('customer_phone');
            $table->string('address_line');
            $table->string('city');
            $table->string('province');
            $table->string('postal_code');
            $table->string('payment_method');
            $table->text('notes')->nullable();
            $table->decimal('subtotal_amount', 10, 2);
            $table->decimal('shipping_amount', 10, 2)->default(12.00);
            $table->decimal('total_amount', 10, 2);
            $table->timestamp('placed_at');
            $table->timestamps();
        });

        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->nullable()->constrained()->nullOnDelete();
            $table->string('product_name');
            $table->string('product_slug');
            $table->string('selected_color');
            $table->json('product_snapshot');
            $table->decimal('unit_price', 10, 2);
            $table->unsignedInteger('quantity');
            $table->decimal('line_total', 10, 2);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('products');
        Schema::dropIfExists('categories');
    }
};
