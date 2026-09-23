import { useEffect, useRef, useState } from 'react'
import Versatile3DScene from './components/Versatile3DScene'
import ArchitectureViewer from './components/ArchitectureFlow'
import './index.css'

// ─── DATA & CV CONTENT ────────────────────────────────────────────────────────

const systemsData = [
  {
    slug: 'compliance',
    number: '01',
    title: 'Governance AgentCore Architecture',
    category: 'ENTERPRISE AGENTIC GOVERNANCE',
    type: 'agentic',
    description: 'Physical multi-agent architecture (Supervisor + Sub-Agents, AgentCore Memory, Kong Gateway, Amazon Bedrock, MCP Server) governing Enterprise Documents compliance.',
    badge: 'AgentCore · A2A · AWS Bedrock',
    company: 'EY Global Delivery Services'
  },
  {
    slug: 'mcp',
    number: '02',
    title: 'MCP Enterprise Intelligence Platform',
    category: 'KNOWLEDGE SYSTEMS',
    type: 'agentic',
    description: 'Model Context Protocol (MCP) powered intelligence layer connecting Confluence, enterprise KPIs, and internal docs with natural-language agentic search.',
    badge: 'MCP & A2A Protocols',
    company: 'EY Global Delivery Services'
  },
  {
    slug: 'healing',
    number: '03',
    title: 'Self-Healing GenAI Observability Platform',
    category: 'OBSERVABILITY & AUTO-PATCH',
    type: 'agentic',
    description: 'SigNoz OpenTelemetry loop that auto-detects runtime exceptions, synthesizes tested code fixes with LLMs, cutting developer remediation time by ~65%.',
    badge: '65% Faster Remediation',
    company: 'EY Global Delivery Services'
  },
  {
    slug: 'adk',
    number: '04',
    title: 'Custom Agent Development Kit (ADK)',
    category: 'AI PLATFORM & FRAMEWORK',
    type: 'agentic',
    description: 'Standardized production agent development framework published to JFrog Artifactory, adopted by 23+ enterprise engineering teams within month 1.',
    badge: '23+ Enterprise Teams',
    company: 'EY Global Delivery Services'
  },
  {
    slug: 'audit',
    number: '05',
    title: 'Financial Services AI Regulatory Audit',
    category: 'RESPONSIBLE AI',
    type: 'agentic',
    description: 'Low-code AI audit engine built on Dify and GPT-4o for a global tier-1 financial client, automating multi-stage regulatory compliance validation.',
    badge: 'Dify & GPT-4o',
    company: 'EY Global Delivery Services'
  },
  {
    slug: 'leak',
    number: '06',
    title: 'YOLOv8 Oilfield Pipeline Leak Detection',
    category: 'COMPUTER VISION',
    type: 'vision',
    description: 'Autonomous computer vision pipeline processing thermal IR and 4K optical footage to detect hydrocarbon leaks and pipeline integrity defects in desert oilfields.',
    badge: 'YOLOv8 · Edge CV',
    company: 'Tata Consultancy Services'
  },
  {
    slug: 'vision',
    number: '07',
    title: 'CNN Classifier & Tesseract Document Scanner',
    category: 'COMPUTER VISION & OCR',
    type: 'vision',
    description: 'Custom deep convolutional neural network for visual asset classification paired with a morphological Tesseract OCR extraction pipeline.',
    badge: 'CNN & OCR Pipeline',
    company: 'Applied ML Research'
  },
  {
    slug: 'maintenance',
    number: '08',
    title: 'Deep Learning for Industrial IoT Predictive Maintenanc',
    category: 'PREDICTIVE MODELLING',
    type: 'predictive',
    description: 'Daily batch classification engine analyzing vibration, temperature, and acoustic IoT sensor telemetry to preempt oil & gas equipment failure.',
    badge: 'Zero Unplanned Downtime',
    company: 'Tata Consultancy Services'
  }
]

const experienceData = [
  {
    period: 'MAY 2025 — PRESENT',
    company: 'EY Global Delivery Services',
    role: 'Senior Consultant · Senior Data Scientist / AI Architect',
    summary: 'Lead end-to-end technical delivery of AI use cases, solution architecture, SDDs, and multi-agent systems.',
    work: [
      'Lead end-to-end technical delivery of AI use cases, owning requirements gathering, solution architecture, SDDs, architecture decisions, and implementation guidance.',
      'Architected a multi-agent system (fan-in/fan-out: supervisor agent + 8 sub-agents, supporting resources as microservices) serving as the compliance and capability gate across 1,000+ enterprise tools.',
      'Designed and shipped a custom Agent Development Kit (distributed via JFrog Artifactory), adopted by 23+ teams within a single month.',
      'Directed design of an MCP-based intelligence platform enabling natural-language search across Confluence, KPIs, and internal docs — eliminating manual search time.',
      'Architected a self-healing GenAI platform (SigNoz observability) that auto-detects bugs and generates code fixes for developer review — cutting remediation time by ~65%.',
      'Led delivery of a low-code AI audit platform (Dify, GPT-4o) for a global financial services client, automating regulatory compliance validation.'
    ]
  },
  {
    period: 'SEP 2024 — MAY 2025',
    company: 'PwC Acceleration Centre',
    role: 'Associate 2 · Data Scientist',
    summary: 'GenAI document intelligence, enterprise event architecture, and security-gated CI/CD.',
    work: [
      'Architected a GenAI document-extraction solution (Azure OpenAI GPT-4o) for Workday data — drove a 75% efficiency gain over manual processing.',
      'Designed integration architecture using Azure Functions and Azure Service Bus for large-scale automated processing.',
      'Established CI/CD architecture (Azure DevOps) with integrated security gating (Black Duck, Veracode).',
      'Deployed a containerised file-conversion service to Azure Container Registry (ACR) via Azure Functions.'
    ]
  },
  {
    period: 'OCT 2021 — AUG 2024',
    company: 'Tata Consultancy Services',
    role: 'Systems Engineer · Data Scientist',
    summary: 'IoT sensor predictive models, computer vision leak detection, RAG chatbots, and cloud extraction.',
    work: [
      'Built a classification model on IoT sensor data from an oil & gas client\'s machinery, running daily batch predictions to flag equipment needing service and trigger automated alerts, reducing unplanned downtime.',
      'Trained and deployed a custom YOLOv8 computer vision model for pipeline leak detection in desert oilfield environments.',
      'Built a GenAI analytics tool using Azure OpenAI GPT-4 to retrieve KPIs across markets and dimensions, cutting retrieval time by 50%.',
      'Designed a RAG-based customer service chatbot (Google Gemini 1.5 Pro) for automated inquiry resolution.',
      'Developed and deployed predictive models to improve customer insight and engagement for a retail client.',
      'Architected a custom data-extraction pipeline (Google Cloud) for an oil & gas client — 80% faster document retrieval.',
      'Built a custom Named Entity Recognition (NER) model with spaCy to extract entities from user prompts for LLM input and persistent user preferences.'
    ]
  },
  {
    period: 'MAR 2021 — SEP 2021',
    company: 'Extentia Information Technology',
    role: 'Trainee · Data Analyst',
    summary: 'Data profiling, cleansing, and automated ETL pipelines.',
    work: [
      'Performed data profiling to identify anomalies, missing values, and inconsistencies across datasets.',
      'Implemented data cleansing techniques to improve data accuracy and reliability.',
      'Built and ran inbound/outbound ETL jobs on a custom Data Processing Engine (DPE) using scheduled SSIS jobs.',
      'Built stored procedures and functions to automate recurring data processes.'
    ]
  }
]

// ─── HOOKS ─────────────────────────────────────────────────────────────────────

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed')
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  })
}

function useActiveSection() {
  const [active, setActive] = useState('top')
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { threshold: 0.28 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])
  return active
}

// ─── ANIMATED COUNTER ──────────────────────────────────────────────────────────

function AnimatedCounter({ target, suffix }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1800
          const t0 = performance.now()
          const tick = (now) => {
            const elapsed = now - t0
            const t = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - t, 4)
            setValue(Math.floor(eased * target))
            if (t < 1) requestAnimationFrame(tick)
            else setValue(target)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <strong ref={ref}>
      {value}<span>{suffix}</span>
    </strong>
  )
}

// ─── SCROLL PROGRESS ───────────────────────────────────────────────────────────

function ScrollProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      if (scrollHeight - clientHeight > 0) {
        setPct((scrollTop / (scrollHeight - clientHeight)) * 100)
      }
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return <div className="scroll-progress" style={{ width: pct + '%' }} aria-hidden="true" />
}

// ─── MODALS ────────────────────────────────────────────────────────────────────

function ArchitectureModal({ slug, close }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close])

  if (!slug) return null

  return (
    <div className="architecture-overlay" role="dialog" aria-modal="true" onClick={(e) => e.target === e.currentTarget && close()}>
      <button className="modal-close-btn" onClick={close} aria-label="Close architecture modal">×</button>
      <div className="architecture-modal">
        <ArchitectureViewer slug={slug} onClose={close} />
      </div>
    </div>
  )
}

function ExperienceModal({ item, close }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close])

  if (!item) return null
  return (
    <div className="experience-overlay" role="dialog" aria-modal="true" onClick={(e) => e.target === e.currentTarget && close()}>
      <button className="modal-close-btn" onClick={close} aria-label="Close experience details">×</button>
      <div className="experience-modal">
        <span className="kicker">EXPERIENCE / {item.period}</span>
        <h2>{item.company}</h2>
        <span className="exp-modal-role">{item.role}</span>
        <p className="exp-modal-summary">{item.summary}</p>
        <ul>
          {item.work.map((w) => <li key={w}>{w}</li>)}
        </ul>
      </div>
    </div>
  )
}

// ─── MAIN APP COMPONENT ────────────────────────────────────────────────────────

function App() {
  const [selectedArch, setSelectedArch]     = useState(null)
  const [selectedExp, setSelectedExp]       = useState(null)
  const [menuOpen, setMenuOpen]             = useState(false)
  const [filterCategory, setFilterCategory] = useState('all')
  const [cursor, setCursor]                 = useState({ x: -200, y: -200, hover: false })
  const activeSection = useActiveSection()
  useScrollReveal()

  // Track pointer for desktop custom cursor
  useEffect(() => {
    const onMove = (e) => setCursor((c) => ({ ...c, x: e.clientX, y: e.clientY }))
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  // Magnetic cursor hover detection
  useEffect(() => {
    const targets = document.querySelectorAll('a, button, .system-card, .arch-tab-btn')
    const on  = () => setCursor((c) => ({ ...c, hover: true }))
    const off = () => setCursor((c) => ({ ...c, hover: false }))
    targets.forEach((el) => {
      el.addEventListener('mouseenter', on)
      el.addEventListener('mouseleave', off)
    })
    return () => {
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', on)
        el.removeEventListener('mouseleave', off)
      })
    }
  })

  const closeMenu = () => setMenuOpen(false)

  const navLinks = [
    ['expertise',   'Expertise'],
    ['impact',      'Impact'],
    ['systems',     'Systems & Architecture'],
    ['experience',  'Experience'],
    ['recognition', 'Recognition'],
    ['contact',     'Contact'],
  ]

  const filteredSystems = filterCategory === 'all'
    ? systemsData
    : systemsData.filter((s) => s.type === filterCategory)

  return (
    <div className="portfolio">
      {/* Custom magnetic cursor on desktop */}
      <div
        className={'custom-cursor' + (cursor.hover ? ' cursor-hover' : '')}
        style={{ left: cursor.x, top: cursor.y }}
        aria-hidden="true"
      >
        <span className="cur-dot" />
        <span className="cur-ring" />
      </div>

      {/* Global Scroll Progress */}
      <ScrollProgress />

      {/* ── HEADER ── */}
      <header className="header">
        <a className="brand" href="#top" onClick={closeMenu}>
          <span className="brand-badge">RC</span>
          RUDRANEEL CHAKRABORTY
        </a>

        <button
          className={'menu-toggle' + (menuOpen ? ' menu-open' : '')}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span /><span /><span />
        </button>

        <nav className={menuOpen ? 'open' : ''}>
          {navLinks.map(([id, label]) => (
            <a
              key={id}
              href={'#' + id}
              className={activeSection === id ? 'nav-active' : ''}
              onClick={closeMenu}
            >
              {label}
            </a>
          ))}
          {/* Mobile-only CV button in menu drawer */}
          <a
            href="/resume/Rudraneel_Chakraborty_CV.pdf"
            download="Rudraneel_Chakraborty_CV.pdf"
            className="nav-cv-btn-mobile"
            onClick={closeMenu}
          >
            Download CV ↓
          </a>
        </nav>

        {/* Single Download CV button in header actions */}
        <div className="header-actions">
          <a
            href="/resume/Rudraneel_Chakraborty_CV.pdf"
            download="Rudraneel_Chakraborty_CV.pdf"
            className="nav-cv-btn"
          >
            Download CV ↓
          </a>
          <a className="availability" href="#contact">
            <span className="avail-dot" /> OPEN TO RELOCATION
          </a>
        </div>
      </header>

      <main id="top">

        {/* ── HERO SECTION ── */}
        <section className="hero">
          {/* Versatile 3D Quantum Wave Field Background */}
          <Versatile3DScene />

          <div className="hero-copy">
            <span className="kicker reveal">SENIOR DATA SCIENTIST / AI ARCHITECT</span>
            <h1 className="hero-headline">
              <span className="line-reveal">Architecting</span>
              <br />
              <em className="line-reveal line-reveal-delay">intelligence at scale.</em>
            </h1>
            <p className="reveal" style={{ transitionDelay: '0.15s' }}>
              Leading production AI from requirements and solution architecture through multi-agent orchestration, computer vision, and predictive systems.
            </p>
            <div className="hero-actions reveal" style={{ transitionDelay: '0.28s' }}>
              <a href="#systems">Explore Systems ↓</a>
              <a
                href="/resume/Rudraneel_Chakraborty_CV.pdf"
                download="Rudraneel_Chakraborty_CV.pdf"
                className="hero-btn-cv"
              >
                Download CV (PDF) ↓
              </a>
              <a href="#contact">Contact me ↘</a>
            </div>
          </div>

          <div className="hero-terminal reveal" style={{ transitionDelay: '0.45s' }}>
            <span>TERMINAL / STATUS</span>
            <b>LOCATION: KOLKATA, INDIA</b>
            <b>EXPERIENCE: 06+ YEARS</b>
            <b>CORE: MULTI-AGENT / CV / ML</b>
            <b className="status-line"><span className="status-dot" />STATUS: AVAILABLE</b>
          </div>
        </section>

        {/* ── TECHNICAL EXPERTISE ── */}
        <section className="profile" id="expertise">
          <div className="section-label reveal">01 / TECHNICAL EXPERTISE</div>
          <div className="profile-intro">
            <h2 className="reveal">From requirements<br />to <em>production delivery.</em></h2>
            <p className="reveal" style={{ transitionDelay: '0.12s' }}>
              Hands-on experience across agentic AI, multi-agent fan-out orchestration, RAG, predictive ML, edge computer vision, and cloud MLOps platforms with end-to-end architecture decisions.
            </p>
          </div>
          <div className="expertise-grid">
            {[
              ['01', 'GENAI & AGENTIC SYSTEMS',  'RAG · Prompt Engineering · LLM Evaluation · Multi-Agent Orchestration · MCP & A2A · LangGraph · Strands · ADK'],
              ['02', 'COMPUTER VISION & ML',      'YOLOv8 Detection · CNNs · Image Classification · Tesseract OCR · spaCy NER · PyTorch · TensorFlow'],
              ['03', 'PREDICTIVE MODELLING',     'IoT Sensor Telemetry · Anomaly Detection · XGBoost · LightGBM · Time Series Feature Stores · Scikit-Learn'],
              ['04', 'CLOUD & OBSERVABILITY',    'FastAPI · Docker · Kubernetes · Azure · AWS · GCP · SigNoz · OpenTelemetry · CI/CD Gates'],
            ].map(([num, title, desc], i) => (
              <article key={num} className="reveal" style={{ transitionDelay: i * 0.1 + 's' }}>
                <span>{num}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── IMPACT METRICS ── */}
        <section className="metrics" id="impact">
          <div className="section-label reveal">02 / MEASURABLE IMPACT</div>
          <div className="metrics-grid">
            {[
              { target: 75, suffix: '%',  label: 'document processing efficiency gain (Azure OpenAI)' },
              { target: 65, suffix: '%',  label: 'developer remediation time cut via self-healing AI' },
              { target: 23, suffix: '+',  label: 'enterprise engineering teams adopted custom ADK' },
              { target: 1,  suffix: 'K+', label: 'tools secured by multi-agent capability gate' },
            ].map(({ target, suffix, label }, i) => (
              <div key={label} className="reveal" style={{ transitionDelay: i * 0.1 + 's' }}>
                <AnimatedCounter target={target} suffix={suffix} />
                <p>{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SYSTEMS & PROJECTS ── */}
        <section className="systems" id="systems">
          <div className="section-label reveal">03 / PRODUCTION SYSTEMS &amp; ARCHITECTURES</div>
          <div className="systems-head">
            <h2 className="reveal">Systems engineered<br /><em>for production.</em></h2>
            <p className="reveal" style={{ transitionDelay: '0.12s' }}>
              Click any system card to view its live interactive architecture flow, data pipeline, and blueprint specifications.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="systems-filter-bar reveal">
            {[
              ['all', 'All Systems (8)'],
              ['agentic', 'Agentic AI & Multi-Agent (5)'],
              ['vision', 'Computer Vision (2)'],
              ['predictive', 'Predictive Modelling & IoT (1)'],
            ].map(([key, label]) => (
              <button
                key={key}
                className={`filter-tab ${filterCategory === key ? 'active' : ''}`}
                onClick={() => setFilterCategory(key)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="system-grid">
            {filteredSystems.map((item, index) => (
              <button
                className="system-card reveal"
                key={item.slug}
                onClick={() => setSelectedArch(item.slug)}
                style={{ transitionDelay: (index % 2) * 0.1 + 's' }}
              >
                <span>{item.number} / {item.category}</span>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
                <b>View Architecture Flow ↗</b>
              </button>
            ))}
          </div>
        </section>

        {/* ── PROFESSIONAL TRAJECTORY ── */}
        <section className="experience" id="experience">
          <div className="section-label reveal">04 / PROFESSIONAL TRAJECTORY</div>
          <div className="experience-head">
            <h2 className="reveal">Proven record in<br /><em>enterprise AI.</em></h2>
            <p className="reveal" style={{ transitionDelay: '0.12s' }}>
              Click any company to view the full scope of architectures and production models delivered.
            </p>
          </div>
          <div className="experience-list">
            {experienceData.map((item, index) => (
              <article key={item.company} className="reveal" style={{ transitionDelay: index * 0.09 + 's' }}>
                <button className="experience-trigger" onClick={() => setSelectedExp(item)}>
                  <span className="exp-period">{item.period}</span>
                  <div className="exp-body">
                    <strong className="exp-company">{item.company}</strong>
                    <span className="exp-role">{item.role}</span>
                    <p className="exp-summary">{item.summary}</p>
                  </div>
                  <span className="exp-arrow">↗</span>
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* ── RECOGNITION & AWARDS ── */}
        <section className="recognition" id="recognition">
          <div className="section-label reveal">05 / RECOGNITION &amp; CERTIFICATIONS</div>
          <div className="recognition-grid">
            {[
              ['01', 'Client CTO Recognition', 'Commended by client CTO, Director, and Delivery Manager for end-to-end production GenAI implementation from concept to deployment.'],
              ['02', '5x Delivery Awards', '4x Spotlight Award and 1x Employee of the Month for outstanding engineering contributions across AI projects.'],
              ['03', 'Industry Certifications', 'Azure Data Scientist Associate · Azure AI Apps & Agents Developer Associate · GitHub Copilot Developer · Oracle Cloud Infrastructure Foundations.'],
            ].map(([num, title, desc], i) => (
              <article key={num} className="reveal" style={{ transitionDelay: i * 0.12 + 's' }}>
                <span>{num}</span>
                <strong>{title}</strong>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── EDUCATION & ACADEMIC MERIT ── */}
        <section className="education" id="education">
          <div className="section-label reveal">06 / EDUCATION</div>
          <div className="credentials">
            <div className="reveal">
              <span>B.TECH · GRADUATED JULY 2021</span>
              <strong>Computer Science &amp; Engineering</strong>
              <p>Pailan College of Management and Technology, Kolkata · GPA: 9.06 / 10</p>
            </div>
            <div className="reveal" style={{ transitionDelay: '0.14s' }}>
              <span>RELOCATION PREFERENCE</span>
              <strong>Open to Global Relocation</strong>
              <p>Actively open to relocation across UK, EU, US, Nordics, and UAE for Senior AI Architect &amp; Data Scientist roles.</p>
            </div>
          </div>
        </section>

        {/* ── CONTACT & RESUME DOWNLOAD ── */}
        <section className="contact" id="contact">
          <div className="contact-copy">
            <div className="section-label reveal">07 / CONTACT &amp; RESUME</div>
            <h2 className="reveal">{"Let's architect"}<br /><em>{"the next AI platform."}</em></h2>

            <div className="contact-links reveal" style={{ transitionDelay: '0.12s' }}>
              <a href="mailto:Rudraneel350@gmail.com">Rudraneel350@gmail.com ↗</a>
              <a href="tel:+918013388429">+91 8013388429 ↗</a>
              <a href="https://www.linkedin.com/in/rudraneel-chakraborty/" target="_blank" rel="noreferrer">LinkedIn Profile ↗</a>
              <a href="https://github.com/Rudraneelchakraborty" target="_blank" rel="noreferrer">GitHub Profile ↗</a>
            </div>

            {/* Resume Download Card */}
            <div className="resume-download-box reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="resume-card-header">
                <span className="resume-pill">OFFICIAL CURRICULUM VITAE</span>
                <span className="resume-size">PDF · 285 KB</span>
              </div>
              <h3>Rudraneel Chakraborty — CV</h3>
              <p>
                Complete international resume detailing production multi-agent architectures, computer vision pipelines, IoT predictive models, and cloud MLOps delivery.
              </p>
              <div className="resume-btn-group">
                <a
                  href="/resume/Rudraneel_Chakraborty_CV.pdf"
                  download="Rudraneel_Chakraborty_CV.pdf"
                  className="resume-btn-primary"
                >
                  📥 Download Resume (PDF)
                </a>
                <a
                  href="/resume/Rudraneel_Chakraborty_CV.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="resume-btn-secondary"
                >
                  View in Browser ↗
                </a>
              </div>
            </div>
          </div>

          <div className="profile-image reveal" style={{ transitionDelay: '0.22s' }}>
            <img
              src="/profile.jpg"
              alt="Rudraneel Chakraborty"
              onError={(e) => {
                if (!e.currentTarget.dataset.fallback) {
                  e.currentTarget.dataset.fallback = 'true'
                  e.currentTarget.src = '/profile.png'
                } else {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.nextElementSibling.style.display = 'block'
                }
              }}
            />
            <span>RUDRANEEL CHAKRABORTY<br />AI Architect &amp; Data Scientist</span>
          </div>
        </section>
      </main>

      <footer>
        <span>© {new Date().getFullYear()} RUDRANEEL CHAKRABORTY</span>
        <span>ARCHITECTING INTELLIGENCE AT SCALE</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>

      {/* Architecture Modal pops up when any project card is clicked */}
      {selectedArch && <ArchitectureModal slug={selectedArch} close={() => setSelectedArch(null)} />}
      {selectedExp  && <ExperienceModal  item={selectedExp}   close={() => setSelectedExp(null)} />}
    </div>
  )
}

export default App
