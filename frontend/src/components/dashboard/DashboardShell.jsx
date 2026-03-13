import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useStore } from '../../context/StoreContext'
import NotificationsPanel from './NotificationsPanel'

export default function DashboardShell({ children, activeTab }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { state, markNotificationRead, clearAllNotifications, logout } = useStore()
  const [showNotifications, setShowNotifications] = useState(false)
  
  const user = state.user
  const notifications = state.notifications

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'library', label: 'My Library', icon: '📚' },
    { id: 'reader', label: 'Reader', icon: '👆', accent: 'amber' },
    { id: 'progress', label: 'Progress', icon: '📊' },
    { id: 'notifications', label: 'Notifications', icon: '🔔', badge: notifications.filter(n => n.unread).length },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ]

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--bg)', fontFamily: 'var(--font-display)' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: '240px', 
        background: 'var(--bg-2)', 
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* User Avatar */}
        <div style={{ padding: '20px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '50%', 
            background: 'var(--grad-amber)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 700,
            color: 'var(--bg)'
          }}>
            {user?.name?.[0] || 'A'}
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 600 }}>{user?.name || 'Alex Johnson'}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-2)' }}>Student</div>
          </div>
        </div>

        {/* Nav Items */}
        <nav style={{ padding: '8px', flex: 1 }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'notifications') {
                  setShowNotifications(true)
                } else if (item.id === 'reader') {
                  navigate('/reader')
                } else {
                  navigate(`/${item.id}`)
                }
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: 'var(--r-sm)',
                border: 'none',
                background: activeTab === item.id && item.id !== 'notifications' 
                  ? 'var(--indigo-glow)' 
                  : 'transparent',
                borderLeft: activeTab === item.id && item.id !== 'notifications'
                  ? '2px solid var(--indigo)'
                  : '2px solid transparent',
                color: activeTab === item.id && item.id !== 'notifications'
                  ? 'var(--indigo-2)'
                  : item.accent === 'amber'
                  ? 'var(--amber)'
                  : 'var(--text-2)',
                cursor: 'pointer',
                transition: 'all 0.12s',
                marginBottom: '2px',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== item.id) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== item.id) {
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
              <span style={{ fontSize: '14px', fontWeight: 500 }}>{item.label}</span>
              {item.badge > 0 && (
                <span style={{ 
                  marginLeft: 'auto',
                  padding: '2px 8px',
                  background: 'var(--indigo)',
                  color: 'white',
                  fontSize: '11px',
                  fontWeight: 700,
                  borderRadius: 'var(--r-full)'
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* ...removed Pro features/Upgrade pill... */}
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, overflow: 'auto' }}>
        {children}
      </main>

      {/* Notifications Panel */}
      {showNotifications && (
        <NotificationsPanel 
          notifications={notifications}
          onClose={() => setShowNotifications(false)}
          onClear={clearAllNotifications}
          onMarkRead={markNotificationRead}
        />
      )}
    </div>
  )
}
