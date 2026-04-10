import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-agro-text py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Col 1 — Brand */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🌾</span>
            <span className="font-heading text-xl font-bold text-white">AgroChain</span>
          </div>
          <p className="text-gray-400 text-sm mt-2 max-w-xs leading-relaxed">
            Transparent agricultural supply chain for every Indian farmer.
          </p>
        </div>

        {/* Col 2 — Quick Links */}
        <div>
          <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-3 font-semibold">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#how-it-works" className="text-gray-300 text-sm hover:text-white transition-colors">How it Works</a></li>
            <li><a href="#farmers" className="text-gray-300 text-sm hover:text-white transition-colors">For Farmers</a></li>
            <li><a href="#buyers" className="text-gray-300 text-sm hover:text-white transition-colors">For Buyers</a></li>
            <li><Link to="/login" className="text-gray-300 text-sm hover:text-white transition-colors">Login</Link></li>
          </ul>
        </div>

        {/* Col 3 — Contact */}
        <div>
          <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-3 font-semibold">Contact</h4>
          <p className="text-gray-300 text-sm mb-1">support@agrochain.in</p>
          <p className="text-gray-300 text-sm">Built for Bharat 🇮🇳</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto border-t border-white/10 mt-8 pt-6 text-center">
        <p className="text-gray-500 text-xs">© 2025 AgroChain. All rights reserved.</p>
      </div>
    </footer>
  )
}
