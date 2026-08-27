export default function StatCard({ icon: Icon, label, value, tone = 'default', hint, hintTone }) {
  return (
    <div className={`stat-card tone-${tone}`}>
      <div className="stat-card-top-row">
        <span className="stat-card-label">{label}</span>
        <div className="stat-card-icon">
          <Icon size={19} />
        </div>
      </div>
      <div className="stat-card-body">
        <span className="stat-card-value">{value}</span>
        {hint && <span className={`stat-card-hint ${hintTone ? `hint-${hintTone}` : ''}`}>{hint}</span>}
      </div>
    </div>
  )
}
