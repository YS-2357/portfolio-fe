# AGENTS.md — 포트폴리오 페이지 브리프

포트폴리오를 제작/수정하는 에이전트가 따라야 할 콘텐츠와 스타일 가이드입니다. 아래 값들은 최신 사용자 정보로 이미 채워져 있으며, 변경 시 업데이트합니다.

## 1) 목적
- 방문자에게 “무엇을 잘하고, 어떤 결과를 냈는지”를 10초 내에 전달한다.
- 프로젝트·경력·연락 수단을 빠르게 탐색할 수 있게 한다.

## 2) 톤 & 무드
- 선명한 대비의 밝은 테마, 포인트 컬러 1개 사용.
- 명확한 타이포(제목은 굵고 크게, 본문은 가독성 중심).
- 불필요한 애니메이션 금지. 버튼/카드 호버 정도만.

## 3) 페이지 섹션(필수)
1. Hero  
   - 한 줄 가치제안: 수학적 분석력과 LLM·RAG 실무로 문제를 수치로 해결하는 AI 엔지니어  
   - 서브: Geo·보험·문서 도메인에서 6시간 작업을 10분으로, 비용 10만원 절감, 검색 90% 단축을 만들어낸 팀 리더  
   - CTA 버튼: “프로젝트 보기”(앵커: #projects), “연락하기”(앵커: #contact)  
   - 배경: CSS 추상 배경 사용 중. 이미지 필요 시 추가.

2. About  
   - 소개(3~4문장):  
     - 수학 석사 연구(Templery–Lieb 대수)로 다진 분석력과 AI 실무를 접목해 성능·비용을 지표로 개선.  
     - K-디지털 해커톤(389팀 중 3위)에서 소상공인 상세페이지 자동 생성 서비스로 제작 6h→10m, 비용 10만원 절감.  
     - RAG 문서 검색/QA로 검색 시간 90% 단축, 객체 탐지 mAP 0.42→0.87(정확도 99%)로 Kaggle 1위 경험.  
     - 부트캠프 3회 연속 팀장으로 회의 30분 이하, 개발 기간 30% 단축.
   - 태그: LLM/RAG, GeoAI, 보험 GPT, 객체탐지, 성능최적화, 팀리딩

3. Projects (4개 카드)  
   - 소상공인 상세페이지 자동 생성 | Python, FastAPI, React, Streamlit | 임팩트: 제작 6h→10m, 비용 10만원 절감, K-디지털 해커톤 3/389팀(장관상) | link: 없음  
   - 보험 가입내역 기반 보장 분석 GPT | LangChain, Python, PDF parsing, RAG | 임팩트: 보장 항목/변수 표준화로 분석 자동화 기반 확보 | link: 없음  
   - RFP 문서 RAG QA 서비스 | LangChain, Vector Search, Python | 임팩트: 문서 검색 시간 90% 단축, 교육 사례 소개 | link: 없음  
   - 알약 객체 탐지 모델 고도화 | PyTorch, Computer Vision, Model Optimization | 임팩트: mAP 0.42→0.87, 정확도 99%+, Kaggle 프로젝트 1위 | link: 없음

4. Experience (연도 역순)  
   - AI 개발자 인턴 | ㈜인톡 | 2025.11 - 현재 | 보험 보장 분석 GPT 파이프라인 설계/구축, PDF→RAG, 보장 항목 표준화  
   - 팀 리더 / AI 엔지니어 | 코드잇 스프린트 부트캠프 | 2025.01 - 2025.07 | 3회 연속 팀장, 회의 30분 이하, 개발 기간 30% 단축, 10명 협업 총괄  
   - 수학 강사 | 학원/개인 | 2017.08 - 2017.11 | 커리큘럼·개별 피드백 설계, 만족도 90%+, 평균 성적 1등급 상승  
   - 육군 병장 만기전역 | ROK Army | 2015.08 - 2017.05 | 복수국적 상황에서 국방 의무 성실 이행

5. Skills  
   - Python, PyTorch, LangChain, FastAPI, React, Streamlit, Docker, Jupyter, Git/GitHub, Vector Search/RAG, Prompt Engineering, Data Preprocessing

6. Contact  
   - 이메일: joungyoungsun20@gmail.com (mailto)  
   - GitHub: https://github.com/YS-2357  
   - LinkedIn: http://www.linkedin.com/in/youngsun-joung-5b0584345  
   - 안내: 협업·채용 문의는 메일/링크드인으로 연락

## 4) 레이아웃 지침
- 최대 폭 1100px, 좌우 패딩 16~24px, 섹션 간 여백 48~72px.
- Projects: 모바일 1열, 데스크톱 2~3열 카드.
- 타이포: 제목 clamp(28–40px), 본문 16–18px, line-height 1.6.

## 5) 접근성/성능
- 이미지에 `alt` 필수. 포커스 스타일 유지. 색 대비 준수.
- 외부 링크는 `target="_blank"` + `rel="noreferrer"`.
- 불필요한 애니메이션/무거운 라이브러리 금지.

## 6) 적용 방법
- 데이터는 `src/App.jsx` 내 객체/배열로 정의 후 map 렌더링.
- 스타일은 `src/App.css`에 작성. 색상 변수 사용 권장.
- 예시 이미지는 `src/assets/placeholder-hero.svg`; 필요 시 교체.

## 7) 현재 값 메모
- Hero/About/Projects/Experience/Skills/Contact는 본 문서의 값으로 채워져 있음. 변경 발생 시 본 문서와 `src/App.jsx`를 함께 업데이트한다.

## 8) 로그 작성 규칙
- 코드 작업을 끝낸 직후 `docs/logs/YYYY-MM-DD.md` 파일을 만든다. (이미 있으면 새로 만들지 않는다.)
- 파일이 이미 존재하면 그날 작업 내용을 해당 파일에 추가하거나 수정한다.
- 로그에는 작업 요약(무엇을, 왜), 주요 변경 파일, 다음 할 일 정도를 기록한다.

### 로그 템플릿 (권장)
```
# YYYY-MM-DD 개발 로그

## Today
- [작업 요약 1줄]
- [작업 요약 1줄]

## Changes
- 파일/경로: 변경 내용 요약
- 파일/경로: 변경 내용 요약

## Notes
- 결정/근거, 이슈, 막힌 점 등

## Next
- [다음 해야 할 일 1]
- [다음 해야 할 일 2]
```
