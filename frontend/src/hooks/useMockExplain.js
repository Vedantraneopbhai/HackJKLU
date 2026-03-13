import { useState, useRef, useEffect, useCallback } from 'react'

const MOCK_RESPONSES = {
  normal: "This expression defines the rate of change of velocity with respect to time — in other words, acceleration. The symbol ∂ denotes a partial derivative, meaning we hold all other variables constant while differentiating. The subscript v₀ refers to the initial velocity at t=0, reference point for measurement.",
  simple: "This is just a fancy way of asking: how fast is something speeding up? The little squiggly symbol ∂ means we're looking at one thing changing while keeping everything else frozen. Think of it like pausing a video and checking just one frame.",
  deep: "This is a partial differential operator applied to velocity field v with respect to time t. The partial derivative ∂v/∂t isolates temporal change in the vector field, excluding spatial gradients. In the context of Navier-Stokes equations, this term represents local acceleration — distinct from convective acceleration (v·∇)v which accounts for spatial transport."
}

export function useMockExplain() {
  const [explanation, setExplanation] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const intervalRef = useRef(null)

  const streamExplanation = useCallback((difficulty = 'normal') => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setExplanation('')
    setIsStreaming(true)
    
    const text = MOCK_RESPONSES[difficulty] || MOCK_RESPONSES.normal
    let i = 0
    
    setTimeout(() => {
      intervalRef.current = setInterval(() => {
        if (i < text.length) {
          setExplanation(text.slice(0, i + 1))
          i++
        } else {
          clearInterval(intervalRef.current)
          setIsStreaming(false)
        }
      }, 18)
    }, 400)
  }, [])

  useEffect(() => {
    return () => { 
      if (intervalRef.current) clearInterval(intervalRef.current) 
    }
  }, [])

  return { explanation, isStreaming, streamExplanation }
}
