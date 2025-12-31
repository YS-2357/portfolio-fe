# Firebase Hosting

## 배포 개요
- 정적 사이트 배포 대상으로 Firebase Hosting을 사용한다.
- 빌드 산출물 경로와 호스팅 설정을 기록한다.

## 현재 설정
- Firebase 프로젝트 ID: `youngsun-joung`
- 앱 디렉터리: `app/`
- 빌드 커맨드: `npm run build` (작업 경로 `app/`)
- 출력 디렉터리: `app/dist`
- Hosting 설정 파일: `app/firebase.json`
- 프로젝트 별칭: `app/.firebaserc`

## GitHub Actions
- 워크플로: `.github/workflows/firebase-hosting-merge.yml`
- PR 프리뷰: `.github/workflows/firebase-hosting-pull-request.yml`
- 빌드 작업 경로: `app/`
- Secrets: `FIREBASE_SERVICE_ACCOUNT_YOUNGSUN_JOUNG`

## 리라이트
- SPA로 `/index.html` 리라이트를 사용한다.
