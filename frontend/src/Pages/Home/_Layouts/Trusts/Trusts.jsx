// everyday-value · Built for SoftNet
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Sparkle,
  Mail,
  BriefcaseBusiness,
  BookOpen,
  UsersRound,
} from "lucide-react";
import "./Trust.css";

/* The heading stands still on the left while the cards arrive one after
   another on the right. The content focuses on things people actually need
   to do in everyday life, rather than explaining the technology itself. */

const ease = [0.22, 1, 0.36, 1];

/* Each card represents a practical part of everyday digital life. The cards
   answer a simple question: "How can this help me?" */

const CARDS = [
  {
    tag: "for your day",
    title: "Stay on top of your work",
    body: "Keep your messages, tasks, files and plans organized so you can spend less time looking for things and more time getting them done.",
    icon: BriefcaseBusiness,
  },
  {
    tag: "for your communication",
    title: "Keep in touch",
    body: "Send and receive the messages that matter, stay connected with the people around you, and keep important conversations easy to find.",
    icon: Mail,
  },
  {
    tag: "for your learning",
    title: "Understand something new",
    body: "Find information, ask questions, explore ideas and turn something unfamiliar into knowledge you can actually use.",
    icon: BookOpen,
  },
  {
    tag: "for your community",
    title: "Do more together",
    body: "Share ideas, coordinate plans and work with other people to solve everyday problems and move things forward together.",
    icon: UsersRound,
  },
];

export function StackedValueCards() {
  const reduce = useReducedMotion();
  const reduced = !!reduce;

  return (
    <section className="svc-section">
      <div className="svc-container">
        <div className="svc-left">
          <motion.span
            className="svc-eyebrow"
            initial={
              reduced
                ? false
                : { opacity: 0, y: 10 }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              ease,
            }}
          >
            <Sparkle
              className="svc-eyebrow-icon"
              strokeWidth={2}
            />
            Everyday life
          </motion.span>

          <motion.h2
            className="svc-heading"
            initial={
              reduced
                ? false
                : { opacity: 0, y: 18 }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
              delay: 0.06,
              ease,
            }}
          >
            Technology should
            <br />
            make life
            <br />
            <span className="svc-heading-muted">
              a little easier
            </span>
          </motion.h2>

          <motion.p
            className="svc-description"
            initial={
              reduced
                ? false
                : { opacity: 0, y: 16 }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
              delay: 0.12,
              ease,
            }}
          >
            From staying connected to getting work done,
            learning something new, or working with other
            people, digital tools should help with the
            things that matter in your everyday life.
          </motion.p>

          <motion.span
            className="svc-cta"
            initial={
              reduced
                ? false
                : { opacity: 0 }
            }
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease,
            }}
          >
            See what you can do
            <span className="svc-cta-icon">
              <ArrowUpRight
                className="svc-cta-icon-svg"
                strokeWidth={2}
              />
            </span>
          </motion.span>
        </div>

        <div className="svc-cards">
          {CARDS.map((c, i) => (
            <motion.article
              key={c.title}
              className="svc-card"
              initial={
                reduced
                  ? false
                  : { opacity: 0, y: 22 }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin: "-60px",
              }}
              transition={{
                duration: 0.7,
                delay: i * 0.07,
                ease,
              }}
            >
              <div className="svc-card-inner">
                <div className="svc-card-text">
                  <span className="svc-card-tag">
                    {c.tag}
                  </span>

                  <h3 className="svc-card-title">
                    {c.title}
                  </h3>

                  <p className="svc-card-body">
                    {c.body}
                  </p>
                </div>

                <span
                  aria-hidden
                  className="svc-card-icon"
                >
                  <c.icon
                    className="svc-card-icon-svg"
                    strokeWidth={1.75}
                  />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StackedValueCards;