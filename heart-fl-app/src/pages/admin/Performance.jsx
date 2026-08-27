import Panel from '../../components/Panel.jsx'
import { performanceHistory } from '../../data/sampleData.js'

const metrics = [
  { key: 'accuracy', label: 'Accuracy', className: 'bar-accuracy' },
  { key: 'precision', label: 'Precision', className: 'bar-precision' },
  { key: 'recall', label: 'Recall', className: 'bar-recall' },
  { key: 'f1', label: 'F1-Score', className: 'bar-f1' },
]

export default function Performance() {
  return (
    <div className="page-grid">
      <Panel title="Model Performance Trend" subtitle="Across the last 5 federated learning rounds">
        <div className="chart">
          {performanceHistory.map((row) => (
            <div className="chart-group" key={row.round}>
              <div className="chart-bars">
                {metrics.map((m) => (
                  <div key={m.key} className="chart-bar-wrap" title={`${m.label}: ${row[m.key]}%`}>
                    <div
                      className={`chart-bar ${m.className}`}
                      style={{ height: `${row[m.key]}%` }}
                    />
                  </div>
                ))}
              </div>
              <span className="chart-round-label">R{row.round}</span>
            </div>
          ))}
        </div>

        <div className="chart-legend">
          {metrics.map((m) => (
            <span key={m.key} className="chart-legend-item">
              <span className={`chart-legend-dot ${m.className}`} />
              {m.label}
            </span>
          ))}
        </div>
      </Panel>

      <Panel title="Round-by-Round Detail">
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
                <td>Round {row.round}</td>
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
