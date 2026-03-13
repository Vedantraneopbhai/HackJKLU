import { useEffect, useRef, useState } from 'react'

export default function PDFViewer({ 
  pdfDocument, 
  currentPage, 
  totalPages, 
  lineIndex, 
  onLineClick, 
  onPrevPage, 
  onNextPage 
}) {
  const [hoveredLine, setHoveredLine] = useState(null)
  const [activeLines, setActiveLines] = useState([])
  const containerRef = useRef(null)
  const svgRef = useRef(null)

  useEffect(() => {
    if (pdfDocument && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth
      pdfDocument.renderPage(currentPage, containerWidth)
    }
  }, [pdfDocument, currentPage])

  const handleCanvasClick = (event) => {
    const line = pdfDocument.getClickedLine(event, containerRef.current.getBoundingClientRect())
    if (line) {
      onLineClick(line)
      if (!activeLines.find(l => l.text === line.text && l.x === line.x)) {
        setActiveLines(prev => [...prev, line])
      }
    }
  }

  const handleMouseMove = (event) => {
    const line = pdfDocument.getClickedLine(event, containerRef.current.getBoundingClientRect())
    setHoveredLine(line)
  }

  const handleMouseLeave = () => {
    setHoveredLine(null)
  }

  const getLineKey = (line) => `${line.x}-${line.y}-${line.text.slice(0, 10)}`

  return (
    <div className="pdf-container" ref={containerRef}>
      <div className="pdf-wrapper">
        <canvas
          ref={pdfDocument.canvasRef}
          className="pdf-canvas"
          onClick={handleCanvasClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
        
        {lineIndex.length > 0 && (
          <svg
            ref={svgRef}
            className="pdf-overlay interactive"
            style={{
              width: pdfDocument.canvasRef.current?.width || 0,
              height: pdfDocument.canvasRef.current?.height || 0
            }}
          >
            {lineIndex.map((line) => {
              const isHovered = hoveredLine && 
                hoveredLine.x === line.x && 
                hoveredLine.y === line.y
              const isActive = activeLines.some(l => 
                l.x === line.x && 
                l.y === line.y
              )
              
              return (
                <rect
                  key={getLineKey(line)}
                  className={`line-highlight ${isHovered ? 'hover' : ''} ${isActive ? 'active' : ''}`}
                  x={line.x - 4}
                  y={line.y - line.height - 2}
                  width={line.width + 8}
                  height={line.height + 4}
                  rx={2}
                />
              )
            })}
          </svg>
        )}
      </div>
      
      {totalPages > 1 && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '16px', 
          marginTop: '20px',
          fontFamily: "'DM Mono', monospace",
          fontSize: '12px',
          color: 'var(--text-2)'
        }}>
          <button
            onClick={onPrevPage}
            disabled={currentPage === 1}
            style={{
              padding: '4px 8px',
              background: currentPage === 1 ? 'var(--border)' : 'var(--bg-3)',
              color: currentPage === 1 ? 'var(--text-3)' : 'var(--text)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              fontSize: '11px'
            }}
          >
            ← Previous
          </button>
          
          <span>
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={onNextPage}
            disabled={currentPage === totalPages}
            style={{
              padding: '4px 8px',
              background: currentPage === totalPages ? 'var(--border)' : 'var(--bg-3)',
              color: currentPage === totalPages ? 'var(--text-3)' : 'var(--text)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              fontSize: '11px'
            }}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  )
}
