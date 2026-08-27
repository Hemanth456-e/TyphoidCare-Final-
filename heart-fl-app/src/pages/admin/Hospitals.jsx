import HospitalCard from '../../components/HospitalCard.jsx'
import { hospitals } from '../../data/sampleData.js'

export default function Hospitals({ onViewHospital }) {
  return (
    <div className="page-grid">
      <div className="card-grid">
        {hospitals.map((h) => (
          <HospitalCard key={h.id} hospital={h} onView={onViewHospital} />
        ))}
      </div>
    </div>
  )
}
