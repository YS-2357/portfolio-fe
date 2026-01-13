---
연도: "2025"
비고: "RAG, LLM"
수행 역할: ["Team Lead","Technical Lead","Retriever Engineer","Documentation Lead"]
작업 기간: "2025-05-12"
관련 기업/기관: "코드잇 | Codeit"
기여도(%): 0.3
사용 기술: ["LangChain","OpenAI","HuggingFace","FAISS","Chroma","HWPLoader","PyMuPDF","EasyOCR","FastAPI","Streamlit","LangSmith"]
이름: "RFP 분석을 위한 LLM 기반 RAG 시스템 | LLM-powered RAG System for RFP Analysis"
---

# RFP 분석을 위한 LLM 기반 RAG 시스템 | LLM-powered RAG System for RFP Analysis


# ✨ Info


- **프로젝트명**: RFP 요약·질의응답 시스템 (RFP Summarizer & QA Chatbot)

- **팀명**: B2G 입찰 지원 전문 컨설팅 스타트업 – 'RFPilot'

- **기간**: 2025.05.13 ~ 2025.06.02

- **작성자**: **정영선(팀장)**, 구극모, 박규리, 이학진, 정재의

- **자료**:

---


# 🔹 S (Situation) — 프로젝트 배경


> 정부 및 기업의 제안요청서(RFP) 문서는 양이 방대하고 구조가 복잡해 사람이 직접 필요한 정보를 찾는 과정은 **시간 소모가 크고**,  수작업 중심의 분석은 **비효율적**이며 **반복 업무**를 유발합니다. 
이러한 문제를 해결하기 위해 Retrieval-Augmented Generation(RAG) 구조를 기반으로 **RFP 문서 자동 요약 및 질의응답 시스템**을 구축하고자 했습니다.


---


# 🔹 T (Task) — 내가 맡은 역할과 과제


> 팀장으로서 전체 시스템 구조와 역할 분담을 설계하고, 문서 전처리-청킹-리트리버-제너레이터 모듈을 중심으로 **파이프라인을 구성**하고 **실행 흐름을 통합**했습니다. 
또한 실험 설계, 로깅 체계, 코드 리뷰 및 협업 규칙을 수립하여, **재현 가능하고 안정적인 문서 기반 QA 시스템 개발**을 목표로 삼았습니다.


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

![](https://prod-files-secure.s3.us-west-2.amazonaws.com/74816d19-4826-4987-99da-a7850e85f3d3/91de8a53-3416-4a34-8891-a8012f1bf15c/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667XKONMU2%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T074807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIDloobX1zXITz3XiCxHfLmhiuLjPZ90REbFKprQmT6%2F1AiEAmStEYw3CO%2BV5bBHRcEuhCf5vou2uzxSmq%2B6hD4baKGAq%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDIyEEnt1Mj%2FClRIUmircA2V8qaB4sxIdYk9k9WQ%2B03W103rlQ%2Br9hjBmWKj7QlKM94nZWF4xpSTKyRnWyFbbzng%2FbU47c4T0AZn3EPYG4apU0DQVBSen9iG%2FDZw4Gigx9Taj%2FZzYdOOPIQ5xhx9oGhP515%2F2F8mX9K0vZdojLwzkPBMLcAvpAftXS1LrBcVLUc0e8p1TSHPZJRvqP7z6bySKctqwWnvz3Gq5X2NpU6v4cva2%2FBIuCttph2FzU9aqSDKETIeuFiOvgfAjaX%2B13W%2BO5fGPicxF9z2We8c3tWUSdYsZbAKgsqfwuuSfZFAtc%2BB7cmfCooaQkpNWRyIfRq%2BRK5FwZXEiWKVy88wMQbXID8PLa1qoeI5hbkCcDNVfQiUXdd5ylZqzfGvB9MtWh3RmdY0WZoGTY1FHrAegFYKIxc%2Bw2WvPtXRjptrxAhxvFp3pnEkmTrSHOmatGePPyTVdXQpP8a%2FbAS90VJX4lDeohLXmEHUr%2BN%2Fik35oIYP4a1R5q%2FYXMVo%2FlhSDdMv3tOzqM%2FJgYU7p79HKCPFLWx%2BUmZytR8m4XwR5uB%2FITmSdzFMjI788HDj0%2BsKKWmx1JHZxj0iRvvrNZwHhXgRHLtTDTiVbNU5ANgsKbzF32pibMJuSn05I%2FXKjgnCPMIbL7coGOqUBW%2Bj9GRqoC5mXgKqUxpx8thQBeYt%2Bi5dwSjfWd%2FCeehXlp%2B8Doq%2BjCA0KWeZVrYkvjybG1CGyqexo6XJ3IX8toYUpKUIiPYEq6PGWdXuY7t9EsgRd8ebxX%2BOgqBL2H9DGEkkxtMkwQ0eN7%2B5t8HSy66OAynuiggs7PvZITFQzym4QGVvdw63vxTWfGZKbtSzg%2F9l6TsrqZb%2FO5%2FjJlfRYaaZ9UW74&X-Amz-Signature=f6af359f437ce6c1d20032f6be6bd154134a4dedee693f29843a63577c19ecd9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/74816d19-4826-4987-99da-a7850e85f3d3/794b36ca-c4be-451e-be14-8d03ad3d0b4f/image_1.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667XKONMU2%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T074807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIDloobX1zXITz3XiCxHfLmhiuLjPZ90REbFKprQmT6%2F1AiEAmStEYw3CO%2BV5bBHRcEuhCf5vou2uzxSmq%2B6hD4baKGAq%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDIyEEnt1Mj%2FClRIUmircA2V8qaB4sxIdYk9k9WQ%2B03W103rlQ%2Br9hjBmWKj7QlKM94nZWF4xpSTKyRnWyFbbzng%2FbU47c4T0AZn3EPYG4apU0DQVBSen9iG%2FDZw4Gigx9Taj%2FZzYdOOPIQ5xhx9oGhP515%2F2F8mX9K0vZdojLwzkPBMLcAvpAftXS1LrBcVLUc0e8p1TSHPZJRvqP7z6bySKctqwWnvz3Gq5X2NpU6v4cva2%2FBIuCttph2FzU9aqSDKETIeuFiOvgfAjaX%2B13W%2BO5fGPicxF9z2We8c3tWUSdYsZbAKgsqfwuuSfZFAtc%2BB7cmfCooaQkpNWRyIfRq%2BRK5FwZXEiWKVy88wMQbXID8PLa1qoeI5hbkCcDNVfQiUXdd5ylZqzfGvB9MtWh3RmdY0WZoGTY1FHrAegFYKIxc%2Bw2WvPtXRjptrxAhxvFp3pnEkmTrSHOmatGePPyTVdXQpP8a%2FbAS90VJX4lDeohLXmEHUr%2BN%2Fik35oIYP4a1R5q%2FYXMVo%2FlhSDdMv3tOzqM%2FJgYU7p79HKCPFLWx%2BUmZytR8m4XwR5uB%2FITmSdzFMjI788HDj0%2BsKKWmx1JHZxj0iRvvrNZwHhXgRHLtTDTiVbNU5ANgsKbzF32pibMJuSn05I%2FXKjgnCPMIbL7coGOqUBW%2Bj9GRqoC5mXgKqUxpx8thQBeYt%2Bi5dwSjfWd%2FCeehXlp%2B8Doq%2BjCA0KWeZVrYkvjybG1CGyqexo6XJ3IX8toYUpKUIiPYEq6PGWdXuY7t9EsgRd8ebxX%2BOgqBL2H9DGEkkxtMkwQ0eN7%2B5t8HSy66OAynuiggs7PvZITFQzym4QGVvdw63vxTWfGZKbtSzg%2F9l6TsrqZb%2FO5%2FjJlfRYaaZ9UW74&X-Amz-Signature=3bab8159c26a17c9694fc923533d9fb36daf295e30a2ff36da97e8a2f54d5f5a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/74816d19-4826-4987-99da-a7850e85f3d3/1c2c3a6f-4fea-4dd5-a6de-e2a1bb1ff89e/%EC%A4%91%EA%B8%89_%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8_PPT_%281%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667XKONMU2%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T074807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIDloobX1zXITz3XiCxHfLmhiuLjPZ90REbFKprQmT6%2F1AiEAmStEYw3CO%2BV5bBHRcEuhCf5vou2uzxSmq%2B6hD4baKGAq%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDIyEEnt1Mj%2FClRIUmircA2V8qaB4sxIdYk9k9WQ%2B03W103rlQ%2Br9hjBmWKj7QlKM94nZWF4xpSTKyRnWyFbbzng%2FbU47c4T0AZn3EPYG4apU0DQVBSen9iG%2FDZw4Gigx9Taj%2FZzYdOOPIQ5xhx9oGhP515%2F2F8mX9K0vZdojLwzkPBMLcAvpAftXS1LrBcVLUc0e8p1TSHPZJRvqP7z6bySKctqwWnvz3Gq5X2NpU6v4cva2%2FBIuCttph2FzU9aqSDKETIeuFiOvgfAjaX%2B13W%2BO5fGPicxF9z2We8c3tWUSdYsZbAKgsqfwuuSfZFAtc%2BB7cmfCooaQkpNWRyIfRq%2BRK5FwZXEiWKVy88wMQbXID8PLa1qoeI5hbkCcDNVfQiUXdd5ylZqzfGvB9MtWh3RmdY0WZoGTY1FHrAegFYKIxc%2Bw2WvPtXRjptrxAhxvFp3pnEkmTrSHOmatGePPyTVdXQpP8a%2FbAS90VJX4lDeohLXmEHUr%2BN%2Fik35oIYP4a1R5q%2FYXMVo%2FlhSDdMv3tOzqM%2FJgYU7p79HKCPFLWx%2BUmZytR8m4XwR5uB%2FITmSdzFMjI788HDj0%2BsKKWmx1JHZxj0iRvvrNZwHhXgRHLtTDTiVbNU5ANgsKbzF32pibMJuSn05I%2FXKjgnCPMIbL7coGOqUBW%2Bj9GRqoC5mXgKqUxpx8thQBeYt%2Bi5dwSjfWd%2FCeehXlp%2B8Doq%2BjCA0KWeZVrYkvjybG1CGyqexo6XJ3IX8toYUpKUIiPYEq6PGWdXuY7t9EsgRd8ebxX%2BOgqBL2H9DGEkkxtMkwQ0eN7%2B5t8HSy66OAynuiggs7PvZITFQzym4QGVvdw63vxTWfGZKbtSzg%2F9l6TsrqZb%2FO5%2FjJlfRYaaZ9UW74&X-Amz-Signature=ab0af9037e2433618c976346a13dd9c55319a42ae04c10b18f3eb5a588aae0a4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![[https://www.youtube.com/watch?v=JtzPJHTxZA0&ab_channel=월텍남-월스트리트테크남](https://www.youtube.com/watch?v=JtzPJHTxZA0&ab_channel=%EC%9B%94%ED%85%8D%EB%82%A8-%EC%9B%94%EC%8A%A4%ED%8A%B8%EB%A6%AC%ED%8A%B8%ED%85%8C%ED%81%AC%EB%82%A8)](https://prod-files-secure.s3.us-west-2.amazonaws.com/74816d19-4826-4987-99da-a7850e85f3d3/94f6142a-d69e-45c8-a885-ec94a8a85bbc/KakaoTalk_20250703_231148301.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667XKONMU2%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T074807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIDloobX1zXITz3XiCxHfLmhiuLjPZ90REbFKprQmT6%2F1AiEAmStEYw3CO%2BV5bBHRcEuhCf5vou2uzxSmq%2B6hD4baKGAq%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDIyEEnt1Mj%2FClRIUmircA2V8qaB4sxIdYk9k9WQ%2B03W103rlQ%2Br9hjBmWKj7QlKM94nZWF4xpSTKyRnWyFbbzng%2FbU47c4T0AZn3EPYG4apU0DQVBSen9iG%2FDZw4Gigx9Taj%2FZzYdOOPIQ5xhx9oGhP515%2F2F8mX9K0vZdojLwzkPBMLcAvpAftXS1LrBcVLUc0e8p1TSHPZJRvqP7z6bySKctqwWnvz3Gq5X2NpU6v4cva2%2FBIuCttph2FzU9aqSDKETIeuFiOvgfAjaX%2B13W%2BO5fGPicxF9z2We8c3tWUSdYsZbAKgsqfwuuSfZFAtc%2BB7cmfCooaQkpNWRyIfRq%2BRK5FwZXEiWKVy88wMQbXID8PLa1qoeI5hbkCcDNVfQiUXdd5ylZqzfGvB9MtWh3RmdY0WZoGTY1FHrAegFYKIxc%2Bw2WvPtXRjptrxAhxvFp3pnEkmTrSHOmatGePPyTVdXQpP8a%2FbAS90VJX4lDeohLXmEHUr%2BN%2Fik35oIYP4a1R5q%2FYXMVo%2FlhSDdMv3tOzqM%2FJgYU7p79HKCPFLWx%2BUmZytR8m4XwR5uB%2FITmSdzFMjI788HDj0%2BsKKWmx1JHZxj0iRvvrNZwHhXgRHLtTDTiVbNU5ANgsKbzF32pibMJuSn05I%2FXKjgnCPMIbL7coGOqUBW%2Bj9GRqoC5mXgKqUxpx8thQBeYt%2Bi5dwSjfWd%2FCeehXlp%2B8Doq%2BjCA0KWeZVrYkvjybG1CGyqexo6XJ3IX8toYUpKUIiPYEq6PGWdXuY7t9EsgRd8ebxX%2BOgqBL2H9DGEkkxtMkwQ0eN7%2B5t8HSy66OAynuiggs7PvZITFQzym4QGVvdw63vxTWfGZKbtSzg%2F9l6TsrqZb%2FO5%2FjJlfRYaaZ9UW74&X-Amz-Signature=65de0d58a3a3c6e7634f1ea6988dc719a076ef0d815763b148a194368275156d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



