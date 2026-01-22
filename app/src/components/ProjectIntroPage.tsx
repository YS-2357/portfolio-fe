import { Link, useParams } from 'react-router-dom'
import { projects } from '../data/projects'

type Params = {
  project?: string
}

export default function ProjectIntroPage() {
  const { project } = useParams<Params>()
  const meta = projects.find((item) => item.slug === project)

  if (!meta) return null

  return (
    <div className="landing">
      <header className="hero">
        <div className="hero__copy">
          <p className="hero__eyebrow">프로젝트</p>
          <h1>{meta.title}</h1>
          <p className="hero__subtitle">{meta.subtitle}</p>
          <div className="hero__cta">
            <Link className="btn btn--primary-solar" to={`/projects/codeit/${meta.slug}/star`}>
              요약
            </Link>
            <Link className="btn" to={`/projects/codeit/${meta.slug}/report`}>
              보고서
            </Link>
            <Link className="btn" to="/projects">
              프로젝트 목록
            </Link>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="project-hero">
          <img src={meta.imagePath} alt={`${meta.title} infographic`} />
        </div>
      </section>
    </div>
  )
}
