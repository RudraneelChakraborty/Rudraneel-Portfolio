import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

// Initialize mermaid with dark aesthetic matching portfolio
mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  securityLevel: 'loose',
  fontFamily: "'IBM Plex Mono', monospace",
  themeVariables: {
    darkMode: true,
    background: '#070d14',
    mainBkg: '#0d1624',
    nodeBorder: '#ff8066',
    textColor: '#eef1f0',
    lineColor: '#ff8066',
    edgeLabelBackground: '#0d1624',
    clusterBkg: '#0a101b',
    clusterBorder: 'rgba(255, 128, 102, 0.3)',
    defaultLinkColor: '#ffaa80',
    titleColor: '#ff8066',
    fontSize: '12px'
  }
})

const architectureDiagrams = {
  compliance: {
    title: 'Governance AgentCore Physical Architecture',
    category: 'ENTERPRISE AGENTIC GOVERNANCE',
    description: 'Physical architecture of the Governance AgentCore platform — orchestrating Supervisor & Sub-Agents via A2A protocol, Amazon Bedrock via Kong Gateway, AgentCore Memory, MCP Server, Microsoft Entra, and T-Space policy gating.',
    mermaid: `flowchart TB
    subgraph UsersLayer ["👥 Enterprise Users & Ingestion"]
      Users["Enterprise Users (Architects / Devs)"]
      Chat UI["Chat UI (Architecture Review Portal)"]
      Kiro["Kiro IDE (Developer Workspace)"]
      Users -->|Request for Review with SDD/ADR| Chat UI
      Chat UI -->|Response of Review with Report Output| Users
      Users <-->|Request / Response through Kiro IDE| Kiro
    end

    subgraph AWSCloud ["☁️ AWS Cloud"]
      subgraph GatewayBedrock ["Kong API Gateway & Bedrock LLM"]
        Kong["Kong API Gateway\nAmazon Bedrock LLM GAIT API"]
      end

      subgraph CommonAWS ["Common AWS Services"]
        Secrets["AWS Secrets Manager"]
        ECR["Elastic Container Registry (ECR)"]
        CloudWatch["CloudWatch & CloudTrail\n(Application Logs, Traces)"]
      end

      subgraph VPC_Agents ["🔒 VPC with Private Subnet (Agent Runtime)"]
        Supervisor["Governance Supervisor Agent\n(AgentCore Orchestrator)"]
        SupMem[("AgentCore Memory")]
        Supervisor <--> SupMem

        SubAgents["Governance Sub-Agents\n(Specialized Architecture Evaluators)"]
        SubMem[("AgentCore Memory")]
        SubAgents <--> SubMem

        Supervisor <-->|A2A Invocation & Task Delegation| SubAgents
        Supervisor -->|LLM Invocation| Kong
        SubAgents -->|LLM Invocation| Kong
        Secrets -->|Injected Secrets| Supervisor
        Secrets -->|Injected Secrets| SubAgents
      end

      subgraph MCP_Infrastructure ["🔌 MCP Protocol Infrastructure"]
        AgentcoreGW["AgentCore Gateway"]
        AgentcoreID["AgentCore Identity"]
        AgentcoreGW <-->|AgentCore Identity Call| AgentcoreID

        subgraph VPC_MCP ["🔒 VPC with Private Subnet (MCP Server)"]
          MCPServer["Governance MCP Server\n(Context & Tool Execution)"]
        end

        AgentcoreGW -->|Gateway Call with Outbound Auth| MCPServer
        MCPServer -->|MCP Response from Runtime| AgentcoreGW
      end

      Supervisor <-->|Agent Request / Response| MCPServer
      SubAgents <-->|Agent Request / Response| MCPServer
    end

    subgraph EnterpriseIntegrations ["🏢 Enterprise Security & Destination"]
      SharePoint[("Microsoft SharePoint\n(Governance Report Output)")]
      Entra["Microsoft Entra (Azure AD)\nAuthentication & SSO"]
      TSpace["T-Space Policy Engine\nAuthorization & Role Gating"]
      Observability["Observability & Monitoring\n(SignalFx · Splunk > · AI Dashboard)"]
    end

    %% External Interface Connections
    Chat UI <-->|A2A Request with SDD/ADR / Report Output| Supervisor
    Kiro <-->|MCP Call / Response| AgentcoreGW

    %% Enterprise Output & Security Connections
    SubAgents -->|Report Output| SharePoint
    Entra -.->|Authentication| Supervisor
    Entra -.->|Authentication| SubAgents
    Entra -.->|Authentication| MCPServer
    Entra -.->|Authorization| MCPServer
    Entra -.->|Authorization| SubAgents
    CloudWatch -->|Logs, Traces & Metrics| Observability

    classDef agent fill:#ff806622,stroke:#ff8066,stroke-width:2px,color:#fff;
    classDef client fill:#3b82f622,stroke:#3b82f6,stroke-width:2px,color:#fff;
    classDef gateway fill:#f59e0b22,stroke:#f59e0b,stroke-width:2px,color:#fff;
    classDef mcp fill:#10b98122,stroke:#10b981,stroke-width:2px,color:#fff;
    classDef sec fill:#8b5cf622,stroke:#8b5cf6,stroke-width:2px,color:#fff;

    class Supervisor,SubAgents agent;
    class Users,Chat UI,Kiro client;
    class Kong,AgentcoreGW gateway;
    class MCPServer,SupMem,SubMem mcp;
    class Entra,TSpace,Observability,SharePoint sec;`
  },

  healing: {
    title: 'Self-Healing GenAI Observability & Patch Platform',
    category: 'OBSERVABILITY & AUTOMATION',
    description: 'SigNoz OpenTelemetry telemetry loop that auto-detects runtime exceptions, synthesizes tested code fixes with LLMs, and reduces developer remediation time by ~65%.',
    mermaid: `flowchart LR
    subgraph Production ["1. Production Runtime & Observability"]
      App["Production Microservices & LLMs"] -->|OTel Traces & Spans| SigNoz["SigNoz (OpenTelemetry Engine)"]
      SigNoz --> Detector["Automated Exception & Drift Detector"]
    end

    subgraph Diagnosis ["2. Agentic Diagnosis Engine"]
      Detector -->|Error Stack & Context| DiagAgent["AI Diagnostic Agent (GPT-4o)"]
      DiagAgent <--> RepoIndex["Codebase AST & Semantic Index"]
      DiagAgent --> PatchGen["Self-Healing Code Patch Synthesizer"]
    end

    subgraph SandboxedVerification ["3. Automated Verification"]
      PatchGen --> TestRunner["Isolated Sandbox Runner (PyTest / Mocks)"]
      TestRunner -->|Pass| PRGen["Automated Pull Request Generator (Azure DevOps / GitHub)"]
      TestRunner -->|Fail| DiagAgent
      PRGen --> DevSignoff["Developer Review & One-Click Merge"]
    end

    classDef obs fill:#f59e0b20,stroke:#f59e0b,stroke-width:2px,color:#fff;
    classDef agent fill:#00d4ff20,stroke:#00d4ff,stroke-width:2px,color:#fff;
    classDef verify fill:#10b98120,stroke:#10b981,stroke-width:2px,color:#fff;
    class SigNoz,Detector obs;
    class DiagAgent,RepoIndex,PatchGen agent;
    class TestRunner,PRGen,DevSignoff verify;`
  },

  leak: {
    title: 'YOLOv8 Desert Oilfield Pipeline Leak Detection',
    category: 'COMPUTER VISION · TCS OIL & GAS',
    description: 'Autonomous computer vision pipeline processing thermal infrared and 4K optical footage to detect hydrocarbon leaks and structural pipeline degradation in extreme desert conditions.',
    mermaid: `flowchart TD
    subgraph Capture ["1. Multi-Spectral Field Capture"]
      Drone["Autonomous Aerial Drone Patrol"] --> Feeds["Dual Video Stream (Thermal IR + 4K Optical)"]
      FixedCam["Stationary Pipeline Perimeter Cams"] --> Feeds
    end

    subgraph Preprocessing ["2. Edge Frame Preprocessing"]
      Feeds --> Calibration["Radiometric & Thermal Calibration"]
      Calibration --> GlareFilter["Desert Sunlight & Heat Shimmer Filter"]
      GlareFilter --> Tiling["High-Resolution Dynamic Grid Tiling"]
    end

    subgraph VisionInference ["3. Deep Learning Vision (YOLOv8)"]
      Tiling --> YOLO["Custom-Trained YOLOv8 Detection Model"]
      YOLO --> Detections{"Detected Anomaly Class"}
      Detections --> C1["Hydrocarbon Surface Seepage"]
      Detections --> C2["Pipeline Joint Degradation"]
      Detections --> C3["Pressure Vent Plume"]
    end

    subgraph Alerting ["4. Spatial Mapping & SCADA Alert"]
      C1 & C2 & C3 --> GeoTag["GPS Coordinate Precision Tagging"]
      GeoTag --> SCADA["SCADA Industrial Alarm & Emergency Dispatch"]
    end

    classDef cap fill:#3b82f620,stroke:#3b82f6,stroke-width:2px,color:#fff;
    classDef yolo fill:#ec489920,stroke:#ec4899,stroke-width:2px,color:#fff;
    classDef alert fill:#ef444420,stroke:#ef4444,stroke-width:2px,color:#fff;
    class Feeds,Drone,FixedCam cap;
    class YOLO,Detections,C1,C2,C3 yolo;
    class GeoTag,SCADA alert;`
  },

  maintenance: {
    title: 'Industrial IoT Machinery Failure Predictive Maintenance',
    category: 'PREDICTIVE MODELLING · TCS OIL & GAS',
    description: 'High-throughput daily batch classification pipeline analyzing vibration, temperature, and acoustic sensor telemetry to preempt unplanned equipment downtime.',
    mermaid: `flowchart LR
    subgraph EdgeTelemetry ["1. IoT Sensor Telemetry"]
      Sensors["Machinery Sensors (Vibration, Temp, Pressure)"] --> EdgeGateway["Edge MQTT Gateway"]
      EdgeGateway --> CloudIngest["Google Cloud Storage / BigQuery"]
    end

    subgraph Pipeline ["2. Feature Engineering & ML Pipeline"]
      CloudIngest --> BatchJob["Scheduled Daily Batch Pipeline"]
      BatchJob --> FeatureStore["Time-Series Feature Extraction (FFT, Kurtosis, Drift)"]
      FeatureStore --> Classifier["Gradient Boosted Classifier (LightGBM / XGBoost)"]
    end

    subgraph ActionLoop ["3. Preventative Maintenance Dispatch"]
      Classifier --> RUL["Failure Probability & Remaining Useful Life (RUL)"]
      RUL --> Gate{"Failure Risk > Threshold?"}
      Gate -->|Yes| WorkOrder["Automated Maintenance Work Order (Maximo / SAP)"]
      Gate -->|No| Dashboard["Telemetry Health Dashboard Update"]
    end

    classDef data fill:#6366f120,stroke:#6366f1,stroke-width:2px,color:#fff;
    classDef ml fill:#00d4ff20,stroke:#00d4ff,stroke-width:2px,color:#fff;
    classDef act fill:#10b98120,stroke:#10b981,stroke-width:2px,color:#fff;
    class Sensors,EdgeGateway,CloudIngest data;
    class BatchJob,FeatureStore,Classifier ml;
    class WorkOrder,Dashboard act;`
  },

  mcp: {
    title: 'Enterprise MCP Knowledge & Intelligence Platform',
    category: 'KNOWLEDGE SYSTEMS',
    description: 'Model Context Protocol (MCP) server integration indexing Confluence, internal documentation, and operational KPIs for natural language querying across teams.',
    mermaid: `flowchart TB
    subgraph UserInterface ["1. Natural Language Interface"]
      Engineer["Engineering & Delivery Teams"] --> Query["Natural Language Query / Prompt"]
      Query --> Agent["Context-Aware Orchestrator Agent"]
    end

    subgraph MCPLayer ["2. Model Context Protocol (MCP) Integration"]
      Agent <--> MCPHost["MCP Protocol Client"]
      MCPHost <--> Server1["MCP Server: Confluence & Jira Docs"]
      MCPHost <--> Server2["MCP Server: Enterprise KPI Dashboards"]
      MCPHost <--> Server3["MCP Server: Architecture Repository & SDDs"]
    end

    subgraph Retrieval ["3. Vector Index & Synthesis"]
      Server1 & Server2 & Server3 <--> HybridSearch["Hybrid Semantic & Keyword Vector Store"]
      HybridSearch --> Rerank["Cross-Encoder Reranker"]
      Rerank --> LLM["Azure OpenAI GPT-4o Synthesis"]
      LLM --> Response["Grounded Answer with Direct Source Citations"]
    end

    classDef user fill:#3b82f620,stroke:#3b82f6,stroke-width:2px,color:#fff;
    classDef mcp fill:#00d4ff20,stroke:#00d4ff,stroke-width:2px,color:#fff;
    classDef synth fill:#10b98120,stroke:#10b981,stroke-width:2px,color:#fff;
    class Engineer,Query,Agent user;
    class MCPHost,Server1,Server2,Server3 mcp;
    class HybridSearch,Rerank,LLM,Response synth;`
  },

  adk: {
    title: 'Enterprise Agent Development Kit (ADK) Architecture',
    category: 'AI ENABLEMENT',
    description: 'Standardized production agent development framework published to JFrog Artifactory, adopted by 23+ enterprise teams in month 1.',
    mermaid: `flowchart LR
    subgraph FrameworkCore ["1. Core ADK Abstractions"]
      ADKCore["ADK Python Package"]
      ADKCore --> State["State Graph & Memory Manager"]
      ADKCore --> Tools["Standardized MCP Tool Wrappers"]
      ADKCore --> Guard["Guardrails & Safety Interceptors"]
    end

    subgraph Distribution ["2. Enterprise Distribution"]
      ADKCore --> Build["Automated Semantic Release CI"]
      Build --> JFrog["JFrog Artifactory Enterprise Registry"]
    end

    subgraph Adoption ["3. Multi-Team Production Deployments"]
      JFrog --> Team1["Team Alpha: Audit Agents"]
      JFrog --> Team2["Team Beta: Document AI"]
      JFrog --> Team3["Team Gamma: DevOps Sentry"]
      JFrog --> TeamN["23+ Enterprise Engineering Teams"]
    end

    classDef core fill:#8b5cf620,stroke:#8b5cf6,stroke-width:2px,color:#fff;
    classDef dist fill:#f59e0b20,stroke:#f59e0b,stroke-width:2px,color:#fff;
    classDef teams fill:#10b98120,stroke:#10b981,stroke-width:2px,color:#fff;
    class ADKCore,State,Tools,Guard core;
    class Build,JFrog dist;
    class Team1,Team2,Team3,TeamN teams;`
  },

  audit: {
    title: 'Financial Services AI Regulatory Audit Platform',
    category: 'RESPONSIBLE AI',
    description: 'Automated compliance validation pipeline built on Dify and GPT-4o for a tier-1 financial services client.',
    mermaid: `flowchart TD
    subgraph Ingest ["1. Regulatory Document Ingestion"]
      RegDocs["Regulatory Guidelines (Basel, Dodd-Frank, MiFID II)"] --> Parser["Document Preprocessor & Chunking"]
      Policies["Internal Financial Policies & Transactions"] --> Parser
    end

    subgraph AuditEngine ["2. Automated AI Audit Engine (Dify + GPT-4o)"]
      Parser --> Dify["Dify Orchestration Pipeline"]
      Dify --> RuleMatrix["Compliance Rule & Policy Evaluation Matrix"]
      RuleMatrix --> Evaluator["Multi-Stage LLM Reasoner (GPT-4o)"]
    end

    subgraph AuditOutput ["3. Audit Trail & Certification"]
      Evaluator --> Scorecard["Regulatory Compliance Scorecard"]
      Evaluator --> AuditLog["Cryptographically Signed Audit Log"]
      Scorecard --> AuditorUI["Compliance Officer Review Portal"]
    end

    classDef reg fill:#3b82f620,stroke:#3b82f6,stroke-width:2px,color:#fff;
    classDef engine fill:#00d4ff20,stroke:#00d4ff,stroke-width:2px,color:#fff;
    classDef out fill:#10b98120,stroke:#10b981,stroke-width:2px,color:#fff;
    class RegDocs,Policies,Parser reg;
    class Dify,RuleMatrix,Evaluator engine;
    class Scorecard,AuditLog,AuditorUI out;`
  },

  vision: {
    title: 'Custom CNN Image Classifier & Tesseract OCR Pipeline',
    category: 'COMPUTER VISION · APPLIED ML',
    description: 'Deep learning vision model with custom convolutional layers, skip connections, and morphological OCR for industrial document parsing.',
    mermaid: `flowchart LR
    subgraph InputProcessing ["1. Image / Document Input"]
      Raw["Raw Scanned Image / Camera Frame"] --> Norm["Binarization & Dewarping (OpenCV)"]
      Norm --> Denoise["Gaussian Denoising & Deskewing"]
    end

    subgraph DualInference ["2. Dual Deep Learning Inference"]
      Denoise --> CNN["Custom CNN Feature Extractor (Conv2D -> BatchNorm -> ReLU -> MaxPool)"]
      Denoise --> OCR["Tesseract OCR Engine (LSTM-based text recognition)"]
    end

    subgraph OutputSynthesis ["3. Structured Intelligence Output"]
      CNN --> Class["Visual Asset Category & Confidence"]
      OCR --> Entities["Extracted Text & Key-Value Pairs"]
      Class & Entities --> Output["Unified Structured JSON Payload"]
    end

    classDef inp fill:#6366f120,stroke:#6366f1,stroke-width:2px,color:#fff;
    classDef inf fill:#ec489920,stroke:#ec4899,stroke-width:2px,color:#fff;
    classDef out fill:#00d4ff20,stroke:#00d4ff,stroke-width:2px,color:#fff;
    class Raw,Norm,Denoise inp;
    class CNN,OCR inf;
    class Class,Entities,Output out;`
  }
}

export default function ArchitectureViewer({ slug, onClose }) {
  const [activeTab, setActiveTab] = useState(slug || 'compliance')
  const [viewMode, setViewMode] = useState('interactive') // 'interactive' | 'blueprint'
  const [zoom, setZoom] = useState(1)
  const [renderedSvg, setRenderedSvg] = useState('')
  const [isRendering, setIsRendering] = useState(false)
  const containerRef = useRef(null)

  const diagramData = architectureDiagrams[activeTab] || architectureDiagrams.compliance

  useEffect(() => {
    let isCancelled = false
    setIsRendering(true)

    const render = async () => {
      try {
        const uniqueId = `mermaid-chart-${activeTab}-${Date.now()}`
        const { svg } = await mermaid.render(uniqueId, diagramData.mermaid)
        if (!isCancelled) {
          setRenderedSvg(svg)
          setIsRendering(false)
        }
      } catch (err) {
        console.error('Mermaid render error:', err)
        if (!isCancelled) setIsRendering(false)
      }
    }

    render()
    return () => { isCancelled = true }
  }, [activeTab, diagramData.mermaid])

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.15, 2))
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.15, 0.6))
  const handleResetZoom = () => setZoom(1)

  return (
    <div className="arch-viewer-wrapper">
      {/* Navigation tabs for architectures */}
      <div className="arch-tabs">
        {Object.entries(architectureDiagrams).map(([key, item]) => (
          <button
            key={key}
            className={`arch-tab-btn ${activeTab === key ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(key)
              setZoom(1)
            }}
          >
            <span className="tab-pill" />
            <span className="tab-name">{item.title}</span>
          </button>
        ))}
      </div>

      {/* Header bar */}
      <div className="arch-header">
        <div className="arch-meta">
          <span className="arch-category">{diagramData.category}</span>
          <h3 className="arch-title">{diagramData.title}</h3>
          <p className="arch-desc">{diagramData.description}</p>
        </div>

        <div className="arch-actions">
          {/* View toggle: Interactive Mermaid vs Visio/Image */}
          <div className="view-mode-toggle">
            <button
              className={`mode-btn ${viewMode === 'interactive' ? 'active' : ''}`}
              onClick={() => setViewMode('interactive')}
              title="Interactive Mermaid SVG Flowchart"
            >
              📊 Architecture Flow
            </button>
            <button
              className={`mode-btn ${viewMode === 'blueprint' ? 'active' : ''}`}
              onClick={() => setViewMode('blueprint')}
              title="Visio / Blueprint Image View"
            >
              🖼️ Visio / Image
            </button>
          </div>

          {/* Zoom controls (only in interactive mode) */}
          {viewMode === 'interactive' && (
            <div className="zoom-controls">
              <button onClick={handleZoomOut} title="Zoom Out" aria-label="Zoom Out">−</button>
              <span>{Math.round(zoom * 100)}%</span>
              <button onClick={handleZoomIn} title="Zoom In" aria-label="Zoom In">+</button>
              <button onClick={handleResetZoom} title="Reset Zoom" className="reset-btn">Reset</button>
            </div>
          )}
        </div>
      </div>

      {/* Main diagram display area */}
      <div className="arch-canvas-container">
        {viewMode === 'interactive' ? (
          <div className="arch-svg-viewport">
            {isRendering && (
              <div className="arch-loading">
                <span className="spinner" />
                <span>Compiling architecture telemetry...</span>
              </div>
            )}
            <div
              ref={containerRef}
              className="arch-svg-inner"
              style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
              dangerouslySetInnerHTML={{ __html: renderedSvg }}
            />
          </div>
        ) : (
          <div className="arch-blueprint-view">
            <div className="blueprint-wrapper">
              <img
                src={`/architectures/${activeTab}.png`}
                alt={`${diagramData.title} blueprint`}
                onError={(e) => {
                  if (!e.currentTarget.dataset.jpg) {
                    e.currentTarget.dataset.jpg = 'true'
                    e.currentTarget.src = `/architectures/${activeTab}.jpg`
                  } else {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextElementSibling.style.display = 'flex'
                  }
                }}
              />
              <div className="blueprint-placeholder" style={{ display: 'none' }}>
                <div className="placeholder-icon">📐</div>
                <h4>Visio / Custom Diagram Slot</h4>
                <p>
                  Save your Visio export, PNG, or JPG diagram as <code>public/architectures/{activeTab}.png</code> or <code>.jpg</code> to display your customized authored visual blueprint here.
                </p>
                <button
                  className="switch-back-btn"
                  onClick={() => setViewMode('interactive')}
                >
                  Switch back to Interactive Mermaid Flow ↗
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Architecture specifications footer */}
      <div className="arch-specs-footer">
        <div className="spec-badge">
          <span className="spec-dot" />
          <span>PRODUCTION-PROVEN ARCHITECTURE</span>
        </div>
        <div className="spec-keys">
          <span>Enterprise Reliability</span>
          <span>·</span>
          <span>Scalable Microservices</span>
          <span>·</span>
          <span>Zero Unplanned Outages</span>
        </div>
      </div>
    </div>
  )
}
