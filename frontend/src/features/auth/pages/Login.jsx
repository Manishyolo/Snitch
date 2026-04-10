import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import './auth.css'

const Login = () => {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }

    setLoading(true)
    try {
      // TODO: wire up your auth service here
      // await loginService({ email, password })
      await new Promise(r => setTimeout(r, 900)) // placeholder
      navigate('/')
    } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-shell">
      {/* ── Left Brand Panel ── */}
      <aside className="auth-brand-panel" aria-hidden="true">
        <div className="brand-vertical">
          <span className="brand-vertical-text">Snitch</span>
          <span className="brand-vertical-dot" />
          <span className="brand-tagline">Wear the silence</span>
        </div>
      </aside>

      {/* ── Right Form Panel ── */}
      <main className="auth-form-panel">
        <div className="auth-form-inner">

          {/* Brand header */}
          <header className="auth-brand-header">
            <span className="auth-logo">Snitch</span>
            <div className="auth-divider" />
            <h1 className="auth-heading">Welcome back</h1>
            <p className="auth-subheading">Sign in to your account</p>
          </header>

          {/* Form */}
          <form
            id="login-form"
            className="auth-form"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* Email */}
            <div className="input-group">
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder=" "
                autoComplete="email"
                required
              />
              <label htmlFor="login-email">Email address</label>
            </div>

            {/* Password */}
            <div className="input-group">
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder=" "
                autoComplete="current-password"
                required
              />
              <label htmlFor="login-password">Password</label>
            </div>

            {/* Forgot */}
            <div className="forgot-row">
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            {/* Error */}
            {error && <p className="auth-error" role="alert">{error}</p>}

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              className="auth-btn"
              disabled={loading}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>

            {/* Footer */}
            <p className="auth-footer-link">
              Don't have an account?{' '}
              <Link to="/register">Create one</Link>
            </p>
          </form>

        </div>
      </main>
    </div>
  )
}

export default Login