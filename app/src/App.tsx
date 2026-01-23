import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { projects } from './data/projects'
import './App.css'

const fetchText = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) return ''
  const contentType = res.headers.get('content-type') || ''
  const text = await res.text()
  if (contentType.includes('text/html')) return ''
  if (text.trim().toLowerCase().startsWith('<!doctype html')) return ''
  return text
}

function App() {
  const [intro, setIntro] = useState('문제 정의에서 배포까지 실행하는 개발자')
  const [summaryItems, setSummaryItems] = useState<string[]>([])
  const [projectSummaries, setProjectSummaries] = useState<Record<string, string>>({})
  const [awards, setAwards] = useState({
    bootcamp: '제7회 K-디지털 해커톤 장관상: 우수상, 전체 389팀 중 3등',
    university: '전국 대학생 수학 경시대회: 동상, 제1분야',
  })
  const [contact, setContact] = useState({
    email: 'joungyoungsun20@gmail.com',
    github: 'https://github.com/YS-2357',
    blog: 'https://velog.io/@ys2357/posts',
    linkedin: 'https://www.linkedin.com/in/youngsun-joung-5b0584345',
    phone: '010-8766-4095',
  })

  const parseAwardSummary = (text: string) => {
    const line = text
      .split('\n')
      .map((value) => value.trim())
      .find((value) => value && !value.startsWith('#') && value.startsWith('-'))
    if (!line) return ''
    const raw = line.replace(/^-\\s*/, '')
    const fields = raw.split('|').reduce<Record<string, string>>((acc, part) => {
      const [key, ...rest] = part.split(':')
      if (!key || rest.length === 0) return acc
      acc[key.trim()] = rest.join(':').trim()
      return acc
    }, {})
    const date = fields['일자']?.slice(0, 4) || ''
    const title = fields['수상명'] || ''
    const grade = fields['등급'] || ''
    const note = fields['비고'] || ''
    const parts = [date && `${date}년`, title, grade && grade]
    const main = parts.filter(Boolean).join(' ')
    return note ? `${main} (${note})` : main
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

  useEffect(() => {
    fetchText('/content/resume/one-line-intro.md')
      .then((text) => {
        const cleaned = text.replace(/^#\s+/m, '').trim()
        if (cleaned) setIntro(cleaned)
      })
      .catch(() => {})

    fetchText('/content/resume/summary.md')
      .then((text) => {
        const items = text
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean)
        if (items.length) setSummaryItems(items)
      })
      .catch(() => {})

    Promise.all(projects.map((project) => fetchText(project.summaryPath)))
      .then((texts) => {
        const next: Record<string, string> = {}
        texts.forEach((text, index) => {
          const project = projects[index]
          next[project.slug] = getSummaryLine(text, project.title)
        })
        setProjectSummaries(next)
      })
      .catch(() => {})

    Promise.all([
      fetchText('/content/awards/bootcamp/awards.md'),
      fetchText('/content/awards/university/awards.md'),
    ])
      .then(([bootcamp, university]) => {
        const nextBootcamp = parseAwardSummary(bootcamp)
        const nextUniversity = parseAwardSummary(university)
        setAwards((prev) => ({
          bootcamp: nextBootcamp || prev.bootcamp,
          university: nextUniversity || prev.university,
        }))
      })
      .catch(() => {})

    fetchText('/content/resume/contact.md')
      .then((text) => {
        const next = { ...contact }
        text
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean)
          .forEach((line) => {
            const [rawKey, ...rest] = line.split(':')
            if (!rawKey || rest.length === 0) return
            const value = rest.join(':').trim()
            const key = rawKey.toLowerCase()
            if (key.includes('email') || key.includes('e-mail')) next.email = value
            if (key.includes('github')) next.github = value
            if (key.includes('linkedin')) next.linkedin = value
            if (key.includes('velog') || key.includes('blog')) next.blog = value
            if (key.includes('phone')) next.phone = value
          })
        setContact(next)
      })
      .catch(() => {})
  }, [])

  return (
    <>
    <div className="landing">
      <header className="hero">
        <div className="hero__copy">
          <p className="hero__eyebrow">M.S. in Mathematics · AI Engineer</p>
          <h1>정영선 포트폴리오</h1>
          <div className="hero__cta">
            <NavLink
              className={({ isActive }) => `btn${isActive ? ' btn--primary-solar' : ''}`}
              to="/"
              end
            >
              랜딩
            </NavLink>
            <NavLink
              className={({ isActive }) => `btn${isActive ? ' btn--primary-solar' : ''}`}
              to="/projects"
            >
              프로젝트 보기
            </NavLink>
            <a className="btn" href="/content/resume/resume.pdf" target="_blank" rel="noreferrer">
              이력서 보기
            </a>
            <NavLink
              className={({ isActive }) => `btn${isActive ? ' btn--primary-solar' : ''}`}
              to="/about"
            >
              About Me
            </NavLink>
          </div>
          <div className="contact hero__contact">
            <div className="contact__row">
              <span className="contact__label">전화</span>
              <a href={`tel:${contact.phone}`} className="contact__link">
                {contact.phone}
              </a>
            </div>
            <div className="contact__row">
              <span className="contact__label">이메일</span>
              <a href={`mailto:${contact.email}`} className="contact__link">
                {contact.email}
              </a>
            </div>
            <div className="contact__badges">
              <a className="badge badge--soft" href={contact.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a
                className="badge badge--soft"
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a className="badge badge--soft" href={contact.blog} target="_blank" rel="noreferrer">
                Velog
              </a>
              <a
                className="badge badge--soft"
                href="https://youngsun-joung.web.app/"
                target="_blank"
                rel="noreferrer"
              >
                Portfolio
              </a>
              <a
                className="badge badge--soft"
                href="https://sapphire-cart-f52.notion.site/Portfolio-19f01c050cec803f9c63e917f0b568ec?pvs=74"
                target="_blank"
                rel="noreferrer"
              >
                Notion
              </a>
            </div>
          </div>
        </div>
        <div className="hero__card">
          <div className="hero__avatar">
            <span className="hero__initials">YS</span>
          </div>
          <div className="hero__meta">
            <div className="meta__desc">{intro}</div>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="section__header">
          <h2>요약</h2>
        </div>
        <ul className="summary-list">
          {summaryItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>핵심 역량</h2>
        </div>
        <ul className="core-lines">
          <li>
            <strong>문제 정의</strong>: 요구사항을 구조화하고 핵심 지표를 설계
          </li>
          <li>
            <strong>구현</strong>: RAG 파이프라인과 정적 UI를 빠르게 프로토타이핑
          </li>
          <li>
            <strong>배포</strong>: 재현 가능한 배포 루틴과 문서화 정착
          </li>
        </ul>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>프로젝트</h2>
          <a className="btn btn--primary-solar" href="/projects">
            모두 보기
          </a>
        </div>
        <ul className="project-list">
          {projects.map((project) => (
            <li key={project.slug}>
              <span className="badge badge--accent">{project.label}</span>
              <div>
                <strong>{project.title}</strong>
                <p>{project.cardSummary || projectSummaries[project.slug] || project.title}</p>
              </div>
              <a className="link" href={`/projects/codeit/${project.slug}`}>
                상세 보기
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>경력사항</h2>
          <a className="btn btn--primary-solar" href="/experience">
            모두 보기
          </a>
        </div>
        <div className="stack">
          <div className="row">
            <div className="row__title">(주)인톡 | 인턴 / AI 개발자</div>
            <div className="row__meta">2025.11.06 - 2026.01.05</div>
          </div>
          <p>
            LangChain 기반 보험 보장분석 자동화 파이프라인 설계·구축, PDF
            텍스트·테이블 추출 및 RAG 구조 설계.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>학력/교육</h2>
          <a className="btn btn--primary-solar" href="/education">
            모두 보기
          </a>
        </div>
        <div className="stack">
          <div className="row">
            <div className="row__title">코드잇 스프린트 AI 엔지니어 01기</div>
            <div className="row__meta">2024.12 - 2025.07</div>
          </div>
          <div className="row">
            <div className="row__title">고려대학교 수학과 석사</div>
            <div className="row__meta">2019.03 - 2024.08</div>
          </div>
          <div className="row">
            <div className="row__title">인하대학교 수학과 학사</div>
            <div className="row__meta">2013.03 - 2019.02</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>수상</h2>
          <a className="btn btn--primary-solar" href="/awards">
            모두 보기
          </a>
        </div>
        <ul className="core-lines">
          <li>{awards.bootcamp}</li>
          <li>{awards.university}</li>
        </ul>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>기술 스택</h2>
        </div>
        <div className="tags">
          <span className="badge badge--soft">Python</span>
          <span className="badge badge--soft">FastAPI</span>
          <span className="badge badge--soft">LangChain</span>
          <span className="badge badge--soft">LangGraph</span>
          <span className="badge badge--soft">React</span>
          <span className="badge badge--soft">TypeScript</span>
          <span className="badge badge--soft">Firebase</span>
          <span className="badge badge--soft">YOLO</span>
          <span className="badge badge--soft">Chroma</span>
          <span className="badge badge--soft">FAISS</span>
          <span className="badge badge--soft">LLM API</span>
        </div>
      </section>

    </div>
    </>
  )
}

export default App
