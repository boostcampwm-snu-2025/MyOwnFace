import Dropzone from 'react-dropzone'
import { useNavigate } from 'react-router-dom'
import { shallow } from 'zustand/shallow'
import { useFlowStore } from '../store/flow'

const UploadPage = () => {
  const navigate = useNavigate()
  const { preview, setPreview } = useFlowStore(
    (s) => ({
      preview: s.preview,
      setPreview: s.setPreview,
    }),
    shallow
  )

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <section className="panel upload">
      <div className="panel-header">
        <div>
          <p className="eyebrow">3) 사진 업로드</p>
          <h2>얼굴 사진 업로드</h2>
        </div>
        <button className="primary" disabled={!preview} onClick={() => navigate('/analyze')}>
          다음: 얼굴 분석
        </button>
      </div>
      <Dropzone accept={{ 'image/*': [] }} multiple={false} onDrop={onDrop}>
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div className={`dropzone ${isDragActive ? 'active' : ''}`} {...getRootProps()}>
            <input {...getInputProps()} />
            <p>얼굴이 잘 나온 정면 사진을 올려주세요.</p>
            <p className="hint">안경/모자 없이 자연광에서 촬영된 사진이 가장 좋습니다.</p>
          </div>
        )}
      </Dropzone>
      {preview && (
        <div className="preview">
          <img src={preview} alt="업로드한 얼굴" />
          <div className="preview-meta">
            <p>업로드 완료</p>
            <p className="meta">다음 단계에서 랜드마크 분석을 진행합니다.</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default UploadPage
