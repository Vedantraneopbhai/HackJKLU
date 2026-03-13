import { useState } from 'react'

export default function PDFViewer({ canvasRef, lineIndex, onLineClick, highlights }) {
  const [hoverLine, setHoverLine] = useState(null)

  const handleMouseMove = (e) => {
    if (!canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    for (const line of lineIndex) {
      const xMatch = x >= (line.x - 8) && x <= (line.x2 + 8)
      const yMatch = y >= (line.y - line.height - 4) && y <= (line.y + 4)
      
      if (xMatch && yMatch) {
        setHoverLine(line)
        return
      }
    }
    setHoverLine(null)
  }

  const handleClick = (e) => {
    if (!canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    for (const line of lineIndex) {
      const xMatch = x >= (line.x - 8) && x <= (line.x2 + 8)
      const yMatch = y >= (line.y - line.height - 4) && y <= (line.y + 4)
      
      if (xMatch && yMatch) {
        onLineClick(line)
        return
      }
    }
  }

  const handleMouseLeave = () => {
    setHoverLine(null)
  }

  const w = canvasRef.current?.width || 0
  const h = canvasRef.current?.height || 0

  return (
    <div style={{ position: 'relative', display: 'inline-block', cursor: 'crosshair' }}>
      <canvas ref={canvasRef} style={{ display: 'block' }} />
      {w > 0 && h > 0 && (
        <svg style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} width={w} height={h}>
          {/* Past clicks - faint amber */}
          {highlights.slice(0, -1).map((line, i) => (
            <rect key={`past-${i}`}
              x={line.x - 4} 
              y={line.y - line.height - 2}
              width={line.width + 8} 
              height={line.height + 6}
              rx={3} 
              fill="rgba(240,168,84,0.05)"
              stroke="rgba(240,168,84,0.2)" 
              strokeWidth={0.5} 
            />
          ))}
          
          {/* Active highlight - amber */}
          {highlights.slice(-1).map((line, i) => (
            <rect key={`active-${i}`}
              x={line.x - 4} 
              y={line.y - line.height - 2}
              width={line.width + 8} 
              height={line.height + 6}
              rx={3} 
              fill="rgba(240,168,84,0.14)" 
              stroke="rgba(240,168,84,0.5)" 
              strokeWidth={1} 
            />
          ))}
          
          {/* Hover highlight - indigo */}
          {hoverLine && (
            <rect 
              x={hoverLine.x - 4} 
              y={hoverLine.y - hoverLine.height - 2}
              width={hoverLine.width + 8} 
              height={hoverLine.height + 6}
              rx={3} 
              fill="rgba(99,102,241,0.06)"
              stroke="rgba(99,102,241,0.25)" 
              strokeWidth={1} 
            />
          )}
        </svg>
      )}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: w,
          height: h,
          cursor: 'crosshair'
        }}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  )
}
