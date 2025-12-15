import {
  BrowserRouter,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import AnalyzePage from "./pages/AnalyzePage";
import TutorialBasicPage from "./pages/TutorialBasicPage";
import OptionsPage from "./pages/OptionsPage";
import AdsPage from "./pages/AdsPage";
import { shallow } from "zustand/shallow";
import { useFlowStore } from "./store/flow";
import "./App.css";

const steps = [
  { label: "로그인", path: "/login" },
  { label: "홈", path: "/" },
  { label: "사진 업로드", path: "/upload" },
  { label: "얼굴 분석", path: "/analyze" },
  { label: "기본 튜토리얼", path: "/tutorial/basic" },
  { label: "옵션 상세", path: "/tutorial/options", optional: true },
  { label: "추천/광고", path: "/ads" },
];

const FlowNav = () => {
  const location = useLocation();
  return (
    <nav className="flow-nav">
      {steps.map((step) => (
        <NavLink
          key={step.path}
          to={step.path}
          className={({ isActive }) =>
            `flow-step ${isActive ? "active" : ""} ${
              step.optional ? "optional" : ""
            }`
          }
        >
          {step.label}
          {step.optional && <span className="optional-tag">옵션</span>}
          {location.pathname === step.path && <span className="indicator" />}
        </NavLink>
      ))}
    </nav>
  );
};

const Shell = () => {
  const reset = useFlowStore((s) => s.reset, shallow);
  return (
    <div className="page">
      <header className="topbar">
        <div>
          <p className="eyebrow">내 얼굴을 위한 맞춤형 메이크업 튜토리얼</p>
          <h1>MyOwnFace</h1>
        </div>
        <button className="primary ghost" onClick={reset}>
          플로우 리셋
        </button>
      </header>
      <FlowNav />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/analyze" element={<AnalyzePage />} />
        <Route path="/tutorial/basic" element={<TutorialBasicPage />} />
        <Route path="/tutorial/options" element={<OptionsPage />} />
        <Route path="/ads" element={<AdsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}

export default App;
