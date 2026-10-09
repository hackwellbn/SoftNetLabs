import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SoftNetHero from "./components/SoftNetHero";
import ProductBenefits from "./components/ProductBenefits";
import "./SoftNetHome.css";

const OUTCOMES = [
  {
    title: "Bring your idea to life.",
    description:
      "Turn an idea into something people can use. Launch with less setup in the way, then keep building as you grow.",
    action: "Start building",
    href: "https://netoracloud.com",
    theme: "create",
  },
  {
    title: "Feel more in control of your work.",
    description:
      "Spend less time piecing together daily operations and more time looking after your customers and growing your business.",
    action: "Make work flow",
    href: "https://netorawisp.com",
    theme: "control",
  },
  {
    title: "Find your people.",
    description:
      "Share what you love, follow friends and creators, join conversations, and discover something worth bringing home.",
    action: "Find your community",
    href: "https://patafast.com",
    theme: "connect",
  },
  {
    title: "Make time for what matters.",
    description:
      "Let routine tasks take up less of your day, so more of your attention goes to good ideas, good work, and the people around you.",
    action: "Make room in your day",
    href: "https://agentica.softnetkenya.com",
    theme: "time",
  },
];

const MORE = [
  { name: "PhotonConvert", note: "Convert files fast", href: "https://photonconvert.com" },
  { name: "SoftNetID", note: "One identity", href: "https://softnetkenya.com" },
  { name: "SoftNet Mail", note: "Email that works", href: "https://softnetkenya.com" },
];

function CtaArt() {
  return (
    <svg viewBox="0 0 360 200" role="img" aria-label="Decorative ribbon">
      <defs>
        <linearGradient id="sn-g3" x1="0" x2="1">
          <stop offset="0" stopColor="#fa4e8a" />
          <stop offset=".55" stopColor="#ec4be6" />
          <stop offset="1" stopColor="#462fd6" />
        </linearGradient>
        <filter id="sn-s3">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>
      <rect className="o" x="2" y="30" width="356" height="140" rx="70" />
      <circle className="o" cx="72" cy="100" r="40" />
      <circle className="o" cx="288" cy="100" r="40" />
      <path
        d="M40 140C100 40 150 170 200 100S270 40 320 70"
        fill="none"
        stroke="url(#sn-g3)"
        strokeWidth="28"
        strokeLinecap="round"
        filter="url(#sn-s3)"
      />
    </svg>
  );
}

function Home() {
  return (
    <div className="sn-home">
      <SoftNetHero />

      <section id="products" className="sn-outcomes">
        <div className="wrap">
          <div className="head">
            <h2>More time for the things that move you forward.</h2>
            <p>Make space to create, connect, and get on with the work that matters to you.</p>
          </div>
          <div className="sn-outcomes-list">
            {OUTCOMES.map(({ title, description, action, href, theme }) => (
              <div className="sn-outcome-row" key={theme}>
                <h3>{title}</h3>
                <p>{description}</p>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <span>{action}</span>
                  <ArrowUpRight aria-hidden="true" size={19} strokeWidth={1.8} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProductBenefits />

      <section id="more">
        <div className="wrap">
          <div className="head">
            <h2>more to open</h2>
            <p>Extra tools when you need them.</p>
          </div>
          <div className="chips">
            {MORE.map((item) => (
              <a key={item.name} className="chip" href={item.href} target="_blank" rel="noopener noreferrer">
                <i />
                <span>
                  {item.name}
                  <small>{item.note}</small>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap cta">
          <div>
            <h2>ready when you are</h2>
            <p>Have a question about a product? Send it through.</p>
            <Link className="btn btn-b" to="/contact">
              Talk to us
            </Link>
          </div>
          <CtaArt />
        </div>
      </section>
    </div>
  );
}

export default Home;
