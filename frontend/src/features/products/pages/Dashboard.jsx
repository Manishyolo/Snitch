import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import { useProduct } from '../hook/useProduct'
import './dashboard.css'

/* ─────────────────────────────────────────────
   Helper — format price with currency symbol
───────────────────────────────────────────── */
function formatPrice(amount, currency = 'USD') {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(amount)
  } catch {
    return `${currency} ${amount}`
  }
}

/* ─────────────────────────────────────────────
   Compute catalog stats from the products array
───────────────────────────────────────────── */
function useStats(products) {
  const total = products.length

  const catalogValue = products.reduce((sum, p) => {
    const amount = p.price?.amount ?? p.priceAmount ?? p.price ?? 0
    return sum + Number(amount)
  }, 0)

  // "This month" — products created in the current calendar month
  const now = new Date()
  const thisMonth = products.filter((p) => {
    if (!p.createdAt) return false
    const d = new Date(p.createdAt)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length

  return { total, catalogValue, thisMonth }
}

/* ─────────────────────────────────────────────
   Navbar
───────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Catalog',   to: '/dashboard' },
  { label: 'Analytics', to: '/analytics' },
  { label: 'Settings',  to: '/settings'  },
]

function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav className="db-nav" aria-label="Main navigation">
      <div className="db-nav-inner">

        {/* Wordmark */}
        <Link to="/dashboard" className="db-nav-logo" aria-label="Snitch home">
          Snitch
        </Link>

        {/* Center links */}
        <ul className="db-nav-links" role="list">
          {NAV_LINKS.map(({ label, to }) => (
            <li key={to}>
              <Link
                to={to}
                className={`db-nav-link${pathname === to ? ' db-nav-link--active' : ''}`}
                aria-current={pathname === to ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Avatar */}
        <div className="db-nav-avatar-wrap" title="Seller account">
          <div className="db-nav-avatar" aria-label="Seller avatar">
            S
          </div>
          <span className="db-nav-dot" aria-hidden="true" />
        </div>

      </div>
    </nav>
  )
}

/* ─────────────────────────────────────────────
   Stat box
───────────────────────────────────────────── */
function StatBox({ value, label, gold = false }) {
  return (
    <div className="db-stat">
      <span className={`db-stat-value${gold ? ' db-stat-value--gold' : ''}`}>
        {value}
      </span>
      <span className="db-stat-label">{label}</span>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Card placeholder (no image uploaded)
───────────────────────────────────────────── */
function CardPlaceholder() {
  return (
    <div className="db-card-placeholder" aria-hidden="true">
      <div className="db-card-placeholder-inner">
        <svg
          className="db-card-placeholder-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <span className="db-card-placeholder-text">No image</span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Product card
───────────────────────────────────────────── */
function ProductCard({ product }) {
  const price    = product.price?.amount ?? product.priceAmount ?? product.price ?? null
  const currency = product.price?.currency ?? product.priceCurrency ?? 'USD'

  const firstImage =
    Array.isArray(product.images) && product.images.length > 0
      ? typeof product.images[0] === 'string'
        ? product.images[0]
        : (product.images[0]?.url ?? product.images[0]?.path ?? null)
      : null

  return (
    <article className="db-card">
      {/* Square image area */}
      <div className="db-card-img-wrap">
        {firstImage ? (
          <img
            className="db-card-img"
            src={firstImage}
            alt={product.title ?? 'Product image'}
            loading="lazy"
          />
        ) : (
          <CardPlaceholder />
        )}
      </div>

      {/* Name + price */}
      <div className="db-card-info">
        <div className="db-card-meta">
          <h2 className="db-card-name">{product.title ?? 'Untitled'}</h2>
          {price !== null && (
            <span className="db-card-price">{formatPrice(price, currency)}</span>
          )}
        </div>
      </div>
    </article>
  )
}

/* ─────────────────────────────────────────────
   Skeleton grid (shown while loading)
───────────────────────────────────────────── */
function SkeletonGrid() {
  return (
    <div className="db-skeleton-grid" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div className="db-skeleton-card" key={i}>
          <div className="db-skeleton-img" />
          <div className="db-skeleton-meta">
            <div className="db-skeleton-name" />
            <div className="db-skeleton-price" />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────
   Dashboard — main export
───────────────────────────────────────────── */
const Dashboard = () => {
  const { handleGetSellerProducts } = useProduct()
  const products = useSelector((state) => state.products?.products ?? [])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')

  /* Fetch once on mount */
  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setLoading(true)
        setError('')
        await handleGetSellerProducts()
      } catch (err) {
        if (!cancelled) {
          setError('Could not load your catalog. Please try again.')
          console.error('[Dashboard] fetch error:', err)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { total, catalogValue, thisMonth } = useStats(products)

  return (
    <div className="db-page">

      {/* ── Sticky Navbar ── */}
      <Navbar />

      {/* ── Main content ── */}
      <main className="db-body">

        {/* Page heading */}
        <div className="db-heading-row">
          <h1 className="db-page-title">Your Catalog</h1>
          <p className="db-page-sub">Manage and review your listed products</p>
        </div>

        {/* Stats row */}
        <div className="db-stats" aria-label="Catalog statistics">
          <StatBox
            value={loading ? '—' : total}
            label="Total Products"
            gold
          />
          <StatBox
            value={loading ? '—' : formatPrice(catalogValue)}
            label="Catalog Value"
          />
          <StatBox
            value={loading ? '—' : thisMonth}
            label="This Month"
          />
        </div>

        {/* Section label + CTA */}
        <div className="db-section-bar">
          <span className="db-section-label">All Products</span>
          <Link
            to="/createproduct"
            id="db-new-product-btn"
            className="db-new-btn"
            aria-label="Create a new product"
          >
            + New Product
          </Link>
        </div>

        {/* Error */}
        {error && <p className="db-error" role="alert">{error}</p>}

        {/* Loading skeleton */}
        {loading && <SkeletonGrid />}

        {/* Product grid */}
        {!loading && !error && products.length > 0 && (
          <section className="db-grid" aria-label="Products">
            {products.map((product) => (
              <ProductCard
                key={product._id ?? product.id ?? product.title}
                product={product}
              />
            ))}
          </section>
        )}

        {/* Empty state */}
        {!loading && !error && products.length === 0 && (
          <div className="db-grid">
            <div className="db-empty" role="status">
              <p className="db-empty-text">Nothing here yet</p>
              <p className="db-empty-sub">Your listed products will appear here</p>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}

export default Dashboard