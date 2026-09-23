import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  securityLevel: 'strict',
  fontFamily: "'IBM Plex Mono', monospace",
  themeVariables: { darkMode: true, background: '#070d14', mainBkg: '#0d1624', nodeBorder: '#ff8066', textColor: '#eef1f0', lineColor: '#ff8066', edgeLabelBackground: '#0d1624', clusterBkg: '#0a101b', clusterBorder: 'rgba(255, 128, 102, 0.3)', defaultLinkColor: '#ffaa80', fontSize: '12px' }
})

// These are intentionally generalized public reference architectures. No employer,
// client, account, repository, internal system, or environment name is included.
const architectureDiagrams = {
  compliance: { title: 'Multi-Agent Governance Architecture', category: 'ENTERPRISE AGENTIC GOVERNANCE', description: 'A generalized multi-agent review platform with policy controls, secure tool access, and auditable reporting.', mermaid: `flowchart TB
    Users[Architecture and delivery teams] --> Portal[Secure review portal]
    Portal --> Supervisor[Supervisor agent]
    Supervisor <--> Specialists[Specialist review agents]
    Supervisor --> ModelGateway[Model gateway]
    Specialists <--> ToolGateway[Authenticated tool gateway]
    Supervisor <--> Memory[(Scoped session memory)]
    Specialists --> Report[Governance report]
    ToolGateway --> Policy[Identity and policy controls]
    Supervisor --> Observability[Logs, traces and metrics]` },
  mcp: { title: 'Enterprise Knowledge Intelligence Platform', category: 'KNOWLEDGE SYSTEMS', description: 'A generalized protocol-based knowledge layer for grounded, permission-aware answers.', mermaid: `flowchart LR
    User[Delivery team] --> Query[Natural-language query]
    Query --> Agent[Context-aware agent]
    Agent <--> Protocol[Tool protocol client]
    Protocol <--> Sources[Approved knowledge sources]
    Sources <--> Index[(Hybrid search index)]
    Index --> Ranker[Re-ranker]
    Ranker --> Model[Language model]
    Model --> Answer[Grounded answer with citations]` },
  healing: { title: 'Self-Healing Observability Platform', category: 'OBSERVABILITY AND AUTOMATION', description: 'A generalized telemetry-to-review loop that proposes tested remediation for developer approval.', mermaid: `flowchart LR
    Runtime[Production services] --> Telemetry[Traces, logs and metrics]
    Telemetry --> Detector[Exception and drift detector]
    Detector --> Diagnosis[Diagnostic agent]
    Diagnosis <--> CodeIndex[Sanitized code index]
    Diagnosis --> Patch[Proposed code change]
    Patch --> Tests[Isolated test runner]
    Tests -->|Pass| Review[Developer review]
    Tests -->|Needs work| Diagnosis` },
  adk: { title: 'Agent Development Kit Architecture', category: 'AI ENABLEMENT', description: 'A generalized reusable framework that standardizes agent state, tools, safeguards, and releases.', mermaid: `flowchart LR
    Package[Agent development kit] --> State[State and memory layer]
    Package --> Tools[Standard tool adapters]
    Package --> Guardrails[Safety and policy checks]
    Package --> Release[Automated release pipeline]
    Release --> Registry[Private package registry]
    Registry --> Teams[Product engineering teams]
    Teams --> Feedback[Versioned improvement feedback]` },
  audit: { title: 'AI Regulatory Audit Platform', category: 'RESPONSIBLE AI', description: 'A generalized document-to-scorecard workflow for repeatable compliance review and human approval.', mermaid: `flowchart TD
    Documents[Regulatory and policy documents] --> Prepare[Document preparation]
    Prepare --> Rules[Policy evaluation matrix]
    Rules --> Reasoner[Multi-stage reasoning service]
    Reasoner --> Scorecard[Compliance scorecard]
    Reasoner --> AuditLog[Signed audit trail]
    Scorecard --> Review[Compliance reviewer]
    Review --> Outcome[Approved review outcome]` },
  leak: { title: 'Pipeline Anomaly Detection', category: 'COMPUTER VISION', description: 'A generalized edge-to-alert workflow for visual anomaly detection in industrial environments.', mermaid: `flowchart TD
    Capture[Field camera feeds] --> Calibration[Frame calibration]
    Calibration --> Prepare[Edge preprocessing]
    Prepare --> Model[Vision detection model]
    Model --> Classify{Anomaly detected?}
    Classify -->|Yes| Location[Location and severity tagging]
    Location --> Alert[Operations alert]
    Classify -->|No| Archive[Monitoring archive]` },
  vision: { title: 'CNN Classification and OCR Pipeline', category: 'COMPUTER VISION AND OCR', description: 'A generalized dual-inference pipeline that turns images and documents into structured data.', mermaid: `flowchart LR
    Input[Image or document] --> Clean[Normalize and deskew]
    Clean --> CNN[Image classifier]
    Clean --> OCR[Text recognition]
    CNN --> Labels[Category and confidence]
    OCR --> Fields[Extracted fields]
    Labels --> Output[Structured result]
    Fields --> Output` },
  maintenance: {
  title: 'Deep Learning for Industrial IoT Predictive Maintenance',
  category: 'PREDICTIVE MODELLING AND IoT',
  description:
    'An end-to-end predictive maintenance pipeline using multi-source industrial telemetry to identify machinery requiring inspection or service and automatically route maintenance actions.',
  mermaid: `flowchart LR
    Sensors[Industrial IoT Telemetry<br/>Temperature • Vibration • Acoustic • Pressure • Operational Data]
    Sensors --> Store[Google Cloud SQL]

    Store --> Features[Feature Engineering<br/>Data Preparation]

    Features --> Model[TensorFlow ANN<br/>64 → 32 → 16 → 1]

    Model --> Batch[Vertex AI<br/>Scheduled Batch Inference]

    Batch --> Risk{Maintenance<br/>Required?}

    Risk -->|Yes| SysAid[SysAid<br/>Maintenance Ticket]
    Risk -->|No| Dashboard[Equipment Health<br/>Monitoring]

    SysAid --> Engineer[Maintenance Engineer]`
  }
}

function useArchitectureImage(slug) {
  const [imageSrc, setImageSrc] = useState(null)

  useEffect(() => {
    let active = true
    const extensions = ['png', 'jpg', 'jpeg', 'webp']
    const tryNext = (index) => {
      if (index >= extensions.length) return
      const source = `/architectures/${slug}.${extensions[index]}`
      const image = new Image()
      image.onload = () => active && setImageSrc(source)
      image.onerror = () => tryNext(index + 1)
      image.src = source
    }
    tryNext(0)
    return () => { active = false }
  }, [slug])

  return imageSrc
}

export default function ArchitectureViewer({ slug }) {
  const diagramData = architectureDiagrams[slug] || architectureDiagrams.compliance
  const [viewMode, setViewMode] = useState('interactive')
  const [zoom, setZoom] = useState(1)
  const [renderedSvg, setRenderedSvg] = useState('')
  const [isRendering, setIsRendering] = useState(true)
  const containerRef = useRef(null)
  const imageSrc = useArchitectureImage(slug)

  useEffect(() => {
    let cancelled = false
    mermaid.render(`portfolio-chart-${slug}-${Date.now()}`, diagramData.mermaid)
      .then(({ svg }) => { if (!cancelled) setRenderedSvg(svg) })
      .catch((error) => console.error('Unable to render architecture diagram:', error))
      .finally(() => { if (!cancelled) setIsRendering(false) })
    return () => { cancelled = true }
  }, [slug, diagramData.mermaid])

  return (
    <div className="arch-viewer-wrapper">
      <div className="arch-header">
        <div className="arch-meta">
          <span className="arch-category">{diagramData.category}</span>
          <h3 className="arch-title">{diagramData.title}</h3>
          <p className="arch-desc">{diagramData.description}</p>
        </div>
        <div className="arch-actions">
          <div className="view-mode-toggle">
            <button className={`mode-btn ${viewMode === 'interactive' ? 'active' : ''}`} onClick={() => setViewMode('interactive')}>Architecture flow</button>
            {imageSrc && <button className={`mode-btn ${viewMode === 'blueprint' ? 'active' : ''}`} onClick={() => setViewMode('blueprint')}>Diagram image</button>}
          </div>
          {viewMode === 'interactive' && <div className="zoom-controls">
            <button onClick={() => setZoom((value) => Math.max(value - 0.15, 0.6))} aria-label="Zoom out">-</button>
            <span>{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom((value) => Math.min(value + 0.15, 2))} aria-label="Zoom in">+</button>
            <button onClick={() => setZoom(1)} className="reset-btn">Reset</button>
          </div>}
        </div>
      </div>
      <div className="arch-canvas-container">
        {viewMode === 'interactive' ? <div className="arch-svg-viewport">
          {isRendering && <div className="arch-loading"><span className="spinner" /><span>Rendering architecture flow...</span></div>}
          <div ref={containerRef} className="arch-svg-inner" style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }} dangerouslySetInnerHTML={{ __html: renderedSvg }} />
        </div> : <div className="arch-blueprint-view"><img src={imageSrc} alt={`${diagramData.title} diagram`} /></div>}
      </div>
      <div className="arch-specs-footer"><div className="spec-badge"><span className="spec-dot" /><span>PORTFOLIO-SAFE REFERENCE ARCHITECTURE</span></div></div>
    </div>
  )
}
