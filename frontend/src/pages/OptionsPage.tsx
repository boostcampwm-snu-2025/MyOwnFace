import { useNavigate } from 'react-router-dom'
import { shallow } from 'zustand/shallow'
import { useFlowStore } from '../store/flow'
import type { FlowOptions } from '../types'

const optionDefs = [
  { key: 'tpo', label: 'TPO', choices: { daily: '데일리', office: '오피스', date: '데이트', event: '이벤트' } },
  { key: 'mood', label: '분위기', choices: { balanced: '차분', fresh: '청량', bold: '선명' } },
  { key: 'style', label: '스타일', choices: { modern: '모던', classic: '클래식', glow: '글로우', bold: '볼드' } },
  { key: 'tone', label: '톤', choices: { neutral: '뉴트럴', warm: '웜', cool: '쿨' } },
]

const OptionsPage = () => {
  const navigate = useNavigate()
  const { options, setOptions, applyOptions, loading, tutorial } = useFlowStore(
    (s) => ({
      options: s.options,
      setOptions: s.setOptions,
      applyOptions: s.applyOptions,
      loading: s.loading,
      tutorial: s.tutorial.detailed,
    }),
    shallow
  )

  const handleChange = (key: keyof FlowOptions, value: string) => setOptions({ [key]: value } as Partial<FlowOptions>)

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">6) 옵션 기반 상세 튜토리얼 (선택)</p>
          <h2>TPO / 분위기 / 스타일 / 톤</h2>
        </div>
        <div className="actions">
          <button className="primary ghost" onClick={() => navigate('/tutorial/basic')}>
            기본 튜토리얼로 돌아가기
          </button>
          <button className="primary" onClick={applyOptions} disabled={loading}>
            {loading ? '적용 중...' : '옵션 적용'}
          </button>
        </div>
      </div>
      <div className="options-grid">
        {optionDefs.map((opt) => (
          <label key={opt.key} className="select">
            <span>{opt.label}</span>
            <select value={(options as any)[opt.key]} onChange={(e) => handleChange(opt.key as keyof FlowOptions, e.target.value)}>
              {Object.entries(opt.choices).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
      <p className="hint">옵션을 변경 후 적용하면 상세 튜토리얼과 추천이 갱신됩니다. 이 단계는 건너뛰어도 됩니다.</p>
      {tutorial.length ? (
        <div className="steps detailed" style={{ marginTop: 12 }}>
          {tutorial.map((step, idx) => (
            <div key={step.title} className="step-card">
              <div className="step-index">STEP {idx + 1}</div>
              <p className="step-title">{step.title}</p>
              <p className="step-detail">{step.detail}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="muted">옵션을 적용하면 상세 튜토리얼이 여기에 표시됩니다.</p>
      )}
      <div className="next-row">
        <button className="primary" onClick={() => navigate('/ads')}>
          다음: 추천/광고
        </button>
      </div>
    </section>
  )
}

export default OptionsPage
