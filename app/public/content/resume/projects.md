# Projects

## 멀티 LLM 응답 비교·요약 웹 서비스 | 2025.11 – Ongoing
- 형태: 사이드 프로젝트
- 기술: Python, Streamlit, FastAPI, LangChain, LangGraph, Supabase, Upstash, Render
- GitHub: https://github.com/YS-2357/compare-ai
- 요약: 멀티 LLM 병렬 호출과 실시간 스트리밍 기반 응답 비교·요약 서비스 개발
- 성과:
  - FastAPI·Streamlit 기반 MVP 완성 및 Render 최초 배포
  - 병렬 호출 파이프라인 구축(OpenAI, Claude, Gemini, Upstage, Perplexity)
  - 스트리밍 응답 요약/정렬 후 챗 UI 시각화
  - 사용자 인증(Supabase)·사용량 제한(Upstash) 적용으로 안정성 강화
  - FE/BE 분리 및 배포 구조 정비로 확장성 확보

## GEO 기반 상세페이지 자동생성 서비스 | 2025.07 – 2025.09
- 형태: 팀 프로젝트(팀장)
- 기술: Python, React, FastAPI
- GitHub: https://github.com/gyurili/2025-GEO-Project
- 요약: GEO 최적화 기반 소상공인 상세페이지 자동 생성 도구 개발
- 성과:
  - 사용자 30명 설문: 마케팅 활용 의향 74%, 만족도 7.14/10, NPS 30점
  - SD+IP-Adapter로 이미지 품질 개선, Gemini API로 생성 속도 8→1초 단축
  - GPT·HF+LoRA로 한국어 GEO 텍스트 품질 향상
  - FastAPI+Streamlit 기반 MVP, GCP 테스트 환경 구축
  - 제작 소요 6h→10m, 건당 평균 비용 약 10만 원 절감

## RFP 문서 요약·질의응답 RAG 서비스 | 2025.05 – 2025.06
- 형태: 팀 프로젝트(팀장)
- 기술: Python, Streamlit, FastAPI, LangChain, FAISS, Chroma
- GitHub: https://github.com/gyurili/2025-RAG-Project
- 요약: 정부·기업 RFP 문서 대상 의미 기반 요약/QA 자동화 시스템 구현
- 성과:
  - PDF/HWP 100개 문서 자동 요약·QA 시스템으로 전환, 검색시간 90% 절감
  - PDF 처리 속도 93% 개선(14.42s→1.06s)
  - Header 기반 청킹 최적화로 청크 수 86% 감소(419→56개)
  - Hybrid Search+Re-ranking 적용으로 검색 정확도 4배 개선
  - 캐시/로딩 구조 개선으로 HF 모델 반복 로딩 제거, 추론 지연 1~2분 절감

## 알약탐지 AI 모델 개발 | 2025.03 – 2025.04
- 형태: 팀 프로젝트(팀장)
- 기술: Python, YOLO, Faster R-CNN
- GitHub: https://github.com/codeit-Al-Project1/pill_detection_ai
- 요약: 객체 탐지 기반 알약 위치/종류 자동 인식 모델 개발
- 성과:
  - YOLOv8-l: mAP@0.5 0.99334, Kaggle 0.99857
  - Faster R-CNN: mAP@0.5 0.8752, Kaggle 0.39573
  - 어노테이션 오류 26건 수정 및 Stratified Split 적용
  - Faster R-CNN(MobileNet_v3)·YOLOv8-l 파이프라인 구현/학습 자동화
  - Focal Loss 및 Loss Weight 조정으로 소수 클래스 성능 10%+ 개선
