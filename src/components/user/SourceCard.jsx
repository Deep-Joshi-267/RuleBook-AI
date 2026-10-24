import React, { useState } from 'react';
import { IconFileText, IconChevronDown } from '../common/Icons';

export default function SourceCard({ sources }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!sources || sources.length === 0) return null;

  return (
    <div className="source-citation-wrapper">
      <button
        type="button"
        className="source-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex-align">
          <IconFileText size={15} />
          <span>Retrieved {sources.length} policy chunks from ChromaDB</span>
        </div>
        <div className={`chevron-wrap ${isOpen ? 'rotated' : ''}`}>
          <IconChevronDown size={14} />
        </div>
      </button>

      {isOpen && (
        <div className="sources-container animate-fade-in">
          {sources.map((src, idx) => (
            <div key={idx} className="source-item-card">
              <div className="source-header">
                <span className="source-badge">Chunk #{src.chunkId}</span>
                <span className="source-similarity">Similarity: {(src.similarity * 100).toFixed(1)}% match</span>
                <span className="source-page">Page {src.page}</span>
              </div>
              <p className="source-text">"{src.text}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
