import Brand from '@/Components/Brand';
import { Link } from '@inertiajs/react';

const links = [
    { label: 'Overview', routeName: 'admin.dashboard' },
    { label: 'Products', routeName: 'admin.products.index' },
    { label: 'Orders', routeName: 'admin.orders.index' },
];

export default function AdminLayout({ children, title }) {
    return (
        <div className="min-h-screen bg-[#edf2f6] p-3 sm:p-6">
            <div className="mx-auto grid max-w-[1440px] gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
                <aside className="rounded-[28px] bg-[linear-gradient(180deg,#111823,#0d1219)] p-6 text-white shadow-[0_18px_50px_rgba(15,23,32,0.12)]">
                    <Brand light />
                    <p className="mt-5 text-sm leading-6 text-white/65">
                        Operational console for the live Shades storefront.
                    </p>
                    <nav className="mt-8 space-y-2">
                        {links.map((item) => (
                            <Link
                                key={item.routeName}
                                href={route(item.routeName)}
                                className={`block rounded-2xl px-4 py-3 text-sm font-bold ${
                                    route().current(item.routeName) || route().current(`${item.routeName.replace('.index', '')}.*`)
                                        ? 'bg-white/10 text-white'
                                        : 'text-white/75 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link href={route('home')} className="block rounded-2xl px-4 py-3 text-sm font-bold text-white/75 hover:bg-white/5 hover:text-white">
                            Back to store
                        </Link>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="block w-full rounded-2xl px-4 py-3 text-left text-sm font-bold text-white/75 hover:bg-white/5 hover:text-white"
                        >
                            Log out
                        </Link>
                    </nav>
                </aside>
                <div className="rounded-[28px] border border-white/70 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,32,0.08)] sm:p-8">
                    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#92713d]">Shades admin</p>
                            <h1 className="mt-2 text-3xl font-black text-slate-950">{title}</h1>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
