import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import PDFViewer from './PDFViewer'
import ExplanationPanel from './ExplanationPanel'
import StudyFlow from './StudyFlow'
import { usePDF } from '../../hooks/usePDF'
import { useMockExplain } from '../../hooks/useMockExplain'
import { useStore } from '../../context/StoreContext'

export default function ReaderView() {
  const navigate = useNavigate()
  const { state, addExplanation } = useStore()
  const user = state.user
  
  const [activeMode, setActiveMode] = useState('upload')
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [pdfDoc, setPdfDoc] = useState(null)
  const [pageNum, setPageNum] = useState(1)
  const [clickedLine, setClickedLine] = useState(null)
  const [highlights, setHighlights] = useState([])
  const [difficulty, setDifficulty] = useState('normal')
  const [isDragging, setIsDragging] = useState(false)

  const { canvasRef, lineIndex, loadPDF, goToPage } = usePDF()
  const { explanation, isStreaming, streamExplanation } = useMockExplain()

  const handleFileUpload = useCallback(async (files) => {
    const fileArray = Array.from(files)
    const newFiles = fileArray.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type,
      size: file.size,
      file: file,
      url: URL.createObjectURL(file)
    }))
    
    setUploadedFiles(prev => [...prev, ...newFiles])
    
    const pdfFile = fileArray.find(f => f.type === 'application/pdf')
    if (pdfFile) {
      await loadPDF(pdfFile)
      setPdfDoc(true)
      setSelectedFile(newFiles.find(f => f.type === 'application/pdf'))
      setPageNum(1)
      setClickedLine(null)
      setHighlights([])
    }
  }, [loadPDF])

  const handleLineClick = useCallback((line) => {
    setClickedLine(line)
    if (!highlights.find(h => h.text === line.text && h.x === line.x)) {
      setHighlights(prev => [...prev, line])
    }
    streamExplanation(difficulty)
    
    addExplanation({
      text: line.text,
      page: pageNum,
      difficulty,
      timestamp: new Date().toISOString()
    })
  }, [highlights, streamExplanation, difficulty, pageNum, addExplanation])

  const handleDifficultyChange = useCallback((newDifficulty) => {
    setDifficulty(newDifficulty)
    if (clickedLine) {
      streamExplanation(newDifficulty)
    }
  }, [clickedLine, streamExplanation])

  const handlePrevPage = useCallback(() => {
    if (pageNum > 1) {
      const newPage = pageNum - 1
      setPageNum(newPage)
      goToPage(newPage)
    }
  }, [pageNum, goToPage])

  const handleNextPage = useCallback(() => {
    if (pageNum < 340) {
      const newPage = pageNum + 1
      setPageNum(newPage)
      goToPage(newPage)
    }
  }, [pageNum, goToPage])

  const getFileIcon = (type) => {
    if (type.includes('pdf')) return '📄'
    if (type.includes('image')) return '🖼️'
    if (type.includes('word') || type.includes('document')) return '📝'
    if (type.includes('powerpoint') || type.includes('presentation')) return '📊'
    if (type.includes('excel') || type.includes('sheet')) return '📈'
    return '📎'
  }

  const renderFilePreview = (file) => {
    if (file.type.includes('image')) {
      return (
        <img 
          src={file.url} 
          alt={file.name}
          style={{ maxWidth: '100%', maxHeight: '70vh', borderRadius: 'var(--r-md)' }}
        />
      )
    }
    if (file.type.includes('pdf') && selectedFile?.id === file.id && pdfDoc) {
      return (
        <div style={{
          boxShadow: '0 0 0 1px var(--border), 0 24px 64px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.4)',
          borderRadius: 'var(--r-md)',
          overflow: 'hidden'
        }}>
          <PDFViewer
            canvasRef={canvasRef}
            lineIndex={lineIndex}
            onLineClick={handleLineClick}
            highlights={highlights}
          />
        </div>
      )
    }
    return (
      <div className="glass" style={{ padding: '60px', textAlign: 'center' }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>{getFileIcon(file.type)}</div>
        <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{file.name}</h3>
        <p style={{ color: 'var(--text-2)', fontSize: '14px' }}>
          {(file.size / 1024 / 1024).toFixed(2)} MB
        </p>
        {file.type.includes('pdf') && (
          <button 
            onClick={() => {
              setSelectedFile(file)
              loadPDF(file.file).then(() => setPdfDoc(true))
            }}
            style={{
              marginTop: '20px',
              padding: '12px 24px',
              background: 'var(--grad-primary)',
              color: 'white',
              borderRadius: 'var(--r-md)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Open PDF
          </button>
        )}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg)' }}>
      {/* Topbar */}
      <header style={{
        height: '52px',
        background: 'rgba(7,8,15,0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={() => navigate('/dashboard')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              fontSize: '14px', 
              color: 'var(--text-2)', 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer' 
            }}
          >
            ← Dashboard
          </button>
          
          {/* Mode Toggle */}
          <div className="glass" style={{ display: 'inline-flex', padding: '3px', borderRadius: 'var(--r-full)', marginLeft: '20px' }}>
            <button
              onClick={() => setActiveMode('upload')}
              style={{
                padding: '6px 16px',
                borderRadius: 'var(--r-full)',
                fontSize: '13px',
                fontWeight: 600,
                border: 'none',
                background: activeMode === 'upload' ? 'var(--grad-primary)' : 'transparent',
                color: activeMode === 'upload' ? 'white' : 'var(--text-2)',
                cursor: 'pointer'
              }}
            >
              📚 Documents
            </button>
            <button
              onClick={() => setActiveMode('study')}
              style={{
                padding: '6px 16px',
                borderRadius: 'var(--r-full)',
                fontSize: '13px',
                fontWeight: 600,
                border: 'none',
                background: activeMode === 'study' ? 'var(--grad-amber)' : 'transparent',
                color: activeMode === 'study' ? 'var(--bg)' : 'var(--text-2)',
                cursor: 'pointer'
              }}
            >
              🎯 Study Flow
            </button>
          </div>
        </div>

        {activeMode === 'upload' && pdfDoc && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--text-2)'
          }}>
            <button 
              onClick={handlePrevPage}
              disabled={pageNum <= 1}
              style={{ 
                width: '28px',
                height: '28px',
                borderRadius: 'var(--r-sm)',
                border: '1px solid var(--border)',
                background: pageNum <= 1 ? 'transparent' : 'var(--bg-3)',
                color: pageNum <= 1 ? 'var(--text-3)' : 'var(--text)',
                cursor: pageNum <= 1 ? 'not-allowed' : 'pointer'
              }}
            >
              ‹
            </button>
            <span style={{ color: 'var(--indigo)', fontWeight: 600 }}>{pageNum}</span>
            <span>/</span>
            <span>340</span>
            <button 
              onClick={handleNextPage}
              disabled={pageNum >= 340}
              style={{ 
                width: '28px',
                height: '28px',
                borderRadius: 'var(--r-sm)',
                border: '1px solid var(--border)',
                background: pageNum >= 340 ? 'transparent' : 'var(--bg-3)',
                color: pageNum >= 340 ? 'var(--text-3)' : 'var(--text)',
                cursor: pageNum >= 340 ? 'not-allowed' : 'pointer'
              }}
            >
              ›
            </button>
          </div>
        )}

        {activeMode === 'upload' && (
          <label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,image/*"
              multiple
              onChange={(e) => {
                if (e.target.files) handleFileUpload(e.target.files)
              }}
              style={{ display: 'none' }}
            />
            <div style={{
              padding: '8px 16px',
              background: 'var(--indigo-glow)',
              color: 'var(--indigo)',
              fontSize: '13px',
              fontWeight: 600,
              borderRadius: 'var(--r-sm)',
              cursor: 'pointer',
              border: '1px solid var(--border-indigo)'
            }}>
              + Add Files
            </div>
          </label>
        )}
      </header>

      {/* Main Content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {activeMode === 'study' ? (
          <StudyFlow />
        ) : (
          <>
            {/* File Sidebar */}
            <aside style={{
              width: '200px',
              background: 'var(--bg-2)',
              borderRight: '1px solid var(--border)',
              padding: '16px',
              overflow: 'auto'
            }}>
              <h3 style={{ fontSize: '12px', color: 'var(--text-3)', marginBottom: '12px', textTransform: 'uppercase' }}>
                Uploaded Files
              </h3>
              {uploadedFiles.length === 0 ? (
                <p style={{ fontSize: '12px', color: 'var(--text-2)' }}>No files yet</p>
              ) : (
                uploadedFiles.map(file => (
                  <div
                    key={file.id}
                    onClick={() => setSelectedFile(file)}
                    style={{
                      padding: '10px',
                      borderRadius: 'var(--r-sm)',
                      cursor: 'pointer',
                      background: selectedFile?.id === file.id ? 'var(--indigo-glow)' : 'transparent',
                      border: selectedFile?.id === file.id ? '1px solid var(--border-indigo)' : '1px solid transparent',
                      marginBottom: '8px'
                    }}
                  >
                    <div style={{ fontSize: '20px', marginBottom: '4px' }}>{getFileIcon(file.type)}</div>
                    <div style={{ fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {file.name}
                    </div>
                  </div>
                ))
              )}
            </aside>

            {/* Content Area */}
            <main style={{ 
              flex: 1, 
              background: 'var(--bg-2)',
              overflow: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px'
            }}>
              {uploadedFiles.length === 0 ? (
                <div 
                  className="glass"
                  style={{ 
                    width: '480px',
                    padding: '72px 48px',
                    textAlign: 'center',
                    border: isDragging ? '1px solid var(--border-amber)' : '1px solid var(--border)',
                    boxShadow: isDragging ? '0 0 60px var(--amber-glow)' : 'none'
                  }}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault()
                    setIsDragging(false)
                    if (e.dataTransfer.files) handleFileUpload(e.dataTransfer.files)
                  }}
                >
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--indigo)" strokeWidth="1.5" style={{ marginBottom: '24px' }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  <h2 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '8px' }}>Drop files here</h2>
                  <p style={{ fontSize: '14px', color: 'var(--text-2)', marginBottom: '8px' }}>
                    Support: PDF, Word, PowerPoint, Excel, Images
                  </p>
                  <label style={{ display: 'block', marginTop: '28px' }}>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,image/*"
                      multiple
                      onChange={(e) => {
                        if (e.target.files) handleFileUpload(e.target.files)
                      }}
                      style={{ display: 'none' }}
                    />
                    <button style={{
                      padding: '14px 32px',
                      background: 'var(--grad-primary)',
                      color: 'white',
                      fontSize: '15px',
                      fontWeight: 700,
                      borderRadius: 'var(--r-md)',
                      border: 'none',
                      cursor: 'pointer'
                    }}>
                      Choose Files
                    </button>
                  </label>
                </div>
              ) : selectedFile ? (
                renderFilePreview(selectedFile)
              ) : (
                <p style={{ color: 'var(--text-2)' }}>Select a file from the sidebar</p>
              )}
            </main>

            {/* Explanation Panel - only for PDFs */}
            {selectedFile?.type.includes('pdf') && (
              <ExplanationPanel
                clickedLine={clickedLine}
                explanation={explanation}
                isStreaming={isStreaming}
                difficulty={difficulty}
                onDifficultyChange={handleDifficultyChange}
                onFollowUp={(q) => streamExplanation(difficulty)}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}
