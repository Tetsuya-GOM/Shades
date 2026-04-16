import EyewearArt from '@/Components/EyewearArt';
import { Link } from '@inertiajs/react';
import { currency } from '@/lib/format';

export default function ProductCard({ product }) {
    return (
        <article className="overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_18px_50px_rgba(15,23,32,0.08)]">
            <div className="relative flex h-56 items-center justify-center bg-[linear-gradient(180deg,#fbfcfe,#eef3f8)] p-6">
                <span className="absolute left-4 top-4 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-slate-700">
                    {product.frame_style}
                </span>
                <div className="h-full w-full max-w-[280px]">
                    <EyewearArt type={product.artwork_key} />
                </div>
            </div>
            <div className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#92713d]">
                            {product.category.name}
                        </p>
                        <h3 className="mt-2 text-xl font-extrabold text-slate-950">
                            {product.name}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            {product.tagline}
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-xl font-black text-slate-950">
                            {currency(product.price)}
                        </div>
                        {product.compare_price && (
                            <div className="text-sm text-slate-400 line-through">
                                {currency(product.compare_price)}
                            </div>
                        )}
                    </div>
                </div>
                <Link
                    href={route('products.show', product.slug)}
                    className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                >
                    View product
                </Link>
            </div>
        </article>
    );
}
