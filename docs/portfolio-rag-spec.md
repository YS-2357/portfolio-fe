# 포트폴리오 + RAG 챗 구성 규격

## 목표
- 포트폴리오를 보며 이력서/경험에 대해 질문할 수 있는 RAG 챗 제공
- 프론트는 정적 사이트, 백엔드는 FastAPI 기반 API

## UI/UX 방향
- 플로팅 챗 위젯(우측 하단)
- 포트폴리오 탐색을 방해하지 않도록 최소화/확장형
- 답변 하단에 출처 표시

## 배포 전략
- 프론트: Firebase Hosting
- 백엔드: GCP Cloud Run (FastAPI)
- 프론트에서 `VITE_CHAT_API_URL`로 백엔드 호출
- CORS: 프론트 도메인만 허용

## 레포 구성
- 프론트/백 분리 권장
  - `portfolio-frontend` (React/Vite)
  - `portfolio-rag-api` (FastAPI)
- 모노레포 대안은 필요 시 선택

## RAG 데이터 원칙
- `reference/` 문서만 근거로 사용
- 민감정보(주민번호/주소/학번/생년월일/성적 세부)는 제외
- 생활기록부/성적표는 “질문에 필요한 요약 텍스트”만 포함
- 근거 없음: “수정중/제작중”으로 응답

## 문서 구조(가이드)
- `AGENTS.md`: 에이전트 규칙
- `SKILLS.md`: 스킬 인덱스
- `docs/architecture.md`: 상위 구조 요약
- `docs/prompts.md`: 프롬프트/정책
- `docs/rag.md`: 청크/메타/출처 규칙
- `reference/`: 근거 문서
- `asset/`: 공용 자산
- `skills/`: 스킬 문서
