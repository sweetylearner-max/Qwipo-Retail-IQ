import { useState } from 'react'
import Topbar from '../components/Topbar'
import { hyperlocalTrends } from '../data/mockData'

const allTrends = [
  { area: "Begum Bazaar", trend: "Beverages", change: "+45%", reason: "Summer heat wave — stock up on cold drinks", hot: true, category: "Beverages", products: ["Coca Cola", "Pepsi", "Maaza", "Slice"] },
  { area: "Begum Bazaar", trend: "Ice Cream", change: "+67%", reason: "Trending this week — highest demand in 3 months", hot: true, category: "Dairy", products: ["Kwality Walls", "Amul Ice Cream", "Mother Dairy"] },
  { area: "Secunderabad", trend: "Dairy", change: "+18%", reason: "Festival season boost", hot: false, category: "Dairy", products: ["Amul Milk", "Mother Dairy", "Heritage"] },
  { area: "Koti", trend: "Snacks", change: "+34%", reason: "School reopening — kids snacks spiking", hot: true, category: "Snacks", products: ["Lays", "Kurkure", "Haldiram", "Bingo"] },
  { area: "Abids", trend: "Stationery", change: "+28%", reason: "School supplies demand peaking", hot: false, category: "Other", products: ["Classmate", "Navneet", "Apsara"] },
  { area: "Hyderabad (All)", trend: "Monsoon Snacks", change: "+52%", reason: "Pre-monsoon stocking trend", hot: true, category: "Snacks", products: ["Maggi", "Top Ramen", "Yippee", "Wai Wai"] },
  { area: "Begum Bazaar", trend: "Personal Care", change: "+15%", reason: "Summer skincare demand", hot: false, category: "Personal Care", products: ["Vaseline", "Pond's", "Nivea"] },
  { area: "Hyderabad (All)", trend: "Energy Drinks", change: "+38%", reason: "Youth consumption rising fast", hot: true, category: "Beverages", products: ["Red Bull", "Monster", "Sting"] }
]

export default function Trends() {
  const [areaFilter, setAreaFilter] = useState('All Areas')
  const areas = ['All Areas', 'Begum Bazaar', 'Secunderabad', 'Koti', 'Abids', 'Hyderabad (All)']

  const filtered = areaFilter === 'All Areas' ? allTrends : allTrends.filter(t => t.area === areaFilter)
  const hotCount = filtered.filter(t => t.hot).length

  return (
    <div>
      <Topbar title="Hyper-Local Trends" subtitle="Real-time demand signals from your area" />
      <div style={{ padding: '24px 28px' }}>

        {/* Live Banner */}
        <div style={{
          background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
          borderRadius: '12px', padding: '14px 18px',
          display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px'
        }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', animation: 'pulse 2s infinite', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <span style={{ fontWeight: 600, fontSize: '14px' }}>LIVE — </span>
            <span style={{ fontSize: '14px', color: 'var(--muted)' }}>
              {hotCount} hot trends detected near your store in Begum Bazaar right now.
              Retailers who restock within 24hrs see 34% higher sales.
            </span>
          </div>
          <span style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '20px' }}>
            {hotCount} HOT
          </span>
        </div>

        {/* Area Filters */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {areas.map(a => (
            <button key={a} onClick={() => setAreaFilter(a)} style={{
              padding: '7px 16px', borderRadius: '20px', border: '1px solid',
              borderColor: areaFilter === a ? '#ef4444' : 'var(--border)',
              background: areaFilter === a ? 'rgba(239,68,68,0.12)' : 'var(--surface2)',
              color: areaFilter === a ? '#f87171' : 'var(--muted)',
              fontSize: '13px', fontWeight: 500, cursor: 'pointer'
            }}>{a}</button>
          ))}
        </div>

        {/* Trends Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
          {filtered.map((t, i) => (
            <div key={i} className="card card-hover" style={{
              borderColor: t.hot ? 'rgba(239,68,68,0.2)' : 'var(--border)'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '28px' }}>{t.hot ? '🔥' : '📈'}</span>
                  <div>
                    <div style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '15px' }}>{t.trend}</div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)' }}>📍 {t.area}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '22px', fontWeight: 700, color: '#10b981', fontFamily: 'Space Grotesk' }}>{t.change}</div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)' }}>this week</div>
                </div>
              </div>
              <div style={{
                fontSize: '12px', color: 'var(--muted)',
                background: 'var(--surface2)', borderRadius: '8px',
                padding: '8px 10px', marginBottom: '12px'
              }}>{t.reason}</div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>Top products to stock:</div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {t.products.map(p => (
                    <span key={p} style={{
                      background: 'var(--surface2)', border: '1px solid var(--border)',
                      borderRadius: '20px', padding: '3px 10px', fontSize: '11px', color: 'var(--text)'
                    }}>{p}</span>
                  ))}
                </div>
              </div>
              <button className="btn-primary" style={{ width: '100%', marginTop: '14px', fontSize: '13px', padding: '9px' }}>
                Stock These Products →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
