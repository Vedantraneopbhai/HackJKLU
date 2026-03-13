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
        width: '340px', 
        background: 'var(--bg-2)', 
        borderLeft: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          height: '100%', 
          padding: '40px', 
          textAlign: 'center' 
        }}>
          <p style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '16px', 
            fontWeight: 700, 
            color: 'var(--text-2)' 
          }}>
            Click anything to understand it
          </p>
          <p style={{ 
            fontSize: '13px', 
            color: 'var(--text-3)', 
            marginTop: '8px', 
            lineHeight: '1.6' 
          }}>
            Tap any line in your PDF and Apex will explain exactly that.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ 
      width: '340px', 
      background: 'var(--bg-2)', 
      borderLeft: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      <div style={{ 
        padding: '20px', 
        borderBottom: '1px solid var(--border)' 
      }}>
        <div style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: '10px', 
          fontWeight: 700,
          letterSpacing: '0.1em',
          color: 'var(--accent-dim)',
          textTransform: 'uppercase'
        }}>
          SELECTED TEXT
        </div>
        <div style={{ 
          fontFamily: 'var(--font-mono)', 
          fontSize: '12px', 
          background: 'var(--bg-3)', 
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)', 
          padding: '8px 10px',
          overflow: 'hidden',
          textOverflow: 'ellipsis', 
          whiteSpace: 'nowrap',
          marginTop: '8px'
        }}>
          {clickedLine.text}
        </div>
      </div>
      
      <div style={{ 
        padding: '12px 20px', 
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        gap: '8px'
      }}>
        {['simple', 'normal', 'deep'].map((level) => (
          <button
            key={level}
            onClick={() => onDifficultyChange(level)}
            style={{
              flex: 1,
              padding: '6px 0',
              fontSize: '11px',
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              border: difficulty === level 
                ? '1px solid var(--accent-dim)' 
                : '1px solid var(--border)',
              background: difficulty === level 
                ? 'var(--accent-bg)' 
                : 'transparent',
              color: difficulty === level 
                ? 'var(--accent)' 
                : 'var(--text-3)',
              cursor: 'pointer',
              borderRadius: 'var(--radius)',
              textTransform: 'capitalize'
            }}
          >
            {level === 'simple' ? 'Simple' : level === 'normal' ? 'Normal' : 'Deep'}
          </button>
        ))}
      </div>
      
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        padding: '20px' 
      }}>
        <div style={{ 
          fontSize: '14px', 
          fontFamily: 'var(--font-body)', 
          lineHeight: '1.75', 
          color: 'var(--text)' 
        }}>
          {explanation}
          {isStreaming && (
            <span style={{ 
              display: 'inline-block', 
              width: '2', 
              height: '14',
              background: 'var(--accent)', 
              marginLeft: '2',
              verticalAlign: 'middle',
              animation: 'blink 0.9s step-end infinite' 
            }} />
          )}
        </div>
      </div>
      
      {explanation && !isStreaming && (
        <div style={{ 
          borderTop: '1px solid var(--border)', 
          padding: '12px 20px 16px' 
        }}>
          <div style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '11px', 
            color: 'var(--text-3)',
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
                padding: '8px 12px',
                background: 'var(--bg-3)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                fontSize: '13px',
                borderRadius: 'var(--radius)'
              }}
            />
            <button
              onClick={handleFollowUpSubmit}
              style={{
                padding: '8px 16px',
                background: 'var(--accent)',
                color: 'var(--bg)',
                fontSize: '13px',
                fontWeight: 600,
                borderRadius: 'var(--radius)',
                cursor: 'pointer'
              }}
            >
              Ask
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
