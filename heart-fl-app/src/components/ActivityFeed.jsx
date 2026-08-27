import { CheckCircle2, Clock, Info, AlertTriangle } from 'lucide-react'

const iconMap = {
  success: { icon: CheckCircle2, className: 'activity-success' },
  pending: { icon: Clock, className: 'activity-pending' },
  info: { icon: Info, className: 'activity-info' },
  warning: { icon: AlertTriangle, className: 'activity-warning' },
}

export default function ActivityFeed({ items }) {
  return (
    <ul className="activity-feed">
      {items.map((item) => {
        const meta = iconMap[item.type] || iconMap.info
        const Icon = meta.icon
        return (
          <li key={item.id} className="activity-item">
            <span className={`activity-icon ${meta.className}`}>
              <Icon size={15} />
            </span>
            <div className="activity-text">
              <p>{item.text}</p>
              <span>{item.time}</span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
