const styles = {
    pending: 'bg-slate-100 text-slate-700',
    paid: 'bg-amber-100 text-amber-800',
    shipped: 'bg-blue-100 text-blue-700',
    completed: 'bg-emerald-100 text-emerald-700',
    low: 'bg-rose-100 text-rose-700',
};

export default function StatusBadge({ value, children }) {
    const label = children ?? value;

    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] ${
                styles[value] ?? 'bg-slate-100 text-slate-700'
            }`}
        >
            {label}
        </span>
    );
}
