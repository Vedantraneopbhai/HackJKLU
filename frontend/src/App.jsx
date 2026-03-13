import { useState, useCallback, useRef } from 'react'
import { usePDF } from './hooks/usePDF'
import { useMockExplain } from './hooks/useMockExplain'
import PDFViewer from './components/PDFViewer'
import ExplanationPanel from './components/ExplanationPanel'
import HistorySidebar from './components/HistorySidebar'

function UploadScreen({ onFileUpload, isDragging, onDragOver, onDragLeave }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      background: 'var(--bg-2)'
    }}>
      <div style={{
        width: '420px',
        padding: '60px 40px',
        border: isDragging ? '1px solid var(--accent-dim)' : '1px dashed var(--border-hover)',
        borderRadius: 'var(--radius-lg)',
        background: isDragging ? 'var(--accent-bg)' : 'var(--bg)',
        textAlign: 'center',
        transition: 'all 0.2s ease'
      }}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={(e) => {
          e.preventDefault()
          onDragLeave()
          const file = e.dataTransfer.files[0]
          if (file && file.type === 'application/pdf') {
            onFileUpload(file)
          }
        }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '24px',
          fontWeight: 700,
          color: 'var(--text)',
          marginBottom: '10px'
        }}>
          Drop your PDF here
        </div>
        <div style={{
          fontSize: '13px',
          color: 'var(--text-2)',
          marginTop: '10px',
          lineHeight: '1.4'
        }}>
          Upload any textbook or paper. Click any line to get an instant explanation.
        </div>
        <label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => {
              const file = e.target.files[0]
              if (file) onFileUpload(file)
            }}
            style={{ display: 'none' }}
          />
          <div style={{
            marginTop: '28px',
            padding: '10px 28px',
            background: 'var(--accent-bg)',
            border: '1px solid var(--accent-dim)',
            borderRadius: 'var(--radius)',
            color: 'var(--accent)',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '13px',
            cursor: 'pointer',
            display: 'inline-block'
          }}>
            Browse file
          </div>
        </label>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--text-3)',
          marginTop: '16px'
        }}>
          Only PDFs with selectable text are supported
        </div>
      </div>
    </div>
  )
}

function Topbar({ pdfDoc, pageNum, totalPages, onOpenPDF, onPrevPage, onNextPage }) {
  return (
    <div style={{
      height: '52px',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      background: 'var(--bg)',
      flexShrink: 0
    }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: '18px',
        color: 'var(--text)',
        display: 'flex',
        alignItems: 'center'
      }}>
        <span style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: 'var(--accent)',
          display: 'inline-block',
          marginRight: '8px'
        }} />
        Apex
      </div>
      
      {pdfDoc && (
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          color: 'var(--text-2)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <button
            onClick={() => onPrevPage()}
            disabled={pageNum <= 1}
            style={{
              width: '28px',
              height: '28px',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              background: pageNum <= 1 ? 'var(--bg-3)' : 'var(--bg-2)',
              color: pageNum <= 1 ? 'var(--text-3)' : 'var(--text)',
              cursor: pageNum <= 1 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            ‹
          </button>
            <span>{pageNum} / {totalPages}</span>
            <button
              onClick={() => onNextPage()}
              disabled={pageNum >= totalPages}
              style={{
                width: '28px',
                height: '28px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                background: pageNum >= totalPages ? 'var(--bg-3)' : 'var(--bg-2)',
                color: pageNum >= totalPages ? 'var(--text-3)' : 'var(--text)',
                cursor: pageNum >= totalPages ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              ›
            </button>
          </div>
      )}
      
      <label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => {
            const file = e.target.files[0]
            if (file) onOpenPDF(file)
          }}
          style={{ display: 'none' }}
        />
        <div style={{
          padding: '6px 16px',
          background: 'var(--accent)',
          color: 'var(--bg)',
          fontSize: '13px',
          fontWeight: 500,
          borderRadius: 'var(--radius)',
          cursor: 'pointer'
        }}>
          Open PDF
        </div>
      </label>
    </div>
  )
}

export default function App() {
  const [pdfDoc, setPdfDoc] = useState(null)
  const [pageNum, setPageNum] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [lineIndex, setLineIndex] = useState([])
  const [clickedLine, setClickedLine] = useState(null)
  const [highlights, setHighlights] = useState([])
  const [explanation, setExplanation] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [difficulty, setDifficulty] = useState('normal')
  const [history, setHistory] = useState([])
  const [activeHistoryItem, setActiveHistoryItem] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const { canvasRef, lineIndex: hookLineIndex, loadPDF, goToPage, getClickedLine } = usePDF()
  const { explanation: hookExplanation, isStreaming: hookIsStreaming, streamExplanation } = useMockExplain()

  const handleFileUpload = useCallback(async (file) => {
    await loadPDF(file)
    setPdfDoc(true)
    setPageNum(1)
    setClickedLine(null)
    setHighlights([])
    setExplanation('')
    setIsStreaming(false)
    setHistory([])
    setActiveHistoryItem(null)
  }, [loadPDF])

  const handleLineClick = useCallback((line) => {
    setClickedLine(line)
    setActiveHistoryItem(null)
    if (!highlights.find(h => h.text === line.text && h.x === line.x)) {
      setHighlights(prev => [...prev, line])
    }
    streamExplanation(difficulty)
  }, [highlights, streamExplanation, difficulty])

  const handleDifficultyChange = useCallback((newDifficulty) => {
    setDifficulty(newDifficulty)
    if (clickedLine) {
      streamExplanation(newDifficulty)
    }
  }, [clickedLine, streamExplanation])

  const handleHistoryItemClick = useCallback((item) => {
    setActiveHistoryItem(item)
    setClickedLine({ text: item.text })
    setDifficulty(item.difficulty)
    setExplanation(item.explanation)
    setIsStreaming(false)
  }, [])

  const handleFollowUp = useCallback((question) => {
    if (clickedLine) {
      streamExplanation(difficulty)
    }
  }, [clickedLine, difficulty, streamExplanation])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handlePrevPage = useCallback(() => {
    if (pageNum > 1) {
      const newPage = pageNum - 1
      setPageNum(newPage)
      goToPage(newPage)
    }
  }, [pageNum, goToPage])

  const handleNextPage = useCallback(() => {
    if (pageNum < totalPages) {
      const newPage = pageNum + 1
      setPageNum(newPage)
      goToPage(newPage)
    }
  }, [pageNum, totalPages, goToPage])

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      background: 'var(--bg)', 
      overflow: 'hidden' 
    }}>
      <Topbar 
        pdfDoc={pdfDoc}
        pageNum={pageNum}
        totalPages={totalPages}
        onOpenPDF={handleFileUpload}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
      />
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        flex: 1, 
        overflow: 'hidden' 
      }}>
        <HistorySidebar
          history={history}
          activeItem={activeHistoryItem}
          onItemClick={handleHistoryItemClick}
        />
        
        <main style={{ 
          flex: 1, 
          overflow: 'auto', 
          background: 'var(--bg-2)' 
        }}>
          {pdfDoc ? (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'flex-start', 
              padding: '32px',
              height: '100%'
            }}>
              <PDFViewer
                canvasRef={canvasRef}
                lineIndex={hookLineIndex}
                onLineClick={handleLineClick}
                highlights={highlights}
              />
            </div>
          ) : (
            <UploadScreen
              onFileUpload={handleFileUpload}
              isDragging={isDragging}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            />
          )}
        </main>
        
        <ExplanationPanel
          clickedLine={clickedLine}
          explanation={hookExplanation}
          isStreaming={hookIsStreaming}
          difficulty={difficulty}
          onDifficultyChange={handleDifficultyChange}
          onFollowUp={handleFollowUp}
        />
      </div>
    </div>
  )
}
