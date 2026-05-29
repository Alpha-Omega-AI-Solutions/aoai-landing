// ============================================================
// FILE: src/pages/LandingPage.jsx
// REPO: aoai-landing (PUBLIC — standalone marketing repo)
// PURPOSE: AOAI Solutions authority landing page
// DOMAIN: aoaisolutions.dev
// ============================================================

import { useState, useEffect } from 'react'

// ─── Formspree endpoint — replace YOUR_FORMSPREE_ID before go-live ───────────
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORMSPREE_ID'
// ─────────────────────────────────────────────────────────────────────────────

const SERVICES = [
  { icon: '🤖', title: 'AI Automation', desc: 'Intelligent workflow automation that eliminates repetitive tasks, reduces overhead, and drives measurable operational efficiency.' },
  { icon: '⚡', title: 'Full Stack Development', desc: 'End-to-end web and mobile applications built for performance, business ownership, and long-term scale.' },
  { icon: '☁️', title: 'Cloud Systems', desc: 'Enterprise cloud infrastructure design, deployment, and optimization — AWS, GCP, Azure.' },
  { icon: '🔗', title: 'AI Integrations', desc: 'Seamlessly integrate Claude, GPT-4, Gemini, and custom AI models into your existing business systems.' },
  { icon: '📊', title: 'Lead Capture & CRM', desc: 'High-converting lead capture systems with full CRM integration, automated follow-up, and pipeline management.' },
  { icon: '📣', title: 'Meta Pixel & Facebook Ads', desc: 'Precision ad targeting, conversion tracking, retargeting campaigns, and ROAS-optimized ad systems.' },
  { icon: '📈', title: 'Analytics & Conversion', desc: 'Data-driven insights that identify growth opportunities and systematically optimize customer conversion paths.' },
  { icon: '🎯', title: 'Branding Systems', desc: 'Cohesive brand identity and digital presence systems that communicate authority and establish lasting market trust.' },
]

const TRUST_POINTS = [
  { icon: '⚡', label: '48hr Average Launch' },
  { icon: '🤖', label: '24/7 AI Response Rate' },
  { icon: '📍', label: 'DC Metro Area' },
  { icon: '🔒', label: 'Enterprise Security' },
]

// ─── Responsive CSS ──────────────────────────────────────────────────────────
const LANDING_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');

  .ao-page * { box-sizing: border-box; margin: 0; padding: 0; }

  .ao-hero-section {
    position: relative;
    min-height: 94vh;
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  .ao-hero-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    z-index: 0;
  }
  .ao-hero-overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    background: linear-gradient(
      108deg,
      rgba(201,217,255,0.97) 0%,
      rgba(185,207,255,0.94) 28%,
      rgba(152,183,255,0.80) 52%,
      rgba(122,156,255,0.28) 72%,
      rgba(122,156,255,0.00) 100%
    );
  }
  .ao-hero-content {
    position: relative;
    z-index: 10;
    max-width: 1260px;
    width: 100%;
    margin: 0 auto;
    padding: 110px 64px 88px;
  }
  .ao-hero-inner { max-width: 600px; }

  .ao-logo-nav {
    height: 48px;
    width: auto;
    object-fit: contain;
    display: block;
  }
  .ao-logo-hero {
    height: 120px;
    width: auto;
    max-width: 320px;
    object-fit: contain;
    display: block;
    filter: drop-shadow(0 8px 32px rgba(212,175,55,0.45));
    margin-bottom: 24px;
  }
  .ao-logo-footer {
    height: 72px;
    width: auto;
    max-width: 260px;
    object-fit: contain;
    display: block;
    filter: drop-shadow(0 4px 16px rgba(212,175,55,0.3));
    margin: 0 auto 20px;
  }

  .ao-cta-row {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
  }
  .ao-badge-row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .ao-services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(248px, 1fr));
    gap: 22px;
  }
  .ao-service-card {
    background: #fff;
    border: 1px solid rgba(122,156,255,0.18);
    border-radius: 18px;
    padding: 34px 26px;
    transition: all 0.25s ease;
    cursor: default;
  }
  .ao-service-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 48px rgba(122,156,255,0.18);
    border-color: rgba(212,175,55,0.3);
  }
  .ao-form-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .ao-contact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 48px;
    align-items: start;
  }
  .ao-nav-label { display: inline-block; }

  #contact { scroll-margin-top: 70px; }

  .ao-contact-layout {
    display: grid;
    grid-template-columns: 1.35fr 1fr;
    gap: 32px;
    align-items: start;
  }

  @media (max-width: 900px) {
    .ao-contact-layout { grid-template-columns: 1fr; }
  }

  @media (max-width: 900px) {
    .ao-hero-overlay {
      background: linear-gradient(
        180deg,
        rgba(201,217,255,0.97) 0%,
        rgba(185,207,255,0.96) 45%,
        rgba(130,172,255,0.93) 100%
      ) !important;
    }
    .ao-hero-content {
      padding: 96px 22px 64px;
      text-align: center;
    }
    .ao-hero-inner { max-width: 100%; }
    .ao-logo-hero { margin: 0 auto 24px; }
    .ao-cta-row { justify-content: center; }
    .ao-badge-row { justify-content: center; }
    .ao-nav-label { display: none; }
  }
  @media (max-width: 640px) {
    .ao-form-grid-2 { grid-template-columns: 1fr; }
    .ao-logo-nav { height: 40px; }
    .ao-logo-hero { height: 88px; }
    .ao-contact-grid { gap: 36px; }
  }
`

export default function LandingPage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', website: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setFormError('')
    setSubmitting(true)
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name, company: form.company, email: form.email,
          phone: form.phone, website: form.website, service: form.service, message: form.message,
          _subject: `[AOAI] New Consultation Request — ${form.name}`,
        }),
      })
      if (res.ok) { setSubmitted(true) }
      else { setFormError('Something went wrong. Please email us directly at michael.smith@aoaisolutions.dev') }
    } catch { setFormError('Network error. Please email michael.smith@aoaisolutions.dev') }
    setSubmitting(false)
  }

  const inputStyle = {
    width: '100%', padding: '12px 14px', borderRadius: '10px',
    border: '1.5px solid #E2E8F0', fontSize: '14px', color: '#0F1115',
    outline: 'none', fontFamily: 'inherit',
    transition: 'border-color 0.2s, box-shadow 0.2s', boxSizing: 'border-box',
  }
  const onFocus = e => { e.target.style.borderColor = '#D4AF37'; e.target.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.1)' }
  const onBlur  = e => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none' }

  return (
    <div className="ao-page" style={{ fontFamily: "'DM Sans', 'Inter', sans-serif", background: '#fff', color: '#0F1115', overflowX: 'hidden' }}>
      <style>{LANDING_STYLES}</style>

      {/* ── Announcement Banner ─────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(90deg, #B8941F 0%, #D4AF37 40%, #E8C84A 60%, #D4AF37 80%, #B8941F 100%)',
        padding: '9px 24px', textAlign: 'center', fontSize: '12px',
        fontWeight: 700, letterSpacing: '0.1em', color: '#0F1115', textTransform: 'uppercase',
      }}>
        ✦ &nbsp; Grand Launch August 2026 — Pre-Launch Consultations Now Booking &nbsp; ✦
      </div>

      {/* ── Sticky Nav ──────────────────────────────────────────────────────── */}
      <nav style={{
        padding: '14px 36px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(212,175,55,0.2)' : '1px solid transparent',
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.06)' : 'none',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/aoai-bubble-logo.jpeg" alt="AOAI Solutions" className="ao-logo-nav" style={{ borderRadius: '50%', objectFit: 'cover' }} />
          <span className="ao-nav-label" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: '#B8941F', textTransform: 'uppercase' }}>
            AI SOLUTIONS
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <a href="/catalog.html" style={{
            fontSize: '13px', fontWeight: 600, color: '#4A5568',
            textDecoration: 'none', padding: '8px 16px', borderRadius: '8px',
            border: '1px solid rgba(212,175,55,0.35)', letterSpacing: '0.01em',
            transition: 'all 0.2s', whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => { e.target.style.background = 'rgba(212,175,55,0.06)'; e.target.style.color = '#B8941F'; }}
          onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#4A5568'; }}
          >
            Pricing Catalog
          </a>
          <a href="#contact" style={{
            background: 'linear-gradient(135deg, #D4AF37, #E8C84A)', color: '#0F1115',
            padding: '10px 22px', borderRadius: '50px', fontWeight: 700, fontSize: '13px',
            textDecoration: 'none', letterSpacing: '0.04em',
            boxShadow: '0 4px 16px rgba(212,175,55,0.3)', whiteSpace: 'nowrap',
          }}>
            Book Consultation →
          </a>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section className="ao-hero-section">
        <img src="/hero-launch.jpg" alt="" className="ao-hero-img" aria-hidden="true" />
        <div className="ao-hero-overlay" />

        {/* Radial glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '15%',
          transform: 'translate(-50%, -50%)',
          width: '700px', height: '600px',
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.28) 0%, transparent 65%)',
          pointerEvents: 'none', zIndex: 2,
        }} />

        {/* Launch badge */}
        <div style={{
          position: 'absolute', top: '24px', right: '28px',
          background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(212,175,55,0.55)',
          backdropFilter: 'blur(10px)', borderRadius: '50px',
          padding: '7px 18px', fontSize: '11px', fontWeight: 700,
          letterSpacing: '0.12em', color: '#8A6B1A', textTransform: 'uppercase', zIndex: 20,
        }}>
          🚀 Grand Launch August 2026
        </div>

        <div className="ao-hero-content">
          <div className="ao-hero-inner">

            {/* Official AOAI brand logo */}
            <img
              src="/ao-logo.jpg"
              alt="AOAI Solutions"
              className="ao-logo-hero"
              style={{ opacity: 0.36 }}
            />

            <p style={{
              fontSize: '12px', fontWeight: 700, letterSpacing: '0.32em',
              color: '#7A5C12', textTransform: 'uppercase', marginBottom: '16px',
            }}>
              AI SOLUTIONS
            </p>

            <h1 style={{
              fontSize: 'clamp(36px, 5.5vw, 70px)',
              fontWeight: 800, lineHeight: 1.08, color: '#0F1115',
              marginBottom: '20px', letterSpacing: '-0.02em',
            }}>
              Alpha Omega<br />Artificial Intelligence
            </h1>

            <p style={{
              fontSize: 'clamp(15px, 1.9vw, 20px)', color: '#1A2332',
              marginBottom: '8px', fontWeight: 400, lineHeight: 1.55,
            }}>
              End-to-end AI systems, automation, lead capture,
            </p>
            <p style={{
              fontSize: 'clamp(14px, 1.7vw, 18px)', color: '#2D3748',
              marginBottom: '40px', fontWeight: 300,
            }}>
              and digital infrastructure for modern businesses.
            </p>

            <div className="ao-cta-row" style={{ marginBottom: '32px' }}>
              <a href="#contact" style={{
                background: 'linear-gradient(135deg, #D4AF37, #E8C84A)', color: '#0F1115',
                padding: '15px 32px', borderRadius: '50px', fontWeight: 700, fontSize: '15px',
                textDecoration: 'none', boxShadow: '0 8px 24px rgba(212,175,55,0.45)',
                letterSpacing: '0.04em',
              }}>Book Consultation →</a>
              <a href="#contact" style={{
                border: '2px solid rgba(15,17,21,0.35)', color: '#0F1115',
                padding: '15px 32px', borderRadius: '50px', fontWeight: 600, fontSize: '15px',
                textDecoration: 'none', background: 'rgba(255,255,255,0.58)',
                backdropFilter: 'blur(4px)',
              }}>Request Proposal</a>
              <a href="tel:2024253161" style={{
                border: '2px solid rgba(212,175,55,0.55)', color: '#7A5C12',
                padding: '15px 32px', borderRadius: '50px', fontWeight: 600, fontSize: '15px',
                textDecoration: 'none', background: 'rgba(255,255,255,0.45)',
                backdropFilter: 'blur(4px)',
              }}>📞 Contact Directly</a>
            </div>

            <div className="ao-badge-row">
              {TRUST_POINTS.map(t => (
                <div key={t.label} style={{
                  background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(212,175,55,0.32)',
                  backdropFilter: 'blur(8px)', borderRadius: '50px',
                  padding: '8px 16px', fontSize: '12px', fontWeight: 500, color: '#0F1115',
                }}>
                  {t.icon} &nbsp; {t.label}
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── About ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: '96px 24px', background: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.22em', color: '#D4AF37', textTransform: 'uppercase', marginBottom: '16px' }}>
            About AOAI Solutions
          </p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 50px)', fontWeight: 800, lineHeight: 1.12, color: '#0F1115', marginBottom: '24px', letterSpacing: '-0.02em' }}>
            The AI Agency Built for<br />Business Ownership
          </h2>
          <div style={{ width: '52px', height: '3px', background: 'linear-gradient(90deg, #D4AF37, #E8C84A)', borderRadius: '4px', margin: '0 auto 36px' }} />
          <p style={{ fontSize: '17px', color: '#4A5568', lineHeight: 1.8, fontWeight: 300, marginBottom: '20px' }}>
            AOAI Solutions is a premium AI systems engineering agency based in the DC Metro Area. We design and build intelligent automation, full-stack applications, and conversion-optimized digital infrastructure for businesses that demand results.
          </p>
          <p style={{ fontSize: '17px', color: '#4A5568', lineHeight: 1.8, fontWeight: 300 }}>
            From AI-powered lead capture to enterprise cloud platforms, every system is designed for performance, ownership, and long-term scale — so your business runs smarter from day one.
          </p>
        </div>
      </section>

      {/* ── Services Grid ───────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px 100px', background: 'linear-gradient(180deg, #F0F5FF 0%, #E8EFFF 100%)' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.22em', color: '#D4AF37', textTransform: 'uppercase', marginBottom: '14px' }}>What We Build</p>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 46px)', fontWeight: 800, color: '#0F1115', marginBottom: '14px', letterSpacing: '-0.02em' }}>Full-Spectrum AI Services</h2>
            <p style={{ fontSize: '16px', color: '#4A5568', fontWeight: 300, whiteSpace: 'nowrap', margin: '0 auto' }}>
              Everything your business needs to compete, automate, and grow in the AI era.
            </p>
            <div style={{ width: '52px', height: '3px', background: 'linear-gradient(90deg, #D4AF37, #E8C84A)', borderRadius: '4px', margin: '20px auto 0' }} />
          </div>
          <div className="ao-services-grid">
            {SERVICES.map(s => (
              <div key={s.title} className="ao-service-card">
                <div style={{ fontSize: '34px', marginBottom: '14px' }}>{s.icon}</div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F1115', marginBottom: '10px' }}>{s.title}</h3>
                <p style={{ fontSize: '13px', color: '#718096', lineHeight: 1.75, fontWeight: 300 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Section ──────────────────────────────────────────────────── */}
      <section id="contact" style={{ padding: '100px 24px 112px', background: 'linear-gradient(180deg, #F0F5FF 0%, #E8EFFF 100%)' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.22em', color: '#D4AF37', textTransform: 'uppercase', marginBottom: '14px' }}>
              Start Your Growth Journey
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#0F1115', marginBottom: '14px', letterSpacing: '-0.02em' }}>
              Let's Build Smarter Systems Together
            </h2>
            <div style={{ width: '52px', height: '3px', background: 'linear-gradient(90deg, #D4AF37, #E8C84A)', borderRadius: '4px', margin: '0 auto 22px' }} />
            <p style={{ fontSize: '16px', color: '#4A5568', fontWeight: 300, lineHeight: 1.7, maxWidth: '560px', margin: '0 auto' }}>
              Tell us where your business is today, what you want to improve, and where you want to grow. AOAI Solutions will help identify the best path forward.
            </p>
          </div>

          {/* Two-column layout */}
          <div className="ao-contact-layout">

            {/* Form Card */}
            <div style={{
              background: '#fff', borderRadius: '24px', padding: '44px 40px',
              border: '1px solid rgba(122,156,255,0.14)',
              borderTop: '3px solid #D4AF37',
              boxShadow: '0 12px 52px rgba(122,156,255,0.13)',
            }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '56px 24px' }}>
                  <div style={{ fontSize: '52px', marginBottom: '20px' }}>✅</div>
                  <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0F1115', marginBottom: '10px' }}>Message Received!</h3>
                  <p style={{ color: '#4A5568', fontWeight: 300, fontSize: '16px', lineHeight: 1.65 }}>
                    We'll be in touch within 24 hours to schedule your complimentary discovery call.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="ao-form-grid-2">
                    {[
                      { key: 'name', label: 'Full Name *', placeholder: 'Jane Smith', type: 'text', required: true },
                      { key: 'company', label: 'Business Name *', placeholder: 'Acme Corp', type: 'text', required: true },
                    ].map(f => (
                      <div key={f.key}>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#0F1115', marginBottom: '7px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{f.label}</label>
                        <input type={f.type} required={f.required} placeholder={f.placeholder} value={form[f.key]}
                          onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                          style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                      </div>
                    ))}
                  </div>
                  <div className="ao-form-grid-2">
                    {[
                      { key: 'email', label: 'Email *', placeholder: 'jane@company.com', type: 'email', required: true },
                      { key: 'phone', label: 'Phone (Optional)', placeholder: '202-000-0000', type: 'tel', required: false },
                    ].map(f => (
                      <div key={f.key}>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#0F1115', marginBottom: '7px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{f.label}</label>
                        <input type={f.type} required={f.required} placeholder={f.placeholder} value={form[f.key]}
                          onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                          style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#0F1115', marginBottom: '7px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Website URL (Optional)</label>
                    <input type="url" placeholder="https://yourbusiness.com" value={form.website}
                      onChange={e => setForm(p => ({ ...p, website: e.target.value }))}
                      style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#0F1115', marginBottom: '7px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Service Interest</label>
                    <select value={form.service} onChange={e => setForm(p => ({ ...p, service: e.target.value }))}
                      style={{ ...inputStyle }} onFocus={onFocus} onBlur={onBlur}>
                      <option value="">Select a service...</option>
                      <option value="digital-presence-assessment">Digital Presence Assessment</option>
                      <option value="lead-capture-optimization">Lead Capture Optimization</option>
                      <option value="local-seo">Local SEO</option>
                      <option value="website-enhancement">Website Enhancement</option>
                      <option value="automation">Automation</option>
                      <option value="ai-concierge">AI Concierge</option>
                      <option value="full-website-rebuild">Full Website Rebuild</option>
                      <option value="digital-ecosystem-package">Digital Ecosystem Package</option>
                      <option value="growth-partner-retainer">Growth Partner Retainer</option>
                      <option value="not-sure">Not Sure Yet</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#0F1115', marginBottom: '7px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Message / Project Goals</label>
                    <textarea rows={4} placeholder="Describe your business, current challenges, and what you'd like to achieve..."
                      value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                      onFocus={onFocus} onBlur={onBlur} />
                  </div>
                  {formError && <p style={{ color: '#e53e3e', fontSize: '13px', textAlign: 'center' }}>{formError}</p>}
                  <button type="submit" disabled={submitting} style={{
                    background: submitting ? 'rgba(212,175,55,0.6)' : 'linear-gradient(135deg, #D4AF37, #E8C84A)',
                    color: '#0F1115', padding: '16px 36px', borderRadius: '50px', fontWeight: 700,
                    fontSize: '15px', border: 'none', cursor: submitting ? 'not-allowed' : 'pointer',
                    letterSpacing: '0.04em', boxShadow: '0 6px 24px rgba(212,175,55,0.35)',
                    transition: 'all 0.2s', fontFamily: 'inherit', width: '100%',
                  }}>
                    {submitting ? 'Sending...' : 'Request Consultation →'}
                  </button>
                </form>
              )}
            </div>

            {/* Right column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>

              {/* Prefer to Talk First card */}
              <div style={{
                background: '#fff', borderRadius: '24px', padding: '36px 32px',
                border: '1px solid rgba(212,175,55,0.25)',
                boxShadow: '0 8px 36px rgba(122,156,255,0.1)',
                display: 'flex', flexDirection: 'column', gap: '20px',
              }}>
                <div>
                  <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.22em', color: '#D4AF37', textTransform: 'uppercase', marginBottom: '10px' }}>Discovery First</p>
                  <h3 style={{ fontSize: '21px', fontWeight: 800, color: '#0F1115', marginBottom: '10px', letterSpacing: '-0.01em' }}>Prefer to Talk First?</h3>
                  <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #D4AF37, #E8C84A)', borderRadius: '4px', marginBottom: '16px' }} />
                  <p style={{ fontSize: '14px', color: '#4A5568', lineHeight: 1.75, fontWeight: 300 }}>
                    Start with a complimentary discovery call so we can understand your business, your current systems, and your growth goals.
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
                  {[
                    { href: 'tel:2024253161', icon: '📞', label: '202.425.3161' },
                    { href: 'mailto:michael.smith@aoaisolutions.dev', icon: '✉️', label: 'michael.smith@aoaisolutions.dev' },
                    { href: 'https://www.aoaisolutions.dev', icon: '🌐', label: 'aoaisolutions.dev' },
                  ].map(c => (
                    <a key={c.href} href={c.href} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#0F1115', textDecoration: 'none', fontSize: '14px', fontWeight: 500, wordBreak: 'break-all' }}>
                      <span style={{ background: 'linear-gradient(135deg, #D4AF37, #E8C84A)', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0, boxShadow: '0 4px 12px rgba(212,175,55,0.28)' }}>{c.icon}</span>
                      {c.label}
                    </a>
                  ))}
                </div>
                <a href="tel:2024253161" style={{ display: 'block', background: 'linear-gradient(135deg, #D4AF37, #E8C84A)', color: '#0F1115', padding: '13px 24px', borderRadius: '50px', fontWeight: 700, fontSize: '14px', textDecoration: 'none', textAlign: 'center', boxShadow: '0 6px 20px rgba(212,175,55,0.35)', letterSpacing: '0.04em' }}>
                  Schedule a Discovery Call →
                </a>
              </div>

              {/* Trust strip */}
              <div style={{ background: 'rgba(255,255,255,0.8)', borderRadius: '18px', padding: '20px 24px', border: '1px solid rgba(122,156,255,0.13)', backdropFilter: 'blur(8px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  {[{ icon: '⚡', label: '24hr Response' }, { icon: '📍', label: 'DC Metro Area' }, { icon: '🔒', label: 'Confidential' }, { icon: '🤝', label: 'No Obligation' }].map(b => (
                    <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 500, color: '#4A5568', background: 'rgba(122,156,255,0.07)', borderRadius: '50px', padding: '5px 12px', border: '1px solid rgba(122,156,255,0.13)' }}>
                      {b.icon} {b.label}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA Strip ───────────────────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(145deg, #C9D9FF 0%, #8AACFF 50%, #7A9CFF 100%)', padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.4) 0%, transparent 65%)' }} />
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #D4AF37, #E8C84A)', borderRadius: '4px' }} />
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.22em', color: '#7A5C12', textTransform: 'uppercase' }}>Growth · Automation · Digital Transformation</p>
            <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #D4AF37, #E8C84A)', borderRadius: '4px' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 800, color: '#0F1115', letterSpacing: '-0.02em', lineHeight: 1.12 }}>
            Ready to Build{' '}
            <em style={{ fontStyle: 'normal', background: 'linear-gradient(135deg, #B8941F, #E8C84A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Smarter</em>
            {' '}Growth Systems?
          </h2>
          <p style={{ fontSize: '16px', color: '#1A2332', fontWeight: 300, lineHeight: 1.75, maxWidth: '520px' }}>
            AOAI Solutions helps businesses move beyond disconnected tools and into scalable systems that create measurable, compounding growth.
          </p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="#contact" style={{ background: 'linear-gradient(135deg, #D4AF37, #E8C84A)', color: '#0F1115', padding: '15px 32px', borderRadius: '50px', fontWeight: 700, fontSize: '15px', textDecoration: 'none', boxShadow: '0 8px 28px rgba(212,175,55,0.4)', letterSpacing: '0.04em' }}>
              Schedule A Discovery Call →
            </a>
            <a href="tel:2024253161" style={{ background: 'rgba(255,255,255,0.75)', border: '1px solid rgba(212,175,55,0.4)', color: '#0F1115', padding: '15px 28px', borderRadius: '50px', fontWeight: 600, fontSize: '15px', textDecoration: 'none' }}>
              📞 202.425.3161
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer style={{ background: '#0F1115', color: '#fff', padding: '64px 24px 36px', textAlign: 'center' }}>
        <img src="/ao-logo.jpg" alt="AOAI Solutions" className="ao-logo-footer" />
        <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.22em', color: 'rgba(212,175,55,0.8)', textTransform: 'uppercase', marginBottom: '10px' }}>
          AI SOLUTIONS
        </p>
        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', marginBottom: '36px', fontWeight: 300, maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.65 }}>
          End-to-end AI systems, automation, and digital infrastructure for modern businesses.
        </p>
        <div style={{ width: '60px', height: '2px', background: 'linear-gradient(90deg, #D4AF37, #E8C84A)', borderRadius: '4px', margin: '0 auto 36px' }} />
        <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '36px' }}>
          {[
            { label: 'Book Consultation', href: '#contact' },
            { label: 'Request Proposal', href: '#contact' },
            { label: '202.425.3161', href: 'tel:2024253161' },
            { label: 'Email Us', href: 'mailto:michael.smith@aoaisolutions.dev' },
          ].map(l => (
            <a key={l.label} href={l.href} style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '14px' }}
              onMouseEnter={e => e.target.style.color = '#D4AF37'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
            >{l.label}</a>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px' }}>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>© 2026 AOAI Solutions. All rights reserved. | aoaisolutions.dev</p>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.15)', marginTop: '6px' }}>🚀 Grand Launch August 2026</p>
        </div>
      </footer>

    </div>
  )
}
