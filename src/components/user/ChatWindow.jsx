import React, { useState, useRef, useEffect } from 'react';
import { IconSend, IconBot, IconUser, IconSparkles, IconRefresh } from '../common/Icons';
import SourceCard from './SourceCard';
import RetrievalVisualizer from './RetrievalVisualizer';

export default function ChatWindow() {
  const [inputQuestion, setInputQuestion] = useState('');
  const [isQuerying, setIsQuerying] = useState(false);
  const [retrievalStage, setRetrievalStage] = useState(0);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello! I am your RuleBook AI assistant. Ask any question regarding our company policies (remote work, PTO, medical leave, code of conduct), and I will retrieve the exact clauses from our vector database and answer with verified citations.',
      sources: []
    }
  ]);

  const sampleQuestions = [
    'What is our policy on remote work and core hours?',
    'How many PTO days can roll over to next year?',
    'What certification is required for medical leaves?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isQuerying]);

  const handleSendQuestion = (questionText) => {
    const q = questionText || inputQuestion;
    if (!q.trim() || isQuerying) return;

    // 1. Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: q,
      sources: []
    };
    setMessages(prev => [...prev, userMsg]);
    setInputQuestion('');
    setIsQuerying(true);

    // Simulate the live Step 6 -> Step 11 pipeline for the UI
    setRetrievalStage(6); // Step 6: User asks question

    setTimeout(() => {
      setRetrievalStage(7); // Step 7: Embedding for question is created
    }, 600);

    setTimeout(() => {
      setRetrievalStage(8); // Step 8: Vector similarity search in ChromaDB
    }, 1200);

    setTimeout(() => {
      setRetrievalStage(9); // Step 9: Retrieve relevant chunks
    }, 1800);

    setTimeout(() => {
      setRetrievalStage(10); // Step 10: Send Question + Chunks to LLM
    }, 2400);

    setTimeout(() => {
      setRetrievalStage(11); // Step 11: Generate Ans

      let answerText = "Based on Section 2.1 of our Employee Handbook, employees are permitted up to 3 days of remote work per week with supervisor approval. Core collaborative hours are 10:00 AM to 4:00 PM EST, during which all team members must be reachable via Slack and available for scheduled syncs.";
      let sources = [
        {
          chunkId: '002',
          page: 2,
          similarity: 0.93,
          text: 'Employees are permitted up to 3 days of remote work per week with supervisor approval. Core collaborative hours are 10:00 AM to 4:00 PM EST, during which all team members must be reachable via Slack and available for scheduled syncs.'
        }
      ];

      if (q.toLowerCase().includes('pto') || q.toLowerCase().includes('roll over')) {
        answerText = "According to Section 3.4 (Paid Time Off & Medical Leave), full-time employees accrue 20 days of Paid Time Off (PTO) per calendar year. You are permitted to roll over up to 5 unused PTO days into the following calendar year.";
        sources = [
          {
            chunkId: '003',
            page: 4,
            similarity: 0.91,
            text: 'Full-time employees accrue 20 days of Paid Time Off (PTO) per calendar year. Up to 5 unused PTO days may roll over to the following year.'
          }
        ];
      } else if (q.toLowerCase().includes('medical')) {
        answerText = "Per Section 3.4 of the policy handbook, any medical leaves extending beyond 3 consecutive business days require written certification from a licensed physician.";
        sources = [
          {
            chunkId: '003',
            page: 4,
            similarity: 0.88,
            text: 'Medical leaves extending beyond 3 consecutive business days require written certification from a licensed physician.'
          }
        ];
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: answerText,
          sources: sources
        }
      ]);

      setIsQuerying(false);
      setRetrievalStage(12); // Completed
    }, 3100);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        sender: 'bot',
        text: 'Chat history cleared. Feel free to ask any company policy questions!',
        sources: []
      }
    ]);
    setRetrievalStage(0);
  };

  return (
    <div className="chat-window-card">
      {/* Live Steps 6-11 Visualizer Bar */}
      <RetrievalVisualizer currentStage={retrievalStage} isQuerying={isQuerying} />

      {/* Chat Messages Area */}
      <div className="chat-messages-area">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-bubble-row ${msg.sender === 'user' ? 'user-row' : 'bot-row'}`}
          >
            <div className={`avatar-icon ${msg.sender}`}>
              {msg.sender === 'user' ? <IconUser size={18} /> : <IconBot size={18} />}
            </div>

            <div className={`message-bubble ${msg.sender}`}>
              <div className="message-text">{msg.text}</div>

              {msg.sources && msg.sources.length > 0 && (
                <SourceCard sources={msg.sources} />
              )}
            </div>
          </div>
        ))}

        {isQuerying && (
          <div className="chat-bubble-row bot-row animate-fade-in">
            <div className="avatar-icon bot">
              <IconBot size={18} />
            </div>
            <div className="message-bubble bot querying-bubble">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="querying-status-label">
                {retrievalStage === 7 && 'Embedding query vector...'}
                {retrievalStage === 8 && 'Searching vector space in ChromaDB...'}
                {retrievalStage === 9 && 'Selecting top relevant policy chunks...'}
                {retrievalStage === 10 && 'Synthesizing context with LLM...'}
                {retrievalStage >= 11 && 'Formulating grounded answer...'}
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="quick-prompts-bar">
        <span className="quick-prompt-label">Quick Suggestions:</span>
        <div className="quick-prompts-list">
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              className="quick-prompt-chip"
              onClick={() => handleSendQuestion(q)}
              disabled={isQuerying}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <form
        className="chat-input-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendQuestion();
        }}
      >
        <button
          type="button"
          className="clear-chat-btn"
          onClick={handleClearChat}
          title="Reset conversation"
        >
          <IconRefresh size={16} />
        </button>

        <input
          type="text"
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          placeholder="Ask a question about leave policy, conduct, working hours, benefits..."
          className="chat-text-input"
          disabled={isQuerying}
        />

        <button
          type="submit"
          disabled={!inputQuestion.trim() || isQuerying}
          className="chat-send-btn"
        >
          <IconSend size={18} />
          <span>Ask</span>
        </button>
      </form>
    </div>
  );
}
