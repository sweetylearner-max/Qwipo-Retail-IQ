import Topbar from '../components/Topbar'
import { opportunityScore, nearbyRetailers } from '../data/mockData'

const priorityColor = { high: '#ef4444', medium: '#f59e0b', low: '#10b981' }
const priorityBg = { high: 'rgba(239,68,68,0.1)', medium: 'rgba(245,158,11,0.1)', low: 'rgba(16,185,129,0.1)' }

export default function Opportunities() {
  return (
    <div>
      <Topbar title="Business Opportunities" subtitle="Revenue gaps and growth potential identified by AI" />
      <div style={{ padding: '24px 28px' }}>

        {/* Score Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px' }}>Current Health Score</div>
            <div style={{ fontSize: '52px', fontWeight: 700, fontFamily: 'Space Grotesk', color: '#f59e0b' }}>{opportunityScore.current}</div>
            <div style={{ fontSize: '12px', color: 'var(--muted)' }}>out of 100</div>
            <div style={{ height: '6px', background: 'var(--border2)', borderRadius: '3px', marginTop: '12px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${opportunityScore.current}%`, background: 'linear-gradient(90deg, #f59e0b, #ef4444)', borderRadius: '3px' }} />
            </div>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px' }}>Potential Score</div>
            <div style={{ fontSize: '52px', fontWeight: 700, fontFamily: 'Space Grotesk', color: '#10b981' }}>{opportunityScore.potential}</div>
            <div style={{ fontSize: '12px', color: 'var(--muted)' }}>if gaps are filled</div>
            <div style={{ height: '6px', background: 'var(--border2)', borderRadius: '3px', marginTop: '12px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${opportunityScore.potential}%`, background: 'linear-gradient(90deg, #10b981, #14b8a6)', borderRadius: '3px' }} />
            </div>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px' }}>Missed Monthly Revenue</div>
            <div style={{ fontSize: '42px', fontWeight: 700, fontFamily: 'Space Grotesk', color: '#ef4444' }}>
              ₹{(opportunityScore.missedRevenue/1000).toFixed(1)}K
            </div>
            <div style={{ fontSize: '12px', color: 'var(--muted)' }}>per month</div>
            <div style={{ marginTop: '12px' }}>
              <span className="badge badge-red">Action Required</span>
            </div>
          </div>
        </div>

        {/* Opportunity Gaps */}
        <div className="card" style={{ marginBottom: '20px' }}>
          <div style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>
            📊 Revenue Gap Analysis
          </div>
          <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '20px' }}>
            Categories where competitors in your area are earning more
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {opportunityScore.gaps.map((gap, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '16px',
                padding: '14px 16px',
                background: priorityBg[gap.priority],
                border: `1px solid ${priorityColor[gap.priority]}30`,
                borderRadius: '10px'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>{gap.category}</div>
                    <span style={{
                      background: priorityBg[gap.priority],
                      color: priorityColor[gap.priority],
                      fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px',
                      textTransform: 'uppercase'
                    }}>{gap.priority}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{gap.reason}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: priorityColor[gap.priority] }}>
                    ₹{(gap.gap/1000).toFixed(1)}K
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)' }}>/ month</div>
                </div>
                <div style={{ width: '120px' }}>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${(gap.gap / opportunityScore.missedRevenue) * 100}%`,
                      background: priorityColor[gap.priority],
                      borderRadius: '3px'
                    }} />
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '3px', textAlign: 'right' }}>
                    {Math.round((gap.gap / opportunityScore.missedRevenue) * 100)}% of gap
                  </div>
                </div>
                <button className="btn-primary" style={{ fontSize: '12px', padding: '8px 14px', whiteSpace: 'nowrap' }}>
                  Stock Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Retailers */}
        <div className="card">
          <div style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>
            👥 Similar Retailers in Your Area
          </div>
          <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '16px' }}>
            Stores with similar profiles that are performing better
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {nearbyRetailers.map((r, i) => (
              <div key={i} style={{
                background: 'var(--surface2)', border: '1px solid var(--border)',
                borderRadius: '10px', padding: '14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: `hsl(${i * 60 + 200}, 70%, 50%)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '13px', fontWeight: 700, color: 'white'
                  }}>{r.name[0]}</div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>{r.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--muted)' }}>{r.area}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--muted)' }}>Profile Match</span>
                  <span style={{ color: '#10b981', fontWeight: 600 }}>{r.similarity}%</span>
                </div>
                <div style={{ height: '4px', background: 'var(--border2)', borderRadius: '2px', overflow: 'hidden', marginBottom: '8px' }}>
                  <div style={{ height: '100%', width: `${r.similarity}%`, background: 'linear-gradient(90deg, #10b981, #14b8a6)', borderRadius: '2px' }} />
                </div>
                <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
                  Top product: <span style={{ color: 'var(--text)', fontWeight: 600 }}>{r.topBuy}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
