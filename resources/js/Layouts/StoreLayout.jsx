import Brand from '@/Components/Brand';
import { Link, usePage } from '@inertiajs/react';

export default function StoreLayout({ children }) {
    const { auth, cart, categories, flash } = usePage().props;

    return (
        <div className="min-h-screen w-full bg-[#edf2f6] text-slate-950">
            <div className="min-h-screen w-full overflow-x-hidden bg-white">
                <div className="flex flex-wrap items-center justify-between gap-4 bg-[linear-gradient(90deg,#141d27,#1d2936)] px-4 py-3 text-sm text-white/85 sm:px-6 lg:px-8">
                    <span>Premium shades, sunglasses, and optical frames</span>
                </div>

                <header className="border-b border-slate-100 px-4 py-5 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                        <Link href={route('home')}>
                            <Brand />
                        </Link>
                        <nav className="flex flex-wrap items-center gap-3 text-sm font-bold text-slate-600">
                            <Link href={route('home')} className="hover:text-slate-950">
                                Home
                            </Link>
                            <Link href={route('shop.index')} className="hover:text-slate-950">
                                Shop
                            </Link>
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={route('shop.index', { category: category.slug })}
                                    className="hover:text-slate-950"
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </nav>
                        <div className="flex flex-wrap items-center gap-3 text-sm font-bold">
                            {auth.user ? (
                                <>
                                    <Link href={route('dashboard')} className="text-slate-600 hover:text-slate-950">
                                        Account
                                    </Link>
                                    {auth.user.is_admin && (
                                        <Link href={route('admin.dashboard')} className="text-slate-600 hover:text-slate-950">
                                            Admin
                                        </Link>
                                    )}
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="text-slate-600 hover:text-slate-950"
                                    >
                                        Logout
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href={route('login')} className="text-slate-600 hover:text-slate-950">
                                        Login
                                    </Link>
                                    <Link href={route('register')} className="text-slate-600 hover:text-slate-950">
                                        Register
                                    </Link>
                                </>
                            )}
                            <Link href={route('cart.index')} className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-slate-950">
                                Cart ({cart.count})
                            </Link>
                        </div>
                    </div>
                    {flash.success && (
                        <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                            {flash.success}
                        </div>
                    )}
                </header>

                <main className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">{children}</main>

                <footer className="grid gap-8 border-t border-slate-100 px-4 py-8 text-sm text-slate-500 sm:px-6 md:grid-cols-4 lg:px-8">
                    <div className="space-y-3">
                        <Brand compact />
                        <p className="max-w-xs leading-6">
                            A single-niche storefront for premium shades, built as a modern Laravel + Inertia application.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Shop</p>
                        <Link href={route('shop.index')}>All styles</Link>
                        <Link href={route('shop.index', { style: 'Aviator' })}>Aviators</Link>
                        <Link href={route('shop.index', { style: 'Shield' })}>Performance</Link>
                    </div>
                    <div className="space-y-2">
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Account</p>
                        <Link href={auth.user ? route('dashboard') : route('login')}>
                            {auth.user ? 'Dashboard' : 'Login'}
                        </Link>
                        <Link href={route('cart.index')}>Cart</Link>
                        <Link href={route('checkout.index')}>{auth.user ? 'Checkout' : 'Login for checkout'}</Link>
                    </div>
                    <div className="space-y-2">
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Promise</p>
                        <p>UV400-protected curated frames</p>
                        <p>Responsive storefront and admin tools</p>
                        <p>Live cart, checkout, and order management</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}
