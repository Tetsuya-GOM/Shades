import StatusBadge from '@/Components/StatusBadge';
import AdminLayout from '@/Layouts/AdminLayout';
import { currency, paymentLabel } from '@/lib/format';
import { Head, Link, useForm } from '@inertiajs/react';

export default function AdminOrderShow({ order, statuses }) {
    const form = useForm({ status: order.status });

    return (
        <AdminLayout title={`Order ${order.order_number}`}>
            <Head title={`Order ${order.order_number}`} />

            <div className="mb-6 flex flex-wrap gap-3">
                <Link href={route('admin.orders.index')} className="rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-bold text-slate-950">
                    Back to orders
                </Link>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
                <section className="space-y-6">
                    <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#92713d]">Customer</p>
                                <h2 className="mt-2 text-2xl font-black text-slate-950">{order.customer_name}</h2>
                                <p className="mt-2 text-sm text-slate-500">{order.customer_email} • {order.customer_phone}</p>
                            </div>
                            <StatusBadge value={order.status} />
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <div className="rounded-[22px] bg-white p-4">
                                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Shipping address</p>
                                <p className="mt-3 text-sm leading-7 text-slate-700">
                                    {order.address_line}
                                    <br />
                                    {order.city}, {order.province} {order.postal_code}
                                </p>
                            </div>
                            <div className="rounded-[22px] bg-white p-4">
                                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Payment</p>
                                <p className="mt-3 text-sm font-bold text-slate-950">{paymentLabel(order.payment_method)}</p>
                                <p className="mt-2 text-sm text-slate-500">Placed {new Date(order.placed_at).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    <section className="rounded-[28px] border border-slate-200 bg-white p-6">
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#92713d]">Order items</p>
                        <div className="mt-5 space-y-3">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex flex-wrap items-center justify-between gap-4 rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4">
                                    <div>
                                        <div className="font-bold text-slate-950">{item.product_name}</div>
                                        <div className="text-sm text-slate-500">{item.selected_color} • Qty {item.quantity}</div>
                                    </div>
                                    <div className="text-lg font-black text-slate-950">{currency(item.line_total)}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                </section>

                <aside className="rounded-[28px] border border-slate-200 bg-white p-6">
                    <h2 className="text-2xl font-black text-slate-950">Manage order</h2>
                    <div className="mt-5 space-y-3 text-sm text-slate-600">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>{currency(order.subtotal_amount)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>{currency(order.shipping_amount)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-black text-slate-950">
                            <span>Total</span>
                            <span>{currency(order.total_amount)}</span>
                        </div>
                    </div>

                    <div className="mt-6 space-y-3">
                        <label className="text-sm font-bold text-slate-700">Status</label>
                        <select value={form.data.status} onChange={(event) => form.setData('status', event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm">
                            {statuses.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                        <button
                            type="button"
                            onClick={() => form.patch(route('admin.orders.update', order.id), { preserveScroll: true })}
                            className="w-full rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white"
                        >
                            Update status
                        </button>
                    </div>
                </aside>
            </div>
        </AdminLayout>
    );
}
