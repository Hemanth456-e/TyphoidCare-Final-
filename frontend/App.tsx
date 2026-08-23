import { Navigate, Route, Routes } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'
import HospitalDashboard from './pages/HospitalDashboard'
import Login from './pages/Login'
import PatientDashboard from './pages/PatientDashboard'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/hospital" element={<HospitalDashboard />} />
      <Route path="/user" element={<PatientDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
