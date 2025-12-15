import { useNavigate } from 'react-router-dom'
import { shallow } from 'zustand/shallow'
import { useFlowStore } from '../store/flow'

const TutorialBasicPage = () => {
  const navigate = useNavigate()
  const tutorial = useFlowStore((s) => s.tutorial.basic, shallow)

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">5) 기본 튜토리얼</p>
          <h2>Base → Eye → Lip 핵심 단계</h2>
        </div>
        <div className="actions">
          <button className="primary ghost" onClick={() => navigate('/tutorial/options')}>
            옵션 튜토리얼로 이동
          </button>
          <button className="primary" onClick={() => navigate('/ads')}>
            다음: 추천/광고
          </button>
        </div>
      </div>
      {tutorial.length ? (
        <div className="steps detailed">
          {tutorial.map((step, idx) => (
            <div key={step.title} className="step-card">
              <div className="step-index">STEP {idx + 1}</div>
              <p className="step-title">{step.title}</p>
              <p className="step-detail">{step.detail}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="muted">얼굴 분석을 완료하면 기본 튜토리얼이 생성됩니다.</p>
      )}
    </section>
  )
}

export default TutorialBasicPage
