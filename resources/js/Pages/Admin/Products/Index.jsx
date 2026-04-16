import EyewearArt from '@/Components/EyewearArt';
import StatusBadge from '@/Components/StatusBadge';
import AdminLayout from '@/Layouts/AdminLayout';
import { currency } from '@/lib/format';
import { Head, router } from '@inertiajs/react';

export default function AdminProductsIndex({ products, filters }) {
    return (
        <AdminLayout title="Product management">
            <Head title="Admin products" />

            <input
                defaultValue={filters.search ?? ''}
                onBlur={(event) =>
                    router.get(
                        route('admin.products.index'),
                        { search: event.target.value || undefined },
                        { preserveState: true, replace: true },
                    )
                }
                placeholder="Search by product, SKU, or frame style"
                className="mb-6 w-full max-w-xl rounded-2xl border border-slate-200 px-4 py-3 text-sm"
            />

            <div className="grid gap-4 md:grid-cols-2">
                {products.data.map((product) => (
                    <article key={product.id} className="grid gap-4 rounded-[28px] border border-slate-200 bg-slate-50 p-5 md:grid-cols-[120px_1fr] md:items-center">
                        <div className="flex h-28 items-center justify-center rounded-[20px] bg-white p-3">
                            <EyewearArt type={product.artwork_key} />
                        </div>
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#92713d]">{product.category.name}</p>
                                <h2 className="mt-2 text-xl font-black text-slate-950">{product.name}</h2>
                                <p className="mt-1 text-sm text-slate-500">{product.sku} • {product.frame_style}</p>
                            </div>
                            <div className="space-y-2 text-right">
                                <div className="text-lg font-black text-slate-950">{currency(product.price)}</div>
                                <StatusBadge value={product.inventory <= 12 ? 'low' : 'completed'}>
                                    {product.inventory <= 12 ? 'Low stock' : 'Available'}
                                </StatusBadge>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </AdminLayout>
    );
}
