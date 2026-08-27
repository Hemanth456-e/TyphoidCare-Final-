import { Cpu, Percent, Target, Crosshair, Gauge } from 'lucide-react'
import StatCard from '../../components/StatCard.jsx'
import Panel from '../../components/Panel.jsx'
import { globalModelStats, performanceHistory } from '../../data/sampleData.js'

export default function GlobalModel() {
  const latest = performanceHistory[performanceHistory.length - 1]

  return (
    <div className="page-grid">
      <div className="stat-grid">
        <StatCard icon={Cpu} label="Model Version" value={globalModelStats.version} tone="primary" />
        <StatCard icon={Gauge} label="Current Round" value={globalModelStats.round} tone="pending" />
        <StatCard icon={Percent} label="Accuracy" value={`${latest.accuracy}%`} tone="success" />
        <StatCard icon={Target} label="Participants" value={globalModelStats.participants} />
      </div>

      <Panel title="Global Model Status" subtitle={`Last aggregated ${globalModelStats.lastAggregated}`}>
        <p className="muted-text">
          The global model is produced by aggregating encrypted weight updates from each connected
          hospital. Raw patient data never leaves a hospital's local environment.
        </p>
        <div className="detail-stat-grid">
          <div className="detail-stat">
            <span className="label">Status</span>
            <span className="value capitalize">{globalModelStats.status}</span>
          </div>
          <div className="detail-stat">
            <span className="label">Precision</span>
            <span className="value">{globalModelStats.precision}%</span>
          </div>
          <div className="detail-stat">
            <span className="label">Recall</span>
            <span className="value">{globalModelStats.recall}%</span>
          </div>
          <div className="detail-stat">
            <span className="label">F1-Score</span>
            <span className="value">{globalModelStats.f1}%</span>
          </div>
        </div>
      </Panel>

      <Panel title="Performance by Round">
        <table className="data-table">
          <thead>
            <tr>
              <th>Round</th>
              <th>Accuracy</th>
              <th>Precision</th>
              <th>Recall</th>
              <th>F1-Score</th>
            </tr>
          </thead>
          <tbody>
            {performanceHistory.map((row) => (
              <tr key={row.round}>
                <td>{row.round}</td>
                <td>{row.accuracy}%</td>
                <td>{row.precision}%</td>
                <td>{row.recall}%</td>
                <td>{row.f1}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  )
}
