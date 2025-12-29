# 📘 프로젝트 보고서: 헬스케어 알약 이미지 인식

- 프로젝트명: **알약 탐지 AI 모델 개발**
- 팀명: **알약탐지단**
- 기간: 2025.03.14 ~ 2025.04.01 (2주)
- 작성자: 정영선, 구극모, 김정훈, 임성은, 정재의
- GitHub: https://github.com/codeit-Al-Project1/pill_detection_ai

## 🧑‍🤝‍🧑 팀 구성 및 역할

| 이름 | 역할 | 담당 업무 |
| --- | --- | --- |
| **정영선** | Model Architect / 
Experimentation Lead / 
Project Manager | - 전체 모델링 방향 및 실험 전략 수립
- YOLO 및 FRCNN 모델 구축 및 실험 주도
- 파이프라인 통합 설계
- 프로젝트 진행 관리 및 실험 분석 주도 |
| **구극모** | Model Engineer | - 데이터 전처리 및 정제
- Faster R-CNN 모델 구현
- 학습 모듈 유지보수 및 디버깅 |
| **정재의** | Model Engineer | - Faster R-CNN 모델 구현
- Faster R-CNN 학습 파이프라인 구현
- 모델 학습 코드 유지보수 및 실험 보조 |
| **김정훈** | Data Analyst / 
Model Engineer | - 데이터 EDA 및 클래스 불균형 분석
- YOLO 모델 구축 및 학습
- 성능 비교 실험 참여 |
| **임성은** | Model Engineer | - YOLO 학습용 데이터 변환 스크립트 작성
- YOLO 학습 모듈 구축 및 실험
- YOLO 실험결과 분석 참여 |

---

## 🧾 프로젝트 요약

본 프로젝트는 이미지 인식 기술을 헬스케어 분야에 적용하여, **알약 이미지 속 각 알약의 위치(Bounding Box)와 종류(Class)를 정확히 예측하는 AI 모델을 구축하는 것**을 목표로 합니다.

이를 통해 사용자는 복약 중인 약에 대한 정보를 자동으로 확인하고, 복용 주의 사항 등을 효과적으로 인지할 수 있습니다.

프로젝트 진행 중, **동일한 형태 및 색상의 약이 다수 존재**해 분류 난이도가 높았고, **클래스 불균형으로 인해 일부 클래스에 대한 인식률이 낮은 문제가 발생**했습니다.

이에 대해 **시각적 특징 강조 증강(Augmentation) 기법과 Focal Loss, 손실 가중치 조절**을 적용하여 분류 성능을 보완하였습니다.

모델 학습과정에서 훈련과 검증을 동시에 진행하여, **검증 mAP50가 개선된 경우에만 모델의 가중치를 저장**해 과적합을 막았습니다.

또한, YOLO와 Faster R-CNN 간의 구조적 차이를 경험할 수 있었으며, **모델별로 최적화된 증강 전략과 하이퍼파라미터 조합을 적용**하여 성능을 극대화했습니다.

**팀원 간 역할 분담과 코드 리뷰를 통해 협업 효율성을 높였고, 주요 실험 결과를 반복적으로 검증하면서 신뢰성 있는 결과를 도출**할 수 있었습니다.

## 🧠 문제 정의

본 프로젝트는 **이미지 기반 객체 탐지(Object Detection)** 문제로 정의됩니다.

사용자는 약을 촬영한 이미지를 입력하면, 모델이 해당 이미지 내 **알약의 위치(Bounding Box)**와 **알약 종류(Class)**를 식별하는 것이 목적입니다.

- 한 이미지에 **3~4개의 알약**이 존재하며, 총 **1489개 이미지**가 존재합니다.
- 각 알약은 **총 74개 클래스 중 하나**에 속합니다.
- 모델은 이미지에서 알약을 검출(위치)하고, 분류(종류)를 동시에 수행해야 합니다.

따라서 본 과제는 **멀티클래스 객체 탐지 문제**로 정의되며, 이에 따라 대표적인 두 객체 탐지 프레임워크인 **Faster R-CNN(Two Stage Detector)**과 **YOLO(One Stage Detector)**을 중심으로 성능을 비교 실험하였습니다.

## 📏 평가 지표

모델의 성능 평가는 객체 탐지 분야에서 가장 보편적으로 활용되는 **mAP (mean Average Precision)** 지표를 사용합니다.

- 정확한 박스 탐지와 클래스 예측을 동시에 고려하는 평가 방식입니다.
- 본 프로젝트에서는 **mAP@0.5** (IoU ≥ 0.5일 때 AP 계산)를 채택합니다.
- P-R 커브 분석를 분석해 정밀도 / 재현율 trade-off를 확인합니다.
- 평가 방식: 검증 데이터 기준 mAP + Kaggle leaderboard 제출 점수

## 🧪 데이터 탐색 및 전처리

- `train_images`와 `train_annotations` 기반으로 데이터 구성 분석
- JSON 파일 내 각 이미지에 객체 1개만 포함 → **모든 어노테이션을 이미지 단위로 통합**
- 일부 이미지에서 객체 정보 누락 및 어노테이션 불일치 확인
    
    → **원본 데이터를 기반으로 오류 보완, 총 10개의 비정상 파일 제거**
    
- 총 1489개 파일 중 26개 파일 바운딩 박스 없음 또는 어긋남 → 16개 **직접 수정. 10개 버림.**
    
    
    | 번호 | 파일명 | 비고 (bbox 오류 내용 등) | 수정(O/X) |
    | --- | --- | --- | --- |
    | 138 | K-001900-016551-019607-....png | 바운딩 박스가 어긋남 | O |
    | 267 | K-002483-003743-012081-....png | 바운딩 박스가 겹침 | O |
    | 457 | K-003351-003832-020238-....png | 바운딩 박스가 없음 | X |
    | 486 | K-003351-013900-020238-....png | 바운딩 박스가 없음 | X |
    | 534 | K-003351-016262-018357_….png | 바운딩 박스가 범위를 벗어남 | O |
    | - | … 등 26개 중 16개 수정 |  |  |
- 클래스 불균형 확인 → **이미지 내 소수 클래스 분포를 고려해 Stratified Split 적용**
(단순 클래스 비율이 아닌, **각 이미지가 포함한 전체 오브젝트의 클래스 구성**을 기준으로 분할)
![report1](/asset/images/projects/codeit/pill-recognition/report1.png)
- **동일한 형태·색상의 약이 다수 존재**해 분류 난이도 증가
- 데이터 다운로드~포맷 변경까지 전체 전처리 프로세스 **모듈화 완료**
- 전체 이미지 전처리: 정규화 및 크기 통일 (YOLOv8 default: 640)

---

## ⚙ 전체 파이프라인 구성

데이터 정제 및 병합 → 데이터 전처리 및 포맷 변경 → 데이터 로딩 및 증강 처리
→ 모델 학습 및 성능 평가 → 결과 시각화 및 제출

| 단계 | 설명 | 주요 작업 |
| --- | --- | --- |
| **1단계. 데이터 정제 및 병합** | 다양한 경로에서 수집된 데이터를 통합하고 누락된 파일을 보완 | AI Hub 원천 데이터 다운로드; 누락 이미지/라벨 수동 복원; 어노테이션 JSON 통합; 클래스 재정의 및 ID 매핑 |
| **2단계. 데이터 전처리 및 포맷 변경** | 모델 학습 포맷에 맞춰 어노테이션 변환 및 정제 | YOLO: `YOLOv8`용 `.txt` 변환; FRCNN: `Dict` 포맷으로 바운딩 박스 변환; 정규화 및 이미지 크기 통일 |
| **3단계. 데이터 로딩 및 증강 처리** | `DataLoader` 구성 및 Augmentation 적용 | YOLO: mosaic/hsv/flip; FRCNN: `torchvision.transforms.v2` 커스텀; stratified split 유지 |
| **4단계. 모델 학습 및 성능 평가** | 다양한 설정으로 학습 후 mAP 기반 평가 | YOLO: optimizer 및 모델 사이즈 실험; FRCNN: backbone/Focal Loss/임계값/손실가중치 실험; mAP@0.5, Precision/Recall 기록 |
| **5단계. 결과 시각화 및 제출** | 예측 결과 시각화 및 제출용 포맷 생성 | 바운딩 박스 시각화; 성능 그래프 시각화(loss/mAP 등); 제출 파일 생성 및 Kaggle 업로드 |

---

## 📢 모델링 결과 요약

1. ✅ 최종 채택 모델: Faster R-CNN **(Backbone: MobileNet_v3)**
    - 🔍 **왜 사용했는가?**
        - GPU 자원이 제한된 환경에서도 **효율적인 추론 성능을 낼 수 있는 경량 백본(MobileNet)**을 채택하였고, 전통적인 **2-Stage 객체 탐지 모델의 성능과 해석력을 비교 분석**하기 위한 기준 모델로 활용
    - 📈 최고 성능: **mAP@0.5 = 0.8752**
    - 🏆 Kaggle 제출 최고 점수: **0.39573**
    - 🔍 MobileNet이 **연산 속도가 빠르고 메모리 효율성이 높아 실험 목적에 적합**
    - ⚙️ 최종 실험 조건:
        - Learning rate: 1e-4,  Weight decay: 5e-4
        - Input: 640x640, conf=0.7, iou=0.3
        - Augmentations: RandomResizedCrop(640), HorizontalFlip, VerticalFlip, ColorJitter, Grayscale, Perspective, GaussianBlur
        - Optimizer: AdamW, Batch size: 4
        - Scheduler: ReduceLROnPlateau
2. ✅ 최종 채택 모델: **YOLOv8-l (large)**
    - 🔍 **왜 사용했는가?**
        - 다양한 실무 분야에서 채택되고 있는 최신 YOLO 계열 중 **가장 안정성과 성능이 검증된 v8을 선택**하였으며, 전통적인 **1-Stage 객체 탐지 모델의 속도·정확도 균형 측면에서 우수한 기준선 확보 목적**
    - 📈 최고 성능: **mAP@0.5 = 0.99334**
    - 🏆 Kaggle 제출 최고 점수: **0.99857**
    - 🔍 YOLO는 FRCNN 대비 **mAP, 분류 정확도, 추론 속도 전 영역에서 일관된 우위를 보임**
    - ⚙️ 최종 실험 조건:
        - Learning rate: 1.28e-4,  Weight decay: 5e-4
        - Input: 640x640, conf=0.5, iou=0.5
        - Augmentations: Mosaic / HSV augmentation (h=0.015, s=0.7, v=0.4) / Horizontal Flip (p=0.5) / Translate (0.1) / Scale (0.5)
        - Optimizer: AdamW, Batch size: 8

---

## ⚗ 실험 요약 - Faster R-CNN

### 1. 데이터 증강

- Augmentations: RandomResizedCrop(640), HorizontalFlip, VerticalFlip, ColorJitter, Grayscale, Perspective, GaussianBlur
- ~~Rotation~~ → Bounding Box의 변형이 일어나 채택하지 않음

### 2. 실험 결과

- 클래스 분류 손실이 가장 큰 문제로 파악되어, **Focal Loss 적용 및 classifier loss 가중치 조정**
- 모든 backbone에서 classification loss가 가장 느리게 수렴
- mobilenet_v3_large가 가장 mAP 성능이 우수함

| Backbone | Classification Loss | Box Loss | Obj Loss | RPN BOX Loss | mAP | 종합 평가 |
| --- | --- | --- | --- | --- | --- | --- |
| mobilenet_v3_large | 0.3946 | 0.2349 | 0.0312 | 0.0220 | 0.8584 | ✅ 가장 우수 |
| efficientnet_b3 | 0.4339 | 0.2330 | 0.04606 | 0.01871 | 0.8427 | ✅ 우수 |
| resnext101 | 0.6761 | 0.3478 | 0.0315 | 0.0108 | 0.4323 | ❌저조 |
| resnet50 | 0.5732 | 0.2811 | 0.00219 | 0.003376 | 0.4202 | ❌저조 |

### 3. Backbone 별 Metric 비교
![report2](/asset/images/projects/codeit/pill-recognition/report2.png)

### 4. 결론

- 본 지표는 Faster R-CNN에 다양한 Backbone을 적용했을 때의 성능 비교 결과이며, **mobilenet_v3_large**를 **Backbone**으로 사용할 경우 **가장 빠른 성능 향상**을 보였음을 나타낸다.
- 각 지표를 통해 확인할 수 있는 바는, **Objectness Loss, Box Loss, RPN Loss**는 학습 초반부터 빠르게 수렴하는 반면, **Classification Loss**는 상대적으로 느리게 수렴하는 경향을 보였다는 점이다.
    
    (해당 성능 지표는 **Focal Loss**를 적용한 상태에서 각 **손실 항목에 가중치**를 곱해 측정한 값이다.)
    
- 첨부된 이미지는 각각 6, 15, 20번째 에폭 종료 시점에서 **중간 점검용으로 추출한 테스트 이미지에 대한 예측 결과**이다. Confidence Score의 임계값은 기본값인 0.5로 설정했으며, 이미지에 대한 Bounding Box는 적절하게 그려지지만, **분류(classification) 단계에서 오분류가 발생하는 사례**를 확인할 수 있다.
왜 오분류를 하는가?
- 이를 통해 판단할 수 있는 점은, **Faster R-CNN은 객체 탐지와 Bounding Box 추론에 있어 우수한 성능을 보이는 반면**, 모델 구조가 복잡한 만큼 **현재 사용한 데이터셋 규모로는 분류 성능까지 안정적으로 학습하기에는 한계가 있었음**을 시사한다.

---

## ⚗ 실험 요약 - YOLO

### 1. 데이터 증강

- Augmentations: Mosaic / HSV augmentation (h=0.015, s=0.7, v=0.4) / Horizontal Flip (p=0.5) / Translate (0.1) / Scale (0.5)
### 2. Optimizer 성능 비교 요약 (YOLOv8n 기준, Epochs: 1~10)

| Optimizer | val/cls_loss ↓ | val/box_loss ↓ | val/dfl_loss ↓ | mAP50 ↑ | 종합 평가 |
| --- | --- | --- | --- | --- | --- |
| AdamW | 안정적인 하락, 최종 loss 가장 낮음 | 초반부터 낮고 꾸준히 하락 | 전체적으로 가장 안정적 | 최고치 0.96 도달 | ✅ 가장 우수 |
| Adam | 초반 급격히 감소, 후반 안정 | 낮고 부드럽게 감소 | 준수한 하강 곡선 | 0.88 수준 도달 | 🔼 거의 비슷하게 우수 |
| RMSProp | 기복 있음, 진폭 큼 | 초반 높고 이후 급격히 감소 | 초기 급등 후 안정화 | 불안정하나 0.85 도달 | ⚠ 성능은 나쁘지 않음 |
| SGD | 거의 변화 없음 | 느리게 하락 | 변화 적음 | 0.1 수준 유지 | ❌ 성능 가장 낮음 |
![report3](/asset/images/projects/codeit/pill-recognition/report3.png)
---

### 3. YOLOv8 모델 사이즈 비교 (Epochs: 25 기준)

| 사이즈 | mAP@0.5 최고점 | val/cls_loss 최종값 | val/box_loss 최종값 | val/dfl_loss 최종값 | 종합 평가 |
| --- | --- | --- | --- | --- | --- |
| **large** | **약 0.998+** | **최소 0.15 수준** | **0.22 수준** | **0.80 부근 유지** | ⭐ 최고 성능 |
| **medium** | 약 0.997 | **0.18 이하** | **0.20 이하** | **0.77 이하** | ★★ 우수 성능 |
| **small** | 약 0.99 | **0.20 이하** | **0.21 이하** | **0.77 이하** | ★ 균형 잡힌 성능 |
| **nano** | 약 0.94 | **0.45** 이상 | **0.23** 이상 | **0.80+** | 성능 낮음, 경량화는 유리 |
![report4](/asset/images/projects/codeit/pill-recognition/report4.png)
### 4. 결론

- YOLOv8 모델은 Learning rate: 1e-4, Weight decay: 5e-4일 때, Optimizer 선택에 따라 성능 차이가 크게 나타났으며, **AdamW 사용 시 가장 우수한 성능을 기록**함
- 모델 사이즈에 따라 **정확도-연산 효율 간 trade-off가 분명히 존재**하며, 실제 서비스 목적에 맞는 모델 크기 선택이 중요함을 확인함

## 📈 성능 분석 시각화

- YOLO vs FRCNN 성능 로그 비교
    ![report5](/asset/images/projects/codeit/pill-recognition/report5.png)
- 📂 이미지 ID: 1 - YOLO vs FRCNN 예측 비교
    
    
    | 🟦 Class ID | YOLO Score | YOLO BBox (x, y, w, h) | FRCNN BBox (x, y, w, h) | FRCNN Score | 🟥 Class ID |
    | --- | --- | --- | --- | --- | --- |
    | 1899 | 0.9817 | (158, 250, 206, 126) | (150, 249, 220, 128) | 0.5452 | 1899 |
    | 16550 | 0.9714 | (555, 69, 401, 404) | - | - | - |
    | 24849 | 0.9994 | (172, 738, 181, 294) | (165, 731, 208, 299) | 0.6424 | 16547 |
    | 27925 | 0.9432 | (599, 672, 253, 481) | (584, 665, 281, 537) | 0.5687 | 27925 |

---

## ⚠ 한계점 및 향후 개선 방안

1. 데이터 불균형
    - 문제: 소수 클래스에 대한 학습이 부족하여 예측 정확도 편향 발생
    - 해결 방법
        - **Weighted Sampling**: 소수 클래스가 batch에 더 자주 등장하도록 조절
2. 시각적 유사성
    - 문제: 색상·형태가 유사한 약이 많아 모델이 혼동
    - 해결 방법:
        - 시각적 특징 강조용 증강: 밝기, 채도, 대비 조정 등
            - 예: `ColorJitter`, `CLAHE`, `RandomErasing`
            - 시각적으로 유사한 클래스 사이의 미세한 차이를 강조
        - Faster R-CNN에 Mosaic 증강(YOLO 기반) 고려
3. FRCNN의 한계
    - 문제: 추론 속도가 느리고, 학습 초반 성능 저조
        - 2-stage 구조로 인해 Anchor proposal → RoI Pooling → Classification 단계가 복잡
4. YOLO의 우수함
    - 문제: 최신 버전의 YOLO가 빠르고 정확하나 자동화 되어있고 개선 포인트가 명확하지 않음
5. 실험 로깅 및 재현성 부족
    - 문제: 실험 결과를 재현하기 어렵고, 하이퍼파라미터 관리가 어려움
    - 해결방법:
        - `Weights & Biases`, `TensorBoard`, `MLflow` 등 도구 활용하여 실험 추적 체계화 필요
6. 클래스 간 유사도 분석 미흡
    - 문제: 특정 약들이 반복적으로 오분류되나, 그 원인에 대한 분석할 시간 부족
    - 해결 방법:
        - Confusion Matrix 시각화
            - 어떤 클래스가 어떤 클래스와 자주 혼동되는지 파악
            - 주요 오분류 쌍에 대한 집중 분석 가능
        - Feature Embedding 시각화
            - t-SNE, UMAP 등으로 이미지의 feature distribution 시각화
            - 비슷한 클래스가 feature space에서도 가까운지 확인 가능
            - feature 분리가 안 되는 경우, embedding 수준에서 데이터 증강/재구성 필요

---

## 💡 인사이트 및 학습

- 정밀한 실험 설계와 체계적인 로그 분석의 중요성을 실감함
    
    → 실험 변수 통제와 반복 가능성 확보가 모델 성능 개선의 핵심임을 확인
    
- YOLO 계열 모델의 실용적 우수성 재확인
    
    → 최신 YOLO 계열 모델이 **정확도와 추론 속도 모두에서 실용성을 입증**, 실제 응용 환경에서도 유효한 선택지임을 확인
    
- 팀원 간의 적극적인 아이디어 공유가 실험 방향성 개선으로 이어짐
    
    → 모델 구조, 데이터 처리 방식 등에서 다양한 시도를 가능하게 했으며, 협업 기반의 성장이 있었음
    

---

## 📦 기술 스택

| 구분 | 사용 기술 |
| --- | --- |
| **언어 & 프레임워크** | Python 3.11.11, PyTorch, Ultralytics YOLOv8 |
| **모델** | YOLOv8 (nano/small/medium/large), Faster R-CNN (MobileNet_v3, EfficientNet_b3, ResNet50, ResNeXt101) |
| **데이터 처리** | Pandas, NumPy, OpenCV, PIL, JSON |
| **데이터 전처리 & 증강** | Albumentations, TorchVision Transforms v2, Mosaic / HSV / Flip / Resize / Crop 등 |
| **모델 학습 및 최적화** | AdamW Optimizer, Focal Loss, ReduceLROnPlateau, Stratified Split, Learning Rate Scheduler |
| **성능 평가** | mAP@0.5, Confusion Matrix, Precision / Recall, Loss curve 시각화 |
| **시각화 및 분석 도구** | Matplotlib, Seaborn, TensorBoard |
| **실험 기록 및 협업** | GitHub, Google Colab, Notion 협업 문서 |
| **제출 및 결과 관리** | Kaggle Submission 포맷 변환, Bounding Box 시각화 코드 작성 |

---

## 📂 관련 자료

- 🔗 GitHub: https://github.com/codeit-Al-Project1/pill_detection_ai
- 🔗 Kaggle: https://www.kaggle.com/competitions/ai01-level1-project/overview
- 🏆 Kaggle Score: **0.99857 (YOLOv8l)**
- 📊 최종 mAP@0.5: **0.99334 (YOLOv8l)**

---

**이 보고서는 프로젝트 수행 중 작성된 실험 로그, 협업 일지, 팀 노션 기록 등을 바탕으로 구성되었습니다.**

---
