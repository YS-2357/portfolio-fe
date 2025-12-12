# 정영선 포트폴리오 (React + Vite)

## 개요
- 단일 페이지 포트폴리오. 섹션: Hero, 소개, 프로젝트, 경험, 스킬, 연락처.
- 현재 내용은 작업 중이며, 대부분 “수정중/제작중” 플레이스홀더 상태입니다.

## 실행
```
npm install   # 또는 npm ci
npm run dev   # http://localhost:5173
npm run build
```

## 데이터/스타일 위치
- 데이터 및 섹션 마크업: `src/App.jsx`
- 전역 스타일 및 레이아웃: `src/App.css`
- 전역 기본 스타일: `src/index.css`
- 히어로 패턴 이미지: `src/assets/placeholder-hero.svg`

## 연락처
- 이메일: joungyoungsun20@gmail.com
- GitHub: https://github.com/YS-2357
- LinkedIn: http://www.linkedin.com/in/youngsun-joung-5b0584345
- Blog: https://velog.io/@ys2357/posts
- 전화: 010-8766-4095

## 빌드/환경 메모
- Windows에서 `npm ci && npm run build` 정상 동작 확인.
- Linux 환경에서 rollup 바이너리 누락 시 `rm -rf node_modules && npm ci` 또는 `npm i -D @rollup/rollup-linux-x64-gnu`로 해결.
