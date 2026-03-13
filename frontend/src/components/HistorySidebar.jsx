export default function HistorySidebar({ history, activeItem, onItemClick }) {
  return (
    <div style={{ 
      width: '220px', 
      background: 'var(--bg-2)', 
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      <div style={{ 
        fontFamily: 'var(--font-mono)', 
        fontSize: '10px', 
        letterSpacing: '0.12em',
        color: 'var(--text-3)',
        textTransform: 'uppercase',
        padding: '20px 16px 14px'
      }}>
        HISTORY
      </div>
      
      <div style={{ overflowY: 'auto', flex: 1, padding: '0 8px 8px' }}>
        {history.length === 0 ? (
          <div style={{
            padding: '20px 16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--text-3)'
          }}>
            No explanations yet
          </div>
        ) : (
          history.map((item, i) => (
            <div
              key={`${item.page}-${item.text.slice(0, 20)}-${i}`}
              onClick={() => onItemClick(item)}
              style={{
                padding: '10px 14px',
                borderRadius: 'var(--r-sm)',
                cursor: 'pointer',
                marginBottom: '2px',
                transition: 'all 0.12s ease',
                background: activeItem === item ? 'var(--accent-glow)' : 'transparent',
                border: activeItem === item ? '1px solid var(--border-accent)' : '1px solid transparent',
                boxShadow: activeItem === item ? '0 0 12px var(--accent-glow)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (activeItem !== item) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                }
              }}
              onMouseLeave={(e) => {
                if (activeItem !== item) {
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              <div style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '12px',
                color: 'var(--text)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {item.text}
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                marginTop: '4px'
              }}>
                <span style={{ 
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--text-3)'
                }}>
                  p.{item.page}
                </span>
                <span style={{
                  padding: '2px 8px',
                  borderRadius: '999px',
                  fontSize: '10px',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  background: item.difficulty === 'simple' 
                    ? 'rgba(93,184,122,0.15)' 
                    : item.difficulty === 'normal'
                    ? 'var(--accent-glow)'
                    : 'rgba(160,144,224,0.15)',
                  color: item.difficulty === 'simple' 
                    ? 'var(--success)' 
                    : item.difficulty === 'normal'
                    ? 'var(--accent)'
                    : '#a090e0'
                }}>
                  {item.difficulty}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
