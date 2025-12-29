# 프론트엔드 에이전트 규칙

React + TypeScript 정적 포트폴리오 사이트이며 Firebase Hosting에 배포한다.

## 우선순위
- 정적 사이트 유지(서버 렌더링/런타임 API 금지).
- 이력서/포트폴리오 데이터의 소스 오브 트루스 유지.
- 플로팅 챗봇 UI에서 관련 페이지 링크 제공.
- 반복 작업은 `skills/` 스킬로 캡슐화.

## 참고 문서
- 앱 구조와 라우팅: `reference/architecture/system-overview.md`
- 랜딩 페이지 규칙: `reference/architecture/landing-guidelines.md`
- 콘텐츠 스키마: `reference/domain/content-schema.md`
- Firebase Hosting: `reference/processes/firebase-hosting.md`

## 공용 자원
- UI/콘텐츠 공용 자산은 `asset/`에 둔다.
