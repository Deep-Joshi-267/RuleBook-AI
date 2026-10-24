import React from 'react';
import {
  IconArrowRight,
  IconUpload,
  IconSearch,
  IconFileText,
  IconBot,
  IconCheck,
  IconDatabase
} from '../components/common/Icons';

export default function HomePage({ setActivePage }) {
  return (
    <div className="home-page animate-fade-in">
      {/* 2-Column Hero Section (Inspired by Zoom's Hero) */}
      <section className="enterprise-hero">
        <div className="hero-left">
          <div className="hero-tag-pill">
            <span className="hero-tag-dot"></span>
            <span>Enterprise Policy Intelligence</span>
          </div>

          <h1 className="hero-headline">
            Enhance workplace policy clarity <span className="blue-gradient-text">with AI</span>
          </h1>

          <p className="hero-subtext">
            Streamline company compliance, answer employee questions instantly, and eliminate endless PDF searches with grounded, citation-backed RAG.
          </p>

          <div className="hero-btn-group">
            <button
              onClick={() => setActivePage('admin')}
              className="pill-btn primary"
            >
              <IconUpload size={17} />
              <span>Admin: Ingest Policy</span>
            </button>

            <button
              onClick={() => setActivePage('user')}
              className="pill-btn secondary"
            >
              <IconSearch size={17} />
              <span>Try Policy Chatbot</span>
            </button>
          </div>
        </div>

        {/* Hero Right: Floating Product Mockup (Like Zoom AI Companion Preview) */}
        <div className="hero-right">
          <div className="hero-mockup-wrapper">
            {/* Top Floating Badge */}
            <div className="mockup-floating-chip chip-top">
              <div className="chip-icon-blue">
                <IconFileText size={16} />
              </div>
              <div className="chip-text">
                <span className="chip-title">Policy Handbook</span>
                <span className="chip-sub">Indexed in ChromaDB</span>
              </div>
              <span className="chip-badge-done">Active</span>
            </div>

            {/* Central Chat / Preview Card */}
            <div className="mockup-main-card">
              <div className="mockup-card-header">
                <div className="mockup-user-query">
                  <div className="query-avatar">U</div>
                  <div className="query-bubble">
                    What is our policy on remote work and core hours?
                  </div>
                </div>
              </div>

              <div className="mockup-card-body">
                <div className="ai-response-box">
                  <div className="ai-badge-row">
                    <span className="ai-pill">
                      <IconBot size={13} />
                      <span>RuleBook AI Companion</span>
                    </span>
                    <span className="citation-pill">
                      <IconCheck size={12} />
                      <span>Verified • Section 2.1</span>
                    </span>
                  </div>

                  <p className="ai-response-text">
                    Employees are permitted <strong>up to 3 days of remote work</strong> per week with supervisor approval. Core collaborative hours are <strong>10:00 AM to 4:00 PM EST</strong>.
                  </p>

                  <div className="ai-source-snippet">
                    <span className="source-label">Source Chunk #002</span>
                    <span className="source-meta">ChromaDB • 93% match</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Floating Badge */}
            <div className="mockup-floating-chip chip-bottom">
              <div className="chip-icon-navy">
                <IconDatabase size={16} />
              </div>
              <span className="chip-title">Instant Semantic Retrieval</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-clean">
        <div className="section-title-wrapper">
          <span className="section-eyebrow">Enterprise Architecture</span>
          <h2 className="section-heading">How RuleBook AI Works</h2>
          <p className="section-desc">
            A reliable two-phase pipeline separating Document Ingestion (Admin) from Semantic Search (User).
          </p>
        </div>

        <div className="dual-cards-row">
          {/* Phase 1: Ingestion Card */}
          <div className="clean-phase-card">
            <div className="card-phase-header">
              <span className="card-phase-number">Phase 01</span>
              <span className="card-phase-badge admin">Admin Portal</span>
            </div>
            <h3 className="card-phase-title">Policy Ingestion Pipeline</h3>
            <p className="card-phase-text">
              Transform unstructured company PDF manuals into searchable vector representations in ChromaDB.
            </p>

            <div className="steps-list-clean">
              <div className="step-row">
                <span className="step-badge">1</span>
                <span><strong>PDF Upload:</strong> Receive and parse official company policy handbook.</span>
              </div>
              <div className="step-row">
                <span className="step-badge">2</span>
                <span><strong>Text Extraction:</strong> Extract raw textual content preserving document structure.</span>
              </div>
              <div className="step-row">
                <span className="step-badge">3</span>
                <span><strong>Chunking:</strong> Divide text into sliding-window chunks with contextual overlap.</span>
              </div>
              <div className="step-row">
                <span className="step-badge">4</span>
                <span><strong>Embedding:</strong> Generate dense vector embeddings for each chunk.</span>
              </div>
              <div className="step-row">
                <span className="step-badge">5</span>
                <span><strong>ChromaDB Storage:</strong> Upsert chunks and vector embeddings into collection.</span>
              </div>
            </div>

            <button onClick={() => setActivePage('admin')} className="card-action-btn">
              <span>Go to Admin Portal</span>
              <IconArrowRight size={15} />
            </button>
          </div>

          {/* Phase 2: Retrieval Card */}
          <div className="clean-phase-card">
            <div className="card-phase-header">
              <span className="card-phase-number">Phase 02</span>
              <span className="card-phase-badge user">User Assistant</span>
            </div>
            <h3 className="card-phase-title">Semantic Retrieval & Answers</h3>
            <p className="card-phase-text">
              Empower employees to ask natural language questions and receive accurate, cited answers.
            </p>

            <div className="steps-list-clean">
              <div className="step-row">
                <span className="step-badge">6</span>
                <span><strong>User Query:</strong> Natural language question entered into chatbot.</span>
              </div>
              <div className="step-row">
                <span className="step-badge">7</span>
                <span><strong>Question Embedding:</strong> Convert user question into query vector.</span>
              </div>
              <div className="step-row">
                <span className="step-badge">8</span>
                <span><strong>Similarity Search:</strong> Execute cosine search across ChromaDB vectors.</span>
              </div>
              <div className="step-row">
                <span className="step-badge">9</span>
                <span><strong>Chunk Retrieval:</strong> Retrieve top matching policy clauses.</span>
              </div>
              <div className="step-row">
                <span className="step-badge">10</span>
                <span><strong>Answer Generation:</strong> Synthesize grounded answer with verified citations.</span>
              </div>
            </div>

            <button onClick={() => setActivePage('user')} className="card-action-btn">
              <span>Open Policy Chatbot</span>
              <IconArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
