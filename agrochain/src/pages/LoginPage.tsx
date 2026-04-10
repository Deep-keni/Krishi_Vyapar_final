import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'

export default function LoginPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        console.error('Login error:', signInError)
        setError(signInError.message)
        setLoading(false)
        return
      }

      if (data.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single()

        if (profileError) {
          console.error('Profile fetch error:', profileError)
          navigate('/farmer-dashboard')
          return
        }

        navigate(profile.role === 'farmer' ? '/farmer-dashboard' : '/buyer-dashboard')
      }
    } catch (err) {
      console.error('Unexpected error:', err)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-agro-bg-alt min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-5xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-3xl shadow-lg">

        {/* ──── Left Panel (info) ──── */}
        <div className="hidden lg:flex bg-agro-green rounded-l-3xl p-12 flex-col justify-between min-h-[520px]">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-8">
              <span className="text-2xl">🌾</span>
              <span className="font-heading text-2xl font-bold text-white">AgroChain</span>
            </Link>
            <h2 className="text-white/90 text-2xl font-heading leading-snug font-bold mb-4">
              Welcome back to AgroChain
            </h2>
            <p className="text-green-200 text-sm leading-relaxed">
              Your crops are waiting.<br />
              Check today's prices and pending orders.
            </p>
          </div>

          <div className="space-y-3">
            {[
              '📊 Live Agmarknet prices updated hourly',
              '📦 Track all your shipments',
              '💰 Pending payments overview',
            ].map((t, i) => (
              <div key={i} className="bg-white/10 text-white text-sm rounded-xl px-4 py-3 flex items-center gap-3">
                {t}
              </div>
            ))}
          </div>

          <p className="text-green-200 text-xs mt-8">
            Trusted by 12,000+ farmers across 18 states.
          </p>
        </div>

        {/* ──── Right Panel (form) ──── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="bg-white rounded-r-3xl lg:rounded-l-none rounded-3xl lg:rounded-r-3xl p-8 md:p-10 flex flex-col justify-center"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <span className="text-xl">🌾</span>
            <Link to="/" className="font-heading text-xl font-bold text-agro-green">AgroChain</Link>
          </div>

          <h1 className="font-heading text-2xl font-bold text-agro-text mb-1">Sign in</h1>
          <p className="text-agro-muted text-sm mb-8">Good to have you back</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-agro-text text-sm font-medium mb-1.5 block">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-agro-bg border border-agro-border rounded-xl px-4 py-3 text-agro-text text-sm w-full outline-none focus:border-agro-green focus:ring-2 focus:ring-agro-green/10 placeholder:text-agro-muted/60 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-agro-text text-sm font-medium mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-agro-bg border border-agro-border rounded-xl px-4 py-3 text-agro-text text-sm w-full outline-none focus:border-agro-green focus:ring-2 focus:ring-agro-green/10 placeholder:text-agro-muted/60 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-agro-muted hover:text-agro-text transition-colors cursor-pointer text-sm"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              <div className="text-right mt-2">
                <button
                  type="button"
                  className="text-agro-muted text-xs hover:text-agro-green transition-colors cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="bg-agro-green text-white font-semibold rounded-xl px-6 py-3 hover:bg-agro-green-mid active:scale-95 transition-all cursor-pointer w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              {loading ? 'Signing In...' : 'Sign In →'}
            </button>
          </form>

          <p className="text-center mt-6 text-agro-muted text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-agro-green font-medium hover:underline">
              Sign up →
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
