import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useStore } from './context/StoreContext'
import LandingPage from './components/LandingPage'
import AuthPage from './components/AuthPage'
import DashboardShell from './components/dashboard/DashboardShell'
import DashboardHome from './components/dashboard/DashboardHome'
import ReaderView from './components/reader/ReaderView'

function AnimatedRoute({ children }) {
  const location = useLocation()
  const [visible, setVisible] = useState(true)
  
  useEffect(() => {
    setVisible(false)
    const timer = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(timer)
  }, [location])
  
  return <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s ease' }}>{children}</div>
}

function ProtectedRoute({ children }) {
  const { state } = useStore()
  
  if (!state.isAuthenticated) {
    return <Navigate to="/auth" replace />
  }
  
  return children
}

export default function App() {
  const { state } = useStore()

  useEffect(() => {
    if (!state.isAuthenticated) return
    
    const interval = setInterval(() => {
      const day = new Date().getDay()
    }, 60000)
    
    return () => clearInterval(interval)
  }, [state.isAuthenticated])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', opacity: 1, transition: 'opacity 0.3s ease' }}>
      <Routes>
        <Route path="/" element={<AnimatedRoute><LandingPage /></AnimatedRoute>} />
        <Route path="/auth" element={<AnimatedRoute><AuthPage /></AnimatedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><AnimatedRoute><DashboardShell activeTab="dashboard"><DashboardHome /></DashboardShell></AnimatedRoute></ProtectedRoute>} />
        <Route path="/library" element={<ProtectedRoute><AnimatedRoute><DashboardShell activeTab="library"><div style={{ padding: '40px', color: 'var(--text-2)' }}><h2>My Library</h2></div></DashboardShell></AnimatedRoute></ProtectedRoute>} />
        <Route path="/progress" element={<ProtectedRoute><AnimatedRoute><DashboardShell activeTab="progress"><div style={{ padding: '40px', color: 'var(--text-2)' }}><h2>Progress</h2></div></DashboardShell></AnimatedRoute></ProtectedRoute>} />
        <Route path="/reader/:courseId?" element={<ProtectedRoute><AnimatedRoute><ReaderView /></AnimatedRoute></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
