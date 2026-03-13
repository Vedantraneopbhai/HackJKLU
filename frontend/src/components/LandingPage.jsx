import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Hero from './ui/animated-shader-hero'

export default function LandingPage() {
  const navigate = useNavigate()
  const [activeFeature, setActiveFeature] = useState(0)
  const [counters, setCounters] = useState({ students: 0, explanations: 0, rating: 0 })
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const statsRef = useRef(null)

  // Animate counters when stats section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters()
          }
        })
      },
      { threshold: 0.5 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const animateCounters = () => {
    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const easeOut = 1 - Math.pow(1 - progress, 3)

      setCounters({
        students: Math.floor(50000 * easeOut),
        explanations: Math.floor(2000000 * easeOut),
        rating: Math.floor(98 * easeOut)
      })

      if (step >= steps) clearInterval(timer)
    }, interval)
  }

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => setSubscribed(false), 3000)
      setEmail('')
    }
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const onGetStarted = () => {
    navigate('/auth')
  }

  const features = [
    {
      icon: '🎯',
      title: 'Line-level AI tutor',
      description: 'Click any formula, sentence, or paragraph. Get an instant, surgical explanation of exactly what you selected.',
      color: 'var(--amber)',
      preview: '∂v/∂t = acceleration...'
    },
    {
      icon: '🗺️',
      title: 'Personal confusion map',
      description: 'See patterns in what confuses you. Focus your study time where you need it most.',
      color: 'var(--indigo)'
    },
    {
      icon: '🔔',
      title: 'Smart notifications',
      description: 'Never lose your place. Get reminded where you left off and when to review.',
      color: 'var(--success)'
    },
    {
      icon: '📊',
      title: 'Progress analytics',
      description: 'Track time spent, concepts mastered, and your learning velocity.',
      color: 'var(--indigo-2)'
    }
  ]

  const steps = [
    { num: 1, title: 'Upload your course PDFs', desc: 'Drag and drop any textbook PDF', icon: '📤' },
    { num: 2, title: 'Click what confuses you', desc: 'Point at any line or formula', icon: '👆' },
    { num: 3, title: 'Get instant, precise explanations', desc: 'AI explains exactly that part', icon: '💡' }
  ]

  const testimonials = [
    { name: 'Sarah Chen', role: 'Computer Science Major', text: 'Apex helped me understand complex algorithms by breaking down every line of pseudocode. My grades improved by 20%!', avatar: 'SC' },
    { name: 'Marcus Johnson', role: 'Medical Student', text: 'The AI explanations are like having a personal tutor available 24/7. Perfect for late-night study sessions.', avatar: 'MJ' },
    { name: 'Emily Rodriguez', role: 'Engineering Student', text: 'Finally, a tool that understands context. It doesn\'t just give definitions—it explains the \'why\' behind concepts.', avatar: 'ER' }
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-display)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Navigation */}
      <nav className="glass" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '70px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '0 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1000,
        backdropFilter: 'blur(20px)',
        background: 'rgba(7,8,15,0.2)', // More transparent
        transition: 'all 0.3s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => scrollToSection('hero')}>
          <div style={{ 
            width: '10px', 
            height: '10px', 
            borderRadius: '50%', 
            background: 'var(--indigo)',
            animation: 'pulseGlow 2s infinite',
            boxShadow: '0 0 20px var(--indigo)'
          }} />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px' }}>Apex</span>
        </div>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }} className="desktop-nav">
          {['Features', 'How it works'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase().replace(/ /g, '-'))}
              style={{
                fontSize: '14px',
                color: 'var(--text-2)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                padding: '8px 0'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = 'var(--text)'
                e.target.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'var(--text-2)'
                e.target.style.transform = 'translateY(0)'
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button 
            onClick={() => navigate('/auth')} 
            style={{ 
              padding: '12px 28px', 
              background: 'var(--grad-primary)', 
              color: 'white', 
              fontSize: '14px', 
              fontWeight: 700, 
              borderRadius: 'var(--r-md)', 
              boxShadow: '0 4px 28px var(--indigo-glow-strong)', 
              border: 'none', 
              cursor: 'pointer',
              transition: 'all 0.2s',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px) scale(1.02)'
              e.target.style.boxShadow = '0 8px 40px var(--indigo-glow-strong)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)'
              e.target.style.boxShadow = '0 4px 28px var(--indigo-glow-strong)'
            }}
          >
            Get started free →
          </button>
        </div>
      </nav>

      {/* Hero Section with WebGL Shader */}
      <Hero
        trustBadge={{
          text: "🚀 Now with Study Flow AI",
          icons: []
        }}
        headline={{
          line1: "Learn anything.",
          line2: "Understand everything."
        }}
        subtitle={"Upload your textbooks. Click what confuses you. Get a tutor-level explanation of exactly that line."}
        buttons={{
          primary: {
            text: "Start learning free →",
            onClick: onGetStarted
          },
          secondary: {
            text: "▶ Watch demo",
            onClick: () => {}
          }
        }}
        className="!text-white !drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)]"
      />

      {/* Spacer between Hero and Stats */}
      <div style={{ height: '60px', background: 'var(--bg)' }} />

      {/* Stats Banner */}
      <section 
        ref={statsRef}
        id="stats"
        style={{ 
          padding: '80px 40px', 
          display: 'flex',
          justifyContent: 'center',
          gap: '80px',
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 1
        }}
      >
        {[
          { value: counters.students, suffix: 'k+', label: 'Students learning', color: 'var(--indigo)' },
          { value: counters.explanations, suffix: 'M+', label: 'Explanations given', color: 'var(--amber)' },
          { value: counters.rating, suffix: '%', label: 'Clarity rating', color: 'var(--success)' }
        ].map((stat, i) => (
          <div 
            key={i}
            style={{ 
              textAlign: 'center',
              animation: 'fadeUp 0.6s ease both',
              animationDelay: `${i * 0.1}s`
            }}
          >
            <div style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: '56px', 
              fontWeight: 900,
              background: `linear-gradient(135deg, ${stat.color}, var(--text))`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {stat.value >= 1000 ? (stat.value / 1000).toFixed(0) + stat.suffix : stat.value + stat.suffix}
            </div>
            <div style={{ fontSize: '15px', color: 'var(--text-2)', marginTop: '8px' }}>{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '100px 60px', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--indigo)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Features
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, marginTop: '12px' }}>
            Everything a <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>student</span> needs
          </h2>
        </div>

        {/* Feature Cards - Interactive */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {features.map((feature, i) => (
            <div
              key={i}
              className="glass"
              onClick={() => setActiveFeature(i)}
              style={{
                padding: '32px',
                cursor: 'pointer',
                border: activeFeature === i ? `1px solid ${feature.color}` : '1px solid var(--border)',
                boxShadow: activeFeature === i ? `0 0 40px ${feature.color}20` : 'none',
                transition: 'all 0.3s',
                transform: activeFeature === i ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (activeFeature !== i) {
                  e.currentTarget.style.borderColor = 'var(--border-hover)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }
              }}
              onMouseLeave={(e) => {
                if (activeFeature !== i) {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }
              }}
            >
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: `${feature.color}15`,
                border: `1px solid ${feature.color}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                marginBottom: '20px'
              }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px' }}>{feature.title}</h3>
              <p style={{ fontSize: '15px', color: 'var(--text-2)', lineHeight: '1.7' }}>{feature.description}</p>
              
              {feature.preview && (
                <div style={{
                  marginTop: '20px',
                  padding: '12px',
                  background: 'var(--bg-3)',
                  borderRadius: 'var(--r-sm)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--text-2)'
                }}>
                  {feature.preview}
                </div>
              )}

              {activeFeature === i && (
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '16px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: feature.color,
                  animation: 'pulseGlow 2s infinite'
                }} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{ padding: '100px 60px', maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 42px)', fontWeight: 800 }}>
            From confused to confident in 3 steps
          </h2>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '20px', color: 'var(--text-2)', marginTop: '12px' }}>
            Your curriculum, explained line by line
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
          {steps.map((step, i) => (
            <div key={i} style={{ flex: 1, minWidth: '250px', maxWidth: '300px', textAlign: 'center' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                border: '2px solid var(--border-indigo)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                fontSize: '28px',
                position: 'relative',
                background: 'var(--bg-2)'
              }}>
                {step.icon}
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'var(--indigo)',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {step.num}
                </div>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginTop: '24px' }}>{step.title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-2)', marginTop: '8px' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fun Fact Section (replaces testimonials) */}
      <section id="fun-fact" style={{ padding: '100px 60px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 42px)', fontWeight: 800 }}>
            Did you know?
          </h2>
        </div>
        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          background: 'rgba(99,102,241,0.08)',
          borderRadius: '18px',
          padding: '48px 32px',
          boxShadow: '0 4px 32px rgba(99,102,241,0.08)',
          fontSize: '22px',
          color: 'var(--text)',
          fontWeight: 500,
          textAlign: 'center'
        }}>
          The average person will spend about 6 months of their life waiting for red lights to turn green.
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '100px 60px', position: 'relative', zIndex: 1 }}>
        <div 
          className="glass" 
          style={{ 
            maxWidth: '900px', 
            margin: '0 auto', 
            padding: '80px 60px', 
            textAlign: 'center',
            border: '1px solid var(--border-indigo)',
            boxShadow: '0 0 120px var(--indigo-glow), inset 0 1px 0 rgba(99,102,241,0.2)',
            background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(240,168,84,0.04))'
          }}
        >
          <h2 className="gradient-text" style={{ fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 900 }}>
            Stop re-reading. Start understanding.
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--text-2)', marginTop: '16px', maxWidth: '500px', margin: '16px auto 0' }}>
            Join 50,000+ students who are learning smarter, not harder.
          </p>
          
          {/* Newsletter Signup */}
          <form onSubmit={handleSubscribe} style={{ marginTop: '40px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                padding: '16px 24px',
                fontSize: '16px',
                background: 'var(--bg-3)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-md)',
                minWidth: '280px',
                outline: 'none',
                color: 'var(--text)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--indigo)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
            />
            <button
              type="submit"
              style={{
                padding: '16px 32px',
                background: subscribed ? 'var(--success)' : 'var(--grad-primary)',
                color: 'white',
                fontSize: '16px',
                fontWeight: 700,
                borderRadius: 'var(--r-md)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => !subscribed && (e.target.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              {subscribed ? '✓ Subscribed!' : 'Get started free →'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '40px 60px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--indigo)' }} />
            <span style={{ fontWeight: 800, fontSize: '18px' }}>Apex</span>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-3)' }}>
            © 2025 Apex. Built with AI for students.
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            {['Twitter', 'GitHub', 'Discord'].map((social) => (
              <button
                key={social}
                className="glass"
                style={{
                  padding: '8px 16px',
                  fontSize: '13px',
                  color: 'var(--text-2)',
                  cursor: 'pointer',
                  border: '1px solid var(--border)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'var(--text)'
                  e.target.style.borderColor = 'var(--border-hover)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'var(--text-2)'
                  e.target.style.borderColor = 'var(--border)'
                }}
              >
                {social}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
