import Panel from '../../components/Panel.jsx'
import { patientPredictionHistory } from '../../data/sampleData.js'

export default function PredictionHistory() {
  return (
    <div className="page-grid">
      <Panel title="Prediction History" subtitle="Your past demo predictions">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Result</th>
              <th>Confidence</th>
            </tr>
          </thead>
          <tbody>
            {patientPredictionHistory.map((row) => (
              <tr key={row.id}>
                <td>{row.date}</td>
                <td>
                  <span
                    className={`tag ${
                      row.result === 'Low Risk'
                        ? 'tag-success'
                        : row.result === 'Moderate Risk'
                        ? 'tag-pending'
                        : 'tag-danger'
                    }`}
                  >
                    {row.result}
                  </span>
                </td>
                <td>{row.confidence}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  )
}
