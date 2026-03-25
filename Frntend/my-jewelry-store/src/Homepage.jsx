import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inconsolata:wght@300;400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0a0f0d;
    --paper: #eef0eb;
    --silver: #c4c8c2;
    --silver-dim: #8a9090;
    --malachite: #2d6a4f;
    --malachite-light: #52b788;
    --malachite-pale: #1b4332;
    --surface: #111714;
    --mid: #1e2720;
    --border: rgba(196,200,194,0.14);
    --serif: 'Playfair Display', serif;
    --mono: 'Inconsolata', monospace;
  }

  body {
    background: var(--ink);
    color: var(--paper);
    font-family: var(--mono);
    font-weight: 300;
    overflow-x: hidden;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up { opacity: 0; animation: fadeUp 0.9s ease forwards; }

  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  /* NAV */
  .nav {
    display: flex; justify-content: space-between; align-items: center;
    padding: 1.4rem 3rem;
    border-bottom: 0.5px solid var(--border);
    position: sticky; top: 0;
    background: rgba(10,15,13,0.94);
    backdrop-filter: blur(12px);
    z-index: 100;
  }
  .nav-logo {
    font-family: var(--serif);
    font-size: 1.3rem; font-weight: 400; letter-spacing: 0.14em;
    background: linear-gradient(90deg, var(--silver), var(--malachite-light), var(--silver));
    background-size: 200% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    animation: shimmer 4s linear infinite;
    cursor: pointer;
  }
  .nav-links { display: flex; gap: 2.5rem; list-style: none; }
  .nav-links a {
    font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: rgba(238,240,235,0.42); text-decoration: none; transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--silver); }
  .nav-btn {
    font-family: var(--mono); font-size: 0.6rem; letter-spacing: 0.2em;
    text-transform: uppercase; border: 0.5px solid var(--silver-dim);
    color: var(--silver); padding: 0.5rem 1.3rem; background: transparent;
    cursor: pointer; transition: all 0.22s;
  }
  .nav-btn:hover { background: var(--silver); color: var(--ink); border-color: var(--silver); }

  /* HERO */
  .hero {
    min-height: 93vh;
    display: grid; grid-template-columns: 1.05fr 0.95fr;
    overflow: hidden;
  }
  .hero-left {
    padding: 7rem 3.5rem 4rem 3rem;
    display: flex; flex-direction: column; justify-content: flex-end;
    position: relative;
    border-right: 0.5px solid var(--border);
  }
  .hero-eyebrow {
    font-size: 0.56rem; letter-spacing: 0.38em; text-transform: uppercase;
    color: var(--malachite-light); margin-bottom: 1.75rem;
  }
  .hero-title {
    font-family: var(--serif);
    font-size: clamp(3.2rem, 5.5vw, 5.5rem);
    font-weight: 300; line-height: 1.05; color: var(--paper);
  }
  .hero-title em { font-style: italic; color: var(--malachite-light); }
  .hero-divider {
    width: 48px; height: 0.5px;
    background: linear-gradient(90deg, var(--malachite-light), var(--silver));
    margin: 2rem 0;
  }
  .hero-sub {
    font-size: 0.68rem; letter-spacing: 0.05em; line-height: 2;
    color: rgba(238,240,235,0.4); max-width: 360px; margin-bottom: 2.5rem;
  }
  .hero-actions { display: flex; gap: 1.25rem; align-items: center; }
  .btn-primary {
    font-family: var(--mono); font-size: 0.6rem; letter-spacing: 0.22em;
    text-transform: uppercase; background: var(--malachite);
    color: var(--paper); border: none; padding: 0.9rem 2.2rem;
    cursor: pointer; transition: background 0.22s, transform 0.15s;
  }
  .btn-primary:hover { background: var(--malachite-light); color: var(--ink); transform: translateY(-1px); }
  .btn-ghost {
    font-family: var(--mono); font-size: 0.6rem; letter-spacing: 0.22em;
    text-transform: uppercase; background: transparent; color: var(--silver-dim);
    border: none; padding: 0.9rem 0; cursor: pointer;
    border-bottom: 0.5px solid rgba(196,200,194,0.25);
    transition: color 0.2s, border-color 0.2s;
  }
  .btn-ghost:hover { color: var(--silver); border-color: var(--silver); }
  .hero-scroll {
    position: absolute; bottom: 2.5rem; left: 3rem;
    display: flex; align-items: center; gap: 0.75rem;
    font-size: 0.5rem; letter-spacing: 0.3em; text-transform: uppercase;
    color: rgba(238,240,235,0.2);
  }
  .scroll-line { width: 36px; height: 0.5px; background: rgba(238,240,235,0.18); }

  .hero-right {
    position: relative; overflow: hidden;
    background: var(--surface);
    display: flex; align-items: center; justify-content: center;
  }
  .stone-bg {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 60% 80% at 60% 50%, rgba(45,106,79,0.22) 0%, transparent 70%),
      radial-gradient(ellipse 40% 40% at 30% 70%, rgba(82,183,136,0.1) 0%, transparent 60%);
  }
  .hero-product-frame {
    position: relative; z-index: 2;
    width: 240px; height: 340px;
    border: 0.5px solid rgba(196,200,194,0.2);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 0.75rem;
    opacity: 0; animation: fadeUp 1s ease 0.5s forwards;
  }
  .hero-product-frame::after {
    content: ''; position: absolute;
    inset: -1px; border: 0.5px solid rgba(82,183,136,0.15);
    transform: translate(8px, 8px);
  }
  .frame-gem {
    width: 56px; height: 56px;
    background: linear-gradient(135deg, #2d6a4f 0%, #52b788 40%, #1b4332 70%, #2d6a4f 100%);
    clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
  }
  .frame-label {
    font-size: 0.5rem; letter-spacing: 0.28em; text-transform: uppercase;
    color: rgba(196,200,194,0.35); text-align: center; line-height: 2.2;
  }
  .frame-label span { display: block; color: rgba(82,183,136,0.5); }

  /* ABOUT */
  .section-about {
    display: grid; grid-template-columns: 1fr 1.35fr;
    border-top: 0.5px solid var(--border);
  }
  .about-left {
    padding: 5rem 3rem; background: var(--surface);
    border-right: 0.5px solid var(--border);
  }
  .section-tag {
    font-size: 0.52rem; letter-spacing: 0.32em; text-transform: uppercase;
    color: var(--malachite-light); margin-bottom: 2rem;
    display: flex; align-items: center; gap: 0.75rem;
  }
  .section-tag::before {
    content: ''; display: block; width: 22px; height: 0.5px;
    background: var(--malachite-light);
  }
  .about-heading {
    font-family: var(--serif);
    font-size: 2.6rem; font-weight: 300; line-height: 1.18;
    color: var(--paper); margin-bottom: 1.5rem;
  }
  .about-heading em { font-style: italic; color: var(--malachite-light); }
  .about-heading .s { color: var(--silver); }
  .about-body {
    font-size: 0.67rem; line-height: 2.05;
    color: rgba(238,240,235,0.4); max-width: 360px; margin-bottom: 2.5rem;
  }
  .about-materials {
    border-top: 0.5px solid var(--border); padding-top: 1.75rem;
    display: flex; gap: 2rem;
  }
  .material-pill { display: flex; align-items: center; gap: 0.6rem; }
  .material-dot { width: 8px; height: 8px; border-radius: 50%; }
  .dot-silver { background: var(--silver); }
  .dot-malachite { background: var(--malachite-light); }
  .material-name {
    font-size: 0.56rem; letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(238,240,235,0.4);
  }
  .about-right {
    padding: 5rem 4rem;
    display: flex; flex-direction: column; justify-content: center;
  }
  .about-value {
    padding: 1.5rem 0;
    border-bottom: 0.5px solid rgba(238,240,235,0.05);
    display: flex; gap: 1.5rem; align-items: flex-start;
  }
  .about-num {
    font-family: var(--serif); font-size: 0.9rem; font-weight: 300;
    color: rgba(82,183,136,0.3); min-width: 28px; padding-top: 2px;
  }
  .about-value-title {
    font-size: 0.66rem; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--paper); margin-bottom: 0.4rem; font-weight: 400;
  }
  .about-value-desc {
    font-size: 0.62rem; line-height: 1.9; color: rgba(238,240,235,0.35);
  }

  /* PRODUCTS */
  .section-products { padding: 5rem 3rem; border-top: 0.5px solid var(--border); }
  .section-header {
    display: flex; justify-content: space-between; align-items: flex-end;
    margin-bottom: 3rem;
  }
  .section-title {
    font-family: var(--serif); font-size: 2.4rem; font-weight: 300; color: var(--paper);
  }
  .section-title em { font-style: italic; color: var(--malachite-light); }
  .view-all {
    font-family: var(--mono); font-size: 0.56rem; letter-spacing: 0.2em;
    text-transform: uppercase; background: none; border: none;
    border-bottom: 0.5px solid rgba(82,183,136,0.28);
    color: rgba(82,183,136,0.55); cursor: pointer; padding-bottom: 2px;
    transition: color 0.2s, border-color 0.2s;
  }
  .view-all:hover { color: var(--malachite-light); border-color: var(--malachite-light); }
  .products-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 1px; background: var(--border);
    border: 0.5px solid var(--border);
  }
  .product-card {
    background: var(--ink); padding: 2rem;
    cursor: pointer; transition: background 0.28s;
    position: relative; overflow: hidden;
  }
  .product-card:hover { background: var(--surface); }
  .product-card:hover .product-img-inner { transform: scale(1.04); }
  .product-img {
    width: 100%; aspect-ratio: 3/4; background: var(--mid);
    margin-bottom: 1.25rem; overflow: hidden; position: relative;
  }
  .product-img-inner {
    width: 100%; height: 100%; transition: transform 0.45s ease;
    display: flex; align-items: center; justify-content: center;
    flex-direction: column; gap: 1rem;
  }
  .product-gem-icon {
    width: 42px; height: 42px;
    background: linear-gradient(135deg, #1b4332 0%, #52b788 50%, #2d6a4f 100%);
    clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
    opacity: 0.55;
  }
  .product-gem-ring {
    width: 40px; height: 40px; border-radius: 50%;
    border: 1.5px solid rgba(196,200,194,0.3); opacity: 0.4;
  }
  .product-img-text {
    font-size: 0.48rem; letter-spacing: 0.22em; text-transform: uppercase;
    color: rgba(238,240,235,0.1); text-align: center; line-height: 2.5;
  }
  .product-badge {
    position: absolute; top: 1rem; right: 1rem;
    font-size: 0.46rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--ink); background: var(--malachite-light); padding: 0.2rem 0.55rem;
  }
  .product-badge.silver-badge { background: var(--silver); color: var(--ink); }
  .product-name {
    font-family: var(--serif); font-size: 1.1rem; font-weight: 400;
    color: var(--paper); margin-bottom: 0.25rem; letter-spacing: 0.02em;
  }
  .product-stone {
    font-size: 0.56rem; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--malachite-light); margin-bottom: 0.5rem; opacity: 0.75;
  }
  .product-meta {
    display: flex; justify-content: space-between; align-items: center;
    margin-top: 0.4rem; padding-top: 0.75rem;
    border-top: 0.5px solid rgba(238,240,235,0.06);
  }
  .product-price { font-size: 0.68rem; letter-spacing: 0.08em; color: var(--silver); }
  .product-material {
    font-size: 0.54rem; letter-spacing: 0.15em; text-transform: uppercase;
    color: rgba(238,240,235,0.2);
  }

  /* CTA */
  .section-cta {
    display: grid; grid-template-columns: 1fr 1fr;
    border-top: 0.5px solid var(--border); min-height: 400px;
  }
  .cta-left {
    padding: 5rem 3rem; background: var(--malachite-pale);
    display: flex; flex-direction: column; justify-content: center;
    border-right: 0.5px solid rgba(82,183,136,0.2);
    position: relative; overflow: hidden;
  }
  .cta-left::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse 80% 60% at 20% 80%, rgba(82,183,136,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  .cta-heading {
    font-family: var(--serif); font-size: 2.6rem; font-weight: 300;
    line-height: 1.12; color: var(--paper); margin-bottom: 1.25rem; position: relative;
  }
  .cta-heading em { font-style: italic; color: var(--malachite-light); }
  .cta-sub {
    font-size: 0.66rem; line-height: 2;
    color: rgba(238,240,235,0.48); max-width: 320px; margin-bottom: 2rem; position: relative;
  }
  .cta-input-row {
    display: flex; border-bottom: 0.5px solid rgba(238,240,235,0.25);
    margin-bottom: 1.25rem; align-items: center; position: relative;
  }
  .cta-input {
    background: transparent; border: none; outline: none;
    font-family: var(--mono); font-size: 0.64rem; letter-spacing: 0.08em;
    color: var(--paper); flex: 1; padding: 0.55rem 0;
  }
  .cta-input::placeholder { color: rgba(238,240,235,0.3); }
  .cta-submit {
    font-family: var(--mono); font-size: 0.54rem; letter-spacing: 0.22em;
    text-transform: uppercase; background: transparent; border: none;
    color: var(--malachite-light); cursor: pointer; opacity: 0.75; transition: opacity 0.2s;
  }
  .cta-submit:hover { opacity: 1; }
  .cta-note { font-size: 0.52rem; letter-spacing: 0.1em; color: rgba(238,240,235,0.28); position: relative; }
  .subscribed-msg { font-size: 0.68rem; color: var(--malachite-light); letter-spacing: 0.08em; line-height: 1.8; }
  .cta-right {
    padding: 5rem 4rem;
    display: flex; flex-direction: column; justify-content: center;
  }
  .contact-row {
    padding: 1.15rem 0; border-bottom: 0.5px solid rgba(238,240,235,0.06);
    display: grid; grid-template-columns: 110px 1fr; gap: 1rem; align-items: center;
  }
  .contact-label {
    font-size: 0.52rem; letter-spacing: 0.26em; text-transform: uppercase;
    color: rgba(238,240,235,0.25);
  }
  .contact-value { font-size: 0.65rem; color: rgba(238,240,235,0.6); letter-spacing: 0.04em; }

  /* FOOTER */
  footer {
    padding: 2rem 3rem; border-top: 0.5px solid var(--border);
    display: flex; justify-content: space-between; align-items: center;
  }
  .footer-left { display: flex; align-items: center; gap: 1.25rem; }
  .footer-gem {
    width: 13px; height: 13px;
    background: linear-gradient(135deg, #2d6a4f, #52b788);
    clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
    opacity: 0.55;
  }
  .footer-copy {
    font-size: 0.5rem; letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(238,240,235,0.18);
  }
  .footer-links { display: flex; gap: 2rem; list-style: none; }
  .footer-links a {
    font-size: 0.5rem; letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(238,240,235,0.2); text-decoration: none; transition: color 0.2s;
  }
  .footer-links a:hover { color: var(--malachite-light); }
`;

const products = [
  {
    id: 1,
    name: "Veridian Ring",
    stone: "Malachite + Sterling Silver",
    price: "$185",
    material: ".925 Silver",
    badge: "New",
    badgeType: "green",
    icon: "gem",
  },
  {
    id: 2,
    name: "Sylvan Cuff",
    stone: "Raw Malachite Cabochon",
    price: "$240",
    material: ".925 Silver",
    badge: null,
    icon: "ring",
  },
  {
    id: 3,
    name: "Forest Pendant",
    stone: "Polished Malachite",
    price: "$165",
    material: ".925 Silver",
    badge: "Last 2",
    badgeType: "silver",
    icon: "gem",
  },
];

const values = [
  {
    num: "I",
    title: "Genuine Malachite",
    desc: "Every stone is sourced from certified mines in the Congo Basin — selected by hand for depth of banding and vibrancy of green.",
  },
  {
    num: "II",
    title: "Sterling Silver Settings",
    desc: "All metalwork is crafted in .925 sterling silver, oxidised or polished to order. No plating, no shortcuts.",
  },
  {
    num: "III",
    title: "One-of-a-Kind Pieces",
    desc: "Because malachite banding is never repeated in nature, each piece is genuinely unique. We photograph every stone individually.",
  },
];

const contacts = [
  { label: "Studio", value: "Chicago, Illinois" },
  { label: "Email", value: "hello@verdantjewels.co" },
  { label: "Hours", value: "Mon–Fri, 10am–6pm CST" },
  { label: "Shipping", value: "Worldwide — 5–10 business days" },
];

function useInView(ref, threshold = 0.12) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function Reveal({ children, className, style, delay = 0 }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(26px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function Homepage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim()) { setSubscribed(true); setEmail(""); }
  };

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">CELESTINEELITE</div>
        <ul className="nav-links">
          <li><a href="#">Collections</a></li>
          <li><a href="#">Stones</a></li>
          <li><a href="#">Craft</a></li>
          <li><a href="#">Journal</a></li>
        </ul>
        <button className="nav-btn">Shop Now</button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <p className="hero-eyebrow fade-up" style={{ animationDelay: "0.1s" }}>
            Silver &amp; Malachite — Handcrafted Jewellery
          </p>
          <h1 className="hero-title fade-up" style={{ animationDelay: "0.22s" }}>
            The earth<br />
            wore <em>green</em><br />
            first
          </h1>
          <div className="hero-divider fade-up" style={{ animationDelay: "0.38s" }} />
          <p className="hero-sub fade-up" style={{ animationDelay: "0.42s" }}>
            Each piece pairs the raw, swirling depth of genuine malachite with
            hand-finished sterling silver. Worn differently by every person. Unrepeatable by nature.
          </p>
          <div className="hero-actions fade-up" style={{ animationDelay: "0.56s" }}>
            <button className="btn-primary">Explore Pieces</button>
            <button className="btn-ghost">Our Stones</button>
          </div>
          <div className="hero-scroll fade-up" style={{ animationDelay: "0.72s" }}>
            <div className="scroll-line" />
            Scroll to discover
          </div>
        </div>
        <div className="hero-right">
          <div className="product-img-inner">
                  <video
                    src="./video/vid3.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: "100%", height: "100%", objectFit: "content" }}
                />
                </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section-about">
        <Reveal className="about-left">
          <div className="section-tag">About</div>
          <h2 className="about-heading">
            <span className="s">Silver</span> meets<br />
            <em>stone</em>
          </h2>
          <p className="about-body">
            Malachite has been worn as adornment and talisman for thousands of years —
            its concentric greens never duplicated, never predictable. We set it in sterling
            silver because the contrast is honest: cold metal, warm earth.
          </p>
          <div className="about-materials">
            <div className="material-pill">
              <div className="material-dot dot-silver" />
              <span className="material-name">.925 Sterling Silver</span>
            </div>
            <div className="material-pill">
              <div className="material-dot dot-malachite" />
              <span className="material-name">Genuine Malachite</span>
            </div>
          </div>
        </Reveal>

        <Reveal className="about-right" delay={0.15}>
          {values.map((v) => (
            <div className="about-value" key={v.num}>
              <span className="about-num">{v.num}</span>
              <div>
                <div className="about-value-title">{v.title}</div>
                <div className="about-value-desc">{v.desc}</div>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* PRODUCTS */}
      <section className="section-products">
        <Reveal className="section-header">
          <h2 className="section-title">Current <em>Pieces</em></h2>
          <button className="view-all">View All →</button>
        </Reveal>
        <div className="products-grid">
          {products.map((p, i) => (
            <Reveal key={p.id} className="product-card" delay={i * 0.1}>
              <div className="product-img">
                <div className="product-img-inner">
                  <video
                    src="./video/vid1.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                </div>
                {p.badge && (
                  <div className={`product-badge${p.badgeType === "silver" ? " silver-badge" : ""}`}>
                    {p.badge}
                  </div>
                )}
              </div>
              <div className="product-name">{p.name}</div>
              <div className="product-stone">{p.stone}</div>
              <div className="product-meta">
                <span className="product-price">{p.price}</span>
                <span className="product-material">{p.material}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA + CONTACT */}
      <section className="section-cta">
        <Reveal className="cta-left">
          <h2 className="cta-heading">
            New stones,<br />
            <em>first look.</em>
          </h2>
          <p className="cta-sub">
            Fresh pieces, restocks, and notes on the stones we're working with —
            sent quietly, never more than twice a month.
          </p>
          {subscribed ? (
            <p className="subscribed-msg">
              You're on the list.<br />We'll be in touch soon.
            </p>
          ) : (
            <>
              <div className="cta-input-row">
                <input
                  className="cta-input"
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                />
                <button className="cta-submit" onClick={handleSubscribe}>
                  Subscribe →
                </button>
              </div>
              <p className="cta-note">No noise. Unsubscribe anytime.</p>
            </>
          )}
        </Reveal>

        <Reveal className="cta-right" delay={0.15}>
          <div className="section-tag">Contact</div>
          {contacts.map((c) => (
            <div className="contact-row" key={c.label}>
              <span className="contact-label">{c.label}</span>
              <span className="contact-value">{c.value}</span>
            </div>
          ))}
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-left">
          <div className="footer-gem" />
          <span className="footer-copy">© 2026 Verdant Jewels — Chicago, IL</span>
        </div>
        <ul className="footer-links">
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Terms</a></li>
          <li><a href="#">Instagram</a></li>
          <li><a href="#">Care Guide</a></li>
          <li><a href="#">Returns</a></li>
        </ul>
      </footer>
    </>
  );
}