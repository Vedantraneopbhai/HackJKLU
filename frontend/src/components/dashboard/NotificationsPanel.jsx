export default function NotificationsPanel({ notifications, onClose, onClear, onMarkRead }) {
  const getBorderColor = (type) => {
    switch (type) {
      case 'reminder': return 'var(--indigo)'
      case 'insight': return 'var(--amber)'
      case 'streak': return 'var(--success)'
      default: return 'var(--border)'
    }
  }

  const getIcon = (type) => {
    switch (type) {
      case 'reminder': return '📖'
      case 'insight': return '💡'
      case 'streak': return '🔥'
      default: return '🔔'
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        style={{ 
          position: 'fixed', 
          inset: 0, 
          background: 'rgba(0,0,0,0.5)', 
          zIndex: 49 
        }} 
        onClick={onClose}
      />
      
      {/* Panel */}
      <div 
        className="glass"
        style={{ 
          position: 'fixed', 
          right: 0, 
          top: 0, 
          height: '100vh', 
          width: '380px', 
          borderLeft: '1px solid var(--border)',
          borderRadius: 0,
          animation: 'slideIn 0.2s ease',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div style={{ 
          padding: '20px 24px', 
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Notifications</h2>
          <button 
            onClick={onClear}
            style={{ 
              fontSize: '12px', 
              color: 'var(--indigo)', 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer' 
            }}
          >
            Mark all read
          </button>
        </div>

        {/* Notification Items */}
        <div style={{ flex: 1, overflow: 'auto' }}>
          {notifications.map((notif, i) => (
            <div 
              key={i}
              onClick={() => onMarkRead && onMarkRead(notif.id)}
              style={{ 
                padding: '16px 24px', 
                borderBottom: '1px solid var(--border)',
                borderLeft: '3px solid ' + getBorderColor(notif.type),
                background: notif.unread ? 'rgba(99,102,241,0.04)' : 'transparent',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  background: 'var(--bg-3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px'
                }}>
                  {getIcon(notif.type)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>{notif.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-2)', marginTop: '4px', lineHeight: '1.5' }}>
                    {notif.body}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-3)', marginTop: '8px' }}>
                    {notif.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)' }}>
          <button 
            onClick={onClose}
            style={{ 
              width: '100%', 
              padding: '12px', 
              background: 'var(--bg-3)',
              color: 'var(--text)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-sm)',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </>
  )
}
