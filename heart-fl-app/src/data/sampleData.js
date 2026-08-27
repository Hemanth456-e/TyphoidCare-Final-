// All data in this file is static demo/sample data.
// There is no backend, database, or live ML/FL system wired up.

export const hospitals = [
  {
    id: 'HOSP-001',
    name: 'City Heart Hospital',
    city: 'Chennai',
    status: 'connected',
    flRound: 12,
    localTraining: 'completed',
    modelUpdate: 'synced',
    globalModel: 'up to date',
    trainingProgress: 100,
    patients: 4210,
    lastActive: '2 min ago',
  },
  {
    id: 'HOSP-002',
    name: 'Apollo Care Center',
    city: 'Bengaluru',
    status: 'training',
    flRound: 12,
    localTraining: 'in progress',
    modelUpdate: 'pending',
    globalModel: 'up to date',
    trainingProgress: 64,
    patients: 3860,
    lastActive: 'just now',
  },
  {
    id: 'HOSP-003',
    name: 'Unity Medical',
    city: 'Hyderabad',
    status: 'idle',
    flRound: 11,
    localTraining: 'queued',
    modelUpdate: 'outdated',
    globalModel: '1 round behind',
    trainingProgress: 0,
    patients: 2975,
    lastActive: '18 min ago',
  },
]

export const globalModelStats = {
  version: 'v2.3.12',
  round: 12,
  status: 'aggregating',
  accuracy: 91.4,
  precision: 89.7,
  recall: 90.2,
  f1: 89.9,
  lastAggregated: '4 minutes ago',
  participants: 3,
}

export const recentActivity = [
  { id: 1, text: 'City Heart Hospital completed local training for round 12', time: '2 min ago', type: 'success' },
  { id: 2, text: 'Apollo Care Center uploaded partial model weights', time: '6 min ago', type: 'pending' },
  { id: 3, text: 'Global model aggregation started for round 12', time: '9 min ago', type: 'info' },
  { id: 4, text: 'Unity Medical missed sync window, marked idle', time: '18 min ago', type: 'warning' },
  { id: 5, text: 'Round 11 global model published (F1 89.1%)', time: '1 hr ago', type: 'success' },
]

export const flWorkflowSteps = [
  { id: 1, label: 'Local Training', description: 'Train model on local data', status: 'In Progress', statusTone: 'progress' },
  { id: 2, label: 'Model Update', description: 'Upload model updates', status: 'Ready', statusTone: 'ready' },
  { id: 3, label: 'FedAvg', description: 'Aggregate model updates', status: 'In Progress', statusTone: 'active' },
  { id: 4, label: 'Global Model', description: 'Receive global model', status: 'Completed', statusTone: 'done' },
]

export const systemNotifications = [
  { id: 1, text: 'Round 12 aggregation completed from 3 hospitals.', time: '2 min ago' },
  { id: 2, text: 'Unity Medical missed its sync window for round 11.', time: '18 min ago' },
  { id: 3, text: 'New hospital "Unity Medical" onboarded to the federation.', time: '1 day ago' },
]

export const performanceHistory = [
  { round: 8, accuracy: 86.1, precision: 84.0, recall: 85.2, f1: 84.6 },
  { round: 9, accuracy: 87.4, precision: 85.6, recall: 86.5, f1: 86.0 },
  { round: 10, accuracy: 88.9, precision: 87.1, recall: 87.9, f1: 87.5 },
  { round: 11, accuracy: 90.2, precision: 88.5, recall: 89.4, f1: 88.9 },
  { round: 12, accuracy: 91.4, precision: 89.7, recall: 90.2, f1: 89.9 },
]

export const adminUsers = [
  { id: 1, name: 'A. Ramanathan', email: 'a.ramanathan@cardiofed.io', role: 'Admin', status: 'active' },
  { id: 2, name: 'City Heart Hospital', email: 'ops@cityheart.example', role: 'Hospital', status: 'active' },
  { id: 3, name: 'Apollo Care Center', email: 'ops@apollocare.example', role: 'Hospital', status: 'active' },
  { id: 4, name: 'Unity Medical', email: 'ops@unitymedical.example', role: 'Hospital', status: 'inactive' },
  { id: 5, name: 'Priya S.', email: 'priya.s@example.com', role: 'Patient', status: 'active' },
]

export const patientPredictionHistory = [
  { id: 1, date: '2026-08-18', result: 'Low Risk', confidence: 82 },
  { id: 2, date: '2026-07-02', result: 'Moderate Risk', confidence: 67 },
  { id: 3, date: '2026-05-14', result: 'Low Risk', confidence: 88 },
]

export const localTrainingLog = [
  { id: 1, round: 12, epoch: '5 / 5', accuracy: 90.8, time: '2 min ago' },
  { id: 2, round: 11, epoch: '5 / 5', accuracy: 89.6, time: '1 day ago' },
  { id: 3, round: 10, epoch: '5 / 5', accuracy: 88.1, time: '2 days ago' },
]
