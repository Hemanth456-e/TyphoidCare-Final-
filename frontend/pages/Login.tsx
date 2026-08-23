import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Building2,
  Eye,
  EyeOff,
  HeartPulse,
  LockKeyhole,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import { Button } from '../lib/shadcn/button'
import { Input } from '../lib/shadcn/input'
import { NativeSelect } from '../lib/shadcn/native-select'
import './styles/Login.css'

type LoginRole = 'Admin' | 'Hospital' | 'User'

const destinationByRole: Record<LoginRole, string> = {
  Admin: '/admin',
  Hospital: '/hospital',
  User: '/user',
}

function Network() {
  return (
    <div className="network" aria-hidden="true">
      <div className="ring r1" />
      <div className="ring r2" />
      <div className="heart"><HeartPulse size={118} /></div>
      <div className="hospital h1"><Building2 /><b>+</b></div>
      <div className="hospital h2"><Building2 /><b>+</b></div>
      <div className="hospital h3"><Building2 /><b>+</b></div>
      <i className="dot d1" /><i className="dot d2" /><i className="dot d3" /><i className="dot d4" />
    </div>
  )
}

export default function Login() {
  const navigate = useNavigate()
  const [role, setRole] = useState<LoginRole>('Admin')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate(destinationByRole[role])
  }

  return (
    <main className="page">
      <section className="left">
        <div className="brand">
          <div className="brandIcon"><HeartPulse /></div>
          <div><b>Heart Disease</b><span>FL System</span></div>
        </div>
        <div className="intro">
          <h1>Heart Disease</h1><h2>Federated Learning</h2>
          <p>Privacy-Preserving AI for<br />Better Healthcare</p>
          <Network />
        </div>
        <div className="safe">
          <ShieldCheck />
          <div><strong>Your data is safe.</strong><p>We use Federated Learning to<br />protect patient privacy.</p></div>
        </div>
      </section>
      <section className="right">
        <form className="card" onSubmit={handleSubmit}>
          <div className="welcome"><h2>Welcome Back</h2><p>Sign in to continue</p></div>
          <label htmlFor="username">Username or Email</label>
          <div className="field">
            <UserRound />
            <Input id="username" className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0" placeholder="Username or Email" />
          </div>
          <label htmlFor="password">Password</label>
          <div className="field">
            <LockKeyhole />
            <Input id="password" className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0" type={showPassword ? 'text' : 'password'} placeholder="Password" defaultValue="demo" />
            <Button aria-label={showPassword ? 'Hide password' : 'Show password'} className="h-auto w-auto p-0 text-muted-foreground hover:bg-transparent hover:text-foreground" type="button" variant="ghost" onClick={() => setShowPassword((visible) => !visible)}>
              {showPassword ? <EyeOff /> : <Eye />}
            </Button>
          </div>
          <div className="role">
            <label htmlFor="role">Login as</label>
            <div className="select">
              <UserRound />
              <NativeSelect id="role" className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0" value={role} onChange={(event) => setRole(event.target.value as LoginRole)}>
                <option value="Admin">Admin</option><option value="Hospital">Hospital</option><option value="User">User</option>
              </NativeSelect>
            </div>
          </div>
          <Button className="signin" type="submit">Sign In</Button>
          <Button className="forgot" type="button" variant="ghost" onClick={() => setMessage('Password recovery is a demo action.')}>Forgot password?</Button>
          {message ? <div className="msg" role="status">{message}</div> : null}
          <div className="footer">© 2025 Heart Disease FL System</div>
        </form>
      </section>
    </main>
  )
}
