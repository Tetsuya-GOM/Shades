import ProductCard from '@/Components/ProductCard';
import StoreLayout from '@/Layouts/StoreLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function ShopIndex({ products, filters, styles }) {
    const updateFilters = (key, value) => {
        router.get(
            route('shop.index'),
            { ...filters, [key]: value || undefined },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    return (
        <StoreLayout>
            <Head title="Shop" />

            <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
                <aside className="space-y-5 rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_24px_rgba(15,23,32,0.04)]">
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#92713d]">Filter catalog</p>
                        <h1 className="mt-2 text-3xl font-black text-slate-950">Find your next frame.</h1>
                    </div>

                    <input
                        defaultValue={filters.search ?? ''}
                        onBlur={(event) => updateFilters('search', event.target.value)}
                        placeholder="Search frames or styles"
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                    />

                    <select
                        value={filters.style ?? ''}
                        onChange={(event) => updateFilters('style', event.target.value)}
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                    >
                        <option value="">All frame styles</option>
                        {styles.map((style) => (
                            <option key={style} value={style}>
                                {style}
                            </option>
                        ))}
                    </select>

                    <select
                        value={filters.sort ?? ''}
                        onChange={(event) => updateFilters('sort', event.target.value)}
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                    >
                        <option value="">Featured first</option>
                        <option value="price_asc">Price: low to high</option>
                        <option value="price_desc">Price: high to low</option>
                        <option value="newest">Newest</option>
                    </select>

                    <Link href={route('shop.index')} className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white">
                        Clear filters
                    </Link>
                </aside>

                <section>
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#92713d]">Catalog</p>
                            <h2 className="mt-2 text-3xl font-black text-slate-950">Premium shades collection</h2>
                        </div>
                        <p className="text-sm text-slate-500">
                            {products.total} products available
                        </p>
                    </div>

                    {products.data.length ? (
                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {products.data.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 px-8 py-16 text-center">
                            <h3 className="text-2xl font-black text-slate-950">No products matched those filters.</h3>
                            <p className="mt-3 text-slate-500">Try another style, search term, or reset the catalog view.</p>
                        </div>
                    )}
                </section>
            </div>
        </StoreLayout>
    );
}
