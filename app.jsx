// Arsh Advani — portfolio (soft-dark direction)

const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "amber",
  "cursor": true,
  "noise": true
}/*EDITMODE-END*/;

const ACCENTS = {
  indigo:  { base: "#818cf8", deep: "#6366f1", glow: "rgba(129,140,248,.35)", soft: "rgba(129,140,248,.14)", ring: "rgba(129,140,248,.55)" },
  cyan:    { base: "#22d3ee", deep: "#0891b2", glow: "rgba(34,211,238,.32)",  soft: "rgba(34,211,238,.12)",  ring: "rgba(34,211,238,.5)"  },
  emerald: { base: "#34d399", deep: "#059669", glow: "rgba(52,211,153,.32)",  soft: "rgba(52,211,153,.12)",  ring: "rgba(52,211,153,.5)"  },
  amber:   { base: "#f59e0b", deep: "#c2410c", glow: "rgba(245,158,11,.35)",  soft: "rgba(245,158,11,.14)",  ring: "rgba(245,158,11,.55)" },
  rose:    { base: "#fb7185", deep: "#e11d48", glow: "rgba(251,113,133,.35)", soft: "rgba(251,113,133,.14)", ring: "rgba(251,113,133,.55)" },
};

// ─── Content ────────────────────────────────────────────────────────────────

const NAV = [
  { id: "about",      label: "About" },
  { id: "experience", label: "Experience" },
  { id: "leadership", label: "Beyond" },
  { id: "projects",   label: "Work" },
  { id: "education",  label: "Education" },
  { id: "contact",    label: "Contact" },
];

const SKILLS = [
  { label: "languages",      items: ["Python", "TypeScript", "JavaScript", "C++", "SQL"] },
  { label: "ai / ml",        items: ["LangGraph", "LangChain", "RAG", "sentence-transformers", "PyTorch", "HuggingFace", "Pydantic"] },
  { label: "backend / web",  items: ["FastAPI", "Node.js", "Express", "Flask", "Django", "React", "GraphQL", "WebSockets"] },
  { label: "cloud / devops", items: ["AWS (Lambda, S3, CloudFront)", "GCP", "Docker", "Kubernetes", "GitHub Actions"] },
  { label: "databases",      items: ["PostgreSQL", "Pinecone", "MySQL", "MongoDB", "Redis", "Qdrant", "ChromaDB"] },
];

const EXPERIENCE = [
  {
    role: "Software Engineering Intern",
    where: "BigShorts",
    when: "Jun 2025 – Sep 2025",
    bullets: [
      "Architected a content management backend in Node.js + MySQL serving 10,000+ users: hierarchical series/seasons/episodes with scheduled release logic across 6 JWT-authenticated REST APIs.",
      "Sub-200ms response times across all endpoints via batch query optimization, platform-specific delivery, and transaction management for concurrent writes.",
      "Eliminated N+1 queries and applied strategic denormalization to improve DB read performance by 40%, preserving integrity across 4 interconnected tables via app-level soft-delete cascades.",
      "Deployed a serverless AWS Lambda video pipeline converting 500+ uploads to HLS adaptive bitrate streams via FFmpeg + CloudFront, cutting bandwidth consumption by 35%.",
    ],
  },
  {
    role: "Data Science Intern",
    where: "LTIMindtree",
    when: "Jan 2024 – Jun 2024",
    bullets: [
      "Automated enterprise diagram-to-text conversion using LLaVA vision-language models across 200+ workflow diagrams, cutting manual documentation effort 40% and enabling downstream NLP pipelines on previously unstructured content.",
      "Benchmarked LLaMA, Mistral, and open-source LLMs across parameter efficiency, latency, and accuracy; reduced hallucination rates 30% through prompt engineering, informing internal LLM adoption strategy.",
    ],
  },
  {
    role: "Blockchain Intern",
    where: "Perpetual Block Technologies Pvt Ltd",
    when: "May 2023 – Jul 2023",
    bullets: [
      "Developed a proof-of-concept invoice payment platform on Ethereum and the XRP Ledger, applying ERC standards to model real-world cross-border financial flows.",
      "Implemented Solidity smart contracts handling invoice issuance, settlement, and on-chain payment confirmation against an Ethereum testnet.",
      "Optimized transaction efficiency by 25% through gas-aware contract refactoring and batched on-chain writes.",
    ],
  },
];

const LEADERSHIP = [
  {
    role: "Teaching Assistant — CSE 183: Web Applications",
    where: "UC Santa Cruz",
    when: "Spring 2025",
    bullets: [
      "Led weekly discussion sections for 100+ students, translating complex concepts into interactive problem-solving sessions.",
      "Delivered detailed written feedback on assignments, consistently rated highly for clarity and accessibility.",
    ],
  },
  {
    role: "Group Tutor — STAT 80A: Introduction to Statistics",
    where: "UC Santa Cruz",
    when: "Fall 2025",
    bullets: [
      "Facilitated collaborative learning for groups of 8-12 students, adapting materials to diverse mathematical backgrounds.",
    ],
  },
  {
    role: "Course Grader — CSE 180 & 183",
    where: "UC Santa Cruz",
    when: "Fall 2024 – Winter 2025",
    bullets: [
      "Evaluated 100+ student assignments weekly with constructive feedback on technical accuracy and presentation.",
    ],
  },
  {
    role: "Community Health Volunteer",
    where: "Bai Jerbai Wadia Hospital for Children",
    when: "Sep 2022 – Aug 2023",
    bullets: [
      "Worked with underserved populations in Palghar on community health projects covering nutrition, sanitation, and preventive care education.",
      "Coordinated food and aid distribution during medical camps.",
    ],
  },
];

const PROJECTS = [
  {
    title: "AgentMesh",
    glyph: "01 — p2p agent routing",
    art: "art-1",
    tags: ["Python", "FastAPI", "LangGraph", "WebSockets"],
    desc: "A peer-to-peer protocol for AI agent discovery, routing, and reputation. Agents register capabilities at startup and are matched at runtime via semantic search, ELO-style trust scoring, and cost-aware routing, with circuit breaker patterns for resilience. Supports three-way negotiation (accept/reject/counter) and WebSocket-based task execution.",
    link: "https://github.com/arshadvani3/AgentMesh",
  },
  {
    title: "AgentProbe",
    glyph: "02 — llm red-teaming",
    art: "art-2",
    tags: ["LangGraph", "FastAPI", "Postgres", "Groq"],
    desc: "A multi-agent platform that stress-tests any AI agent's HTTP API without needing internal access. Seven coordinated LangGraph agents run a 25-pattern injection battery across 7 categories, score responses on accuracy, hallucination, and safety, and auto-escalate test difficulty when pass rates exceed 90%.",
    link: "https://github.com/arshadvani3/Agentprobe",
  },
  {
    title: "DevDocs AI",
    glyph: "03 — production rag",
    art: "art-3",
    tags: ["Qdrant", "HuggingFace", "Redis", "FastAPI"],
    desc: "A production RAG assistant for asking natural language questions about any codebase. Point it at a GitHub repo and get streaming answers with source citations. AST-aware chunking across 23+ languages, parallel batch embeddings, multi-collection indexing, and two-tier Redis caching for low-latency retrieval.",
    link: "https://github.com/arshadvani3/devdocs-ai",
  },
];

const EDUCATION = [
  {
    when: "Expected Jun 2026",
    where: "UC Santa Cruz",
    deg: "M.S. Computer Science",
    gpa: "GPA · 3.50 / 4.0",
  },
  {
    when: "Jun 2024",
    where: "NMIMS · Mukesh Patel School of Technology Management and Engineering",
    deg: "B.Tech. Computer Engineering",
    gpa: "Mumbai, India",
  },
];

// ─── Reveal hook ────────────────────────────────────────────────────────────

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ─── Scrollspy + scrolled header ────────────────────────────────────────────

function useScrollspy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  return active;
}

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

// ─── Components ─────────────────────────────────────────────────────────────

function Header() {
  const active = useScrollspy(NAV.map((n) => n.id).concat("hero"));
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  return (
    <header className={scrolled ? "scrolled" : ""}>
      <div className="wrap">
        <nav className={"nav-bar" + (open ? " open" : "")}>
          <a href="#hero" className="logo" aria-label="Arsh Advani — home" onClick={() => setOpen(false)}>
            <span className="logo-dot" aria-hidden="true"></span>
            <svg className="logo-mark" viewBox="0 0 34 22" aria-hidden="true">
              <path d="M1 21 L9 3 L17 21 M4.6 14 L13.4 14 M17 21 L25 3 L33 21 M20.6 14 L29.4 14"
                    fill="none" stroke="currentColor" strokeWidth="2.4"
                    strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <div className="nav-links">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={"#" + n.id}
                className={active === n.id ? "active" : ""}
                onClick={() => setOpen(false)}
              >{n.label}</a>
            ))}
          </div>
          <a href="resume.pdf" className="nav-cta" target="_blank" rel="noreferrer">
            Resume <span aria-hidden="true">↗</span>
          </a>
          <button
            className="menu-btn"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >{open ? "✕" : "☰"}</button>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="hero" data-screen-label="01 Hero">
      <div className="hero-glow" aria-hidden="true"></div>
      <div className="wrap hero-inner">
        <div className="hero-prelude">
          <span className="pulse" aria-hidden="true"></span>
          <span>open to new-grad AI/ML & SWE roles · June 2026</span>
        </div>
        <h1>
          <span className="line">Hi, I'm Arsh Advani.</span>
          <span className="line">A Software Engineer</span>
          <span className="line">building <span className="accent">scalable AI.</span></span>
        </h1>
        <p className="lede">
          M.S. in Computer Science at UCSC. I work where LLMs meet real
          infrastructure: agentic routing, production RAG, red-teaming harnesses,
          and the backends quietly holding it all together.
        </p>
        <div className="ctas">
          <a href="#projects" className="btn btn-primary">
            <span>View Work</span><span className="arr">→</span>
          </a>
          <a href="resume.pdf" className="btn btn-ghost" target="_blank" rel="noreferrer">
            <span>Download Resume</span>
          </a>
        </div>
        <div className="hero-meta">
          <div className="hm">
            <span className="hm-l">// based</span>
            <span className="hm-v">San Jose, CA</span>
          </div>
          <div className="hm">
            <span className="hm-l">// program</span>
            <span className="hm-v">MSCS @ UCSC '26</span>
          </div>
          <div className="hm">
            <span className="hm-l">// focus</span>
            <span className="hm-v">Agentic & ML Systems</span>
          </div>
          <div className="hm">
            <span className="hm-l">// available</span>
            <span className="hm-v">Graduating June '26</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section section--alt" data-screen-label="02 About">
      <div className="wrap">
        <div className="about-grid">
          <div className="about-body reveal">
            <div className="sec-eyebrow">beyond the code</div>
            <h2 className="sec-title">A bit about me.</h2>
            <p>Master's student at UC Santa Cruz, graduating June 2026.</p>
            <p>
              I spend most of my time thinking about what happens after you call
              the model: how agents hand off work, catch their own mistakes, and
              hold up when things get weird in production. I've built a few things
              in that space that I'm pretty proud of.
            </p>
            <p>
              Shipped backend at <a href="#experience">BigShorts</a> (early-stage startup) and interned as a Data Science Intern at LTIMindtree.
            </p>
            <p>Trying to figure out how to make AI systems that actually work.</p>

            <div className="skills-block">
              {SKILLS.map((s) => (
                <div key={s.label} className="skill-cat">
                  <h4>{s.label}</h4>
                  <div className="chips">
                    {s.items.map((t) => <span key={t} className="chip">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section" data-screen-label="03 Experience">
      <div className="wrap">
        <div className="reveal">
          <div className="sec-eyebrow">where i've worked</div>
          <h2 className="sec-title">Experience.</h2>
          <p className="sec-sub">
            Backend systems, ML infra, and the bridges between them, across two
            internships shipping production code to real users.
          </p>
        </div>
        <div className="timeline">
          {EXPERIENCE.map((j) => (
            <div key={j.where} className="tl-item reveal">
              <span className="tl-dot" aria-hidden="true"></span>
              <div className="tl-card">
                <div className="tl-head">
                  <span className="tl-role">{j.role}</span>
                  <span className="tl-when">{j.when}</span>
                </div>
                <div className="tl-where">{j.where}</div>
                <ul className="tl-bullets">
                  {j.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Leadership() {
  return (
    <section id="leadership" className="section section--alt" data-screen-label="04 Leadership">
      <div className="wrap">
        <div className="reveal">
          <div className="sec-eyebrow">beyond engineering</div>
          <h2 className="sec-title">Leadership &amp; Beyond.</h2>
          <p className="sec-sub">
            Teaching, mentoring, and community work — the other half of getting things done.
          </p>
        </div>
        <div className="timeline">
          {LEADERSHIP.map((j) => (
            <div key={j.role} className="tl-item reveal">
              <span className="tl-dot" aria-hidden="true"></span>
              <div className="tl-card">
                <div className="tl-head">
                  <span className="tl-role">{j.role}</span>
                  <span className="tl-when">{j.when}</span>
                </div>
                <div className="tl-where">{j.where}</div>
                <ul className="tl-bullets">
                  {j.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section" data-screen-label="05 Projects">
      <div className="wrap">
        <div className="reveal">
          <div className="sec-eyebrow">selected work</div>
          <h2 className="sec-title">Things I've built.</h2>
          <p className="sec-sub">
            Three projects sitting at the intersection of LLMs and real systems
            each one trying to make agents behave like grown-up software.
          </p>
        </div>
        <div className="bento">
          {PROJECTS.map((p) => (
            <a key={p.title} href={p.link} target="_blank" rel="noreferrer" className="proj reveal">
              <div className={"proj-art " + p.art}>
                <span className="glyph">{p.glyph}</span>
              </div>
              <div className="proj-body">
                <div className="proj-tags">
                  {p.tags.map((t) => <span key={t}>{t}</span>)}
                </div>
                <div className="proj-title">{p.title}</div>
                <p className="proj-desc">{p.desc}</p>
                <span className="proj-link">
                  <span>View on GitHub</span><span className="arr">↗</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="section" data-screen-label="05 Education">
      <div className="wrap">
        <div className="reveal">
          <div className="sec-eyebrow">studies</div>
          <h2 className="sec-title">Education.</h2>
          <p className="sec-sub">
            Currently between Santa Cruz hills and a thesis on agentic routing.
          </p>
        </div>
        <div className="edu-grid">
          {EDUCATION.map((e) => (
            <div key={e.where} className="edu-card reveal">
              <div className="edu-when">{e.when}</div>
              <div className="edu-where">{e.where}</div>
              <div className="edu-deg">{e.deg}</div>
              <div className="edu-gpa">{e.gpa}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function Contact() {
  const [status, setStatus] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`portfolio · ${fd.get("name") || "hello"}`);
    const body = encodeURIComponent(`${fd.get("message") || ""}\n\n— ${fd.get("name") || ""} (${fd.get("email") || ""})`);
    window.location.href = `mailto:arshadvani3@gmail.com?subject=${subject}&body=${body}`;
    setStatus("Opening your mail app, message ready to send.");
    e.currentTarget.reset();
  };

  return (
    <section id="contact" className="section section--alt" data-screen-label="06 Contact">
      <div className="wrap">
        <div className="contact-grid">
          <div className="contact-left reveal">
            <div className="sec-eyebrow">let's talk</div>
            <h2>
              Let's build<br/>
              <span className="accent">something good.</span>
            </h2>
            <p>
              Actively looking for full-time new-grad AI/ML and SWE roles starting June 2026.
              and new-grad. If my work fits your team's stack, send a note.
            </p>
            <div className="socials">
              <a className="social" href="mailto:arshadvani3@gmail.com" aria-label="Email"><MailIcon /></a>
              <a className="social" href="https://linkedin.com/in/arshadvani/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
              <a className="social" href="https://github.com/arshadvani3" target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon /></a>
            </div>
            <div className="contact-direct">
              direct: <a href="mailto:arshadvani3@gmail.com">arshadvani3@gmail.com</a>
            </div>
          </div>
          <div className="form-wrap reveal">
            <form onSubmit={onSubmit}>
              <div className="field">
                <input id="cf-name" name="name" type="text" placeholder=" " required />
                <label htmlFor="cf-name">Name</label>
              </div>
              <div className="field">
                <input id="cf-email" name="email" type="email" placeholder=" " required />
                <label htmlFor="cf-email">Email</label>
              </div>
              <div className="field">
                <textarea id="cf-msg" name="message" placeholder=" " rows="4" required></textarea>
                <label htmlFor="cf-msg">Message</label>
              </div>
              <button type="submit" className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
                <span>Send message</span><span className="arr">→</span>
              </button>
              <div className={"form-status" + (status ? " ok" : "")}>{status}</div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="wrap foot">
        <span>designed &amp; built by arsh advani · © {year}</span>
        <button className="top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          back to top ↑
        </button>
      </div>
    </footer>
  );
}

// ─── App + Tweaks ───────────────────────────────────────────────────────────

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useReveal();

  useEffect(() => {
    const a = ACCENTS[t.accent] || ACCENTS.indigo;
    const root = document.documentElement;
    root.style.setProperty("--accent", a.base);
    root.style.setProperty("--accent-2", a.deep);
    root.style.setProperty("--accent-soft", a.soft);
    root.style.setProperty("--accent-glow", a.glow);
    root.style.setProperty("--accent-ring", a.ring);
  }, [t.accent]);

  useEffect(() => {
    const n = document.querySelector(".noise");
    if (n) n.style.display = t.noise ? "" : "none";
  }, [t.noise]);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Leadership />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Color" />
        <TweakSelect
          label="Accent"
          value={t.accent}
          options={Object.keys(ACCENTS)}
          onChange={(v) => setTweak("accent", v)}
        />
        <TweakSection label="Atmosphere" />
        <TweakToggle
          label="Film grain"
          value={t.noise}
          onChange={(v) => setTweak("noise", v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
