import React from 'react';
import { IconBook } from './Icons';

export default function Footer({ setActivePage }) {
  return (
    <footer className="footer-container">
      <div className="footer-inner">
        <div className="footer-col brand-col">
          <div className="brand-footer">
            <div className="brand-logo-text">
              rulebook<span className="brand-dot">.</span><span className="brand-accent">ai</span>
            </div>
          </div>
          <p className="footer-desc">
            An end-to-end Retrieval-Augmented Generation (RAG) platform built with React, Node.js, Express, and ChromaDB.
          </p>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Architecture & Pipeline</h4>
          <ul className="footer-links">
            <li><span className="dot"></span> Document Ingestion (PDF Parsing & Chunking)</li>
            <li><span className="dot"></span> Vector Embeddings & ChromaDB Storage</li>
            <li><span className="dot"></span> Semantic Similarity Search & Retrieval</li>
            <li><span className="dot"></span> Context-Augmented LLM Response Generation</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Quick Navigation</h4>
          <div className="footer-nav-buttons">
            <button onClick={() => setActivePage('home')} className="footer-nav-link">Home Overview</button>
            <button onClick={() => setActivePage('admin')} className="footer-nav-link">Admin Policy Ingestion</button>
            <button onClick={() => setActivePage('user')} className="footer-nav-link">User Policy Chatbot</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>© 2026 RuleBook AI</p>
        </div>
      </div>
    </footer>
  );
}
