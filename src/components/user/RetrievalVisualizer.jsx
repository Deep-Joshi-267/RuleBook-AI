import React from 'react';
import { IconCpu, IconSearch, IconLayers, IconBot, IconSparkles } from '../common/Icons';

export default function RetrievalVisualizer({ currentStage, isQuerying }) {
  const stages = [
    { id: 6, title: '6. User Question', label: 'User Asks', icon: '💬' },
    { id: 7, title: '7. Query Embedding', label: 'Embed Question', icon: '🧠' },
    { id: 8, title: '8. Vector Search', label: 'ChromaDB Search', icon: '⚡' },
    { id: 9, title: '9. Chunks Retrieved', label: 'Top-3 Chunks', icon: '📑' },
    { id: 10, title: '10. Prompt + Context', label: 'Assemble Prompt', icon: '🧩' },
    { id: 11, title: '11. LLM Generation', label: 'Generate Answer', icon: '✨' },
  ];

  return (
    <div className="retrieval-mini-flow">
      <div className="retrieval-flow-header">
        <div className="flex-align">
          <IconSparkles size={14} className="primary-color" />
          <span className="retrieval-flow-title">RAG Retrieval Pipeline (Steps 6 to 11)</span>
        </div>
        <span className="retrieval-flow-status">
          {isQuerying ? '⚡ Executing Vector Retrieval...' : '✓ Ready for Questions'}
        </span>
      </div>

      <div className="retrieval-stages-bar">
        {stages.map((stage, idx) => {
          const isDone = currentStage > stage.id;
          const isActive = currentStage === stage.id;

          let stageClass = 'idle';
          if (isDone) stageClass = 'done';
          if (isActive) stageClass = 'active';

          return (
            <React.Fragment key={stage.id}>
              <div className={`retrieval-stage-chip ${stageClass}`}>
                <span className="stage-emoji">{stage.icon}</span>
                <span className="stage-name">{stage.label}</span>
                {isActive && <div className="stage-pulse"></div>}
              </div>

              {idx < stages.length - 1 && (
                <div className={`retrieval-connector ${currentStage > stage.id ? 'active' : ''}`}>
                  →
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
