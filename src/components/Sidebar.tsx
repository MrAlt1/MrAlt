import React from 'react';
import './Sidebar.css';

interface SidebarProps {
  onNavigate: (page: string) => void;
  activePage: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate, activePage }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>PMS</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <button 
              className={`nav-item ${activePage === 'home' ? 'active' : ''}`}
              onClick={() => onNavigate('home')}
            >
              <span className="nav-icon">🏠</span>
              Home
            </button>
          </li>
          <li>
            <button 
              className={`nav-item ${activePage === 'users' ? 'active' : ''}`}
              onClick={() => onNavigate('users')}
            >
              <span className="nav-icon">👥</span>
              Users
            </button>
          </li>
          {/* Add more navigation items here as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar; 