import { useState, useRef, useCallback } from 'react'

const mockExplanations = {
  simple: [
    "This is a basic concept that represents the fundamental relationship between the variables shown.",
    "The formula shows how these quantities are related in a straightforward way.",
    "This demonstrates the core principle behind the calculation being performed."
  ],
  normal: [
    "This expression defines the rate of change of velocity with respect to time — in other words, acceleration. The symbol ∂ denotes a partial derivative, meaning we're holding all other variables constant while differentiating with respect to t. The subscript notation v₀ refers to the initial velocity at t=0.",
    "This equation represents the conservation of energy principle, where the total mechanical energy remains constant in an isolated system. The kinetic energy term (½mv²) and potential energy term (mgh) are balanced, showing how energy transforms between different forms.",
    "The integral shown calculates the area under the curve, which represents the accumulated quantity over the specified interval. This is a fundamental operation in calculus for finding totals, averages, and accumulated changes."
  ],
  deep: [
    "This differential equation represents a second-order linear system with damping. The characteristic equation λ² + 2ζωₙλ + ωₙ² = 0 determines the system's behavior, where ζ is the damping ratio and ωₙ is the natural frequency. The solution exhibits different regimes: underdamped (ζ < 1) shows oscillatory decay, critically damped (ζ = 1) provides fastest response without overshoot, and overdamped (ζ > 1) yields slow exponential approach. The physical interpretation spans mechanical vibrations, electrical RLC circuits, and control systems, making this a cornerstone of engineering analysis.",
    "This tensor equation expresses Einstein's field equations of general relativity: Gμν = 8πG/c⁴ × Tμν. The left side represents the geometry of spacetime through the Einstein tensor Gμν, which encapsulates curvature. The right side describes the energy-momentum content Tμν. This profound relationship states that matter tells spacetime how to curve, and curved spacetime tells matter how to move. The constant 8πG/c⁴ ensures dimensional consistency and sets the strength of gravitational coupling. Solutions to these equations predict phenomena like gravitational time dilation, light bending, and black holes.",
    "The Fourier transform F(ω) = ∫f(t)e^(-iωt)dt decomposes a time-domain signal into its frequency components. This mathematical tool reveals that any periodic or aperiodic signal can be represented as a superposition of sinusoidal basis functions. The complex exponential e^(-iωt) encodes both amplitude and phase information through Euler's formula. Applications span signal processing, quantum mechanics (wave functions), heat transfer, and image analysis. The transform's invertibility allows perfect reconstruction, making it fundamental to modern digital communications and data compression."
  ]
}

export function useMockExplain() {
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamedText, setStreamedText] = useState('')
  const [currentExplanation, setCurrentExplanation] = useState('')
  const intervalRef = useRef(null)

  const startStreaming = useCallback((selectedText, difficulty = 'normal') => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    setIsStreaming(true)
    setStreamedText('')
    
    const explanations = mockExplanations[difficulty]
    const explanation = explanations[Math.floor(Math.random() * explanations.length)]
    setCurrentExplanation(explanation)
    
    let currentIndex = 0
    
    setTimeout(() => {
      intervalRef.current = setInterval(() => {
        if (currentIndex < explanation.length) {
          setStreamedText(prev => prev + explanation[currentIndex])
          currentIndex++
        } else {
          setIsStreaming(false)
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
        }
      }, 15)
    }, 400)
  }, [])

  const stopStreaming = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsStreaming(false)
  }, [])

  const resetExplanation = useCallback(() => {
    stopStreaming()
    setStreamedText('')
    setCurrentExplanation('')
  }, [stopStreaming])

  return {
    isStreaming,
    streamedText,
    currentExplanation,
    startStreaming,
    stopStreaming,
    resetExplanation
  }
}
