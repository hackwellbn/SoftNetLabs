import { useEffect, useRef, useState } from "react";
import "./SoftNetID.css";
import SoftNetIdHero from "./SoftNetIdHero";
import HowItWorks from "../SoftNetID/HowItworks/HowItworks";
/* ---------- logo sprite (SoftNet mark) ---------- */
const SPRITE = String.raw`<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs><linearGradient id="gl" gradientUnits="userSpaceOnUse" x1="237.7" y1="194.7" x2="173.6" y2="143.5"><stop offset="0.000" stop-color="#9143e9"/><stop offset="0.062" stop-color="#9143e9"/><stop offset="0.188" stop-color="#a846ea"/><stop offset="0.312" stop-color="#bf48e9"/><stop offset="0.438" stop-color="#d249e8"/><stop offset="0.562" stop-color="#dd49e9"/><stop offset="0.688" stop-color="#e64ae9"/><stop offset="0.812" stop-color="#eb4ae7"/><stop offset="0.938" stop-color="#ec4be6"/><stop offset="1.000" stop-color="#ec4be6"/></linearGradient><linearGradient id="gr" gradientUnits="userSpaceOnUse" x1="337.5" y1="235.8" x2="266.7" y2="106.7"><stop offset="0.000" stop-color="#462fd6"/><stop offset="0.062" stop-color="#462fd6"/><stop offset="0.188" stop-color="#5c31dc"/><stop offset="0.312" stop-color="#8135de"/><stop offset="0.438" stop-color="#a239da"/><stop offset="0.562" stop-color="#bc3dcd"/><stop offset="0.688" stop-color="#d541b6"/><stop offset="0.812" stop-color="#f24698"/><stop offset="0.938" stop-color="#fa4e8a"/><stop offset="1.000" stop-color="#fa4e8a"/></linearGradient><clipPath id="rc"><polygon points="255,117 268,106 280,100 292,97 330,80 360,260 255,260"/></clipPath></defs><symbol id="sn-mark" viewBox="150 90 200 162"><path d="M176.75 140.12C173.63 144.67 170.79 149.43 168.34 154.38C166.04 159.04 164.16 163.93 162.54 168.88C161.07 173.36 159.88 177.96 159.12 182.62C158.25 187.91 157.63 193.27 157.65 198.62C157.67 204.07 158.26 209.52 159.23 214.88C159.95 218.81 161.18 222.66 162.68 226.38C163.99 229.61 165.49 232.86 167.62 235.62C169.61 238.20 172.25 240.25 174.88 242.18C176.21 243.16 177.81 243.73 179.38 244.26C180.83 244.74 182.34 245.18 183.88 245.17C187.39 245.15 191.04 245.27 194.38 244.16C197.78 243.04 200.90 240.99 203.62 238.66C206.72 236.00 209.32 232.75 211.62 229.38C213.84 226.11 215.50 222.49 217.09 218.88C218.59 215.47 219.97 211.98 220.87 208.38C223.79 196.71 225.54 184.77 228.52 173.12C230.70 164.59 233.43 156.19 236.34 147.88C237.63 144.18 239.34 140.63 241.10 137.12C242.48 134.37 244.06 131.70 245.75 129.12C247.50 126.46 249.30 123.79 251.42 121.40C252.27 120.44 254.56 119.20 254.56 119.20C254.56 119.20 256.77 120.40 257.46 121.40C259.50 124.36 261.25 127.56 262.65 130.88C265.84 138.49 268.75 146.24 271.20 154.12C273.56 161.76 275.51 169.53 277.05 177.38C279.88 191.72 281.50 206.28 284.29 220.62C284.93 223.89 286.07 227.04 287.32 230.12C288.17 232.23 289.22 234.28 290.55 236.12C291.94 238.08 293.58 239.89 295.41 241.44C296.89 242.69 298.46 244.19 300.38 244.46C306.81 245.36 313.37 244.91 319.88 244.86C321.39 244.85 322.92 244.71 324.38 244.29C325.87 243.87 327.31 243.19 328.62 242.35C329.95 241.52 331.15 240.47 332.22 239.33C333.34 238.13 334.37 236.82 335.16 235.38C336.42 233.06 337.53 230.63 338.35 228.12C339.23 225.44 339.95 222.68 340.23 219.88C340.78 214.48 341.17 209.04 340.85 203.62C340.35 195.08 339.20 186.57 337.78 178.12C336.75 171.96 335.32 165.86 333.54 159.88C331.76 153.92 329.70 148.03 327.13 142.38C324.35 136.25 321.10 130.34 317.55 124.62C314.45 119.65 310.94 114.93 307.25 110.38C305.36 108.05 303.14 106.00 300.88 104.04C299.17 102.56 297.34 101.21 295.38 100.09C293.07 98.78 290.66 97.56 288.12 96.79C285.54 95.99 282.83 95.49 280.12 95.41C268.05 95.04 255.94 94.78 243.88 95.43C239.96 95.63 236.08 96.66 232.38 97.95C227.04 99.79 221.84 102.09 216.88 104.77C211.48 107.69 206.30 111.04 201.38 114.71C196.38 118.44 191.52 122.41 187.18 126.89C183.27 130.93 179.92 135.49 176.75 140.12Z" fill="url(#gl)" fill-rule="evenodd"/><g clip-path="url(#rc)"><path d="M176.75 140.12C173.63 144.67 170.79 149.43 168.34 154.38C166.04 159.04 164.16 163.93 162.54 168.88C161.07 173.36 159.88 177.96 159.12 182.62C158.25 187.91 157.63 193.27 157.65 198.62C157.67 204.07 158.26 209.52 159.23 214.88C159.95 218.81 161.18 222.66 162.68 226.38C163.99 229.61 165.49 232.86 167.62 235.62C169.61 238.20 172.25 240.25 174.88 242.18C176.21 243.16 177.81 243.73 179.38 244.26C180.83 244.74 182.34 245.18 183.88 245.17C187.39 245.15 191.04 245.27 194.38 244.16C197.78 243.04 200.90 240.99 203.62 238.66C206.72 236.00 209.32 232.75 211.62 229.38C213.84 226.11 215.50 222.49 217.09 218.88C218.59 215.47 219.97 211.98 220.87 208.38C223.79 196.71 225.54 184.77 228.52 173.12C230.70 164.59 233.43 156.19 236.34 147.88C237.63 144.18 239.34 140.63 241.10 137.12C242.48 134.37 244.06 131.70 245.75 129.12C247.50 126.46 249.30 123.79 251.42 121.40C252.27 120.44 254.56 119.20 254.56 119.20C254.56 119.20 256.77 120.40 257.46 121.40C259.50 124.36 261.25 127.56 262.65 130.88C265.84 138.49 268.75 146.24 271.20 154.12C273.56 161.76 275.51 169.53 277.05 177.38C279.88 191.72 281.50 206.28 284.29 220.62C284.93 223.89 286.07 227.04 287.32 230.12C288.17 232.23 289.22 234.28 290.55 236.12C291.94 238.08 293.58 239.89 295.41 241.44C296.89 242.69 298.46 244.19 300.38 244.46C306.81 245.36 313.37 244.91 319.88 244.86C321.39 244.85 322.92 244.71 324.38 244.29C325.87 243.87 327.31 243.19 328.62 242.35C329.95 241.52 331.15 240.47 332.22 239.33C333.34 238.13 334.37 236.82 335.16 235.38C336.42 233.06 337.53 230.63 338.35 228.12C339.23 225.44 339.95 222.68 340.23 219.88C340.78 214.48 341.17 209.04 340.85 203.62C340.35 195.08 339.20 186.57 337.78 178.12C336.75 171.96 335.32 165.86 333.54 159.88C331.76 153.92 329.70 148.03 327.13 142.38C324.35 136.25 321.10 130.34 317.55 124.62C314.45 119.65 310.94 114.93 307.25 110.38C305.36 108.05 303.14 106.00 300.88 104.04C299.17 102.56 297.34 101.21 295.38 100.09C293.07 98.78 290.66 97.56 288.12 96.79C285.54 95.99 282.83 95.49 280.12 95.41C268.05 95.04 255.94 94.78 243.88 95.43C239.96 95.63 236.08 96.66 232.38 97.95C227.04 99.79 221.84 102.09 216.88 104.77C211.48 107.69 206.30 111.04 201.38 114.71C196.38 118.44 191.52 122.41 187.18 126.89C183.27 130.93 179.92 135.49 176.75 140.12Z" fill="url(#gr)" fill-rule="evenodd"/></g></symbol></svg>`;

const Mark = ({ w = 200, h = 162 }) => (
  <svg viewBox="0 0 200 162" aria-hidden="true">
    <use href="#sn-mark" width={w} height={h} />
  </svg>
);

/* ---------- line icons ---------- */
const G = {
  mail: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3.5 7l8.5 6.5L20.5 7"/>',
  games: '<path d="M7 8h10a4.5 4.5 0 014.4 5.4l-.6 3A2.8 2.8 0 0115.7 17l-1.3-1.8H9.6L8.3 17a2.8 2.8 0 01-5.1-.6l-.6-3A4.5 4.5 0 017 8z"/><path d="M8.2 10.6v3.2M6.6 12.2h3.2"/><circle cx="15.2" cy="11.2" r=".6"/><circle cx="17.2" cy="13.2" r=".6"/>',
  rides: '<path d="M5 17l1.4-5.2A2 2 0 018.3 10.4h7.4a2 2 0 011.9 1.4L19 17"/><rect x="3.5" y="16.5" width="17" height="3.5" rx="1.2"/><circle cx="7.8" cy="14" r=".8"/><circle cx="16.2" cy="14" r=".8"/><path d="M7 20v1.5M17 20v1.5"/>',
  shop: '<path d="M5 8h14l-1 12H6z"/><path d="M9 8a3 3 0 016 0"/>',
  cloud: '<path d="M7 18a4 4 0 010-8 5.5 5.5 0 0110.6 1.2A3.4 3.4 0 0117 18z"/>',
  class: '<path d="M2.5 9L12 4.5 21.5 9 12 13.5z"/><path d="M6.5 11.5V16c0 1.4 2.5 3 5.5 3s5.5-1.6 5.5-3v-4.5"/><path d="M21.5 9v5"/>',
  pay: '<path d="M4 8h14a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2z"/><path d="M4 8l11-3.5V8"/><circle cx="16.3" cy="14" r="1.1"/>',
  work: '<rect x="3" y="8" width="18" height="12" rx="2"/><path d="M9 8V6.2A1.7 1.7 0 0110.7 4.5h2.6A1.7 1.7 0 0115 6.2V8"/><path d="M3 13.5h18"/>',
  bank: '<path d="M3 9.5L12 4l9 5.5"/><path d="M5.5 10.5v7M9.8 10.5v7M14.2 10.5v7M18.5 10.5v7"/><path d="M3.5 20h17"/>',
  clinic: '<rect x="4" y="4" width="16" height="16" rx="3.5"/><path d="M12 8v8M8 12h8"/>',
  bills: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
  forms: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
};
const Icon = ({ k }) => (
  <svg className="ico" viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: G[k] }} />
);

/* ---------- data ---------- */

// x, y, icon, label, colour, rotation, delay, showsError
const DOORS = [
  [14, 17, "mail", "Mail", "#ec4be6", -6, 0, 0], [36, 14, "bank", "Bank", "#d6bcf9", 5, 0.6, 1],
  [60, 17, "shop", "Shop", "#fa4e8a", -4, 1.2, 0], [84, 18, "cloud", "Cloud", "#bfc7ff", 7, 0.3, 0],
  [12, 46, "class", "Class", "#fa4e8a", 5, 0.9, 0], [34, 44, "work", "Work", "#d6bcf9", -7, 1.5, 1],
  [58, 46, "clinic", "Clinic", "#ec4be6", 3, 0.2, 0], [82, 47, "bills", "Bills", "#bfc7ff", -5, 1.1, 0],
  [15, 76, "rides", "Rides", "#d6bcf9", -3, 0.5, 1], [38, 78, "forms", "Forms", "#fa4e8a", 6, 1.8, 0],
  [62, 76, "pay", "Pay", "#ec4be6", -5, 0.8, 0], [86, 77, "games", "Games", "#bfc7ff", 4, 1.4, 1],
];
const NOTES = [
  [30, 31, "Forgot password?", -6], [68, 31, "Verify your email", 4], [48, 61, "Fill in the form again", -3],
  [18, 62, "Create account", 5], [78, 62, "New password needed", -5],
];
const ICONS = [
  ["mail", "#ec4be6"], ["games", "#fa4e8a"], ["rides", "#d6bcf9"], ["shop", "#ec4be6"],
  ["cloud", "#bfc7ff"], ["class", "#fa4e8a"], ["pay", "#d6bcf9"], ["work", "#ec4be6"],
];
const ICON_POS = [[9, 22], [8, 40], [8, 58], [10, 76], [91, 22], [92, 40], [92, 58], [90, 76]];
const STEPS = [
  ["01", "Every day", "Your digital life should not feel like a collection of separate doors.",
    "Different services, different accounts, different passwords and different forms can turn simple tasks into unnecessary work. SoftNetID starts with making that experience simpler."],
  ["02", "One identity", "SoftNetID gives you one identity to use across the services that matter to you.",
    "Instead of repeatedly proving who you are, your identity can move with you. Less repetition means less time managing accounts and more time getting things done."],
  ["03", "With confidence", "A simpler digital experience should also help you feel more in control.",
    "SoftNetID is built around a clear, consistent way to access digital services — helping individuals spend less time thinking about identity and more time using the services they need."],
];

const smooth = (a, b, x) => {
  x = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return x * x * (3 - 2 * x);
};

/* ---------- page ---------- */
export default function SoftNetID() {
  /* scroll-driven story */
  const storyRef = useRef(null);
  const stageRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const st = storyRef.current;
    const stage = stageRef.current;
    let ci = -1;
    let tick = false;

    const scale = () =>
      stage.style.setProperty("--s", Math.max(0.55, Math.min(1.25, stage.clientWidth / 600)).toFixed(3));

    const upd = () => {
      tick = false;
      const r = st.getBoundingClientRect();
      const tot = r.height - window.innerHeight;
      const p = tot > 0 ? Math.min(1, Math.max(0, -r.top / tot)) : 0;
      const t = p * 2;
      stage.style.setProperty("--a", smooth(0.12, 0.88, t).toFixed(4));
      stage.style.setProperty("--b", smooth(1.12, 1.88, t).toFixed(4));
      st.style.setProperty("--p", p.toFixed(4));
      const i = t < 0.5 ? 0 : t < 1.5 ? 1 : 2;
      if (i !== ci) {
        ci = i;
        setActive(i);
      }
    };
    const req = () => {
      if (!tick) {
        tick = true;
        requestAnimationFrame(upd);
      }
    };
    const onResize = () => {
      scale();
      req();
    };
    window.addEventListener("scroll", req, { passive: true });
    window.addEventListener("resize", onResize);
    scale();
    upd();
    return () => {
      window.removeEventListener("scroll", req);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="sn js">
      <div dangerouslySetInnerHTML={{ __html: SPRITE }} />



      <main>
        <SoftNetIdHero />

        <section className="story" id="story" ref={storyRef} aria-label="How SoftNetID works">
          <div className="pin">
            <div className="copy">
              {STEPS.map((s, i) => (
                <div key={s[0]} className={"cp" + (i === active ? " on" : "")} data-i={i}>
                  <span className="num" aria-hidden="true">{s[0]}</span>
                  <span className="lbl">{s[1]}</span>
                  <h2>{s[2]}</h2>
                  <p>{s[3]}</p>
                </div>
              ))}
              <div className="cnt" aria-hidden="true">
                <span>0{active + 1} / 03</span>
                <span className="tr"><i /></span>
              </div>
            </div>

            <div className="stage" ref={stageRef} aria-hidden="true">
              <div className="glow" />
              <div>
                {DOORS.map((d) => (
                  <div key={d[3]} className="dr" style={{ "--x": d[0] + "%", "--y": d[1] + "%", "--r": d[5] + "deg", "--c": d[4], "--d": d[6] + "s" }}>
                    <div className="wn">
                      <div className="wh"><u><Icon k={d[2]} /></u>{d[3]}</div>
                      <i className="f" />
                      <i className="f p" />
                      {d[7] ? <span className="er">Wrong password</span> : null}
                      <i className="bt" />
                    </div>
                  </div>
                ))}
                {NOTES.map((n) => (
                  <span key={n[2]} className="note" style={{ "--x": n[0] + "%", "--y": n[1] + "%", "--r": n[3] + "deg" }}>{n[2]}</span>
                ))}
              </div>
              <div className="bw">
                <Mark />
                <div className="you">
                  <Icon k="user" />
                  <div className="ok"><Icon k="check" /></div>
                </div>
              </div>
              <div>
                {ICONS.map((k, i) => (
                  <div key={k[0]} className="ic" style={{ "--ix": ICON_POS[i][0] + "%", "--iy": ICON_POS[i][1] + "%", "--rx": (9 + 11.7 * i).toFixed(1) + "%", "--k": i, "--c": k[1] }}>
                    <Icon k={k[0]} />
                    <u><Icon k="check" /></u>
                  </div>
                ))}
              </div>
              <div className="cap">One sign-in. Every service.</div>
            </div>
          </div>
        </section>

        <HowItWorks />

        <section className="end" id="end">
          <div className="wrap">
            <h2>Spend less time thinking about identity and more time using the services you need.</h2>
            <div className="cta">
              <a className="btn btn-b" href="https://id.softnetkenya.com">Create your SoftNetID</a>
              <a className="btn btn-o" href="#">Back to SoftNet</a>
            </div>
          </div>
        </section>
      </main>


    </div>
  );
}
