import { HeartPulse, Building2, ShieldCheck, Cpu } from 'lucide-react'
import Panel from '../../components/Panel.jsx'

export default function AboutProject() {
  return (
    <div className="page-grid">
      <Panel title="About CardioFed">
        <p className="muted-text">
          CardioFed is a heart disease risk prediction platform built on federated learning.
          Instead of pooling patient data into one central database, each hospital trains a model
          locally and only shares the resulting model updates, which are combined into a shared
          global model.
        </p>
      </Panel>

      <div className="stat-grid">
        <div className="info-tile">
          <Building2 size={20} />
          <strong>Multiple Hospitals</strong>
          <span>Several hospitals contribute to one shared model.</span>
        </div>
        <div className="info-tile">
          <ShieldCheck size={20} />
          <strong>Privacy First</strong>
          <span>Raw patient records never leave their hospital.</span>
        </div>
        <div className="info-tile">
          <Cpu size={20} />
          <strong>Federated Learning</strong>
          <span>Only model weights are exchanged between rounds.</span>
        </div>
        <div className="info-tile">
          <HeartPulse size={20} />
          <strong>Risk Estimation</strong>
          <span>Patients get a fast, informative risk estimate.</span>
        </div>
      </div>

      <Panel title="Disclaimer">
        <p className="muted-text">
          This is a demo interface. Predictions are illustrative only, do not use real patient
          data, and should never be treated as medical advice or a diagnosis.
        </p>
      </Panel>
    </div>
  )
}
