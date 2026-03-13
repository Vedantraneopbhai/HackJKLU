import { useState } from 'react'
import { useStore } from '../../context/StoreContext'

const MOCK_STUDY_RESPONSE = {
  topic: {
    title: "Quantum Mechanics",
    definition: "The branch of physics that deals with the behavior of matter and light at the atomic and subatomic scale.",
    detailedExplanation: "Quantum mechanics describes nature at the smallest scales of energy levels of atoms and subatomic particles. It introduces concepts like wave-particle duality, quantization of energy, and the uncertainty principle.",
    keyPoints: [
      "Wave-particle duality",
      "Heisenberg Uncertainty Principle",
      "Quantum superposition",
      "Quantum entanglement",
      "Schrödinger equation"
    ],
    realWorldApplications: [
      "Semiconductors and transistors",
      "Lasers",
      "MRI scanners",
      "Quantum computing",
      "Cryptography"
    ],
    whyItMatters: "Quantum mechanics is the foundation of modern physics and technology. Without it, we wouldn't have computers, smartphones, or advanced medical imaging.",
    prerequisites: ["Basic physics", "Linear algebra", "Calculus", "Classical mechanics"],
    misconceptions: [
      "Quantum mechanics only applies to small particles",
      "Observation changes reality magically",
      "Quantum entanglement allows faster-than-light communication"
    ]
  },
  description: "Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles.",
  youtubeResources: [
    { title: "Quantum Mechanics explained visually", channel: "Kurzgesagt", duration: "10:15" },
    { title: "The Quantum World", channel: "PBS Space Time", duration: "15:30" },
    { title: "Quantum Physics for Beginners", channel: "Fermilab", duration: "8:45" }
  ],
  breakdown: [
    { concept: "Wave functions and probability", timeEstimate: "45 min" },
    { concept: "Operators and observables", timeEstimate: "60 min" },
    { concept: "Schrödinger equation", timeEstimate: "90 min" },
    { concept: "Quantum harmonic oscillator", timeEstimate: "75 min" },
    { concept: "Hydrogen atom", timeEstimate: "120 min" }
  ],
  visualization: {
    type: "formula",
    content: "iℏ∂ψ/∂t = Ĥψ",
    description: "The time-dependent Schrödinger equation"
  },
  examples: [
    {
      title: "Particle in a box",
      code: "// Energy levels\\nE_n = (n²h²)/(8mL²)\\n\\n// Wave function\\nψ_n(x) = √(2/L) sin(nπx/L)",
      explanation: "A particle confined to a one-dimensional box of length L."
    },
    {
      title: "Quantum tunneling",
      code: "T ≈ exp(-2κL)\\nwhere κ = √(2m(V₀-E))/ℏ",
      explanation: "Probability of particle passing through a potential barrier."
    }
  ],
  quiz: [
    {
      type: "conceptual",
      question: "What does the wave function ψ represent in quantum mechanics?",
      options: [
        "The exact location of a particle",
        "The probability amplitude of finding a particle",
        "The velocity of a particle",
        "The mass of a particle"
      ],
      correct: 1,
      explanation: "The wave function ψ describes the quantum state and |ψ|² gives the probability density."
    },
    {
      type: "application",
      question: "Which technology directly relies on quantum tunneling?",
      options: [
        "Steam engines",
        "Scanning tunneling microscopes",
        "Bicycles",
        "Wind turbines"
      ],
      correct: 1,
      explanation: "Scanning tunneling microscopes use quantum tunneling to image surfaces at atomic resolution."
    },
    {
      type: "misconception",
      question: "True or False: Quantum mechanics says particles exist in multiple places at once until observed.",
      options: ["True", "False"],
      correct: 1,
      explanation: "This is a common misconception. Particles exist in superposition of states, not multiple places."
    },
    {
      type: "real-world",
      question: "How does quantum mechanics enable modern computers?",
      options: [
        "Through quantum entanglement",
        "Through semiconductor band theory",
        "Through teleportation",
        "Through time travel"
      ],
      correct: 1,
      explanation: "Semiconductor band theory, based on quantum mechanics, allows precise control of electron flow."
    },
    {
      type: "revision",
      question: "What is the Heisenberg Uncertainty Principle?",
      options: [
        "ΔxΔp ≥ ℏ/2 - Position and momentum cannot both be precisely known",
        "Energy is always conserved",
        "Light travels at constant speed",
        "For every action there is equal reaction"
      ],
      correct: 0,
      explanation: "The uncertainty principle states that the more precisely position is known, the less precisely momentum can be known."
    }
  ]
}

export default function StudyFlow() {
  const [topic, setTopic] = useState('')
  const [loading, setLoading] = useState(false)
  const [studyGuide, setStudyGuide] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [quizAnswers, setQuizAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  const generateStudyGuide = async () => {
    if (!topic.trim()) return
    
    setLoading(true)
    
    // Simulate AI API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In production, this would be an actual API call
    // const response = await fetch('/api/study-guide', {
    //   method: 'POST',
    //   body: JSON.stringify({ topic })
    // })
    // const data = await response.json()
    
    setStudyGuide({ ...MOCK_STUDY_RESPONSE, topic: { ...MOCK_STUDY_RESPONSE.topic, title: topic } })
    setLoading(false)
    setActiveTab('overview')
    setQuizAnswers({})
    setShowResults(false)
  }

  const handleQuizAnswer = (questionIndex, answerIndex) => {
    setQuizAnswers({ ...quizAnswers, [questionIndex]: answerIndex })
  }

  const calculateScore = () => {
    let correct = 0
    studyGuide.quiz.forEach((q, i) => {
      if (quizAnswers[i] === q.correct) correct++
    })
    return correct
  }

  if (loading) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div style={{ width: '48px', height: '48px', border: '3px solid var(--indigo-glow)', borderTopColor: 'var(--indigo)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ marginTop: '24px', color: 'var(--text-2)', fontSize: '16px' }}>
          Generating your personalized study guide...
        </p>
        <p style={{ marginTop: '8px', color: 'var(--text-3)', fontSize: '14px' }}>
          This may take a few seconds
        </p>
      </div>
    )
  }

  if (!studyGuide) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div className="glass" style={{ padding: '48px', maxWidth: '600px', width: '100%' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '16px', textAlign: 'center' }}>
            🎯 Study Flow
          </h2>
          <p style={{ color: 'var(--text-2)', textAlign: 'center', marginBottom: '32px' }}>
            Enter any topic and get a complete AI-generated study guide with explanations, resources, and quizzes.
          </p>
          
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Quantum Mechanics, Machine Learning, World War II..."
            style={{
              width: '100%',
              padding: '16px 20px',
              fontSize: '16px',
              background: 'var(--bg-3)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-md)',
              marginBottom: '16px',
              outline: 'none'
            }}
            onKeyPress={(e) => e.key === 'Enter' && generateStudyGuide()}
          />
          
          <button
            onClick={generateStudyGuide}
            disabled={!topic.trim()}
            style={{
              width: '100%',
              padding: '16px',
              background: topic.trim() ? 'var(--grad-primary)' : 'var(--bg-3)',
              color: topic.trim() ? 'white' : 'var(--text-3)',
              fontSize: '16px',
              fontWeight: 700,
              borderRadius: 'var(--r-md)',
              border: 'none',
              cursor: topic.trim() ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s'
            }}
          >
            Generate Study Guide →
          </button>
          
          <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {['Physics', 'History', 'Biology', 'Chemistry', 'Mathematics', 'Computer Science'].map(subject => (
              <button
                key={subject}
                onClick={() => setTopic(subject)}
                className="glass"
                style={{
                  padding: '10px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  border: topic === subject ? '1px solid var(--indigo)' : '1px solid var(--border)'
                }}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>
              {studyGuide.topic.title}
            </h1>
            <p style={{ color: 'var(--text-2)', fontSize: '16px' }}>
              {studyGuide.description}
            </p>
          </div>
          <button
            onClick={() => {
              setStudyGuide(null)
              setTopic('')
            }}
            className="glass"
            style={{ padding: '10px 20px', fontSize: '14px', cursor: 'pointer' }}
          >
            New Topic
          </button>
        </div>
        
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
          {['overview', 'breakdown', 'resources', 'examples', 'quiz'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 20px',
                borderRadius: 'var(--r-md)',
                fontSize: '14px',
                fontWeight: 600,
                textTransform: 'capitalize',
                border: 'none',
                background: activeTab === tab ? 'var(--indigo-glow)' : 'transparent',
                color: activeTab === tab ? 'var(--indigo)' : 'var(--text-2)',
                cursor: 'pointer',
                borderBottom: activeTab === tab ? '2px solid var(--indigo)' : '2px solid transparent'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '32px' }}>
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {/* Definition */}
            <div className="glass" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: 'var(--indigo)' }}>
                📖 Definition
              </h3>
              <p style={{ color: 'var(--text-2)', lineHeight: '1.7' }}>
                {studyGuide.topic.definition}
              </p>
            </div>

            {/* Why It Matters */}
            <div className="glass" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: 'var(--amber)' }}>
                💡 Why It Matters
              </h3>
              <p style={{ color: 'var(--text-2)', lineHeight: '1.7' }}>
                {studyGuide.topic.whyItMatters}
              </p>
            </div>

            {/* Key Points */}
            <div className="glass" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>
                🎯 Key Points
              </h3>
              <ul style={{ paddingLeft: '20px' }}>
                {studyGuide.topic.keyPoints.map((point, i) => (
                  <li key={i} style={{ color: 'var(--text-2)', marginBottom: '8px', lineHeight: '1.6' }}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Real-World Applications */}
            <div className="glass" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>
                🌍 Real-World Applications
              </h3>
              <ul style={{ paddingLeft: '20px' }}>
                {studyGuide.topic.realWorldApplications.map((app, i) => (
                  <li key={i} style={{ color: 'var(--text-2)', marginBottom: '8px', lineHeight: '1.6' }}>
                    {app}
                  </li>
                ))}
              </ul>
            </div>

            {/* Prerequisites */}
            <div className="glass" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>
                📚 Prerequisites
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {studyGuide.topic.prerequisites.map((pre, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '6px 12px',
                      background: 'var(--indigo-glow)',
                      color: 'var(--indigo)',
                      borderRadius: 'var(--r-sm)',
                      fontSize: '13px'
                    }}
                  >
                    {pre}
                  </span>
                ))}
              </div>
            </div>

            {/* Common Misconceptions */}
            <div className="glass" style={{ padding: '24px', border: '1px solid var(--border-amber)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: 'var(--amber)' }}>
                ⚠️ Common Misconceptions
              </h3>
              <ul style={{ paddingLeft: '20px' }}>
                {studyGuide.topic.misconceptions.map((miscon, i) => (
                  <li key={i} style={{ color: 'var(--text-2)', marginBottom: '8px', lineHeight: '1.6' }}>
                    {miscon}
                  </li>
                ))}
              </ul>
            </div>

            {/* Visualization */}
            <div className="glass" style={{ padding: '24px', gridColumn: '1 / -1' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>
                🔬 Key Formula / Visualization
              </h3>
              <div style={{
                padding: '32px',
                background: 'var(--bg-3)',
                borderRadius: 'var(--r-md)',
                textAlign: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '24px',
                color: 'var(--indigo)'
              }}>
                {studyGuide.visualization.content}
              </div>
              <p style={{ textAlign: 'center', color: 'var(--text-2)', marginTop: '12px' }}>
                {studyGuide.visualization.description}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'breakdown' && (
          <div className="glass" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>
              📋 Learning Path Breakdown
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {studyGuide.breakdown.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px',
                    background: 'var(--bg-3)',
                    borderRadius: 'var(--r-md)',
                    borderLeft: '4px solid var(--indigo)'
                  }}
                >
                  <div>
                    <span style={{
                      display: 'inline-block',
                      width: '28px',
                      height: '28px',
                      background: 'var(--indigo)',
                      color: 'white',
                      borderRadius: '50%',
                      textAlign: 'center',
                      lineHeight: '28px',
                      marginRight: '16px',
                      fontWeight: 700
                    }}>
                      {i + 1}
                    </span>
                    <span style={{ fontSize: '16px', fontWeight: 600 }}>
                      {item.concept}
                    </span>
                  </div>
                  <span style={{ color: 'var(--text-2)', fontSize: '14px' }}>
                    ⏱️ {item.timeEstimate}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '24px', padding: '16px', background: 'var(--indigo-glow)', borderRadius: 'var(--r-md)' }}>
              <p style={{ color: 'var(--indigo)', fontSize: '14px' }}>
                📊 Total estimated time: {studyGuide.breakdown.reduce((acc, item) => {
                  const mins = parseInt(item.timeEstimate)
                  return acc + (isNaN(mins) ? 0 : mins)
                }, 0)} minutes
              </p>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="glass" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>
              🎥 Recommended YouTube Resources
            </h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              {studyGuide.youtubeResources.map((resource, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px',
                    background: 'var(--bg-3)',
                    borderRadius: 'var(--r-md)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(8px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: 'var(--indigo-glow)',
                      borderRadius: 'var(--r-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px'
                    }}>
                      ▶️
                    </div>
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>
                        {resource.title}
                      </h4>
                      <p style={{ color: 'var(--text-2)', fontSize: '14px' }}>
                        {resource.channel}
                      </p>
                    </div>
                  </div>
                  <span style={{ color: 'var(--text-2)', fontSize: '14px' }}>
                    {resource.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div style={{ display: 'grid', gap: '24px' }}>
            {studyGuide.examples.map((example, i) => (
              <div key={i} className="glass" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>
                  💻 {example.title}
                </h3>
                <p style={{ color: 'var(--text-2)', marginBottom: '16px', lineHeight: '1.6' }}>
                  {example.explanation}
                </p>
                <pre style={{
                  padding: '20px',
                  background: 'var(--bg-3)',
                  borderRadius: 'var(--r-md)',
                  overflow: 'auto',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  color: 'var(--text)',
                  lineHeight: '1.6'
                }}>
                  {example.code}
                </pre>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="glass" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 700 }}>
                📝 Knowledge Check
              </h3>
              {showResults && (
                <div style={{
                  padding: '12px 24px',
                  background: calculateScore() >= 3 ? 'var(--success)' : 'var(--warning)',
                  color: 'var(--bg)',
                  borderRadius: 'var(--r-md)',
                  fontWeight: 700
                }}>
                  Score: {calculateScore()} / {studyGuide.quiz.length}
                </div>
              )}
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {studyGuide.quiz.map((q, i) => (
                <div key={i} style={{ padding: '24px', background: 'var(--bg-3)', borderRadius: 'var(--r-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <span style={{
                      padding: '4px 12px',
                      background: 'var(--indigo-glow)',
                      color: 'var(--indigo)',
                      borderRadius: 'var(--r-sm)',
                      fontSize: '12px',
                      fontWeight: 600,
                      textTransform: 'uppercase'
                    }}>
                      {q.type}
                    </span>
                    <span style={{ color: 'var(--text-3)', fontSize: '14px' }}>
                      Question {i + 1}
                    </span>
                  </div>
                  
                  <p style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>
                    {q.question}
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {q.options.map((opt, j) => (
                      <button
                        key={j}
                        onClick={() => !showResults && handleQuizAnswer(i, j)}
                        style={{
                          padding: '12px 16px',
                          textAlign: 'left',
                          borderRadius: 'var(--r-sm)',
                          border: '1px solid',
                          borderColor: quizAnswers[i] === j 
                            ? showResults 
                              ? j === q.correct ? 'var(--success)' : 'var(--danger)'
                              : 'var(--indigo)'
                            : 'var(--border)',
                          background: quizAnswers[i] === j
                            ? showResults
                              ? j === q.correct ? 'rgba(74,222,128,0.1)' : 'rgba(248,113,113,0.1)'
                              : 'var(--indigo-glow)'
                            : 'transparent',
                          color: 'var(--text)',
                          cursor: showResults ? 'default' : 'pointer'
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  
                  {showResults && quizAnswers[i] !== undefined && (
                    <div style={{
                      marginTop: '16px',
                      padding: '12px',
                      background: quizAnswers[i] === q.correct ? 'rgba(74,222,128,0.1)' : 'rgba(248,113,113,0.1)',
                      borderRadius: 'var(--r-sm)',
                      borderLeft: `3px solid ${quizAnswers[i] === q.correct ? 'var(--success)' : 'var(--danger)'}`
                    }}>
                      <p style={{ fontSize: '14px', color: 'var(--text-2)' }}>
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {!showResults ? (
              <button
                onClick={() => setShowResults(true)}
                disabled={Object.keys(quizAnswers).length < studyGuide.quiz.length}
                style={{
                  marginTop: '24px',
                  width: '100%',
                  padding: '16px',
                  background: Object.keys(quizAnswers).length === studyGuide.quiz.length ? 'var(--grad-primary)' : 'var(--bg-3)',
                  color: Object.keys(quizAnswers).length === studyGuide.quiz.length ? 'white' : 'var(--text-3)',
                  fontSize: '16px',
                  fontWeight: 700,
                  borderRadius: 'var(--r-md)',
                  border: 'none',
                  cursor: Object.keys(quizAnswers).length === studyGuide.quiz.length ? 'pointer' : 'not-allowed'
                }}
              >
                Check Answers
              </button>
            ) : (
              <button
                onClick={() => {
                  setQuizAnswers({})
                  setShowResults(false)
                }}
                className="glass"
                style={{
                  marginTop: '24px',
                  width: '100%',
                  padding: '16px',
                  fontSize: '16px',
                  fontWeight: 700,
                  borderRadius: 'var(--r-md)',
                  cursor: 'pointer'
                }}
              >
                Retake Quiz
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
