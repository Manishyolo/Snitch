import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useSelector } from 'react-redux'
import './auth.css'

const Register = () => {
   
    const {handleRegister} = useAuth();
       const user = useSelector((state)=>state.user)
    console.log(user)

   
     const navigate = useNavigate()
 
  const [form, setForm]       = useState({ fullname: '', email: '', contact: '', password: '', role: 'buyer' })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
 

  const update = (field) => (e) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
  
    const { fullname, email, contact, password, role } = form

    if (!fullname || !email || !contact || !password  || !role) {
      setError('Please fill in all fields.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
   
    setLoading(true)
    try {
      await handleRegister(form)
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
          <span className="brand-tagline">Define yourself</span>
        </div>
      </aside>

      {/* ── Right Form Panel ── */}
      <main className="auth-form-panel">
        <div className="auth-form-inner">

          {/* Brand header */}
          <header className="auth-brand-header">
            <span className="auth-logo">Snitch</span>
            <div className="auth-divider" />
            <h1 className="auth-heading">Create account</h1>
            <p className="auth-subheading">Join the Snitch community</p>
          </header>

          {/* Form */}
          <form
            id="register-form"
            className="auth-form"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* Full Name */}
            <div className="input-group">
              <input
                id="register-name"
                type="text"
                value={form.fullname}
                onChange={update('fullname')}
                placeholder=" "
                autoComplete="name"
                required
              />
              <label htmlFor="register-name">Full name</label>
            </div>

            {/* Email */}
            <div className="input-group">
              <input
                id="register-email"
                type="email"
                value={form.email}
                onChange={update('email')}
                placeholder=" "
                autoComplete="email"
                required
              />
              <label htmlFor="register-email">Email address</label>
            </div>

            {/* Contact Number */}
            <div className="input-group">
              <input
                id="register-contact"
                type="tel"
                value={form.contact}
                onChange={update('contact')}
                placeholder=" "
                autoComplete="tel"
                required
              />
              <label htmlFor="register-contact">Contact number</label>
            </div>

            {/* Password */}
            <div className="input-group">
              <input
                id="register-password"
                type="password"
                value={form.password}
                onChange={update('password')}
                placeholder=" "
                autoComplete="new-password"
                required
              />
              <label htmlFor="register-password">Create password</label>
            </div>

           

            {/* Role — Buyer / Seller */}
            <div className="role-toggle-group">
              <p className="role-toggle-label">I am a</p>
              <div className="role-toggle">
                <button
                  type="button"
                  id="role-buyer"
                  className={`role-option${form.role === 'buyer' ? ' role-option--active' : ''}`}
                  onClick={() => setForm(prev => ({ ...prev, role: 'buyer' }))}
                >
                  Buyer
                </button>
                <button
                  type="button"
                  id="role-seller"
                  className={`role-option${form.role === 'seller' ? ' role-option--active' : ''}`}
                  onClick={() => setForm(prev => ({ ...prev, role: 'seller' }))}
                >
                  Seller
                </button>
              </div>
            </div>

            {/* Error */}
            {error && <p className="auth-error" role="alert">{error}</p>}

            {/* Submit */}
            <button
              id="register-submit"
              type="submit"
              className="auth-btn"
              disabled={loading}
            >
              {loading ? 'Creating account…' : 'Create account'}
            </button>

            <div className="auth-social">
              <div className="auth-divider-text">OR</div>
              <a href="/api/user/google" className="google-btn">
                <svg className="google-icon" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </a>
            </div>

            {/* Legal */}
            <p className="auth-legal">
              By creating an account, you agree to our{' '}
              <Link to="/terms">Terms of Service</Link> and{' '}
              <Link to="/privacy">Privacy Policy</Link>
            </p>

            {/* Footer */}
            <p className="auth-footer-link">
              Already have an account?{' '}
              <Link to="/login">Sign in</Link>
            </p>
          </form>

        </div>
      </main>
    </div>
  )
}

export default Register