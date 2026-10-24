import React from 'react';
import {
  IconUpload,
  IconFileText,
  IconLayers,
  IconCpu,
  IconDatabase,
  IconCheck
} from '../common/Icons';

export default function PipelineVisualizer({ currentStep, isProcessing }) {
  const steps = [
    {
      id: 1,
      title: '1. PDF Upload',
      subtitle: 'Receive & validate document',
      icon: <IconUpload size={20} />,
      detail: 'PDF buffer loaded into memory',
    },
    {
      id: 2,
      title: '2. Text Extraction',
      subtitle: 'Parse raw text from PDF',
      icon: <IconFileText size={20} />,
      detail: '14,850 characters parsed without formatting loss',
    },
    {
      id: 3,
      title: '3. Chunking',
      subtitle: 'Sliding window text split',
      icon: <IconLayers size={20} />,
      detail: '36 chunks created (Size: 500 chars, Overlap: 50 chars)',
    },
    {
      id: 4,
      title: '4. Embedding Creation',
      subtitle: 'Convert chunks into vectors',
      icon: <IconCpu size={20} />,
      detail: '1536-dimensional dense vector embeddings generated',
    },
    {
      id: 5,
      title: '5. Vector DB Upsert',
      subtitle: 'Store in ChromaDB',
      icon: <IconDatabase size={20} />,
      detail: 'Upserted to ChromaDB collection "policy_handbook"',
    },
  ];

  const calculateProgress = () => {
    if (currentStep === 0) return 0;
    if (currentStep > 5) return 100;
    return Math.round(((currentStep - 1) / 5) * 100 + 10);
  };

  return (
    <div className="admin-card pipeline-card">
      <div className="card-header flex-between">
        <div>
          <h2 className="card-title">Live Pipeline Status</h2>
          <p className="card-subtitle">
            Visual breakdown of how raw company policy PDFs get transformed into searchable vector representations.
          </p>
        </div>

        <div className="pipeline-overall-status">
          <span className="status-label">Overall Progress:</span>
          <span className="status-percent">{calculateProgress()}%</span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${calculateProgress()}%` }}
        >
          {isProcessing && <div className="progress-shimmer"></div>}
        </div>
      </div>

      {/* Dynamic Moving Pipeline Nodes */}
      <div className="pipeline-flow-container">
        {steps.map((step, idx) => {
          const isDone = currentStep > step.id;
          const isActive = currentStep === step.id;

          let statusClass = 'pending';
          let statusText = 'Waiting';

          if (isDone) {
            statusClass = 'completed';
            statusText = 'Completed';
          } else if (isActive) {
            statusClass = 'active';
            statusText = 'Processing...';
          }

          return (
            <React.Fragment key={step.id}>
              <div className={`pipeline-node-wrapper ${statusClass}`}>
                <div className="node-icon-box">
                  {isDone ? <IconCheck size={20} className="check-icon" /> : step.icon}
                  {isActive && <div className="node-pulse-ring"></div>}
                </div>

                <div className="node-content">
                  <div className="node-header">
                    <span className="node-title">{step.title}</span>
                    <span className={`node-status-pill ${statusClass}`}>{statusText}</span>
                  </div>
                  <p className="node-subtitle">{step.subtitle}</p>

                  {(isActive || isDone) && (
                    <div className="node-live-detail animate-fade-in">
                      <span className="bullet">⚡</span>
                      <span>{step.detail}</span>
                    </div>
                  )}
                </div>
              </div>

              {idx < steps.length - 1 && (
                <div className={`pipeline-connector ${currentStep > step.id ? 'connected' : ''} ${currentStep === step.id ? 'pulsing' : ''}`}>
                  <div className="connector-line"></div>
                  {currentStep === step.id && <div className="connector-particle"></div>}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
