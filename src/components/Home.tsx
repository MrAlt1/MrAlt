import React from 'react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1>Welcome to PMS</h1>
        <p>Project Management System</p>
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">👥</span>
          <h3>Total Users</h3>
          <p>150</p>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📊</span>
          <h3>Active Projects</h3>
          <p>12</p>
        </div>
        <div className="stat-card">
          <span className="stat-icon">✅</span>
          <h3>Completed Tasks</h3>
          <p>89</p>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📅</span>
          <h3>Upcoming Deadlines</h3>
          <p>5</p>
        </div>
      </div>
    </div>
  );
};

export default Home; 