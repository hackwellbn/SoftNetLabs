// LiftedStepDeck · Built with Systra Tools — https://systra.tools
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Layers, Search, PenTool, Code2, Rocket } from "lucide-react";
import Reveal from "../../components/common/Reveal";
import "./snapshot.css";

/* Four steps, and the one you are looking at stands up.

   At rest all four cards are the same: a big pale number at the top, a small
   icon and a two word label at the foot, grey on a slightly lighter grey.
   Nothing is preselected, because a process where one step is already the
   answer tells the reader what to think before they have read the other three.

   Hovering a card lifts it out of the row. It grows upwards, turns white, a
   soft brand-gradient panel opens in the space that appears above the label,
   and the sentence that explains the step unfolds underneath. The card
   underneath keeps its height, so the row never moves: the growing card is
   positioned out of the flow and rises into the air above it.

   The gradient panel has no frame. A soft mask lets it run out into the card
   on every side, so it reads as a surface rather than a tile pasted onto it.
   Each step gets its own two-stop slice of the logo's arch (magenta, coral,
   indigo), never all three at once on a single card — the mark is present,
   not repeated in full.

   Behind the raised card a faint ruled grid fades in. It gives the card a
   floor to stand on without drawing a shadow, which is the other way to do
   this and the one that makes it look pasted.

   On a phone there is no hover and no room to grow. A tap opens the panel in
   place, the card keeps its height, and the sentence stays folded away.

   This is Softnet's real four-step delivery process — the steps that sit
   behind Agentica, Netora Cloud, NetoraWisp, PhotonConvert, Patafast and
   Softnet Studios. */

const ease = [0.22, 1, 0.36, 1];

/* The soft mask that lets the picture run out into the card on every side. It stands here
   once because it is needed in two places. */
const IMAGEMASK =
  "radial-gradient(74% 70% at 50% 46%, #000 30%, rgba(0,0,0,0.35) 72%, transparent 100%)";

const LATTICE = {
  backgroundImage:
    "linear-gradient(to right, rgba(21,26,24,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(21,26,24,0.07) 1px, transparent 1px)",
  backgroundSize: "34px 34px",
  maskImage: "radial-gradient(70% 60% at 50% 55%, #000 30%, transparent 100%)",
  WebkitMaskImage: "radial-gradient(70% 60% at 50% 55%, #000 30%, transparent 100%)",
};

const STEPS = [
  {
    number: "01.",
    title: "Discover",
    Icon: Search,
    gradient: ["var(--brand-magenta)", "var(--brand-coral)"],
    text: "We sit with your team, map the workflow that's actually slowing things down, and scope a build around that — not a slide deck.",
  },
  {
    number: "02.",
    title: "Design",
    Icon: PenTool,
    gradient: ["var(--brand-coral)", "var(--brand-indigo)"],
    text: "Architecture, data model and interface get worked out together, so the product still holds up once real users and real load show up.",
  },
  {
    number: "03.",
    title: "Build",
    Icon: Code2,
    gradient: ["var(--brand-indigo)", "var(--brand-magenta)"],
    text: "Engineers ship in short, reviewable cycles across web, mobile and infrastructure — the same discipline whether it's an app or a cloud platform.",
  },
  {
    number: "04.",
    title: "Launch",
    Icon: Rocket,
    gradient: ["var(--brand-magenta)", "var(--brand-indigo)"],
    text: "We deploy, monitor and hand over a system your team can actually run — documented, tested, and built to grow past day one.",
  },
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function LiftedStepDeck() {
  const reduce = useReducedMotion();
  const reduced = !!reduce;
  const [open, setOpen] = useState(null);

  return (
    <section className="snapshot-section">
      <div className="snapshot-container">
        <div className="snapshot-header">
          <div className="snapshot-header-left">
            <motion.span
              className="snapshot-kicker"
              initial={reduced ? { opacity: 0 } : { opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease }}
            >
              <Layers className="snapshot-kicker-icon" strokeWidth={2} />
              The Softnet Method
            </motion.span>

            <h2 className="snapshot-title">
              <motion.span
                className="snapshot-title-line-wrap"
                initial={reduced ? { opacity: 0 } : { opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.75, ease, delay: reduced ? 0 : 0.08 }}
              >
                {/* A pale box behind the first line that only draws up once the line has
                    settled. No negative z: that would have put it behind the ground of
                    the section. */}
                <motion.span
                  aria-hidden
                  className="snapshot-title-highlight"
                  initial={reduced ? { opacity: 0 } : { scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, ease, delay: reduced ? 0 : 0.34 }}
                />
                <span className="snapshot-title-line">We build products</span>
              </motion.span>
              <motion.span
                className="snapshot-title-accent"
                initial={reduced ? { opacity: 0 } : { opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.75, ease, delay: reduced ? 0 : 0.16 }}
              >
                that solve real problems.
              </motion.span>
            </h2>
          </div>

          <div className="snapshot-header-right">
            <motion.p
              className="snapshot-subtitle"
              initial={reduced ? { opacity: 0 } : { opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, ease, delay: reduced ? 0 : 0.12 }}
            >
              A community finding each other on a marketplace. A business running its network
              without the guesswork. Someone converting a file without making an account. Different
              scale, same job: build the thing that actually solves it.
            </motion.p>
            <motion.button
              type="button"
              className="snapshot-cta"
              initial={reduced ? { opacity: 0 } : { opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, ease, delay: reduced ? 0 : 0.2 }}
            >
              See our work
              <ArrowUpRight className="snapshot-cta-icon" strokeWidth={2} />
            </motion.button>
          </div>
        </div>

        {/* The row. Every cell keeps its resting height so the row does not jump when a
            card stands up; the extra margin at the top holds the space the card grows
            into. */}
        <div className="snapshot-steps-grid">
          {STEPS.map((step, i) => (
            <StepCard
              key={step.number}
              step={step}
              reduced={reduced}
              awake={open === step.number}
              setOpen={setOpen}
              beat={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, reduced, awake, setOpen, beat }) {
  /* Size and colour run through CSS and not through framer-motion: that way the values per
     breakpoint stand directly in the stylesheet, and on a phone the card does not grow at all. */
  const smooth = reduced ? "no-motion" : "step-transition";

  return (
    <div className="step-cell">
      {/* The floor under the standing card. */}
      <div
        aria-hidden
        className={cx("step-floor", awake && "step-floor--awake", reduced && "no-motion")}
        style={LATTICE}
      />

      <motion.article
        className={cx("step-card", smooth, awake ? "step-card--awake" : "step-card--resting")}
        onMouseEnter={() => setOpen(step.number)}
        onMouseLeave={() => setOpen(null)}
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease, delay: reduced ? 0 : 0.28 + beat * 0.08 }}
      >
        {/* The large number belongs to the resting state. Once the card stands, the
            number moves onto the picture as a small plate, so the step stays readable
            without taking half the photo. */}
        <span
          className={cx(
            "step-number",
            reduced && "no-motion",
            awake ? "step-number--hidden" : "step-number--visible"
          )}
        >
          {step.number}
        </span>

        <div
          className={cx(
            "step-image-wrap",
            smooth,
            awake ? "step-image-wrap--awake" : "step-image-wrap--resting"
          )}
        >
          <span className="step-badge">{step.number}</span>
          <div
            className="step-visual"
            aria-hidden
            style={{
              backgroundImage: `linear-gradient(135deg, ${step.gradient[0]}, ${step.gradient[1]})`,
              maskImage: IMAGEMASK,
              WebkitMaskImage: IMAGEMASK,
            }}
          >
            <step.Icon className="step-visual-icon" strokeWidth={1.1} />
          </div>
        </div>

        <span
          className={cx(
            "step-icon-badge",
            reduced ? "no-motion" : "step-icon-transition",
            awake ? "step-icon-badge--awake" : "step-icon-badge--resting"
          )}
        >
          <step.Icon className="step-icon" strokeWidth={1.8} />
        </span>
        <h3 className={cx("step-title", smooth, awake && "step-title--awake")}>{step.title}</h3>

        {/* The sentence about the step. On a phone it stays closed: the card does not
            grow there, and a paragraph would break off below the edge. */}
        <div
          className={cx(
            "step-text-wrap",
            smooth,
            awake ? "step-text-wrap--awake" : "step-text-wrap--resting"
          )}
        >
          <p className="step-text">{step.text}</p>
        </div>
      </motion.article>
    </div>
  );
}

const CAPABILITIES = [
  { category: "Engine", title: "Software & platform engineering" },
  { category: "Logic", title: "AI & data-driven systems" },
  { category: "Interface", title: "Digital products & experiences" },
  { category: "Growth", title: "Education & innovation" },
];

export function CapabilitiesMatrix() {
  return (
    <section className="snapshot">
      <div className="container">
        <div className="snapshot-top">
          <Reveal>
            <h2 className="glitch-text">
              High-Performance <br />
              Engineering.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="snapshot-text">
              We specialize in the end-to-end delivery of resilient digital infrastructure.
              Our focus is on precision, scalability, and technical excellence.
            </p>
          </Reveal>
        </div>

        <div className="snapshot-matrix">
          {CAPABILITIES.map((item, i) => (
            <Reveal key={item.title} delay={0.15 + i * 0.1}>
              <div className="matrix-item">
                <div className="matrix-bg-num">0{i + 1}</div>
                <div className="matrix-content">
                  <span className="matrix-cat">[{item.category}]</span>
                  <h3 className="matrix-title">{item.title}</h3>
                  <div className="matrix-status">
                    <span className="status-dot"></span> Active Domain
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Snapshot() {
  return (
    <>
      <LiftedStepDeck />
      <CapabilitiesMatrix />
    </>
  );
}

export default Snapshot;