import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

export default function AuthPage() {
  const navigate = useNavigate()
  const { login } = useStore()
  const [mode, setMode] = useState('signin')
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' })

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ name: form.name || 'Alex Johnson', email: form.email, role: form.role })
    navigate('/dashboard')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg)', fontFamily: 'var(--font-display)' }}>
      <div style={{ 
        flex: 1, 
        background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(240,168,84,0.06))',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '400px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 800, marginBottom: '24px' }}>
            Learnify <span style={{ color: 'var(--amber)' }}>apex</span>
          </h1>
          <p style={{ fontSize: '20px', color: 'var(--text-2)', lineHeight: '1.6' }}>
            The AI tutor that explains your textbooks line by line.
          </p>
        </div>
      </div>

      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px'
      }}>
        <div style={{ maxWidth: '420px', margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
            <button 
              onClick={() => setMode('signin')}
              style={{
                flex: 1,
                padding: '14px',
                background: mode === 'signin' ? 'var(--indigo-glow)' : 'transparent',
                border: mode === 'signin' ? '1px solid var(--border-indigo)' : '1px solid var(--border)',
                borderRadius: 'var(--r-md)',
                color: mode === 'signin' ? 'var(--indigo)' : 'var(--text-2)',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Sign in
            </button>
            <button 
              onClick={() => setMode('signup')}
              style={{
                flex: 1,
                padding: '14px',
                background: mode === 'signup' ? 'var(--indigo-glow)' : 'transparent',
                border: mode === 'signup' ? '1px solid var(--border-indigo)' : '1px solid var(--border)',
                borderRadius: 'var(--r-md)',
                color: mode === 'signup' ? 'var(--indigo)' : 'var(--text-2)',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Create account
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', color: 'var(--text-2)', marginBottom: '8px' }}>
                  Full name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Alex Johnson"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: 'var(--bg-3)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--r-md)',
                    color: 'var(--text)',
                    fontSize: '15px',
                    outline: 'none'
                  }}
                />
              </div>
            )}

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: 'var(--text-2)', marginBottom: '8px' }}>
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="alex@university.edu"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'var(--bg-3)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--r-md)',
                  color: 'var(--text)',
                  fontSize: '15px',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: 'var(--text-2)', marginBottom: '8px' }}>
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'var(--bg-3)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--r-md)',
                  color: 'var(--text)',
                  fontSize: '15px',
                  outline: 'none'
                }}
              />
            </div>

            {mode === 'signup' && (
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', color: 'var(--text-2)', marginBottom: '12px' }}>
                  I am a
                </label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {['student', 'teacher', 'researcher'].map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setForm({ ...form, role })}
                      style={{
                        flex: 1,
                        padding: '12px',
                        background: form.role === role ? 'var(--indigo-glow)' : 'var(--bg-3)',
                        border: form.role === role ? '1px solid var(--border-indigo)' : '1px solid var(--border)',
                        borderRadius: 'var(--r-md)',
                        color: form.role === role ? 'var(--indigo)' : 'var(--text-2)',
                        fontSize: '14px',
                        textTransform: 'capitalize',
                        cursor: 'pointer'
                      }}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '16px',
                background: 'var(--grad-primary)',
                color: 'white',
                fontSize: '16px',
                fontWeight: 700,
                borderRadius: 'var(--r-md)',
                border: 'none',
                cursor: 'pointer',
                marginBottom: '24px'
              }}
            >
              {mode === 'signin' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <div style={{ textAlign: 'center', color: 'var(--text-3)', fontSize: '14px', marginBottom: '24px' }}>
            or continue with
          </div>

          <button
            onClick={() => {
              login({ name: 'Alex Johnson', email: 'alex@university.edu', role: 'student' })
              navigate('/dashboard')
            }}
            style={{
              width: '100%',
              padding: '14px',
              background: 'var(--bg-3)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-md)',
              color: 'var(--text)',
              fontSize: '15px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            <span style={{ fontSize: '18px' }}>G</span>
            Google
          </button>
        </div>
      </div>
    </div>
  )
}
