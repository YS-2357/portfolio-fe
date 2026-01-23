# 랜딩 템플릿 적용 가이드

## 대상
- Vite + React + TypeScript 앱: `app/`
- 템플릿 파일: `asset/templates/landing-example.tsx`, `asset/templates/landing-example.css`

## 적용 순서
1) `app/src/components/landing/` 폴더 생성
2) 템플릿 파일 복사
   - `asset/templates/landing-example.tsx` → `app/src/components/landing/LandingExample.tsx`
   - `asset/templates/landing-example.css` → `app/src/components/landing/landing-example.css`
3) `app/src/App.tsx`에서 `LandingExample` 사용
4) 필요 시 `app/src/index.css`에 전역 폰트만 추가
5) 라우터 구성
   - 프로젝트 인포그래픽: `/projects/codeit/:project`
   - 프로젝트 상세: `/projects/codeit/:project/:page`
   - 수상 전체: `/awards`

## 주의 사항
- 배경은 단색 밤하늘 톤 유지(그라데이션 금지)
- 흰색 카드 블록으로 섹션을 구분
- 강조색은 1개만 사용
- 현재 페이지는 CTA 버튼에 `btn--primary-solar`로 강조한다.

## 데이터 연결
- 정적 콘텐츠는 `app/public/content/`에서 fetch로 읽는다.
- 경로 예: `/content/resume/summary.md`
- 프로젝트 문서 경로 예:
  - `/content/projects/codeit/<project>/star.md`
  - `/content/projects/<project>/summary.md`
- Notion 원본은 `/content/_notion/`에 저장하되 UI에 직접 노출하지 않는다.

## 정적 자산
- 프로젝트 이미지: `app/public/asset/images/projects/`
- 경로 예:
  - `/asset/images/projects/<project>/<file>`
  - `/asset/images/projects/codeit/<project>/<file>`
- 인포그래픽 예:
  - `/asset/images/projects/<project>/infographic.png`
  - `/asset/images/projects/codeit/<project>/infographic.png`
