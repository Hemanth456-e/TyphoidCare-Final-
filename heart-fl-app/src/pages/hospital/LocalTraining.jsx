import { useState } from 'react'
import { Play, Loader2 } from 'lucide-react'
import Panel from '../../components/Panel.jsx'
import { localTrainingLog, hospitals } from '../../data/sampleData.js'

const myHospital = hospitals[0]

export default function LocalTraining() {
  const [isTraining, setIsTraining] = useState(false)
  const [progress, setProgress] = useState(myHospital.trainingProgress)

  function startTraining() {
    if (isTraining) return
    setIsTraining(true)
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          setIsTraining(false)
          return 100
        }
        return p + 10
      })
    }, 300)
  }

  return (
    <div className="page-grid">
      <Panel
        title="Local Training"
        subtitle="Train the model on this hospital's local patient data (demo simulation)"
        actions={
          <button className="btn btn-primary" onClick={startTraining} disabled={isTraining}>
            {isTraining ? <Loader2 size={16} className="spin" /> : <Play size={16} />}
            {isTraining ? 'Training…' : 'Start Local Training'}
          </button>
        }
      >
        <span className="progress-label">Progress — {progress}%</span>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="muted-text">
          This demo simulates a local training epoch. No real model training occurs and no data
          leaves your browser.
        </p>
      </Panel>

      <Panel title="Training History">
        <table className="data-table">
          <thead>
            <tr>
              <th>Round</th>
              <th>Epochs</th>
              <th>Accuracy</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {localTrainingLog.map((row) => (
              <tr key={row.id}>
                <td>Round {row.round}</td>
                <td>{row.epoch}</td>
                <td>{row.accuracy}%</td>
                <td>{row.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  )
}
