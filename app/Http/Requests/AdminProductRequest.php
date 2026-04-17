<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AdminProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $productId = $this->route('product')?->id;

        return [
            'category_id' => ['required', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('products', 'slug')->ignore($productId)],
            'sku' => ['required', 'string', 'max:255', Rule::unique('products', 'sku')->ignore($productId)],
            'tagline' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'compare_price' => ['nullable', 'numeric', 'min:0'],
            'inventory' => ['required', 'integer', 'min:0'],
            'material' => ['required', 'string', 'max:255'],
            'frame_style' => ['required', 'string', 'max:255'],
            'lens_type' => ['required', 'string', 'max:255'],
            'tint' => ['required', 'string', 'max:255'],
            'rating' => ['nullable', 'numeric', 'between:0,5'],
            'review_count' => ['nullable', 'integer', 'min:0'],
            'available_colors' => ['required', 'array', 'min:1'],
            'available_colors.*' => ['required', 'string', 'max:255'],
            'highlights' => ['required', 'array', 'min:1'],
            'highlights.*' => ['required', 'string', 'max:255'],
            'featured' => ['required', 'boolean'],
            'new_arrival' => ['required', 'boolean'],
            'active' => ['required', 'boolean'],
            'artwork_key' => ['required', Rule::in(['aviator', 'square', 'round', 'shield', 'optical'])],
            'image' => ['nullable', 'image', 'max:4096'],
            'remove_image' => ['nullable', 'boolean'],
        ];
    }
}
