import { useNavigate } from 'react-router-dom'

const steps = [
  '얼굴 사진 업로드',
  '랜드마크 분석',
  '기본 튜토리얼 확인',
  '옵션 상세 튜토리얼(선택)',
  '맞춤 제품 추천/광고',
]

const HomePage = () => {
  const navigate = useNavigate()
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">2) 홈(메인)</p>
          <h2>전체 플로우 안내</h2>
        </div>
        <button className="primary" onClick={() => navigate('/upload')}>
          사진 업로드로 이동
        </button>
      </div>
      <p className="lede">가입/로그인 후 얼굴 사진을 올리고, 분석→튜토리얼→추천까지 흐름대로 진행하세요.</p>
      <div className="steps wide">
        {steps.map((step, idx) => (
          <div key={step} className="step-card">
            <div className="step-index">STEP {idx + 1}</div>
            <p className="step-title">{step}</p>
            <p className="step-detail">
              {idx === 0 && '정면, 자연광 사진을 준비하면 정확도가 올라갑니다.'}
              {idx === 1 && 'face-api 68p 랜드마크로 얼굴형/눈/코/입 비율을 추출합니다.'}
              {idx === 2 && '기본 베이스-아이-립 순서의 핵심 단계 제공.'}
              {idx === 3 && 'TPO/분위기/스타일/톤을 반영한 더 깊은 가이드 (선택 가능).'}
              {idx === 4 && '개인 특징과 톤을 반영한 기초·색조 추천을 노출합니다.'}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HomePage
