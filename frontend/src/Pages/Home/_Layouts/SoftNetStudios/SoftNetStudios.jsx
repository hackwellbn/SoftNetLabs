// SoftNetStudios · bento layout, converted from Systra Tools' SlidingRowsBento,
// now carrying SoftNet Studios' real content instead of the template's
// placeholder dance-studio copy.
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import "./SoftNetStudios.css";

/* A bento whose rows do not hold still. While the section passes through the
   viewport the first row slides a little to the left, the second to the right,
   the third to the left again but less. Nothing travels far: 80 px at most on
   a desktop, 24 on a phone. That is enough for the grid to read as a loose
   stack of shelves instead of a locked table, and because every row crosses
   the header column halfway through, the layout never looks broken, only in
   motion. The section clips whatever briefly crosses the viewport edge.

   The six photo tiles from the source template are gone — there's no real
   photography for SoftNet Studios yet, so the same slots now carry the six
   actual product features as plain text cards instead of invented images.
   Each keeps a "CH 0N" tag, borrowed from the real channel-strip numbering
   SoftNet Studios already uses elsewhere; it's the one piece of that other
   UI worth keeping here, since it's a real label rather than a photo.

   The stat tile counts up to 6 — the real number of features below, not an
   invented one. The schedule tile from the template is dropped entirely:
   there's no real timetable data for a desktop app, so row three is three
   even tiles instead of four. */

const ease = [0.22, 1, 0.36, 1];

const DRIFT = [-80, 80, -50];
const PHONE_FACTOR = 24 / 80;
const ROW_SPRING = { stiffness: 140, damping: 30, mass: 0.8 };

// Grid spans as plain CSS classes — see SoftNetStudios.css for the 768px values.
const SPAN_WIDE_MD5 = "tile-full-mobile-md5";
const SPAN_THIRD_MD3 = "tile-half-mobile-md3";
const SPAN_QUARTER_MD4 = "tile-half-mobile-md4";
const SPAN_FULL_ORDER_MD4 = "tile-full-order-mobile-md4";
const SPAN_THIRD_ROW_MD4 = "tile-half-mobile-md4"; // three equal tiles in row 3, span 4 each

const FEATURES = [
  { title: "Multi-Camera Production", desc: "Switch between cameras with precision control." },
  { title: "Scene Editor", desc: "Build and manage complex production layouts." },
  { title: "Bible Presentation", desc: "Verse display and scripture management tools." },
  { title: "Graphics & Lower Thirds", desc: "Professional broadcast overlays and titles." },
  { title: "Media Playback", desc: "Video, audio, and image playback engine." },
  { title: "Live Streaming", desc: "Stream to any platform with built-in encoding." },
];

const feature = (index, span) => ({
  kind: "feature",
  title: FEATURES[index].title,
  desc: FEATURES[index].desc,
  ch: String(index + 1).padStart(2, "0"),
  span,
});

const ROWS = [
  [
    feature(0, SPAN_WIDE_MD5),
    { kind: "stat", span: SPAN_THIRD_MD3 },
    feature(1, SPAN_QUARTER_MD4),
  ],
  [
    feature(2, SPAN_QUARTER_MD4),
    { kind: "text", span: SPAN_FULL_ORDER_MD4 },
    feature(3, SPAN_QUARTER_MD4),
  ],
  [
    feature(4, SPAN_THIRD_ROW_MD4),
    { kind: "accent", span: SPAN_THIRD_ROW_MD4 },
    feature(5, SPAN_THIRD_ROW_MD4),
  ],
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

/* Counts from 0 to `to` once `run` is true, fast at first and slow at the end,
   so the last digit locks in rather than jumps. Reduced motion shows the
   result straight away. */
function useCountUp(to, run, reduce, duration = 1000) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (reduce) {
      setN(to);
      return;
    }
    let raf = 0;
    let start = 0;
    const tick = (now) => {
      if (!start) start = now;
      const p = Math.min(1, (now - start) / duration);
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, run, reduce, duration]);
  return n;
}

function FeatureTile({ tile }) {
  return (
    <div className="sr-card sr-feature">
      <span className="sr-feature-ch">CH {tile.ch}</span>
      <div>
        <h3 className="sr-feature-title">{tile.title}</h3>
        <p className="sr-feature-desc">{tile.desc}</p>
      </div>
    </div>
  );
}

function StatTile({ reduce }) {
  const ref = useRef(null);
  // once: the number runs a single time and then stands, like a result.
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const n = useCountUp(6, inView, reduce);
  return (
    <div ref={ref} className="sr-card">
      <span className="sr-kicker">Modules</span>
      <div>
        {/* tabular-nums keeps the width steady while the digits change. */}
        <span className="sr-stat-number">{String(n).padStart(2, "0")}</span>
        <span className="sr-stat-caption">core software modules</span>
      </div>
    </div>
  );
}

function TextTile() {
  return (
    <div className="sr-card">
      <p className="sr-text-heading">One powerful desktop application.</p>
      <a
        href="http://studios.softnetkenya.com"
        target="_blank"
        rel="noopener noreferrer"
        className="sr-text-link"
      >
        Learn More
        <ArrowRight className="sr-text-link-icon" strokeWidth={2} />
      </a>
    </div>
  );
}

function AccentTile() {
  return (
    <div className="sr-card sr-accent">
      <p className="sr-accent-heading">Available for download.</p>
      {/* The arrow has its slot from the start and only fades in, so the button
          keeps its width and the label does not shuffle. */}
      <a
        href="http://studios.softnetkenya.com/downloads"
        target="_blank"
        rel="noopener noreferrer"
        className="sr-accent-btn"
      >
        Download
        <ArrowRight className="sr-accent-btn-icon" strokeWidth={2} />
      </a>
    </div>
  );
}

function TileView({ tile, reduce }) {
  switch (tile.kind) {
    case "feature":
      return <FeatureTile tile={tile} />;
    case "stat":
      return <StatTile reduce={reduce} />;
    case "text":
      return <TextTile />;
    default:
      return <AccentTile />;
  }
}

function Row({ tiles, drift, progress, reduce }) {
  /* A negative drift maps 0 to +d and 1 to -d: the row arrives from the right
     and leaves to the left, crossing the header column at the midpoint. */
  const target = useTransform(progress, [0, 1], [-drift, drift]);
  const x = useSpring(target, ROW_SPRING);

  return (
    <motion.div className="sr-row" style={reduce ? undefined : { x }}>
      {tiles.map((tile, i) => (
        <motion.div
          key={tile.kind === "feature" ? tile.title : tile.kind}
          className={cx("sr-tile", tile.span)}
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: i * 0.07, ease }}
        >
          <TileView tile={tile} reduce={reduce} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export function SoftNetStudios() {
  const reduce = !!useReducedMotion();
  const ref = useRef(null);
  /* 0 when the section's top reaches the bottom of the viewport, 1 when its
     bottom leaves at the top: the whole passage, not just the visible part. */
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // One entrance for the three header parts, staggered by delay only.
  const reveal = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <section ref={ref} className="sr-section">
      <div className="sr-container">
        <div className="sr-header-grid">
          <div className="sr-header-left">
            <motion.p className="sr-kicker" {...reveal(0)}>
              Software / 07
            </motion.p>
            <motion.h2 className="sr-title" {...reveal(0.06)}>
              Professional Live Production Software
            </motion.h2>
          </div>
          <motion.p className="sr-lede" {...reveal(0.14)}>
            Create broadcasts, church services, conferences, live streams, presentations,
            graphics, and media productions from one powerful desktop application.
          </motion.p>
        </div>

        <div className="sr-rows">
          {ROWS.map((tiles, i) => (
            <Row
              key={i}
              tiles={tiles}
              drift={DRIFT[i] * (desktop ? 1 : PHONE_FACTOR)}
              progress={scrollYProgress}
              reduce={reduce}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SoftNetStudios;