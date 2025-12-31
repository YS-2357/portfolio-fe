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
  - `language.md`, `miscelleneous.md`, `resume.pdf`
- 수상: `app/public/content/awards/`
  - `all.md`
  - `<level>/awards.md`
- 프로젝트: `app/public/content/projects/`
  - `codeit/<project>/summary.md`
  - `codeit/<project>/star.md`
  - `codeit/<project>/report.md`
