import { HeartPulse, ClipboardList, ShieldCheck } from 'lucide-react'
import StatCard from '../../components/StatCard.jsx'
import Panel from '../../components/Panel.jsx'
import { patientPredictionHistory } from '../../data/sampleData.js'

export default function PatientDashboard({ onNavigate }) {
  const latest = patientPredictionHistory[0]

  return (
    <div className="page-grid">
      <div className="stat-grid">
        <StatCard icon={HeartPulse} label="Last Result" value={latest.result} tone="success" hint={latest.date} />
        <StatCard icon={ClipboardList} label="Total Predictions" value={patientPredictionHistory.length} />
        <StatCard icon={ShieldCheck} label="Data Privacy" value="Protected" tone="primary" />
      </div>

      <Panel title="Quick Actions">
        <div className="quick-actions">
          <button className="btn btn-primary" onClick={() => onNavigate('prediction')}>
            Run a New Prediction
          </button>
          <button className="btn btn-outline" onClick={() => onNavigate('history')}>
            View Prediction History
          </button>
        </div>
      </Panel>

      <Panel title="About This Tool" subtitle="A quick note before you begin">
        <p className="muted-text">
          CardioFed estimates heart disease risk using a model trained across multiple hospitals
          without any hospital ever sharing raw patient records. Results here are demo output only
          and are not a medical diagnosis.
        </p>
      </Panel>
    </div>
  )
}
