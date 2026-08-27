import { useState } from 'react'
import {
  LayoutDashboard,
  Building2,
  Radar,
  Globe2,
  LineChart,
  Users as UsersIcon,
  Settings as SettingsIcon,
  LogOut,
  FlaskConical,
  UploadCloud,
  Activity,
  HeartPulse,
  ClipboardList,
  Info,
  UserCircle,
} from 'lucide-react'

import Login from './components/Login.jsx'
import Shell from './components/Shell.jsx'
import SettingsPage from './components/SettingsPage.jsx'

import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import Hospitals from './pages/admin/Hospitals.jsx'
import HospitalDetail from './pages/admin/HospitalDetail.jsx'
import FLMonitoring from './pages/admin/FLMonitoring.jsx'
import GlobalModel from './pages/admin/GlobalModel.jsx'
import Performance from './pages/admin/Performance.jsx'
import Users from './pages/admin/Users.jsx'

import HospitalDashboard from './pages/hospital/HospitalDashboard.jsx'
import LocalTraining from './pages/hospital/LocalTraining.jsx'
import ModelUpdates from './pages/hospital/ModelUpdates.jsx'
import FLActivity from './pages/hospital/FLActivity.jsx'
import GlobalModelView from './pages/hospital/GlobalModelView.jsx'

import PatientDashboard from './pages/patient/PatientDashboard.jsx'
import Prediction from './pages/patient/Prediction.jsx'
import PredictionHistory from './pages/patient/PredictionHistory.jsx'
import AboutProject from './pages/patient/AboutProject.jsx'
import Profile from './pages/patient/Profile.jsx'

const ROLE_LABELS = {
  admin: 'Admin',
  hospital: 'Hospital / Client',
  patient: 'User / Patient',
}

const ADMIN_NAV = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'hospitals', label: 'Hospitals', icon: Building2 },
  { key: 'fl-monitoring', label: 'FL Monitoring', icon: Radar },
  { key: 'global-model', label: 'Global Model', icon: Globe2 },
  { key: 'performance', label: 'Performance', icon: LineChart },
  { key: 'users', label: 'Users', icon: UsersIcon },
  { key: 'settings', label: 'Settings', icon: SettingsIcon },
  { key: 'logout', label: 'Logout', icon: LogOut, danger: true },
]

const HOSPITAL_NAV = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'local-training', label: 'Local Training', icon: FlaskConical },
  { key: 'model-updates', label: 'Model Updates', icon: UploadCloud },
  { key: 'fl-activity', label: 'FL Activity', icon: Activity },
  { key: 'global-model', label: 'Global Model', icon: Globe2 },
  { key: 'settings', label: 'Settings', icon: SettingsIcon },
  { key: 'logout', label: 'Logout', icon: LogOut, danger: true },
]

const PATIENT_NAV = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'prediction', label: 'Prediction', icon: HeartPulse },
  { key: 'history', label: 'Prediction History', icon: ClipboardList },
  { key: 'about', label: 'About Project', icon: Info },
  { key: 'profile', label: 'Profile', icon: UserCircle },
  { key: 'settings', label: 'Settings', icon: SettingsIcon },
  { key: 'logout', label: 'Logout', icon: LogOut, danger: true },
]

const PAGE_TITLES = {
  dashboard: { title: 'Dashboard' },
  hospitals: { title: 'Hospitals', subtitle: 'All hospitals connected to the federation' },
  'fl-monitoring': { title: 'FL Monitoring', subtitle: 'Live federated learning status' },
  'global-model': { title: 'Global Model' },
  performance: { title: 'Performance', subtitle: 'Model metrics across training rounds' },
  users: { title: 'Users' },
  settings: { title: 'Settings' },
  'local-training': { title: 'Local Training' },
  'model-updates': { title: 'Model Updates' },
  'fl-activity': { title: 'FL Activity' },
  prediction: { title: 'Prediction', subtitle: 'Estimate heart disease risk from patient data' },
  history: { title: 'Prediction History' },
  about: { title: 'About Project' },
  profile: { title: 'Profile' },
  'hospital-detail': { title: 'Hospital Details' },
}

export default function App() {
  const [user, setUser] = useState(null) // { email, role }
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [selectedHospitalId, setSelectedHospitalId] = useState(null)

  function handleLogin({ email, role }) {
    setUser({ email, role })
    setCurrentPage('dashboard')
    setSelectedHospitalId(null)
  }

  function handleLogout() {
    setUser(null)
    setCurrentPage('dashboard')
    setSelectedHospitalId(null)
  }

  function handleNavigate(key) {
    if (key === 'logout') {
      handleLogout()
      return
    }
    setCurrentPage(key)
  }

  function handleViewHospital(hospitalId) {
    setSelectedHospitalId(hospitalId)
    setCurrentPage('hospital-detail')
  }

  if (!user) {
    return <Login onLogin={handleLogin} />
  }

  const navByRole = {
    admin: ADMIN_NAV,
    hospital: HOSPITAL_NAV,
    patient: PATIENT_NAV,
  }
  const sidebarItems = navByRole[user.role]
  const pageMeta = PAGE_TITLES[currentPage] || { title: 'Dashboard' }
  const theme = user.role === 'patient' ? 'purple' : 'navy'

  return (
    <Shell
      sidebarItems={sidebarItems}
      activePage={currentPage}
      onNavigate={handleNavigate}
      roleLabel={ROLE_LABELS[user.role]}
      title={pageMeta.title}
      subtitle={pageMeta.subtitle}
      userEmail={user.email}
      theme={theme}
    >
      {user.role === 'admin' && renderAdminPage(currentPage, { selectedHospitalId, handleViewHospital, setCurrentPage, onNavigate: setCurrentPage })}
      {user.role === 'hospital' && renderHospitalPage(currentPage)}
      {user.role === 'patient' && renderPatientPage(currentPage, user, setCurrentPage)}

      {currentPage === 'settings' && (
        <SettingsPage userEmail={user.email} roleLabel={ROLE_LABELS[user.role]} />
      )}
    </Shell>
  )
}

function renderAdminPage(page, { selectedHospitalId, handleViewHospital, setCurrentPage, onNavigate }) {
  switch (page) {
    case 'dashboard':
      return <AdminDashboard onNavigate={onNavigate} />
    case 'hospitals':
      return <Hospitals onViewHospital={handleViewHospital} />
    case 'hospital-detail':
      return (
        <HospitalDetail hospitalId={selectedHospitalId} onBack={() => setCurrentPage('hospitals')} />
      )
    case 'fl-monitoring':
      return <FLMonitoring />
    case 'global-model':
      return <GlobalModel />
    case 'performance':
      return <Performance />
    case 'users':
      return <Users />
    default:
      return null
  }
}

function renderHospitalPage(page) {
  switch (page) {
    case 'dashboard':
      return <HospitalDashboard />
    case 'local-training':
      return <LocalTraining />
    case 'model-updates':
      return <ModelUpdates />
    case 'fl-activity':
      return <FLActivity />
    case 'global-model':
      return <GlobalModelView />
    default:
      return null
  }
}

function renderPatientPage(page, user, setCurrentPage) {
  switch (page) {
    case 'dashboard':
      return <PatientDashboard onNavigate={setCurrentPage} />
    case 'prediction':
      return <Prediction />
    case 'history':
      return <PredictionHistory />
    case 'about':
      return <AboutProject />
    case 'profile':
      return <Profile userEmail={user.email} />
    default:
      return null
  }
}
