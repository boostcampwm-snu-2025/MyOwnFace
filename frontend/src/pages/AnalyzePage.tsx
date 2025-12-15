import { useNavigate } from 'react-router-dom'
import { shallow } from 'zustand/shallow'
import { useFlowStore } from '../store/flow'

const AnalyzePage = () => {
  const navigate = useNavigate()
  const { preview, analysis, loading, error, runAnalysis } = useFlowStore(
    (s) => ({
      preview: s.preview,
      analysis: s.analysis,
      loading: s.loading,
      error: s.error,
      runAnalysis: s.runAnalysis,
    }),
    shallow
  )

  return (
    <section className="panel analysis">
      <div className="panel-header">
        <div>
          <p className="eyebrow">4) 얼굴 랜드마크 분석</p>
          <h2>face-api 68p 기반 특징 추출</h2>
        </div>
        <div className="actions">
          <button className="primary ghost" onClick={() => navigate('/upload')}>
            사진 다시 올리기
          </button>
          <button className="primary" disabled={!preview || loading} onClick={runAnalysis}>
            {loading ? '분석 중...' : '분석 실행'}
          </button>
        </div>
      </div>
      {!preview && <p className="muted">먼저 사진을 업로드해 주세요.</p>}
      {preview && (
        <div className="preview">
          <img src={preview} alt="업로드한 얼굴" />
          <div className="preview-meta">
            <p>준비 완료</p>
            <p className="meta">분석 버튼을 눌러 랜드마크를 추출합니다.</p>
          </div>
        </div>
      )}
      {error && <div className="error">{error}</div>}
      {analysis && (
        <>
          <div className="feature-grid">
            <div className="feature-card">
              <p className="label">얼굴형</p>
              <p className="value">{analysis.faceShape}</p>
            </div>
            <div className="feature-card">
              <p className="label">눈</p>
              <p className="value">
                {analysis.eyes.size} / {analysis.eyes.spacing}
              </p>
            </div>
            <div className="feature-card">
              <p className="label">코</p>
              <p className="value">
                {analysis.nose.length} / {analysis.nose.width}
              </p>
            </div>
            <div className="feature-card">
              <p className="label">입술</p>
              <p className="value">{analysis.lips.fullness}</p>
            </div>
            <div className="feature-card">
              <p className="label">대칭</p>
              <p className="value">{analysis.symmetry === 'balanced' ? '균형' : '약간 비대칭'}</p>
            </div>
          </div>
          <div className="chips">
            <span>Face shape: {analysis.faceShape}</span>
            <span>Eyes: {analysis.eyes.size}</span>
            <span>Eye spacing: {analysis.eyes.spacing}</span>
            <span>Nose: {analysis.nose.length}</span>
            <span>Lips: {analysis.lips.fullness}</span>
          </div>
          <div className="next-row">
            <button className="primary" onClick={() => navigate('/tutorial/basic')}>
              다음: 기본 튜토리얼
            </button>
          </div>
        </>
      )}
    </section>
  )
}

export default AnalyzePage
