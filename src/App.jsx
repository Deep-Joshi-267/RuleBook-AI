import { useState } from 'react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import './App.css';

function App() {
  const [activePage, setActivePage] = useState('home');

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Page Body */}
      <main className="main-content">
        {activePage === 'home' && <HomePage setActivePage={setActivePage} />}
        {activePage === 'admin' && <AdminPage />}
        {activePage === 'user' && <UserPage />}
      </main>

      {/* Bottom Footer */}
      <Footer setActivePage={setActivePage} />
    </div>
  );
}

export default App;
