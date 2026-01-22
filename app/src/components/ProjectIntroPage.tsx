import { NavLink, useParams } from 'react-router-dom'
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
            <NavLink
              className={({ isActive }) => `btn${isActive ? ' btn--primary-solar' : ''}`}
              to={`/projects/codeit/${meta.slug}`}
              end
            >
              인포그래픽
            </NavLink>
            <NavLink
              className={({ isActive }) => `btn${isActive ? ' btn--primary-solar' : ''}`}
              to={`/projects/codeit/${meta.slug}/star`}
              end
            >
              요약
            </NavLink>
            <NavLink
              className={({ isActive }) => `btn${isActive ? ' btn--primary-solar' : ''}`}
              to={`/projects/codeit/${meta.slug}/report`}
              end
            >
              보고서
            </NavLink>
            <NavLink
              className={({ isActive }) => `btn${isActive ? ' btn--primary-solar' : ''}`}
              to="/projects"
              end
            >
              프로젝트 목록
            </NavLink>
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
