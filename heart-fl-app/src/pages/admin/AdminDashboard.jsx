import { Building2, Users2, Cpu, ShieldCheck, AlertCircle } from 'lucide-react'
import StatCard from '../../components/StatCard.jsx'
import Panel from '../../components/Panel.jsx'
import Workflow from '../../components/Workflow.jsx'
import DonutChart from '../../components/DonutChart.jsx'
import { hospitals, globalModelStats, flWorkflowSteps, systemNotifications } from '../../data/sampleData.js'

export default function AdminDashboard({ onNavigate }) {
  const activeClients = hospitals.filter((h) => h.status !== 'idle').length

  const donutSegments = [
    { label: 'Accuracy', value: globalModelStats.accuracy, color: 'var(--purple-600)' },
    { label: 'Precision', value: globalModelStats.precision, color: 'var(--success)' },
    { label: 'Recall', value: globalModelStats.recall, color: 'var(--pending)' },
    { label: 'F1-Score', value: globalModelStats.f1, color: 'var(--danger)' },
  ]

  return (
    <div className="page-grid">
      <div className="stat-grid">
        <StatCard
          icon={Building2}
          label="Total Hospitals"
          value={hospitals.length + 15}
          hint="+2 this month"
          hintTone="success"
        />
        <StatCard
          icon={Users2}
          label="Active Clients"
          value={activeClients + 13}
          hint="Online"
          hintTone="success"
        />
        <StatCard icon={Cpu} label="Current FL Round" value={globalModelStats.round} tone="pending" hint="In Progress" />
        <StatCard
          icon={ShieldCheck}
          label="Global Model Status"
          value="Updated"
          tone="primary"
          hint={globalModelStats.lastAggregated}
        />
      </div>

      <div className="three-col">
        <Panel
          title="Hospital Status"
          actions={<span className="panel-link" onClick={() => onNavigate && onNavigate('hospitals')}>View All Hospitals</span>}
        >
          <table className="data-table">
            <thead>
              <tr>
                <th>Hospital ID</th>
                <th>Status</th>
                <th>Round</th>
              </tr>
            </thead>
            <tbody>
              {hospitals.map((h) => (
                <tr key={h.id}>
                  <td>{h.id}</td>
                  <td>
                    <span className={`tag ${h.status === 'connected' ? 'tag-success' : h.status === 'training' ? 'tag-pending' : 'tag-neutral'}`}>
                      {h.status === 'connected' ? 'Completed' : h.status === 'training' ? 'Training' : 'Idle'}
                    </span>
                  </td>
                  <td>{h.flRound}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel title="Federated Learning Process">
          <Workflow steps={flWorkflowSteps} footer={{ label: `Round ${globalModelStats.round} in progress`, value: 76 }} />
        </Panel>

        <Panel title="Performance Overview" actions={<span className="panel-link">View Detailed Report</span>}>
          <DonutChart
            segments={donutSegments}
            centerLabel={`${globalModelStats.accuracy}%`}
            centerSub="Accuracy"
          />
        </Panel>
      </div>

      <Panel title="System Notifications">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {systemNotifications.map((n) => (
            <div className="notification-row" key={n.id}>
              <div className="notification-row-left">
                <span className="dot" />
                <AlertCircle size={15} style={{ color: 'var(--text-muted)' }} />
                {n.text}
              </div>
              <time>{n.time}</time>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  )
}
