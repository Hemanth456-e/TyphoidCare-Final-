import { useState } from 'react'
import { HeartPulse, ShieldCheck, Sparkles, Stethoscope } from 'lucide-react'
import Panel from '../../components/Panel.jsx'

// The 12 heart disease types this demo can suggest between, once the risk
// screen above flags that heart disease is likely present.
const DISEASE_TYPES = [
  {
    key: 'cad',
    name: 'Coronary Artery Disease',
    blurb: 'Narrowed coronary arteries reducing blood flow to the heart muscle.',
  },
  {
    key: 'angina',
    name: 'Angina Pectoris',
    blurb: 'Chest pain caused by reduced oxygen supply to the heart.',
  },
  {
    key: 'mi',
    name: 'Myocardial Infarction (Heart Attack)',
    blurb: 'Heart muscle damage from a blocked blood supply.',
  },
  {
    key: 'arrhythmia',
    name: 'Arrhythmia',
    blurb: 'An irregular heart rhythm — too fast, too slow, or erratic.',
  },
  {
    key: 'afib',
    name: 'Atrial Fibrillation',
    blurb: 'A rapid, irregular beating of the heart\u2019s upper chambers.',
  },
  {
    key: 'chf',
    name: 'Congestive Heart Failure',
    blurb: 'The heart struggles to pump blood efficiently around the body.',
  },
  {
    key: 'cardiomyopathy',
    name: 'Cardiomyopathy',
    blurb: 'Disease of the heart muscle that affects its size, shape or ability to pump.',
  },
  {
    key: 'valvular',
    name: 'Valvular Heart Disease',
    blurb: 'One or more heart valves not opening or closing properly.',
  },
  {
    key: 'congenital',
    name: 'Congenital Heart Disease',
    blurb: 'A heart structural condition present from birth.',
  },
  {
    key: 'pericarditis',
    name: 'Pericarditis',
    blurb: 'Inflammation of the thin sac surrounding the heart.',
  },
  {
    key: 'myocarditis',
    name: 'Myocarditis',
    blurb: 'Inflammation of the heart muscle itself.',
  },
  {
    key: 'rheumatic',
    name: 'Rheumatic Heart Disease',
    blurb: 'Heart valve damage caused by earlier rheumatic fever.',
  },
]

const initialForm = {
  age: '',
  sex: '',
  chestPainType: '',
  restingBP: '',
  cholesterol: '',
  fastingBloodSugar: '',
  restingECG: '',
  maxHeartRate: '',
  angina: '',
  stDepression: '',
  slope: '',
  vessels: '',
  thalassemia: '',
}

// Purely local, illustrative scoring heuristic — NOT a real medical model.
// This exists only so the demo UI has something to react to.
function computeDemoRisk(form) {
  let score = 0
  const age = Number(form.age) || 0
  const bp = Number(form.restingBP) || 0
  const chol = Number(form.cholesterol) || 0
  const maxHr = Number(form.maxHeartRate) || 0
  const stDep = Number(form.stDepression) || 0
  const vessels = Number(form.vessels) || 0

  if (age > 55) score += 15
  else if (age > 40) score += 8

  if (bp > 140) score += 15
  else if (bp > 120) score += 8

  if (chol > 240) score += 15
  else if (chol > 200) score += 8

  if (maxHr && maxHr < 120) score += 8
  if (stDep > 2) score += 10
  if (vessels > 0) score += vessels * 6

  if (form.fastingBloodSugar === 'yes') score += 8
  if (form.angina === 'yes') score += 12
  if (form.chestPainType === 'asymptomatic') score += 10
  if (form.thalassemia === 'reversible') score += 10

  score = Math.min(score, 96)

  let label = 'Low Risk'
  if (score >= 60) label = 'High Risk'
  else if (score >= 32) label = 'Moderate Risk'

  return { score, label }
}

// Purely local, illustrative heuristic for suggesting which of the 12 demo
// disease types is the closest match, once the risk screen above flags
// heart disease as likely. NOT a real diagnostic model — just a set of
// weighted rules over the same form fields, so the UI has a type to show.
function computeDemoDiseaseType(form) {
  const age = Number(form.age) || 0
  const bp = Number(form.restingBP) || 0
  const chol = Number(form.cholesterol) || 0
  const maxHr = Number(form.maxHeartRate) || 0
  const stDep = Number(form.stDepression) || 0
  const vessels = Number(form.vessels) || 0

  const points = {
    cad: 0,
    angina: 0,
    mi: 0,
    arrhythmia: 0,
    afib: 0,
    chf: 0,
    cardiomyopathy: 0,
    valvular: 0,
    congenital: 0,
    pericarditis: 0,
    myocarditis: 0,
    rheumatic: 0,
  }

  // Coronary Artery Disease
  points.cad += vessels * 10
  if (chol > 240) points.cad += 10
  if (age > 50) points.cad += 8
  if (form.chestPainType === 'typical' || form.chestPainType === 'atypical') points.cad += 8
  if (form.thalassemia === 'reversible') points.cad += 10
  if (form.slope === 'flat' || form.slope === 'downsloping') points.cad += 8

  // Angina Pectoris
  if (form.chestPainType === 'typical' || form.chestPainType === 'atypical') points.angina += 15
  if (form.angina === 'yes') points.angina += 15
  if (stDep > 1) points.angina += 8
  if (form.slope === 'flat') points.angina += 6

  // Myocardial Infarction
  if (form.chestPainType === 'asymptomatic') points.mi += 10
  if (stDep > 2) points.mi += 15
  if (form.thalassemia === 'fixed') points.mi += 12
  if (form.restingECG === 'st-t-abnormality') points.mi += 10
  if (vessels >= 2) points.mi += 10

  // Arrhythmia
  if (form.restingECG === 'lv-hypertrophy') points.arrhythmia += 12
  if (form.restingECG === 'st-t-abnormality') points.arrhythmia += 8
  if (maxHr && (maxHr < 100 || maxHr > 180)) points.arrhythmia += 10
  if (age > 60) points.arrhythmia += 6

  // Atrial Fibrillation
  if (age > 65) points.afib += 12
  if (form.restingECG !== 'normal') points.afib += 8
  if (maxHr && maxHr < 110) points.afib += 8
  if (bp > 140) points.afib += 8

  // Congestive Heart Failure
  if (maxHr && maxHr < 120) points.chf += 15
  if (bp > 150) points.chf += 8
  if (vessels > 2) points.chf += 10
  if (age > 60) points.chf += 8
  if (form.fastingBloodSugar === 'yes') points.chf += 6

  // Cardiomyopathy
  if (form.thalassemia === 'fixed' || form.thalassemia === 'reversible') points.cardiomyopathy += 10
  if (form.restingECG === 'lv-hypertrophy') points.cardiomyopathy += 15
  if (maxHr && maxHr < 120) points.cardiomyopathy += 8

  // Valvular Heart Disease
  if (form.restingECG === 'lv-hypertrophy') points.valvular += 10
  if (form.slope === 'downsloping') points.valvular += 8
  if (form.chestPainType === 'non-anginal') points.valvular += 6
  if (age > 50) points.valvular += 6

  // Congenital Heart Disease
  if (age > 0 && age < 30) points.congenital += 20
  if (form.restingECG !== 'normal') points.congenital += 8
  if (form.thalassemia === 'fixed') points.congenital += 8

  // Pericarditis
  if (form.chestPainType === 'non-anginal' || form.chestPainType === 'atypical') points.pericarditis += 10
  if (form.restingECG === 'st-t-abnormality') points.pericarditis += 12
  if (stDep <= 1) points.pericarditis += 6
  if (age > 0 && age < 40) points.pericarditis += 6

  // Myocarditis
  if (age > 0 && age < 40) points.myocarditis += 10
  if (form.restingECG !== 'normal') points.myocarditis += 10
  if (maxHr && maxHr > 160) points.myocarditis += 8

  // Rheumatic Heart Disease
  if (age > 0 && age < 40) points.rheumatic += 8
  if (form.restingECG === 'lv-hypertrophy') points.rheumatic += 8
  if (form.slope === 'flat') points.rheumatic += 6

  const ranked = DISEASE_TYPES
    .map((d) => ({ ...d, score: points[d.key] || 0 }))
    .sort((a, b) => b.score - a.score)

  const total = ranked.reduce((sum, d) => sum + d.score, 0) || 1
  const withConfidence = ranked.map((d) => ({
    ...d,
    confidence: Math.round((d.score / total) * 100),
  }))

  return withConfidence
}

export default function Prediction() {
  const [form, setForm] = useState(initialForm)
  const [result, setResult] = useState(null)
  const [diseaseTypes, setDiseaseTypes] = useState(null)

  function updateField(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const risk = computeDemoRisk(form)
    setResult(risk)
    setDiseaseTypes(risk.label === 'Low Risk' ? null : computeDemoDiseaseType(form))
  }

  const resultTone =
    result?.label === 'High Risk' ? 'danger' : result?.label === 'Moderate Risk' ? 'pending' : 'success'

  const confidence = result ? 100 - Math.round(result.score * 0.35) : null

  return (
    <div className="page-grid">
      <div className="two-col prediction-layout">
        <Panel title="Patient Information" subtitle="Enter patient information to get a prediction">
          <form className="prediction-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label className="field">
                <span className="field-label">Age</span>
                <div className="field-input">
                  <input
                    type="number"
                    min="18"
                    max="80"
                    required
                    value={form.age}
                    onChange={(e) => updateField('age', e.target.value)}
                    placeholder="Enter age (18-80)"
                  />
                </div>
              </label>

              <label className="field">
                <span className="field-label">Sex</span>
                <div className="field-input select-input">
                  <select required value={form.sex} onChange={(e) => updateField('sex', e.target.value)}>
                    <option value="" disabled>Select</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </div>
              </label>

              <label className="field">
                <span className="field-label">Chest Pain Type</span>
                <div className="field-input select-input">
                  <select
                    required
                    value={form.chestPainType}
                    onChange={(e) => updateField('chestPainType', e.target.value)}
                  >
                    <option value="" disabled>Select</option>
                    <option value="typical">Typical Angina</option>
                    <option value="atypical">Atypical Angina</option>
                    <option value="non-anginal">Non-Anginal Pain</option>
                    <option value="asymptomatic">Asymptomatic</option>
                  </select>
                </div>
              </label>

              <label className="field">
                <span className="field-label">Resting Blood Pressure</span>
                <div className="field-input">
                  <input
                    type="number"
                    min="85"
                    max="200"
                    required
                    value={form.restingBP}
                    onChange={(e) => updateField('restingBP', e.target.value)}
                    placeholder="Enter value (85-200 mm Hg)"
                  />
                </div>
              </label>

              <label className="field">
                <span className="field-label">Cholesterol</span>
                <div className="field-input">
                  <input
                    type="number"
                    min="100"
                    max="565"
                    required
                    value={form.cholesterol}
                    onChange={(e) => updateField('cholesterol', e.target.value)}
                    placeholder="Enter value (100-565 mg/dl)"
                  />
                </div>
              </label>

              <label className="field">
                <span className="field-label">Fasting Blood Sugar</span>
                <div className="field-input select-input">
                  <select
                    required
                    value={form.fastingBloodSugar}
                    onChange={(e) => updateField('fastingBloodSugar', e.target.value)}
                  >
                    <option value="" disabled>Select</option>
                    <option value="no">≤ 120 mg/dl</option>
                    <option value="yes">&gt; 120 mg/dl</option>
                  </select>
                </div>
              </label>

              <label className="field">
                <span className="field-label">Resting ECG</span>
                <div className="field-input select-input">
                  <select
                    required
                    value={form.restingECG}
                    onChange={(e) => updateField('restingECG', e.target.value)}
                  >
                    <option value="" disabled>Select</option>
                    <option value="normal">Normal</option>
                    <option value="st-t-abnormality">ST-T Abnormality</option>
                    <option value="lv-hypertrophy">LV Hypertrophy</option>
                  </select>
                </div>
              </label>

              <label className="field">
                <span className="field-label">Max Heart Rate</span>
                <div className="field-input">
                  <input
                    type="number"
                    min="71"
                    max="228"
                    required
                    value={form.maxHeartRate}
                    onChange={(e) => updateField('maxHeartRate', e.target.value)}
                    placeholder="Enter value (71-228)"
                  />
                </div>
              </label>

              <label className="field">
                <span className="field-label">Exercise Induced Angina</span>
                <div className="field-input select-input">
                  <select required value={form.angina} onChange={(e) => updateField('angina', e.target.value)}>
                    <option value="" disabled>Select</option>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
              </label>

              <label className="field">
                <span className="field-label">ST Depression</span>
                <div className="field-input">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="6.2"
                    required
                    value={form.stDepression}
                    onChange={(e) => updateField('stDepression', e.target.value)}
                    placeholder="Enter value (0-6.2)"
                  />
                </div>
              </label>

              <label className="field">
                <span className="field-label">Slope</span>
                <div className="field-input select-input">
                  <select required value={form.slope} onChange={(e) => updateField('slope', e.target.value)}>
                    <option value="" disabled>Select</option>
                    <option value="upsloping">Upsloping</option>
                    <option value="flat">Flat</option>
                    <option value="downsloping">Downsloping</option>
                  </select>
                </div>
              </label>

              <label className="field">
                <span className="field-label">Number of Vessels</span>
                <div className="field-input select-input">
                  <select required value={form.vessels} onChange={(e) => updateField('vessels', e.target.value)}>
                    <option value="" disabled>Select</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
              </label>

              <label className="field">
                <span className="field-label">Thalassemia</span>
                <div className="field-input select-input">
                  <select
                    required
                    value={form.thalassemia}
                    onChange={(e) => updateField('thalassemia', e.target.value)}
                  >
                    <option value="" disabled>Select</option>
                    <option value="normal">Normal</option>
                    <option value="fixed">Fixed Defect</option>
                    <option value="reversible">Reversible Defect</option>
                  </select>
                </div>
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              <HeartPulse size={16} /> Predict Heart Disease
            </button>
          </form>
        </Panel>

        <div className="prediction-side">
          <Panel title="Prediction Result">
            {result ? (
              <>
                <div className="result-hero">
                  <div className={`result-heart-ring tone-${resultTone}`}>
                    <HeartPulse size={38} />
                  </div>
                  <span className="result-label">{result.label}</span>
                  <span className="result-sub">
                    {result.label === 'Low Risk'
                      ? 'No Heart Disease Detected'
                      : result.label === 'Moderate Risk'
                      ? 'Some Risk Factors Present'
                      : 'Multiple Risk Factors Detected'}
                  </span>
                </div>

                <div className="confidence-block">
                  <div className="confidence-row">
                    <strong>Confidence Score</strong>
                    <span>{confidence}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar-fill fill-success" style={{ width: `${confidence}%` }} />
                  </div>
                </div>

                <div className="ai-disclaimer">
                  <Sparkles size={18} />
                  <div>
                    <strong>This is an AI prediction.</strong>
                    Please consult a doctor for proper diagnosis.
                  </div>
                </div>
              </>
            ) : (
              <div className="result-card empty">
                <HeartPulse size={24} />
                <span>Fill in the form and click Predict to see a result here.</span>
              </div>
            )}
          </Panel>

          {diseaseTypes && (
            <Panel
              title="Likely Heart Disease Type"
              subtitle="Top matches based on the values you entered"
            >
              <div className="disease-type-list">
                {diseaseTypes.slice(0, 3).map((d, i) => (
                  <div className="disease-type-row" key={d.key}>
                    <div className="disease-type-row-top">
                      <span className="disease-type-name">
                        {i === 0 && <Stethoscope size={15} />} {d.name}
                      </span>
                      <span className="disease-type-confidence">{d.confidence}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className={`progress-bar-fill ${i === 0 ? '' : 'fill-success'}`}
                        style={{ width: `${d.confidence}%` }}
                      />
                    </div>
                    {i === 0 && <p className="disease-type-blurb">{d.blurb}</p>}
                  </div>
                ))}
              </div>
              <div className="ai-disclaimer">
                <Sparkles size={18} />
                <div>
                  <strong>Illustrative only.</strong>
                  This demo ranks 12 possible heart disease types with a simple rule-based
                  heuristic — it is not a validated diagnostic tool. A cardiologist should
                  confirm the actual condition.
                </div>
              </div>
            </Panel>
          )}

          <Panel className="privacy-panel">
            <div className="privacy-message">
              <ShieldCheck size={20} />
              <p>
                Your inputs stay in this browser session. This demo does not send data to any
                server, hospital, or third party, and no real prediction model is connected yet.
              </p>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}
