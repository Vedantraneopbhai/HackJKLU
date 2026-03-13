import { useState, useRef } from 'react'

export default function ExplanationPanel({ 
  clickedLine, 
  explanation, 
  isStreaming, 
  difficulty, 
  onDifficultyChange, 
  onFollowUp 
}) {
  const [followUpText, setFollowUpText] = useState('')
  const inputRef = useRef(null)

  const handleFollowUpSubmit = () => {
    if (followUpText.trim()) {
      onFollowUp(followUpText.trim())
      setFollowUpText('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleFollowUpSubmit()
    }
  }

  if (!clickedLine) {
    return (
      <div style={{ 
        width: '360px', 
        background: 'rgba(255,255,255,0.02)', 
        backdropFilter: 'blur(8px)',
        borderLeft: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '2px',
          background: 'var(--grad-accent)',
          opacity: 0.6
        }} />
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          height: '100%', 
          padding: '40px 24px', 
          textAlign: 'center' 
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: '1px solid var(--border-accent)',
            background: 'var(--bg-glass)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            animation: 'float 4s ease-in-out infinite, pulseGlow 3s infinite'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/>
              <path d="M13 13l6 6"/>
            </svg>
          </div>
          <h3 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '18px', 
            fontWeight: 700, 
            color: 'var(--text)',
            marginBottom: '8px'
          }}>
            Click to understand
          </h3>
          <p style={{ 
            fontSize: '13px', 
            color: 'var(--text-2)', 
            maxWidth: '200px',
            lineHeight: '1.7'
          }}>
            Select any text in your PDF to get an instant explanation
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ 
      width: '360px', 
      background: 'rgba(255,255,255,0.02)', 
      backdropFilter: 'blur(8px)',
      borderLeft: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: '2px',
        background: 'var(--grad-accent)',
        opacity: 0.6
      }} />
      <div style={{ 
        padding: '20px 24px', 
        borderBottom: '1px solid var(--border)'
      }}>
        <div style={{ 
          fontFamily: 'var(--font-mono)', 
          fontSize: '10px', 
          color: 'var(--accent-dim)', 
          letterSpacing: '0.12em',
          textTransform: 'uppercase'
        }}>
          SELECTED
        </div>
        <div className="glass-card" style={{ 
          fontFamily: 'var(--font-mono)', 
          fontSize: '12px', 
          padding: '8px 12px',
          marginTop: '8px',
          color: 'var(--text)',
          overflow: 'hidden',
          textOverflow: 'ellipsis', 
          whiteSpace: 'nowrap',
          border: '1px solid var(--border-accent)'
        }}>
          {clickedLine.text}
        </div>
      </div>
      <div style={{ 
        padding: '12px 24px', 
        borderBottom: '1px solid var(--border)'
      }}>
        <div className="glass-card" style={{
          display: 'inline-flex',
          padding: '4px',
          borderRadius: '999px'
        }}>
          {['simple', 'normal', 'deep'].map((level) => (
            <button
              key={level}
              onClick={() => onDifficultyChange(level)}
              style={{
                padding: '6px 16px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 700,
                fontFamily: 'var(--font-display)',
                letterSpacing: '0.06em',
                border: 'none',
                background: difficulty === level 
                  ? 'var(--accent)' 
                  : 'transparent',
                color: difficulty === level 
                  ? 'var(--bg)' 
                  : 'var(--text-3)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                boxShadow: difficulty === level 
                  ? '0 2px 8px var(--accent-glow)' 
                  : 'none'
              }}
            >
              {level === 'simple' ? 'Simple' : level === 'normal' ? 'Normal' : 'Deep'}
            </button>
          ))}
        </div>
      </div>
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        padding: '24px'
      }}>
        <div style={{ 
          fontSize: '15px', 
          lineHeight: '1.8', 
          color: 'var(--text)',
          animation: isStreaming ? 'fadeUp 0.3s ease both' : 'none'
        }}>
          {explanation}
          {isStreaming && (
            <span style={{ 
              display: 'inline-block', 
              width: '2px', 
              height: '16px',
              background: 'var(--accent)', 
              marginLeft: '2px',
              verticalAlign: 'middle',
              animation: 'blink 0.9s step-end infinite' 
            }} />
          )}
        </div>
      </div>
      {explanation && !isStreaming && (
        <div style={{ 
          borderTop: '1px solid var(--border)', 
          padding: '16px 24px 20px'
        }}>
          <div style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '10px', 
            color: 'var(--text-3)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '8px'
          }}>
            Ask a follow-up
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              ref={inputRef}
              type="text"
              value={followUpText}
              onChange={(e) => setFollowUpText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What would you like to know more about?"
              style={{
                flex: 1,
                fontFamily: 'var(--font-mono)',
                fontSize: '12px'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--border-accent)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border)'
              }}
            />
            <button
              onClick={handleFollowUpSubmit}
              className="accent-pill"
              style={{
                padding: '8px 16px',
                fontSize: '12px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              Ask ↗
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
