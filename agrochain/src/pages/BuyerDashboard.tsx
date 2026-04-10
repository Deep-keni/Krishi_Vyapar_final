import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function BuyerDashboard() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-agro-bg">
      {/* Top bar */}
      <div className="bg-white border-b border-agro-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl">🌾</span>
            <span className="font-heading text-xl font-bold text-agro-green">AgroChain</span>
          </Link>
          <button
            onClick={handleLogout}
            className="border-2 border-agro-green text-agro-green rounded-xl px-4 py-2 hover:bg-agro-green-light active:scale-95 transition-all cursor-pointer text-sm font-semibold"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-73px)]">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center px-6"
        >
          <div className="w-20 h-20 rounded-2xl bg-agro-amber-light border border-agro-border flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🛒</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-agro-text mb-3">
            Buyer Dashboard
          </h1>
          <p className="text-agro-muted text-lg mb-8 max-w-md mx-auto">
            Your marketplace is being set up. Get ready to discover fresh produce directly from farms.
          </p>
          <div className="inline-flex items-center gap-2 bg-agro-amber-light text-agro-amber text-sm font-semibold px-4 py-2 rounded-full border border-agro-amber/20">
            <span className="w-2 h-2 rounded-full bg-agro-amber animate-pulse" />
            Coming Soon
          </div>
        </motion.div>
      </div>
    </div>
  )
}
