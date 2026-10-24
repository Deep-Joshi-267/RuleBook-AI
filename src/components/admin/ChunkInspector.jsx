import React, { useState } from 'react';
import { IconLayers, IconDatabase, IconCpu, IconChevronDown } from '../common/Icons';

export default function ChunkInspector({ visible }) {
  const [selectedChunk, setSelectedChunk] = useState(0);

  if (!visible) return null;

  const mockChunks = [
    {
      id: 'chunk_001',
      page: 1,
      section: '1.0 Introduction & Code of Conduct',
      chars: 486,
      tokens: 112,
      text: 'AcmeCorp is committed to fostering an inclusive, respectful, and productive workplace. All employees, contractors, and executives are expected to uphold the highest ethical standards, maintain confidentiality, and protect company intellectual property at all times.',
      embeddingPreview: [0.0412, -0.0891, 0.1204, -0.0034, 0.0762, '...1531 more dimensions']
    },
    {
      id: 'chunk_002',
      page: 2,
      section: '2.1 Remote Work & Core Hours',
      chars: 512,
      tokens: 124,
      text: 'Employees are permitted up to 3 days of remote work per week with supervisor approval. Core collaborative hours are 10:00 AM to 4:00 PM EST, during which all team members must be reachable via Slack and available for scheduled syncs.',
      embeddingPreview: [-0.0125, 0.0934, -0.0452, 0.0811, -0.0349, '...1531 more dimensions']
    },
    {
      id: 'chunk_003',
      page: 4,
      section: '3.4 Paid Time Off & Medical Leave',
      chars: 495,
      tokens: 118,
      text: 'Full-time employees accrue 20 days of Paid Time Off (PTO) per calendar year. Up to 5 unused PTO days may roll over to the following year. Medical leaves extending beyond 3 consecutive business days require written certification from a licensed physician.',
      embeddingPreview: [0.0831, -0.0142, 0.0521, -0.0789, 0.0115, '...1531 more dimensions']
    }
  ];

  return (
    <div className="admin-card chunk-card animate-fade-in">
      <div className="card-header flex-between">
        <div className="flex-align">
          <div className="card-header-icon">
            <IconLayers size={20} />
          </div>
          <div>
            <h3 className="card-title">Processed Document Chunks (ChromaDB Ready)</h3>
            <p className="card-subtitle">Inspecting how raw text is broken into overlapping chunks with generated vector embeddings.</p>
          </div>
        </div>
        <div className="chunk-stat-pill">
          <span>Total Chunks: <strong>36</strong></span>
        </div>
      </div>

      <div className="chunks-grid">
        <div className="chunks-list">
          {mockChunks.map((chunk, idx) => (
            <div
              key={chunk.id}
              className={`chunk-list-item ${selectedChunk === idx ? 'selected' : ''}`}
              onClick={() => setSelectedChunk(idx)}
            >
              <div className="chunk-item-top">
                <span className="chunk-id-tag">{chunk.id}</span>
                <span className="chunk-page-tag">Page {chunk.page}</span>
              </div>
              <div className="chunk-section-name">{chunk.section}</div>
              <p className="chunk-snippet">{chunk.text.substring(0, 90)}...</p>
            </div>
          ))}
        </div>

        <div className="chunk-detail-panel">
          <div className="detail-panel-header">
            <h4>Inspect Chunk Metadata</h4>
            <span className="detail-id">{mockChunks[selectedChunk].id}</span>
          </div>

          <div className="detail-meta-row">
            <div className="meta-box">
              <span className="meta-label">Length</span>
              <span className="meta-value">{mockChunks[selectedChunk].chars} chars</span>
            </div>
            <div className="meta-box">
              <span className="meta-label">Estimated Tokens</span>
              <span className="meta-value">~{mockChunks[selectedChunk].tokens} tokens</span>
            </div>
            <div className="meta-box">
              <span className="meta-label">Vector Storage</span>
              <span className="meta-value">ChromaDB</span>
            </div>
          </div>

          <div className="chunk-text-box">
            <span className="box-label">Raw Chunk Text (Context for LLM)</span>
            <p className="chunk-full-text">"{mockChunks[selectedChunk].text}"</p>
          </div>

          <div className="chunk-vector-box">
            <div className="vector-box-header">
              <IconCpu size={14} />
              <span>Embedding Vector Representation Preview (Normalized Float32)</span>
            </div>
            <div className="vector-array-preview">
              <code>[{mockChunks[selectedChunk].embeddingPreview.join(', ')}]</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
