import { useNavigate } from 'react-router-dom'
import { useStore } from '../../context/StoreContext'

export default function DashboardHome() {
  const navigate = useNavigate()
  const { state, updateCourseProgress } = useStore()
  
  const { stats, courses, recentActivity, heatmapData } = state
  const mockStats = stats || {
    explanationsToday: 24,
    studyStreak: 7,
    pdfsRead: 4,
    conceptsMastered: 23
  }

  const mockCourses = courses || [
    { title: 'Physics 101', subject: 'Physics', progress: 34, page: 42, total: 380, lastRead: '2h ago' },
    { title: 'Calculus II', subject: 'Math', progress: 67, page: 201, total: 300, lastRead: 'Yesterday' },
    { title: 'Organic Chemistry', subject: 'Chemistry', progress: 12, page: 28, total: 240, lastRead: '3d ago' }
  ]

  const mockRecent = recentActivity || [
    { text: '∂v/∂t = dv/dt', subject: 'Physics', page: 34, difficulty: 'Normal', time: '2m ago' },
    { text: 'Hamiltonian operator', subject: 'Physics', page: 28, difficulty: 'Deep', time: '15m ago' },
    { text: 'Covariant derivative', subject: 'Math', page: 156, difficulty: 'Simple', time: '1h ago' },
    { text: 'Partial differential', subject: 'Math', page: 142, difficulty: 'Normal', time: '2h ago' },
    { text: 'Wave function Ψ', subject: 'Physics', page: 45, difficulty: 'Deep', time: '3h ago' }
  ]

  return (
    <div style={{ padding: '32px 36px', fontFamily: 'var(--font-display)' }}>
      {/* Greeting */}
      <div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text)' }}>Good morning, Alex.</h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-2)', marginTop: '4px' }}>
          3 subjects · 12 PDFs · 47 explanations this week
        </p>
      </div>

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '28px' }}>
        {[
          { label: 'Explanations today', value: mockStats.explanationsToday, color: 'var(--amber)', trend: '+3' },
          { label: 'Study streak', value: mockStats.studyStreak + ' days', color: 'var(--indigo)', trend: '🔥' },
          { label: 'PDFs read', value: mockStats.pdfsRead, color: 'var(--text)', trend: '+1' },
          { label: 'Concepts mastered', value: mockStats.conceptsMastered, color: 'var(--success)', trend: '+5' }
        ].map((stat, i) => (
          <div key={i} className="glass" style={{ padding: '20px 24px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{stat.label}</div>
            <div style={{ fontSize: '32px', fontWeight: 800, color: stat.color, marginTop: '8px' }}>{stat.value}</div>
            <div style={{ fontSize: '11px', color: stat.trend.includes('+') ? 'var(--success)' : 'var(--text-2)', marginTop: '4px' }}>{stat.trend}</div>
          </div>
        ))}
      </div>

      {/* Continue Section */}
      <div style={{ marginTop: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Continue where you left off</h2>
          <button style={{ fontSize: '13px', color: 'var(--indigo)', background: 'none', border: 'none', cursor: 'pointer' }}>View all →</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {mockCourses.map((course, i) => (
            <div 
              key={i} 
              className="glass" 
              style={{ 
                padding: '24px', 
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => navigate('/reader')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.borderColor = 'var(--border-indigo)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = 'var(--border)'
              }}
            >
              <span style={{ 
                display: 'inline-block',
                padding: '4px 10px',
                background: i === 0 ? 'var(--indigo-glow)' : 'var(--amber-glow)',
                color: i === 0 ? 'var(--indigo)' : 'var(--amber)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                borderRadius: 'var(--r-sm)'
              }}>
                {course.subject}
              </span>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginTop: '10px' }}>{course.title}</h3>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', marginTop: '12px' }}>
                <div style={{ width: course.progress + '%', height: '100%', background: 'var(--grad-primary)', borderRadius: '99px' }} />
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-2)', marginTop: '8px' }}>
                Page {course.page} of {course.total} · Last read {course.lastRead}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity + Heatmap */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '36px' }}>
        {/* Recent Explanations */}
        <div className="glass" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Recent explanations</h3>
          <div>
            {mockRecent.map((item, i) => (
              <div 
                key={i} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  padding: '10px 0',
                  borderBottom: i < mockRecent.length - 1 ? '1px solid var(--border)' : 'none'
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--amber)' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.text}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-2)', marginTop: '2px' }}>
                    {item.subject} · p.{item.page} · {item.difficulty}
                  </div>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-3)' }}>{item.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Confusion Heatmap */}
        <div className="glass" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Confusion heatmap</h3>
            <span style={{ fontSize: '11px', color: 'var(--text-2)' }}>(this week)</span>
          </div>
          <div>
            {['Physics', 'Math', 'Chemistry'].map((subject, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-2)', width: '80px' }}>{subject}</span>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[...Array(7)].map((_, j) => {
                    const intensity = Math.random()
                    let bg = 'rgba(255,255,255,0.04)'
                    if (intensity > 0.7) bg = 'rgba(240,168,84,0.9)'
                    else if (intensity > 0.5) bg = 'rgba(240,168,84,0.5)'
                    else if (intensity > 0.3) bg = 'rgba(240,168,84,0.2)'
                    return <div key={j} style={{ width: '28px', height: '28px', borderRadius: '4px', background: bg }} />
                  })}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', fontSize: '11px', color: 'var(--text-3)' }}>
            <span>fewer</span>
            <div style={{ display: 'flex', gap: '2px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: 'rgba(255,255,255,0.04)' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: 'rgba(240,168,84,0.2)' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: 'rgba(240,168,84,0.5)' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: 'rgba(240,168,84,0.9)' }} />
            </div>
            <span>more</span>
          </div>
        </div>
      </div>
    </div>
  )
}
