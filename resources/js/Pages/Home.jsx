import ProductCard from '@/Components/ProductCard';
import StoreLayout from '@/Layouts/StoreLayout';
import { Head, Link } from '@inertiajs/react';

export default function Home({ featuredProducts, newArrivals, categories, stats }) {
    return (
        <StoreLayout>
            <Head title="Shades" />

            <section className="grid gap-8 xl:grid-cols-[1.05fr_.95fr] xl:items-center">
                <div className="space-y-8">
                    <div className="space-y-5">
                        <p className="text-xs font-black uppercase tracking-[0.26em] text-[#c8a56a]">
                            Shades • premium eyewear edit
                        </p>
                        <h1 className="max-w-3xl font-serif text-5xl font-bold leading-none text-slate-950 sm:text-7xl">
                            Wear a different point of view.
                        </h1>
                        <p className="max-w-2xl text-lg leading-8 text-slate-500">
                            A production-ready single-niche e-commerce app for curated shades, built with Laravel, Inertia, React, and Tailwind.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Link href={route('shop.index')} className="inline-flex rounded-full bg-[#c8a56a] px-6 py-3 text-sm font-bold text-slate-950">
                            Shop new arrivals
                        </Link>
                        <Link href={route('shop.index', { category: 'optical' })} className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-bold text-slate-950">
                            Browse optical
                        </Link>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        {stats.map((stat) => (
                            <div key={stat.label} className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                                    {stat.label}
                                </p>
                                <p className="mt-2 text-lg font-extrabold text-slate-950">
                                    {stat.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,#151d28_0%,#0e151e_100%)] p-6 text-white">
                    <div className="rounded-[22px] border border-white/10 bg-white/5 p-5 backdrop-blur">
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#efd7a6]">
                            Signature collection
                        </p>
                        <h2 className="mt-3 text-3xl font-black">Frames for city light, road glare, and dressed-up weekends.</h2>
                    </div>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        {featuredProducts.slice(0, 4).map((product) => (
                            <div key={product.id} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                                <p className="text-xs font-black uppercase tracking-[0.18em] text-white/60">
                                    {product.frame_style}
                                </p>
                                <p className="mt-2 text-xl font-bold">{product.name}</p>
                                <p className="mt-2 text-sm leading-6 text-white/70">{product.tagline}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mt-14">
                <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#92713d]">Category edit</p>
                        <h2 className="mt-2 text-3xl font-black text-slate-950">Built around one niche, with clear shopping paths.</h2>
                    </div>
                </div>
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={route('shop.index', { category: category.slug })}
                            className="rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,#fff,#f8fbfd)] p-6 shadow-[0_10px_24px_rgba(15,23,32,0.04)]"
                        >
                            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#92713d]">
                                {category.eyebrow}
                            </p>
                            <h3 className="mt-3 text-2xl font-black text-slate-950">{category.name}</h3>
                            <p className="mt-3 text-sm leading-7 text-slate-500">{category.description}</p>
                            <p className="mt-5 text-sm font-bold text-slate-950">
                                Explore {category.products_count} styles
                            </p>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="mt-14">
                <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#92713d]">Featured products</p>
                        <h2 className="mt-2 text-3xl font-black text-slate-950">Shop the core assortment.</h2>
                    </div>
                    <Link href={route('shop.index')} className="text-sm font-bold text-slate-600">
                        View full catalog
                    </Link>
                </div>
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {featuredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            <section className="mt-14">
                <div className="mb-6">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#92713d]">New arrivals</p>
                    <h2 className="mt-2 text-3xl font-black text-slate-950">Fresh additions to the Shades lineup.</h2>
                </div>
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {newArrivals.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </StoreLayout>
    );
}
