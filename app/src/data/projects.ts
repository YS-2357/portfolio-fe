export type ProjectMeta = {
  slug: string
  title: string
  label: string
  summaryPath: string
}

export const projects: ProjectMeta[] = [
  {
    slug: 'pill-recognition',
    title: '알약 탐지 AI',
    label: 'AI',
    summaryPath: '/content/projects/codeit/pill-recognition/summary.md',
  },
  {
    slug: 'rfp-rag',
    title: 'RFP RAG 시스템',
    label: 'RAG',
    summaryPath: '/content/projects/codeit/rfp-rag/summary.md',
  },
  {
    slug: 'geo-product-page',
    title: '상세페이지 자동 생성',
    label: 'GEO',
    summaryPath: '/content/projects/codeit/geo-product-page/summary.md',
  },
]
