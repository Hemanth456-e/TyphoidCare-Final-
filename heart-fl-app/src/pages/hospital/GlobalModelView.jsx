import { Percent, Target, Crosshair, Gauge } from 'lucide-react'
import StatCard from '../../components/StatCard.jsx'
import Panel from '../../components/Panel.jsx'
import { globalModelStats } from '../../data/sampleData.js'

export default function GlobalModelView() {
  return (
    <div className="page-grid">
      <div className="stat-grid">
        <StatCard icon={Percent} label="Accuracy" value={`${globalModelStats.accuracy}%`} tone="success" />
        <StatCard icon={Target} label="Precision" value={`${globalModelStats.precision}%`} />
        <StatCard icon={Crosshair} label="Recall" value={`${globalModelStats.recall}%`} />
        <StatCard icon={Gauge} label="F1-Score" value={`${globalModelStats.f1}%`} />
      </div>

      <Panel title="Global Model" subtitle={`${globalModelStats.version} · last aggregated ${globalModelStats.lastAggregated}`}>
        <p className="muted-text">
          This is the current shared model produced by combining encrypted updates from every
          hospital in the federation, including this one. Your local patient data is never
          uploaded or shared.
        </p>
      </Panel>
    </div>
  )
}
