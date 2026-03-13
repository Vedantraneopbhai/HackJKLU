import { useState, useCallback } from 'react'
import { usePDF } from './hooks/usePDF'
import { useMockExplain } from './hooks/useMockExplain'
import PDFViewer from './components/PDFViewer'
import ExplanationPanel from './components/ExplanationPanel'
import HistorySidebar from './components/HistorySidebar'

export default function App() {
  const [pdfFile, setPdfFile] = useState(null)
  const [selectedLine, setSelectedLine] = useState(null)
  const [difficulty, setDifficulty] = useState('normal')
  const [history, setHistory] = useState([])
  const [activeHistoryItem, setActiveHistoryItem] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const pdf = usePDF()
  const explain = useMockExplain()

  const handleFileUpload = useCallback((file) => {
    if (file && file.type === 'application/pdf') {
      setPdfFile(file)
      pdf.loadPDF(file)
      setSelectedLine(null)
      explain.resetExplanation()
      setHistory([])
      setActiveHistoryItem(null)
    }
  }, [pdf, explain])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFileUpload(file)
  }, [handleFileUpload])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileSelect = useCallback((e) => {
    const file = e.target.files[0]
    handleFileUpload(file)
  }, [handleFileUpload])

  const handleLineClick = useCallback((line) => {
    setSelectedLine(line)
    setActiveHistoryItem(null)
    explain.startStreaming(line.text, difficulty)
    
    const historyItem = {
      text: line.text,
      page: pdf.currentPage,
      difficulty: difficulty,
      explanation: explain.currentExplanation,
      timestamp: Date.now()
    }
    
    setHistory(prev => {
      const exists = prev.some(item => 
        item.text === line.text && 
        item.page === pdf.currentPage &&
        item.difficulty === difficulty
      )
      
      if (!exists) {
        return [historyItem, ...prev.slice(0, 49)]
      }
      return prev
    })
  }, [pdf.currentPage, difficulty, explain])

  const handleDifficultyChange = useCallback((newDifficulty) => {
    setDifficulty(newDifficulty)
    if (selectedLine) {
      explain.startStreaming(selectedLine.text, newDifficulty)
    }
  }, [selectedLine, explain])

  const handleHistoryItemClick = useCallback((item) => {
    setActiveHistoryItem(item)
    setSelectedLine({ text: item.text })
    setDifficulty(item.difficulty)
    explain.resetExplanation()
    
    setTimeout(() => {
      explain.setStreamedText(item.explanation)
    }, 100)
  }, [explain])

  const handleFollowUp = useCallback((question) => {
    if (selectedLine) {
      explain.startStreaming(selectedLine.text, difficulty)
    }
  }, [selectedLine, difficulty, explain])

  if (!pdfFile) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'var(--bg)'
      }}>
        <div
          className={`upload-zone ${isDragging ? 'dragover' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="upload-title">Drop your PDF here</div>
          <div className="upload-subtitle">
            Upload a textbook or document to start learning with your AI tutor
          </div>
          <label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
            <div className="upload-button">Browse file</div>
          </label>
          <div className="upload-hint">
            Only PDFs with selectable text are supported
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: '100vh', background: 'var(--bg)' }}>
      <div className="topbar">
        <div className="logo">
          Apex
          <div className="logo-dot"></div>
        </div>
        <div className="page-nav">
          {pdf.totalPages > 0 && `Page ${pdf.currentPage} of ${pdf.totalPages}`}
        </div>
        <label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          <div className="open-pdf-button">Open PDF</div>
        </label>
      </div>

      <div className="layout">
        <HistorySidebar
          history={history}
          activeItem={activeHistoryItem}
          onItemClick={handleHistoryItemClick}
        />

        <div className="main-content">
          <PDFViewer
            pdfDocument={pdf}
            currentPage={pdf.currentPage}
            totalPages={pdf.totalPages}
            lineIndex={pdf.lineIndex}
            onLineClick={handleLineClick}
            onPrevPage={() => pdf.changePage('prev')}
            onNextPage={() => pdf.changePage('next')}
          />
        </div>

        <ExplanationPanel
          selectedLine={selectedLine}
          currentPage={pdf.currentPage}
          isStreaming={explain.isStreaming}
          streamedText={explain.streamedText}
          difficulty={difficulty}
          onDifficultyChange={handleDifficultyChange}
          onFollowUp={handleFollowUp}
        />
      </div>
    </div>
  )
}
