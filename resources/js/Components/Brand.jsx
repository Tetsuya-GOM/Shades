export default function Brand({ compact = false, light = false }) {
    return (
        <div className="flex items-center gap-3">
            <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-black tracking-[0.25em] ${
                    light
                        ? 'bg-white/15 text-white'
                        : 'bg-[linear-gradient(135deg,#c8a56a,#efd7a6)] text-[#23190c]'
                }`}
            >
                S
            </div>
            <div
                className={`font-black uppercase tracking-[0.35em] ${
                    compact ? 'text-sm' : 'text-lg'
                } ${light ? 'text-white' : 'text-slate-950'}`}
            >
                SHADES
            </div>
        </div>
    );
}
