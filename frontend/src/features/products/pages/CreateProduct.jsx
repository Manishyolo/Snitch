import React, { useState, useRef, useCallback } from 'react'
import { Link, useNavigate } from 'react-router'
import {useProduct} from "../hook/useProduct";
import './createProduct.css'

const CURRENCIES = ['USD', 'EUR', 'GBP', 'INR', 'AED']
const MAX_IMAGES = 5

const CreateProduct = () => {

   const {handleCreateProduct} = useProduct();
  const navigate   = useNavigate()
  const fileInputRef = useRef(null)

  const [form, setForm] = useState({
    title:       '',
    description: '',
    price:       '',
    currency:    'USD',
  })
  const [images,   setImages]   = useState([])   // { file, preview }[]
  const [dragOver, setDragOver] = useState(false)
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  /* ── Field update ─────────────── */
  const update = (field) => (e) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  /* ── Image helpers ────────────── */
  const addFiles = useCallback((files) => {
    setError('')
    const incoming = Array.from(files).filter(f => f.type.startsWith('image/'))
    if (!incoming.length) return

    setImages(prev => {
      const remaining = MAX_IMAGES - prev.length
      if (remaining <= 0) {
        setError(`Maximum ${MAX_IMAGES} images allowed.`)
        return prev
      }
      const toAdd = incoming.slice(0, remaining).map(file => ({
        file,
        preview: URL.createObjectURL(file),
        id:      Math.random().toString(36).slice(2),
      }))
      if (incoming.length > remaining) {
        setError(`Only ${remaining} image${remaining > 1 ? 's' : ''} added — limit is ${MAX_IMAGES}.`)
      }
      return [...prev, ...toAdd]
    })
  }, [])

  const removeImage = (id) => {
    setImages(prev => {
      const removed = prev.find(i => i.id === id)
      if (removed) URL.revokeObjectURL(removed.preview)
      return prev.filter(i => i.id !== id)
    })
    setError('')
  }

  /* ── Drag & Drop ──────────────── */
  const onDragOver  = (e) => { e.preventDefault(); setDragOver(true)  }
  const onDragLeave = ()  => setDragOver(false)
  const onDrop      = (e) => {
    e.preventDefault()
    setDragOver(false)
    addFiles(e.dataTransfer.files)
  }

  /* ── Submit ───────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const { title, description, price, currency } = form

    if (!title.trim())       { setError('Product title is required.');    return }
    if (!description.trim()) { setError('Description is required.');      return }
    if (!price || isNaN(price) || Number(price) <= 0) {
      setError('Enter a valid price.')
      return
    }
    if (!currency)           { setError('Select a currency.');            return }

    setLoading(true)
    try {
      const data = new FormData()
      data.append('title',       title.trim())
      data.append('description', description.trim())
      data.append('priceAmount',       price)
      data.append('priceCurrency',    currency)
      images.forEach(img => data.append('images', img.file))

      for (let pair of data.entries()) {
  console.log(pair[0], pair[1])
}
      await handleCreateProduct(data)
     
      // navigate('/products')
    } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="cp-shell">
      <form id="create-product-form" className="cp-form-full" onSubmit={handleSubmit} noValidate>
        
        {/* ── LEFT PANE: BRAND & IMAGES ── */}
        <section className="cp-left-pane">
          <div className="cp-pane-inner">
            <Link to="/products" className="cp-nav-back">
              ← Back
            </Link>
            <header className="cp-brand-header">
              <span className="cp-logo">Snitch</span>
              <h1 className="cp-heading">New Product</h1>
              <p className="cp-subheading">Curate your collection</p>
            </header>

            <div className="cp-upload-section">
              <span className="cp-upload-label">Visual Assets</span>

              {images.length < MAX_IMAGES && (
                <div
                  className={`cp-upload-zone${dragOver ? ' drag-over' : ''}`}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  onClick={() => fileInputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  aria-label="Upload product images"
                  onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    id="cp-images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => addFiles(e.target.files)}
                    tabIndex={-1}
                  />

                  <svg className="cp-upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>

                  <p className="cp-upload-title">
                    Drop images here or <span>browse</span>
                  </p>
                  <p className="cp-upload-caption">Upload up to {MAX_IMAGES} files · JPG, PNG, WEBP</p>
                </div>
              )}

              {/* Preview grid */}
              {images.length > 0 && (
                <>
                  <div className="cp-preview-grid">
                    {images.map((img) => (
                      <div key={img.id} className="cp-preview-item">
                        <img src={img.preview} alt="Product preview" />
                        <button
                          type="button"
                          className="cp-preview-remove"
                          onClick={() => removeImage(img.id)}
                          aria-label="Remove image"
                        >✕</button>
                      </div>
                    ))}
                  </div>
                  <p className="cp-preview-counter">
                    <span>{images.length}</span> / {MAX_IMAGES} slots filled
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ── RIGHT PANE: FORM DETAILS ── */}
        <section className="cp-right-pane">
          <div className="cp-pane-inner cp-right-inner">
            
            {/* Title */}
            <div className="input-group">
              <input
                id="cp-title"
                type="text"
                value={form.title}
                onChange={update('title')}
                placeholder=" "
                autoComplete="off"
                required
              />
              <label htmlFor="cp-title">Product Title</label>
            </div>

            {/* Description */}
            <div className="input-group">
              <textarea
                id="cp-description"
                value={form.description}
                onChange={update('description')}
                placeholder=" "
                rows={6}
                required
              />
              <label htmlFor="cp-description">Story / Description</label>
            </div>

            {/* Price + Currency row */}
            <div className="price-row">
              <div className="input-group">
                <input
                  id="cp-price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={update('price')}
                  placeholder=" "
                  required
                />
                <label htmlFor="cp-price">Price Amount</label>
              </div>

              <div className="input-group">
                <select
                  id="cp-currency"
                  value={form.currency}
                  onChange={update('currency')}
                  className={form.currency ? 'has-value' : ''}
                  required
                >
                  {CURRENCIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <label htmlFor="cp-currency">Currency</label>
              </div>
            </div>

            <div className="cp-submit-area">
              {error && <p className="cp-error" role="alert">{error}</p>}
              
              <button
                id="cp-submit"
                type="submit"
                className="cp-btn"
                disabled={loading}
              >
                {loading ? 'Publishing…' : 'Publish Product'}
              </button>

              <Link to="/products" className="cp-back-link">
                ← Return to catalog
              </Link>
            </div>

          </div>
        </section>
        
      </form>
    </div>
  )
}

export default CreateProduct