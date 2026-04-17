import { Link } from '@inertiajs/react';

export default function Pagination({ links = [] }) {
    const visibleLinks = links.filter((link) => link.url || link.active);

    if (visibleLinks.length <= 3) {
        return null;
    }

    return (
        <nav className="mt-8 flex flex-wrap items-center gap-2">
            {visibleLinks.map((link) => (
                <Link
                    key={`${link.label}-${link.url ?? 'current'}`}
                    href={link.url ?? '#'}
                    preserveScroll
                    className={`rounded-full px-4 py-2 text-sm font-bold ${
                        link.active
                            ? 'bg-slate-950 text-white'
                            : link.url
                              ? 'border border-slate-200 bg-white text-slate-700'
                              : 'border border-slate-200 bg-slate-100 text-slate-400'
                    }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </nav>
    );
}
