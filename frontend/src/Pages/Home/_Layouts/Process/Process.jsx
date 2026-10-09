// FinishTriptych · Built with Systra Tools — https://systra.tools
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import "./Process.css";

/* Three tall cards, one layout, one text, three finishes: chalk white, ink
   black, cobalt blue. Each card is a narrow portrait, close to three by five,
   because the whole idea needs vertical room: type in the upper third, and
   below it a halftone figure large enough to run off the card edges the way a
   printed plate bleeds off the page. A wide card turns that figure into a
   decoration in a corner.

   The dots are drawn, not loaded. Every card holds a grid of 1015 circles and a
   field function that says, for any point, how much ink belongs there. Radius
   is that value scaled into a small range, with smoothstep at the edges so the
   shape fades out in dot size instead of stopping at a line. Because the
   smallest radius is not zero, the whole lower half keeps a fine ground
   texture, and the figure sits in it rather than on it. A little deterministic
   jitter takes the machine feel out of the grid without turning it into noise.

   Each card carries a different motif at a different corner: a long arc on the
   white card, an arch standing on the lower edge of the black one, a pair of
   merged lobes on the blue one. All three are cut by the card edges, so the
   eye reads a detail of something larger.

   The shape follows the pointer. Its centre is a pair of spring motion values
   that glide towards the pointer, held within a short leash of home, and the
   radii are recomputed from the live centre. Those writes go straight to the
   circle attributes, one pass per frame per card. Re-rendering a thousand nodes
   through React for a change to one attribute each would spend the frame on
   bookkeeping; setting `r` directly spends it on the dots.

   Clicking a card picks its finish. The chip inverts, the caption below reads
   the choice back. Nothing else moves: the choice should feel like putting a
   sample on the table, not like opening a menu.

   The brand, the panels and the lead time are invented. */

const ease = [0.22, 1, 0.36, 1];

const PAGE = "#f4f5f3";
const TEXT = "#0f1f14";

/* The dot grid. Ten units between centres gives 35 columns and 29 rows in a
   350 by 290 view box, which is the exact aspect of the lower half of a desktop
   card, so the grid meets the card edges without being cropped. The largest dot
   has a radius of 4.1, so neighbours at full size still keep a hair of ground
   between them and the field reads as tone, not as a solid. */
const STEP = 10;
const COLS = 35;
const ROWS = 29;
const VIEW_W = 350;
const VIEW_H = 290;
const R_MIN = 0.5;
const R_SPAN = 3.6;
/* How far the shape centre may leave home when the pointer pulls at it. Seventy
   units is a fifth of the card width: clearly a response, never a chase. */
const REACH = 70;
/* The reveal: every dot waits in proportion to its distance from the shape
   centre, then grows over 450 ms. The farthest dot starts 0.9 s after the
   nearest one. */
const REVEAL_SPREAD = 900;
const REVEAL_DOT = 450;

const SPRING = { stiffness: 60, damping: 20 };

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

/* Hermite smoothstep between a and b. Used for every edge in the fields, so
   the transition from big dots to small ones has no kink. */
function smoothstep(a, b, v) {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
}

/* A cheap hash on the dot index. Same input, same output, so the jitter is
   identical on the server and on every render, and there is no Math.random in
   the render path. */
function hash(n) {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

/* Grid positions with up to 0.8 units of jitter each way. At a ten unit pitch
   and a full size diameter of 8.2 that is the most that still keeps them apart. */
function buildDots() {
  const dots = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const i = row * COLS + col;
      const jx = (hash(i) - 0.5) * 1.6;
      const jy = (hash(i + 7919) - 0.5) * 1.6;
      dots.push({
        x: Math.round((STEP / 2 + col * STEP + jx) * 100) / 100,
        y: Math.round((STEP / 2 + row * STEP + jy) * 100) / 100,
      });
    }
  }
  return dots;
}

const DOTS = buildDots();

/* Each finish: paper/ink/dot colors, a rest position for its shape ("home",
   in view box units — may lie well outside the view box), and a field
   function returning how much ink belongs at (x, y) for a shape centred at
   (cx, cy), from 0 to 1. */
const FINISHES = [
  {
    name: "Make",
    paper: "#ffffff",
    ink: TEXT,
    dot: "rgb(15,31,20)",
    /* A circle of radius 300 centred far below and left of the card. Only a
       slice of its edge shows: a long band that enters the left edge at about
       a third of the height and leaves through the lower edge. */
    home: [-70, 380],
    field: (x, y, cx, cy) => 1 - smoothstep(12, 55, Math.abs(Math.hypot(x - cx, y - cy) - 300)),
  },
  {
    name: "Learn",
    paper: "#151515",
    ink: "#ffffff",
    dot: "#ffffff",
    /* A ring centred well below the card, so what stays visible is a wide arch:
       it peaks near the middle and both legs run off the lower corners. */
    home: [130, 350],
    field: (x, y, cx, cy) => 1 - smoothstep(10, 46, Math.abs(Math.hypot(x - cx, y - cy) - 215)),
  },
  {
    name: "Connect",
    paper: "#2d5bff",
    ink: "#ffffff",
    dot: "#ffffff",
    /* Two circles summed as a metaball field, so where they overlap they merge
       into one soft shape instead of showing a seam. Both sit past the right
       edge and the larger one drops through the lower one. */
    home: [270, 210],
    field: (x, y, cx, cy) => {
      const a = 110 / Math.hypot(x - cx, y - cy);
      const b = 72 / Math.hypot(x - cx - 56, y - cy + 74);
      return smoothstep(0.72, 1.25, a * a + b * b);
    },
  },
];

function FinishCard({ finish, index, selected, onSelect, reduced }) {
  const ref = useRef(null);
  const svgRef = useRef(null);
  const circles = useRef([]);
  /* Each card starts its own reveal when it comes into view. On the desktop all
     three arrive together and the stagger orders them; on the phone they stack
     and each one runs as it scrolls in, instead of the third one finishing
     while it is still off screen. The cards are tall, so the trigger sits at a
     fifth of the height: waiting for a third of a 640 pixel card would hold the
     dots back until the head of the card had already passed the fold. */
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [hx, hy] = finish.home;

  /* The pointer sets the target, the springs carry the centre. On leave the
     target goes home and the springs take the shape back with the same weight. */
  const tx = useMotionValue(hx);
  const ty = useMotionValue(hy);
  const cx = useSpring(tx, SPRING);
  const cy = useSpring(ty, SPRING);

  // Reveal delay per dot in ms, from its distance to the home centre.
  const delays = useMemo(() => {
    const d = new Float32Array(DOTS.length);
    let max = 0;
    for (let i = 0; i < DOTS.length; i++) {
      d[i] = Math.hypot(DOTS[i].x - hx, DOTS[i].y - hy);
      if (d[i] > max) max = d[i];
    }
    let min = Number.POSITIVE_INFINITY;
    for (let i = 0; i < d.length; i++) if (d[i] < min) min = d[i];
    /* Normalised against the spread, not against the raw distance: the chalk
       arc has its centre far off the card, so without this every dot would sit
       in the last tenth of the range and the whole grid would land at once. */
    for (let i = 0; i < d.length; i++) d[i] = ((d[i] - min) / (max - min)) * REVEAL_SPREAD;
    return d;
  }, [hx, hy]);

  const frame = useRef(0);
  /* Timestamp at which the reveal begins. Infinity until the card is in view,
     so pointer movement before that paints nothing. */
  const start = useRef(Number.POSITIVE_INFINITY);
  const revealed = useRef(false);

  /* One pass over all dots: radius from the live centre, scaled by the reveal
     progress while the reveal is still running. Opacity is only written during
     the reveal; afterwards it stands at one and the frame touches `r` alone. */
  const paint = useCallback(
    (now) => {
      frame.current = 0;
      if (start.current === Number.POSITIVE_INFINITY) return;
      const x = cx.get();
      const y = cy.get();
      const els = circles.current;
      let done = true;
      for (let i = 0; i < DOTS.length; i++) {
        const el = els[i];
        if (!el) continue;
        let p = 1;
        if (!revealed.current) {
          if (!reduced) {
            const t = (now - start.current - delays[i]) / REVEAL_DOT;
            if (t < 1) done = false;
            // Ease out: the dot lands softly instead of popping to size.
            p = t <= 0 ? 0 : t >= 1 ? 1 : 1 - (1 - t) ** 3;
          }
          el.setAttribute("opacity", p.toFixed(3));
        }
        const dot = DOTS[i];
        const r = (R_MIN + R_SPAN * finish.field(dot.x, dot.y, x, y)) * p;
        el.setAttribute("r", r.toFixed(2));
      }
      if (done) revealed.current = true;
      else frame.current = requestAnimationFrame(paint);
    },
    [cx, cy, delays, finish, reduced],
  );

  /* At most one frame in flight. The two springs both emit on every frame they
     move; without this guard each card would paint twice per frame. */
  const schedule = useCallback(() => {
    if (!frame.current) frame.current = requestAnimationFrame(paint);
  }, [paint]);

  useMotionValueEvent(cx, "change", schedule);
  useMotionValueEvent(cy, "change", schedule);

  useEffect(() => {
    if (!inView) return;
    /* The dots wait for the card to be most of the way up before they start,
       so the figure grows into a card that is already there. */
    if (start.current === Number.POSITIVE_INFINITY) {
      start.current = performance.now() + 250 + index * 120;
    }
    schedule();
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = 0;
    };
  }, [inView, index, schedule]);

  /* Pointer position in view box units. getScreenCTM already knows about the
     view box and the slice fit, so the same maths holds at every card size.
     The pull is clamped to REACH from home, and a touch does not pull at all:
     a shape that jumps under a finger reads as a glitch, not as a response. */
  const move = (e) => {
    if (reduced || e.pointerType === "touch") return;
    const svg = svgRef.current;
    const ctm = svg?.getScreenCTM();
    if (!svg || !ctm) return;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
    let dx = p.x - hx;
    let dy = p.y - hy;
    const len = Math.hypot(dx, dy);
    if (len > REACH) {
      dx = (dx / len) * REACH;
      dy = (dy / len) * REACH;
    }
    tx.set(hx + dx);
    ty.set(hy + dy);
  };

  const leave = () => {
    tx.set(hx);
    ty.set(hy);
  };

  /* The chip is the only part that answers the click. Selected, it takes the
     card's text colour as a fill and shows the card colour through the type. */
  const chipStyle = selected
    ? { background: finish.ink, color: finish.paper, borderColor: finish.ink }
    : { borderColor: `${finish.ink}59` };

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      onPointerMove={move}
      onPointerLeave={leave}
      className={`ft-card${index === 0 ? " ft-card-first" : ""}`}
      style={{ background: finish.paper, color: finish.ink }}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, delay: index * 0.12, ease }}
    >
      {/* Nothing shares the line with the numeral. It is a plate number, and a
          plate number stands alone above the caption. */}
      <span className="ft-numeral">{`0${index + 1}`}</span>
      {/* Two lines, set by hand rather than by measure, so the break sits in
          the same place on the phone and on the desktop. */}
      <span className="ft-title">
        Make progress
        <br />
        on what matters
      </span>
      <span className="ft-desc">
        Start with something you need to accomplish. Use technology to organize your work, understand information,
        and move from intention to action with less friction.
      </span>
      {/* The finish name closes the text block instead of sharing the top line.
          It stays above the figure, where a solid chip would read as a sticker
          stuck on the print. */}
      <span className="ft-chip" style={chipStyle}>
        {finish.name}
      </span>

      {/* The figure. It owns the lower half of the card and is bottom aligned
          and sliced, so on a narrower card the grid is cropped sideways while
          the bottom edge, where the shapes stand, is always the same. Circles
          start at r 0 and opacity 0 and are written by hand from then on. */}
      <svg
        ref={svgRef}
        aria-hidden
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMax slice"
        className="ft-figure"
      >
        <g fill={finish.dot}>
          {DOTS.map((d, i) => (
            <circle
              key={i}
              ref={(el) => {
                circles.current[i] = el;
              }}
              cx={d.x}
              cy={d.y}
              r={0}
              opacity={0}
            />
          ))}
        </g>
      </svg>
    </motion.button>
  );
}

export function FinishTriptych() {
  const reduced = !!useReducedMotion();
  const [selected, setSelected] = useState(0);
  const chosen = FINISHES[selected];

  return (
    <section className="ft-section" style={{ background: PAGE, color: TEXT }}>
      <div className="ft-container">
        {/* Head left, explanation right, both on the same baseline. The
            headline is short enough to stay on two lines at every width. */}
        <div className="ft-head">
          <div>
            <motion.p
              className="ft-kicker"
              style={{ color: `${TEXT}8c` }}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease }}
            >
              Technology for the things you want to do
            </motion.p>
            <motion.h2
              className="ft-heading"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.06, ease }}
            >
              Start with what you need to accomplish.
            </motion.h2>
          </div>
          <motion.p
            className="ft-explain"
            style={{ color: `${TEXT}a6` }}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
          >
            Choose a real task from everyday life. Learn how digital tools can help you get things done, learn with confidence,
            and work with the people around you.
          </motion.p>
        </div>

        {/* Three portraits side by side with a narrow gap, so the set reads as
            one plate cut in three and not as three separate tiles. */}
        <div className="ft-grid">
          {FINISHES.map((finish, i) => (
            <FinishCard
              key={finish.name}
              finish={finish}
              index={i}
              selected={selected === i}
              onSelect={() => setSelected(i)}
              reduced={reduced}
            />
          ))}
        </div>

        {/* The caption reads the choice back. Old and new sentence share one
            grid cell and cross fade, so the line never jumps in height while
            the text changes. */}
        <div className="ft-caption" style={{ color: `${TEXT}a6` }} aria-live="polite">
          <AnimatePresence initial={false}>
            <motion.p
              key={chosen.name}
              className="ft-caption-line"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease }}
            >
              <span style={{ color: TEXT }}>Selected: {chosen.name}.</span> Start with a real task and discover practical ways technology can help you do it better.
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default FinishTriptych;