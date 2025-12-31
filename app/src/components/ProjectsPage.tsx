import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const fetchText = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) return ''
  const contentType = res.headers.get('content-type') || ''
  const text = await res.text()
  if (contentType.includes('text/html')) return ''
  if (text.trim().toLowerCase().startsWith('<!doctype html')) return ''
  return text
}

const projects = [
  {
    slug: 'pill-recognition',
    title: '알약 탐지 AI',
    path: '/content/projects/codeit/pill-recognition/summary.md',
    link: '/projects/codeit/pill-recognition/star',
  },
  {
    slug: 'rfp-rag',
    title: 'RFP RAG 시스템',
    path: '/content/projects/codeit/rfp-rag/summary.md',
    link: '/projects/codeit/rfp-rag/star',
  },
  {
    slug: 'geo-product-page',
    title: '상세페이지 자동 생성',
    path: '/content/projects/codeit/geo-product-page/summary.md',
    link: '/projects/codeit/geo-product-page/star',
  },
]

export default function ProjectsPage() {
  const [content, setContent] = useState<Record<string, string>>({})

  useEffect(() => {
    Promise.all(projects.map((project) => fetchText(project.path))).then((texts) => {
      const next: Record<string, string> = {}
      texts.forEach((text, index) => {
        next[projects[index].slug] = text
      })
      setContent(next)
    })
  }, [])

  return (
    <div className="landing">
      <header className="hero">
        <div className="hero__copy">
          <p className="hero__eyebrow">Projects</p>
          <h1>프로젝트 하이라이트</h1>
          <div className="hero__cta">
            <Link className="btn" to="/">
              랜딩
            </Link>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="grid grid--3">
          {projects.map((project) => (
            <div className="card project-card" key={project.slug}>
              <h2>{project.title}</h2>
              <p>{content[project.slug] || '내용이 없습니다.'}</p>
              <div className="project-card__actions">
                <Link className="btn btn--primary-solar" to={project.link}>
                  상세 보기
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
