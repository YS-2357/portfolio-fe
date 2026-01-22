import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { projects } from '../data/projects'
const fetchText = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) return ''
  const contentType = res.headers.get('content-type') || ''
  const text = await res.text()
  if (contentType.includes('text/html')) return ''
  if (text.trim().toLowerCase().startsWith('<!doctype html')) return ''
  return text
}

const getSummaryLine = (text: string, fallback: string) => {
  const line = text
    .split('\n')
    .map((value) => value.trim())
    .find(
      (value) =>
        value &&
        !value.startsWith('```') &&
        !value.startsWith('#') &&
        !value.startsWith('##') &&
        !value.startsWith('###') &&
        !value.startsWith('작성 예정'),
    )
  if (!line) return fallback
  return line.replace(/^[-*]+\s*/, '').trim() || fallback
}

export default function ProjectsPage() {
  const [content, setContent] = useState<Record<string, string>>({})

  useEffect(() => {
    Promise.all(projects.map((project) => fetchText(project.summaryPath))).then((texts) => {
      const next: Record<string, string> = {}
      texts.forEach((text, index) => {
        const project = projects[index]
        next[project.slug] = getSummaryLine(text, project.title)
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
            <NavLink className={({ isActive }) => `btn${isActive ? ' btn--primary-solar' : ''}`} to="/projects" end>
              프로젝트
            </NavLink>
            <NavLink className={({ isActive }) => `btn${isActive ? ' btn--primary-solar' : ''}`} to="/" end>
              랜딩
            </NavLink>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="grid grid--3">
          {projects.map((project) => (
            <div className="card project-card" key={project.slug}>
              <h2>{project.title}</h2>
              <p>{project.cardSummary || content[project.slug] || '내용이 없습니다.'}</p>
              <div className="project-card__actions">
                <Link className="btn btn--primary-solar" to={`/projects/codeit/${project.slug}`}>
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
