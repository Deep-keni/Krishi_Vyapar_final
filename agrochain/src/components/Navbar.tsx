import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <motion.nav
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-white border-b border-agro-border sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🌾</span>
          <span className="font-heading text-2xl font-bold text-agro-green">
            AgroChain
          </span>
        </Link>

        {/* Center nav links — desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-agro-muted text-sm font-medium hover:text-agro-text transition-colors">
            How it Works
          </a>
          <a href="#farmers" className="text-agro-muted text-sm font-medium hover:text-agro-text transition-colors">
            For Farmers
          </a>
          <a href="#buyers" className="text-agro-muted text-sm font-medium hover:text-agro-text transition-colors">
            For Buyers
          </a>
        </div>

        {/* Right buttons — desktop */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => navigate('/login')}
            className="border-2 border-agro-green text-agro-green rounded-xl px-5 py-2 hover:bg-agro-green-light active:scale-95 transition-all cursor-pointer text-sm font-semibold"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="bg-agro-green text-white font-semibold rounded-xl px-5 py-2 hover:bg-agro-green-mid active:scale-95 transition-all cursor-pointer text-sm"
          >
            Get Started
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-agro-text rounded-full"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 bg-agro-text rounded-full"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-agro-text rounded-full"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-b border-agro-border overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              <a href="#how-it-works" onClick={() => setMobileOpen(false)} className="text-agro-muted text-base font-medium hover:text-agro-text transition-colors">
                How it Works
              </a>
              <a href="#farmers" onClick={() => setMobileOpen(false)} className="text-agro-muted text-base font-medium hover:text-agro-text transition-colors">
                For Farmers
              </a>
              <a href="#buyers" onClick={() => setMobileOpen(false)} className="text-agro-muted text-base font-medium hover:text-agro-text transition-colors">
                For Buyers
              </a>
              <hr className="border-agro-border" />
              <button
                onClick={() => { setMobileOpen(false); navigate('/login') }}
                className="border-2 border-agro-green text-agro-green rounded-xl px-6 py-3 hover:bg-agro-green-light active:scale-95 transition-all cursor-pointer text-sm font-semibold w-full"
              >
                Login
              </button>
              <button
                onClick={() => { setMobileOpen(false); navigate('/signup') }}
                className="bg-agro-green text-white font-semibold rounded-xl px-6 py-3 hover:bg-agro-green-mid active:scale-95 transition-all cursor-pointer text-sm w-full"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
