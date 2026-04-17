import EyewearArt from '@/Components/EyewearArt';
import Pagination from '@/Components/Pagination';
import StatusBadge from '@/Components/StatusBadge';
import AdminLayout from '@/Layouts/AdminLayout';
import { currency } from '@/lib/format';
import { Head, Link, router } from '@inertiajs/react';

export default function AdminProductsIndex({ products, filters }) {
    return (
        <AdminLayout title="Product management">
            <Head title="Admin products" />

            <div className="mb-6 flex flex-wrap gap-3">
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
                    className="w-full max-w-xl rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                />
                <Link href={route('admin.products.create')} className="rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white">
                    Add product
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {products.data.map((product) => (
                    <article key={product.id} className="grid gap-4 rounded-[28px] border border-slate-200 bg-slate-50 p-5 md:grid-cols-[120px_1fr] md:items-center">
                        <div className="flex h-28 items-center justify-center rounded-[20px] bg-white p-3">
                            {product.image_url ? (
                                <img src={product.image_url} alt={product.name} className="h-full w-full rounded-2xl object-cover" />
                            ) : (
                                <EyewearArt type={product.artwork_key} />
                            )}
                        </div>
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#92713d]">{product.category.name}</p>
                                <h2 className="mt-2 text-xl font-black text-slate-950">{product.name}</h2>
                                <p className="mt-1 text-sm text-slate-500">{product.sku} • {product.frame_style}</p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <Link href={route('admin.products.edit', product.id)} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-950">
                                        Edit
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => router.patch(route('admin.products.toggle-availability', product.id), {}, { preserveScroll: true })}
                                        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-950"
                                    >
                                        {product.active ? 'Disable' : 'Enable'}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2 text-right">
                                <div className="text-lg font-black text-slate-950">{currency(product.price)}</div>
                                <StatusBadge value={product.inventory <= 12 ? 'low' : 'completed'}>
                                    {product.inventory <= 12 ? 'Low stock' : 'Available'}
                                </StatusBadge>
                                <div className="text-sm text-slate-500">{product.inventory} units</div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            <Pagination links={products.links} />
        </AdminLayout>
    );
}
