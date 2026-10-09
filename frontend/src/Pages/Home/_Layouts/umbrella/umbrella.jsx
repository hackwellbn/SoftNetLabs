import "./Umbrella.css";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { assets } from "../../../../assets/assets";

const ease = [0.22, 1, 0.36, 1];

const INK = "#241c22";
const SHELL = "#f5f1ee";
const ACCENT = "#f3c6d1";

/* SVG path morphing without a plugin: every vertical is a shape,
   described through radii around the centre. On a phase change the radii are
   blended softly into each other via requestAnimationFrame and drawn as a
   closed Catmull-Rom curve. Plus a slight breathing, so the surface stays
   alive. It runs without a framer loop, so it also plays in the overview
   preview.

   The radii do not come from a list of random values but from an oscillation:
   r = 1 + amp * cos(k * angle). That gives even, round lobes instead of spikes,
   and the number of lobes drops from vertical to vertical until the pure
   circle stands at the end — the umbrella's own verticals resolving into one
   shape.

   Background: a glowing sphere in evening dunes, the perfect shape as the goal
   of the morph. Dark enough for white text, surreal enough for the stage. */
const BG = assets.cloud2;

// Enough points to keep even five lobes smooth.
const N = 24;

function harmonic(k, amp) {
  return Array.from({ length: N }, (_, i) => 1 + amp * Math.cos(k * ((i / N) * Math.PI * 2)));
}

const STEPS = [
  {
    title: "Software Development",
    desc: "Web, mobile, and system-level software built for real-world use.",
    rot: 0,
    radii: harmonic(3, 0.19),
  },
  {
    title: "Intelligent Systems",
    desc: "Data-driven models, automation, and intelligent decision systems.",
    rot: 40,
    radii: harmonic(5, 0.16),
  },
  {
    title: "Digital Platforms & Products",
    desc: "SaaS tools, internal platforms, and scalable digital products.",
    rot: -18,
    radii: harmonic(4, 0.13),
  },
  {
    title: "Creative & Media Technology",
    desc: "Design systems, digital experiences, and creative tech solutions.",
    rot: 55,
    radii: harmonic(2, 0.09),
  },
  {
    title: "Education & Innovation",
    desc: "Training, mentorship, and technology-driven learning initiatives.",
    rot: 80,
    radii: harmonic(0, 0),
  },
];

const SIZE = 440;
const CX = SIZE / 2;
const R = 150;

// A closed, smooth curve through the radius points (Catmull-Rom to bezier).
function pathFrom(radii) {
  const pts = radii.map((r, i) => {
    const a = (i / N) * Math.PI * 2 - Math.PI / 2;
    return [CX + Math.cos(a) * R * r, CX + Math.sin(a) * R * r];
  });
  const p = (i) => pts[(i + N) % N];
  let d = `M ${p(0)[0].toFixed(2)} ${p(0)[1].toFixed(2)}`;
  for (let i = 0; i < N; i++) {
    const p0 = p(i - 1);
    const p1 = p(i);
    const p2 = p(i + 1);
    const p3 = p(i + 2);
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(2)} ${c1[1].toFixed(2)}, ${c2[0].toFixed(2)} ${c2[1].toFixed(2)}, ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
  }
  return `${d} Z`;
}

export function ShapeMorphProcess() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const pathRef = useRef(null);
  const groupRef = useRef(null);
  const currentRef = useRef([...STEPS[0].radii]);
  const rotRef = useRef(0);
  const activeRef = useRef(0);
  activeRef.current = active;

  // Advance automatically; a click on a vertical resets the beat.
  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setActive((i) => (i + 1) % STEPS.length), 3400);
    return () => clearTimeout(t);
  }, [active, reduce]);

  // Morph loop: approach the target radii and rotation exponentially.
  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const target = STEPS[activeRef.current];
      const k = 1 - Math.exp(-dt * 5.5);
      const cur = currentRef.current;
      for (let i = 0; i < N; i++) cur[i] += (target.radii[i] - cur[i]) * k;
      rotRef.current += (target.rot - rotRef.current) * k;
      // light breathing, so the shape also lives between the changes
      const t = now / 1000;
      const breathed = cur.map((r, i) => r + Math.sin(t * 1.4 + i * 0.9) * 0.008);
      pathRef.current?.setAttribute("d", pathFrom(breathed));
      groupRef.current?.setAttribute(
        "transform",
        `rotate(${rotRef.current.toFixed(2)} ${CX} ${CX})`,
      );
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const staticD = pathFrom(STEPS[reduce ? active : 0].radii);

  return (
    <section className="smp">
      {/* Water rings as the stage for the shape; the scrim only over the text side */}
      <img src={BG} alt="" aria-hidden className="smp__bg" />
      <div aria-hidden className="smp__scrim" />
      <div className="smp__grid">
        {/* Text and vertical list */}
        <div>
          <motion.span
            initial={reduce ? undefined : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
            className="smp__eyebrow"
          >
            Capabilities / 05
          </motion.span>
          <motion.h2
            initial={reduce ? undefined : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.06, ease }}
            className="smp__heading"
          >
            The SoftNet
            <br />
            Architectural Umbrella
          </motion.h2>
          <motion.p
            initial={reduce ? undefined : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.1, ease }}
            className="smp__sub"
          >
            A unified spectrum of specialized engineering and design verticals
            operating as a single cohesive unit.
          </motion.p>

          <div className="smp__list">
            {STEPS.map((step, i) => {
              const isActive = active === i;
              return (
                <motion.button
                  key={step.title}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  initial={reduce ? undefined : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.07, ease }}
                  className={`smp__step${isActive ? " is-active" : ""}`}
                >
                  <span className="smp__step-number">0{i + 1}</span>
                  <span className="smp__step-body">
                    <span className="smp__step-title">{step.title}</span>
                    <span className="smp__step-desc">{step.desc}</span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Morphing shape */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease }}
          className="smp__shape-wrap"
        >
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="smp__svg" aria-hidden>
            {/* The circle of the last vertical, finely dashed: the goal stands there
                from the start and the shape grows towards it. It does not rotate along. */}
            <circle
              cx={CX}
              cy={CX}
              r={R}
              fill="none"
              stroke={ACCENT}
              strokeOpacity={0.5}
              strokeWidth={1.5}
              strokeDasharray="2 8"
              strokeLinecap="round"
            />
            <g ref={groupRef}>
              <path ref={pathRef} d={staticD} fill={SHELL} />
            </g>
          </svg>
          {/* Vertical number centred on the shape */}
          <div className="smp__number-wrap">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={active}
                initial={reduce ? undefined : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease }}
                className="smp__number-text"
                style={{ color: INK }}
              >
                0{active + 1}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ShapeMorphProcess;