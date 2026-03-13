
const cardStyle = {
  background: 'rgba(255,255,255,0.08)',
  borderRadius: 14,
  boxShadow: '0 2px 16px rgba(99,102,241,0.08)',
  padding: 24,
  marginBottom: 24,
  transition: 'transform 0.18s cubic-bezier(.4,1.2,.4,1), box-shadow 0.18s cubic-bezier(.4,1.2,.4,1)',
  cursor: 'pointer',
  border: '1px solid rgba(99,102,241,0.10)'
};

// Add a CSS block for hover effects
const aboutPageHoverStyles = `
.about-card {
  will-change: transform, box-shadow;
}
.about-card:hover {
  transform: translateY(-6px) scale(1.045);
  box-shadow: 0 8px 32px 0 #6366f133, 0 2px 16px rgba(99,102,241,0.13);
  border-color: #6366f1;
  z-index: 2;
}
.about-contact-btn {
  will-change: transform, box-shadow;
}
.about-contact-btn:hover {
  transform: scale(1.06) translateY(-2px);
  box-shadow: 0 8px 32px #6366f1aa;
  background: linear-gradient(90deg,#6366f1,#a78bfa);
}
`;

export default function AboutPage() {
  return (
    <>
      <style>{aboutPageHoverStyles}</style>
      <div style={{ maxWidth: 800, margin: "60px auto", padding: 40, background: "#000", borderRadius: 20, boxShadow: "0 4px 32px rgba(99,102,241,0.08)" }}>
        <h2 style={{ fontSize: 38, fontWeight: 900, marginBottom: 18, letterSpacing: '-0.02em', color: 'var(--indigo)' }}>About Apex</h2>
        <p style={{ fontSize: 20, color: "var(--text-2)", marginBottom: 32, lineHeight: 1.7 }}>
          <b>Apex</b> is a next-generation study platform designed to empower students to learn smarter, not harder. Our mission is to make high-quality, personalized education accessible to everyone, everywhere.
        </p>

        {/* Key Features */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, marginBottom: 40 }}>
          <div style={cardStyle} className="about-card" title="AI-Powered Explanations">
            <Zap color="#6366f1" size={32} style={{ marginBottom: 12 }} />
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>AI-Powered Explanations</div>
            <div style={{ fontSize: 15, color: 'var(--text-2)' }}>Get clear, step-by-step answers for any concept, question, or PDF page.</div>
          </div>
          <div style={cardStyle} className="about-card" title="Confusion Detection">
            <Eye color="#a78bfa" size={32} style={{ marginBottom: 12 }} />
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>Confusion Detection</div>
            <div style={{ fontSize: 15, color: 'var(--text-2)' }}>Visualize your learning gaps with our unique confusion heatmap and get targeted help.</div>
          </div>
          <div style={cardStyle} className="about-card" title="Personalized Dashboard">
            <BarChart2 color="#f0a854" size={32} style={{ marginBottom: 12 }} />
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>Personalized Dashboard</div>
            <div style={{ fontSize: 15, color: 'var(--text-2)' }}>Track your study streaks, progress, and mastered concepts in one place.</div>
          </div>
          <div style={cardStyle} className="about-card" title="Smart Library">
            <BookOpen color="#6366f1" size={32} style={{ marginBottom: 12 }} />
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>Smart Library</div>
            <div style={{ fontSize: 15, color: 'var(--text-2)' }}>Organize your PDFs, notes, and explanations for quick access and revision.</div>
          </div>
          <div style={cardStyle} className="about-card" title="Distraction-Free Reader">
            <Users color="#f0a854" size={32} style={{ marginBottom: 12 }} />
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>Distraction-Free Reader</div>
            <div style={{ fontSize: 15, color: 'var(--text-2)' }}>Focus on learning with a clean, customizable reading environment.</div>
          </div>
          <div style={cardStyle} className="about-card" title="Secure & Private">
            <Lock color="#6366f1" size={32} style={{ marginBottom: 12 }} />
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>Secure & Private</div>
            <div style={{ fontSize: 15, color: 'var(--text-2)' }}>Your data is encrypted and never sold. We respect your privacy.</div>
          </div>
        </div>

        {/* Values */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginBottom: 40 }}>
          <div style={{ ...cardStyle, background: 'rgba(99,102,241,0.10)' }} className="about-card">
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>Accessibility</div>
            <div style={{ fontSize: 15, color: 'var(--text-2)' }}>Apex is built to be usable by everyone, regardless of background or ability.</div>
          </div>
          <div style={{ ...cardStyle, background: 'rgba(167,139,250,0.10)' }} className="about-card">
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>Transparency</div>
            <div style={{ fontSize: 15, color: 'var(--text-2)' }}>We are open about how our AI works and how your data is used.</div>
          </div>
          <div style={{ ...cardStyle, background: 'rgba(240,168,84,0.10)' }} className="about-card">
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>Continuous Improvement</div>
            <div style={{ fontSize: 15, color: 'var(--text-2)' }}>We listen to student feedback and rapidly iterate to make Apex better every day.</div>
          </div>
          <div style={{ ...cardStyle, background: 'rgba(99,102,241,0.08)' }} className="about-card">
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>Community-Driven</div>
            <div style={{ fontSize: 15, color: 'var(--text-2)' }}>Built by students, for students. We believe in the power of peer learning and support.</div>
          </div>
        </div>

        {/* Who is Apex for? */}
        <div style={{ ...cardStyle, background: 'rgba(255,255,255,0.10)', marginBottom: 40 }} className="about-card">
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>Who is Apex for?</div>
          <div style={{ fontSize: 15, color: 'var(--text-2)' }}>
            • High school and college students<br/>
            • Self-learners and lifelong learners<br/>
            • Anyone who wants to master complex subjects efficiently
          </div>
        </div>

        {/* Contact & Feedback */}
        <div style={{ ...cardStyle, background: 'rgba(99,102,241,0.13)', display: 'flex', alignItems: 'center', gap: 18 }} className="about-card">
          <MessageCircle color="#6366f1" size={32} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>Contact & Feedback</div>
            <div style={{ fontSize: 15, color: 'var(--text-2)', marginBottom: 8 }}>
              Have questions, suggestions, or want to join our beta? We’re always excited to hear from our users!
            </div>
            <a
              href="mailto:support@apexapp.com"
              className="about-contact-btn"
              style={{
                display: 'inline-block',
                padding: '10px 28px',
                background: 'linear-gradient(90deg,#6366f1,#8b5cf6)',
                color: '#fff',
                fontWeight: 700,
                borderRadius: 8,
                fontSize: 16,
                textDecoration: 'none',
                boxShadow: '0 2px 16px rgba(99,102,241,0.10)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
import { Zap, BookOpen, BarChart2, Lock, Users, Eye, MessageCircle } from 'lucide-react';
