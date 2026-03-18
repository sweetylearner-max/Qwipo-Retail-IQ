import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Recommendations from './pages/Recommendations'
import SmartCart from './pages/SmartCart'
import Opportunities from './pages/Opportunities'
import Trends from './pages/Trends'
import Analytics from './pages/Analytics'
import Catalog from './pages/Catalog'

export default function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, overflowX: 'hidden' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/smart-cart" element={<SmartCart />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/catalog" element={<Catalog />} />
        </Routes>
      </main>
    </div>
  )
}
