import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import "./NetoraWisp.css";
import {assets} from '../../../../assets/assets'
/* Three numbers about a week on the platform, each standing on a photo.

   Netora watches routers, bandwidth and sign-ups around the clock. This
   section reports what an average week looks like: how reliable the network
   stayed, how much data moved, how many subscribers came on board. Each card
   gets one photo, one big number and a thin curve of the week, drawn in as
   the card arrives so it reads like a live measurement rather than a label.

   Adapted from the "Photo Metric Cards" layout: same mechanics (count-up,
   Catmull-Rom week chart, hairline viewfinder frame), re-themed with Netora's
   own metrics and a teal accent instead of the original green. Swap the
   image paths under /images/metrics/ for real network/ops photography. */

const ease = [0.22, 1, 0.36, 1];

const CHIP_IMAGE = "/images/metrics/chip-network.jpg";

/* The chart lives in a 300 by 90 box. The curve uses the upper part, the
   ticks fall to a baseline below it and the day labels sit under that. */
const CHART = { top: 12, bottom: 58, base: 64, left: 20, right: 280, labelY: 82 };
const DRAW_SECONDS = 1.4;

/* Seven daily values become seven points, Monday on the left, Sunday on the
   right. The curve passes through every point as a Catmull-Rom spline written
   out as cubic segments: the control points come from the neighbours, so the
   line bends smoothly through each day instead of kinking at it. */
function weekToPoints(week) {
  const span = CHART.right - CHART.left;
  const height = CHART.bottom - CHART.top;
  return week.map((v, i) => ({
    x: CHART.left + (i / (week.length - 1)) * span,
    y: CHART.bottom - v * height,
  }));
}

const round = (n) => Math.round(n * 10) / 10;

function smoothPath(points) {
  let d = `M ${round(points[0].x)} ${round(points[0].y)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${round(c1x)} ${round(c1y)}, ${round(c2x)} ${round(c2y)}, ${round(p2.x)} ${round(p2.y)}`;
  }
  return d;
}

/* Only three days get a marker. Monday, Thursday and Sunday are enough to
   read the shape of a week; seven labels under a card-wide chart would turn
   the sparkline into a table. */
const MARKED_DAYS = [
  { index: 0, label: "Mon" },
  { index: 3, label: "Thu" },
  { index: 6, label: "Sun" },
];

function buildChart(week) {
  const points = weekToPoints(week);
  return {
    path: smoothPath(points),
    markers: MARKED_DAYS.map((m) => ({ ...points[m.index], label: m.label })),
  };
}

const CARDS = [
  {
    src: assets.datacenter,
    alt: "A rack of MikroTik routers with status lights lit up",
    position: "50% 50%",
    value: 99.8,
    unit: "%",
    label: "Network uptime",
    tag: "For reliability",
    sentence: "Health checks run every minute against every router, day and night.",
    // Strong all week, with a short midweek maintenance window.
    chart: buildChart([0.86, 0.9, 0.6, 0.92, 0.95, 0.98, 0.99]),
  },
  {
    src: assets.mikrotikracks,
    alt: "Close-up of fiber network cables lit from behind",
    position: "50% 45%",
    value: 4.2,
    unit: "TB",
    label: "Data delivered",
    tag: "For subscribers",
    sentence: "Evenings carry most of the week's traffic across every PPPoE line.",
    // Builds through the week, peaks at the weekend.
    chart: buildChart([0.34, 0.4, 0.46, 0.5, 0.58, 0.84, 0.9]),
  },
  {
    src: assets.manRooftop,
    alt: "A technician installing a rooftop antenna",
    position: "40% 50%",
    value: 46,
    unit: "accounts",
    label: "New subscribers provisioned",
    tag: "For growth",
    sentence: "Self-service sign-ups outnumber manual provisioning three to one.",
    // Steady on weekdays, a jump when installs are booked at the weekend.
    chart: buildChart([0.5, 0.56, 0.48, 0.6, 0.52, 0.78, 0.7]),
  },
];

/* The small photo between two words of the headline. It is a real button: on
   hover or focus it widens and the picture drifts a little inside it. Under
   reduced motion it stays at its narrow width and only the frame reacts. */
function PlatformChip({ reduced }) {
  const [wide, setWide] = useState(false);
  const open = wide && !reduced;
  return (
    <motion.button
      type="button"
      aria-label="Preview the dashboard"
      onHoverStart={() => setWide(true)}
      onHoverEnd={() => setWide(false)}
      onFocus={() => setWide(true)}
      onBlur={() => setWide(false)}
      className="nmc-chip"
      initial={false}
      animate={{ width: open ? "3.4em" : "1.9em" }}
      transition={{ duration: 0.5, ease }}
    >
      {/* Slightly enlarged so the drift never shows an edge of the picture. */}
      <motion.img
        src={CHIP_IMAGE}
        alt=""
        className="nmc-chip-img"
        draggable={false}
        initial={false}
        animate={{ x: open ? "-5%" : "0%", scale: open ? 1.12 : 1.04 }}
        transition={{ duration: open ? 1.8 : 0.5, ease }}
      />
    </motion.button>
  );
}

/* Counts from 0 to the target on a motion value, so the digits change without
   re-rendering the card. "4.2" keeps its one decimal all the way up; a number
   that switches between "4" and "4.2" while counting looks broken. */
function useCountUp(value, run, delay, reduced) {
  const decimals = Number.isInteger(value) ? 0 : 1;
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => v.toFixed(decimals));

  useEffect(() => {
    if (reduced) {
      mv.set(value);
      return;
    }
    if (!run) return;
    const controls = animate(mv, value, { duration: 1.2, delay, ease });
    return () => controls.stop();
  }, [mv, value, run, delay, reduced]);

  return text;
}

function WeekChart({ card, shown, reduced, delay }) {
  const { path, markers } = card.chart;
  /* The dots land after the pen has passed them, one beat behind the line,
     and the labels come last: first the shape, then the days. */
  const dotAt = [0.4, 0.7, 1];
  return (
    <svg
      viewBox="0 0 300 90"
      className="nmc-chart"
      role="img"
      aria-label={`${card.label}, Monday to Sunday`}
    >
      <motion.path
        d={path}
        fill="none"
        stroke="white"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduced ? false : { pathLength: 0 }}
        animate={reduced || shown ? { pathLength: 1 } : undefined}
        transition={{ duration: DRAW_SECONDS, delay, ease: "easeInOut" }}
      />
      {markers.map((m, k) => {
        const at = delay + DRAW_SECONDS * dotAt[k];
        return (
          <g key={m.label}>
            {/* A dotted plumb line from the dot to its day. Round caps on a
                dash pattern with almost no dash length give real dots, which
                stay quiet next to the drawn curve where a solid rule would
                start competing with it. */}
            <motion.line
              x1={m.x}
              x2={m.x}
              y1={m.y + 7}
              y2={CHART.base}
              stroke="white"
              strokeOpacity={0.55}
              strokeWidth={0.9}
              strokeLinecap="round"
              strokeDasharray="0.9 3.4"
              initial={reduced ? false : { opacity: 0 }}
              animate={reduced || shown ? { opacity: 1 } : undefined}
              transition={{ duration: 0.5, delay: at, ease }}
            />
            {/* The radius grows instead of a CSS scale: SVG transforms pivot
                around the viewport origin unless told otherwise, r does not. */}
            <motion.circle
              cx={m.x}
              cy={m.y}
              fill="white"
              initial={reduced ? false : { r: 0, opacity: 0 }}
              animate={reduced || shown ? { r: 2.5, opacity: 1 } : undefined}
              transition={{ duration: 0.45, delay: at, ease }}
            />
            <motion.text
              x={m.x}
              y={CHART.labelY}
              textAnchor="middle"
              fill="white"
              fillOpacity={0.7}
              className="nmc-chart-label"
              initial={reduced ? false : { opacity: 0 }}
              animate={reduced || shown ? { opacity: 1 } : undefined}
              transition={{ duration: 0.5, delay: delay + DRAW_SECONDS + 0.15, ease }}
            >
              {m.label}
            </motion.text>
          </g>
        );
      })}
    </svg>
  );
}

function MetricCard({ card, index, reduced }) {
  const ref = useRef(null);
  /* Each card watches for itself. On a phone they stack, and a card that had
     already counted up off screen would arrive finished. */
  const shown = useInView(ref, { once: true, amount: 0.3 });
  const enter = index * 0.12;
  const value = useCountUp(card.value, shown, enter + 0.05, reduced);

  return (
    <motion.article
      ref={ref}
      className="nmc-card"
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
      animate={shown ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, delay: enter, ease }}
    >
      {/* The photo is a little taller than the card, so the hover lift never
          uncovers the bottom edge. */}
      <img
        src={card.src}
        alt={card.alt}
        loading="lazy"
        draggable={false}
        className="nmc-card-img"
        style={{ objectPosition: card.position }}
      />

      {/* Neutral darkening only. Heavy at the foot where the sentence sits,
          light at the head where the number stands; the middle of the photo
          keeps most of its colour. */}
      <div aria-hidden className="nmc-card-scrim" />

      {/* Hairline frame, set in far enough that every line of the card sits
          inside it. It brightens a little on hover, the only thing on the card
          that does apart from the photo. */}
      <div aria-hidden className="nmc-card-frame" />

      {/* The padding is the frame inset plus a hand's width, so the number
          starts inside the frame instead of leaning on it. */}
      <div className="nmc-card-body">
        {/* Number and tag share the top line. When a card is too narrow for
            both, the tag drops to its own line and stays right aligned rather
            than squeezing the number. */}
        <div className="nmc-card-top">
          <div className="nmc-value-row">
            <motion.span className="nmc-value">{value}</motion.span>
            <span className="nmc-unit">{card.unit}</span>
          </div>
          <span className="nmc-tag-row">
            <span aria-hidden className="nmc-tag-dot" />
            <span className="nmc-tag">{card.tag}</span>
          </span>
        </div>

        <p className="nmc-label">{card.label}</p>

        {/* Free space in the middle: this is where the photo shows through. */}
        <div className="nmc-spacer" />

        <WeekChart card={card} shown={shown} reduced={reduced} delay={enter + 0.3} />

        <p className="nmc-sentence">{card.sentence}</p>
      </div>
    </motion.article>
  );
}

export function NetoraMetricCards() {
  const reduce = useReducedMotion();
  const reduced = !!reduce;

  return (
    <section className="netora-metrics">
      <div className="nmc-container">
        <div className="nmc-intro">
          {/* The cap sits well above what either line needs at rest. It has to:
              when the chip widens, the second line grows, and a tighter cap
              would push "honestly." onto a third line and move the chip out
              from under the pointer, which ends the hover. */}
          <motion.h2
            className="nmc-heading"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease }}
          >
            A week on Netora,
            <br />
            measured
            <PlatformChip reduced={reduced} />
            honestly.
          </motion.h2>
          <motion.p
            className="nmc-intro-sub"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            No spreadsheets, no manual exports — the platform logs uptime, bandwidth and
            provisioning as it happens, and this is an average week.
          </motion.p>
        </div>

        <div className="nmc-grid">
          {CARDS.map((card, i) => (
            <MetricCard key={card.label} card={card} index={i} reduced={reduced} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default NetoraMetricCards;