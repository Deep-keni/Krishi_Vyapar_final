import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useCountUp } from '../hooks/useCountUp'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

/* ─── Stat Item ─── */
interface StatItemProps {
  end: number
  prefix?: string
  suffix?: string
  label: string
  decimals?: number
  showDivider?: boolean
}

function StatItem({ end, prefix = '', suffix = '', label, decimals = 0, showDivider = false }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const { formattedCount, start } = useCountUp({ end, duration: 2200, prefix, suffix, decimals })

  useEffect(() => {
    if (isInView) start()
  }, [isInView])

  return (
    <div ref={ref} className={`text-center py-2 ${showDivider ? 'md:border-l md:border-white/20' : ''}`}>
      <div className="font-heading text-4xl font-bold text-white">{formattedCount}</div>
      <div className="text-green-200 text-sm mt-1">{label}</div>
    </div>
  )
}

/* ─── Step Card ─── */
interface StepCardProps {
  icon: string
  step: number
  title: string
  description: string
  benefits: string[]
  delay: number
}

function StepCard({ icon, step, title, description, benefits, delay }: StepCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className="relative bg-white rounded-2xl p-8 shadow-sm border border-agro-border"
    >
      {/* Step badge */}
      <div className="absolute -top-4 -right-4 w-8 h-8 bg-agro-green text-white text-sm font-bold rounded-full flex items-center justify-center shadow-md">
        {step}
      </div>

      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-heading text-xl font-bold text-agro-text mb-2">{title}</h3>
      <p className="text-agro-muted text-sm leading-relaxed mb-4">{description}</p>

      <div>
        <p className="text-xs text-agro-green font-medium mb-2">What you get:</p>
        <ul className="space-y-1">
          {benefits.map((b, i) => (
            <li key={i} className="text-agro-muted text-xs flex items-center gap-1.5">
              <span className="text-agro-green">•</span> {b}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

/* ─── Price Row for mock dashboard ─── */
interface PriceRowProps {
  emoji: string
  crop: string
  mandi: string
  mandiPrice: string
  agroPrice: string
  gain: string
  isLast?: boolean
}

function PriceRow({ emoji, crop, mandi, mandiPrice, agroPrice, gain, isLast = false }: PriceRowProps) {
  return (
    <div className={`flex justify-between items-center py-3 ${!isLast ? 'border-b border-agro-border' : ''}`}>
      <div>
        <p className="font-medium text-agro-text text-sm">
          {emoji} {crop}
        </p>
        <p className="text-agro-muted text-xs">{mandi}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-agro-muted text-sm line-through">{mandiPrice}</span>
        <span className="text-agro-green font-bold text-sm">{agroPrice}</span>
        <span className="bg-agro-green-light text-agro-green text-xs px-2 py-0.5 rounded-full font-medium">{gain}</span>
      </div>
    </div>
  )
}

/* ─── Landing Page ─── */
export default function LandingPage() {
  const navigate = useNavigate()

  const headlineWords = [
    { text: 'Your Crop.', color: 'text-agro-text' },
    { text: 'Your Price.', color: 'text-agro-text' },
    { text: 'Your Market.', color: 'text-agro-green' },
  ]

  return (
    <div className="min-h-screen bg-agro-bg">
      <Navbar />

      {/* ════════ HERO ════════ */}
      <section className="bg-agro-bg min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left column — text */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <span className="inline-flex items-center gap-2 bg-agro-green-light text-agro-green text-xs font-semibold px-3 py-1 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-agro-green inline-block" />
                Live on Agmarknet · 18 states covered
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-heading text-4xl md:text-6xl font-extrabold leading-[1.1] mb-6">
              {headlineWords.map((line, i) => (
                <motion.span
                  key={i}
                  className={`block ${line.color}`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + i * 0.12,
                    ease: 'easeOut',
                  }}
                >
                  {line.text}
                </motion.span>
              ))}
            </h1>

            {/* Body */}
            <motion.p
              className="text-agro-muted text-lg leading-relaxed mb-8 max-w-lg"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65, ease: 'easeOut' }}
            >
              AgroChain connects farmers directly to verified buyers. See live mandi prices, list your crop, and get paid — no middlemen, no guesswork.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-wrap gap-3 mb-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8, ease: 'easeOut' }}
            >
              <button
                onClick={() => navigate('/signup')}
                className="bg-agro-green text-white font-semibold rounded-xl px-8 py-4 hover:bg-agro-green-mid active:scale-95 transition-all cursor-pointer text-base"
              >
                Start as Farmer 🌾
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="bg-agro-amber text-white font-semibold rounded-xl px-8 py-4 hover:opacity-90 active:scale-95 transition-all cursor-pointer text-base"
              >
                Find Crops as Buyer
              </button>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              className="flex flex-wrap gap-6 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              {['Govt. Price Data', 'Verified Buyers Only', 'Free for Farmers'].map((t, i) => (
                <span key={i} className="text-xs text-agro-muted flex items-center gap-1">
                  <span className="text-agro-green">✅</span> {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right column — Mock dashboard card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="hidden lg:block"
          >
            <div className="bg-white rounded-3xl shadow-xl border border-agro-border p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-agro-text text-sm">Today's Mandi Prices</span>
                <span className="inline-flex items-center gap-1.5 bg-agro-green-light text-agro-green text-xs px-2 py-0.5 rounded-full font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-agro-green inline-block animate-pulse" />
                  Live
                </span>
              </div>

              {/* Price rows */}
              <PriceRow emoji="🧅" crop="Onion" mandi="Nashik Mandi" mandiPrice="₹1,820/q" agroPrice="₹2,050/q" gain="+12%" />
              <PriceRow emoji="🌾" crop="Wheat" mandi="Pune Mandi" mandiPrice="₹2,140/q" agroPrice="₹2,380/q" gain="+11%" />
              <PriceRow emoji="🍅" crop="Tomato" mandi="Mumbai Mandi" mandiPrice="₹890/q" agroPrice="₹1,020/q" gain="+15%" />
              <PriceRow emoji="🌽" crop="Maize" mandi="Kolhapur Mandi" mandiPrice="₹1,450/q" agroPrice="₹1,580/q" gain="+9%" isLast />

              {/* Bottom CTA */}
              <div className="bg-agro-green rounded-xl p-4 mt-4 flex justify-between items-center">
                <span className="text-white text-sm font-medium">Ready to sell your crop?</span>
                <button
                  onClick={() => navigate('/signup')}
                  className="bg-white text-agro-green text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-agro-green-light transition-all cursor-pointer active:scale-95"
                >
                  List Now →
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════ STATS BAR ════════ */}
      <section className="bg-agro-green py-14">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem end={12000} suffix="+" label="Farmers Onboarded" />
          <StatItem end={2.4} prefix="₹" suffix=" Cr" label="Saved vs Mandi Price" decimals={1} showDivider />
          <StatItem end={340} suffix="+" label="Verified Buyers" showDivider />
          <StatItem end={18} label="States Covered" showDivider />
        </div>
      </section>

      {/* ════════ HOW IT WORKS ════════ */}
      <section id="how-it-works" className="bg-agro-bg-alt py-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-agro-green-light text-agro-green text-xs font-semibold px-3 py-1 rounded-full mb-6">
              Simple 3-step process
            </span>
            <h2 className="font-heading text-4xl font-bold text-agro-text mb-4">
              From Farm to Payment<br />in 3 Steps
            </h2>
            <p className="text-agro-muted text-base">
              No paperwork, no brokers, no waiting
            </p>
          </div>

          {/* Dashed connector line — desktop only */}
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-8 right-8 border-t-2 border-dashed border-agro-border -translate-y-1/2 z-0" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              <StepCard
                icon="🌱"
                step={1}
                title="List Your Crop"
                description="Upload crop name, quantity, quality grade and your asking price. Add a photo straight from your phone."
                benefits={['Live price suggestion', 'Instant listing', 'Visible to 340+ buyers']}
                delay={0}
              />
              <StepCard
                icon="📊"
                step={2}
                title="Compare & Accept"
                description="See real Agmarknet mandi prices alongside buyer offers. Pick the best deal with full information."
                benefits={['Live mandi data', 'Direct buyer chat', 'No hidden commission']}
                delay={0.15}
              />
              <StepCard
                icon="💰"
                step={3}
                title="Ship & Get Paid"
                description="Confirm the order, track your shipment with QR codes, receive payment directly to your bank."
                benefits={['QR tracking', 'Razorpay direct payout', 'Full receipt & history']}
                delay={0.3}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
