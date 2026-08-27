export default function Panel({ title, subtitle, actions, children, className = '' }) {
  return (
    <section className={`panel ${className}`}>
      {(title || actions) && (
        <div className="panel-header">
          <div>
            {title && <h2>{title}</h2>}
            {subtitle && <p>{subtitle}</p>}
          </div>
          {actions && <div className="panel-actions">{actions}</div>}
        </div>
      )}
      <div className="panel-body">{children}</div>
    </section>
  )
}
