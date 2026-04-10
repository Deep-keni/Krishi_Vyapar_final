import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import FarmerDashboard from './pages/FarmerDashboard'
import BuyerDashboard from './pages/BuyerDashboard'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/farmer-dashboard"
          element={
            <ProtectedRoute>
              <FarmerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buyer-dashboard"
          element={
            <ProtectedRoute>
              <BuyerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
