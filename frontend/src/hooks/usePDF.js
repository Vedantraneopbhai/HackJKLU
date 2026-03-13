import { useState, useRef, useCallback } from 'react'
import * as pdfjsLib from 'pdfjs-dist'

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString()

export function usePDF() {
  const [pdfDocument, setPdfDocument] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [lineIndex, setLineIndex] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const canvasRef = useRef(null)
  const renderTaskRef = useRef(null)

  const loadPDF = useCallback(async (file) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const arrayBuffer = await file.arrayBuffer()
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer })
      const pdf = await loadingTask.promise
      
      setPdfDocument(pdf)
      setTotalPages(pdf.numPages)
      setCurrentPage(1)
      setLineIndex([])
      
      return pdf
    } catch (err) {
      setError('Failed to load PDF. Please ensure it contains selectable text.')
      console.error('PDF loading error:', err)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const renderPage = useCallback(async (pageNum, containerWidth) => {
    if (!pdfDocument || !canvasRef.current) return null

    try {
      const page = await pdfDocument.getPage(pageNum)
      const viewport = page.getViewport({ scale: 1.5 })
      
      const scale = Math.min(containerWidth * 0.9 / viewport.width, 1.8)
      const scaledViewport = page.getViewport({ scale })
      
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      
      canvas.height = scaledViewport.height
      canvas.width = scaledViewport.width
      
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel()
      }
      
      renderTaskRef.current = page.render({
        canvasContext: context,
        viewport: scaledViewport
      })
      
      await renderTaskRef.current.promise
      
      const textContent = await page.getTextContent()
      const lines = buildLineIndex(textContent, scaledViewport)
      setLineIndex(lines)
      
      return {
        canvas,
        viewport: scaledViewport,
        lines
      }
    } catch (err) {
      console.error('Page rendering error:', err)
      setError('Failed to render page')
      return null
    }
  }, [pdfDocument])

  const buildLineIndex = useCallback((textContent, viewport) => {
    const lines = []
    const items = textContent.items
    
    if (items.length === 0) return lines
    
    let currentLine = {
      text: items[0].str,
      x: items[0].transform[4],
      y: viewport.height - items[0].transform[5],
      width: items[0].width,
      height: items[0].height || 12,
      x2: items[0].transform[4] + items[0].width
    }
    
    for (let i = 1; i < items.length; i++) {
      const item = items[i]
      const itemY = viewport.height - item.transform[5]
      const itemX = item.transform[4]
      
      const yDiff = Math.abs(itemY - currentLine.y)
      const xDiff = Math.abs(itemX - (currentLine.x2 + 2))
      
      if (yDiff < 4 && xDiff < 50) {
        currentLine.text += item.str
        currentLine.x2 = itemX + item.width
        currentLine.width = currentLine.x2 - currentLine.x
      } else {
        lines.push(currentLine)
        currentLine = {
          text: item.str,
          x: itemX,
          y: itemY,
          width: item.width,
          height: item.height || 12,
          x2: itemX + item.width
        }
      }
    }
    
    lines.push(currentLine)
    return lines
  }, [])

  const getClickedLine = useCallback((event, containerRect) => {
    if (!canvasRef.current || lineIndex.length === 0) return null
    
    const rect = canvasRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    for (const line of lineIndex) {
      const xMatch = x >= (line.x - 8) && x <= (line.x2 + 8)
      const yMatch = y >= (line.y - line.height - 4) && y <= (line.y + 4)
      
      if (xMatch && yMatch) {
        return line
      }
    }
    
    return null
  }, [lineIndex])

  const changePage = useCallback((direction) => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(prev => prev + 1)
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(prev => prev - 1)
    }
  }, [currentPage, totalPages])

  return {
    pdfDocument,
    currentPage,
    totalPages,
    lineIndex,
    isLoading,
    error,
    canvasRef,
    loadPDF,
    renderPage,
    getClickedLine,
    changePage,
    setCurrentPage
  }
}
