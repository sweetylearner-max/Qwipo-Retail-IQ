import { NavLink } from 'react-router-dom'
import { retailerProfile } from '../data/mockData'

const navItems = [
  { path: '/', icon: '⚡', label: 'Dashboard' },
  { path: '/recommendations', icon: '🎯', label: 'Recommendations', badge: '6' },
  { path: '/smart-cart', icon: '🛒', label: 'Smart Cart', badge: '3' },
  { path: '/opportunities', icon: '📈', label: 'Opportunities' },
  { path: '/trends', icon: '🔥', label: 'Local Trends' },
  { path: '/analytics', icon: '📊', label: 'Analytics' },
  { path: '/catalog', icon: '📦', label: 'Catalog' },
]

export default function Sidebar() {
  return (
    <aside style={{
      width: '240px',
      background: 'var(--surface)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      minHeight: '100vh',
      position: 'sticky',
      top: 0,
      height: '100vh',
      overflowY: 'auto'
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 16px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px'
          }}>🧠</div>
          <div>
            <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '16px' }}>RetailIQ</div>
            <div style={{ fontSize: '10px', color: 'var(--muted)' }}>Powered by Qwipo</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: '12px 10px', flex: 1 }}>
        <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px', padding: '8px 8px 4px' }}>Main</div>
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 10px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '13.5px',
              fontWeight: 500,
              color: isActive ? '#818cf8' : 'var(--muted)',
              background: isActive ? 'rgba(99,102,241,0.12)' : 'transparent',
              marginBottom: '2px',
              transition: 'all 0.15s'
            })}
          >
            <span style={{ fontSize: '15px', width: '20px', textAlign: 'center' }}>{item.icon}</span>
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.badge && (
              <span style={{
                background: '#6366f1', color: 'white',
                fontSize: '10px', fontWeight: 700,
                padding: '2px 6px', borderRadius: '20px'
              }}>{item.badge}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Retailer Card */}
      <div style={{ margin: '8px 10px 12px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <div style={{
            width: '34px', height: '34px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', fontWeight: 700, color: 'white', flexShrink: 0
          }}>{retailerProfile.avatar}</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{retailerProfile.name}</div>
            <div style={{ fontSize: '10px', color: 'var(--muted)' }}>{retailerProfile.type}</div>
          </div>
        </div>
        <div style={{ fontSize: '10px', color: 'var(--muted)', marginBottom: '4px', display: 'flex', justifyContent: 'space-between' }}>
          <span>Health Score</span><span style={{ color: '#10b981', fontWeight: 600 }}>{retailerProfile.healthScore}%</span>
        </div>
        <div style={{ height: '4px', background: 'var(--border2)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${retailerProfile.healthScore}%`, background: 'linear-gradient(90deg, #10b981, #14b8a6)', borderRadius: '2px' }} />
        </div>
      </div>
    </aside>
  )
}
