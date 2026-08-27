import { useState } from 'react'
import { Lock, Mail, ChevronDown, ShieldCheck, Building2, Eye, EyeOff, HeartPulse } from 'lucide-react'

const ROLES = [
  { value: 'admin', label: 'Admin' },
  { value: 'hospital', label: 'Hospital / Client' },
  { value: 'patient', label: 'User / Patient' },
]

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('admin')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError('Please enter both an email/username and a password.')
      return
    }
    setError('')
    onLogin({ email: email.trim(), role })
  }

  return (
    <div className="login-page">
      <div className="login-hero">
        <div className="login-hero-top">
          <h1>
            Heart Disease
            <span>Federated Learning</span>
          </h1>
          <p>Privacy-preserving AI for better healthcare, trained across hospitals without sharing raw patient data.</p>
        </div>

        <div className="login-hero-art">
          <div className="login-hero-glow" />
          <Building2 size={30} className="login-hero-building" style={{ top: '18%', left: '12%' }} />
          <Building2 size={22} className="login-hero-building" style={{ top: '62%', left: '20%' }} />
          <Building2 size={30} className="login-hero-building" style={{ top: '20%', right: '12%' }} />
          <Building2 size={22} className="login-hero-building" style={{ top: '64%', right: '18%' }} />
          <HeartPulse size={92} strokeWidth={1.3} style={{ color: '#8b7bff', position: 'relative', zIndex: 1 }} />
        </div>

        <div className="login-trust-card">
          <ShieldCheck size={20} />
          <div>
            <strong>Your data is safe.</strong>
            <span>We use Federated Learning to protect patient privacy.</span>
          </div>
        </div>
      </div>

      <div className="login-form-side">
        <div className="login-card">
          <div className="login-card-head">
            <h2>Welcome Back</h2>
            <p>Sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <label className="field">
              <span className="field-label">Username or Email</span>
              <div className="field-input">
                <Mail size={18} className="field-icon" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="username"
                />
              </div>
            </label>

            <label className="field">
              <span className="field-label">Password</span>
              <div className="field-input">
                <Lock size={18} className="field-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            <label className="field">
              <span className="field-label">Login as</span>
              <div className="field-input select-input">
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  {ROLES.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={18} className="field-icon select-caret" />
              </div>
            </label>

            {error && <div className="login-error">{error}</div>}

            <button type="submit" className="btn btn-primary btn-block">
              Sign In
            </button>
          </form>

          <div className="login-links">
            <span className="fake-link">Forgot password?</span>
          </div>

          <p className="login-footnote">© 2026 Heart Disease FL System · Demo build, any credentials work</p>
        </div>
      </div>
    </div>
  )
}
