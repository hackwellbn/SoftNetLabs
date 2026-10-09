// softnetid-experience · Built for SoftNetID
import "./explanations.css";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

/* A statement about the everyday experience of using digital services.

   Two words stay still while the final word changes as the reader moves
   through the section:

   Digital life should feel simple.
   Digital life should feel secure.
   Digital life should feel connected.
   Digital life should feel personal.
   Digital life should feel useful.
   Digital life should feel clear.
   Digital life should feel yours.

   The changing word responds to the reader's scroll, so the statement becomes
   part of the journey through the page rather than an animation that runs
   independently of the person reading it.

   The same rail can still be dragged, controlled with the keyboard, or moved
   with a horizontal trackpad gesture.

   SoftNetID is presented here from the user's point of view: less friction,
   easier access, clearer identity and a more connected digital experience. */

const ease = [0.22, 1, 0.36, 1];

/* These are the words that complete the sentence as the reader scrolls. */
const WORDS = [
  "simple",
  "secure",
  "connected",
  "personal",
  "useful",
  "clear",
  "yours",
];

const N = WORDS.length;
const COPIES = 3;
const RAIL = Array.from(
  { length: N * COPIES },
  (_, i) => WORDS[i % N],
);

/* Opacity by ring distance: the active word, its neighbours, the pair behind
   them, everything further out. */
const FADE = [1, 0.28, 0.16, 0.1];

/* How long a finished sentence stands before the next word arrives when the
   section is not being actively scrolled. */
const BEAT = 3200;

/* Soft enough to settle without a second swing. */
const SPRING = {
  type: "spring",
  stiffness: 120,
  damping: 22,
  mass: 0.9,
};

/* After the last sideways wheel tick the rail waits this long, then snaps. */
const WHEEL_SETTLE = 140;

function ringDistance(a, b) {
  const d = Math.abs(a - b) % N;
  return Math.min(d, N - d);
}

export function WordRailStatement() {
  const reduce = !!useReducedMotion();

  const sectionRef = useRef(null);

  /* The rail only walks automatically while somebody can see it. */
  const inView = useInView(sectionRef, { amount: 0.3 });

  /*
   * The section's own scroll progress is used to move the statement with the
   * reader. As the person moves through the section, the final word changes.
   */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* Index into the tripled rail. At rest it always lies in the middle copy. */
  const [active, setActive] = useState(N);
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const x = useMotionValue(0);

  const rowRef = useRef(null);
  const wordRefs = useRef([]);

  /*
   * The measured left edge of every rail word. State is used for drag bounds,
   * and the ref is used by handlers that must never read a stale list.
   */
  const [offsets, setOffsets] = useState([]);
  const offsetsRef = useRef([]);

  useEffect(() => {
    const row = rowRef.current;

    if (!row) return;

    let alive = true;

    const place = () => {
      if (!alive) return;

      const next = wordRefs.current.map(
        (el) => el?.offsetLeft ?? 0,
      );

      offsetsRef.current = next;
      setOffsets(next);

      /*
       * A layout change is not motion: stop whatever runs and put the rail
       * down where the active word belongs.
       */
      x.stop();
      x.jump(-(next[activeRef.current] ?? 0));
    };

    const observer = new ResizeObserver(place);

    observer.observe(row);

    document.fonts.ready.then(place);

    return () => {
      alive = false;
      observer.disconnect();
    };
  }, [x]);

  /*
   * Moves the active word to any index on the tripled rail.

   * If that index lies outside the middle copy, the rail hops by one copy
   * length first and the index is brought home. The spring then only travels
   * the short way.
   */
  const goTo = useCallback(
    (index) => {
      const off = offsetsRef.current;

      const home =
        N + (((index % N) + N) % N);

      const velocity = x.getVelocity();

      x.stop();

      if (
        home !== index &&
        off[index] !== undefined &&
        off[home] !== undefined
      ) {
        x.jump(
          x.get() +
            off[index] -
            off[home],
        );
      }

      setActive(home);

      const target = -(off[home] ?? 0);

      if (reduce) {
        x.jump(target);
      } else {
        animate(x, target, {
          ...SPRING,
          velocity,
        });
      }
    },
    [x, reduce],
  );

  /*
   * Normal vertical page scrolling also changes the sentence.

   * This is deliberately based on the section's scroll progress rather than
   * a timer, so the words feel attached to the person's movement through the
   * page.
   */
  const lastScrollIndex = useRef(null);

  useEffect(() => {
    if (reduce || !inView) return;

    const unsubscribe = scrollYProgress.on(
      "change",
      (latest) => {
        const next =
          Math.min(
            N - 1,
            Math.max(
              0,
              Math.round(latest * (N - 1)),
            ),
          );

        if (lastScrollIndex.current === next) {
          return;
        }

        lastScrollIndex.current = next;

        /*
         * Keep the middle copy as the visual home for the word.
         */
        goTo(N + next);
      },
    );

    return unsubscribe;
  }, [
    reduce,
    inView,
    scrollYProgress,
    goTo,
  ]);

  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);

  const held =
    hovered ||
    focused ||
    dragging;

  /*
   * Automatic movement is retained for someone who stops scrolling on the
   * section. Once they interact with it, the automatic timer pauses.
   */
  useEffect(() => {
    if (
      reduce ||
      !inView ||
      held
    ) {
      return;
    }

    const id = window.setTimeout(
      () => goTo(active + 1),
      BEAT,
    );

    return () =>
      window.clearTimeout(id);
  }, [
    reduce,
    inView,
    held,
    active,
    goTo,
  ]);

  const nearest = useCallback(() => {
    const off = offsetsRef.current;
    const pos = -x.get();

    let best = 0;

    for (let i = 1; i < off.length; i++) {
      if (
        Math.abs(off[i] - pos) <
        Math.abs(off[best] - pos)
      ) {
        best = i;
      }
    }

    return best;
  }, [x]);

  const wheelTimer = useRef(0);

  useEffect(
    () => () =>
      window.clearTimeout(
        wheelTimer.current,
      ),
    [],
  );

  /*
   * A pull may travel almost a whole copy either way from the resting word.
   * This keeps words underneath the stack at all times.
   */
  const bounds = {
    left:
      -(
        offsets[
          active + N - 1
        ] ?? 0
      ),

    right:
      -(
        offsets[
          active - N + 1
        ] ?? 0
      ),
  };

  /*
   * A click that ends a drag is not a choice. The flag outlives the pointer
   * release by one tick, long enough for the click event that follows it.
   */
  const dragged = useRef(false);

  return (
    <section
      ref={sectionRef}
      className="wrs"
    >
      <div className="wrs__kicker-wrap">
        <div className="wrs__kicker-inner">
          <motion.p
            className="wrs__kicker"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{
              once: true,
              margin: "-80px",
            }}
            transition={{
              duration: 0.8,
              ease,
            }}
          >
            SoftNetID
          </motion.p>
        </div>
      </div>

      <div className="wrs__content">
        <h2
          className="wrs__sr-only"
          aria-live="polite"
          aria-atomic="true"
        >
          Digital life should feel{" "}
          {WORDS[active % N]}.
        </h2>

        <div
          aria-hidden
          className="wrs__type"
        >
          <motion.span
            className="wrs__pair-line"
            initial={
              reduce
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    y: 22,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-80px",
            }}
            transition={{
              duration: 0.9,
              ease,
            }}
          >
            Digital life
          </motion.span>

          <motion.span
            className="wrs__pair-line"
            initial={
              reduce
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    y: 22,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-80px",
            }}
            transition={{
              duration: 0.9,
              delay: 0.08,
              ease,
            }}
          >
            should feel
          </motion.span>
        </div>

        <motion.div
          className="wrs__rail-wrap"
          initial={
            reduce
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  x: "10%",
                }
          }
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            margin: "-80px",
          }}
          transition={{
            duration: 1.1,
            delay: 0.18,
            ease,
          }}
        >
          <div
            role="group"
            tabIndex={0}
            aria-label="The final word of the statement. Use the left and right arrow keys to change it."
            className="wrs__type wrs__rail-group"

            onPointerEnter={(e) => {
              if (
                e.pointerType === "mouse"
              ) {
                setHovered(true);
              }
            }}

            onPointerLeave={(e) => {
              if (
                e.pointerType === "mouse"
              ) {
                setHovered(false);
              }
            }}

            onFocus={(e) => {
              if (
                e.currentTarget.matches(
                  ":focus-visible",
                )
              ) {
                setFocused(true);
              }
            }}

            onBlur={() =>
              setFocused(false)
            }

            onKeyDown={(e) => {
              if (
                e.key ===
                "ArrowRight"
              ) {
                e.preventDefault();

                goTo(active + 1);
              } else if (
                e.key ===
                "ArrowLeft"
              ) {
                e.preventDefault();

                goTo(active - 1);
              }
            }}

            onWheel={(e) => {
              /*
               * Horizontal trackpad movement continues to scrub the rail.
               * Vertical scrolling is handled by the page itself and the
               * section's scroll progress changes the statement.
               */
              if (
                Math.abs(e.deltaX) <=
                Math.abs(e.deltaY)
              ) {
                return;
              }

              x.stop();

              x.set(
                Math.min(
                  bounds.right,
                  Math.max(
                    bounds.left,
                    x.get() -
                      e.deltaX,
                  ),
                ),
              );

              window.clearTimeout(
                wheelTimer.current,
              );

              wheelTimer.current =
                window.setTimeout(
                  () =>
                    goTo(nearest()),
                  WHEEL_SETTLE,
                );
            }}
          >
            <motion.div
              ref={rowRef}
              aria-hidden
              className="wrs__row"
              style={{ x }}
              drag="x"
              dragMomentum={false}
              dragElastic={0.08}
              dragConstraints={bounds}

              onDragStart={() => {
                dragged.current = true;
                setDragging(true);
              }}

              onDragEnd={() => {
                setDragging(false);

                goTo(nearest());

                window.setTimeout(
                  () => {
                    dragged.current = false;
                  },
                  0,
                );
              }}
            >
              {RAIL.map((word, i) => {
                const d = ringDistance(
                  i,
                  active,
                );

                return (
                  <button
                    key={i}
                    ref={(el) => {
                      wordRefs.current[i] =
                        el;
                    }}
                    type="button"
                    tabIndex={-1}
                    onClick={() => {
                      if (
                        dragged.current ||
                        i === active
                      ) {
                        return;
                      }

                      goTo(i);
                    }}
                    className={`wrs__word${
                      d === 0
                        ? " is-active"
                        : ""
                    }`}
                    style={{
                      opacity:
                        FADE[
                          Math.min(
                            d,
                            FADE.length -
                              1,
                          )
                        ],
                    }}
                  >
                    {word}.
                  </button>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="wrs__footer-wrap">
        <motion.div
          className="wrs__footer-inner"
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease,
          }}
        >
          <p className="wrs__footer-text">
            One identity for the services you use,
            the people you connect with, and the
            things you need to get done.
          </p>

          <a
            href="#"
            className="wrs__cta"
          >
            Explore SoftNetID
            <ArrowRight
              className="wrs__cta-icon"
              strokeWidth={1.9}
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default WordRailStatement;