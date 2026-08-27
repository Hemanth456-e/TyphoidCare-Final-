import Panel from '../../components/Panel.jsx'
import Workflow from '../../components/Workflow.jsx'
import { hospitals, flWorkflowSteps, globalModelStats } from '../../data/sampleData.js'

export default function FLMonitoring() {
  return (
    <div className="page-grid">
      <Panel title="Federated Learning Workflow" subtitle={`Round ${globalModelStats.round} · ${globalModelStats.status}`}>
        <Workflow steps={flWorkflowSteps} activeStep={3} />
      </Panel>

      <Panel title="Client Training Status">
        <table className="data-table">
          <thead>
            <tr>
              <th>Hospital</th>
              <th>FL Round</th>
              <th>Local Training</th>
              <th>Model Update</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {hospitals.map((h) => (
              <tr key={h.id}>
                <td>
                  <strong>{h.name}</strong>
                  <div className="table-subtext">{h.id}</div>
                </td>
                <td>{h.flRound}</td>
                <td className="capitalize">{h.localTraining}</td>
                <td className="capitalize">{h.modelUpdate}</td>
                <td>
                  <div className="progress-bar table-progress">
                    <div className="progress-bar-fill" style={{ width: `${h.trainingProgress}%` }} />
                  </div>
                  <span className="progress-label">{h.trainingProgress}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  )
}
