import { useState } from 'react'

export default function Topbar({ title, subtitle }) {
  const [search, setSearch] = useState('')

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 28px',
      borderBottom: '1px solid var(--border)',
      background: 'var(--surface)',
      position: 'sticky', top: 0, zIndex: 10
    }}>
      <div>
        <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '19px' }}>{title}</div>
        {subtitle && <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '1px' }}>{subtitle}</div>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'var(--surface2)', border: '1px solid var(--border)',
          borderRadius: '8px', padding: '8px 14px'
        }}>
          <span style={{ fontSize: '14px' }}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            style={{
              background: 'none', border: 'none', outline: 'none',
              color: 'var(--text)', fontSize: '13px', width: '180px'
            }}
          />
        </div>
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%',
          background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', fontSize: '16px', position: 'relative'
        }}>
          🔔
          <div style={{
            position: 'absolute', top: '6px', right: '6px',
            width: '8px', height: '8px', borderRadius: '50%',
            background: '#ef4444', border: '1.5px solid var(--surface)'
          }} />
        </div>
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '13px', fontWeight: 700, color: 'white', cursor: 'pointer'
        }}>RG</div>
      </div>
    </div>
  )
}
