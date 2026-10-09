/** Five invented SoftNet-style UI compositions — one unique visual per product. */

function CloudDeployArt() {
  return (
    <svg className="sn-art" viewBox="0 0 360 420" role="img" aria-label="NetoraCloud deploy console">
      <defs>
        <linearGradient id="cloud-ribbon" x1="0" x2="1">
          <stop offset="0" stopColor="#ec4be6" />
          <stop offset="1" stopColor="#462fd6" />
        </linearGradient>
        <filter id="cloud-soft">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>
      <rect className="o" x="18" y="28" width="324" height="364" rx="28" fill="#f5f1ea" />
      <rect className="o" x="38" y="48" width="72" height="10" rx="5" />
      <rect className="o" x="120" y="48" width="46" height="10" rx="5" />
      <rect className="o" x="302" y="48" width="20" height="10" rx="5" />

      <rect x="38" y="86" width="150" height="42" rx="12" fill="#fa4e8a" stroke="#000" strokeWidth="1.3" />
      <text x="56" y="112" fontSize="14" fontWeight="700" fontFamily="Outfit,Arial,sans-serif">
        deploy now
      </text>

      <rect className="o" x="204" y="86" width="118" height="42" rx="12" />
      <text x="224" y="112" fontSize="13" fontWeight="700" fontFamily="Outfit,Arial,sans-serif">
        scale auto
      </text>

      <g>
        <rect className="o" x="38" y="154" width="284" height="168" rx="18" />
        <circle cx="78" cy="198" r="22" fill="#ec4be6" stroke="#000" strokeWidth="1.3" />
        <circle cx="148" cy="198" r="22" fill="#a846ea" stroke="#000" strokeWidth="1.3" />
        <circle cx="218" cy="198" r="22" fill="#462fd6" stroke="#000" strokeWidth="1.3" />
        <circle className="o" cx="288" cy="198" r="22" fill="#f5f1ea" />
        <path className="o" d="M100 198h26M170 198h26M240 198h26" />
        <rect className="o" x="58" y="246" width="110" height="12" rx="6" />
        <rect className="o" x="58" y="270" width="78" height="12" rx="6" />
        <rect x="200" y="246" width="96" height="44" rx="14" fill="#462fd6" />
        <text x="218" y="273" fill="#fff" fontSize="13" fontWeight="700" fontFamily="Outfit,Arial,sans-serif">
          live · 99.9%
        </text>
      </g>

      <path
        d="M40 360C90 300 140 380 200 330S280 280 330 320"
        fill="none"
        stroke="url(#cloud-ribbon)"
        strokeWidth="22"
        strokeLinecap="round"
        filter="url(#cloud-soft)"
      />
    </svg>
  );
}

function WispNetworkArt() {
  return (
    <svg className="sn-art" viewBox="0 0 360 420" role="img" aria-label="Netora WISP network map">
      <defs>
        <linearGradient id="wisp-beam" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fa4e8a" />
          <stop offset="0.5" stopColor="#ec4be6" />
          <stop offset="1" stopColor="#462fd6" />
        </linearGradient>
      </defs>
      <rect className="o" x="20" y="30" width="320" height="360" rx="36" fill="#fffdf9" />

      {/* tower */}
      <rect className="o" x="164" y="70" width="32" height="210" rx="10" />
      <path className="o" d="M148 90h64M140 130h80M148 170h64" />
      <circle cx="180" cy="68" r="18" fill="#ec4be6" stroke="#000" strokeWidth="1.3" />

      {/* coverage rings */}
      <circle className="o" cx="180" cy="200" r="78" strokeDasharray="6 8" />
      <circle className="o" cx="180" cy="200" r="118" strokeDasharray="4 10" opacity="0.7" />

      {/* subscriber nodes */}
      <circle cx="72" cy="160" r="16" fill="#fa4e8a" stroke="#000" strokeWidth="1.3" />
      <circle cx="288" cy="150" r="16" fill="#462fd6" stroke="#000" strokeWidth="1.3" />
      <circle cx="90" cy="280" r="16" fill="#a846ea" stroke="#000" strokeWidth="1.3" />
      <circle cx="270" cy="290" r="16" fill="#ec4be6" stroke="#000" strokeWidth="1.3" />
      <path
        d="M88 168C120 190 140 190 164 190M264 158C230 180 210 190 196 190M104 272C130 250 145 230 164 250M254 282C230 260 210 250 196 250"
        fill="none"
        stroke="url(#wisp-beam)"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <rect x="48" y="336" width="264" height="36" rx="18" fill="#000" />
      <text x="78" y="359" fill="#fff" fontSize="13" fontWeight="700" fontFamily="Outfit,Arial,sans-serif">
        128 online · bill &amp; provision
      </text>
    </svg>
  );
}

function PatafastFeedArt() {
  return (
    <svg className="sn-art" viewBox="0 0 360 420" role="img" aria-label="PataFast social shop feed">
      <rect className="o" x="78" y="18" width="204" height="384" rx="36" fill="#f5f1ea" />
      <rect className="o" x="150" y="34" width="60" height="8" rx="4" />

      {/* stories */}
      <circle cx="118" cy="78" r="18" fill="#fa4e8a" stroke="#000" strokeWidth="1.3" />
      <circle cx="160" cy="78" r="18" fill="#ec4be6" stroke="#000" strokeWidth="1.3" />
      <circle cx="202" cy="78" r="18" fill="#a846ea" stroke="#000" strokeWidth="1.3" />
      <circle cx="244" cy="78" r="18" fill="#462fd6" stroke="#000" strokeWidth="1.3" />

      {/* post */}
      <rect className="o" x="100" y="118" width="160" height="150" rx="18" />
      <rect x="112" y="132" width="70" height="70" rx="12" fill="#fa4e8a" />
      <rect x="190" y="132" width="56" height="70" rx="12" fill="#462fd6" />
      <rect className="o" x="112" y="216" width="88" height="10" rx="5" />
      <rect className="o" x="112" y="236" width="56" height="10" rx="5" />

      {/* buy pill */}
      <rect x="108" y="284" width="144" height="34" rx="17" fill="#fff" stroke="#000" strokeWidth="1.3" />
      <text x="124" y="306" fontSize="12" fontWeight="700" fontFamily="Outfit,Arial,sans-serif">
        Dress
      </text>
      <rect x="198" y="290" width="44" height="22" rx="11" fill="#000" />
      <text x="208" y="305" fill="#fff" fontSize="11" fontWeight="700" fontFamily="Outfit,Arial,sans-serif">
        Buy
      </text>

      <rect className="o" x="118" y="340" width="48" height="10" rx="5" />
      <rect className="o" x="178" y="340" width="48" height="10" rx="5" />
      <rect className="o" x="238" y="340" width="24" height="10" rx="5" />
    </svg>
  );
}

function StudiosMixerArt() {
  return (
    <svg className="sn-art" viewBox="0 0 360 420" role="img" aria-label="SoftNet Studios live mixer">
      <defs>
        <linearGradient id="studio-glow" x1="0" x2="1">
          <stop offset="0" stopColor="#fa4e8a" />
          <stop offset="1" stopColor="#462fd6" />
        </linearGradient>
      </defs>
      <rect className="o" x="16" y="36" width="328" height="348" rx="24" fill="#111" />
      <rect className="o" x="34" y="54" width="200" height="128" rx="14" fill="#1c1c1c" />
      <circle cx="64" cy="78" r="8" fill="#fa4e8a" />
      <text x="82" y="83" fill="#fff" fontSize="12" fontWeight="700" fontFamily="Outfit,Arial,sans-serif">
        ON AIR
      </text>
      <rect x="48" y="100" width="170" height="58" rx="10" fill="url(#studio-glow)" opacity="0.85" />

      {/* faders */}
      {[0, 1, 2, 3, 4].map((i) => {
        const x = 46 + i * 56;
        const h = [88, 120, 64, 104, 76][i];
        return (
          <g key={i}>
            <rect className="o" x={x} y="210" width="28" height="140" rx="8" fill="#1a1a1a" />
            <rect x={x + 6} y={340 - h} width="16" height={h} rx="6" fill={i === 2 ? "#ec4be6" : "#462fd6"} />
            <rect x={x + 2} y={332 - h} width="24" height="14" rx="4" fill="#f5f1ea" stroke="#000" strokeWidth="1.3" />
          </g>
        );
      })}
    </svg>
  );
}

function AgenticaOrbitArt() {
  return (
    <svg className="sn-art" viewBox="0 0 360 420" role="img" aria-label="Agentica autopilot orbit">
      <defs>
        <linearGradient id="agent-arc" x1="0" x2="1">
          <stop offset="0" stopColor="#ec4be6" />
          <stop offset="1" stopColor="#462fd6" />
        </linearGradient>
      </defs>
      <rect className="o" x="24" y="40" width="312" height="340" rx="40" fill="#f5f1ea" />

      <circle className="o" cx="180" cy="200" r="108" strokeDasharray="10 12" />
      <circle className="o" cx="180" cy="200" r="72" />
      <circle cx="180" cy="200" r="36" fill="#462fd6" stroke="#000" strokeWidth="1.3" />
      <text x="156" y="206" fill="#fff" fontSize="13" fontWeight="800" fontFamily="Outfit,Arial,sans-serif">
        auto
      </text>

      {/* orbiting task chips */}
      <rect x="56" y="96" width="92" height="34" rx="17" fill="#fa4e8a" stroke="#000" strokeWidth="1.3" />
      <text x="72" y="118" fontSize="12" fontWeight="700" fontFamily="Outfit,Arial,sans-serif">
        draft reply
      </text>

      <rect x="220" y="118" width="84" height="34" rx="17" fill="#ec4be6" stroke="#000" strokeWidth="1.3" />
      <text x="236" y="140" fontSize="12" fontWeight="700" fontFamily="Outfit,Arial,sans-serif">
        summarize
      </text>

      <rect x="48" y="268" width="100" height="34" rx="17" fill="#a846ea" stroke="#000" strokeWidth="1.3" />
      <text x="64" y="290" fontSize="12" fontWeight="700" fontFamily="Outfit,Arial,sans-serif">
        follow up
      </text>

      <rect x="214" y="278" width="96" height="34" rx="17" fill="#fff" stroke="#000" strokeWidth="1.3" />
      <text x="230" y="300" fontSize="12" fontWeight="700" fontFamily="Outfit,Arial,sans-serif">
        you decide
      </text>

      <path
        d="M70 340C120 310 180 360 240 320S310 290 330 310"
        fill="none"
        stroke="url(#agent-arc)"
        strokeWidth="16"
        strokeLinecap="round"
      />
    </svg>
  );
}

const ART = {
  netoracloud: CloudDeployArt,
  netorawisp: WispNetworkArt,
  patafast: PatafastFeedArt,
  studios: StudiosMixerArt,
  agentica: AgenticaOrbitArt,
};

export default function ProductBenefitArt({ id }) {
  const Comp = ART[id];
  if (!Comp) return null;
  return (
    <div className={`sn-benefit-art sn-benefit-art-${id}`}>
      <Comp />
    </div>
  );
}
