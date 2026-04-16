<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::query()->updateOrCreate(
            ['email' => 'admin@shades.test'],
            [
                'name' => 'Shades Admin',
                'password' => Hash::make('password'),
                'is_admin' => true,
                'email_verified_at' => now(),
            ],
        );

        $customer = User::query()->updateOrCreate(
            ['email' => 'shopper@shades.test'],
            [
                'name' => 'Ariana Cruz',
                'password' => Hash::make('password'),
                'is_admin' => false,
                'email_verified_at' => now(),
            ],
        );

        $categories = collect([
            [
                'name' => 'Aviators',
                'slug' => 'aviators',
                'eyebrow' => 'Iconic pilots',
                'description' => 'Refined pilot silhouettes with premium lens tints.',
            ],
            [
                'name' => 'Wayfarers',
                'slug' => 'wayfarers',
                'eyebrow' => 'Everyday classics',
                'description' => 'Sharp acetate frames for city wear and weekend travel.',
            ],
            [
                'name' => 'Performance',
                'slug' => 'performance',
                'eyebrow' => 'Sport shield',
                'description' => 'Wraparound protection for bright commutes and training days.',
            ],
            [
                'name' => 'Optical',
                'slug' => 'optical',
                'eyebrow' => 'Clear vision',
                'description' => 'Optical frames with the same fashion-led attitude as the sun line.',
            ],
        ])->mapWithKeys(function (array $category) {
            $model = Category::query()->updateOrCreate(['slug' => $category['slug']], $category);

            return [$category['slug'] => $model];
        });

        $products = [
            [
                'category_slug' => 'aviators',
                'name' => 'Aero Noir Aviator',
                'slug' => 'aero-noir-aviator',
                'sku' => 'SHD-AV-001',
                'tagline' => 'Gold-rim pilot frame with smoke gradient lenses.',
                'description' => 'A premium aviator that leans dressy without losing the edge. Built with featherweight alloy temples and polarized lenses for harsh afternoon glare.',
                'price' => 89,
                'compare_price' => 109,
                'inventory' => 18,
                'material' => 'Titanium alloy',
                'frame_style' => 'Aviator',
                'lens_type' => 'Polarized',
                'tint' => 'Smoke gradient',
                'rating' => 4.9,
                'review_count' => 126,
                'available_colors' => ['Black Gold', 'Champagne', 'Matte Gunmetal'],
                'highlights' => ['UV400 protection', 'Adjustable nose pads', 'Travel hard case included'],
                'featured' => true,
                'new_arrival' => true,
                'active' => true,
                'artwork_key' => 'aviator',
            ],
            [
                'category_slug' => 'wayfarers',
                'name' => 'Metro Fade Wayfarer',
                'slug' => 'metro-fade-wayfarer',
                'sku' => 'SHD-WF-002',
                'tagline' => 'A bold acetate staple for everyday city wear.',
                'description' => 'Designed for clean wardrobes and warm weather. The Metro Fade keeps its structure while staying light enough for all-day use.',
                'price' => 72,
                'compare_price' => 88,
                'inventory' => 26,
                'material' => 'Acetate',
                'frame_style' => 'Wayfarer',
                'lens_type' => 'UV400',
                'tint' => 'Brown fade',
                'rating' => 4.8,
                'review_count' => 94,
                'available_colors' => ['Gloss Black', 'Tortoise', 'Crystal Gray'],
                'highlights' => ['Wide fit', 'Scratch-resistant lenses', 'Soft-touch hinges'],
                'featured' => true,
                'new_arrival' => false,
                'active' => true,
                'artwork_key' => 'square',
            ],
            [
                'category_slug' => 'performance',
                'name' => 'Volt Shield Pro',
                'slug' => 'volt-shield-pro',
                'sku' => 'SHD-PR-003',
                'tagline' => 'A wrap shield for drives, rides, and open-air training.',
                'description' => 'A sporty one-piece lens construction with high-contrast optics. Great for cyclists, runners, and anyone who wants aggressive sun coverage.',
                'price' => 96,
                'compare_price' => 120,
                'inventory' => 9,
                'material' => 'TR90',
                'frame_style' => 'Shield',
                'lens_type' => 'Performance polarized',
                'tint' => 'Midnight mirror',
                'rating' => 4.85,
                'review_count' => 61,
                'available_colors' => ['Midnight Black', 'Cobalt', 'Forest'],
                'highlights' => ['Wraparound fit', 'Ventilated bridge', 'Grip temple pads'],
                'featured' => true,
                'new_arrival' => true,
                'active' => true,
                'artwork_key' => 'shield',
            ],
            [
                'category_slug' => 'optical',
                'name' => 'Studio Clear Optical',
                'slug' => 'studio-clear-optical',
                'sku' => 'SHD-OP-004',
                'tagline' => 'A clean rectangular optical frame for hybrid workdays.',
                'description' => 'Transparent tone and architectural lines give this pair a polished studio look. Designed to pair with prescription lenses or blue-light protection.',
                'price' => 69,
                'compare_price' => 82,
                'inventory' => 24,
                'material' => 'Acetate',
                'frame_style' => 'Rectangle Optical',
                'lens_type' => 'Blue-light ready',
                'tint' => 'Clear',
                'rating' => 4.7,
                'review_count' => 78,
                'available_colors' => ['Crystal Clear', 'Ink', 'Soft Olive'],
                'highlights' => ['Lightweight fit', 'Prescription compatible', 'Desk-to-dinner styling'],
                'featured' => false,
                'new_arrival' => false,
                'active' => true,
                'artwork_key' => 'optical',
            ],
            [
                'category_slug' => 'wayfarers',
                'name' => 'Monarch Square Gold',
                'slug' => 'monarch-square-gold',
                'sku' => 'SHD-WF-005',
                'tagline' => 'A sharp square shape with luxe gold detailing.',
                'description' => 'Statement-making but still versatile, with a flatter brow and elegant gold hardware that catches light without overpowering the face.',
                'price' => 92,
                'compare_price' => 112,
                'inventory' => 14,
                'material' => 'Metal + acetate',
                'frame_style' => 'Square',
                'lens_type' => 'Polarized',
                'tint' => 'Bronze',
                'rating' => 4.9,
                'review_count' => 87,
                'available_colors' => ['Onyx Gold', 'Walnut Gold', 'Stone Gold'],
                'highlights' => ['Premium metal bridge', 'Luxury gift box', 'High-contrast optics'],
                'featured' => true,
                'new_arrival' => false,
                'active' => true,
                'artwork_key' => 'square',
            ],
            [
                'category_slug' => 'aviators',
                'name' => 'Orbit Luxe Round',
                'slug' => 'orbit-luxe-round',
                'sku' => 'SHD-AV-006',
                'tagline' => 'Vintage-inspired round metal frame with green tint.',
                'description' => 'A softer silhouette that still feels crisp and premium. Perfect for editorial styling, travel, and dressed-up resort fits.',
                'price' => 78,
                'compare_price' => 95,
                'inventory' => 21,
                'material' => 'Metal alloy',
                'frame_style' => 'Round',
                'lens_type' => 'UV400',
                'tint' => 'Bottle green',
                'rating' => 4.75,
                'review_count' => 58,
                'available_colors' => ['Gold Green', 'Silver Smoke', 'Rose Brown'],
                'highlights' => ['Slim profile', 'Vintage bridge', 'Compact travel pouch'],
                'featured' => false,
                'new_arrival' => true,
                'active' => true,
                'artwork_key' => 'round',
            ],
        ];

        foreach ($products as $productData) {
            Product::query()->updateOrCreate(
                ['slug' => $productData['slug']],
                [
                    ...collect($productData)->except('category_slug')->all(),
                    'category_id' => $categories[$productData['category_slug']]->id,
                ],
            );
        }

        if (Order::query()->doesntExist()) {
            $sampleOrder = Order::query()->create([
                'user_id' => $customer->id,
                'order_number' => 'SHD-1482',
                'status' => 'pending',
                'customer_name' => 'Ariana Cruz',
                'customer_email' => 'shopper@shades.test',
                'customer_phone' => '+63 917 555 2140',
                'address_line' => '128 Emerald Street',
                'city' => 'Quezon City',
                'province' => 'Metro Manila',
                'postal_code' => '1100',
                'payment_method' => 'cod',
                'notes' => 'Please message before delivery.',
                'subtotal_amount' => 158,
                'shipping_amount' => 12,
                'total_amount' => 170,
                'placed_at' => now()->subDay(),
            ]);

            $sampleOrder->items()->createMany([
                [
                    'product_id' => Product::query()->where('slug', 'aero-noir-aviator')->value('id'),
                    'product_name' => 'Aero Noir Aviator',
                    'product_slug' => 'aero-noir-aviator',
                    'selected_color' => 'Black Gold',
                    'product_snapshot' => ['artwork_key' => 'aviator', 'frame_style' => 'Aviator'],
                    'unit_price' => 89,
                    'quantity' => 1,
                    'line_total' => 89,
                ],
                [
                    'product_id' => Product::query()->where('slug', 'studio-clear-optical')->value('id'),
                    'product_name' => 'Studio Clear Optical',
                    'product_slug' => 'studio-clear-optical',
                    'selected_color' => 'Crystal Clear',
                    'product_snapshot' => ['artwork_key' => 'optical', 'frame_style' => 'Rectangle Optical'],
                    'unit_price' => 69,
                    'quantity' => 1,
                    'line_total' => 69,
                ],
            ]);
        }
    }
}
