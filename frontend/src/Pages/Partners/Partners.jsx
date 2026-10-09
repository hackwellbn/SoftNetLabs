// NeonScriptPartners
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import "./NeonScriptPartners.css";

/* Partner und Kampagnen, mit einem handgeschriebenen Wort quer darueber.
 *
 * Das Wort liegt hinter der Schrift, nicht neben ihr, und ist so gross, dass
 * es links und rechts aus dem Bild laeuft. Genau das macht es: ein Wort, das
 * vollstaendig im Bild steht, ist eine Ueberschrift. Eines, das hinausragt,
 * ist eine Flaeche, und der Abschnitt bekommt eine zweite Ebene, ohne dass
 * dafuer ein Bild noetig waere.
 *
 * Das Neonorange traegt den Abschnitt allein. Deshalb steht daneben nichts
 * Farbiges: Ueberschrift, Text und Marken sind schwarz auf fast weiss.
 *
 * Beim Scrollen wandert das Wort langsam nach links, waehrend der Abschnitt
 * vorbeizieht. Der Weg ist bewusst kurz, gut ein Zehntel der Breite: bei mehr
 * liest es sich als eigene Bewegung statt als Tiefe.
 *
 * Darueber liegt feines Korn, nicht skaliert. Ein Korn sitzt auf einem Punkt
 * und bleibt knackig; ein grosses, gedehntes Rauschen wird weich und liest
 * sich als Schmutz. Auf hellem Grund multipliziert es, sonst hellt es das
 * Weiss noch weiter auf und man sieht nichts davon.
 *
 * Die Marken sind gesetzt, nicht gezeichnet: jede bekommt ihre eigene
 * Behandlung, damit die Reihe wie eine Reihe von Zeichen wirkt und nicht wie
 * eine Aufzaehlung. Alle Namen sind erfunden, ebenso der Fahrer und jede
 * Zeile Text. */

/* Feines Korn, nicht skaliert. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* Jede Marke anders gesetzt: eng und fett, weit gesperrt, im Kasten, klein
   und gemischt. So liest sich die Reihe als Zeichen und nicht als Liste. */
const MARKEN = [
  { name: "NORDKAP", klasse: "nsp-mark-nordkap" },
  { name: "Vellum", klasse: "nsp-mark-vellum" },
  { name: "H A L O", klasse: "nsp-mark-halo" },
  { name: "Kesslerwerk", klasse: "nsp-mark-kessler" },
  { name: "orb", klasse: "nsp-mark-orb" },
  { name: "MERIDIAN", klasse: "nsp-mark-meridian" },
  { name: "Tallow & Co", klasse: "nsp-mark-tallow" },
];

const EASE = [0.22, 1, 0.36, 1];

export function NeonScriptPartners() {
  const reduce = Boolean(useReducedMotion());
  const feld = useRef(null);
  const { scrollYProgress } = useScroll({
    target: feld,
    offset: ["start end", "end start"],
  });
  /* Nur die Markenreihe haengt am Scrollstand. Das Wort steht still: es ist
     die Flaeche, vor der sich etwas bewegt, und eine Flaeche, die selbst
     wandert, verliert genau diese Rolle. */
  const reihe = useTransform(scrollYProgress, [0, 1], ["3.5%", "-3.5%"]);

  return (
    <section ref={feld} className="nsp-section">
      <span
        aria-hidden
        className="nsp-grain"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="nsp-container">
        <div className="nsp-grid">
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="nsp-heading"
          >
            <span className="nsp-heading-line">Partners</span>
            <span className="nsp-heading-line">&amp; Campaigns</span>
          </motion.h2>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="nsp-lede"
          >
            The list stays short on purpose. Each partner gets one campaign a season, planned around
            the race calendar instead of around a launch date.
          </motion.p>
        </div>

        {/* Hochkant zwei Spalten statt einer umbrechenden Reihe: gesperrt
            nebeneinander stehen die Namen sonst mal zu zweit, mal zu dritt in
            einer Zeile, und das liest sich als Versehen. */}
        {/* Das Wort. Breit haengt es am Abschnitt und darf ueber beide
              Kanten hinaus; hochkant steht es im Fluss zwischen Absatz und
              Markenblock. */}
        <motion.span
          aria-hidden
          className="nsp-word"
          /* Hineingeschrieben: der Ausschnitt oeffnet sich von links. Weil
             clip-path im eigenen Koordinatensystem des Elements sitzt und die
             Drehung erst danach kommt, laeuft die Kante entlang der Grundlinie
             des Wortes und nicht waagerecht durchs Bild. Das ist der
             Unterschied zwischen "geschrieben" und "aufgedeckt".

             Hochkant liegt das Wort nicht ueber den Marken, sondern zwischen
             Absatz und Markenblock. Breit kreuzt es eine Zeile, und das liest
             sich als Ebene darunter. Hochkant stehen die Marken als Block aus
             zwei Spalten, und ein Wort quer durch einen Block liest sich nicht
             als Ebene, sondern als Fehler.

           Hochkant steht es ausserdem vollstaendig im Bild, statt links
           hinauszulaufen. Auf 390 Punkten ist das Wort zu kurz fuer beides:
           weit genug hinausgeschoben, dass der Anschnitt als Absicht liest,
           fehlt das T, und dann steht dort "ogether".

             Die Groesse haengt breit nicht nur an der Breite, sondern auch an
             der Hoehe (48vh). Sonst waechst das Wort auf einem breiten, flachen
             Fenster aus dem Abschnitt heraus, weil es an vw haengt und der
             Abschnitt an vh: bei 1440 mal 900 stand der Schwung des g genau auf
             der Unterkante und wurde vom overflow-hidden abgeschnitten.

             Oben, unten und rechts steht der Ausschnitt bewusst im Minus. Eine
             Schreibschrift laeuft mit Ober- und Unterlaengen weit ueber ihre
             Zeile hinaus, und bei leading-none ist die Zeile so hoch wie der
             Schriftgrad. Ein Ausschnitt auf null schneidet deshalb genau dort,
             wo die Schwuenge sind: beim g unten, beim r rechts. */
          initial={reduce ? false : { clipPath: "inset(-40% 100% -40% 0%)" }}
          whileInView={{ clipPath: "inset(-40% -10% -40% 0%)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.5, ease: [0.42, 0, 0.3, 1] }}
        >
          Together
        </motion.span>

        <motion.ul style={{ x: reduce ? 0 : reihe }} className="nsp-marken">
          {MARKEN.map((m, i) => (
            <motion.li
              key={m.name}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: EASE }}
              className={`nsp-marke ${m.klasse}`}
            >
              {m.name}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

export default NeonScriptPartners;