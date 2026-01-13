import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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

type Params = {
  project?: string
}

const markdownComponents = {
  h1: () => null,
  h2: () => null,
}

export default function ProjectDetailPage() {
  const { project } = useParams<Params>()
  const meta = projects.find((item) => item.slug === project)
  const [content, setContent] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!meta) return
    Promise.all([
      fetchText(meta.summaryPath),
      fetchText(meta.highlightsPath),
      fetchText(meta.stackPath),
      fetchText(meta.linksPath),
    ]).then(([summary, highlights, stack, links]) => {
      setContent({
        summary,
        highlights,
        stack,
        links,
      })
    })
  }, [meta])

  if (!meta) return null

  return (
    <div className="landing">
      <header className="hero">
        <div className="hero__copy">
          <p className="hero__eyebrow">Project</p>
          <h1>{meta.title}</h1>
          <div className="hero__cta">
            <Link className="btn btn--primary-solar" to="/projects">
              프로젝트 목록
            </Link>
            <Link className="btn" to="/">
              랜딩
            </Link>
          </div>
        </div>
      </header>

      <section className="section markdown">
        <div className="section__header">
          <h2>요약</h2>
        </div>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {content.summary || '작성 예정'}
        </ReactMarkdown>
      </section>

      <section className="section markdown">
        <div className="section__header">
          <h2>핵심 성과</h2>
        </div>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {content.highlights || '작성 예정'}
        </ReactMarkdown>
      </section>

      <section className="section markdown">
        <div className="section__header">
          <h2>기술 스택</h2>
        </div>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {content.stack || '작성 예정'}
        </ReactMarkdown>
      </section>

      <section className="section markdown">
        <div className="section__header">
          <h2>링크</h2>
        </div>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {content.links || '작성 예정'}
        </ReactMarkdown>
      </section>
    </div>
  )
}
