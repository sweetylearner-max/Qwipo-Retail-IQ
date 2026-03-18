import { useState } from 'react'
import Topbar from '../components/Topbar'
import { basketCompletion } from '../data/mockData'

export default function SmartCart() {
  const [cart, setCart] = useState(basketCompletion.currentCart)
  const [added, setAdded] = useState({})

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  const addSuggestion = (s) => {
    setAdded(prev => ({ ...prev, [s.name]: true }))
    setCart(prev => [...prev, { name: s.name, qty: 1, price: s.price }])
  }

  const updateQty = (idx, delta) => {
    setCart(prev => prev.map((item, i) => i === idx
      ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ))
  }

  const removeItem = (idx) => setCart(prev => prev.filter((_, i) => i !== idx))

  return (
    <div>
      <Topbar title="Smart Cart" subtitle="AI-powered basket completion" />
      <div style={{ padding: '24px 28px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: '20px' }}>

        {/* Cart Items */}
        <div>
          <div className="card" style={{ marginBottom: '16px' }}>
            <div style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '15px', marginBottom: '16px' }}>
              🛒 Your Cart ({cart.length} items)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {cart.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 14px', background: 'var(--surface2)',
                  borderRadius: '10px', border: '1px solid var(--border)'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>{item.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>₹{item.price} per case</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button onClick={() => updateQty(i, -1)} style={{
                        width: '28px', height: '28px', borderRadius: '6px',
                        border: '1px solid var(--border2)', background: 'var(--surface)',
                        color: 'var(--text)', cursor: 'pointer', fontSize: '16px'
                      }}>−</button>
                      <span style={{ fontSize: '14px', fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>{item.qty}</span>
                      <button onClick={() => updateQty(i, 1)} style={{
                        width: '28px', height: '28px', borderRadius: '6px',
                        border: '1px solid var(--border2)', background: 'var(--surface)',
                        color: 'var(--text)', cursor: 'pointer', fontSize: '16px'
                      }}>+</button>
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: 700, minWidth: '60px', textAlign: 'right' }}>₹{(item.price * item.qty).toLocaleString()}</div>
                    <button onClick={() => removeItem(i)} style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'var(--red)', fontSize: '16px', padding: '4px'
                    }}>✕</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bundle Savings Banner */}
          <div style={{
            background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)',
            borderRadius: '10px', padding: '14px 16px', marginBottom: '16px',
            display: 'flex', alignItems: 'center', gap: '12px'
          }}>
            <span style={{ fontSize: '22px' }}>🎁</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px', color: '#10b981' }}>Bundle Savings Available!</div>
              <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
                Add AI suggestions to unlock ₹{basketCompletion.savingsOnBundle} extra savings on this order.
              </div>
            </div>
          </div>

          {/* AI Basket Completion */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ fontSize: '22px' }}>🤖</div>
              <div>
                <div style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '15px' }}>Complete Your Basket</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>AI-detected missing items based on your purchase pattern</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {basketCompletion.suggestions.map((s, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  padding: '12px 14px', background: 'var(--surface2)',
                  borderRadius: '10px', border: '1px solid var(--border)'
                }}>
                  <span style={{ fontSize: '28px' }}>{s.image}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>{s.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>{s.reason}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                      <div style={{ height: '4px', width: '80px', background: 'var(--border2)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${s.confidence}%`, background: '#6366f1', borderRadius: '2px' }} />
                      </div>
                      <span style={{ fontSize: '11px', color: '#818cf8' }}>{s.confidence}% match</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>₹{s.price}</div>
                    {added[s.name] ? (
                      <span style={{ color: '#10b981', fontSize: '13px', fontWeight: 600 }}>✓ Added</span>
                    ) : (
                      <button className="btn-primary" style={{ fontSize: '12px', padding: '7px 14px' }}
                        onClick={() => addSuggestion(s)}>Add +</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="card" style={{ position: 'sticky', top: '70px' }}>
            <div style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '15px', marginBottom: '16px' }}>Order Summary</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--muted)' }}>Subtotal ({cart.length} items)</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--muted)' }}>Bulk Discount</span>
                <span style={{ color: '#10b981' }}>− ₹{Math.round(total * 0.12).toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--muted)' }}>Delivery</span>
                <span style={{ color: '#10b981' }}>Free</span>
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700, fontFamily: 'Space Grotesk' }}>Total</span>
                <span style={{ fontWeight: 700, fontSize: '18px', fontFamily: 'Space Grotesk' }}>₹{Math.round(total * 0.88).toLocaleString()}</span>
              </div>
            </div>

            <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '8px', padding: '10px 12px', marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 600 }}>💰 You're saving ₹{Math.round(total * 0.12).toLocaleString()} on this order!</div>
            </div>

            <button className="btn-primary" style={{ width: '100%', fontSize: '15px', padding: '13px' }}>
              Place Order →
            </button>
            <div style={{ fontSize: '11px', color: 'var(--muted)', textAlign: 'center', marginTop: '10px' }}>
              Estimated delivery: Tomorrow by 8 AM
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
