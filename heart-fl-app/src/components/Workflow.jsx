import { ChevronRight } from 'lucide-react'

const circleClasses = ['wf-c1', 'wf-c2', 'wf-c3', 'wf-c4']

export default function Workflow({ steps, footer }) {
  return (
    <div>
      <div className="workflow-numbered">
        {steps.map((step, idx) => (
          <div className="workflow-numbered-step-wrap" key={step.id} style={{ display: 'flex', alignItems: 'flex-start', flex: 1 }}>
            <div className="workflow-numbered-step">
              <div className={`workflow-numbered-circle ${circleClasses[idx % circleClasses.length]}`}>
                {step.id}
              </div>
              <strong>{step.label}</strong>
              {step.description && <span className="wf-desc">{step.description}</span>}
              {step.status && <span className={`wf-status status-${step.statusTone || 'progress'}`}>{step.status}</span>}
            </div>
            {idx < steps.length - 1 && <ChevronRight size={18} className="workflow-numbered-arrow" />}
          </div>
        ))}
      </div>

      {footer && (
        <div className="workflow-footer">
          <div className="workflow-footer-row">
            <strong>{footer.label}</strong>
            {footer.value !== undefined && <span>{footer.value}%</span>}
          </div>
          {footer.value !== undefined && (
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${footer.value}%` }} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
