import AdminLayout from '@/Layouts/AdminLayout';
import StatusBadge from '@/Components/StatusBadge';
import { currency } from '@/lib/format';
import { Head } from '@inertiajs/react';

export default function AdminDashboard({ stats, salesByStatus, recentOrders, topProducts }) {
    const statCards = [
        ['Revenue', currency(stats.revenue)],
        ['Orders', stats.orders],
        ['Customers', stats.customers],
        ['Low stock', stats.lowStock],
    ];

    return (
        <AdminLayout title="Operations overview">
            <Head title="Admin dashboard" />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {statCards.map(([label, value]) => (
                    <div key={label} className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">{label}</p>
                        <p className="mt-3 text-3xl font-black text-slate-950">{value}</p>
                    </div>
                ))}
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
                <section className="rounded-[28px] border border-slate-200 bg-white p-6">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#92713d]">Order mix</p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        {Object.entries(salesByStatus).map(([status, count]) => (
                            <div key={status} className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                                <StatusBadge value={status} />
                                <p className="mt-3 text-2xl font-black text-slate-950">{count}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="rounded-[28px] border border-slate-200 bg-white p-6">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#92713d]">Inventory watch</p>
                    <div className="mt-5 space-y-3">
                        {topProducts.map((product) => (
                            <div key={product.id} className="flex items-center justify-between rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-3">
                                <div>
                                    <div className="font-bold text-slate-950">{product.name}</div>
                                    <div className="text-sm text-slate-500">{product.frame_style}</div>
                                </div>
                                <StatusBadge value={product.inventory <= 12 ? 'low' : 'completed'}>
                                    {product.inventory <= 12 ? 'Low stock' : 'Available'}
                                </StatusBadge>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <section className="mt-8 rounded-[28px] border border-slate-200 bg-white p-6">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#92713d]">Recent orders</p>
                <div className="mt-5 overflow-hidden rounded-[24px] border border-slate-200">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-slate-50 text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                            <tr>
                                <th className="px-4 py-4">Order</th>
                                <th className="px-4 py-4">Customer</th>
                                <th className="px-4 py-4">Total</th>
                                <th className="px-4 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="border-t border-slate-100">
                                    <td className="px-4 py-4 font-bold text-slate-950">{order.order_number}</td>
                                    <td className="px-4 py-4 text-slate-600">{order.customer_name}</td>
                                    <td className="px-4 py-4 text-slate-600">{currency(order.total_amount)}</td>
                                    <td className="px-4 py-4">
                                        <StatusBadge value={order.status} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </AdminLayout>
    );
}
