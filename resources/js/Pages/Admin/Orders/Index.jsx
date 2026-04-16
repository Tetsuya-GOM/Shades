import StatusBadge from '@/Components/StatusBadge';
import AdminLayout from '@/Layouts/AdminLayout';
import { currency } from '@/lib/format';
import { Head, router, useForm } from '@inertiajs/react';

function OrderStatusSelect({ order, statuses }) {
    const form = useForm({ status: order.status });

    return (
        <select
            value={form.data.status}
            onChange={(event) => {
                const value = event.target.value;
                form.setData('status', value);
                form.patch(route('admin.orders.update', order.id), {
                    data: { status: value },
                    preserveScroll: true,
                });
            }}
            className="rounded-2xl border border-slate-200 px-3 py-2 text-sm"
        >
            {statuses.map((status) => (
                <option key={status} value={status}>
                    {status}
                </option>
            ))}
        </select>
    );
}

export default function AdminOrdersIndex({ orders, filters, statuses }) {
    return (
        <AdminLayout title="Order management">
            <Head title="Admin orders" />

            <div className="mb-6 flex flex-wrap gap-3">
                <input
                    defaultValue={filters.search ?? ''}
                    onBlur={(event) =>
                        router.get(
                            route('admin.orders.index'),
                            { ...filters, search: event.target.value || undefined },
                            { preserveState: true, replace: true },
                        )
                    }
                    placeholder="Search by order number or customer"
                    className="min-w-[260px] rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                />
                <select
                    value={filters.status ?? ''}
                    onChange={(event) =>
                        router.get(
                            route('admin.orders.index'),
                            { ...filters, status: event.target.value || undefined },
                            { preserveState: true, replace: true },
                        )
                    }
                    className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                >
                    <option value="">All statuses</option>
                    {statuses.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </div>

            <div className="space-y-4">
                {orders.data.map((order) => (
                    <article key={order.id} className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#92713d]">{order.order_number}</p>
                                <h2 className="mt-2 text-2xl font-black text-slate-950">{order.customer_name}</h2>
                                <p className="mt-2 text-sm text-slate-500">{order.customer_email} • {order.customer_phone}</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                <StatusBadge value={order.status} />
                                <div className="text-lg font-black text-slate-950">{currency(order.total_amount)}</div>
                            </div>
                        </div>

                        <div className="mt-5 grid gap-4 xl:grid-cols-[1fr_auto] xl:items-end">
                            <div className="grid gap-3 md:grid-cols-2">
                                {order.items.map((item) => (
                                    <div key={item.id} className="rounded-[22px] border border-slate-200 bg-white px-4 py-3">
                                        <div className="font-bold text-slate-950">{item.product_name}</div>
                                        <div className="text-sm text-slate-500">
                                            {item.selected_color} • Qty {item.quantity}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <OrderStatusSelect order={order} statuses={statuses} />
                        </div>
                    </article>
                ))}
            </div>
        </AdminLayout>
    );
}
