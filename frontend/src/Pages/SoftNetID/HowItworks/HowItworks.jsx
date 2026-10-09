import { useEffect, useRef, useState } from "react";
import "./SoftNetIDHowItWorks.css";
/* ---------- copy ---------- */
const STEPS = [
  ["sign in once", "Create your SoftNetID and verify it one time. That's the only account you set up."],
  ["pick your services", "Choose the services that matter to you, such as mail, rides, shop and cloud, and connect them to your identity."],
  ["you're in everywhere", "Tap Continue with SoftNetID and you're through. No new password and no filling in the same forms again."],
];

/* ---------- icons ---------- */
const G = {
  mail: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3.5 7l8.5 6.5L20.5 7"/>',
  games: '<path d="M7 8h10a4.5 4.5 0 014.4 5.4l-.6 3A2.8 2.8 0 0115.7 17l-1.3-1.8H9.6L8.3 17a2.8 2.8 0 01-5.1-.6l-.6-3A4.5 4.5 0 017 8z"/><path d="M8.2 10.6v3.2M6.6 12.2h3.2"/><circle cx="15.2" cy="11.2" r=".6"/><circle cx="17.2" cy="13.2" r=".6"/>',
  rides: '<path d="M5 17l1.4-5.2A2 2 0 018.3 10.4h7.4a2 2 0 011.9 1.4L19 17"/><rect x="3.5" y="16.5" width="17" height="3.5" rx="1.2"/><circle cx="7.8" cy="14" r=".8"/><circle cx="16.2" cy="14" r=".8"/>',
  shop: '<path d="M5 8h14l-1 12H6z"/><path d="M9 8a3 3 0 016 0"/>',
  cloud: '<path d="M7 18a4 4 0 010-8 5.5 5.5 0 0110.6 1.2A3.4 3.4 0 0117 18z"/>',
  class: '<path d="M2.5 9L12 4.5 21.5 9 12 13.5z"/><path d="M6.5 11.5V16c0 1.4 2.5 3 5.5 3s5.5-1.6 5.5-3v-4.5"/><path d="M21.5 9v5"/>',
};
const Svc = ({ k, x, y, s = 1.15 }) => (
  <g className="sn-hiw__ic" transform={`translate(${x - 12 * s} ${y - 12 * s}) scale(${s})`} dangerouslySetInnerHTML={{ __html: G[k] }} />
);
const Check = ({ x, y, r = 10, delay = 0 }) => (
  <g className="sn-hiw__pop" style={{ animationDelay: delay + "s" }}>
    <circle cx={x} cy={y} r={r} fill="url(#sn-hiw-grad)" stroke="#f5f1ea" strokeWidth="2" />
    <path d={`M${x - r * 0.45} ${y}l${r * 0.33} ${r * 0.33} ${r * 0.57}-${r * 0.66}`} fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

/* ---------- the three scenes ---------- */
const SERVICES = [
  ["mail", "#ec4be6"], ["games", "#fa4e8a"], ["rides", "#d6bcf9"],
  ["shop", "#fa4e8a"], ["cloud", "#bfc7ff"], ["class", "#ec4be6"],
];

function SceneOne() {
  return (
    <g>
      <circle className="sn-hiw__o" cx="240" cy="104" r="40" />
      <circle className="sn-hiw__o" cx="240" cy="94" r="11" />
      <path className="sn-hiw__o" d="M218 128c0-14 10-21 22-21s22 7 22 21" />
      <Check x={274} y={136} r={14} delay={2.1} />
      {[0, 1].map((i) => (
        <g key={i}>
          <rect className="sn-hiw__o" x="120" y={176 + i * 46} width="240" height="34" rx="10" />
          <rect className="sn-hiw__type" x="132" y={188 + i * 46} width={i ? 120 : 160} height="10" rx="5" fill={i ? "#ec4be6" : "#fa4e8a"} style={{ animationDelay: 0.3 + i * 0.7 + "s" }} />
        </g>
      ))}
      <g className="sn-hiw__press" style={{ animationDelay: "1.7s" }}>
        <rect x="120" y="278" width="240" height="42" rx="10" fill="#462fd6" />
        <text x="240" y="304" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff" fontFamily="Outfit,Arial,sans-serif">create softnetid</text>
      </g>
    </g>
  );
}

function SceneTwo() {
  return (
    <g>
      {SERVICES.map(([k, col], i) => {
        const x = 150 + (i % 3) * 90, y = 130 + Math.floor(i / 3) * 110;
        return (
          <g key={k}>
            <circle className="sn-hiw__o" cx={x} cy={y} r="32" />
            <circle className="sn-hiw__lit" cx={x} cy={y} r="31.4" fill={col} style={{ animationDelay: 0.3 + i * 0.35 + "s" }} />
            <circle className="sn-hiw__o" cx={x} cy={y} r="32" />
            <Svc k={k} x={x} y={y} />
            <Check x={x + 24} y={y - 24} delay={0.5 + i * 0.35} />
            <text x={x} y={y + 56} textAnchor="middle" fontSize="12.5" fontWeight="700" fontFamily="Outfit,Arial,sans-serif">{k}</text>
          </g>
        );
      })}
    </g>
  );
}

function SceneThree() {
  return (
    <g>
      <g className="sn-hiw__press">
        <rect x="100" y="76" width="280" height="54" rx="27" fill="url(#sn-hiw-grad)" />
        <text x="240" y="109" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff" fontFamily="Outfit,Arial,sans-serif">continue with softnetid</text>
      </g>
      <path className="sn-hiw__o sn-hiw__in" style={{ animationDelay: "1s" }} d="M240 130V196" />
      <path className="sn-hiw__o sn-hiw__in" style={{ animationDelay: "1s" }} d="M120 196H360" />
      {SERVICES.slice(0, 4).map(([k, col], i) => {
        const x = 120 + i * 80;
        return (
          <g key={k}>
            <path className="sn-hiw__o sn-hiw__in" style={{ animationDelay: "1s" }} d={`M${x} 196V208`} />
            <g className="sn-hiw__in" style={{ animationDelay: 1.15 + i * 0.2 + "s" }}>
              <circle cx={x} cy="240" r="30" fill={col} stroke="#000" strokeWidth="1.3" />
              <Svc k={k} x={x} y={240} />
            </g>
            <Check x={x + 22} y={218} delay={1.5 + i * 0.2} />
          </g>
        );
      })}
      <g className="sn-hiw__pop" style={{ animationDelay: "2.4s" }}>
        <rect className="sn-hiw__o" x="170" y="296" width="140" height="36" rx="18" fill="#f5f1ea" />
        <text x="240" y="320" textAnchor="middle" fontSize="14" fontWeight="700" fontFamily="Outfit,Arial,sans-serif">you're in ✓</text>
      </g>
    </g>
  );
}
const SCENES = [SceneOne, SceneTwo, SceneThree];

/* ---------- component ---------- */
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));

export default function HowItWorks({ id = "how" }) {
  const [step, setStep] = useState(0);
  const [seen, setSeen] = useState(false);
  const [ready, setReady] = useState(false); // content is only hidden for the reveal once JS is running
  const root = useRef(null);
  const pin = useRef(null);
  const tabs = useRef([]);
  const Scene = SCENES[step];

  /* scroll drives the steps: the section is pinned while you scroll through it */
  useEffect(() => {
    const el = root.current;
    let cur = -1;
    let tick = false;
    setReady(true);
    const pinned = () => getComputedStyle(pin.current).position === "sticky";

    const update = () => {
      tick = false;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.5) setSeen(true);
      if (!pinned()) {
        el.style.setProperty("--hiw-f", 0);
        return;
      }
      const total = r.height - window.innerHeight;
      const p = total > 0 ? clamp(-r.top / total, 0, 1) : 0;
      const t = p * STEPS.length;
      const i = Math.min(STEPS.length - 1, Math.floor(t));
      el.style.setProperty("--hiw-f", (p >= 1 ? 1 : t - i).toFixed(3));
      /* the ball rolls down the line: it reaches step 1 at the start, step 2 a third of the way, step 3 two thirds */
      const ys = tabs.current.map((b) => b.offsetTop + b.offsetHeight / 2);
      const u = clamp(t, 0, STEPS.length - 1);
      const k = Math.min(STEPS.length - 2, Math.floor(u));
      const y = ys[k] + (ys[k + 1] - ys[k]) * (u - k);
      el.style.setProperty("--hiw-by", y.toFixed(1) + "px");
      if (i !== cur) {
        cur = i;
        setStep(i);
      }
    };
    const req = () => {
      if (!tick) {
        tick = true;
        requestAnimationFrame(update);
      }
    };
    if (document.fonts?.ready) document.fonts.ready.then(req);
    // reveal works inside any scroll container, and never leaves the section hidden
    let io;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.05 });
      io.observe(el);
    } else setSeen(true);
    window.addEventListener("scroll", req, { passive: true });
    document.addEventListener("scroll", req, { passive: true, capture: true }); // scrolling inside a wrapper element
    window.addEventListener("resize", req);
    update();
    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", req);
      document.removeEventListener("scroll", req, { capture: true });
      window.removeEventListener("resize", req);
    };
  }, []);

  /* clicking a step scrolls to its place (or just selects it when not pinned) */
  const go = (i, focus) => {
    const el = root.current;
    if (getComputedStyle(pin.current).position === "sticky") {
      const total = el.offsetHeight - window.innerHeight;
      const top = window.scrollY + el.getBoundingClientRect().top + ((i + 0.05) / STEPS.length) * total;
      const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    } else {
      setStep(i);
    }
    if (focus) tabs.current[i]?.focus({ preventScroll: true });
  };
  const onKey = (e) => {
    const k = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!k) return;
    e.preventDefault();
    go((step + k + STEPS.length) % STEPS.length, true);
  };

  return (
    <div role="region" ref={root} className={"sn-hiw" + (ready ? " sn-hiw--ready" : "") + (seen ? " sn-hiw--seen" : "")} id={id} aria-label="How SoftNetID works">
      <div className="sn-hiw__pin" ref={pin}>
        <div className="sn-hiw__wrap">
          <div className="sn-hiw__head sn-hiw__rv">
            <h2>how it works</h2>
            <p>Three steps, then it just works.</p>
          </div>

          <div className="sn-hiw__body sn-hiw__rv">
            <div className="sn-hiw__steps" role="tablist" aria-label="Steps" onKeyDown={onKey}>
              <div className="sn-hiw__track" aria-hidden="true">
                <i className="sn-hiw__fill" />
                <b className="sn-hiw__ball" />
              </div>
              {STEPS.map((s, i) => (
                <button
                  key={s[0]}
                  ref={(el) => (tabs.current[i] = el)}
                  className={"sn-hiw__step" + (i === step ? " sn-hiw__step--on" : "") + (i < step ? " sn-hiw__step--done" : "")}
                  role="tab"
                  id={`sn-hiw-tab-${i}`}
                  aria-selected={i === step}
                  aria-controls="sn-hiw-panel"
                  tabIndex={i === step ? 0 : -1}
                  onClick={() => go(i)}
                >
                  <span className="sn-hiw__node" aria-hidden="true" />
                  <span className="sn-hiw__num" aria-hidden="true">0{i + 1}</span>
                  <span className="sn-hiw__title">{s[0]}</span>
                  <span className="sn-hiw__desc">{s[1]}</span>
                  <span className="sn-hiw__bar" aria-hidden="true"><i /></span>
                </button>
              ))}
            </div>

            <div className="sn-hiw__stage" id="sn-hiw-panel" role="tabpanel" aria-labelledby={`sn-hiw-tab-${step}`}>
              <svg viewBox="0 0 480 360" role="img" aria-label={`Step ${step + 1}: ${STEPS[step][0]}`}>
                <defs>
                  <linearGradient id="sn-hiw-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#ec4be6" />
                    <stop offset=".55" stopColor="#a846ea" />
                    <stop offset="1" stopColor="#462fd6" />
                  </linearGradient>
                </defs>
                <rect className="sn-hiw__o" x="2" y="2" width="476" height="356" rx="30" />
                <rect className="sn-hiw__o" x="24" y="18" width="72" height="9" rx="4.5" />
                <rect className="sn-hiw__o" x="104" y="18" width="46" height="9" rx="4.5" />
                <rect className="sn-hiw__o" x="436" y="18" width="20" height="9" rx="4.5" />
                {seen && <Scene key={step} />}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}