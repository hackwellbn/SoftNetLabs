// softnetid · Built with SoftNet

import "./manifesto.css";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/* A section that explains SoftNetID through the everyday experience of the
   person using it: one identity, simpler access, and less friction across
   the services they use.

   The three passages move from the problem people experience, to the
   simplicity SoftNetID provides, to the confidence that comes from having
   one trusted digital identity.

   Nothing is pinned. The reader simply moves through the section while the
   background changes gradually. The visual movement supports the story
   without becoming the story.

   SoftNetID — one identity for a simpler digital life. */

const ease = [0.22, 1, 0.36, 1];

/* The ground changes gradually as the reader moves through the story. */
const GROUND_MARKS = [0, 0.3, 0.56, 0.74, 1];
const GROUNDS = ["#f5f6fa", "#eef0f7", "#c7ccdd", "#232a45", "#0d0f1a"];

/* The type turns slightly ahead of the ground so it remains readable. */
const TYPE_MARKS = [0, 0.54, 0.66, 1];
const TYPES = ["#14151c", "#1b2140", "#eef0fb", "#f4f5fb"];
const QUIET = ["#5b5f6b", "#4b5170", "#b9bfe0", "#a6acc9"];

/* SoftNetID is explained through three moments in the user's experience:
   the problem, the simpler way forward, and the confidence that follows. */
const PASSAGES = [
  {
    kicker: "Every day",
    head: "Your digital life should not feel like a collection of separate doors.",
    text: "Different services, different accounts, different passwords and different forms can turn simple tasks into unnecessary work. SoftNetID starts with making that experience simpler.",
  },
  {
    kicker: "One identity",
    head: "SoftNetID gives you one identity to use across the services that matter to you.",
    text: "Instead of repeatedly proving who you are, your identity can move with you. Less repetition means less time managing accounts and more time getting things done.",
  },
  {
    kicker: "With confidence",
    head: "A simpler digital experience should also help you feel more in control.",
    text: "SoftNetID is built around a clear, consistent way to access digital services — helping individuals spend less time thinking about identity and more time using the services they need.",
  },
];

export function TintShiftManifesto() {
  const reduce = !!useReducedMotion();
  const root = useRef(null);

  /* From the moment the top of the section reaches the top of the screen to
     the moment its bottom reaches the bottom. The colour belongs to reading
     the section and changes continuously with the reader's progress. */
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start start", "end end"],
  });

  const ground = useTransform(scrollYProgress, GROUND_MARKS, GROUNDS);
  const type = useTransform(scrollYProgress, TYPE_MARKS, TYPES);
  const quiet = useTransform(scrollYProgress, TYPE_MARKS, QUIET);

  return (
    <motion.section
      ref={root}
      className="tsm"
      style={{ backgroundColor: reduce ? GROUNDS[0] : ground }}
    >
      <div className="tsm__container">
        <div className="tsm__top-row">
          <motion.span
            className="tsm__kicker"
            style={{ color: reduce ? QUIET[0] : quiet }}
          >
            SoftNetID
          </motion.span>

          <motion.span
            className="tsm__meta"
            style={{ color: reduce ? QUIET[0] : quiet }}
          >
            One identity, simpler digital life
          </motion.span>
        </div>

        {/* Each passage gets most of a screen to itself. This gives the
            reader enough space to understand each part of the SoftNetID
            experience before moving to the next. */}
        {PASSAGES.map((p, i) => (
          <div key={p.kicker} className="tsm__passage">
            <motion.div
              initial={
                reduce
                  ? { opacity: 0 }
                  : { opacity: 0, y: 24 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.8, ease }}
            >
              <motion.span
                className="tsm__kicker"
                style={{ color: reduce ? QUIET[0] : quiet }}
              >
                {p.kicker}
              </motion.span>

              <motion.h2
                className="tsm__head"
                style={{ color: reduce ? TYPES[0] : type }}
              >
                {p.head}
              </motion.h2>

              <motion.p
                className="tsm__text"
                style={{ color: reduce ? QUIET[0] : quiet }}
              >
                {p.text}
              </motion.p>
            </motion.div>

            {/* The passage number remains part of the existing visual system. */}
            <motion.span
              className="tsm__meta tsm__index"
              style={{ color: reduce ? QUIET[0] : quiet }}
            >
              {String(i + 1).padStart(2, "0")} /{" "}
              {String(PASSAGES.length).padStart(2, "0")}
            </motion.span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

export default TintShiftManifesto;