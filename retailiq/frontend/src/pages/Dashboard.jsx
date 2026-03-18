import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import Topbar from '../components/Topbar'
import { retailerProfile, purchaseHistory, topCategories, recommendations, opportunityScore, hyperlocalTrends } from '../data/mockData'

const StatCard = ({ icon, label, value, sub, subColor }) => (
  <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ fontSize: '22px' }}>{icon}</div>
      {sub && <span style={{ fontSize: '12px', fontWeight: 600, color: subColor || 'var(--green)' }}>{sub}</span>}
    </div>
    <div style={{ fontSize: '26px', fontWeight: 700, fontFamily: 'Space Grotesk' }}>{value}</div>
    <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{label}</div>
  </div>
)

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', borderRadius: '8px', padding: '10px 14px' }}>
        <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '4px' }}>{label}</div>
        <div style={{ fontSize: '15px', fontWeight: 600 }}>₹{(payload[0].value/1000).toFixed(0)}K</div>
      </div>
    )
  }
  return null
}

export default function Dashboard() {
  const [activeIdx, setActiveIdx] = useState(null)

  return (
    <div>
      <Topbar title="Dashboard" subtitle={`Good morning! Here's your retail intelligence for today.`} />
      <div style={{ padding: '24px 28px' }}>

        {/* Opportunity Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))',
          border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: '12px', padding: '16px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ fontSize: '28px' }}>💡</div>
            <div>
              <div style={{ fontWeight: 700, fontFamily: 'Space Grotesk', fontSize: '16px' }}>
                You're missing ₹{(opportunityScore.missedRevenue/1000).toFixed(1)}K/month in revenue!
              </div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '2px' }}>
                5 product categories not in your inventory have high demand in your area.
              </div>
            </div>
          </div>
          <button className="btn-primary" onClick={() => window.location.href='/opportunities'} style={{ whiteSpace: 'nowrap' }}>
            View Opportunities →
          </button>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <StatCard icon="💰" label="Monthly Revenue" value={`₹${(retailerProfile.monthlyRevenue/1000).toFixed(0)}K`} sub="↑ 12%" />
          <StatCard icon="🧠" label="Health Score" value={`${retailerProfile.healthScore}/100`} sub="↑ 8pts" />
          <StatCard icon="🎯" label="Recommendations" value="6 New" sub="View all" subColor="var(--accent)" />
          <StatCard icon="🔥" label="Local Trends" value="5 Active" sub="Begum Bazaar" subColor="var(--amber)" />
        </div>

        {/* Charts Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '24px' }}>
          {/* Revenue Chart */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <div style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '15px' }}>Monthly Spend on Qwipo</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>Last 6 months</div>
              </div>
              <span className="badge badge-green">↑ 12% vs last month</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={purchaseHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v/1000}K`} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="spent" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: '#6366f1', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Pie */}
          <div className="card">
            <div style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>Top Categories</div>
            <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '16px' }}>By purchase volume</div>
            <PieChart width={200} height={160} style={{ margin: '0 auto' }}>
              <Pie data={topCategories} cx={100} cy={80} innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={3}>
                {topCategories.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, '']} />
            </PieChart>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
              {topCategories.map((cat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: cat.color }} />
                    <span style={{ color: 'var(--muted)' }}>{cat.name}</span>
                  </div>
                  <span style={{ fontWeight: 600 }}>{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Recommendations Preview */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '15px' }}>🎯 Top Recommendations Today</div>
            <a href="/recommendations" style={{ fontSize: '13px', color: 'var(--accent)', textDecoration: 'none' }}>View all →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {recommendations.slice(0, 3).map(rec => (
              <div key={rec.id} style={{
                background: 'var(--surface2)', border: '1px solid var(--border)',
                borderRadius: '10px', padding: '14px', cursor: 'pointer',
                transition: 'all 0.2s'
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{rec.image}</div>
                <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px', lineHeight: 1.3 }}>{rec.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '8px' }}>{rec.reason}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', fontWeight: 700 }}>₹{rec.price}</span>
                  <span className="badge badge-green">{rec.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Local Trends Preview */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '15px' }}>🔥 Hyper-Local Trends Near You</div>
            <a href="/trends" style={{ fontSize: '13px', color: 'var(--accent)', textDecoration: 'none' }}>See all →</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {hyperlocalTrends.slice(0, 3).map((t, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 14px', background: 'var(--surface2)',
                borderRadius: '8px', border: `1px solid ${t.hot ? 'rgba(239,68,68,0.2)' : 'var(--border)'}`
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '18px' }}>{t.hot ? '🔥' : '📈'}</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>{t.trend} — {t.area}</div>
                    <div style={{ fontSize: '11px', color: 'var(--muted)' }}>{t.reason}</div>
                  </div>
                </div>
                <span style={{
                  background: 'rgba(16,185,129,0.15)', color: '#10b981',
                  fontSize: '12px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px'
                }}>{t.change}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
