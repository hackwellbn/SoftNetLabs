import ProductBenefitArt from "./ProductBenefitArt";
import "./ProductBenefits.css";

const BENEFITS = [
  {
    id: "netoracloud",
    name: "NetoraCloud",
    accent: "t-yel",
    href: "https://netoracloud.com",
    cta: "Open NetoraCloud",
    headline: "Deploy faster, scale effortlessly, and build with confidence.",
    body: "NetoraCloud gives you the infrastructure to turn ideas into running products — without waiting on servers, setup, or guesswork.",
    points: ["Spin up in minutes", "Scale when traffic hits", "Keep costs predictable"],
  },
  {
    id: "netorawisp",
    name: "Netora WISP",
    accent: "t-lime",
    href: "https://netorawisp.com",
    cta: "Open Netora WISP",
    headline: "Run your internet business without the guesswork.",
    body: "Netora WISP puts billing, provisioning, and network control in one place so you spend less time chasing tickets and more time growing coverage.",
    points: ["Bill and collect cleanly", "Provision without chaos", "See the network clearly"],
  },
  {
    id: "patafast",
    name: "PataFast",
    accent: "t-blue",
    href: "https://patafast.com",
    cta: "Open PataFast",
    headline: "Discover, create, share, sell and buy — in one fast feed.",
    body: "PataFast puts people, stories, and shops side by side so you can find what you need, post what you make, and sell without leaving the conversation.",
    points: ["Reach nearby buyers", "Post once, sell from it", "Shop as you scroll"],
  },
  {
    id: "studios",
    name: "SoftNet Studios",
    accent: "t-yel",
    href: "https://studios.softnetkenya.com",
    cta: "Open SoftNet Studios",
    headline: "Go live with tools built for the show, not the setup.",
    body: "SoftNet Studios helps you produce and ship live media with less friction — so your audience sees the stream, not the scramble behind it.",
    points: ["Produce without friction", "Look sharp on air", "Ship to your audience fast"],
  },
  {
    id: "agentica",
    name: "Agentica",
    accent: "t-lime",
    href: "https://agentica.softnetkenya.com",
    cta: "Open Agentica",
    headline: "Put work on autopilot — and keep the decisions yours.",
    body: "Agentica helps you automate the busy parts of your day so you get answers, drafts, and follow-through without losing control of the outcome.",
    points: ["Automate the busywork", "Decide with clearer signal", "Keep humans in charge"],
  },
];

export default function ProductBenefits() {
  return (
    <section id="benefits" className="sn-benefits" aria-label="What you get">
      {BENEFITS.map((item, index) => (
        <article
          key={item.id}
          id={item.id}
          className={`sn-benefit sn-benefit-${item.id} ${index % 2 === 1 ? "is-flip" : ""}`}
        >
          <div className="wrap sn-benefit-grid">
            <div className="sn-benefit-copy">
              <span className={`sn-benefit-tag ${item.accent}`}>{item.name}</span>
              <h2>{item.headline}</h2>
              <p>{item.body}</p>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <a className="btn btn-b" href={item.href} target="_blank" rel="noopener noreferrer">
                {item.cta}
              </a>
            </div>

            <div className="sn-benefit-visual">
              <ProductBenefitArt id={item.id} />
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
