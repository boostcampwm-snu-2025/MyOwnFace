import { useNavigate } from 'react-router-dom'
import { shallow } from 'zustand/shallow'
import { useFlowStore } from '../store/flow'

const AdsPage = () => {
  const navigate = useNavigate()
  const recommendations = useFlowStore((s) => s.recommendations, shallow)

  return (
    <section className="panel recommendations">
      <div className="panel-header">
        <div>
          <p className="eyebrow">7) 화장품 추천/광고</p>
          <h2>개인화 기초 · 색조 추천</h2>
        </div>
        <div className="actions">
          <button className="primary ghost" onClick={() => navigate('/tutorial/basic')}>
            튜토리얼 다시 보기
          </button>
          <button className="primary" onClick={() => navigate('/upload')}>
            새 얼굴로 다시 시작
          </button>
        </div>
      </div>
      {recommendations.base.length || recommendations.color.length ? (
        <div className="rec-grid">
          <div>
            <p className="label">기초 제품</p>
            <ul>
              {recommendations.base.map((rec) => (
                <li key={rec.name}>
                  <strong>{rec.name}</strong>
                  <span>{rec.reason}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label">색조 제품</p>
            <ul>
              {recommendations.color.map((rec) => (
                <li key={rec.name}>
                  <strong>{rec.name}</strong>
                  <span>{rec.reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="muted">분석과 튜토리얼을 완료하면 추천이 표시됩니다.</p>
      )}
    </section>
  )
}

export default AdsPage
