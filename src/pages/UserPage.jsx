import React from 'react';
import ChatWindow from '../components/user/ChatWindow';

export default function UserPage() {
  return (
    <div className="user-page animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Company Policy Intelligence</h1>
      </div>

      <div className="user-layout">
        <ChatWindow />
      </div>
    </div>
  );
}
