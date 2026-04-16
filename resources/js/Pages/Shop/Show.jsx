import EyewearArt from '@/Components/EyewearArt';
import ProductCard from '@/Components/ProductCard';
import StoreLayout from '@/Layouts/StoreLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ShopShow({ product, relatedProducts }) {
    const form = useForm({
        quantity: 1,
        selected_color: product.available_colors[0],
    });

    const submit = (event) => {
        event.preventDefault();
        form.post(route('cart.store', product.slug), { preserveScroll: true });
    };

    return (
        <StoreLayout>
            <Head title={product.name} />

            <section className="grid gap-6 xl:grid-cols-[1fr_460px]">
                <div className="rounded-[32px] border border-slate-200 bg-[linear-gradient(180deg,#fbfcfe,#eef3f8)] p-8">
                    <div className="mx-auto h-[320px] max-w-[520px] sm:h-[420px]">
                        <EyewearArt type={product.artwork_key} />
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#92713d]">
                            {product.category.name}
                        </p>
                        <h1 className="mt-3 text-4xl font-black text-slate-950">{product.name}</h1>
                        <p className="mt-3 text-lg leading-8 text-slate-500">{product.description}</p>
                    </div>

                    <div className="rounded-[28px] border border-slate-200 bg-white p-6">
                        <div className="flex items-end justify-between gap-4">
                            <div>
                                <div className="text-3xl font-black text-slate-950">${product.price}</div>
                                {product.compare_price && (
                                    <div className="text-sm text-slate-400 line-through">${product.compare_price}</div>
                                )}
                            </div>
                            <div className="text-right text-sm text-slate-500">
                                <div>{product.material}</div>
                                <div>{product.lens_type}</div>
                            </div>
                        </div>

                        <form onSubmit={submit} className="mt-6 space-y-5">
                            <div>
                                <label className="text-sm font-bold text-slate-700">Color</label>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {product.available_colors.map((color) => (
                                        <button
                                            key={color}
                                            type="button"
                                            onClick={() => form.setData('selected_color', color)}
                                            className={`rounded-full border px-4 py-2 text-sm font-bold ${
                                                form.data.selected_color === color
                                                    ? 'border-slate-950 bg-slate-950 text-white'
                                                    : 'border-slate-200 bg-slate-50 text-slate-700'
                                            }`}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-slate-700">Quantity</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={form.data.quantity}
                                    onChange={(event) => form.setData('quantity', event.target.value)}
                                    className="mt-3 w-28 rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={form.processing}
                                className="inline-flex rounded-full bg-[#c8a56a] px-6 py-3 text-sm font-bold text-slate-950"
                            >
                                Add to cart
                            </button>
                        </form>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {product.highlights.map((highlight) => (
                            <div key={highlight} className="rounded-[22px] border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-600">
                                {highlight}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mt-14">
                <div className="mb-6">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#92713d]">Related picks</p>
                    <h2 className="mt-2 text-3xl font-black text-slate-950">More from the same edit</h2>
                </div>
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {relatedProducts.map((item) => (
                        <ProductCard key={item.id} product={item} />
                    ))}
                </div>
            </section>
        </StoreLayout>
    );
}
