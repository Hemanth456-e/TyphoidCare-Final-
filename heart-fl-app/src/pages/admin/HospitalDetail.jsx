import { ArrowLeft, Building2 } from 'lucide-react'
import Panel from '../../components/Panel.jsx'
import Workflow from '../../components/Workflow.jsx'
import ActivityFeed from '../../components/ActivityFeed.jsx'
import { hospitals, flWorkflowSteps, recentActivity } from '../../data/sampleData.js'

export default function HospitalDetail({ hospitalId, onBack }) {
  const hospital = hospitals.find((h) => h.id === hospitalId)

  if (!hospital) {
    return (
      <div className="page-grid">
        <Panel title="Hospital not found">
          <button className="btn btn-outline" onClick={onBack}>
            <ArrowLeft size={16} /> Back to Hospitals
          </button>
        </Panel>
      </div>
    )
  }

  const hospitalActivity = recentActivity.filter((a) => a.text.includes(hospital.name))
  const activityToShow = hospitalActivity.length ? hospitalActivity : recentActivity.slice(0, 2)

  return (
    <div className="page-grid">
      <button className="btn btn-ghost back-btn" onClick={onBack}>
        <ArrowLeft size={16} /> Back to Hospitals
      </button>

      <Panel>
        <div className="detail-header">
          <div className="hospital-card-icon">
            <Building2 size={22} />
          </div>
          <div>
            <h2 className="detail-title">{hospital.name}</h2>
            <p className="detail-subtitle">{hospital.id} · {hospital.city}</p>
          </div>
          <span className={`tag ${hospital.status === 'connected' ? 'tag-success' : hospital.status === 'training' ? 'tag-pending' : 'tag-neutral'}`}>
            {hospital.status}
          </span>
        </div>

        <div className="detail-stat-grid">
          <div className="detail-stat">
            <span className="label">FL Round</span>
            <span className="value">{hospital.flRound}</span>
          </div>
          <div className="detail-stat">
            <span className="label">Local Training</span>
            <span className="value">{hospital.localTraining}</span>
          </div>
          <div className="detail-stat">
            <span className="label">Model Update</span>
            <span className="value">{hospital.modelUpdate}</span>
          </div>
          <div className="detail-stat">
            <span className="label">Global Model</span>
            <span className="value">{hospital.globalModel}</span>
          </div>
        </div>

        <div>
          <span className="progress-label">Training progress — {hospital.trainingProgress}%</span>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${hospital.trainingProgress}%` }} />
          </div>
        </div>
      </Panel>

      <div className="two-col">
        <Panel title="Federated Learning Workflow">
          <Workflow steps={flWorkflowSteps} activeStep={hospital.status === 'training' ? 1 : 3} />
        </Panel>
        <Panel title="Recent Activity">
          <ActivityFeed items={activityToShow} />
        </Panel>
      </div>
    </div>
  )
}
