# ✨ AI 기반 3D 프랙탈 아트 생성기

이 프로젝트는 사용자의 텍스트 프롬프트를 기반으로 Google Gemini AI를 사용하여 독특한 3D De Jong 프랙탈 아트, 색상 팔레트, 이름 및 스토리를 생성하는 인터랙티브 웹 애플리케이션입니다. 생성된 프랙탈은 Three.js를 사용하여 실시간으로 렌더링되며, 사용자는 다양한 파라미터를 수동으로 조작하여 자신만의 프랙탈 아트를 만들 수도 있습니다.

실행 주소 : https://dev-canvas-pi.vercel.app/

## 🌟 주요 기능

*   **AI 기반 생성**:
    *   **프랙탈 파라미터**: 사용자 프롬프트에 맞춰 De Jong 어트랙터의 파라미터 (a, b, c, d, e, f)를 생성합니다.
    *   **색상 팔레트**: 프롬프트의 분위기에 맞는 3~5가지 색상으로 구성된 팔레트를 제안합니다.
    *   **이름 및 설명**: 생성된 프랙탈에 어울리는 예술적이고 시적인 한국어 이름과 설명을 부여합니다.
    *   **애니메이션 및 입자**: 프롬프트에 따라 애니메이션 속도, 진폭 및 입자 모양을 제안합니다.
*   **인터랙티브 3D 뷰어**:
    *   Three.js를 사용하여 생성된 프랙탈을 3D 공간에서 실시간으로 시각화합니다.
    *   마우스 및 터치 제스처를 통한 직관적인 카메라 컨트롤 (회전, 확대/축소)을 지원합니다.
    *   입자 애니메이션과 부드러운 카메라 움직임으로 몰입감 있는 경험을 제공합니다.
*   **수동 제어판**:
    *   프랙탈 형태 (a-f 파라미터), 애니메이션 (속도, 진폭), 외형 (입자 크기, 입자 모양)을 세밀하게 조정할 수 있는 UI를 제공합니다.
    *   수동으로 조정한 파라미터에 대해 AI에게 새로운 이름과 설명을 요청할 수 있습니다.
    *   AI가 생성한 색상 팔레트를 시각적으로 확인할 수 있습니다.
*   **프랙탈 라이브러리**:
    *   **라이브러리에 저장**: 현재 프랙탈(이름, 설명, 파라미터, 색상, 애니메이션 설정 등)을 브라우저의 로컬 저장소에 저장합니다.
    *   **라이브러리 내보내기**: 저장된 전체 프랙탈 라이브러리를 `fractal_library_export_YYYY-MM-DD.json` 형식의 JSON 파일로 내보냅니다.
    *   **라이브러리 가져오기**: 이전에 내보낸 JSON 파일을 선택하여 프랙탈들을 현재 라이브러리로 가져옵니다. 가져온 프랙탈에는 새로운 고유 ID가 부여됩니다.
*   **API 키 관리**:
    *   사용자가 자신의 Gemini API 키를 입력하고 브라우저의 로컬 저장소에 안전하게 저장할 수 있는 기능을 제공합니다.
    *   환경 변수(`process.env.API_KEY`)를 우선적으로 사용하며, 없을 경우 로컬 저장소 또는 사용자 입력을 통해 키를 사용합니다.
*   **다양한 입자 효과**:
    *   '부드러운 구체', '사각형', '별', '반짝이' 등 다양한 입자 모양을 선택하여 프랙탈의 시각적 스타일을 변경할 수 있습니다.
*   **포스트 프로세싱**:
    *   UnrealBloomPass를 사용한 블룸 효과로 프랙탈 아트의 시각적 매력을 더합니다.
*   **반응형 디자인**:
    *   데스크톱 및 모바일 환경 모두에서 사용 가능하도록 UI가 조정됩니다.

## 🛠️ 기술 스택

*   **프론트엔드**: HTML5, CSS3 (Tailwind CSS), JavaScript (ES Modules)
*   **3D 렌더링**: Three.js
*   **AI 모델**: Google Gemini API (`@google/genai` 라이브러리 사용)

## 🚀 배포 및 실행 방법

### Vercel에서 배포하기

1. **프로젝트 복제**
   ```bash
   git clone <repository-url>
   cd 3d-fractal
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **환경 변수 설정**
   - Vercel 대시보드에서 환경 변수 `GEMINI_API_KEY` 설정


### 로컬 개발

```bash
# 개발 서버 시작
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

### 직접 실행

이 애플리케이션은 별도의 빌드 과정 없이 `index.html` 파일을 웹 브라우저에서 직접 열어 실행할 수도 있습니다.

**필수 사항: Gemini API 키**

애플리케이션의 AI 기능을 사용하기 위해서는 Google Gemini API 키가 필요합니다.

1.  **API 키 발급**:
    *   [Google AI Studio](https://aistudio.google.com/app/apikey)에 방문하여 Gemini API 키를 발급받으세요.
2.  **API 키 입력**:
    *   애플리케이션 하단의 컨트롤 바에 있는 'Gemini API 키' 입력 필드에 발급받은 키를 붙여넣습니다.
    *   '키 저장' 버튼을 클릭합니다. 키는 브라우저의 로컬 저장소에 저장되어 다음 방문 시 자동으로 로드됩니다.
    *   만약 `process.env.API_KEY` 환경 변수가 설정된 환경에서 실행 중이고 해당 키가 유효하다면, 그 키가 우선적으로 사용되며 입력 필드는 읽기 전용으로 표시됩니다.

## 🎮 사용 방법

1.  **API 키 설정**: (최초 실행 시) 위 '설정 및 실행 방법'에 따라 API 키를 입력하고 저장합니다.
2.  **AI로 프랙탈 생성**:
    *   하단 입력창에 만들고 싶은 프랙탈에 대한 설명을 한국어로 입력합니다. (예: "폭풍 속의 등대", "신비로운 밤하늘의 오로라", "고요한 새벽의 숲")
    *   ✨ **생성** 버튼을 클릭합니다.
    *   잠시 기다리면 AI가 프롬프트를 기반으로 프랙탈 파라미터, 색상, 이름, 설명을 생성하고 화면에 3D 프랙탈을 렌더링합니다.
3.  **수동 제어판 사용 (화면 좌측 상단 ☰ 버튼)**:
    *   **형태 (De Jong Attractor)**: `a`부터 `f`까지의 슬라이더나 숫자 입력을 통해 프랙탈의 기본 형태를 변경합니다.
    *   **애니메이션**: `Speed` (속도)와 `Amplitude` (진폭)를 조절하여 프랙탈 입자의 동적인 움직임을 변경합니다.
    *   **외형**: `Particle Size` (입자 크기)와 `Particle Shape` (입자 모양)을 변경하여 시각적 스타일을 바꿉니다.
    *   **색상 팔레트**: AI가 생성한 색상 팔레트를 확인할 수 있습니다.
    *   **수동 적용**: 변경된 파라미터를 프랙탈에 즉시 적용합니다.
    *   **파라미터를 제목에 적용**: 현재 수동으로 설정된 파라미터 값들을 기반으로 AI에게 새로운 이름과 설명을 생성하도록 요청합니다.
    *   **현재 설정으로 초기화**: 제어판의 값들을 현재 화면에 보이는 프랙탈의 설정값으로 되돌립니다.
4.  **라이브러리 사용 (화면 좌측 상단 📚 버튼)**:
    *   **저장**: 하단의 컨트롤 바에 있는 **💾 저장** 버튼을 클릭하여 현재 프랙탈을 라이브러리에 저장합니다.
    *   **불러오기/삭제**: 라이브러리 패널에서 저장된 프랙탈을 선택하여 불러오거나 삭제할 수 있습니다.
    *   **내보내기**: "라이브러리 내보내기" 버튼을 클릭하여 전체 라이브러리를 JSON 파일로 다운로드합니다.
    *   **가져오기**: "라이브러리 가져오기" 버튼을 클릭하여 JSON 파일을 선택하고 프랙탈들을 라이브러리에 추가합니다.
5.  **화면 조작**:
    *   **회전**: 마우스 왼쪽 버튼을 누른 채 드래그하거나, 화면을 한 손가락으로 터치하여 드래그합니다.
    *   **확대/축소**: 마우스 휠을 스크롤하거나, 화면을 두 손가락으로 핀치-줌합니다.

## 🖼️ 스크린샷 (예시)

*(애플리케이션의 멋진 스크린샷을 여기에 추가하면 좋습니다.)*

*   메인 화면 예시
*   수동 제어판 및 라이브러리 패널이 열린 모습 예시

## 📂 파일 구조

주요 로직은 `index.html` 파일 내에 `<script type="module">` 태그를 통해 구현되어 있습니다.

```
/
├── index.html               # 메인 애플리케이션 파일 (HTML, CSS, JavaScript 포함)
├── README.md                # 현재 이 파일
├── metadata.json            # 애플리케이션 메타데이터 (프레임워크용)
│
├── index.tsx                # (사용되지 않음 - 이전 React 구조의 잔재)
├── App.tsx                  # (사용되지 않음 - 이전 React 구조의 잔재)
├── constants.ts             # (사용되지 않음 - 이전 React 구조의 잔재)
├── types.ts                 # (사용되지 않음 - 이전 React 구조의 잔재)
└── components/              # (사용되지 않음 - 이전 React 구조의 잔재)
    ├── ControlPanel.tsx     # (사용되지 않음)
    └── FractalViewer.tsx    # (사용되지 않음)
```

**참고**: `index.tsx`, `App.tsx` 및 `components` 폴더 내의 `.tsx` 파일들은 초기 개발 단계의 React 기반 구조의 일부였으나, 현재 애플리케이션은 모든 기능을 `index.html` 파일 하나로 통합하여 순수 JavaScript, HTML, CSS로 재구성되었습니다. 따라서 해당 `.tsx` 파일들은 현재 실행 로직에 관여하지 않습니다.

## 💡 향후 개선 아이디어

*   더 다양한 프랙탈 종류 (예: Lorenz, Clifford 어트랙터) 추가
*   프랙탈 공유 기능 (예: 고유 URL 생성 또는 소셜 미디어 공유)
*   색상 팔레트 수동 편집 기능 또는 AI 기반 색상 추천 확장
*   고급 렌더링 옵션 (예: 그림자, 반사 효과)
*   웹캠 입력 또는 오디오 반응형 프랙탈

## 🐛 알려진 문제/제한 사항

*   Gemini API 호출은 네트워크 상태 및 API 응답 속도에 따라 다소 시간이 소요될 수 있습니다.
*   복잡한 프롬프트나 특정 파라미터 조합은 때때로 AI가 예상치 못한 결과를 생성할 수 있습니다.
*   매우 많은 입자를 사용하는 프랙탈은 저사양 기기나 브라우저에서 성능 저하가 발생할 수 있습니다.

## 📄 라이선스

이 프로젝트는 [MIT 라이선스](LICENSE.md) (별도 파일 추가 필요) 하에 배포될 수 있습니다. (라이선스 파일 추가를 권장합니다.)

---

프랙탈 아트의 세계에 빠져보세요! ✨
