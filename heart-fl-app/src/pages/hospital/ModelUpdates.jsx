import { UploadCloud, CheckCircle2 } from 'lucide-react'
import Panel from '../../components/Panel.jsx'
import { hospitals } from '../../data/sampleData.js'

const myHospital = hospitals[0]

export default function ModelUpdates() {
  return (
    <div className="page-grid">
      <Panel
        title="Model Update Status"
        subtitle="Weight updates from this hospital's most recent local training run"
      >
        <div className="detail-stat-grid">
          <div className="detail-stat">
            <span className="label">Current Round</span>
            <span className="value">{myHospital.flRound}</span>
          </div>
          <div className="detail-stat">
            <span className="label">Update Status</span>
            <span className="value capitalize">{myHospital.modelUpdate}</span>
          </div>
          <div className="detail-stat">
            <span className="label">Global Model</span>
            <span className="value">{myHospital.globalModel}</span>
          </div>
        </div>

        <button className="btn btn-primary">
          <UploadCloud size={16} /> Upload Model Weights
        </button>
      </Panel>

      <Panel title="Update History">
        <ul className="activity-feed">
          <li className="activity-item">
            <span className="activity-icon activity-success">
              <CheckCircle2 size={15} />
            </span>
            <div className="activity-text">
              <p>Round 11 weights synced with global aggregator</p>
              <span>1 day ago</span>
            </div>
          </li>
          <li className="activity-item">
            <span className="activity-icon activity-success">
              <CheckCircle2 size={15} />
            </span>
            <div className="activity-text">
              <p>Round 10 weights synced with global aggregator</p>
              <span>2 days ago</span>
            </div>
          </li>
        </ul>
      </Panel>
    </div>
  )
}
