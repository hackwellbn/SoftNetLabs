import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../../Auth/AuthContext";
import "./SoftNetHero.css";

const PRODUCTS = [
  {
    name: "NetoraCloud",
    title: "Your work, ready when you are.",
    eyebrow: "01 / BUILD WITH CONFIDENCE",
    href: "https://netoracloud.com",
    color: "#fa4e8a",
    x: 260,
    y: 90,
    description:
      "Deploy your applications and manage cloud infrastructure from one place, so you can ship confidently without getting buried in server setup.",
    action: "Deploy your next project",
    icon: <path d="M7 18a4 4 0 010-8 5.5 5.5 0 0110.6 1.2A3.4 3.4 0 0117 18z" />,
  },
  {
    name: "Netora WISP",
    title: "Run your internet business with confidence.",
    eyebrow: "02 / BUILT FOR INTERNET SERVICE PROVIDERS",
    href: "https://netorawisp.com",
    color: "#ec4be6",
    x: 421.7,
    y: 207.5,
    description:
      "Manage hotspots, clients, and day-to-day ISP operations in one place—with software built for the people keeping customers connected.",
    action: "Manage your ISP business",
    icon: (
      <>
        <path d="M2.5 9.5a14 14 0 0119 0" />
        <path d="M5.5 13a9.5 9.5 0 0113 0" />
        <path d="M8.7 16.3a5 5 0 016.6 0" />
        <circle cx="12" cy="19.4" r="1" fill="currentColor" />
      </>
    ),
  },
  {
    name: "PataFast",
    title: "Find what you need. Share what you have.",
    eyebrow: "03 / MAKE EVERYDAY EASIER",
    href: "https://patafast.com",
    color: "#a846ea",
    x: 359.9,
    y: 397.5,
    description:
      "Post, watch, and hang out with your people. Follow friends and creators, make a Mapple, join a conversation, and shop or sell whenever you feel like it.",
    action: "Find your people",
    icon: (
      <>
        <path d="M5 8h14l-1 12H6z" />
        <path d="M9 8a3 3 0 016 0" />
      </>
    ),
  },
  {
    name: "Studios",
    title: "Stories worth staying for.",
    eyebrow: "04 / MAKE TIME TO ENJOY",
    href: "https://studios.softnetkenya.com",
    color: "#462fd6",
    x: 160.1,
    y: 397.5,
    description:
      "Settle in with original videos and entertainment made to bring fresh ideas and enjoyable moments to your screen.",
    action: "Explore something to watch",
    light: true,
    icon: (
      <>
        <rect x="3" y="5.5" width="18" height="13" rx="3" />
        <path d="M10.5 9.5v5l4.2-2.5z" />
      </>
    ),
  },
  {
    name: "Agentica",
    title: "Make more room for meaningful work.",
    eyebrow: "05 / GIVE YOUR TIME BACK",
    href: "https://agentica.softnetkenya.com",
    color: "#bfc7ff",
    x: 98.3,
    y: 207.5,
    description:
      "Let AI take repetitive tasks off your plate, giving you and your team more time for people, ideas, and decisions.",
    action: "Make time for what matters",
    icon: (
      <>
        <path d="M11 3.5l1.7 5L17.5 10l-4.8 1.6L11 16.5 9.3 11.6 4.5 10l4.8-1.5z" />
        <path d="M18 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" />
      </>
    ),
  },
];

const PANELS = [
  {
    eyebrow: null,
    title: "Make room for what matters.",
    description:
      "Spend less time juggling the tools behind your work and more time growing, connecting, and bringing ideas to life.",
  },
  ...PRODUCTS.map((product, index) => ({
    ...product,
    number: `0${index + 1} / 05`,
  })),
];

function ProductOrbit({ activeIndex, rotation }) {
  return (
    <svg
      className="sn-hero-art"
      viewBox="0 0 520 520"
      role="group"
      aria-label="SoftNet's five products connected around one identity"
    >
      <defs>
        <linearGradient id="sn-hero-art-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fa4e8a" />
          <stop offset=".5" stopColor="#a846ea" />
          <stop offset="1" stopColor="#462fd6" />
        </linearGradient>
        <filter id="sn-hero-art-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="20" />
        </filter>
      </defs>

      <circle className="sn-hero-ring" cx="260" cy="260" r="236" />
      <circle
        className="sn-hero-ring sn-hero-ring-dashed"
        cx="260"
        cy="260"
        r="104"
        style={{ transform: `rotate(${rotation * 0.5}deg)` }}
      />
      <circle className="sn-hero-ring" cx="260" cy="260" r="170" />
      <g
        className="sn-hero-spokes"
        aria-hidden="true"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <line x1="260" y1="198" x2="260" y2="128" />
        <line x1="319" y1="240.8" x2="385.5" y2="219.2" />
        <line x1="296.4" y1="310.2" x2="337.6" y2="366.8" />
        <line x1="223.6" y1="310.2" x2="182.4" y2="366.8" />
        <line x1="201" y1="240.8" x2="134.5" y2="219.2" />
      </g>

      <circle
        className="sn-hero-glow"
        cx="260"
        cy="260"
        r="78"
        fill="url(#sn-hero-art-gradient)"
        filter="url(#sn-hero-art-glow)"
        aria-hidden="true"
      />
      <circle
        className="sn-hero-halo"
        cx="260"
        cy="260"
        r="78"
        fill={activeIndex ? PRODUCTS[activeIndex - 1].color : "url(#sn-hero-art-gradient)"}
        filter="url(#sn-hero-art-glow)"
        opacity=".5"
        aria-hidden="true"
      />
      <g className="sn-hero-core">
        <circle cx="260" cy="260" r="60" />
      </g>

      <g
        className="sn-hero-orbit"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {PRODUCTS.map((product, index) => (
          <g
            className="sn-hero-node-counter"
            key={product.name}
            style={{
              transform: `rotate(${-rotation}deg)`,
              transformOrigin: `${product.x}px ${product.y}px`,
            }}
          >
            <g className="sn-hero-pop" style={{ "--node-index": index }}>
              <a
                className={activeIndex === index + 1 ? "is-active" : ""}
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={product.name}
              >
                <circle className="sn-hero-hit" cx={product.x} cy={product.y} r="44" />
                <circle
                  className="sn-hero-node"
                  cx={product.x}
                  cy={product.y}
                  r="36"
                  fill={product.color}
                />
                <g
                  className={`sn-hero-icon${product.light ? " is-light" : ""}`}
                  transform={`translate(${product.x - 18} ${product.y - 18}) scale(1.5)`}
                >
                  {product.icon}
                </g>
                <text className="sn-hero-product-name" x={product.x} y={product.y + 62}>
                  {product.name}
                </text>
              </a>
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
}

ProductOrbit.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  rotation: PropTypes.number.isRequired,
};

export default function SoftNetHero() {
  const { user, loading, signup } = useAuth();
  const scrollerRef = useRef(null);
  const heroRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("sn-hero-scroll-enabled");

    let frame = 0;
    let currentIndex = -1;
    const liveRegion = document.getElementById("sn-hero-live");

    const update = () => {
      frame = 0;
      const scroller = scrollerRef.current;
      const hero = heroRef.current;
      if (!scroller || !hero) return;

      const navHeight = document.querySelector(".site-navbar")?.getBoundingClientRect().height ?? 0;
      root.style.setProperty("--sn-hero-nav-height", `${navHeight}px`);
      scroller.style.setProperty("--sn-hero-nav-height", `${navHeight}px`);
      const top = scroller.getBoundingClientRect().top;
      const max = Math.max(0, scroller.offsetHeight - hero.offsetHeight);
      const progress = max
        ? Math.max(0, Math.min(1, (navHeight - top) / max)) * (PANELS.length - 1)
        : 0;
      const nextRotation = -Math.max(0, Math.min(progress - 1, PRODUCTS.length - 1)) * 72;
      const nextIndex = Math.max(0, Math.min(PANELS.length - 1, Math.round(progress)));

      setRotation(nextRotation);
      setActiveIndex(nextIndex);

      if (nextIndex !== currentIndex) {
        currentIndex = nextIndex;
        if (liveRegion) {
          liveRegion.textContent =
            nextIndex > 0
              ? `${PRODUCTS[nextIndex - 1].name}, product ${nextIndex} of ${PRODUCTS.length}`
              : "SoftNet overview";
        }
      }
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const handleScroll = () => requestUpdate();
    const handleResize = () => requestUpdate();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    update();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (frame) window.cancelAnimationFrame(frame);
      root.classList.remove("sn-hero-scroll-enabled");
      root.style.removeProperty("--sn-hero-nav-height");
    };
  }, []);

  const goToPanel = (index) => {
    const scroller = scrollerRef.current;
    const hero = heroRef.current;
    if (!scroller || !hero) return;

    const navHeight = document.querySelector(".site-navbar")?.getBoundingClientRect().height ?? 0;
    const top = scroller.getBoundingClientRect().top;
    const max = Math.max(0, scroller.offsetHeight - hero.offsetHeight);
    const destination =
      window.scrollY + top - navHeight + (index / (PANELS.length - 1)) * max;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: destination, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <>
      <div className="sn-hero-scroller" ref={scrollerRef}>
        {PANELS.map((panel, index) => (
          <span
            className="sn-hero-snap"
            key={panel.title ?? "overview"}
            style={{ "--panel-index": index }}
            aria-hidden="true"
          />
        ))}
        <header className={`sn-hero${activeIndex ? " is-focused" : ""}`} ref={heroRef}>
          <div className="wrap sn-hero-shell">
            <div className="sn-hero-copy">
              <div className="sn-hero-stage" aria-live="off">
                {PANELS.map((panel, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <div
                      className={`sn-hero-panel${isActive ? " is-active" : ""}`}
                      key={panel.title ?? "overview"}
                      aria-hidden={!isActive}
                      inert={!isActive ? "" : undefined}
                    >
                      {index === 0 ? (
                        <>
                          <h1 className="sn-hero-rise" style={{ "--rise-delay": "0.05s" }}>
                            {panel.title}
                          </h1>
                          <p className="sn-hero-lede sn-hero-rise" style={{ "--rise-delay": "0.2s" }}>
                            {panel.description}
                          </p>
                          <div className="sn-hero-actions sn-hero-rise" style={{ "--rise-delay": "0.32s" }}>
                            <a className="btn btn-b" href="#products">
                              Explore products
                            </a>
                            {!loading && !user ? (
                              <button type="button" className="btn btn-k" onClick={signup}>
                                Create a SoftNet Account
                              </button>
                            ) : (
                              <a className="btn btn-k" href="#benefits">
                                See what you get
                              </a>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="sn-hero-eyebrow">{panel.eyebrow}</p>
                          <h2>{panel.title}</h2>
                          <p className="sn-hero-lede">{panel.description}</p>
                          <div className="sn-hero-actions">
                            <a
                              className="btn btn-b"
                              href={panel.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {panel.action}
                            </a>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="sn-hero-steps" role="group" aria-label="Choose a product">
                {PANELS.map((panel, index) => (
                  <button
                    className="sn-hero-step"
                    key={panel.title ?? "overview"}
                    type="button"
                    style={{ "--step-color": panel.color ?? "transparent" }}
                    aria-label={panel.title ?? "Overview"}
                    aria-current={activeIndex === index ? "true" : undefined}
                    onClick={() => goToPanel(index)}
                  />
                ))}
              </div>
            </div>

            <div className="sn-hero-visual">
              <ProductOrbit
                activeIndex={activeIndex}
                rotation={rotation}
              />
            </div>
          </div>

          <nav className="sn-hero-rail" aria-label="SoftNet products">
            <div className="wrap sn-hero-rail-inner">
              <b>products</b>
              <ul>
                {PRODUCTS.map((product, index) => (
                  <li className={activeIndex === index + 1 ? "is-active" : ""} key={product.name}>
                    <a href={product.href} target="_blank" rel="noopener noreferrer">
                      <i style={{ backgroundColor: product.color }} aria-hidden="true" />
                      {product.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </header>
      </div>
      <p id="sn-hero-live" className="sn-hero-visually-hidden" aria-live="polite" />
    </>
  );
}
