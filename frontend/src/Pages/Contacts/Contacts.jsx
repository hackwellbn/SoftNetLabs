import { useState } from "react";
import { Helmet } from "react-helmet";
import "./Contacts.css";

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          access_key: "86aa729d-91f6-4ddb-947f-d24b55ec698a",
        }),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message.");
      }
    } catch {
      setStatus("Error sending message.");
    }
  };

  return (
    <div className="sn-contact">
      <Helmet>
        <title>Contact Us | SoftNet</title>
        <meta
          name="description"
          content="Talk to SoftNet about cloud, internet, media, AI and everyday apps for people, businesses and communities."
        />
        <meta property="og:title" content="Contact Us | SoftNet" />
        <meta
          property="og:description"
          content="Talk to SoftNet about cloud, internet, media, AI and everyday apps."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://softnetkenya.com/contact" />
      </Helmet>

      <div className="sn-contact-wrap">
        <div>
          <h1>talk to us</h1>
          <p className="sn-contact-lede">
            Questions about NetoraCloud, Netora WISP, PataFast, SoftNet Studios, or Agentica? Send
            them here.
          </p>
          <p className="sn-contact-meta">
            <a href="mailto:info@softnetinnovationlabs.com">info@softnetinnovationlabs.com</a>
          </p>
        </div>

        <form className="sn-contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="How can we help?"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Send message</button>
          {status ? <p className="status">{status}</p> : null}
        </form>
      </div>
    </div>
  );
};

export default Contacts;
