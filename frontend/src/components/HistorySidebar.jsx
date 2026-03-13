export default function HistorySidebar({ history, activeItem, onItemClick }) {
  return (
    <div style={{ 
      width: '200px', 
      background: 'var(--bg-2)', 
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      <div style={{ 
        fontFamily: 'var(--font-display)', 
        fontSize: '10px', 
        fontWeight: 700,
        textTransform: 'uppercase',
        color: 'var(--text-3)',
        padding: '16px 16px 12px',
        borderBottom: '1px solid var(--border)'
      }}>
        HISTORY
      </div>
      
      <div style={{ overflowY: 'auto', flex: 1 }}>
        {history.length === 0 ? (
          <p style={{ 
            padding: '24px 16px', 
            fontSize: '12px', 
            color: 'var(--text-3)', 
            textAlign: 'center' 
          }}>
            Past explanations appear here
          </p>
        ) : (
          history.map((item, i) => (
            <div
              key={`${item.page}-${item.text.slice(0, 20)}-${i}`}
              onClick={() => onItemClick(item)}
              style={{
                padding: '10px 12px',
                borderRadius: 'var(--radius)',
                cursor: 'pointer',
                background: activeItem === item ? 'var(--accent-bg)' : 'transparent',
                border: activeItem === item ? '1px solid var(--highlight-border)' : '1px solid transparent',
                marginBottom: '2px'
              }}
              onMouseEnter={(e) => {
                if (activeItem !== item) {
                  e.currentTarget.style.background = 'var(--bg-3)'
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
                fontSize: '11px',
                color: 'var(--text-3)',
                marginTop: '4px'
              }}>
                <span style={{ fontFamily: 'var(--font-mono)' }}>
                  p.{item.page}
                </span>
                <span style={{
                  padding: '2px 6px',
                  borderRadius: '3px',
                  fontSize: '10px',
                  fontWeight: 500,
                  background: item.difficulty === 'simple' 
                    ? 'rgba(112,201,142,0.12)' 
                    : item.difficulty === 'normal'
                    ? 'rgba(232,213,163,0.10)'
                    : 'rgba(152,120,232,0.12)',
                  color: item.difficulty === 'simple' 
                    ? 'var(--success)' 
                    : item.difficulty === 'normal'
                    ? 'var(--accent-dim)'
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
