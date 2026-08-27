import { UserCircle } from 'lucide-react'
import Panel from '../../components/Panel.jsx'

export default function Profile({ userEmail }) {
  return (
    <div className="page-grid">
      <Panel title="Profile">
        <div className="profile-header">
          <UserCircle size={56} strokeWidth={1.4} />
          <div>
            <strong>{userEmail}</strong>
            <span>User / Patient</span>
          </div>
        </div>

        <div className="form-grid">
          <label className="field">
            <span className="field-label">Full Name</span>
            <div className="field-input">
              <input type="text" placeholder="Enter your name" />
            </div>
          </label>
          <label className="field">
            <span className="field-label">Age</span>
            <div className="field-input">
              <input type="number" placeholder="e.g. 42" />
            </div>
          </label>
          <label className="field">
            <span className="field-label">Phone</span>
            <div className="field-input">
              <input type="text" placeholder="Optional" />
            </div>
          </label>
          <label className="field">
            <span className="field-label">Preferred Hospital</span>
            <div className="field-input select-input">
              <select defaultValue="">
                <option value="" disabled>
                  Select a hospital
                </option>
                <option>City Heart Hospital</option>
                <option>Apollo Care Center</option>
                <option>Unity Medical</option>
              </select>
            </div>
          </label>
        </div>

        <button className="btn btn-primary">Save Profile</button>
      </Panel>
    </div>
  )
}
