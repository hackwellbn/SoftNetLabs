// products · Built with Systra Tools — https://systra.tools
import "./products.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {assets} from '../../../../assets/assets'
/* Four products of one small studio, each on its own painted ground with a
   white mark in the middle. The marks are the only drawn thing on the page.
   The colour comes from the paintings, the type stays white on a low shade
   from below, and nothing carries a border or a shadow. That is what lets
   four very different pictures read as one family.

   The row is a native scroll container, not a transform that pretends to be
   one. A trackpad, a touch swipe and a keyboard tab all move scrollLeft, so
   the mouse drag moves scrollLeft too. One source of truth means the row can
   never sit in two places at once and jump after you let go. The glide after
   a release is a short exponential decay on the same value, and the next
   wheel tick or press cancels it.

   Each mark has one small move on hover and focus. Not a generic scale but
   the thing its shape suggests: the four panes open, the cluster breathes
   out, the asterisk turns, the horizon drops. Six hundred milliseconds on a
   soft curve, and it comes back the same way.

   The studio and its products are invented. */

const ease = [0.22, 1, 0.36, 1];
const INK = "#0f1f14";

/* How quickly a flick dies down, in milliseconds. The row travels about
   velocity times this, so a brisk flick of two pixels per millisecond moves
   half a card and a little more. Enough to feel the weight, not enough to
   lose the place you were looking at. */
const GLIDE_TAU = 260;
const DRAG_THRESHOLD = 4;

const PRODUCTS = [
{
  id: "loam",
  name: "SoftNet Mail",
  line: "Stay connected to the people and work that matter. Send, receive, organize, and keep your important conversations together in one place.",
  src: assets.MailGirl,
  alt: "Soft gradient in pale green and deep green",
  focus: "72% 50%",
},

  {
    id: "perch",
    name: "Learn Something New",
    line: "Understand difficult ideas, explore new subjects, and learn step by step with tools that help you build confidence.",
    src: "/heros/close-up-of-soft-blurred-paper.webp",
    alt: "Blurred paper waves in blue and lilac",
    focus: "56% 50%",
  },

  {
    id: "sable",
    name: "Bring an Idea to Life",
    line: "Turn your thoughts into plans, documents, presentations, projects, or something useful you can share with others.",
    src: "/heros/blue-pastel-abstract-texture-fine.webp",
    alt: "Fine blue texture with pale sparkle",
    focus: "50% 50%",
  },

  {
    id: "moor",
    name: "Work Better Together",
    line: "Share information, communicate clearly, and coordinate with the people around you to make progress together.",
    src: "/heros/abstract-photograph-of-flowers-with-motion.webp",
    alt: "Pink and violet flowers blurred by motion",
    focus: "46% 50%",
  },
];

/* The marks share one unit: 12. Dot diameter, bar width, ring stroke and the
   opened gap in the panes are all 12, so four different shapes carry the same
   weight. Every mark is drawn around (0, 0) in a viewBox that starts at -48,
   which puts the centre of the box at the origin. Scale and rotate then pivot
   on the middle of the shape without any origin arithmetic. */
const UNIT = 12;
const hoverT = { duration: 0.6, ease };

/* Four panes with a narrow gap. On hover each one slides three pixels outward
   and the gap doubles, like a window opening a crack. */
function LoamMark({ on }) {
  const size = 34;
  const half = 3;
  const d = on ? 3 : 0;

  const cells = [
    { x: -size - half, y: -size - half, sx: -1, sy: -1 },
    { x: half, y: -size - half, sx: 1, sy: -1 },
    { x: -size - half, y: half, sx: -1, sy: 1 },
    { x: half, y: half, sx: 1, sy: 1 },
  ];

  return (
    <>
      {cells.map((c) => (
        <motion.rect
          key={`${c.sx}${c.sy}`}
          x={c.x}
          y={c.y}
          width={size}
          height={size}
          rx={8}
          animate={{ x: c.sx * d, y: c.sy * d }}
          transition={hoverT}
        />
      ))}
    </>
  );
}

// Points on a ring, angles in degrees, clockwise from three o'clock.
function ring(count, radius, offsetDeg) {
  return Array.from({ length: count }, (_, i) => {
    const a = ((offsetDeg + (i * 360) / count) * Math.PI) / 180;

    return {
      x: +(radius * Math.cos(a)).toFixed(2),
      y: +(radius * Math.sin(a)).toFixed(2),
    };
  });
}

/* A hexagonal lattice: one dot, six around it, six more outside. The second
   ring sits at root three times the first radius and turned by thirty
   degrees, which is where the lattice puts it. Gaps between neighbours are
   then equal everywhere. On hover the rings breathe outward, the outer one a
   beat later, so the pulse travels from the centre. */
const DOT_R = UNIT / 2;
const RING_R = 16;
const INNER = ring(6, RING_R, 0);
const OUTER = ring(6, RING_R * Math.sqrt(3), 30);

function PerchMark({ on }) {
  return (
    <>
      <circle r={DOT_R} />

      <motion.g
        animate={{ scale: on ? 1.06 : 1 }}
        transition={hoverT}
      >
        {INNER.map((p) => (
          <circle
            key={`${p.x},${p.y}`}
            cx={p.x}
            cy={p.y}
            r={DOT_R}
          />
        ))}
      </motion.g>

      <motion.g
        animate={{ scale: on ? 1.12 : 1 }}
        transition={{ ...hoverT, delay: on ? 0.06 : 0 }}
      >
        {OUTER.map((p) => (
          <circle
            key={`${p.x},${p.y}`}
            cx={p.x}
            cy={p.y}
            r={DOT_R}
          />
        ))}
      </motion.g>
    </>
  );
}

/* Three bars through the centre make a six armed asterisk. The bars are 64
   long rather than 60: thin arms read smaller than a solid square of the same
   span, so a little extra length brings the mark up to the others. On hover
   the whole star turns by thirty degrees, half a step, so the arms land where
   the gaps were. */
function SableMark({ on }) {
  const len = 64;

  return (
    <motion.g
      animate={{ rotate: on ? 30 : 0 }}
      transition={hoverT}
    >
      {[0, 60, 120].map((a) => (
        <rect
          key={a}
          x={-UNIT / 2}
          y={-len / 2}
          width={UNIT}
          height={len}
          rx={UNIT / 2}
          transform={`rotate(${a})`}
        />
      ))}
    </motion.g>
  );
}

/* A ring and a horizon. The ring is stroke only, the bar is solid, both at
   the family weight. On hover the horizon drops eight pixels and the ring
   becomes a sun going down behind it. */
function MoorMark({ on }) {
  return (
    <>
      <circle
        r={30}
        fill="none"
        stroke="currentColor"
        strokeWidth={UNIT}
      />

      <motion.rect
        x={-35}
        y={-UNIT / 2}
        width={70}
        height={UNIT}
        rx={UNIT / 2}
        animate={{ y: on ? 8 : 0 }}
        transition={hoverT}
      />
    </>
  );
}

const MARKS = {
  loam: LoamMark,
  perch: PerchMark,
  sable: SableMark,
  moor: MoorMark,
};

function Card({
  product,
  index,
  inView,
  reduced,
  active,
  onHover,
  onFocus,
  onBlur,
}) {
  const Mark = MARKS[product.id];

  /* The hover move is a transform, so it stays off under reduced motion. The
     card still answers focus with its ring. */
  const on = active && !reduced;

  return (
    <li className="pmc__item">
      <motion.a
        href="#"
        draggable={false}
        className="pmc__card"
        initial={
          reduced
            ? { opacity: 0 }
            : { opacity: 0, y: 28 }
        }
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{
          duration: 0.7,
          delay: index * 0.1,
          ease,
        }}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}

        /* Only keyboard focus plays the move. A mouse press also focuses a link
           in some browsers, and that would fire the move a second time on top
           of the hover. */
        onFocus={(e) => {
          if (e.currentTarget.matches(":focus-visible")) {
            onFocus();
          }
        }}
        onBlur={onBlur}
      >
        {/* Twelve pixels of image hang over the top and bottom, so the ten
            pixel pan on hover never shows an edge. */}
        <motion.div
          className="pmc__image-wrap"
          animate={{ y: on ? -10 : 0 }}
          transition={hoverT}
        >
          <img
            src={product.src}
            alt={product.alt}
            draggable={false}
            loading="lazy"
            decoding="async"
            className="pmc__image"
            style={{ objectPosition: product.focus }}
          />
        </motion.div>

        {/* One neutral shade from below, just enough for the two lines of
            text. It fades out before the middle, so the mark stands on the
            untouched painting. */}
        <div aria-hidden className="pmc__scrim" />

        <div className="pmc__mark-wrap">
          <svg
            viewBox="-48 -48 96 96"
            className="pmc__mark-svg"
            fill="currentColor"
            aria-hidden
          >
            {/* The mark arrives after its card, growing from sixty percent.
                Grown rather than slid, because a slide would read as a
                second card inside the first. */}
            <motion.g
              initial={
                reduced
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.6 }
              }
              animate={
                inView
                  ? reduced
                    ? { opacity: 1 }
                    : { opacity: 1, scale: 1 }
                  : undefined
              }
              transition={{
                duration: 0.6,
                delay: 0.25 + index * 0.1,
                ease,
              }}
            >
              <Mark on={on} />
            </motion.g>
          </svg>
        </div>

        <div className="pmc__caption">
          <h3 className="pmc__name">{product.name}</h3>
          <p className="pmc__line">{product.line}</p>
        </div>
      </motion.a>
    </li>
  );
}

export function PainterlyMarkCards() {
  const reduced = !!useReducedMotion();
  const scroller = useRef(null);

  /* once: the cards rise one time and then stand. The row is wider than the
     window, so the observer watches the scroller, not the cards; a card that
     is still off to the right is then already in place when it is dragged in. */
  const inView = useInView(scroller, {
    once: true,
    amount: 0.2,
  });

  const [hoverId, setHoverId] = useState(null);
  const [focusId, setFocusId] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [canScroll, setCanScroll] = useState(false);

  /* Only show the grab cursor when there is something to grab. On a wide
     monitor all four cards fit and the row is simply a row. */
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;

    const check = () =>
      setCanScroll(el.scrollWidth > el.clientWidth + 1);

    check();

    const ro = new ResizeObserver(check);
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  const glide = useRef(0);

  const stopGlide = useCallback(() => {
    if (glide.current) {
      cancelAnimationFrame(glide.current);
    }

    glide.current = 0;
  }, []);

  /* Velocity in pixels per millisecond, smoothed over the last few moves so a
     single jittery sample at release does not decide the whole glide. */
  const drag = useRef({
    startX: 0,
    startLeft: 0,
    lastX: 0,
    lastT: 0,
    v: 0,
    moved: false,
  });

  const suppressClick = useRef(false);
  const release = useRef(null);

  useEffect(() => {
    return () => {
      release.current?.();
      stopGlide();
    };
  }, [stopGlide]);

  const startGlide = useCallback((v0) => {
    const el = scroller.current;

    if (!el || Math.abs(v0) < 0.05) return;

    let v = Math.max(-3, Math.min(3, v0));
    let last = performance.now();
    const max = el.scrollWidth - el.clientWidth;

    const step = (now) => {
      /* Cap the frame delta: a tab that was hidden for a second must not
         jump the row by a metre on its first frame back. */
      const dt = Math.min(now - last, 40);
      last = now;

      el.scrollLeft -= v * dt;
      v *= Math.exp(-dt / GLIDE_TAU);

      const atEdge =
        el.scrollLeft <= 0 ||
        el.scrollLeft >= max - 0.5;

      if (Math.abs(v) < 0.02 || atEdge) {
        glide.current = 0;
        return;
      }

      glide.current = requestAnimationFrame(step);
    };

    glide.current = requestAnimationFrame(step);
  }, []);

  /* Mouse only. Touch already scrolls the container natively and would fight a
     second hand on scrollLeft. The listeners go on the window, not the
     element, so the drag keeps going when the pointer leaves the row, and so
     the click that ends a plain press still lands on its link. */
  const onPointerDown = (e) => {
    stopGlide();

    if (
      e.pointerType !== "mouse" ||
      e.button !== 0 ||
      !canScroll
    ) {
      return;
    }

    const el = scroller.current;
    if (!el) return;

    const d = drag.current;

    d.startX = d.lastX = e.clientX;
    d.startLeft = el.scrollLeft;
    d.lastT = e.timeStamp;
    d.v = 0;
    d.moved = false;

    const move = (ev) => {
      const dx = ev.clientX - d.startX;

      if (!d.moved) {
        if (Math.abs(dx) < DRAG_THRESHOLD) return;

        d.moved = true;
        setDragging(true);
        setHoverId(null);
        document.body.style.cursor = "grabbing";
      }

      el.scrollLeft = d.startLeft - dx;

      const dt = ev.timeStamp - d.lastT;

      if (dt > 0) {
        d.v =
          d.v * 0.6 +
          ((ev.clientX - d.lastX) / dt) * 0.4;
      }

      d.lastX = ev.clientX;
      d.lastT = ev.timeStamp;
    };

    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);

      release.current = null;

      if (!d.moved) return;

      d.moved = false;
      setDragging(false);
      document.body.style.cursor = "";

      /* The click for this release is dispatched right after pointerup, in
         the same task. Suppress it and let the flag clear itself afterwards,
         so a release outside the row cannot leave the next real click dead. */
      suppressClick.current = true;

      window.setTimeout(() => {
        suppressClick.current = false;
      }, 0);

      if (!reduced) {
        startGlide(d.v);
      }
    };

    release.current = up;

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  };

  const onClickCapture = (e) => {
    if (!suppressClick.current) return;

    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <section className="pmc">
      <div className="pmc__header">
        <motion.h2
          className="pmc__title"
          initial={
            reduced
              ? { opacity: 0 }
              : { opacity: 0, y: 12 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: 0.6,
            ease,
          }}
        >
          Products
        </motion.h2>

        <motion.p
          className="pmc__lede"
          style={{ color: `${INK}a6` }}
          initial={
            reduced
              ? { opacity: 0 }
              : { opacity: 0, y: 12 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: 0.6,
            delay: 0.08,
            ease,
          }}
        >
          Four things we built ourselves and reduced run. Each one started as a problem in our own
          week.
        </motion.p>
      </div>

      {/* The scroller runs the full width, so the last card can bleed off the
          right edge and say there is more. Its left padding is the same sum
          the header uses for its inset, so the first card lines up with the
          title at every width. The extra bottom padding is room for the cards
          to rise into view; a scroll container clips its own overflow, and
          the negative margin gives that room back to the section. */}
      <div
        ref={scroller}
        role="presentation"
        onPointerDown={onPointerDown}
        onClickCapture={onClickCapture}
        onWheel={stopGlide}
        style={{
          cursor: canScroll
            ? dragging
              ? "grabbing"
              : "grab"
            : undefined,
        }}
        className="pmc__scroller"
      >
        <ul
          aria-label="Products by Tern Studio"
          className="pmc__list"
        >
          {PRODUCTS.map((p, i) => (
            <Card
              key={p.id}
              product={p}
              index={i}
              inView={inView}
              reduced={reduced}
              active={
                hoverId === p.id ||
                focusId === p.id
              }
              onHover={(over) => {
                /* While the row is being dragged the pointer crosses every
                   card; none of that is a hover. */
                if (over && drag.current.moved) return;

                setHoverId((h) =>
                  over
                    ? p.id
                    : h === p.id
                      ? null
                      : h
                );
              }}
              onFocus={() => setFocusId(p.id)}
              onBlur={() =>
                setFocusId((f) =>
                  f === p.id ? null : f
                )
              }
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default PainterlyMarkCards;