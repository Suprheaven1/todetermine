import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowDown,
  Plus,
  Minus,
  X,
  Menu,
  Check,
} from "lucide-react";
import "./style.css";

const CONTACT_ENDPOINT =
  import.meta.env.VITE_CONTACT_ENDPOINT?.trim() ||
  "https://formspree.io/f/mppdodyd";
const practices = [
  [
    "Magnétisme",
    "Une présence, une intention.",
    "Une pratique centrée sur l’attention portée à la personne et sur un temps de détente. Chaque séance laisse une place à vos ressentis, sans résultat imposé.",
  ],
  [
    "Soins énergétiques",
    "Un temps pour se recentrer.",
    "Un accompagnement de bien-être qui invite au relâchement et à l’écoute de soi. Le rythme de la séance est adapté à votre confort.",
  ],
  [
    "Soins Optima · chakras",
    "Explorer son équilibre intérieur.",
    "Une approche énergétique organisée autour de la notion traditionnelle de chakras. Ce cadre spirituel est proposé comme un support de recentrage, sans valeur de diagnostic.",
  ],
  [
    "Nettoyage spirituel",
    "Faire de la place au calme.",
    "Un accompagnement symbolique et spirituel pour les personnes qui souhaitent vivre un moment de clarification et d’apaisement. Il ne permet pas d’identifier une « maladie occulte ».",
  ],
  [
    "Désenvoûtement · mauvais œil",
    "Un accompagnement sans peur.",
    "Une démarche spirituelle pour celles et ceux qui y trouvent du sens. Aucune présence malveillante ni influence occulte n’est présumée ou confirmée. L’échange reste libre et respectueux de vos croyances.",
  ],
  [
    "Bio-résonance",
    "Découvrir une autre approche.",
    "Une pratique proposée dans un cadre de bien-être. Les visualisations associées ne constituent pas un examen médical, un diagnostic ou une preuve d’efficacité thérapeutique.",
  ],
];
const pictures = [
  {
    url: "./images/037d7aff-4ee9-4cd2-8ed5-b25f0ba1f4cb.jpeg",
    alt: "Photographie fournie d’une visualisation logicielle énergétique, sans valeur de diagnostic",
  },
  {
    url: "./images/13d81f76-2db5-4260-9c15-19189c711e1c.jpeg",
    alt: "Photographie fournie d’une visualisation logicielle énergétique, sans valeur de diagnostic",
  },
  {
    url: "./images/614b9984-2caa-43d1-9739-1bf576c9adef.jpeg",
    alt: "Photographie fournie d’une visualisation logicielle énergétique, sans valeur de diagnostic",
  },
  {
    url: "./images/6eb738f6-ff2a-40fd-88ae-c661f53d03c6.jpeg",
    alt: "Photographie fournie d’une visualisation logicielle énergétique, sans valeur de diagnostic",
  },
  {
    url: "./images/b8d04a50-eb5b-468e-b4fd-df78f106c80c.jpeg",
    alt: "Photographie fournie d’une visualisation logicielle énergétique, sans valeur de diagnostic",
  },
  {
    url: "./images/c71bd7e8-c264-485a-970d-3dbce83e2930.jpeg",
    alt: "Photographie fournie d’une visualisation logicielle énergétique, sans valeur de diagnostic",
  },
];
function App() {
  const [menu, setMenu] = useState(false),
    [active, setActive] = useState(0),
    [selected, setSelected] = useState(null),
    [status, setStatus] = useState(""),
    [sending, setSending] = useState(false);
  const dialog = useRef(null);
  useEffect(() => {
    if (selected !== null) dialog.current.showModal();
  }, [selected]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("seen");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  async function submit(e) {
    e.preventDefault();
    const endpoint = CONTACT_ENDPOINT;
    if (!endpoint) {
      setStatus(
        "L’adresse de réception est en cours de configuration. Votre message n’a pas été envoyé.",
      );
      return;
    }
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return;
    setSending(true);
    setStatus("");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw Error();
      setStatus("Merci. Votre message a bien été transmis.");
      form.reset();
    } catch {
      setStatus(
        "Le message n’a pas pu être envoyé. Veuillez réessayer plus tard.",
      );
    } finally {
      setSending(false);
    }
  }
  return (
    <>
      <a className="skip" href="#main">
        Aller au contenu
      </a>
      <header>
        <a href="#" className="brand" aria-label="Présence, accueil">
          <span className="brand-symbol">◌</span> présence
          <span className="brand-dot">.</span>
        </a>
        <button
          className="menu-button"
          onClick={() => setMenu(!menu)}
          aria-expanded={menu}
          aria-controls="navigation"
          aria-label={menu ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {menu ? <X /> : <Menu />}
        </button>
        <nav id="navigation" className={menu ? "open" : ""}>
          <a href="#approche" onClick={() => setMenu(false)}>
            Michel
          </a>
          <a href="#pratiques" onClick={() => setMenu(false)}>
            Les pratiques
          </a>
          <a href="#regards" onClick={() => setMenu(false)}>
            Regards
          </a>
          <a
            className="nav-contact"
            href="#contact"
            onClick={() => setMenu(false)}
          >
            Échangeons <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>
      <main id="main">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">
              <span /> MICHEL · MAGNÉTISME À MONTPELLIER
            </p>
            <h1>
              Revenir à soi.
              <br />
              Retrouver son
              <br />
              <em>équilibre.</em>
            </h1>
            <p className="hero-description">
              Un espace d’écoute et de calme.
              <br />
              Une approche énergétique et spirituelle,
              <br />
              attentive à ce que vous traversez.
            </p>
            <a className="button primary" href="#contact">
              Faire le premier pas <ArrowUpRight size={18} />
            </a>
            <span className="hero-note">
              À Montpellier, chez le praticien · À distance · Sur rendez-vous
            </span>
          </div>
          <div className="orb-scene" aria-hidden="true">
            <div className="orb-glow" />
            <div className="orbit o1" />
            <div className="orbit o2" />
            <div className="orbit o3" />
            <div className="orbit o4" />
            <div className="orb-core" />
            <i className="star s1" />
            <i className="star s2" />
            <i className="star s3" />
            <span className="orb-caption">LE CALME COMMENCE À L’INTÉRIEUR</span>
          </div>
          <div className="hero-bottom">
            <a href="#approche">
              <ArrowDown size={16} /> PRENDRE LE TEMPS DE DÉCOUVRIR
            </a>
            <span>
              ÉCOUTE &nbsp; · &nbsp; PRÉSENCE &nbsp; · &nbsp; ÉQUILIBRE
            </span>
          </div>
        </section>
        <section id="approche" className="approach section reveal">
          <div>
            <p className="eyebrow">01 — MICHEL · PRÉSENCE</p>
            <h2>
              Une rencontre.
              <br />
              <em>Une présence.</em>
            </h2>
          </div>
          <div className="approach-text">
            <p className="lead">
              Je suis Michel, praticien en magnétisme et pratiques énergétiques
              à Montpellier. Présence est le nom de mon activité : un espace
              d’écoute, de calme et d’accompagnement spirituel.
            </p>
            <p>
              Ma pratique réunit le magnétisme, les approches énergétiques et
              l’accompagnement spirituel. Chaque rencontre commence par un
              échange, pour comprendre votre demande et vous expliquer la
              démarche proposée.
            </p>
            <p>
              Je vous reçois à mon domicile à Montpellier, uniquement sur
              rendez-vous, et je propose également des séances à distance.
              Nous convenons ensemble des modalités avant toute séance.
            </p>
            <div className="small-values">
              <span>
                <Check size={15} /> Une écoute attentive
              </span>
              <span>
                <Check size={15} /> Sur place ou à distance
              </span>
            </div>
          </div>
        </section>
        <section id="pratiques" className="section practices">
          <div className="section-top reveal">
            <div>
              <p className="eyebrow">02 — LES PRATIQUES</p>
              <h2>
                Différentes approches.
                <br />
                <em>Une même attention.</em>
              </h2>
            </div>
            <p>
              Choisir ensemble la démarche
              <br />
              qui fait sens pour vous.
            </p>
          </div>
          <div className="practice-list">
            {practices.map(([title, subtitle, description], i) => (
              <article
                key={title}
                className={"practice " + (active === i ? "expanded" : "")}
              >
                <button
                  aria-expanded={active === i}
                  aria-controls={"practice-" + i}
                  onClick={() => setActive(active === i ? null : i)}
                >
                  <span className="index">0{i + 1}</span>
                  <h3>{title}</h3>
                  <span className="practice-subtitle">{subtitle}</span>
                  {active === i ? <Minus size={21} /> : <Plus size={21} />}
                </button>
                <div
                  id={"practice-" + i}
                  hidden={active !== i}
                  className="practice-content"
                >
                  <p>{description}</p>
                  <a href="#contact">
                    En parler ensemble <ArrowUpRight size={15} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="pause reveal">
          <span className="tiny-orbit" aria-hidden="true" />
          <p>
            Il n’y a rien à réussir.
            <br />
            Juste un moment <em>pour vous.</em>
          </p>
          <span className="eyebrow">S’ACCORDER UNE PARENTHÈSE</span>
        </section>
        <section id="regards" className="section gallery">
          <div className="section-top reveal">
            <div>
              <p className="eyebrow">03 — REGARDS SUR LA PRATIQUE</p>
              <h2>
                Rendre visible
                <br />
                <em>un autre regard.</em>
              </h2>
            </div>
            <div className="gallery-intro">
              <p>
                Quelques visualisations issues de la pratique, partagées pour
                vous en présenter l’univers.
              </p>
              <p className="caption">
                Ces images sont des représentations logicielles. Elles ne
                prouvent pas l’efficacité d’un soin et ne permettent pas
                d’établir un diagnostic.
              </p>
            </div>
          </div>
          <div className="gallery-track">
            {pictures.map((p, i) => (
              <button
                className="gallery-item"
                key={p.url}
                onClick={() => setSelected(i)}
                aria-label={"Agrandir le visuel " + (i + 1)}
              >
                <div className="image-wrap">
                  <img src={p.url} alt={p.alt} loading="lazy" />
                  <span className="image-expand">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
                <span className="image-label">
                  <span>ÉTUDE VISUELLE · {String(i + 1).padStart(2, "0")}</span>
                  <Plus size={15} />
                </span>
              </button>
            ))}
          </div>
          <p className="caption gallery-foot">
            Photographies fournies par Michel · Cliquez sur une image pour
            la consulter en entier.
          </p>
        </section>
        <section className="section process">
          <div className="reveal">
            <p className="eyebrow">04 — UNE RENCONTRE, SIMPLEMENT</p>
            <h2>
              Tout commence
              <br />
              <em>par un échange.</em>
            </h2>
            <p>
              Pas besoin d’avoir les mots justes.
              <br />
              Vous pouvez commencer par une question.
            </p>
          </div>
          <ol className="steps">
            <li>
              <span>01</span>
              <div>
                <h3>Vous m’écrivez</h3>
                <p>
                  Quelques lignes pour partager votre demande, sans entrer dans
                  des détails médicaux.
                </p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Nous prenons le temps</h3>
                <p>
                  Un premier échange pour préciser vos attentes, la démarche et
                  les modalités de la séance.
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Vous choisissez librement</h3>
                <p>
                  Vous décidez de la suite, avec les informations nécessaires et
                  sans engagement préalable.
                </p>
              </div>
            </li>
          </ol>
        </section>
        <section className="section faq">
          <p className="eyebrow">QUELQUES REPÈRES</p>
          <details>
            <summary>
              Ces pratiques remplacent-elles un suivi médical ?
              <Plus size={18} />
            </summary>
            <p>
              Non. Elles s’inscrivent dans une démarche de bien-être et ne
              remplacent ni consultation, ni diagnostic, ni traitement. Ne
              modifiez jamais un traitement prescrit sans en parler au
              professionnel de santé qui vous suit.
            </p>
          </details>
          <details>
            <summary>
              Faut-il avoir une croyance particulière ?<Plus size={18} />
            </summary>
            <p>
              Vous pouvez poser vos questions et exprimer vos réserves.
              L’accompagnement se construit dans le respect de vos convictions,
              sans adhésion imposée.
            </p>
          </details>
          <details>
            <summary>
              Comment connaître les tarifs et les modalités ?<Plus size={18} />
            </summary>
            <p>
              Les tarifs et la durée sont précisés lors de notre premier échange,
              avant toute confirmation. Vous choisissez librement de poursuivre
              ou non.
            </p>
          </details>
          <details>
            <summary>
              Où ont lieu les séances à Montpellier ?<Plus size={18} />
            </summary>
            <p>
              Je vous accueille à mon domicile à Montpellier, sur rendez-vous.
              L’adresse précise vous est communiquée personnellement lors de
              l’organisation de la séance. Il ne s’agit pas d’un déplacement
              à votre domicile.
            </p>
          </details>
          <details>
            <summary>
              Comment organiser une séance à distance ?<Plus size={18} />
            </summary>
            <p>
              Indiquez votre préférence dans votre message. Nous échangeons
              d’abord sur votre demande, puis convenons du créneau, du
              déroulement et des modalités pratiques de la séance à distance.
            </p>
          </details>
        </section>
        <section id="contact" className="contact-section">
          <div className="contact-copy">
            <p className="eyebrow">05 — FAIRE LE PREMIER PAS</p>
            <h2>
              Et si l’on prenait
              <br />
              le temps <em>d’échanger ?</em>
            </h2>
            <p>
              Une question, une envie d’en savoir plus ?<br />
              À Montpellier, chez moi sur rendez-vous, ou à distance.
            </p>
            <p>
              Vous préférez écrire directement ?<br />
              <a href="mailto:presencecontactmft@gmail.com">
                presencecontactmft@gmail.com
              </a>
            </p>
            <div className="contact-note">
              <span className="tiny-orbit" aria-hidden="true" />
              <p>
                Votre démarche vous appartient.
                <br />
                Elle commence quand vous le souhaitez.
              </p>
            </div>
          </div>
          <form onSubmit={submit}>
            <div className="form-row">
              <label>
                Votre prénom
                <input
                  name="name"
                  autoComplete="given-name"
                  required
                  placeholder="Comment vous appelez-vous ?"
                  maxLength="100"
                />
              </label>
              <label>
                Votre adresse e-mail
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="vous@exemple.fr"
                  maxLength="200"
                />
              </label>
            </div>
            <label>
              Ce qui vous amène
              <select name="subject" defaultValue="">
                <option value="" disabled>
                  Choisir un sujet (facultatif)
                </option>
                <option>Une première question</option>
                <option>Une demande de séance</option>
                {practices.map((p) => (
                  <option key={p[0]}>{p[0]}</option>
                ))}
              </select>
            </label>
            <label>
              Votre message
              <textarea
                name="message"
                required
                rows="3"
                placeholder="Je souhaiterais en savoir plus…"
                maxLength="4000"
              />
            </label>
            <label className="honeypot" aria-hidden="true">
              Site web
              <input name="website" tabIndex="-1" autoComplete="off" />
            </label>
            <label className="consent">
              <input type="checkbox" required name="consent" />
              <span>
                J’accepte que mes informations soient utilisées pour répondre à
                ma demande. Merci de ne pas transmettre de données de santé.
              </span>
            </label>
            <button className="button dark" disabled={sending}>
              {sending ? "Envoi en cours…" : "Envoyer mon message"}
              <ArrowUpRight size={18} />
            </button>
            <p className="form-status" role="status">
              {status ||
                "Votre message sera transmis via Formspree pour répondre à votre demande."}
            </p>
          </form>
        </section>
        <aside className="care-note">
          <span>UN CADRE CLAIR, POUR UNE RELATION DE CONFIANCE.</span>
          <p>
            Pratiques de bien-être et accompagnement spirituel, sans promesse de
            guérison. Aucun diagnostic médical n’est réalisé. En cas de
            symptômes ou de souffrance, consultez un professionnel de santé.
          </p>
        </aside>
      </main>
      <footer>
        <a className="brand" href="#">
          ◌ présence.
        </a>
        <p>Michel · Magnétisme à Montpellier & à distance</p>
        <a
          href="#informations"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("info").showModal();
          }}
        >
          Informations du site <ArrowUpRight size={14} />
        </a>
        <span>© {new Date().getFullYear()} Présence</span>
      </footer>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Visualisation de la pratique"
        onClose={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current.close();
        }}
      >
        <button
          className="dialog-close"
          onClick={() => dialog.current.close()}
          aria-label="Fermer le visuel"
        >
          <X />
        </button>
        {selected !== null && (
          <>
            <img src={pictures[selected].url} alt={pictures[selected].alt} />
            <p>
              Visuel {selected + 1} / {pictures.length} · Illustration sans
              valeur diagnostique
            </p>
          </>
        )}
      </dialog>
      <dialog
        id="info"
        className="info-dialog"
        aria-label="Informations du site"
      >
        <button
          className="dialog-close"
          aria-label="Fermer les informations"
          onClick={() => document.getElementById("info").close()}
        >
          <X />
        </button>
        <h2>Informations du site</h2>
        <p>
          Présence est l’activité de Michel, praticien à Montpellier.
          Les informations complètes d’identification de l’éditeur,
          d’immatriculation et d’hébergement restent à compléter.
        </p>
        <h3>Vos données</h3>
        <p>
          Les informations du formulaire sont transmises à Formspree afin de
          traiter votre demande et de l’acheminer vers
          presencecontactmft@gmail.com. Merci de ne pas transmettre de données
          de santé. Aucun outil publicitaire ou de mesure d’audience n’est
          installé. Les modalités de conservation et d’exercice de vos droits
          restent à préciser avant l’ouverture commerciale.
        </p>
      </dialog>
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
