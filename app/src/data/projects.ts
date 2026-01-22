export type ProjectMeta = {
  slug: string
  title: string
  label: string
  imagePath: string
  summaryPath: string
  cardSummary: string
  subtitle: string
}

export const projects: ProjectMeta[] = [
  {
    slug: 'pill-recognition',
    title: 'AI 기반 알약 이미지 객체 탐지',
    label: 'AI',
    imagePath: '/asset/images/projects/codeit/pill-recognition/infographic.png',
    summaryPath: '/content/projects/codeit/pill-recognition/summary.md',
    cardSummary: '정밀 탐지 + 자동화 파이프라인으로 mAP@0.5 0.99334 달성',
    subtitle: '정확도와 재현성을 동시에 확보한 헬스케어 탐지 시스템',
  },
  {
    slug: 'rfp-rag',
    title: 'RFPilot: B2G 제안서 분석 RAG',
    label: 'RAG',
    imagePath: '/asset/images/projects/codeit/rfp-rag/infographic.png',
    summaryPath: '/content/projects/codeit/rfp-rag/summary.md',
    cardSummary: 'Hybrid Search + Re-ranking으로 문서 요약·QA 속도 개선',
    subtitle: '최적화된 RAG 파이프라인과 QA 챗봇 설계',
  },
  {
    slug: 'geo-product-page',
    title: 'GEOPage: 소상공인 상세페이지 자동 생성',
    label: 'GEO',
    imagePath: '/asset/images/projects/codeit/geo-product-page/infographic.png',
    summaryPath: '/content/projects/codeit/geo-product-page/summary.md',
    cardSummary: '검색 최적화(SEO/GEO) 기반 페이지 자동 생성',
    subtitle: '데이터 분석→자동 생성→출력까지 이어지는 End-to-End 흐름',
  },
]
