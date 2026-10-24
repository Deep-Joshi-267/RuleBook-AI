import React, { useRef } from 'react';
import { IconUpload, IconFileText, IconCheck, IconRefresh } from '../common/Icons';

export default function FileUploadCard({
  selectedFile,
  setSelectedFile,
  isProcessing,
  onStartPipeline,
  resetPipeline
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        pages: '18 pages (detected)',
        type: file.type || 'application/pdf',
      });
    }
  };

  const handleUseSample = () => {
    setSelectedFile({
      name: 'AcmeCorp_Global_Employee_Policy_2026.pdf',
      size: '2.45 MB',
      pages: '24 pages',
      type: 'application/pdf',
      isSample: true
    });
  };

  return (
    <div className="admin-card">
      <div className="card-header">
        <div className="card-header-icon">
          <IconUpload size={22} />
        </div>
        <div>
          <h2 className="card-title">1. Upload Company Policy Document</h2>
          <p className="card-subtitle">
            Upload the official policy handbook (PDF). The pipeline will extract text, chunk it, generate embeddings, and index it in ChromaDB.
          </p>
        </div>
      </div>

      <div
        className={`upload-dropzone ${selectedFile ? 'has-file' : ''}`}
        onClick={() => !isProcessing && fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.txt"
          style={{ display: 'none' }}
          disabled={isProcessing}
        />

        <div className="dropzone-content">
          <div className="dropzone-icon-circle">
            {selectedFile ? <IconCheck size={28} /> : <IconUpload size={28} />}
          </div>
          
          {selectedFile ? (
            <div className="file-info-badge">
              <span className="file-name">{selectedFile.name}</span>
              <span className="file-meta">{selectedFile.size} • {selectedFile.pages}</span>
            </div>
          ) : (
            <>
              <p className="dropzone-primary-text">
                <strong>Click to browse</strong> or drag & drop company policy PDF
              </p>
              <p className="dropzone-hint">Supports PDF documents up to 50MB</p>
            </>
          )}
        </div>
      </div>

      <div className="upload-actions">
        {!selectedFile && (
          <button
            type="button"
            className="secondary-btn"
            onClick={handleUseSample}
          >
            <IconFileText size={16} />
            <span>Load Sample Policy PDF</span>
          </button>
        )}

        {selectedFile && (
          <>
            <button
              type="button"
              className="primary-btn pulse-glow"
              onClick={onStartPipeline}
              disabled={isProcessing}
            >
              <IconUpload size={18} />
              <span>{isProcessing ? 'Processing Pipeline...' : 'Run RAG Ingestion Pipeline'}</span>
            </button>

            <button
              type="button"
              className="secondary-btn"
              onClick={resetPipeline}
              disabled={isProcessing}
            >
              <IconRefresh size={16} />
              <span>Reset</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
