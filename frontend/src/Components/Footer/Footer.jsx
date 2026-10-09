import { Link } from "react-router-dom";
import SoftNetMark from "../SoftNetMark";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  const columns = [
    {
      title: "Products",
      links: [
        { label: "NetoraCloud", href: "https://netoracloud.com" },
        { label: "Netora WISP", href: "https://netorawisp.com" },
        { label: "PataFast", href: "https://patafast.com" },
        { label: "SoftNet Studios", href: "https://studios.softnetkenya.com" },
        { label: "SoftNetID", to: "/softnetid" },
        { label: "Agentica", href: "https://agentica.softnetkenya.com" },
        { label: "PhotonConvert", href: "https://photonconvert.com" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "https://about.softnetkenya.com" },
        { label: "Careers", href: "https://careers.softnetkenya.com" },
        { label: "Contact", to: "/contact" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help centre", href: "https://support.softnetkenya.com" },
        { label: "Partners", to: "/partners" },
        { label: "Terms", href: "https://about.softnetkenya.com" },
        { label: "Privacy", href: "https://about.softnetkenya.com" },
      ],
    },
  ];

  const renderLink = ({ label, to, href }) => {
    const anchor = href ? (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    ) : (
      <Link to={to}>{label}</Link>
    );
    return <li key={label}>{anchor}</li>;
  };

  return (
    <footer className="sn-footer" id="footer">
      <div className="sn-footer-wrap">
        <div className="sn-footer-grid">
          <div className="sn-footer-brand">
            <Link to="/" className="sn-footer-logo" aria-label="SoftNet home">
              <SoftNetMark className="sn-footer-mark" title="SoftNet" />
              softnet
            </Link>
            <p>
              NetoraCloud, Netora WISP, PataFast, SoftNet Studios, Agentica — open a product and see
              what you get.
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h4>{col.title}</h4>
              <ul>{col.links.map((link) => renderLink(link))}</ul>
            </nav>
          ))}
        </div>

        <div className="sn-footer-bottom">
          <span>© {year} SoftNet Kenya Inc. All rights reserved.</span>
          <span>Nairobi, Kenya</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
