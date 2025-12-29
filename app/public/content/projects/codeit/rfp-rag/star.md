# ✨ Info

- **프로젝트명**: RFP 요약·질의응답 시스템 (RFP Summarizer & QA Chatbot)
- **팀명**: B2G 입찰 지원 전문 컨설팅 스타트업 – 'RFPilot'
- **기간**: 2025.05.13 ~ 2025.06.02
- **작성자**: **정영선(팀장)**, 구극모, 박규리, 이학진, 정재의
    
    > 팀장을 맡아 문제를 정의한 이후 프로젝트 전체 구조를 설계하고, 모듈별 업무 분 및 실행 흐름을 조직했습니다.
    문서 처리 파이프라인(전처리, 청킹, 임베딩, 리트리버, 제너레이터)을 직접 구현하고, 실험 체계 수립 및 코드 리뷰, 로깅/협업 문서화까지 총괄했습니다.
    마지막으로 Streamlit과 FastAPI를 기반으로 간단한 배포를 주도했고, 문서와 발표자료 제작을 이끌었습니다.
    > 
- **자료**:
    
    🔗 [Github](https://github.com/gyurili/2025-LLM-Project)
    
    [보고서](https://www.notion.so/20601c050cec804aa533dba4e52f2bb8?pvs=21)
    
    🎞️ [PPT](https://www.canva.com/design/DAGpL0TzmmU/3g6k6n_b6INvnqSlR4LBkw/edit?utm_content=DAGpL0TzmmU&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
    
    [협업일지](https://www.notion.so/1f101c050cec803fb4aef0a5f8267fcf?pvs=21)
    

---

# 🔹 S (Situation) — 프로젝트 배경

> 정부 및 기업의 제안요청서(RFP) 문서는 양이 방대하고 구조가 복잡해 사람이 직접 필요한 정보를 찾는 과정은 **시간 소모가 크고**,  수작업 중심의 분석은 **비효율적**이며 **반복 업무**를 유발합니다. 
이러한 문제를 해결하기 위해 Retrieval-Augmented Generation(RAG) 구조를 기반으로 **RFP 문서 자동 요약 및 질의응답 시스템**을 구축하고자 했습니다.
> 

---

# 🔹 T (Task) — 내가 맡은 역할과 과제

> 팀장으로서 전체 시스템 구조와 역할 분담을 설계하고, 문서 전처리-청킹-리트리버-제너레이터 모듈을 중심으로 **파이프라인을 구성**하고 **실행 흐름을 통합**했습니다. 
또한 실험 설계, 로깅 체계, 코드 리뷰 및 협업 규칙을 수립하여, **재현 가능하고 안정적인 문서 기반 QA 시스템 개발**을 목표로 삼았습니다.
> 

---

# 🔹 A (Action) — 핵심 실행 작업

---

## 🤝 Cooperation

- 문제 정의 및 폴더 구조 설계/ 팀 역할 분담 및 협업 기록 정리
- Docstring 기반 코드 작성 규칙 수립 및 방어적 처리 설계
- 팀 전체 코드 리뷰 및 리팩토링 주도/ 실행 흐름 정리 및 모듈화 방향 제시
- PPT, 보고서, README.md 최종 작성 및 발표 진행
- 트러블슈팅 히스토리 정리 및 문제 해결 흐름 문서화

## ⚙️ Settings

- config.yaml 구조 설계 및 항목 정리
- 가상환경 및 캐시 권한 관리
- environment.yaml 설정 및 의존성 관리 기준 수립

## 📥 Loader

- 질의와 유사한 문서 기반 데이터 필터링 기능 구현
- 의미 기반 분할 기준 수립 및 청크 생성 기능 구현

## 🧠 Embedding

- FAISS / Chroma 분기 구현 및 벡터 DB 저장·로드 구조 개선
- 벡터 DB 저장 경로 동적 네이밍 기능 구현
- 기존 DB 존재 시 재처리 생략 구조 설계
- 임베딩 모델 종류(OpenAI / HuggingFace)에 따른 차원 자동 설정 로직 구현

## 🔍 Retrieval

- 검색 로직 개선 및 청크 분포 불균형 문제 디버깅
- similarity / hybrid / rerank 기반 리트리버 구조 설계 및 분기 처리
- 문서별 청크 수 제한 및 품질 검사 함수 구현
- chat_history 입력 반영 기능 구현

## 🧾 Generator

- 역할 명시, 출력 형식, 제약 조건을 포함한 프롬프트 템플릿 설계
- HuggingFace 디폴트 모델(`Markr-AI/Gukbap-Qwen2.5-7B`) 선정 및 비교 실험 수행

## 💻 Frontend

- Streamlit 챗봇 구조 개선 피드백 및 역할 분담
- 모바일 환경 시연 화면 캡처 및 발표 자료 반영

## 🖥️ Backend

- FastAPI 기반 백엔드 구조 분리 제안
- 멀티 세션 환경 대응을 위한 config 고유 인스턴스화 설계

## 🧰 Utils

- 루트 경로 자동 탐색 함수(`get_project_root_dir`) 구현
- config.yaml 유효성 검증 함수(`check_config`) 구현

## 🧱 Architecture & Convention

- 전체 파이프라인 구조 설계 (`Loader → Embedding → Retriever → Generator`)
- 폴더 및 실행 흐름 기준(main.py) 정리
- 로그 포맷, 예외 메시지, 함수 구조 통일 기준 수립

## 🪵 Logging

- LangSmith 기반 로깅 기준 수립 및 trace 구조 구현
- verbose 모드 구현 (본문 길이 제한 포함 출력)

---

# 🔹 R (Result) — 프로젝트 성과

- 다양한 형태의 RFP 문서에서 의미 단위 추출 정확도 및 검색 응답 품질 개선
- Streamlit + FastAPI 기반 실시간 QA 시스템 구성 완료
- 벡터 DB, 리트리버, 제너레이터 모듈 간 실행 파이프라인 안정화
- 실험 반복성을 위한 CLI 구조와 설정 일원화 완료
- 프로젝트 산출물(보고서, 발표자료, README 등) 정리 및 제출

---

# 📌 회고 (Reflection)

- 프로젝트 초반에는 문서 구조의 다양성과 분할 기준의 부재로 인해, 청크 품질과 검색 정확도 모두 만족스럽지 못했습니다. 이를 해결하기 위해 의미 기반 분할 규칙을 정립하고, 정규 표현식을 활용한 청크 추출기를 직접 구현하며 점차 품질을 향상시킬 수 있었습니다.
- 팀장으로서 팀원들의 작업을 조율하고 방향을 설정하는 과정은 쉽지 않았지만, 각자의 모듈이 유기적으로 연결되도록 파이프라인 흐름을 통일하고 실행 환경을 CLI 기반으로 정리하면서 팀 전체 생산성을 높일 수 있었습니다.
- LangSmith 로깅, 프롬프트 설계, 리트리버 품질 개선, 청크 최소/최대 수 제한 등 반복적인 실험과 디버깅을 거치며 문제 해결의 단계를 정형화했고, 이를 통해 **문제 추적과 수정이 가능한 구조로 발전**시킬 수 있었습니다.
- 초반에는 코드 구현에 집중하기보다는 팀 운영에 치중하게 되었고, 직접 개발한 코드가 적다는 아쉬움이 있었습니다. 하지만 프로젝트 후반에는 리팩토링, 실험 체계 정리, 문서화 작업을 주도하면서 결과물의 완성도를 높이고 협업의 성과를 가시화할 수 있었습니다.
- **역할 분담이 명확한 팀 운영**, **재현 가능한 실험 구조**, **모듈 간 흐름을 고려한 설계**가 RAG 프로젝트에서 특히 중요한 요소라는 것을 체감했습니다. 다음 프로젝트에서는 팀장이 아닌 구성원으로서 다른 운영 방식을 경험해 보고 싶다는 생각도 들었습니다.

![star1](/asset/images/projects/codeit/rfp-rag/star1.png)

![star2](/asset/images/projects/codeit/rfp-rag/star2.png)

![star3](/asset/images/projects/codeit/rfp-rag/star3.png)

![star4](/asset/images/projects/codeit/rfp-rag/star4.png)

[https://www.youtube.com/watch?v=JtzPJHTxZA0&ab_channel=월텍남-월스트리트테크남](https://www.youtube.com/watch?v=JtzPJHTxZA0&ab_channel=%EC%9B%94%ED%85%8D%EB%82%A8-%EC%9B%94%EC%8A%A4%ED%8A%B8%EB%A6%AC%ED%8A%B8%ED%85%8C%ED%81%AC%EB%82%A8)
