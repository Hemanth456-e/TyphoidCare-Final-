export default function DonutChart({ segments, centerLabel, centerSub, size = 150 }) {
  const total = segments.reduce((sum, s) => sum + s.value, 0)
  const radius = size / 2 - 14
  const circumference = 2 * Math.PI * radius
  let offsetAcc = 0

  return (
    <div className="donut-wrap">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#eef0f6"
          strokeWidth={14}
        />
        {segments.map((seg, i) => {
          const fraction = seg.value / total
          const dash = fraction * circumference
          const gap = circumference - dash
          const rotation = (offsetAcc / total) * 360 - 90
          offsetAcc += seg.value
          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={14}
              strokeDasharray={`${dash} ${gap}`}
              strokeLinecap="round"
              transform={`rotate(${rotation} ${size / 2} ${size / 2})`}
            />
          )
        })}
        <text
          x="50%"
          y="47%"
          textAnchor="middle"
          fontSize="20"
          fontWeight="800"
          fill="var(--text)"
        >
          {centerLabel}
        </text>
        <text x="50%" y="60%" textAnchor="middle" fontSize="9" fill="var(--text-muted)">
          {centerSub}
        </text>
      </svg>

      <div className="donut-legend">
        {segments.map((seg, i) => (
          <div className="donut-legend-item" key={i}>
            <span className="donut-legend-dot" style={{ background: seg.color }} />
            {seg.label}
            <strong>{seg.value}%</strong>
          </div>
        ))}
      </div>
    </div>
  )
}
