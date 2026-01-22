import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
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

const pages = ['star', 'report'] as const

type PageName = (typeof pages)[number]

type Params = {
  project?: string
  page?: string
}

export default function MarkdownPage() {
  const { project, page } = useParams<Params>()
  const [content, setContent] = useState('')
  const currentPage = (page as PageName) || 'star'
  const meta = projects.find((item) => item.slug === project)

  useEffect(() => {
    if (!project) return
    const safePage = pages.includes(currentPage) ? currentPage : 'star'
    fetchText(`/content/projects/codeit/${project}/${safePage}.md`)
      .then((text) => setContent(text))
      .catch(() => setContent(''))
  }, [project, currentPage])

  if (!project) return null

  return (
    <div className="landing">
      <header className="hero">
        <div className="hero__copy">
          <p className="hero__eyebrow">프로젝트</p>
          <h1>{meta?.title || project}</h1>
          {meta?.subtitle ? <p className="hero__subtitle">{meta.subtitle}</p> : null}
          <div className="hero__cta">
            <NavLink className="btn" to={`/projects/codeit/${project}`}>
              인포그래픽
            </NavLink>
            <NavLink
              className={({ isActive }) => `btn${isActive ? ' btn--primary' : ''}`}
              to={`/projects/codeit/${project}/star`}
              end
            >
              요약
            </NavLink>
            <NavLink
              className={({ isActive }) => `btn${isActive ? ' btn--primary' : ''}`}
              to={`/projects/codeit/${project}/report`}
              end
            >
              보고서
            </NavLink>
            <NavLink className="btn" to="/">
              랜딩
            </NavLink>
          </div>
        </div>
      </header>

      <section className="section markdown">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ h1: () => null }}>
          {content || '내용이 없습니다.'}
        </ReactMarkdown>
      </section>
    </div>
  )
}
