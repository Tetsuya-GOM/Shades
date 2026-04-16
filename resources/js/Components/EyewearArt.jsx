function LensHighlight() {
    return (
        <>
            <path
                d="M145 76 C128 70 112 72 94 86"
                stroke="white"
                strokeOpacity="0.18"
                strokeWidth="8"
                strokeLinecap="round"
            />
            <path
                d="M373 76 C356 70 340 72 322 86"
                stroke="white"
                strokeOpacity="0.18"
                strokeWidth="8"
                strokeLinecap="round"
            />
        </>
    );
}

export default function EyewearArt({ type = 'aviator' }) {
    const defs = (
        <defs>
            <linearGradient id={`${type}-lens`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6b4d3a" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#18212b" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id={`${type}-metal`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#c8a56a" />
                <stop offset="100%" stopColor="#18212b" stopOpacity="0.75" />
            </linearGradient>
        </defs>
    );

    const variants = {
        aviator: (
            <>
                <path d="M84 107 L18 88" stroke="#18212b" strokeWidth="8" strokeLinecap="round" />
                <path d="M436 107 L502 88" stroke="#18212b" strokeWidth="8" strokeLinecap="round" />
                <path d="M116 76 C88 76 71 95 71 121 C71 146 90 166 118 166 H166 C193 166 212 146 212 121 V110 C212 89 194 76 171 76 H116Z" fill="url(#aviator-lens)" stroke="url(#aviator-metal)" strokeWidth="8" />
                <path d="M304 76 C276 76 259 95 259 121 C259 146 278 166 306 166 H354 C381 166 400 146 400 121 V110 C400 89 382 76 359 76 H304Z" fill="url(#aviator-lens)" stroke="url(#aviator-metal)" strokeWidth="8" />
                <path d="M212 103 C225 93 236 90 259 103" stroke="url(#aviator-metal)" strokeWidth="8" strokeLinecap="round" />
                <LensHighlight />
            </>
        ),
        square: (
            <>
                <path d="M84 107 L18 88" stroke="#18212b" strokeWidth="8" strokeLinecap="round" />
                <path d="M436 107 L502 88" stroke="#18212b" strokeWidth="8" strokeLinecap="round" />
                <rect x="79" y="63" width="153" height="103" rx="24" fill="url(#square-lens)" stroke="#c8a56a" strokeWidth="10" />
                <rect x="288" y="63" width="153" height="103" rx="24" fill="url(#square-lens)" stroke="#c8a56a" strokeWidth="10" />
                <path d="M232 101 H288" stroke="#c8a56a" strokeWidth="10" strokeLinecap="round" />
                <LensHighlight />
            </>
        ),
        round: (
            <>
                <path d="M84 107 L18 88" stroke="#18212b" strokeWidth="8" strokeLinecap="round" />
                <path d="M436 107 L502 88" stroke="#18212b" strokeWidth="8" strokeLinecap="round" />
                <circle cx="154" cy="112" r="66" fill="url(#round-lens)" stroke="url(#round-metal)" strokeWidth="8" />
                <circle cx="366" cy="112" r="66" fill="url(#round-lens)" stroke="url(#round-metal)" strokeWidth="8" />
                <path d="M220 108 C238 96 252 96 300 108" stroke="url(#round-metal)" strokeWidth="8" strokeLinecap="round" />
                <LensHighlight />
            </>
        ),
        shield: (
            <>
                <path d="M79 113 L19 97" stroke="#18212b" strokeWidth="10" strokeLinecap="round" />
                <path d="M441 113 L501 97" stroke="#18212b" strokeWidth="10" strokeLinecap="round" />
                <path d="M86 92 C144 45 377 45 435 92 L410 151 C404 165 390 174 375 174 H145 C130 174 116 165 110 151 L86 92Z" fill="url(#shield-lens)" stroke="#18212b" strokeWidth="10" />
                <path d="M129 90 C174 74 346 74 392 90" stroke="white" strokeOpacity=".14" strokeWidth="10" strokeLinecap="round" />
            </>
        ),
        optical: (
            <>
                <path d="M84 107 L18 88" stroke="#18212b" strokeWidth="8" strokeLinecap="round" />
                <path d="M436 107 L502 88" stroke="#18212b" strokeWidth="8" strokeLinecap="round" />
                <rect x="82" y="74" width="148" height="86" rx="18" fill="url(#optical-lens)" stroke="#18212b" strokeWidth="10" />
                <rect x="290" y="74" width="148" height="86" rx="18" fill="url(#optical-lens)" stroke="#18212b" strokeWidth="10" />
                <path d="M230 108 H290" stroke="#18212b" strokeWidth="10" strokeLinecap="round" />
                <LensHighlight />
            </>
        ),
    };

    return (
        <svg className="h-full w-full" viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" fill="none">
            {defs}
            {variants[type] ?? variants.aviator}
        </svg>
    );
}
