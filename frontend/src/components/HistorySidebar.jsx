export default function HistorySidebar({ history, activeItem, onItemClick }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">History</div>
      
      {history.length === 0 ? (
        <div style={{ 
          color: 'var(--text-3)', 
          fontSize: '13px', 
          textAlign: 'center',
          marginTop: '40px',
          lineHeight: '1.4'
        }}>
          Past explanations appear here
        </div>
      ) : (
        history.map((item, index) => (
          <div
            key={`${item.page}-${item.text.slice(0, 20)}-${index}`}
            className={`history-item ${activeItem === item ? 'active' : ''}`}
            onClick={() => onItemClick(item)}
          >
            <div className="history-text">
              {item.text.length > 40 ? item.text.slice(0, 40) + '...' : item.text}
            </div>
            <div className="history-meta">
              <span className="history-page">Page {item.page}</span>
              <span className={`difficulty-badge ${item.difficulty}`}>
                {item.difficulty}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
