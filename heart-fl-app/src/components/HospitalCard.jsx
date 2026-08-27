import { Building2, Wifi, WifiOff, Loader2 } from 'lucide-react'

const statusMeta = {
  connected: { label: 'Connected', className: 'tag-success', icon: Wifi },
  training: { label: 'Training', className: 'tag-pending', icon: Loader2 },
  idle: { label: 'Idle', className: 'tag-neutral', icon: WifiOff },
}

export default function HospitalCard({ hospital, onView }) {
  const meta = statusMeta[hospital.status] || statusMeta.idle
  const StatusIcon = meta.icon

  return (
    <div className="hospital-card">
      <div className="hospital-card-top">
        <div className="hospital-card-icon">
          <Building2 size={20} />
        </div>
        <span className={`tag ${meta.className}`}>
          <StatusIcon size={13} />
          {meta.label}
        </span>
      </div>

      <h3>{hospital.name}</h3>
      <p className="hospital-card-id">{hospital.id} · {hospital.city}</p>

      <div className="hospital-card-stats">
        <div>
          <span className="label">FL Round</span>
          <span className="value">{hospital.flRound}</span>
        </div>
        <div>
          <span className="label">Patients</span>
          <span className="value">{hospital.patients.toLocaleString()}</span>
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${hospital.trainingProgress}%` }} />
      </div>
      <span className="progress-label">{hospital.trainingProgress}% training progress</span>

      <button className="btn btn-outline btn-block" onClick={() => onView(hospital.id)}>
        View Hospital
      </button>
    </div>
  )
}
