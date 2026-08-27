import { Cpu, FlaskConical, UploadCloud, Globe2, Clock, Database, Tag, ShieldCheck } from 'lucide-react'
import StatCard from '../../components/StatCard.jsx'
import Panel from '../../components/Panel.jsx'
import Workflow from '../../components/Workflow.jsx'
import { hospitals, flWorkflowSteps } from '../../data/sampleData.js'

const myHospital = hospitals[0]

export default function HospitalDashboard() {
  return (
    <div className="page-grid">
      <div className="stat-grid">
        <StatCard icon={Cpu} label="Current Round" value={myHospital.flRound} tone="primary" />
        <StatCard icon={FlaskConical} label="Local Training" value="Training" tone="pending" hint="In Progress" />
        <StatCard icon={UploadCloud} label="Model Update" value="Ready" tone="success" hint="Up to date" />
        <StatCard icon={Globe2} label="Global Model" value="Received" tone="success" hint="Synced" />
      </div>

      <Panel title="Federated Learning Workflow">
        <Workflow steps={flWorkflowSteps} />
      </Panel>

      <div className="two-col">
        <Panel title="Training Progress">
          <span className="progress-label">Progress — {myHospital.trainingProgress}%</span>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${myHospital.trainingProgress}%` }} />
          </div>
          <div className="detail-stat-grid" style={{ marginTop: 18, gridTemplateColumns: '1fr' }}>
            <div className="detail-stat" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Clock size={13} /> Estimated Time Remaining
              </span>
              <span className="value">00:15:30</span>
            </div>
          </div>
        </Panel>

        <Panel title="System Information">
          <ul className="activity-feed" style={{ gap: 16 }}>
            <li className="activity-item">
              <span className="activity-icon activity-info"><Clock size={14} /></span>
              <div className="activity-text">
                <p>Last Update</p>
                <span>2 min ago</span>
              </div>
            </li>
            <li className="activity-item">
              <span className="activity-icon activity-success"><Database size={14} /></span>
              <div className="activity-text">
                <p>Data Records</p>
                <span>{myHospital.patients.toLocaleString()}</span>
              </div>
            </li>
            <li className="activity-item">
              <span className="activity-icon activity-info"><Tag size={14} /></span>
              <div className="activity-text">
                <p>Model Version</p>
                <span>v2.1.0</span>
              </div>
            </li>
          </ul>
        </Panel>
      </div>

      <div className="secure-note">
        <ShieldCheck size={18} />
        Your patient data is secure and never leaves your hospital.
      </div>
    </div>
  )
}
