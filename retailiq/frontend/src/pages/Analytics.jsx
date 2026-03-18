import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts'
import Topbar from '../components/Topbar'
import { purchaseHistory } from '../data/mockData'

const savingsData = purchaseHistory.map(d => ({ ...d, savingsPct: Math.round((d.savings / d.spent) * 100) }))

export default function Analytics() {
  return (
    <div>
      <Topbar title="Analytics" subtitle="Your purchasing insights and savings overview" />
      <div style={{ padding: '24px 28px' }}>

        {/* Summary Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'Total Orders (6M)', value: '1,119', icon: '📦', sub: '+18% vs prev' },
            { label: 'Total Spend (6M)', value: '₹7.6L', icon: '💰', sub: '+22% vs prev' },
            { label: 'Total Savings (6M)', value: '₹90.1K', icon: '🤑', sub: '12% avg discount' },
            { label: 'Unique Products', value: '186', icon: '🏷️', sub: 'across 12 categories' }
          ].map((s, i) => (
            <div key={i} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span style={{ fontSize: '22px' }}>{s.icon}</span>
                <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>{s.sub}</span>
              </div>
              <div style={{ fontSize: '26px', fontWeight: 700, fontFamily: 'Space Grotesk' }}>{s.value}</div>
              <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          {/* Spend Chart */}
          <div className="card">
            <div style={{ fontFamily: 'Space Grotesk', fontWeight: 600, marginBottom: '4px' }}>Monthly Spend</div>
            <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '16px' }}>Last 6 months purchasing trend</div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={purchaseHistory}>
                <defs>
                  <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v/1000}K`} />
                <Tooltip formatter={v => [`₹${(v/1000).toFixed(0)}K`, 'Spend']} contentStyle={{ background: 'var(--surface2)', border: '1px solid var(--border2)', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="spent" stroke="#6366f1" strokeWidth={2} fill="url(#spendGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Savings Chart */}
          <div className="card">
            <div style={{ fontFamily: 'Space Grotesk', fontWeight: 600, marginBottom: '4px' }}>Monthly Savings</div>
            <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '16px' }}>Savings earned through Qwipo bulk deals</div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={savingsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v/1000}K`} />
                <Tooltip formatter={v => [`₹${(v/1000).toFixed(1)}K`, 'Savings']} contentStyle={{ background: 'var(--surface2)', border: '1px solid var(--border2)', borderRadius: '8px' }} />
                <Bar dataKey="savings" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Items Chart */}
        <div className="card">
          <div style={{ fontFamily: 'Space Grotesk', fontWeight: 600, marginBottom: '4px' }}>Order Volume</div>
          <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '16px' }}>Number of items ordered per month</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={purchaseHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--surface2)', border: '1px solid var(--border2)', borderRadius: '8px' }} />
              <Bar dataKey="items" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  )
}
