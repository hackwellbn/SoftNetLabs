// agentica · Built with Systra Tools — https://systra.tools
import "./Agentica.css";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  ArrowUp,
  Users,
  Workflow,
  Search,
  Plug,
  ClipboardList,
  ShieldCheck,
  ChevronRight,
  MessageSquare,
} from "lucide-react";
import {assets} from '../../../../assets/assets'
const ease = [0.2, 0.8, 0.2, 1];

const BG_IMAGE = assets.agentica;
const PROMPT = "We need to automate support tickets and sync data with our CRM.";

// The compact demo on the left: a representative slice of what Agentica
// resolves a plain-language brief into, not the full capability list.
const demoRows = [
  { icon: Users, title: "Multi-Agent Collaboration", sub: "Agents coordinating on the task", dark: true },
  { icon: Workflow, title: "Workflow Automation", sub: "Repetitive processes automated" },
  { icon: Plug, title: "Business Integrations", sub: "CRM and tools connected" },
  { icon: ShieldCheck, title: "Enterprise Security", sub: "Role-based access applied" },
];

// The full capability set, written out beside the copy.
const features = [
  {
    icon: Users,
    title: "Multi-Agent Collaboration",
    desc: "Multiple AI agents working together to complete complex tasks.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    desc: "Automate repetitive business processes across departments.",
  },
  {
    icon: Search,
    title: "Knowledge Search",
    desc: "Find answers instantly from company documents and data.",
  },
  {
    icon: Plug,
    title: "Business Integrations",
    desc: "Connect CRMs, ERPs, email, cloud storage, APIs, and internal systems.",
  },
  {
    icon: ClipboardList,
    title: "AI Task Execution",
    desc: "Allow AI agents to plan, execute, monitor, and report on business tasks.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    desc: "Role-based access, audit logs, and secure enterprise deployments.",
  },
];

/**
 * AI intake: describe it in your own words, the assistant types the request,
 * thinks for a moment and resolves it into recognised capabilities. Cards
 * with fine glass edges on a soft image background, one accent colour,
 * reduced motion shows the end state.
 */
export function Agentica() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [phase, setPhase] = useState("idle");
  const [typed, setTyped] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (reduce) {
      setTyped(PROMPT.length);
      setPhase("done");
      return;
    }
    /* Start once only. Do not depend on `phase`, or the cleanup will clear its own
       timers on the first setState. */
    if (!inView || startedRef.current) return;
    startedRef.current = true;
    const timers = [];
    setPhase("typing");
    let i = 0;
    const type = () => {
      i += 1;
      setTyped(i);
      if (i < PROMPT.length) {
        timers.push(setTimeout(type, 55));
      } else {
        timers.push(
          setTimeout(() => {
            setPhase("loading");
            timers.push(setTimeout(() => setPhase("done"), 1900));
          }, 350),
        );
      }
    };
    timers.push(setTimeout(type, 700));
    return () => timers.forEach(clearTimeout);
  }, [inView, reduce]);

  return (
    <section className="agx">
      <div className="agx__grid">
        {/* Image and demo card */}
        <div ref={ref} className="agx__media">
          <motion.img
            src={BG_IMAGE}
            alt=""
            loading="lazy"
            draggable={false}
            className="agx__bg-img"
            initial={reduce ? false : { scale: 1.12 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.8, ease }}
          />
          <div className="agx__scrim" />

          <div className="agx__panel-wrap">
            {/* Prompt row with a glass edge */}
            <div className="agx__prompt-outer">
              <div className="agx__prompt-inner">
                <p className="agx__prompt-text">
                  {phase === "idle" ? "" : PROMPT.slice(0, typed)}
                  {phase === "typing" && (
                    <motion.span
                      className="agx__caret"
                      aria-hidden
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      &nbsp;
                    </motion.span>
                  )}
                </p>
                <span className="agx__prompt-submit">
                  <ArrowUp className="agx__icon-sm" strokeWidth={1.8} />
                </span>
              </div>
            </div>

            {/* Result panel with a glass edge */}
            <motion.div
              className="agx__result"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={
                phase === "loading" || phase === "done"
                  ? { opacity: 1, y: 0 }
                  : reduce
                    ? { opacity: 1, y: 0 }
                    : {}
              }
              transition={{ duration: 0.6, ease }}
            >
              <div className="agx__result-inner">
                <div className="agx__result-header">
                  <h3 className="agx__result-title">Detected capabilities</h3>
                </div>

                <div className="agx__result-body">
                  {phase === "loading" && (
                    <div className="agx__loading">
                      <span className="agx__progress-track">
                        <motion.span
                          className="agx__progress-fill"
                          animate={{ x: ["-100%", "250%"] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </span>
                      {[0, 0.18, 0.36].map((d) => (
                        <div key={d} className="agx__skeleton-row">
                          <motion.span
                            className="agx__skeleton-circle"
                            animate={{ opacity: [0.45, 1, 0.45] }}
                            transition={{
                              duration: 1.5,
                              delay: d,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                          <span className="agx__skeleton-lines">
                            <motion.span
                              className="agx__skeleton-line-1"
                              animate={{ opacity: [0.45, 1, 0.45] }}
                              transition={{
                                duration: 1.5,
                                delay: d,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                            <motion.span
                              className="agx__skeleton-line-2"
                              animate={{ opacity: [0.45, 1, 0.45] }}
                              transition={{
                                duration: 1.5,
                                delay: d,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                          </span>
                        </div>
                      ))}
                      <span className="agx__reading">
                        <motion.span
                          className="agx__spinner"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                        />
                        Reading your brief
                      </span>
                    </div>
                  )}

                  {phase === "done" && (
                    <div className="agx__rows">
                      {demoRows.map((r, n) => {
                        const Icon = r.icon;
                        return (
                          <motion.div
                            key={r.title}
                            className="agx__row"
                            initial={reduce ? false : { opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 64 }}
                            transition={{ duration: 0.45, delay: reduce ? 0 : n * 0.34, ease }}
                          >
                            <span
                              className="agx__row-icon"
                              style={{
                                background: r.dark ? "#16181f" : "#ecebfa",
                                color: r.dark ? "#fff" : "#4b47c7",
                              }}
                            >
                              <Icon className="agx__icon-sm" strokeWidth={1.8} />
                            </span>
                            <div>
                              <strong className="agx__row-title">{r.title}</strong>
                              <span className="agx__row-sub">{r.sub}</span>
                            </div>
                            <ChevronRight className="agx__row-chevron" strokeWidth={1.8} />
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Text */}
        <div className="agx__text">
          <motion.span
            className="agx__eyebrow"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <Sparkles className="agx__icon-xs" strokeWidth={1.9} /> AI Platform / 08
          </motion.span>

          <motion.h2
            className="agx__heading"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.06, ease }}
          >
            Your Intelligent Workforce<span className="agx__heading-dot">.</span>
          </motion.h2>

          <motion.p
            className="agx__lede"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.12, ease }}
          >
            Agentica AI helps organizations automate operations, connect their systems,
            coordinate AI agents, and execute complex business workflows from one intelligent
            platform.
          </motion.p>

          <motion.p
            className="agx__lede agx__lede--second"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.16, ease }}
          >
            Agentica is more than a chatbot. It is an AI platform capable of reasoning,
            planning, integrating with your business tools, and executing tasks across
            multiple departments — from customer support and sales to operations and finance.
          </motion.p>

          <motion.div
            className="agx__features"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
          >
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div className="agx__feature" key={f.title}>
                  <span className="agx__feature-icon">
                    <Icon className="agx__icon-sm" strokeWidth={1.8} />
                  </span>
                  <span>
                    <span className="agx__feature-title">{f.title}</span>
                    <span className="agx__feature-desc">{f.desc}</span>
                  </span>
                </div>
              );
            })}
          </motion.div>

          <motion.div
            className="agx__cta-row"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.24, ease }}
          >
            <a
              href="https://agentica.softnetkenya.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="agx__cta"
            >
              Explore Agentica
              <span className="agx__cta-reveal">
                <MessageSquare className="agx__icon-sm" strokeWidth={1.8} />
              </span>
            </a>
            <span className="agx__badge">Coming Soon</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Agentica;