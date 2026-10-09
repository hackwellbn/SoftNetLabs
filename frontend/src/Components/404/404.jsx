// GravityPileNotFound · SoftNet
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import "./404.css";

/* A SoftNet 404 page where the missing page has fallen out of the network.

   The pile represents different things people can do across the SoftNet
   ecosystem: connect, work, communicate, build, learn and automate.

   Instead of presenting a dead-end error, the page gives the visitor useful
   places to go next.

   The pile can still be dragged around, and "Drop them again" rebuilds it.
   The visual behavior remains the same; the content now belongs to SoftNet. */

const ease = [0.22, 1, 0.36, 1];
const ACCENT = "#c8ff4d";

/* SoftNet destinations. */
const NAV = [
  "SoftNet",
  "Services",
  "Solutions",
];

const PRINTS = [
  {
    src: "/heros/fashion-white-suit.webp",
    alt: "Abstract SoftNet service visual",
  },
  {
    src: "/heros/amber-glass-ribs.webp",
    alt: "Abstract amber glass representing connection",
  },
  {
    src: "/heros/ballet-arabesque-blush.webp",
    alt: "Abstract movement representing progress",
  },
  {
    src: "/heros/3d-heart-shaped-balloons-pink-and-orange.webp",
    alt: "Abstract connected shapes",
  },
  {
    src: "/heros/cascading-white-envelopes.webp",
    alt: "Envelopes representing digital communication",
  },
  {
    src: "/heros/glowing-geode-sphere-dusk-2.webp",
    alt: "Glowing sphere representing connected systems",
  },
  {
    src: "/heros/woman-red-lips-nails.webp",
    alt: "Abstract portrait representing people",
  },
  {
    src: "/heros/thumb-up-3d-icon.webp",
    alt: "Thumbs up representing getting things done",
  },
  {
    src: "/heros/orange-edge-render.webp",
    alt: "Abstract orange form",
  },
  {
    src: "/heros/luminous-white-composition-1.webp",
    alt: "Soft white abstract composition",
  },
];

/* Small pieces of the SoftNet ecosystem that can appear inside the pile. */
const WORDS = [
  {
    text: "SoftNetID",
    accent: false,
  },
  {
    text: "NetoraWisp",
    accent: true,
  },
  {
    text: "Patafast",
    accent: false,
  },
  {
    text: "Agentica",
    accent: true,
  },
  {
    text: "SoftNet Mail",
    accent: false,
  },
  {
    text: "Studios",
    accent: true,
  },
  {
    text: "Cloud",
    accent: false,
  },
  {
    text: "Connect",
    accent: true,
  },
];

const COUNT = 30;

const ASPECTS = [
  0.78,
  1,
  1.28,
];

/* Fallback image so the pile never displays broken-image icons. */
const FALLBACK_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='160' viewBox='0 0 200 160'%3E%3Crect width='200' height='160' fill='%231e293b'/%3E%3Ctext x='100' y='86' fill='%2394a3b8' font-family='sans-serif' font-size='13' text-anchor='middle'%3ESoftNet%3C/text%3E%3C/svg%3E";

const onImgError = (e) => {
  if (
    e.currentTarget.src !== FALLBACK_IMG
  ) {
    e.currentTarget.src = FALLBACK_IMG;
  }
};

/* mulberry32. Deterministic so the server and browser create the same pile. */
function seeded(seed) {
  return () => {
    seed =
      (seed + 0x6d2b79f5) |
      0;

    let t = Math.imul(
      seed ^ (seed >>> 15),
      1 | seed,
    );

    t =
      (t +
        Math.imul(
          t ^ (t >>> 7),
          61 | t,
        )) ^
      t;

    return (
      ((t ^ (t >>> 14)) >>> 0) /
      4294967296
    );
  };
}

/* Build the deterministic SoftNet pile. */
const CARDS = (() => {
  const rnd = seeded(404);

  let wordsUsed = 0;

  const cards = Array.from(
    { length: COUNT },
    (_, i) => {
      /*
       * Spread the pieces across the middle of the page so the pile feels
       * loose rather than like a regular grid.
       */
      const left =
        10 +
        (i / COUNT) * 68 +
        rnd() * 6;

      /*
       * The pile is highest around the middle.
       */
      const bottom =
        rnd() ** 1.6 * 70 +
        Math.sin(
          ((left - 10) / 72) *
            Math.PI,
        ) *
          80;

      const long =
        72 +
        rnd() * 64;

      const aspect =
        ASPECTS[
          Math.floor(
            rnd() *
              ASPECTS.length,
          )
        ];

      const rot =
        (rnd() - 0.5) * 36;

      /*
       * Every few cards becomes a SoftNet service tile.
       */
      const word =
        i % 5 === 2 &&
        wordsUsed < WORDS.length
          ? WORDS[wordsUsed++]
          : undefined;

      const print =
        PRINTS[
          (i * 7) %
            PRINTS.length
        ];

      return {
        id: i,

        content: word
          ? {
              kind: "word",
              ...word,
            }
          : {
              kind: "print",
              ...print,
            },

        w:
          aspect < 1
            ? long * aspect
            : long,

        h:
          aspect < 1
            ? long
            : long / aspect,

        left,
        bottom,
        rot,

        tumble:
          rot +
          (rnd() - 0.5) * 70,

        delay: 0,
      };
    },
  );

  /*
   * Lowest pieces land first, creating the pile from the ground upwards.
   */
  cards.sort(
    (a, b) =>
      a.bottom -
      b.bottom,
  );

  cards.forEach(
    (c, i) => {
      c.delay =
        i * 0.045 +
        rnd() * 0.015;
    },
  );

  return cards;
})();

/* Accent underline used by links. */
function Underline() {
  return (
    <span
      aria-hidden
      className="gp-underline"
      style={{
        background: ACCENT,
      }}
    />
  );
}

function Tile({
  card,
  reduced,
  fall,
  bounds,
  z,
  onLift,
}) {
  const c =
    card.content;

  const word =
    c.kind === "word";

  return (
    <motion.div
      drag
      dragConstraints={bounds}
      dragElastic={0.15}
      dragMomentum={!reduced}
      dragTransition={{
        power: 0.25,
        timeConstant: 180,
        bounceStiffness: 400,
        bounceDamping: 50,
      }}
      onDragStart={onLift}
      whileHover={
        reduced
          ? undefined
          : {
              scale: 1.02,
            }
      }
      whileDrag={
        reduced
          ? undefined
          : {
              scale: 1.04,
            }
      }
      initial={
        reduced
          ? false
          : {
              y: -fall,
              rotate: card.tumble,
            }
      }
      animate={{
        y: 0,
        rotate: card.rot,
      }}
      transition={
        reduced
          ? {
              duration: 0,
            }
          : {
              y: {
                type: "spring",
                stiffness: 140,
                damping: 30,
                velocity: 600,
                delay: card.delay,
              },

              rotate: {
                type: "spring",
                stiffness: 90,
                damping: 22,
                delay: card.delay,
              },
            }
      }
      className={`gp-tile ${
        word
          ? "gp-tile-word"
          : "gp-tile-print"
      }`}
      style={{
        left: `${card.left}%`,
        zIndex: z,

        background:
          c.kind === "word"
            ? c.accent
              ? ACCENT
              : "#ffffff"
            : undefined,

        "--w": `${card.w}px`,
        "--h": `${card.h}px`,
        "--b": `${card.bottom}px`,
      }}
    >
      {c.kind === "word" ? (
        <span className="gp-word-text">
          {c.text}
        </span>
      ) : (
        <img
          src={c.src}
          alt={c.alt}
          draggable={false}
          decoding="async"
          className="gp-print-img"
          onError={onImgError}
        />
      )}
    </motion.div>
  );
}

export function GravityPileNotFound() {
  const reduce =
    useReducedMotion();

  const reduced =
    !!reduce;

  const sectionRef =
    useRef(null);

  const pileRef =
    useRef(null);

  const inView =
    useInView(
      sectionRef,
      {
        once: true,
        amount: 0.2,
      },
    );

  /*
   * Cards begin above the section and fall into the SoftNet pile.
   */
  const [fall, setFall] =
    useState(0);

  useEffect(() => {
    if (
      inView &&
      sectionRef.current
    ) {
      setFall(
        sectionRef.current
          .offsetHeight * 1.2,
      );
    }
  }, [inView]);

  /*
   * Rebuild the pile.
   */
  const [round, setRound] =
    useState(0);

  /*
   * A dragged tile rises above the rest.
   */
  const nextZ =
    useRef(COUNT);

  const [lifted, setLifted] =
    useState({});

  const lift = (id) =>
    setLifted((l) => ({
      ...l,
      [id]:
        ++nextZ.current,
    }));

  const ready =
    reduced || fall > 0;

  const rise = (delay) => ({
    initial: reduced
      ? false
      : {
          opacity: 0,
          y: 14,
        },

    animate: {
      opacity: 1,
      y: 0,
    },

    transition: {
      duration: 0.7,
      delay,
      ease,
    },
  });

  return (
    <section
      ref={sectionRef}
      className="gp-section"
    >
      <div className="gp-header">
        <motion.nav
          {...rise(0)}
          className="gp-nav"
        >
          <span className="gp-kicker">
            SoftNet
          </span>

          <ul className="gp-nav-list">
            {NAV.map(
              (item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="gp-nav-link gp-group"
                  >
                    {item}

                    <Underline />
                  </a>
                </li>
              ),
            )}
          </ul>
        </motion.nav>

        <div className="gp-hero">
          <motion.h1
            {...rise(0.08)}
            className="gp-title"
          >
            404
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="gp-subtitle"
          >
            Looks like this page
            got disconnected.
          </motion.p>

          <motion.p
            {...rise(0.22)}
            className="gp-body"
          >
            The page you were looking
            for isn't here right now.
            But SoftNet has a lot more
            connected to it.
          </motion.p>

          <motion.div
            {...rise(0.3)}
            className="gp-actions"
          >
            <a
              href="/"
              className="gp-btn-primary"
            >
              Back to SoftNet
            </a>

            <a
              href="#"
              className="gp-link gp-group"
            >
              Explore our services

              <ArrowRight
                className="gp-arrow"
                strokeWidth={2}
              />

              <Underline />
            </a>
          </motion.div>

          <motion.p
            {...rise(0.38)}
            className="gp-hint"
          >
            You can move the pieces
            around. See where they lead.
          </motion.p>
        </div>
      </div>

      <div
        ref={pileRef}
        key={round}
        className="gp-pile"
      >
        {ready &&
          CARDS.map(
            (card) => (
              <Tile
                key={card.id}
                card={card}
                reduced={reduced}
                fall={fall}
                bounds={pileRef}
                z={
                  lifted[
                    card.id
                  ]
                }
                onLift={() =>
                  lift(card.id)
                }
              />
            ),
          )}
      </div>

      <button
        type="button"
        onClick={() => {
          setLifted({});
          setRound(
            (r) => r + 1,
          );
        }}
        className="gp-reset gp-group"
      >
        <RotateCcw
          className="gp-reset-icon"
          strokeWidth={1.9}
        />

        Drop them again
      </button>
    </section>
  );
}

export default GravityPileNotFound;