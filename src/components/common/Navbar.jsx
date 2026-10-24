import React from 'react';

export default function Navbar({ activePage, setActivePage }) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'admin', label: 'Admin' },
    { id: 'user', label: 'User Q&A' },
  ];

  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        {/* Brand Logo & Name */}
        <div className="brand" onClick={() => setActivePage('home')} role="button" tabIndex={0}>
          <div className="brand-logo-text">
            rulebook<span className="brand-dot">.</span><span className="brand-accent">ai</span>
          </div>
        </div>

        {/* Clean Center Navigation Links */}
        <nav className="nav-links">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`nav-button ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
