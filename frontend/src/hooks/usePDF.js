import { useState, useRef, useCallback } from 'react'
import * as pdfjsLib from 'pdfjs-dist'

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs', import.meta.url
).toString()

export function usePDF() {
  const [pdfDoc, setPdfDoc] = useState(null)
  const [pageNum, setPageNum] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [lineIndex, setLineIndex] = useState([])
  const canvasRef = useRef(null)

  const loadPDF = useCallback(async (file) => {
    const arrayBuffer = await file.arrayBuffer()
    const doc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    setPdfDoc(doc)
    setTotalPages(doc.numPages)
    await renderPage(doc, 1)
  }, [])

  const renderPage = useCallback(async (doc, num) => {
    const page = await doc.getPage(num)
    const containerWidth = canvasRef.current.parentElement.clientWidth || 600
    const naturalWidth = page.getViewport({ scale: 1 }).width
    const scale = Math.min(containerWidth * 0.88 / naturalWidth, 1.8)
    const viewport = page.getViewport({ scale })
    
    const canvas = canvasRef.current
    canvas.width = viewport.width
    canvas.height = viewport.height
    
    await page.render({
      canvasContext: canvas.getContext('2d'),
      viewport
    }).promise
    
    const textContent = await page.getTextContent()
    setLineIndex(buildLineIndex(textContent, viewport))
  }, [])

  const buildLineIndex = useCallback((textContent, viewport) => {
    const lines = []
    const items = textContent.items.filter(item => item.str.trim() !== '')
    
    if (items.length === 0) return lines
    
    let currentLine = {
      text: items[0].str,
      x: items[0].transform[4],
      y: items[0].transform[5],
      width: items[0].width * viewport.scale,
      height: items[0].height * viewport.scale || 14,
      x2: items[0].transform[4] + (items[0].width * viewport.scale)
    }
    
    for (let i = 1; i < items.length; i++) {
      const item = items[i]
      const itemY = item.transform[5]
      const itemX = item.transform[4]
      
      const yDiff = Math.abs(itemY - currentLine.y)
      const xDiff = Math.abs(itemX - (currentLine.x2 + 2))
      
      if (yDiff < 4 && xDiff < 50) {
        currentLine.text += item.str
        currentLine.x2 = itemX + (item.width * viewport.scale)
        currentLine.width = currentLine.x2 - currentLine.x
      } else {
        lines.push(currentLine)
        currentLine = {
          text: item.str,
          x: itemX,
          y: itemY,
          width: item.width * viewport.scale,
          height: item.height * viewport.scale || 14,
          x2: itemX + (item.width * viewport.scale)
        }
      }
    }
    
    lines.push(currentLine)
    return lines.sort((a, b) => a.y - b.y)
  }, [])

  const getClickedLine = useCallback((mouseX, mouseY) => {
    for (const line of lineIndex) {
      const xMatch = mouseX >= (line.x - 8) && mouseX <= (line.x2 + 8)
      const yMatch = mouseY >= (line.y - line.height - 4) && mouseY <= (line.y + 4)
      
      if (xMatch && yMatch) {
        return line
      }
    }
    return null
  }, [lineIndex])

  const goToPage = useCallback((num) => {
    if (num >= 1 && num <= totalPages) {
      setPageNum(num)
      renderPage(pdfDoc, num)
    }
  }, [pdfDoc, totalPages, renderPage])

  return { 
    canvasRef, 
    lineIndex, 
    pdfDoc, 
    pageNum, 
    totalPages,
    loadPDF, 
    goToPage, 
    getClickedLine 
  }
}
