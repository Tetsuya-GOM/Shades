import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

function CheckboxField({ checked, onChange, label }) {
    return (
        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
            <input type="checkbox" checked={checked} onChange={onChange} />
            <span>{label}</span>
        </label>
    );
}

export default function AdminProductForm({ product, categories, artworkOptions }) {
    const form = useForm({
        category_id: product?.category_id ?? categories[0]?.id ?? '',
        name: product?.name ?? '',
        slug: product?.slug ?? '',
        sku: product?.sku ?? '',
        tagline: product?.tagline ?? '',
        description: product?.description ?? '',
        price: product?.price ?? '',
        compare_price: product?.compare_price ?? '',
        inventory: product?.inventory ?? 0,
        material: product?.material ?? '',
        frame_style: product?.frame_style ?? '',
        lens_type: product?.lens_type ?? '',
        tint: product?.tint ?? '',
        rating: product?.rating ?? 4.8,
        review_count: product?.review_count ?? 0,
        available_colors_text: product?.available_colors?.join(', ') ?? '',
        highlights_text: product?.highlights?.join('\n') ?? '',
        featured: product?.featured ?? false,
        new_arrival: product?.new_arrival ?? false,
        active: product?.active ?? true,
        artwork_key: product?.artwork_key ?? artworkOptions[0],
        image: null,
        remove_image: false,
    });

    const submit = (event) => {
        event.preventDefault();

        form.transform((data) => ({
            ...data,
            ...(product ? { _method: 'patch' } : {}),
            slug: data.slug || data.name,
            available_colors: data.available_colors_text.split(',').map((value) => value.trim()).filter(Boolean),
            highlights: data.highlights_text.split('\n').map((value) => value.trim()).filter(Boolean),
        }));

        if (product) {
            form.post(route('admin.products.update', product.id), {
                forceFormData: true,
                preserveScroll: true,
            });
            return;
        }

        form.post(route('admin.products.store'), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title={product ? `Edit ${product.name}` : 'Add product'}>
            <Head title={product ? 'Edit product' : 'Add product'} />

            <div className="mb-6 flex flex-wrap gap-3">
                <Link href={route('admin.products.index')} className="rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-bold text-slate-950">
                    Back to products
                </Link>
            </div>

            <form onSubmit={submit} className="grid gap-6">
                <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2">
                        <span className="text-sm font-bold text-slate-700">Category</span>
                        <select value={form.data.category_id} onChange={(event) => form.setData('category_id', event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm">
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-bold text-slate-700">Artwork style</span>
                        <select value={form.data.artwork_key} onChange={(event) => form.setData('artwork_key', event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm">
                            {artworkOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-bold text-slate-700">Product name</span>
                        <input value={form.data.name} onChange={(event) => form.setData('name', event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" />
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-bold text-slate-700">Slug</span>
                        <input value={form.data.slug} onChange={(event) => form.setData('slug', event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" />
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-bold text-slate-700">SKU</span>
                        <input value={form.data.sku} onChange={(event) => form.setData('sku', event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" />
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-bold text-slate-700">Tagline</span>
                        <input value={form.data.tagline} onChange={(event) => form.setData('tagline', event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" />
                    </label>
                    <label className="space-y-2 md:col-span-2">
                        <span className="text-sm font-bold text-slate-700">Description</span>
                        <textarea value={form.data.description} onChange={(event) => form.setData('description', event.target.value)} rows="5" className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" />
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-bold text-slate-700">Price</span>
                        <input type="number" min="0" step="0.01" value={form.data.price} onChange={(event) => form.setData('price', event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" />
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-bold text-slate-700">Compare price</span>
                        <input type="number" min="0" step="0.01" value={form.data.compare_price} onChange={(event) => form.setData('compare_price', event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" />
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-bold text-slate-700">Inventory</span>
                        <input type="number" min="0" value={form.data.inventory} onChange={(event) => form.setData('inventory', event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" />
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-bold text-slate-700">Frame style</span>
                        <input value={form.data.frame_style} onChange={(event) => form.setData('frame_style', event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" />
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-bold text-slate-700">Material</span>
                        <input value={form.data.material} onChange={(event) => form.setData('material', event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" />
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-bold text-slate-700">Lens type</span>
                        <input value={form.data.lens_type} onChange={(event) => form.setData('lens_type', event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" />
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-bold text-slate-700">Tint</span>
                        <input value={form.data.tint} onChange={(event) => form.setData('tint', event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" />
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-bold text-slate-700">Rating</span>
                        <input type="number" min="0" max="5" step="0.01" value={form.data.rating} onChange={(event) => form.setData('rating', event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" />
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-bold text-slate-700">Review count</span>
                        <input type="number" min="0" value={form.data.review_count} onChange={(event) => form.setData('review_count', event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" />
                    </label>
                    <label className="space-y-2 md:col-span-2">
                        <span className="text-sm font-bold text-slate-700">Available colors</span>
                        <input value={form.data.available_colors_text} onChange={(event) => form.setData('available_colors_text', event.target.value)} placeholder="Black Gold, Champagne, Matte Gunmetal" className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" />
                    </label>
                    <label className="space-y-2 md:col-span-2">
                        <span className="text-sm font-bold text-slate-700">Highlights</span>
                        <textarea value={form.data.highlights_text} onChange={(event) => form.setData('highlights_text', event.target.value)} rows="4" placeholder={'UV400 protection\nAdjustable nose pads'} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" />
                    </label>
                    <label className="space-y-2 md:col-span-2">
                        <span className="text-sm font-bold text-slate-700">Product image upload</span>
                        <input type="file" accept="image/*" onChange={(event) => form.setData('image', event.target.files[0] ?? null)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" />
                        {product?.image_url && (
                            <div className="flex flex-wrap items-center gap-3">
                                <img src={product.image_url} alt={product.name} className="h-20 w-20 rounded-2xl object-cover" />
                                <CheckboxField checked={form.data.remove_image} onChange={(event) => form.setData('remove_image', event.target.checked)} label="Remove current image" />
                            </div>
                        )}
                    </label>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                    <CheckboxField checked={form.data.active} onChange={(event) => form.setData('active', event.target.checked)} label="Available in store" />
                    <CheckboxField checked={form.data.featured} onChange={(event) => form.setData('featured', event.target.checked)} label="Featured product" />
                    <CheckboxField checked={form.data.new_arrival} onChange={(event) => form.setData('new_arrival', event.target.checked)} label="New arrival" />
                </div>

                <div className="flex flex-wrap gap-3">
                    <button type="submit" disabled={form.processing} className="rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white">
                        {product ? 'Save changes' : 'Create product'}
                    </button>
                    {product && (
                        <button
                            type="button"
                            onClick={() => {
                                if (confirm(`Delete ${product.name}?`)) {
                                    form.delete(route('admin.products.destroy', product.id), { preserveScroll: true });
                                }
                            }}
                            className="rounded-full border border-rose-200 bg-rose-50 px-6 py-3 text-sm font-bold text-rose-700"
                        >
                            Delete product
                        </button>
                    )}
                </div>
            </form>
        </AdminLayout>
    );
}
