import React from "react";
import "./Display.css";
import { assets } from "../../../../assets/assets";
import { Link } from "react-router-dom";

const Display = () => {
  return (
    <section className="display">
      <div className="container">
        <div className="display-intro">
          <h1>We bring the cloud closer to you</h1>
          <p className="sub-header">
            We give you the tools to build your own cloud and innovate widely in
            technology.
          </p>
        </div>

        <div className="cards_display">
          <div className="card_display image-side">
            <div className="screenshot-wrapper">
              <img src={assets.screenShot} alt="Netora Cloud Interface" />
              <div className="screenshot-glow"></div>
            </div>
          </div>

          <div className="card_display text-side">
            <div className="product-label">
              <span className="dot"></span> Infrastructure as a Service
            </div>
            <h2>NetoraCloud</h2>
            <p>
              Deploy faster, scale effortlessly, and build with confidence.
              NetoraCloud provides the infrastructure you need to turn your
              ideas into reality.
            </p>

            <div className="btns">
              <Link to='https://netoracloud.com/dashboard' className="btn">Deploy now!</Link>
              <Link to='https://netoracloud.com' className="_btn">Learn more</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Display;