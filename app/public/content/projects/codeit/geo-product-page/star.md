# ✨ Info

- **프로젝트명**: GEOPage
- **팀명**: GEOGEO
- **기간**: 2025.06.30 ~ 2025.07.29
- **작성자**: **정영선(K-디지털 해커톤 팀장),** 이학진, 김민준, 박규리
    
    > 고급 프로젝트 기간에는 팀원으로 참여하였으며, 이미지 생성기 구현 및 서버 관리, 보고서 및 발표 정리를 중점적으로 담당했습니다.
    > 
    > 
    > 해커톤 및 후속 발표에서는 팀장 역할을 맡아 전체 흐름을 정리하고, **발표자료 및 요약 슬라이드, 시각화 자료 구성**을 주도했습니다.
    > 
- **자료**:
    
    🔗 [Github](https://github.com/gyurili/2025-GEO-Project)
    
    [보고서](https://www.notion.so/22201c050cec816187fae4700f6f999c?pvs=21)
    
    🎞️ [PPT](https://www.canva.com/design/DAGuzW6BcLs/TSH2U1G7pY5hKnNSlXicyg/edit?utm_content=DAGuzW6BcLs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
    
    [협업일지](https://www.notion.so/22201c050cec81388f3ad4a7e1694e7d?pvs=21)
    

![star3](/asset/images/projects/codeit/geo-product-page/star3.gif)

# 🔹 S (Situation) — 현재 문제

> GPT, Perplexity 등의 AI 검색 도구가 보편화되면서 기존 이미지 위주의 상세페이지는 생성형 AI 검색 도구에 노출되지 않는다는 한계가 있었습니다. 이는 소상공인의 온라인 마케팅 성과 저하로 이어졌으며, 이를 개선하기 위해 **AI가 읽을 수 있는 구조화된 상세페이지**가 필요했습니다.
> 
> 
> 이에 따라, **SEO(Search Engine Optimization)**가 아닌 **GEO(Generative Engine Optimization)**전략에 기반해, **AI가 인식할 수 있는 텍스트 구조로 상세페이지를 자동 생성하는 서비스**가 필요한 상황이었습니다.
> 

---

# 🔹 T (Task) — 내 역할과 과제

> 전체 프로젝트에서 이미지 생성기 구현, 서버 메모리/오류 관리, 품질 평가 실험 및 문서화를 담당했습니다.
> 
> 
> 특히 HuggingFace 기반의 **Stable Diffusion + IP-Adapter 구조를 완성**, VTON 실험을 병행하며 멀티모달 처리 파이프라인을 안정화했고,
> 
> CLI 테스트 자동화 및 캐시 로직 정비, FastAPI 연동, VRAM 이슈 대응 등 실서비스 관점의 **안정성과 재현성 확보**에 기여했습니다.
> 

---

# 🔹 A (Action) — 수행 작업

## 🎨 이미지 생성기 구현 및 최적화

- `image_generator_main.py`, `prompt_builder.py`, `background_handler.py` 등 전체 파이프라인 클래스화 및 리팩토링
- **Stable Diffusion, IP-Adapter, LoRA 기반 텍스트-투-이미지 생성** 구조 통합 및 모델별 품질/ 속도 비
- 텍스트-to-이미지 생성 품질 향상을 위한 **프롬프트 구조 분리(제품 중심 vs 인물 중심)**
- 생성 이미지 품질 불안정 해결 위해 **seed 고정 및 캐시 기반 재사용 로직 구현**
- **IP-Adapter + VTON 흐름을 직접 실험**하고, 마스킹 오류 및 흐름 단절 문제를 식별함
- 이미지 품질 및 스케일 적합성 분석을 통해 실제 서비스 적용 가능성 검토
- FastAPI + Streamlit 라우터 연결 및 엔드포인트 관리

## 🔍  서버/메모리 관리 및 오류 대응

- `torch.cuda.empty_cache()` 활용한 메모리 누수 대응 및 VRAM 최적화
- 모델 로딩 방식 개선: FastAPI `lifespan` 구조를 통해 1회 로딩 후 재사용
- Hugging Face 모델 로딩 오류 (`ip-adapter_sdxl.json` 누락 등) 직접 분석 및 해결
- vLLM 실행 시 VRAM 초과 문제 분석 및 실행 중단 판단
- 서버 내 공간 부족(ENOSPC), 권한 오류(EACCES) 등 **GCP 서버 장애 대응 및 수동 복구 수행**

## 📋 실험 로깅 및 기술 문서화

- 다양한 Hugging Face 모델(SDXL, RealVisXL, Playground-v2.5 등) 실험 및 비교
- IP-Adapter + ControlNet + LoRA 조합 구조 성능 비교
- `image_test.py`를 통해 CLI 테스트 모듈 정리 및 로그 기록화
- HuggingFace vs Gemini API 비교 분석 보고서 정리 및 발표자료 구조화
- README `설치 및 실행 방법`, MySQL 설정 가이드, 실행 흐름 명시

---

# 🔹 R (Result) — 결과 및 성과

- **Stable Diffusion 기반 구조에서 가장 우수한 품질 조합(SDXL Turbo + IPAdapter) 도출**
- **모델별 VRAM 사용량, 로딩 시간, 품질 차이를 수치 기반으로 정리하여 발표자료에 반영**
- **CLI 테스트 자동화 및 캐시 재사용 로직 구현 → 이미지 품질 일관성 확보**
- FastAPI 기반 API 흐름 정비로 **모델 재사용 및 속도 안정화**
- Gemini API 및 HuggingFace 성능 비교 분석 → 발표 자료 반영
- **보고서, 발표자료, README 모두 기술 흐름과 실험 결과 기반으로 재정비**
- GEO 전략 기반 상세페이지 자동 생성 파이프라인 구현 완료
- GCP 기반 배포 환경에서 실시간 테스트 가능 MVP 제공

---

# 📌 회고 (Reflection)

- 단순한 생성형 AI 실험이 아닌, **AI 콘텐츠 생성의 서비스화를 목표로 기능을 설계하고 구현한 점**에서 큰 의미가 있었습니다.
- 모델 품질, 실행 속도, VRAM/디스크 자원 한계 등 **실무에서 중요한 제약 조건들을 직접 다뤄본 실전형 프로젝트**였습니다.
- GEO 전략을 구현하며, **AI 검색이 무엇을 “인용할 수 있는지”에 대한 이해**가 깊어졌고, AI와 마케팅이 교차하는 지점을 경험했습니다.
- 팀원들과 실험 결과를 공유하며 프롬프트 설계, 캐시 활용, 실험 자동화 등 **지속가능한 실험 환경 설계**를 배우게 되었습니다.
- 다양한 기능이 단일 페이지에 통합되면서 **사용자 흐름을 고려한 예외 처리, 입력 최소화, 구성 순서 조정 등의 중요성**을 경험하며 UI/UX 설계가 왜 중요한지도 배우는 서비스 설계 관점을 확장할 수 있었습니다.
- 기술 외적으로는, **비정형 문제 상황(모델 오류, 메모리 초과, 마스킹 실패 등)에 대한 대응 능력**을 키울 수 있었습니다.
- 고급 프로젝트에서는 팀원이었지만, **해커톤 기간 및 발표 준비 기간에는 팀장으로서 전체 흐름을 정리하고 발표 흐름을 조율하며 리더십을 발휘할 기반**이 되었습니다.
- K-디지털 해커톤 발표에서 전체 발표 흐름 시나리오 및 요약 자료를 구성하고, 슬라이드 시나리오와 대본 작성까지 총괄할 예정입니다.
- K-디지털 해커톤에서 고용노동부 장관상을 수상했으나 3위로 아쉬운 성적이었습니다. 다음에는 이때의 아쉬운 점을 반영하여 더 좋은 결과를 낼 것입니다.

![star1](/asset/images/projects/codeit/geo-product-page/star1.png)

![star2](/asset/images/projects/codeit/geo-product-page/star2.png)
