export type ProjectMeta = {
  slug: string
  title: string
  label: string
  imagePath: string
  summaryPath: string
}

export const projects: ProjectMeta[] = [
  {
    slug: 'pill-recognition',
    title: '알약 탐지 AI',
    label: 'AI',
    imagePath: '/asset/images/projects/codeit/pill-recognition/infographic.png',
    summaryPath: '/content/projects/codeit/pill-recognition/summary.md',
  },
  {
    slug: 'rfp-rag',
    title: 'RFP RAG 시스템',
    label: 'RAG',
    imagePath: '/asset/images/projects/codeit/rfp-rag/infographic.png',
    summaryPath: '/content/projects/codeit/rfp-rag/summary.md',
  },
  {
    slug: 'geo-product-page',
    title: '상세페이지 자동 생성',
    label: 'GEO',
    imagePath: '/asset/images/projects/codeit/geo-product-page/infographic.png',
    summaryPath: '/content/projects/codeit/geo-product-page/summary.md',
  },
]
