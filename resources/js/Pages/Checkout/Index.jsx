import StoreLayout from '@/Layouts/StoreLayout';
import { currency } from '@/lib/format';
import { Head, useForm } from '@inertiajs/react';

export default function CheckoutIndex({ cart, paymentMethods }) {
    const form = useForm({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        address_line: '',
        city: '',
        province: '',
        postal_code: '',
        payment_method: 'card',
        notes: '',
    });

    const submit = (event) => {
        event.preventDefault();
        form.post(route('checkout.store'));
    };

    return (
        <StoreLayout>
            <Head title="Checkout" />

            <form onSubmit={submit} className="grid gap-6 xl:grid-cols-[1fr_380px]">
                <section className="space-y-6">
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#92713d]">Checkout</p>
                        <h1 className="mt-2 text-3xl font-black text-slate-950">Finish your Shades order.</h1>
                    </div>

                    <div className="grid gap-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_24px_rgba(15,23,32,0.04)] sm:grid-cols-2">
                        {[
                            ['customer_name', 'Full name'],
                            ['customer_email', 'Email address'],
                            ['customer_phone', 'Phone number'],
                            ['postal_code', 'Postal code'],
                            ['city', 'City'],
                            ['province', 'Province'],
                        ].map(([key, label]) => (
                            <label key={key} className="space-y-2">
                                <span className="text-sm font-bold text-slate-700">{label}</span>
                                <input
                                    value={form.data[key]}
                                    onChange={(event) => form.setData(key, event.target.value)}
                                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                                />
                            </label>
                        ))}
                        <label className="space-y-2 sm:col-span-2">
                            <span className="text-sm font-bold text-slate-700">Address line</span>
                            <input
                                value={form.data.address_line}
                                onChange={(event) => form.setData('address_line', event.target.value)}
                                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                            />
                        </label>
                        <label className="space-y-2 sm:col-span-2">
                            <span className="text-sm font-bold text-slate-700">Order notes</span>
                            <textarea
                                value={form.data.notes}
                                onChange={(event) => form.setData('notes', event.target.value)}
                                rows="4"
                                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                            />
                        </label>
                    </div>

                    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_24px_rgba(15,23,32,0.04)]">
                        <h2 className="text-2xl font-black text-slate-950">Payment method</h2>
                        <div className="mt-5 space-y-3">
                            {paymentMethods.map((method) => (
                                <label key={method.value} className="flex cursor-pointer items-center justify-between gap-4 rounded-[22px] border border-slate-200 px-4 py-4">
                                    <div>
                                        <div className="font-bold text-slate-950">{method.label}</div>
                                        <div className="text-sm text-slate-500">{method.description}</div>
                                    </div>
                                    <input
                                        type="radio"
                                        checked={form.data.payment_method === method.value}
                                        onChange={() => form.setData('payment_method', method.value)}
                                    />
                                </label>
                            ))}
                        </div>
                    </div>
                </section>

                <aside className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_24px_rgba(15,23,32,0.04)]">
                    <h2 className="text-2xl font-black text-slate-950">Summary</h2>
                    <div className="mt-5 space-y-3 text-sm text-slate-600">
                        {cart.items.map((item) => (
                            <div key={item.id} className="flex justify-between gap-4">
                                <span>
                                    {item.product.name} x {item.quantity}
                                </span>
                                <span>{currency(item.line_total)}</span>
                            </div>
                        ))}
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>{currency(cart.subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>{currency(cart.shipping)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-black text-slate-950">
                            <span>Total</span>
                            <span>{currency(cart.total)}</span>
                        </div>
                    </div>
                    <button type="submit" className="mt-6 inline-flex w-full justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white">
                        Place order
                    </button>
                </aside>
            </form>
        </StoreLayout>
    );
}
