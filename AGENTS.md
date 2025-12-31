# 프론트엔드 에이전트 규칙

React + TypeScript 정적 포트폴리오 사이트이며 Firebase Hosting에 배포한다.

## 우선순위
- 정적 사이트 유지(서버 렌더링/런타임 API 금지).
- 이력서/포트폴리오 데이터의 소스 오브 트루스 유지.
- 플로팅 챗봇 UI에서 관련 페이지 링크 제공.
- 반복 작업은 `skills/` 스킬로 캡슐화.

## 커밋 규칙
- 일반적인 컨벤션을 사용한다: `type: 한글 요약`.
- 별도 지시가 없으면 변경사항을 묶어서 `git add`/`git commit`까지 자동으로 진행한다.

## 참고 문서
- 앱 구조와 라우팅: `reference/architecture/system-overview.md`
- 랜딩 페이지 규칙: `reference/architecture/landing-guidelines.md`
- 콘텐츠 스키마: `reference/domain/content-schema.md`
- 수상 데이터 포맷: `reference/domain/awards-format.md`
- Firebase Hosting: `reference/processes/firebase-hosting.md`
- 랜딩 템플릿 적용: `reference/processes/landing-implementation.md`

## 공용 자원
- UI/콘텐츠 공용 자산은 `asset/`에 둔다.
