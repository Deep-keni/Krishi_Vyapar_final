import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'

type Role = 'farmer' | 'buyer'

export default function SignupPage() {
  const navigate = useNavigate()

  const [role, setRole] = useState<Role>('farmer')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.')
      return
    }

    setLoading(true)

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (signUpError) {
        console.error('Signup error:', signUpError)
        setError(signUpError.message)
        setLoading(false)
        return
      }

      if (data.user) {
        const { error: profileError } = await supabase.from('profiles').insert({
          id: data.user.id,
          full_name: fullName,
          role,
          phone,
        })

        if (profileError) {
          console.error('Profile insert error:', profileError)
          setError('Account created but profile setup failed. Please contact support.')
          setLoading(false)
          return
        }

        navigate(role === 'farmer' ? '/farmer-dashboard' : '/buyer-dashboard')
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
        <div className="hidden lg:flex bg-agro-green rounded-l-3xl p-12 flex-col justify-between min-h-[640px]">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-8">
              <span className="text-2xl">🌾</span>
              <span className="font-heading text-2xl font-bold text-white">AgroChain</span>
            </Link>
            <h2 className="text-white/90 text-2xl font-heading leading-snug font-bold mb-4">
              Join 12,000 farmers already selling at better prices.
            </h2>
            <p className="text-green-200 text-sm leading-relaxed">
              Free to join. No commission.<br />
              Govt. backed price data.
            </p>
          </div>

          <div className="space-y-3">
            {[
              '✅ Real mandi prices from Agmarknet',
              '✅ Verified buyers — no fraud',
              '✅ Direct bank payments via Razorpay',
            ].map((t, i) => (
              <div key={i} className="bg-white/10 text-white text-sm rounded-xl px-4 py-3 flex items-center gap-3">
                {t}
              </div>
            ))}
          </div>

          <p className="text-green-200 text-xs mt-8">
            Already trusted by farmers in Maharashtra, Punjab, UP and 15 more states.
          </p>
        </div>

        {/* ──── Right Panel (form) ──── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="bg-white rounded-r-3xl lg:rounded-l-none rounded-3xl lg:rounded-r-3xl p-8 md:p-10"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <span className="text-xl">🌾</span>
            <Link to="/" className="font-heading text-xl font-bold text-agro-green">AgroChain</Link>
          </div>

          <h1 className="font-heading text-2xl font-bold text-agro-text mb-1">Create your account</h1>
          <p className="text-agro-muted text-sm mb-8">Start your journey to better prices</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role selector */}
            <div>
              <label className="text-agro-muted text-sm font-medium mb-3 block">I want to...</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('farmer')}
                  className={`border-2 rounded-2xl p-5 cursor-pointer text-center transition-all ${
                    role === 'farmer'
                      ? 'border-agro-green bg-agro-green-light text-agro-green'
                      : 'border-agro-border bg-agro-bg text-agro-muted hover:border-agro-muted/40'
                  }`}
                >
                  <span className="text-3xl block mb-2">🌾</span>
                  <span className="font-bold text-sm block">Sell my crops</span>
                  <span className="text-xs block mt-0.5 opacity-75">I'm a farmer</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('buyer')}
                  className={`border-2 rounded-2xl p-5 cursor-pointer text-center transition-all ${
                    role === 'buyer'
                      ? 'border-agro-amber bg-agro-amber-light text-agro-amber'
                      : 'border-agro-border bg-agro-bg text-agro-muted hover:border-agro-muted/40'
                  }`}
                >
                  <span className="text-3xl block mb-2">🛒</span>
                  <span className="font-bold text-sm block">Buy crops</span>
                  <span className="text-xs block mt-0.5 opacity-75">I'm a buyer or business</span>
                </button>
              </div>
            </div>

            {/* Full Name */}
            <input
              type="text"
              placeholder="e.g. Ravi Kumar"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="bg-agro-bg border border-agro-border rounded-xl px-4 py-3 text-agro-text text-sm w-full outline-none focus:border-agro-green focus:ring-2 focus:ring-agro-green/10 placeholder:text-agro-muted/60 transition-all"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-agro-bg border border-agro-border rounded-xl px-4 py-3 text-agro-text text-sm w-full outline-none focus:border-agro-green focus:ring-2 focus:ring-agro-green/10 placeholder:text-agro-muted/60 transition-all"
            />

            {/* Phone */}
            <div>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="bg-agro-bg border border-agro-border rounded-xl px-4 py-3 text-agro-text text-sm w-full outline-none focus:border-agro-green focus:ring-2 focus:ring-agro-green/10 placeholder:text-agro-muted/60 transition-all"
              />
              <p className="text-agro-muted text-xs mt-1">Used for order alerts and SMS notifications</p>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Min 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
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

            {/* Confirm password */}
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-agro-bg border border-agro-border rounded-xl px-4 py-3 text-agro-text text-sm w-full outline-none focus:border-agro-green focus:ring-2 focus:ring-agro-green/10 placeholder:text-agro-muted/60 transition-all pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-agro-muted hover:text-agro-text transition-colors cursor-pointer text-sm"
              >
                {showConfirm ? '🙈' : '👁️'}
              </button>
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
              {loading ? 'Creating Account...' : 'Create Free Account →'}
            </button>
          </form>

          <p className="text-center mt-6 text-agro-muted text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-agro-green font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
