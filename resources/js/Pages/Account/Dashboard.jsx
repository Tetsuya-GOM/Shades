import StatusBadge from '@/Components/StatusBadge';
import StoreLayout from '@/Layouts/StoreLayout';
import { currency, paymentLabel } from '@/lib/format';
import { Head, Link, usePage } from '@inertiajs/react';

export default function AccountDashboard({ orders }) {
    const user = usePage().props.auth.user;

    return (
        <StoreLayout>
            <Head title="Account" />

            <section className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
                <aside className="rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,#111823,#0d1219)] p-6 text-white">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#efd7a6]">My account</p>
                    <h1 className="mt-3 text-3xl font-black">{user.name}</h1>
                    <p className="mt-2 text-sm text-white/65">{user.email}</p>
                    <div className="mt-8 space-y-3">
                        <Link href={route('profile.edit')} className="block rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold">
                            Edit profile
                        </Link>
                        {user.is_admin && (
                            <Link href={route('admin.dashboard')} className="block rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold">
                                Open admin panel
                            </Link>
                        )}
                    </div>
                </aside>

                <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_24px_rgba(15,23,32,0.04)]">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#92713d]">Recent orders</p>
                    <h2 className="mt-2 text-3xl font-black text-slate-950">Track your latest purchases.</h2>

                    <div className="mt-6 space-y-4">
                        {orders.length ? (
                            orders.map((order) => (
                                <article key={order.id} className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                        <div>
                                            <div className="text-lg font-black text-slate-950">{order.order_number}</div>
                                            <div className="text-sm text-slate-500">{paymentLabel(order.payment_method)}</div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <StatusBadge value={order.status} />
                                            <span className="font-black text-slate-950">{currency(order.total_amount)}</span>
                                        </div>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <div className="rounded-[24px] border border-dashed border-slate-300 px-6 py-12 text-center">
                                <p className="text-slate-500">No orders yet. Start with the latest Shades collection.</p>
                                <Link href={route('shop.index')} className="mt-4 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white">
                                    Shop now
                                </Link>
                            </div>
                        )}
                    </div>
                </section>
            </section>
        </StoreLayout>
    );
}
