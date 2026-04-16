export default function ApplicationLogo(props) {
    return (
        <div
            {...props}
            className={`${props.className ?? ''} flex items-center gap-3`}
        >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#c8a56a,#efd7a6)] text-sm font-black tracking-[0.25em] text-[#23190c]">
                S
            </div>
            <div className="font-black uppercase tracking-[0.35em] text-slate-950">
                SHADES
            </div>
        </div>
    );
}
