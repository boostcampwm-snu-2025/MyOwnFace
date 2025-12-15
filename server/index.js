const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const faceShapeTips = {
  oval: '광대 중심에 자연스러운 컨투어, 턱 라인은 얇게 정리',
  round: '볼 중심에서 관자 방향으로 컨투어, 콧대/턱 끝에 하이라이터',
  square: '관자와 턱선 음영으로 각진 부분 부드럽게, 블러셔는 사선',
  heart: '헤어라인과 광대 상단 음영, 턱 끝은 가볍게 강조',
  long: '이마와 턱에 짧은 컨투어, 볼 중앙에 동그랗게 블러셔',
  diamond: '광대는 소프트하게, 이마와 턱 끝 하이라이터로 균형',
};

const eyeStyle = (eyes = {}) => {
  const { size = 'medium', spacing = 'balanced' } = eyes;
  if (size === 'large') return '눈두덩에 매트 브라운을 넓게, 애교살은 은은하게';
  if (size === 'small') return '쌍꺼풀 라인 위로 음영을 살짝 높게, 언더는 미세 펄로 확장';
  if (spacing === 'wide') return '앞머리와 앞꼬리 음영을 진하게, 아이라인은 안쪽부터 채우기';
  if (spacing === 'narrow') return '아이라인은 뒤로 길게 빼고, 앞머리는 옅게';
  return '중간 톤 음영으로 깊이감, 점막 가까이 아이라인으로 깔끔하게';
};

const lipStyle = (lips = {}) => {
  const { fullness = 'medium' } = lips;
  if (fullness === 'full') return '립 라인은 블러 처리, 글로스로 입체감 유지';
  if (fullness === 'thin') return '오버립으로 산을 부드럽게, 세미매트 포뮬러';
  return '그라데이션 후 중앙에만 광택을 올려 균형 잡기';
};

const baseRoutine = (faceShape = 'oval') => [
  { title: '1단계: 피부 준비', detail: '약산성 클렌저 후 수분 앰플 + 촉촉한 프라이머' },
  { title: '2단계: 결 보정', detail: '얇은 리퀴드 파운데이션을 브러시로 펴 바르고 스펀지로 결 정리' },
  { title: '3단계: 윤곽 & 혈색', detail: `${faceShapeTips[faceShape] || faceShapeTips.oval}, 블러셔는 눈동자 아래 45도 방향` },
];

const eyeRoutine = (eyes = {}, style = 'daily') => {
  const moodTone = style === 'bold' ? '딥 브라운/버건디' : style === 'fresh' ? '살몬/코랄' : '뉴트럴 브라운';
  return [
    { title: '4단계: 아이 베이스', detail: '아이 프라이머로 유분 고정, 눈두덩에 베이지 매트 섀도' },
    { title: '5단계: 음영 & 라인', detail: `${eyeStyle(eyes)}. 포인트 컬러는 ${moodTone}로 눈꼬리를 감싸기` },
    { title: '6단계: 속눈썹', detail: '집게로 뿌리 컬 고정 후 마스카라는 뿌리-중간-끝 순서' },
  ];
};

const lipRoutine = (lips = {}, tone = 'neutral') => {
  const palette = tone === 'cool' ? '로지/베리' : tone === 'warm' ? '코랄/오렌지 브라운' : '누드/로즈';
  return [
    { title: '7단계: 립 베이스', detail: '립밤으로 보습 후 티슈로 한 번 눌러 유분 정리' },
    { title: '8단계: 쉐이프', detail: lipStyle(lips) },
    { title: '9단계: 컬러', detail: `메인 컬러는 ${palette}, 가장자리 블러 후 중앙은 톤온톤 글로스로 입체감` },
  ];
};

const detailedAddOn = (options = {}) => {
  const { tpo = 'daily', mood = 'balanced', style = 'modern' } = options;
  const tpoTip =
    tpo === 'office'
      ? '과한 광택 대신 세미매트, 하이라이터는 눈썹뼈와 콧대만'
      : tpo === 'date'
        ? '광대 위 하이라이터로 볼륨, 언더 점막은 핑크 계열로 은은하게'
        : tpo === 'event'
          ? '포인트 컬러는 한 곳에만, 글리터는 눈 앞머리/언더 중앙에 소량'
          : '수분광 프라이머와 크림 블러셔로 가볍게';
  const moodTip =
    mood === 'fresh'
      ? '블러셔를 볼 중앙에 동그랗게, 언더는 파스텔 톤으로 맑게'
      : mood === 'bold'
        ? '아이라인 도톰, 립은 채도 높은 단일 컬러로 깔끔하게'
        : '음영은 소프트하게, 립은 MLBB 계열 그라데이션';
  const styleTip =
    style === 'classic'
      ? '아이라인은 점막을 채우고 짧게, 콧대 하이라이터로 정돈'
      : style === 'glow'
        ? '리퀴드 하이라이터를 광대-코-입술산 C존에 연결'
        : '매트와 글로시 질감을 믹스해 입체감 강조';
  return [
    { title: '옵션 보강: TPO', detail: tpoTip },
    { title: '옵션 보강: 분위기', detail: moodTip },
    { title: '옵션 보강: 스타일', detail: styleTip },
  ];
};

const recommendProducts = (features = {}, options = {}) => {
  const tone = options.tone || 'neutral';
  const base = [
    {
      name: '수분 프라이머',
      reason: '피부 결을 매끈하게 정리하고 베이스 지속력 향상',
    },
    {
      name: '얇은 세럼 파운데이션',
      reason: '두껍지 않게 커버하면서 광을 살려줌',
    },
    {
      name: '크림 블러셔',
      reason: '파우더리하게 무너지는 것을 방지하고 생기 유지',
    },
  ];

  const color = [
    {
      name: tone === 'cool' ? '로즈 모브 립' : tone === 'warm' ? '살몬 코랄 립' : '말린 장미 립',
      reason: '톤에 맞는 채도로 얼굴 전체 색 균형을 맞춤',
    },
    {
      name: options.style === 'bold' ? '딥 브라운 섀도 팔레트' : '뉴트럴 브라운 팔레트',
      reason: '눈매 음영을 잡고 분위기를 맞춤',
    },
    {
      name: features?.eyes?.size === 'small' ? '롱래쉬 마스카라' : '볼륨 마스카라',
      reason: '눈매 비율에 맞게 속눈썹 볼륨/길이를 조정',
    },
  ];

  return { base, color };
};

app.post('/api/analyze', (req, res) => {
  const { features = {}, options = {} } = req.body || {};

  if (!features || !features.faceShape) {
    return res.status(400).json({ message: 'features.faceShape is required from the client analysis' });
  }

  const tutorial = {
    basic: [...baseRoutine(features.faceShape), ...eyeRoutine(features.eyes, options.style), ...lipRoutine(features.lips, options.tone)],
    detailed: [...baseRoutine(features.faceShape), ...eyeRoutine(features.eyes, options.style), ...lipRoutine(features.lips, options.tone), ...detailedAddOn(options)],
  };

  const recommendations = recommendProducts(features, options);

  res.json({ tutorial, recommendations });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`MyOwnFace backend running on http://localhost:${PORT}`);
});
