import { useState } from 'react'
import Topbar from '../components/Topbar'
import { recommendations } from '../data/mockData'

const filters = ['All', 'Trending', 'Reorder Due', 'Missing Product', 'Seasonal', 'AI Predicted']

export default function Recommendations() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [cart, setCart] = useState([])
  const [added, setAdded] = useState({})

  const filtered = activeFilter === 'All'
    ? recommendations
    : recommendations.filter(r => r.tags.includes(activeFilter))

  const addToCart = (rec) => {
    setAdded(prev => ({ ...prev, [rec.id]: true }))
    setCart(prev => [...prev, rec])
    setTimeout(() => setAdded(prev => ({ ...prev, [rec.id]: false })), 2000)
  }

  return (
    <div>
      <Topbar title="Recommendations" subtitle="AI-powered picks personalized for your store" />
      <div style={{ padding: '24px 28px' }}>

        {/* AI Score Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(20,184,166,0.1))',
          border: '1px solid rgba(99,102,241,0.25)',
          borderRadius: '12px', padding: '16px 20px',
          display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px'
        }}>
          <div style={{ fontSize: '36px' }}>🧠</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '16px' }}>
              RetailIQ analysed 847 similar retailers in your area
            </div>
            <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '3px' }}>
              These 6 products have the highest probability of increasing your monthly revenue by ₹18,400+
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 700, fontFamily: 'Space Grotesk', color: '#10b981' }}>94%</div>
            <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Avg Confidence</div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{
              padding: '7px 16px', borderRadius: '20px', border: '1px solid',
              borderColor: activeFilter === f ? 'var(--accent)' : 'var(--border)',
              background: activeFilter === f ? 'rgba(99,102,241,0.15)' : 'var(--surface2)',
              color: activeFilter === f ? '#818cf8' : 'var(--muted)',
              fontSize: '13px', fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s'
            }}>{f}</button>
          ))}
        </div>

        {/* Products Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {filtered.map(rec => (
            <div key={rec.id} className="card card-hover" style={{ position: 'relative' }}>
              {/* Score Badge */}
              <div style={{
                position: 'absolute', top: '14px', right: '14px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: 'white', fontSize: '11px', fontWeight: 700,
                padding: '3px 8px', borderRadius: '20px'
              }}>AI {rec.score}</div>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' }}>
                {rec.tags.map(tag => (
                  <span key={tag} className={`badge ${
                    tag === 'Trending' ? 'badge-red' :
                    tag === 'Best Seller' ? 'badge-green' :
                    tag === 'Reorder Due' ? 'badge-amber' :
                    tag === 'Missing Product' ? 'badge-blue' :
                    tag === 'Seasonal' ? 'badge-teal' : 'badge-blue'
                  }`}>{tag}</span>
                ))}
              </div>

              <div style={{ fontSize: '42px', marginBottom: '12px' }}>{rec.image}</div>
              <div style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '14px', marginBottom: '4px', lineHeight: 1.3 }}>
                {rec.name}
              </div>
              <div style={{ fontSize: '12px', color: '#818cf8', marginBottom: '8px' }}>{rec.brand}</div>
              <div style={{
                fontSize: '12px', color: 'var(--muted)',
                background: 'var(--surface2)', borderRadius: '8px',
                padding: '8px 10px', marginBottom: '14px', lineHeight: 1.5
              }}>
                💡 {rec.reason}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div>
                  <span style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'Space Grotesk' }}>₹{rec.price}</span>
                  <span style={{ fontSize: '12px', color: 'var(--muted)', textDecoration: 'line-through', marginLeft: '6px' }}>₹{rec.mrp}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="badge badge-green">{rec.trend}</span>
                  <div style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '3px' }}>this week</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn-primary" style={{ flex: 1, fontSize: '13px', padding: '9px 12px' }}
                  onClick={() => addToCart(rec)}>
                  {added[rec.id] ? '✓ Added!' : '🛒 Add to Cart'}
                </button>
                <button style={{
                  padding: '9px 12px', borderRadius: '8px',
                  border: '1px solid var(--border2)', background: 'var(--surface2)',
                  color: 'var(--muted)', cursor: 'pointer', fontSize: '13px'
                }}>Save</button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--muted)' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
            <div style={{ fontSize: '16px' }}>No products match this filter</div>
          </div>
        )}
      </div>
    </div>
  )
}
