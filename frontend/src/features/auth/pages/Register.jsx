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