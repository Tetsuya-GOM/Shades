import StatusBadge from '@/Components/StatusBadge';
import StoreLayout from '@/Layouts/StoreLayout';
import { currency, paymentLabel } from '@/lib/format';
import { Head, Link, usePage } from '@inertiajs/react';

export default function OrderSuccess({ order }) {
    const user = usePage().props.auth.user;

    return (
        <StoreLayout>
            <Head title="Order confirmed" />

            <section className="mx-auto max-w-3xl rounded-[32px] border border-slate-200 bg-white p-8 text-center shadow-[0_18px_50px_rgba(15,23,32,0.08)]">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-3xl font-black text-emerald-700">
                    ✓
                </div>
                <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-[#92713d]">Order confirmed</p>
                <h1 className="mt-3 text-4xl font-black text-slate-950">Thank you for shopping Shades.</h1>
                <p className="mt-3 text-lg text-slate-500">
                    Your order <span className="font-bold text-slate-950">{order.order_number}</span> is now in our system.
                </p>

                <div className="mt-8 grid gap-4 rounded-[28px] border border-slate-200 bg-slate-50 p-6 text-left sm:grid-cols-2">
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Status</p>
                        <div className="mt-2">
                            <StatusBadge value={order.status} />
                        </div>
                    </div>
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Payment</p>
                        <div className="mt-2 font-bold text-slate-950">{paymentLabel(order.payment_method)}</div>
                    </div>
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Total</p>
                        <div className="mt-2 font-bold text-slate-950">{currency(order.total_amount)}</div>
                    </div>
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Customer</p>
                        <div className="mt-2 font-bold text-slate-950">{order.customer_name}</div>
                    </div>
                </div>

                <div className="mt-8 rounded-[28px] border border-slate-200 bg-white p-6 text-left">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#92713d]">Order summary</p>
                    <div className="mt-5 space-y-3">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4">
                                <div>
                                    <div className="font-bold text-slate-950">{item.product_name}</div>
                                    <div className="text-sm text-slate-500">{item.selected_color} • Qty {item.quantity}</div>
                                </div>
                                <div className="font-bold text-slate-950">{currency(item.line_total)}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link href={route('shop.index')} className="inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white">
                        Continue shopping
                    </Link>
                    <Link
                        href={user ? route('dashboard') : route('login')}
                        className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-bold text-slate-950"
                    >
                        {user ? 'View account' : 'Login'}
                    </Link>
                </div>
            </section>
        </StoreLayout>
    );
}
