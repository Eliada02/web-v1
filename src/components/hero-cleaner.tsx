/**
 * Decorative animated illustration for the hero: a rope-access technician
 * cleaning a window with a squeegee. Pure CSS/SVG animation (no JS), brand
 * colours, hidden on small screens and disabled for reduced-motion users.
 */
export function HeroCleaner() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-4 hidden items-center justify-center lg:flex xl:right-16"
    >
      <svg
        viewBox="0 0 300 470"
        className="h-[80%] w-auto drop-shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          @keyframes hc-sway   { 0%,100% { transform: rotate(-2.5deg) } 50% { transform: rotate(2.5deg) } }
          @keyframes hc-wipe   { 0%,100% { transform: rotate(7deg) }    50% { transform: rotate(-9deg) } }
          @keyframes hc-shine  { 0%,35% { opacity:0; transform: translateX(-60px) } 55% { opacity:1 } 100% { opacity:0; transform: translateX(210px) } }
          @keyframes hc-spark  { 0%,100% { opacity:0; transform: scale(.3) } 50% { opacity:1; transform: scale(1) } }
          @keyframes hc-bubble { 0% { opacity:0; transform: translateY(0) scale(.5) } 25% { opacity:.85 } 100% { opacity:0; transform: translateY(-70px) scale(1) } }

          .hc-rig    { transform-box: view-box; transform-origin: 240px 8px;   animation: hc-sway 5s ease-in-out infinite; }
          .hc-arm    { transform-box: view-box; transform-origin: 226px 196px; animation: hc-wipe 2.8s ease-in-out infinite; }
          .hc-shine  { animation: hc-shine 3.4s ease-in-out infinite; }
          .hc-spark  { transform-box: fill-box; transform-origin: center; animation: hc-spark 2.4s ease-in-out infinite; }
          .hc-spark.d1 { animation-delay: .9s; }
          .hc-spark.d2 { animation-delay: 1.6s; }
          .hc-bubble { transform-box: fill-box; transform-origin: center; animation: hc-bubble 3.6s ease-in-out infinite; }
          .hc-bubble.b1 { animation-delay: 1.2s; }
          .hc-bubble.b2 { animation-delay: 2.2s; }

          @media (prefers-reduced-motion: reduce) {
            .hc-rig, .hc-arm, .hc-shine, .hc-spark, .hc-bubble { animation: none !important; }
          }
        `}</style>

        {/* Window */}
        <rect x="30" y="120" width="170" height="250" fill="#ffffff" fillOpacity="0.05" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2.5" />
        <line x1="115" y1="120" x2="115" y2="370" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="2" />
        <line x1="30" y1="245" x2="200" y2="245" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="2" />

        {/* Light sweep across the glass */}
        <clipPath id="hc-win">
          <rect x="30" y="120" width="170" height="250" />
        </clipPath>
        <g clipPath="url(#hc-win)">
          <rect className="hc-shine" x="20" y="110" width="36" height="280" fill="#ffffff" fillOpacity="0.16" transform="skewX(-18)" />
        </g>

        {/* Soap bubbles rising from where the squeegee passes */}
        <circle className="hc-bubble" cx="92" cy="250" r="4.5" fill="#ffffff" fillOpacity="0.7" />
        <circle className="hc-bubble b1" cx="110" cy="270" r="3" fill="#ffffff" fillOpacity="0.6" />
        <circle className="hc-bubble b2" cx="78" cy="265" r="3.5" fill="#ffffff" fillOpacity="0.6" />

        {/* Sparkles on the clean glass */}
        <g transform="translate(150,165)">
          <path className="hc-spark" d="M0,-7 L1.6,-1.6 L7,0 L1.6,1.6 L0,7 L-1.6,1.6 L-7,0 L-1.6,-1.6 Z" fill="var(--primary)" />
        </g>
        <g transform="translate(165,310)">
          <path className="hc-spark d1" d="M0,-5 L1.2,-1.2 L5,0 L1.2,1.2 L0,5 L-1.2,1.2 L-5,0 L-1.2,-1.2 Z" fill="#ffffff" />
        </g>
        <g transform="translate(70,200)">
          <path className="hc-spark d2" d="M0,-5 L1.2,-1.2 L5,0 L1.2,1.2 L0,5 L-1.2,1.2 L-5,0 L-1.2,-1.2 Z" fill="var(--primary)" />
        </g>

        {/* Rope + technician (sways as one) */}
        <g className="hc-rig">
          {/* Anchor + rope */}
          <circle cx="240" cy="8" r="4" fill="var(--primary)" />
          <line x1="240" y1="8" x2="233" y2="170" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="2" />

          {/* Harness seat */}
          <rect x="222" y="224" width="24" height="9" fill="var(--primary)" />
          {/* Legs */}
          <path d="M229 233 L225 262 M241 233 L246 262" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="5" strokeLinecap="round" />
          {/* Body / jacket */}
          <rect x="226" y="184" width="17" height="42" fill="#ffffff" fillOpacity="0.9" />
          {/* Helmet */}
          <circle cx="234" cy="176" r="13" fill="var(--primary)" />
          <rect x="221" y="172" width="26" height="4" fill="var(--primary)" />

          {/* Arm + squeegee (wiping) */}
          <g className="hc-arm">
            <line x1="228" y1="196" x2="120" y2="232" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="5" strokeLinecap="round" />
            {/* squeegee handle */}
            <line x1="120" y1="232" x2="103" y2="232" stroke="var(--primary)" strokeWidth="3.5" strokeLinecap="round" />
            {/* squeegee blade (rubber on glass) */}
            <rect x="95" y="216" width="6" height="30" fill="#ffffff" />
          </g>
        </g>
      </svg>
    </div>
  );
}
