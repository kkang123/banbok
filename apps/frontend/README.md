# Banbok

![Banbok img](https://github.com/user-attachments/assets/a2102c33-2fa3-4aa9-98a7-73a21905f6d9)

해결한 코딩 테스트 링크를 등록하여 메일을 일정주기대로 받아 반복 학습을 할 수 있도록 도와주는 웹 사이트입니다.

배포 주소 : https://banbok-coding.vercel.app/  
피그마 주소 : https://www.figma.com/design/gXeeN0mnDPOViAcoA4mQU3/banbok?node-id=6-3&t=r7KwQ9gSiT5HCE0p-0

### 🔐 테스트 계정

네이버 OAuth를 이용하여 로그인하면 사용 가능합니다.

### 설치

1. 저장소 클론

```bash
git clone https://github.com/your-username/banbok.git
cd banbok
```

2. 의존성 설치

```bash
# root 폴더
npm install
```

3. 환경 변수 설정

```bash
# apps/frontend
# 프론트 환경변수 (.env)
NEXT_PUBLIC_API_URL=http://localhost:3001
```

4. 빌드

```bash
npm run build --workspace=apps/frontend, npm start --workspace=apps/frontend
```

5. 서버 설정 추가

```bash
# apps/backend
docker-compose up -d   # 도커 활성화
npm run db:push        # DB 설정 추가
```

6. 실행

```bash
# 루트 폴더
npm run dev --workspace=apps/frontend
```

## 🔨 사용 기술

<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=FFFFFF"/>
<img src="https://img.shields.io/badge/TypeScript-orange?style=flat&logo=TypeScript&logoColor=FFFFFF"/>
<img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat&logo=Tailwind CSS&logoColor=FFFFFF"/>
<img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=Next.js&logoColor=FFFFFF"/>
<img src="https://img.shields.io/badge/Zustand-764ABC?style=flat&logo=Zustand&logoColor=FFFFFF"/>
<img src="https://img.shields.io/badge/API-0000FF?style=flat&logo=Backendless&logoColor=FFFFFF"/>
<img src="https://img.shields.io/badge/Vercel-000000?style=flat&logo=Vercel&logoColor=FFFFFF"/>
<img src="https://img.shields.io/badge/Cheerio-FFD700?style=flat&logo=Cheerio&logoColor=000000"/>

## ✨ 구현 기능 및 시연

### 홈화면

![홈화면](https://github.com/user-attachments/assets/74f887d2-ace3-445f-8baf-c47f044f8ee0)

### 로그인 및 로그아웃

![로그인 로그아웃](https://github.com/user-attachments/assets/4b236f62-ce6c-44e8-b20f-da88c5fdbd1b)

- **OAuth2 로그인** : 쿼리 파라미터로 전달된 `accessToken`을 로컬 스토리지에 안전하게 저장하고, URL에서 토큰을 제거하여 보안을 강화했습니다.
- **상태 관리** : Zustand를 활용하여 로그인/로그아웃 상태를 전역적으로 관리하고, 새로고침 후에도 세션이 유지되도록 구현했습니다.
- **로그아웃** : 로컬 스토리지와 전역 상태에서 토큰을 제거해 즉시 로그아웃되며, 내정보 페이지에서는 로그인 페이지로 자동 리다이렉션됩니다.

### 문제 등록

![문제 등록](https://github.com/user-attachments/assets/38aa188e-5163-4ff8-903d-ce4c5d24c058)

- 문제 링크 입력 시 Cheerio를 통해 문제 링크 크롤링한 후 서버로 추출한 제목, 사이트 정보를 전송하여 저장합니다.

### Web Speech API 기반 음성 제어 기능

![Web Speech API 기반 음성 제어 기능](https://github.com/user-attachments/assets/70cf5ca0-204e-4d40-a232-e0c3571e00c9)

- Web Speech API 기능을 통해 간단한 로그인, 홈 화면 페이지 이동과 로그아웃 기능을 구현했습니다.

### 뽀모도로 타이머

![뽀모도로 타이머](https://github.com/user-attachments/assets/8a8316f2-2770-45f7-ac00-7ce6f083f11a)

### 내 정보 페이지 및 등록 문제 조회

![내 정보 페이지 및 등록 문제 조회](https://github.com/user-attachments/assets/aae83e9c-5033-446d-b3fc-80b4ea1b7b5b)

- 문제 풀이 기록은 잔디 스타일 히트맵으로 제공하여, 날짜별 학습 패턴을 시각적으로 확인할 수 있도록 하였고, 연도별 전환 버튼을 통해 장기간 학습 데이터 탐색을 제공하였습니다.
- Zustand 기반 인증 관리로, 로그인/로그아웃 상태가 전역적으로 자동 반영했습니다, 또한 로그아웃 시 로그인 페이지로 리다이렉션되어 보안성을 향상시켰습니다.

## 📦 폴더 구조

```
frontend/
├── 📦 app/
│   ├── 📂 _components/       # 재사용 가능한 컴포넌트
│   │ ├── 📂 Button/          # 버튼 관련 컴포넌트
│   │ ├── 📂 common/          # 공통 UI 관련 컴포넌트
│   │ ├── 📂 Header/          # 헤더 관련 컴포넌트
│   │ ├── 📂 Menu/            # 메뉴 관련 컴포넌트
│   │ ├── 📂 Timer/           # 뽀모도로 타이머 컴포넌트
│   │ ├── 📂 Voice/           # 음성 인식 기능 컴포넌트
│   │ └── 📂 sections/        # 페이지 섹션 컴포넌트
│   ├── 📂 _constants/        # 공통 상수
│   ├── 📂 _hooks/            # 커스텀 React 훅
│   ├── 📂 _store/            # Zustand 상태 관리
│   ├── 📂 _type/             # TypeScript 타입 정의
│   ├── 📂 api/               # API 라우트
│   │ └── 📂 scrape/          # 크롤링 관련 API
│   ├── 📂 services           # 도메인별 서비스 로직
│   ├── 📂 utils/             # 유틸리티 함수
│   │ └── 📂 crawlers/        # 크롤러 관련 유틸리티
│   ├── 📂 (route)/           # 페이지 라우트
│   │ ├── 📂 login/           # 로그인 페이지
│   │ └── 📂 profile/         # 프로필 페이지
│   │   └── 📂 _components/   # 프로필 섹션 컴포넌트
│   ├── 📄 globals.css        # 전역 스타일
│   ├── 📄 layout.tsx         # 루트 레이아웃
│   └── 📄 page.tsx           # 메인 페이지
```

## 🔥 트러블 슈팅

<details>
 <summary> 로그인 상태 확인 전 잘못된 리다이렉션 문제 해결 </summary>

### 1. 문제 상황

로그인한 유저가 프로필 페이지로 이동했을 때, /login으로 리다이렉션되는 현상이 발생했습니다. 이는 isLoading의 초기값을 false로 설정했기 때문에, useEffect에서 fetchUser()가 실행되기 전에 로그인되지 않은 상태로 잘못 판단하여 리다이렉션이 발생한 것이 원인이었습니다.

#### 해결 방법

클라이언트 상태가 hydrate되기 전에는 아무런 판단도 하지 않도록 하기 위해, hasHydrated라는 플래그를 추가하여 클라이언트 상태가 완전히 초기화되었는지를 명확히 구분했습니다. 이로써 fetchUser()가 완료되기 전에는 렌더링이나 리다이렉션이 발생하지 않도록 안전장치를 추가했습니다.

#### 개선 효과

클라이언트 상태가 hydrate되기 전에는 판단을 보류하여 잘못된 리다이렉션을 방지할 수 있었습니다.
로그인 여부 판단이 fetchUser() 완료 이후에만 실행되도록 제어함으로써 정확한 유저 상태 반영이 가능해졌습니다.
초기 렌더링 시 플래시나 깜빡임 없이, 더 안정적인 사용자 경험을 제공할 수 있게 되었습니다.

</details>

<details>
<summary> 웹과 앱에 따른 반응형 구현 </summary>

### 2. 문제 상황

반응형 구현 과정 중에 뽀모도로 타이머의 css 디자인을 모바일 버전을 추가해서 넣어줬다. 그 과정에서 가로모드에도 해당 디자인을 추가해줬는데 width 값을 통해 css를 넣어주는 방법을 사용을 하니 데스크탑 버전에서 화면을 최소에서 최대로 늘릴 때 모바일 -> 데탑 -> 모바일 이렇게 css가 구성되는 오류가 발생하였습니다. 하지만 저는 최대 width일 때 데탑 전용 뽀모도로 타이머를 표현하고 싶었습니다.

#### 해결 방법

모바일 웹 반응형구현 중 가로모드 활성화를 했는데 width에 따라 짤리는걸 방지하기 위해 width 조건이 아닌 heigth 조건을 가로모드와 함께 사용하여 수정함

</details>
