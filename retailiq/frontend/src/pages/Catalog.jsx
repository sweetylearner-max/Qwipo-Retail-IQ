import { useState } from 'react'
import Topbar from '../components/Topbar'
import { recommendations } from '../data/mockData'

const allProducts = [
  ...recommendations,
  { id: 7, name: "Britannia Good Day 200g (Pack of 24)", brand: "Britannia", category: "Biscuits", price: 528, mrp: 600, discount: 12, score: 75, reason: "Popular in your category", image: "🍪", trend: "+5%", inStock: true, tags: ["Popular"] },
  { id: 8, name: "Horlicks Health Drink 500g (Pack of 12)", brand: "GSK", category: "Health Drinks", price: 2040, mrp: 2400, discount: 15, score: 71, reason: "Growing segment in your area", image: "🥛", trend: "+18%", inStock: true, tags: ["Opportunity"] },
  { id: 9, name: "Dettol Soap 125g (Pack of 48)", brand: "Reckitt", category: "Personal Care", price: 1296, mrp: 1536, discount: 15, score: 68, reason: "Hygiene products high demand", image: "🧼", trend: "+9%", inStock: false, tags: [] },
]

const categories = ['All', 'Snacks', 'Biscuits', 'Beverages', 'Dairy', 'Personal Care', 'Instant Food', 'Health Drinks']

export default function Catalog() {
  const [category, setCategory] = useState('All')
  const [sortBy, setSortBy] = useState('score')

  const filtered = allProducts
    .filter(p => category === 'All' || p.category === category)
    .sort((a, b) => sortBy === 'score' ? b.score - a.score : sortBy === 'price' ? a.price - b.price : b.discount - a.discount)

  return (
    <div>
      <Topbar title="Catalog" subtitle="Browse and order products for your store" />
      <div style={{ padding: '24px 28px' }}>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '6px', flex: 1, flexWrap: 'wrap' }}>
            {categories.map(c => (
              <button key={c} onClick={() => setCategory(c)} style={{
                padding: '7px 14px', borderRadius: '20px', border: '1px solid',
                borderColor: category === c ? 'var(--accent)' : 'var(--border)',
                background: category === c ? 'rgba(99,102,241,0.15)' : 'var(--surface2)',
                color: category === c ? '#818cf8' : 'var(--muted)',
                fontSize: '12px', cursor: 'pointer'
              }}>{c}</button>
            ))}
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
            background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '8px',
            color: 'var(--text)', padding: '8px 12px', fontSize: '13px', cursor: 'pointer'
          }}>
            <option value="score">Sort: AI Score</option>
            <option value="price">Sort: Price</option>
            <option value="discount">Sort: Discount</option>
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          {filtered.map(p => (
            <div key={p.id} className="card card-hover" style={{ opacity: p.inStock ? 1 : 0.6 }}>
              {!p.inStock && (
                <div style={{ textAlign: 'center', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '6px', padding: '4px', marginBottom: '10px', fontSize: '11px', color: '#ef4444', fontWeight: 600 }}>OUT OF STOCK</div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span style={{ fontSize: '36px' }}>{p.image}</span>
                <span style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '20px' }}>AI {p.score}</span>
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '2px', lineHeight: 1.3 }}>{p.name}</div>
              <div style={{ fontSize: '11px', color: '#818cf8', marginBottom: '8px' }}>{p.brand} · {p.category}</div>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap' }}>
                {p.tags.map(t => <span key={t} className="badge badge-blue" style={{ fontSize: '10px' }}>{t}</span>)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div>
                  <span style={{ fontSize: '16px', fontWeight: 700 }}>₹{p.price}</span>
                  <span style={{ fontSize: '11px', color: 'var(--muted)', textDecoration: 'line-through', marginLeft: '5px' }}>₹{p.mrp}</span>
                </div>
                <span className="badge badge-green">{p.discount}% off</span>
              </div>
              <button className="btn-primary" style={{ width: '100%', fontSize: '13px', padding: '9px' }} disabled={!p.inStock}>
                {p.inStock ? '🛒 Add to Cart' : 'Notify When Available'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
