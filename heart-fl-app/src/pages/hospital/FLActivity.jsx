import Panel from '../../components/Panel.jsx'
import ActivityFeed from '../../components/ActivityFeed.jsx'
import Workflow from '../../components/Workflow.jsx'
import { recentActivity, flWorkflowSteps } from '../../data/sampleData.js'

export default function FLActivity() {
  return (
    <div className="page-grid">
      <Panel title="Federated Learning Workflow">
        <Workflow steps={flWorkflowSteps} activeStep={2} />
      </Panel>
      <Panel title="Activity Log">
        <ActivityFeed items={recentActivity} />
      </Panel>
    </div>
  )
}
