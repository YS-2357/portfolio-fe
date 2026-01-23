# 프론트엔드 구조

## 목적
React + TypeScript 정적 포트폴리오 사이트를 제공한다.

## 콘텐츠 소유
- 이력서/포트폴리오 콘텐츠는 프론트엔드가 소스 오브 트루스.
- 콘텐츠 위치와 파일 구조를 고정해 백엔드가 참조할 수 있게 한다.

## 라우팅
- 라우트 목록과 목적을 여기에 정리한다.
- 현재 라우트:
  - `/`: 랜딩 페이지
  - `/projects`: 프로젝트 목록
  - `/projects/codeit/:project`: 프로젝트 상세(인포그래픽 페이지)
  - `/projects/codeit/:project/:page`: 프로젝트 상세(`page`는 `star` 또는 `report`)
  - `/about`: 소개
  - `/experience`: 경력 사항
  - `/education`: 학력/교육
  - `/awards`: 전체 수상 목록

## 정적 자산
- 정적 콘텐츠: `app/public/content/`
- 프로젝트 이미지: `app/public/asset/images/projects/`
- Notion 원본 보관: `app/public/content/_notion/`
  - 인포그래픽: `/asset/images/projects/codeit/<project>/infographic.png`
- 경력 인포그래픽: `/asset/images/intalk/infographic.png`

## 유지 사항
- 콘텐츠 파일 경로와 라우트 목록이 바뀌면 즉시 갱신한다.

## 개선 방향(요약)
- 이력/프로젝트/수상 문서의 메시지를 포트폴리오 관점으로 재작성한다.
- 프로필 사진, 스킬 배지, 프로젝트 대표 이미지를 준비해 시각적 밀도를 보강한다.
- UI는 구조 유지, 시각 자산과 라벨 중심으로 고도화한다.
