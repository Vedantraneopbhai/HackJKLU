import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useStore } from './context/StoreContext'
import LandingPage from './components/LandingPage'
import AuthPage from './components/AuthPage'
import DashboardShell from './components/dashboard/DashboardShell'
import DashboardHome from './components/dashboard/DashboardHome'
import ReaderView from './components/reader/ReaderView'
import SettingsPage from './components/SettingsPage'
import AboutPage from './components/AboutPage'

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
        <Route path="/library" element={<ProtectedRoute><AnimatedRoute><DashboardShell activeTab="library">
          <div style={{ padding: '40px', color: 'var(--text-2)' }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>My Library</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: 18 }}>
                <div style={{ fontWeight: 600, fontSize: 18, color: 'var(--text)' }}>Physics 101</div>
                <div style={{ fontSize: 13 }}>380 pages · Last opened: 2 days ago</div>
              </li>
              <li style={{ marginBottom: 18 }}>
                <div style={{ fontWeight: 600, fontSize: 18, color: 'var(--text)' }}>Calculus II</div>
                <div style={{ fontSize: 13 }}>300 pages · Last opened: 1 week ago</div>
              </li>
              <li>
                <div style={{ fontWeight: 600, fontSize: 18, color: 'var(--text)' }}>Organic Chemistry</div>
                <div style={{ fontSize: 13 }}>240 pages · Last opened: 3 days ago</div>
              </li>
            </ul>
          </div>
        </DashboardShell></AnimatedRoute></ProtectedRoute>} />
        <Route path="/progress" element={<ProtectedRoute><AnimatedRoute><DashboardShell activeTab="progress">
          <div style={{ padding: '40px', color: 'var(--text-2)' }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Progress</h2>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontWeight: 600, fontSize: 18, color: 'var(--text)' }}>Physics 101</div>
              <div style={{ fontSize: 13 }}>Progress: 34% · 42/380 pages read · Last session: 2h ago</div>
            </div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontWeight: 600, fontSize: 18, color: 'var(--text)' }}>Calculus II</div>
              <div style={{ fontSize: 13 }}>Progress: 67% · 201/300 pages read · Last session: Yesterday</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 18, color: 'var(--text)' }}>Organic Chemistry</div>
              <div style={{ fontSize: 13 }}>Progress: 12% · 28/240 pages read · Last session: 3d ago</div>
            </div>
          </div>
        </DashboardShell></AnimatedRoute></ProtectedRoute>} />
        <Route path="/reader/:courseId?" element={<ProtectedRoute><AnimatedRoute><ReaderView /></AnimatedRoute></ProtectedRoute>} />
        <Route path="/about" element={<AnimatedRoute><AboutPage /></AnimatedRoute>} />
        <Route path="/settings" element={<AnimatedRoute><SettingsPage /></AnimatedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
