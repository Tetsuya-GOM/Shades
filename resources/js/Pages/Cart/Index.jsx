import EyewearArt from '@/Components/EyewearArt';
import StoreLayout from '@/Layouts/StoreLayout';
import { currency } from '@/lib/format';
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function CartIndex({ cart }) {
    const auth = usePage().props.auth;

    return (
        <StoreLayout>
            <Head title="Cart" />

            <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
                <section className="space-y-4">
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#92713d]">Shopping cart</p>
                        <h1 className="mt-2 text-3xl font-black text-slate-950">Review your Shades order.</h1>
                    </div>

                    {cart.items.length ? (
                        cart.items.map((item) => (
                            <article key={item.id} className="grid gap-5 rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,32,0.04)] md:grid-cols-[140px_1fr_auto] md:items-center">
                                <div className="flex h-28 items-center justify-center rounded-[20px] bg-[linear-gradient(180deg,#fbfcfe,#eef3f8)] p-4">
                                    <div className="h-full w-full max-w-[120px]">
                                        <EyewearArt type={item.product.artwork_key} />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-slate-950">{item.product.name}</h2>
                                    <p className="mt-2 text-sm text-slate-500">
                                        {item.product.frame_style} • {item.selected_color}
                                    </p>
                                    <div className="mt-4 flex flex-wrap items-center gap-3">
                                        <input
                                            type="number"
                                            min="0"
                                            max="10"
                                            defaultValue={item.quantity}
                                            onBlur={(event) =>
                                                router.patch(
                                                    route('cart.update', item.id),
                                                    { quantity: event.target.value },
                                                    { preserveScroll: true },
                                                )
                                            }
                                            className="w-24 rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                router.delete(route('cart.destroy', item.id), {
                                                    preserveScroll: true,
                                                })
                                            }
                                            className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-bold text-rose-700"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                <div className="text-right text-xl font-black text-slate-950">
                                    {currency(item.line_total)}
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 px-8 py-16 text-center">
                            <h3 className="text-2xl font-black text-slate-950">Your cart is empty.</h3>
                            <p className="mt-3 text-slate-500">Explore the catalog and add a frame you love.</p>
                            <Link href={route('shop.index')} className="mt-6 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white">
                                Continue shopping
                            </Link>
                        </div>
                    )}
                </section>

                <aside className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_24px_rgba(15,23,32,0.04)]">
                    <h2 className="text-2xl font-black text-slate-950">Order summary</h2>
                    <div className="mt-6 space-y-3 text-sm text-slate-600">
                        <div className="flex justify-between">
                            <span>Items</span>
                            <span>{cart.count}</span>
                        </div>
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
                    <Link href={route('checkout.index')} className="mt-6 inline-flex w-full justify-center rounded-full bg-[#c8a56a] px-6 py-3 text-sm font-bold text-slate-950">
                        {auth.user ? 'Continue to checkout' : 'Login to continue'}
                    </Link>
                </aside>
            </div>
        </StoreLayout>
    );
}
