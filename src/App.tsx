import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import UsersTable from './components/UsersTable';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ 
          display: 'flex', 
          minHeight: '100vh',
          backgroundColor: '#1e1e1e',
          animation: 'fadeIn 0.5s ease-in-out'
        }}>
          <Sidebar />
          <main style={{ 
            flexGrow: 1, 
            padding: '20px',
            animation: 'slideIn 0.5s ease-in-out'
          }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<UsersTable />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/tasks" element={<Tasks />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
