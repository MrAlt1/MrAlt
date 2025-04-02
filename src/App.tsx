import { useState } from 'react'
import Sidebar from './components/Sidebar'
import UsersTable from './components/UsersTable'
import Home from './components/Home'
import './App.css'

function App() {
  const [activePage, setActivePage] = useState('home')

  const handleNavigate = (page: string) => {
    setActivePage(page)
  }

  return (
    <div className="app-container">
      <Sidebar onNavigate={handleNavigate} activePage={activePage} />
      <main className="main-content">
        {activePage === 'home' && <Home />}
        {activePage === 'users' && <UsersTable />}
      </main>
    </div>
  )
}

export default App
