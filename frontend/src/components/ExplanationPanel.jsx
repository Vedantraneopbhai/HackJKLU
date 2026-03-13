import { useState, useRef } from 'react'

export default function ExplanationPanel({ 
  selectedLine, 
  currentPage,
  isStreaming, 
  streamedText, 
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

  if (!selectedLine) {
    return (
      <div className="explanation-panel">
        <div className="panel-content">
          <div className="empty-state">
            <div className="empty-title">Click anything to understand it</div>
            <div className="empty-subtitle">
              Select any text, formula, or paragraph in your PDF to get an instant AI explanation
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="explanation-panel">
      <div className="panel-content">
        <div className="selected-text-label">Selected text</div>
        <div className="selected-text-pill">
          {selectedLine.text}
        </div>
        
        <div className="difficulty-row">
          <button
            className={`difficulty-pill ${difficulty === 'simple' ? 'active' : ''}`}
            onClick={() => onDifficultyChange('simple')}
          >
            Simple
          </button>
          <button
            className={`difficulty-pill ${difficulty === 'normal' ? 'active' : ''}`}
            onClick={() => onDifficultyChange('normal')}
          >
            Normal
          </button>
          <button
            className={`difficulty-pill ${difficulty === 'deep' ? 'active' : ''}`}
            onClick={() => onDifficultyChange('deep')}
          >
            Deep
          </button>
        </div>
        
        {(isStreaming || streamedText) && (
          <div className="loading-state">
            <div className="explanation-text">
              {streamedText}
              {isStreaming && <span className="blinking-cursor"></span>}
            </div>
          </div>
        )}
        
        {!isStreaming && streamedText && (
          <div className="followup-section">
            <div className="followup-label">Ask a follow-up</div>
            <div className="followup-input-row">
              <input
                ref={inputRef}
                type="text"
                className="followup-input"
                value={followUpText}
                onChange={(e) => setFollowUpText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="What would you like to know more about?"
              />
              <button
                className="followup-button"
                onClick={handleFollowUpSubmit}
                disabled={!followUpText.trim()}
              >
                Ask
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
