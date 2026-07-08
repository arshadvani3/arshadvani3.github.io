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
  { id: "projects",   label: "Work" },
  { id: "leadership", label: "Beyond" },
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
      "Built and owned a production LLM assistant on Azure serving 10,000+ users, architecting the full RAG pipeline with an orchestration loop handling tool routing, context management, and fallback retries at sub-2s p95 latency.",
      "Engineered a two-stage retrieval-plus-validation layer with structured logging and latency tracing, cutting irrelevant responses 60% while driving prompt and chunking iterations that lowered the production hallucination rate.",
      "Architected a Node.js and MySQL content backend for the same 10,000+ user product across 6 JWT-authenticated REST APIs at sub-200ms, eliminating N+1 queries and applying denormalization to improve read performance 40%.",
      "Deployed a serverless AWS Lambda video pipeline converting 500+ uploads to HLS adaptive bitrate streams via FFmpeg and CloudFront CDN, cutting bandwidth consumption 35%.",
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
    role: "Teaching Assistant — PHYS 5: Introductory Physics",
    where: "UC Santa Cruz",
    when: "Spring 2026",
    bullets: [
      "Broke down complex physics concepts (optics, mechanics, wave theory, polarization) for 60+ students with varied backgrounds through structured lab instruction.",
      "Designed lab walkthroughs that made abstract theory tangible and measurable.",
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
    role: "Teaching Assistant — CSE 183: Web Applications",
    where: "UC Santa Cruz",
    when: "Spring 2025",
    bullets: [
      "Led weekly discussion sections for 100+ students, translating complex concepts into interactive problem-solving sessions.",
      "Delivered detailed written feedback on assignments, consistently rated highly for clarity and accessibility.",
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
    title: "MCP Gateway",
    glyph: "01 — agentic orchestration",
    art: "art-1",
    artKind: "graph",
    tags: ["LangGraph", "FastAPI", "MCP", "Postgres", "OPA"],
    desc: "A secure agentic orchestration platform built on the Model Context Protocol. Describe a task in natural language and a LangGraph plan-execute-review loop carries it out across 40 tools spanning GitHub, Slack, Jira, Google Drive, and a pgvector knowledge base — with human-in-the-loop approval gates, OPA-based access control, a tamper-evident SHA-256 audit chain, and a real-time streaming dashboard.",
    link: "https://github.com/arshadvani3/MCP-Gateway",
  },
  {
    title: "AgentMesh",
    glyph: "02 — p2p agent routing",
    art: "art-2",
    artKind: "mesh",
    tags: ["Python", "FastAPI", "LangGraph", "WebSockets"],
    desc: "A peer-to-peer protocol for AI agent discovery, routing, and reputation. Agents register capabilities at startup and are matched at runtime via semantic search, ELO-style trust scoring, and cost-aware routing, with circuit breaker patterns for resilience. Supports three-way negotiation (accept/reject/counter) and WebSocket-based task execution.",
    link: "https://github.com/arshadvani3/AgentMesh",
  },
  {
    title: "AgentProbe",
    glyph: "03 — llm red-teaming",
    art: "art-3",
    artKind: "scan",
    tags: ["LangGraph", "FastAPI", "Postgres", "Groq"],
    desc: "A multi-agent platform that stress-tests any AI agent's HTTP API without needing internal access. Seven coordinated LangGraph agents run a 25-pattern injection battery across 7 categories, score responses on accuracy, hallucination, and safety, and auto-escalate test difficulty when pass rates exceed 90%.",
    link: "https://github.com/arshadvani3/Agentprobe",
  },
  {
    title: "DevDocs AI",
    glyph: "04 — production rag",
    art: "art-4",
    artKind: "docs",
    tags: ["Qdrant", "HuggingFace", "Redis", "FastAPI"],
    desc: "A production RAG assistant for asking natural language questions about any codebase. Point it at a GitHub repo and get streaming answers with source citations. AST-aware chunking across 23+ languages, parallel batch embeddings, multi-collection indexing, and two-tier Redis caching for low-latency retrieval.",
    link: "https://github.com/arshadvani3/devdocs-ai",
  },
  {
    title: "Revi IQ",
    glyph: "05 — applied ml + llm",
    art: "art-5",
    artKind: "taste",
    tags: ["Python", "LLM", "RecSys", "React"],
    desc: "One customer-taste model powering three restaurant-network levers: live kiosk upsell with expected-value ranking, cross-restaurant discovery via taste vectors and collaborative filtering, and LLM-generated win-back campaigns with plain-English customer search. Runs end to end with real LLM calls, and every suggestion ships with an explain panel showing the math behind it.",
    link: "https://github.com/arshadvani3/Revi-IQ",
  },
];

const EDUCATION = [
  {
    when: "Jun 2026",
    where: "UC Santa Cruz",
    deg: "M.S. Computer Science",
    gpa: "Santa Cruz, CA",
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

// ─── Cursor spotlight on cards ──────────────────────────────────────────────

function useSpotlight() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const cards = Array.from(document.querySelectorAll(".spot"));
    const pairs = cards.map((el) => {
      const onMove = (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", (e.clientX - r.left) + "px");
        el.style.setProperty("--my", (e.clientY - r.top) + "px");
      };
      el.addEventListener("mousemove", onMove);
      return [el, onMove];
    });
    return () => pairs.forEach(([el, onMove]) => el.removeEventListener("mousemove", onMove));
  }, []);
}

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
          <span>open to full-time AI/ML & SWE roles · available now</span>
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
            <span className="hm-v">Graduated June 2026 — available full-time immediately</span>
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
            <p>M.S. in Computer Science from UC Santa Cruz, June 2026.</p>
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
          </div>
          <div className="skills-block spot reveal">
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
              <div className="tl-card spot">
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
    <section id="leadership" className="section" data-screen-label="05 Leadership">
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
              <div className="tl-card spot">
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

function ProjectArt({ kind }) {
  const line = "rgba(255,255,255,0.30)";
  const dim = "rgba(255,255,255,0.16)";

  if (kind === "graph") {
    // Hub-and-spoke orchestration graph
    const hub = [200, 150];
    const tools = [[70, 55], [325, 65], [55, 225], [340, 215], [150, 35], [255, 265]];
    return (
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ color: "#a5b4fc" }}>
        {tools.map(([x, y], i) => (
          <line key={"e" + i} x1={hub[0]} y1={hub[1]} x2={x} y2={y} stroke={line} strokeWidth="1" className="art-anim-dash" />
        ))}
        <line x1={tools[0][0]} y1={tools[0][1]} x2={tools[4][0]} y2={tools[4][1]} stroke={dim} strokeWidth="1" />
        <line x1={tools[1][0]} y1={tools[1][1]} x2={tools[3][0]} y2={tools[3][1]} stroke={dim} strokeWidth="1" />
        {tools.map(([x, y], i) => (
          <rect key={"t" + i} x={x - 7} y={y - 7} width="14" height="14" rx="3"
                fill="none" stroke={line} strokeWidth="1.2" />
        ))}
        <circle cx={hub[0]} cy={hub[1]} r="26" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" className="art-anim-pulse" />
        <circle cx={hub[0]} cy={hub[1]} r="11" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx={hub[0]} cy={hub[1]} r="3.5" fill="currentColor" />
      </svg>
    );
  }

  if (kind === "mesh") {
    // Decentralized p2p mesh — no center
    const nodes = [[55, 70], [150, 45], [265, 60], [355, 105], [90, 165], [200, 140], [310, 175], [60, 255], [175, 250], [290, 260], [365, 230]];
    const edges = [[0, 1], [1, 2], [2, 3], [0, 4], [1, 5], [2, 5], [3, 6], [4, 5], [5, 6], [4, 7], [5, 8], [6, 9], [7, 8], [8, 9], [9, 10], [6, 10], [2, 6], [4, 8]];
    return (
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ color: "#5eead4" }}>
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
                stroke={i % 4 === 0 ? line : dim} strokeWidth="1" />
        ))}
        {nodes.map(([x, y], i) => (
          <circle key={"n" + i} cx={x} cy={y} r={i % 3 === 0 ? 5 : 3.5}
                  fill={i % 5 === 0 ? "currentColor" : "none"}
                  stroke={i % 5 === 0 ? "none" : line} strokeWidth="1.3"
                  className={i % 3 === 1 ? "art-anim-pulse" : undefined}
                  style={i % 3 === 1 ? { animationDelay: (i * 0.6) + "s" } : undefined} />
        ))}
      </svg>
    );
  }

  if (kind === "scan") {
    // Red-team scan — scanlines + crosshair
    return (
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ color: "#fda4af" }}>
        {[30, 70, 110, 150, 190, 230, 270].map((y) => (
          <line key={y} x1="0" y1={y} x2="400" y2={y} stroke={dim} strokeWidth="1" />
        ))}
        <g className="art-anim-scan">
          <rect x="0" y="0" width="400" height="2" fill="currentColor" opacity="0.55" />
        </g>
        <g fill="none" stroke="currentColor" strokeWidth="1.4">
          <circle cx="272" cy="118" r="34" opacity="0.85" />
          <circle cx="272" cy="118" r="14" opacity="0.6" />
          <line x1="272" y1="72" x2="272" y2="94" />
          <line x1="272" y1="142" x2="272" y2="164" />
          <line x1="226" y1="118" x2="248" y2="118" />
          <line x1="296" y1="118" x2="318" y2="118" />
        </g>
        <g fill="none" stroke={line} strokeWidth="1.6">
          <path d="M52 84 h-14 v40 h14" />
          <path d="M118 84 h14 v40 h-14" />
        </g>
        <g fill={line} fontFamily="monospace" fontSize="11">
          <text x="48" y="228">&gt;_ inject 25/25</text>
        </g>
      </svg>
    );
  }

  if (kind === "docs") {
    // Code lattice — indented lines with citation ticks
    const rows = [
      [36, 30, 150], [36, 54, 210], [64, 78, 120], [64, 102, 180], [92, 126, 96],
      [64, 150, 200], [36, 174, 160], [64, 198, 140], [36, 222, 230], [64, 246, 110],
    ];
    return (
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ color: "#fcd34d" }}>
        {rows.map(([x, y, w], i) => (
          <rect key={i} x={x} y={y} width={w} height="9" rx="4.5"
                fill={i === 3 || i === 8 ? "currentColor" : "none"}
                stroke={i === 3 || i === 8 ? "none" : (i % 2 ? line : dim)}
                strokeWidth="1.2"
                opacity={i === 3 || i === 8 ? 0.75 : 1}
                className={i === 3 || i === 8 ? "art-anim-pulse" : undefined}
                style={i === 8 ? { animationDelay: "2s" } : undefined} />
        ))}
        <g stroke="currentColor" strokeWidth="1.4" opacity="0.7">
          <line x1="330" y1="102" x2="344" y2="102" />
          <line x1="330" y1="246" x2="344" y2="246" />
        </g>
        <g fill={line} fontFamily="monospace" fontSize="11">
          <text x="330" y="92">[1]</text>
          <text x="330" y="236">[2]</text>
        </g>
      </svg>
    );
  }

  // taste — dot clusters joined by soft arcs
  const clusters = [
    { c: [95, 85], pts: [[70, 60], [118, 55], [128, 95], [78, 112], [100, 82]] },
    { c: [300, 120], pts: [[275, 95], [328, 100], [318, 148], [270, 140], [298, 118]] },
    { c: [185, 235], pts: [[160, 212], [212, 215], [205, 258], [162, 255], [186, 232]] },
  ];
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ color: "#67e8f9" }}>
      <g fill="none" stroke={line} strokeWidth="1" className="art-anim-dash">
        <path d="M95 85 Q 200 30 300 120" />
        <path d="M300 120 Q 290 210 185 235" />
        <path d="M95 85 Q 90 190 185 235" />
      </g>
      {clusters.map((cl, ci) =>
        cl.pts.map(([x, y], i) => (
          <circle key={ci + "-" + i} cx={x} cy={y} r={i === 4 ? 6 : 3}
                  fill={i === 4 ? "currentColor" : "none"}
                  stroke={i === 4 ? "none" : line} strokeWidth="1.2"
                  className={i === 4 ? "art-anim-pulse" : undefined}
                  style={i === 4 ? { animationDelay: (ci * 1.3) + "s" } : undefined} />
        ))
      )}
    </svg>
  );
}

function Projects() {
  return (
    <section id="projects" className="section section--alt" data-screen-label="04 Projects">
      <div className="wrap">
        <div className="reveal">
          <div className="sec-eyebrow">selected work</div>
          <h2 className="sec-title">Things I've built.</h2>
          <p className="sec-sub">
            Five projects at the intersection of LLMs and real systems — each
            one trying to make agents behave like grown-up software.
          </p>
        </div>
        <div className="bento">
          {PROJECTS.map((p) => (
            <a key={p.title} href={p.link} target="_blank" rel="noreferrer" className="proj spot reveal">
              <div className={"proj-art " + p.art}>
                <ProjectArt kind={p.artKind} />
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
            Building the thing that builds the thing.
          </p>
        </div>
        <div className="edu-grid">
          {EDUCATION.map((e) => (
            <div key={e.where} className="edu-card spot reveal">
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
              <span className="accent">Let's build.</span>
            </h2>
            <p>
              Graduated June 2026, looking for full-time new-grad roles in AI/ML and SWE — available immediately.
              If you're building something ambitious and need someone who can ship across the stack, reach out.
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
          <div className="form-wrap spot reveal">
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
  useSpotlight();

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
        <Projects />
        <Leadership />
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
