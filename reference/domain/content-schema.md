# 콘텐츠 스키마(이력서/포트폴리오)

프론트엔드와 백엔드가 공유하는 콘텐츠 구조를 정의한다.

## 필수 섹션
- 요약 소개
- 경력
- 프로젝트/포트폴리오
- 스킬/기술 스택
- 학력/자격증
- 링크(깃허브, 블로그 등)

## 파일 구조
- 이력서: `app/public/content/resume/`
  - `summary.md`, `experience.md`, `education.md`, `projects.md`
  - `skills.md`, `language.md`, `miscelleneous.md`, `resume.pdf`
- 수상: `app/public/content/awards/`
  - `all.md`
  - `<level>/awards.md`
- 프로젝트: `app/public/content/projects/`
  - `codeit/<project>/summary.md`
  - `codeit/<project>/star.md`
  - `codeit/<project>/report.md`
  - 인포그래픽: `app/public/asset/images/projects/codeit/<project>/infographic.png`

## Notion 원본 보관
- `app/public/content/_notion/` 아래에 Notion 동기화 결과를 유지한다.
- 포트폴리오 UI는 `_notion` 경로를 직접 렌더링하지 않는다.

## 포트폴리오 정제 구조(후속 적용)
- `app/public/content/projects/<slug>/`
  - `summary.md`
  - `highlights.md`
  - `stack.md`
  - `links.md`
  - `teaser.md`
