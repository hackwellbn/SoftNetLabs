// Hero-prod.jsx
// RingsProfileHero, converted to plain CSS (no Tailwind).
// Pair with Hero-prod.css. Still uses React, framer-motion and lucide-react.
//
// npm install framer-motion lucide-react

import { useEffect, useId, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import "./Hero-prod.css";
import { assets } from "../../../../assets/assets";

/* A hero for a hearing aid, built around one wide photograph.

   A lone figure standing in a field of blossom under an open sky. Around them
   the rings: four hairlines spreading outward from where the person stands,
   which is what a hearing aid does before anything else.

   The rings are never a full circle. Each one is stroked with a gradient that
   runs from nothing to white, so only the side facing the pointer is really
   there and the far side fades out into the picture. A closed hairline circle
   over a photograph reads as a diagram laid on top of it; an arc that fades
   reads as something happening in the scene.

   The fade turns with the pointer. It is the one thing in the section that
   answers the mouse, and it answers slowly: the direction is sprung and
   heavily damped, so the light travels round the rings a moment after the
   hand has moved rather than sticking to it.

   The picture is darkened, but barely, and unevenly: almost nothing at the
   sky, a little more along the bottom where the type stands. A flat scrim
   over the whole frame would take the colour out of the blossom, which is the
   one thing worth looking at.

   Everything laid over the picture is white. On a photograph with a bright
   sky and dark ground there is no single ink value that works in both halves,
   and white plus a gentle gradient does.

   The rings are real geometry, not a scaled picture. The SVG takes its
   viewBox from the measured section, so one user unit is one pixel: a
   hairline stays exactly one pixel wide and the centre can be placed in
   percent of the section without any aspect ratio arithmetic. Breathing runs
   on the radius instead of a transform. The ring grows, the line does not
   thicken, and no transform origin has to be measured.

   The photo itself never moves. Rings that lean a little toward the pointer
   are enough life for a section whose subject is quiet.

   The brand, the figures and the copy are invented. */

const ease = [0.22, 1, 0.36, 1];

const IMAGE = assets.cloud;

/* Rotating headline/paragraph pairs, carried over from the old hero. Swap
   these back out for hearing-aid copy whenever you're ready — the rotation
   logic below doesn't care what's in the array. */
const CONTENT = [
  {
    heading: "Where Faith Powers Innovation",
    paragraph: "We build world-class digital solutions rooted in purpose, excellence, and belief.",
  },
  {
    heading: "Technology That Serves Humanity",
    paragraph: "We harness technology to empower individuals, communities, and organizations.",
  },
  {
    heading: "Empowering Future Innovators",
    paragraph: "We equip young minds with modern skills to lead the digital revolution with integrity.",
  },
  {
    heading: "Purpose-Driven Digital Impact",
    paragraph: "Faith and technology meet to shape a more connected, compassionate future.",
  },
  {
    heading: "Global Network. Eternal Vision.",
    paragraph: "Join a visionary community blending technology and timeless values.",
  },
];
// How long each headline/paragraph pair stays up before crossfading to the next.
const CONTENT_INTERVAL = 5000;

/* Radii as a share of the shorter side. On a desktop screen that is the
   height, on a phone the width, which is what shrinks the rings there
   without a second set of numbers. Opacity falls off outward, the way sound
   does; the gradient below takes each ring further down from there. */
const RINGS = [
  { radius: 0.08, opacity: 0.95 },
  { radius: 0.15, opacity: 0.75 },
  { radius: 0.225, opacity: 0.55 },
  { radius: 0.3, opacity: 0.38 },
];

/* Where the rings sit, as a share of width and height. On the figure, which
   stands right of centre: the rings belong to the person, not to a free
   corner of the frame, and a set of circles parked in the empty half would be
   decoration standing next to the subject instead of coming from it. On a
   phone the frame becomes a tall strip and the figure moves with it. */
const CENTRE = {
  desktop: { x: 0.68, y: 0.42, scale: 1 },
  phone: { x: 0.6, y: 0.36, scale: 0.9 },
};

/* How far the rings lean toward the pointer, in pixels, at the edge of the
   section. Small on purpose: it should feel like attention, not a cursor
   follower. */
const DRIFT_MAX = 14;
// Slow and heavily damped, so the rings arrive late and never overshoot.
const DRIFT_SPRING = { stiffness: 46, damping: 18, mass: 1.1 };
/* The turning fade is slower still. It is light moving round a circle, and
   light that keeps up with a mouse looks like a highlight stuck to the
   cursor. */
const FADE_SPRING = { stiffness: 26, damping: 22, mass: 1.4 };

/* Placeholder figures for a tech company — swap for your real numbers
   whenever you have them. Kept to three so the phone layout (all three
   share one line) still works without any layout changes. "short" is the
   one-word phone version; "label" is the full desktop version. */
const STATS = [
  { value: 6, label: "Products built under one roof", short: "products" },
  { value: 12, unit: "+", label: "Markets our platforms reach", short: "markets" },
  { value: 50000, label: "People using a Softnet product", short: "users" },
];

// Measures the section so the SVG can use pixel coordinates.
function useSize(ref) {
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: Math.round(width), h: Math.round(height) });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return size;
}

/* Counts from 0 to `to` once `run` is true, fast at first and settling at the
   end, so the last digit locks in instead of jumping. With reduced motion
   the value simply stands. */
function useCountUp(to, run, duration = 1200) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!run || reduce) return;
    let raf = 0;
    let start = 0;
    const step = (now) => {
      if (!start) start = now;
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, run, duration, reduce]);

  return reduce ? to : n;
}

/* The rings move through four states. "waiting" is before the section has
   been seen: invisible. "drawing" is the entrance, "idle" the breathing
   afterwards. "still" is reduced motion: fully drawn, nothing moves. */

function Ring({ cx, cy, r, opacity, index, phase, last, fade, onDrawn }) {
  let animate;
  let transition;

  if (phase === "still") {
    animate = { pathLength: 1 };
  } else if (phase === "drawing") {
    // Inner ring first, each further ring a little later: the sound spreads
    // outward.
    animate = { pathLength: 1 };
    transition = { pathLength: { duration: 1.4, delay: 0.3 + index * 0.18, ease } };
  } else if (phase === "idle") {
    animate = { pathLength: 1, r: [r, r * 1.035] };
    transition = {
      /* Every ring breathes at its own pace and starts a little apart from
         the others, so they never pulse in step like a loading indicator. */
      r: {
        duration: 6 + index,
        delay: index * 0.45,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    };
  }

  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill="none"
      /* The gradient does the fading, the ring's own opacity does the falling
         off outward. Two separate jobs on two separate properties: changing
         the gradient would change every ring at once, and changing the stroke
         opacity would move the whole ring rather than one side of it. */
      stroke={`url(#${fade})`}
      strokeOpacity={opacity}
      strokeWidth={1}
      initial={phase === "still" ? false : { pathLength: 0 }}
      animate={animate}
      transition={transition}
      // The outer ring is the last to finish, so it ends the entrance.
      onAnimationComplete={phase === "drawing" && last ? onDrawn : undefined}
    />
  );
}

function StatBlock({ stat, index, run }) {
  const reduce = useReducedMotion();
  const n = useCountUp(stat.value, run);
  return (
    <motion.div
      className="hero-stat"
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={run ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay: index * 0.1, ease }}
    >
      <span className="hero-stat-value">
        {n.toLocaleString("en-US")}
        {stat.unit ? <span className="hero-stat-unit">{stat.unit}</span> : null}
      </span>
      {/* The meter: a hairline that fills from the left on hover. It is the
          only thing that moves on a figure, and it grows rather than the
          number, so the row keeps its rhythm. It is a desktop thing; in the
          phone line there is nothing to point at. */}
      <span aria-hidden className="hero-stat-meter" />
      <span className="hero-stat-label">
        <span className="hero-stat-label-short">{stat.short}</span>
        <span className="hero-stat-label-long">{stat.label}</span>
      </span>
    </motion.div>
  );
}

export function RingsProfileHero() {
  const reduce = useReducedMotion();
  const reduced = !!reduce;

  const ref = useRef(null);
  const statsRef = useRef(null);
  /* The gradient needs an id, and the section can stand twice on one page.
     A fixed string would mean the second copy paints with the first one's
     gradient, which then follows the wrong pointer. */
  const fadeId = `ringfade-${useId().replace(/:/g, "")}`;
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.4 });

  const { w, h } = useSize(ref);
  const measured = w > 0 && h > 0;
  const [drawn, setDrawn] = useState(false);

  // Cycles the headline/paragraph pair every CONTENT_INTERVAL ms. Paused
  // entirely under reduced motion, so the copy just sits on the first pair.
  const [contentIndex, setContentIndex] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setContentIndex((prev) => (prev + 1) % CONTENT.length);
    }, CONTENT_INTERVAL);
    return () => clearInterval(id);
  }, [reduced]);

  const phase = reduced
    ? "still"
    : !inView || !measured
      ? "waiting"
      : drawn
        ? "idle"
        : "drawing";

  // Ring geometry in pixels, from the measured section.
  const centre = w < 768 ? CENTRE.phone : CENTRE.desktop;
  const cx = w * centre.x;
  const cy = h * centre.y;
  const base = Math.min(w, h) * centre.scale;

  /* The drift toward the pointer. Motion values, not state, so a moving mouse
     never re-renders the section. */
  const driftX = useMotionValue(0);
  const driftY = useMotionValue(0);
  const springX = useSpring(driftX, DRIFT_SPRING);
  const springY = useSpring(driftY, DRIFT_SPRING);

  /* The direction of the fade. At rest it points up, so the rings are bright
     along their top edge before anybody has moved a mouse.

     The gradient is set in objectBoundingBox units, which means the four
     coordinates run from zero to one inside each ring's own box and no ring
     radius appears in the arithmetic: one gradient serves all four, and it
     keeps working while they breathe. */
  const richtungX = useMotionValue(0);
  const richtungY = useMotionValue(-1);
  const fx = useSpring(richtungX, FADE_SPRING);
  const fy = useSpring(richtungY, FADE_SPRING);
  const x1 = useTransform(fx, (v) => 0.5 - v * 0.5);
  const y1 = useTransform(fy, (v) => 0.5 - v * 0.5);
  const x2 = useTransform(fx, (v) => 0.5 + v * 0.5);
  const y2 = useTransform(fy, (v) => 0.5 + v * 0.5);

  const onPointerMove = (e) => {
    /* Only a mouse leans the rings. A finger would drag them somewhere and
       leave them there, and under reduced motion nothing follows anything. */
    if (reduced || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const nx = Math.max(-1, Math.min(1, (px - cx) / (rect.width / 2)));
    const ny = Math.max(-1, Math.min(1, (py - cy) / (rect.height / 2)));
    driftX.set(nx * DRIFT_MAX);
    driftY.set(ny * DRIFT_MAX);

    /* And the direction of the fade, as a unit vector from the centre toward
       the pointer. Normalised, not the raw offset: the bright side of the
       rings should depend on where the pointer is, never on how far away it
       is, or the rings would go out as the mouse leaves the middle. */
    const len = Math.hypot(nx, ny) || 1;
    richtungX.set(nx / len);
    richtungY.set(ny / len);
  };
  const onPointerLeave = () => {
    driftX.set(0);
    driftY.set(0);
    // Back to the resting direction: bright at the top.
    richtungX.set(0);
    richtungY.set(-1);
  };

  return (
    <section
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="hero-section"
    >
      {/* The photo only fades in. No zoom, no parallax: the subject is
          stillness, and the image is sharpest when nothing resamples it. */}
      <motion.div
        className="hero-photo-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease }}
      >
        <img
          src={IMAGE}
          alt="A lone figure standing in a wide field of blossom under an open sky"
          /* Anchored right of centre, so the figure and the rings around it
             stay in frame whatever the window does to the crop. On a phone the
             frame becomes a tall strip and the same anchor keeps the person
             out of the corner. */
          className="hero-photo"
          draggable={false}
        />
      </motion.div>

      {/* Darkened, but barely, and unevenly: almost nothing at the sky, a
          little more along the bottom where the type stands. A flat scrim over
          the whole frame would take the colour out of the blossom, which is
          the one thing worth looking at. */}
      <span aria-hidden className="hero-scrim" />

      {/* The rings. The viewBox is the section in pixels, so cx, cy and r are
          plain pixel values and a strokeWidth of 1 is one device hairline. The
          layer waits for the first measurement rather than guessing a size
          and correcting it a frame later. */}
      {measured && (
        <svg
          aria-hidden
          className="hero-rings-svg"
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* From nothing to white along the pointer direction. The far side
                of every ring is genuinely absent, not faint: a hairline at ten
                percent over a photograph is still a closed circle, and a
                closed circle over a picture reads as a diagram laid on it. */}
            <motion.linearGradient
              id={fadeId}
              gradientUnits="objectBoundingBox"
              {...{ x1, y1, x2, y2 }}
            >
              <stop offset="0%" stopColor="#ffffff" stopOpacity={0} />
              <stop offset="38%" stopColor="#ffffff" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#ffffff" stopOpacity={1} />
            </motion.linearGradient>
          </defs>
          <motion.g style={{ x: springX, y: springY }}>
            {RINGS.map((ring, i) => (
              <Ring
                key={ring.radius}
                cx={cx}
                cy={cy}
                r={base * ring.radius}
                opacity={ring.opacity}
                index={i}
                phase={phase}
                last={i === RINGS.length - 1}
                fade={fadeId}
                onDrawn={() => setDrawn(true)}
              />
            ))}
          </motion.g>
        </svg>
      )}

      {/* Full width, not a centred column. A column centred at 1280 would put
          its left edge at a quarter of a wide screen, and the face starts at a
          third: the headline would run into the picture on exactly the screens
          that have the most room. Held to the edge it never does. */}
      <div className="hero-content">
        {/* The logo/nav row used to live here; it's now the standalone
            Navbar component, mounted once above every page (including this
            hero) rather than duplicated inside the section. */}

        {/* Everything sits along the bottom, and the middle stays empty. The
            picture is light there and dark across the hair; ink in the middle
            would be ink on hair on half the screens. Along the bottom the
            gradient is warm and even all the way across, so the type can use
            the full width and the face is not covered by anything. */}
        <div className="hero-bottom">
          <div className="hero-copy">
            {/* Crossfades to the next heading/paragraph pair on its own timer;
                AnimatePresence handles the outgoing pair's exit. */}
            <AnimatePresence mode="wait">
              <motion.div
                key={contentIndex}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                exit={reduced ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.8, ease }}
              >
                <h1 className="hero-title">{CONTENT[contentIndex].heading}</h1>
                <p className="hero-subtitle">{CONTENT[contentIndex].paragraph}</p>
              </motion.div>
            </AnimatePresence>
            <motion.div
              className="hero-cta-wrap hero-cta-group"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.9, delay: 0.34, ease }}
            >
              <Link to="/register" className="hero-cta hero-cta-primary">
                Join Us
              </Link>
              <Link
                to="https://about.softnetkenya.com"
                className="hero-cta hero-cta-secondary"
              >
                Learn More
              </Link>
            </motion.div>
          </div>

          {/* Three figures. On a phone they share one line, because the light
              part of the picture down there is a third of the screen and a
              three column block of labels would push the headline up into the
              hair. On desktop they stand at the right hand end of the same
              baseline as the button. */}
          <div ref={statsRef} className="hero-stats">
            {STATS.map((stat, i) => (
              <StatBlock key={stat.label} stat={stat} index={i} run={statsInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RingsProfileHero;