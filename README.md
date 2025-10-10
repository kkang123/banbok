<div align="center">
  <img src="./assets/images/logo.png" alt="BANBOK Logo" width="200" />
</div>

# 반복(BANBOK) - 코딩테스트 반복 학습 서비스

> 코딩테스트 문제를 푸는 것만으론 충분하지 않습니다. 반복 학습을 통해 진정한 실력을 향상시키세요.

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Drizzle](https://img.shields.io/badge/Drizzle-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)

## 📝 프로젝트 소개

**BANBOK**은 코딩테스트 문제의 효과적인 반복 학습을 위한 웹 서비스입니다.
문제를 한 번 푸는 것에서 끝나는 것이 아니라, 과학적인 학습 방법론에 기반하여 1일, 3일, 7일, 21일 후에 다시 풀어보도록 리마인더를 제공합니다.

### 🎯 핵심 기능

- 🔗 **문제 링크 제출**: 백준, 프로그래머스, 리트코드 등 다양한 플랫폼의 문제 링크 제출
- 📧 **스케줄링 리마인더**: 1, 3, 7, 21일 주기로 이메일 알림 발송
- 🏷️ **자동 문제 파싱**: 웹 크롤링을 통한 문제 제목 및 정보 자동 추출
- 🔐 **간편 로그인**: Naver 소셜 로그인 지원

### 🌟 서비스의 특별한 점

- **에빙하우스 망각곡선 이론 적용**: 과학적으로 증명된 반복 학습 주기를 통한 효과적인 학습
- **사용자 친화적 UI/UX**: 직관적이고 깔끔한 인터페이스
- **다중 플랫폼 지원**: 백준, 프로그래머스, 리트코드 등 주요 코딩테스트 사이트 모두 지원
- **자동화된 알림 시스템**: 사용자가 별도로 관리할 필요 없는 스마트한 리마인더

## 🏗️ 프로젝트 구조

이 프로젝트는 모노레포(Monorepo) 구조로 구성되어 있습니다.

```
banbok/
├── apps/
│   ├── frontend/          # Next.js 프론트엔드
│   │   ├── app/
│   │   │   ├── _components/    # 재사용 가능한 컴포넌트
│   │   │   ├── _constants/     # 공통 상수
│   │   │   ├── _hooks/         # 커스텀 React 훅
│   │   │   ├── _store/         # Zustand 상태 관리
│   │   │   ├── _type/          # TypeScript 타입 정의
│   │   │   ├── services        # 도메인별 서비스 로직
│   │   │   └── utils/          # 유틸리티 함수 및 크롤러
│   │   └── (route)/            # 페이지 라우트
│   │   └── public/             # 정적 자원
│   └── backend/           # NestJS 백엔드
│       ├── src/
│       │   ├── auth/           # 인증 모듈
│       │   ├── mail/           # 이메일 발송 모듈
│       │   ├── task/           # 스케줄링 작업 모듈
│       │   └── user/           # 사용자 관리 모듈
│       └── test/               # 테스트 파일
├── packages/
│   ├── eslint-config/     # 공통 ESLint 설정
│   ├── log/              # 로깅 패키지
│   ├── shared/           # 공통 타입 및 유틸리티
│   └── typescript-config/ # 공통 TypeScript 설정
└── package.json          # 루트 패키지 설정
```

## 🛠️ 기술 스택

### 프론트엔드

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Fetch API
- **Web Scraping**: Cheerio (클라이언트 사이드)

### 백엔드

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Authentication**: Passport (JWT, OAuth)
- **Task Scheduling**: BullMQ + Redis
- **Email Service**: Nodemailer
- **Template Engine**: Pug

### 인프라 및 도구

- **Monorepo**: Turbo
- **Package Manager**: npm
- **Database Migrations**: Drizzle Kit
- **Code Quality**: ESLint, Prettier
- **Testing**: Jest
- **Containerization**: Docker

## 🚀 시작하기

### 필요 조건

- Node.js 18+
- PostgreSQL
- Redis
- npm

### 설치

1. 저장소 클론

```bash
git clone https://github.com/your-username/banbok.git
cd banbok
```

2. 의존성 설치

```bash
npm install
```

3. 환경 변수 설정

```bash
# 프론트 환경변수 (.env)
NEXT_PUBLIC_API_URL=http://localhost:3001
```

```bash
# 백엔드 환경변수 (.env.local)
DATABASE_URL=postgresql://username:password@localhost:5432/banbok
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your-jwt-secret

# 소셜 로그인 설정
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NAVER_CLIENT_ID=your-naver-client-id
NAVER_CLIENT_SECRET=your-naver-client-secret
KAKAO_CLIENT_ID=your-kakao-client-id

# 이메일 설정
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-email-password
```

4. 데이터베이스 마이그레이션

```bash
npm run db:migrate --workspace=apps/backend
```

### 실행

#### 개발 환경

```bash
# 전체 프로젝트 개발 서버 실행
npm run dev

# 프론트엔드만 실행
npm run dev --workspace=apps/frontend

# 백엔드만 실행
npm run dev:backend
```

#### 프로덕션 환경

```bash
# 빌드
npm run build

# 백엔드 실행
npm run start:backend
```

### 테스트

```bash
# 전체 테스트 실행
npm run test

# 백엔드 E2E 테스트
npm run test:e2e --workspace=apps/backend

# 커버리지 포함 테스트
npm run test:cov --workspace=apps/backend
```

## 🔄 주요 워크플로우

### 1. 문제 제출 프로세스

1. 사용자가 코딩테스트 문제 링크 제출
2. 프론트엔드에서 해당 사이트의 크롤러를 통해 문제 정보 추출
3. 백엔드로 문제 정보 전송
4. 데이터베이스에 저장 및 스케줄링 작업 등록

### 2. 리마인더 시스템

1. BullMQ를 통한 지연 작업 스케줄링
2. 1일, 3일, 7일, 21일 후 자동 트리거
3. 이메일 템플릿을 통한 개인화된 알림 발송
4. 사용자 클릭 추적 및 학습 상태 업데이트

### 3. 지원 플랫폼별 크롤러

- **백준(Baekjoon)**: `acmicpc.net` 도메인 처리
- **프로그래머스(Programmers)**: `programmers.co.kr` 도메인 처리
- **리트코드(LeetCode)**: `leetcode.com` 도메인 처리

## 📈 로드맵

- [ ] 코드 리뷰 기능
- [ ] AI 기반 문제 추천 시스템
- [ ] 문제 태그별 분류 및 필터링
- [ ] 학습 통계 및 대시보드 개선
- [ ] 그룹 스터디 기능
- [ ] 모바일 앱 개발

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 🎉 감사의 말

- 모든 오픈소스 기여자들에게 감사드립니다
- 에빙하우스 망각곡선 이론에 영감을 받았습니다
- 효과적인 학습 방법론에 대한 연구들을 참고했습니다

---

<div align="center">

**[🌐 웹사이트](https://banbok-coding.vercel.app) • [📧 이메일](mailto:contact@banbok.com) • [🐛 버그 리포트](https://github.com/your-username/banbok/issues)**

Made with ❤️ by BANBOK Team

</div>
