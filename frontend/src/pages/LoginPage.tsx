import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Stubbed auth: just route to home
    navigate('/')
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">1) 로그인 / 회원가입</p>
          <h2>{mode === 'login' ? '로그인' : '회원가입'}</h2>
        </div>
        <div className="toggle">
          <button className={`chip-button ${mode === 'login' ? 'on' : ''}`} onClick={() => setMode('login')}>
            로그인
          </button>
          <button className={`chip-button ${mode === 'signup' ? 'on' : ''}`} onClick={() => setMode('signup')}>
            회원가입
          </button>
        </div>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          <span>이메일</span>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </label>
        <label>
          <span>비밀번호</span>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        </label>
        <p className="hint">데모 계정이므로 아무 이메일과 비밀번호를 입력해도 진행됩니다.</p>
        <button className="primary" type="submit">
          {mode === 'login' ? '로그인 후 홈으로' : '회원가입 후 홈으로'}
        </button>
      </form>
    </section>
  )
}

export default LoginPage
