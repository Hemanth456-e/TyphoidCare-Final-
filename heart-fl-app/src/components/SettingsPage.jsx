import { useState } from 'react'
import Panel from './Panel.jsx'

export default function SettingsPage({ userEmail, roleLabel }) {
  const [notifications, setNotifications] = useState(true)
  const [twoFactor, setTwoFactor] = useState(false)
  const [saved, setSaved] = useState(false)

  function handleSave(e) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="page-grid">
      <Panel title="Account" subtitle={`Signed in as ${roleLabel}`}>
        <form className="settings-form" onSubmit={handleSave}>
          <label className="field">
            <span className="field-label">Email</span>
            <div className="field-input">
              <input type="text" defaultValue={userEmail} readOnly />
            </div>
          </label>
          <label className="field">
            <span className="field-label">Display Name</span>
            <div className="field-input">
              <input type="text" placeholder="Enter a display name" />
            </div>
          </label>

          <div className="settings-toggle-row">
            <div>
              <strong>Email notifications</strong>
              <p>Receive updates about activity relevant to your role.</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
              <span className="switch-slider" />
            </label>
          </div>

          <div className="settings-toggle-row">
            <div>
              <strong>Two-factor authentication</strong>
              <p>Add an extra step when signing in (demo only).</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={twoFactor}
                onChange={(e) => setTwoFactor(e.target.checked)}
              />
              <span className="switch-slider" />
            </label>
          </div>

          <button type="submit" className="btn btn-primary">
            {saved ? 'Saved ✓' : 'Save changes'}
          </button>
        </form>
      </Panel>
    </div>
  )
}
