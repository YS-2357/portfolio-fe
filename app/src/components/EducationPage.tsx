import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { parseMarkdownBlocks } from './markdownBlocks'

const fetchText = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) return ''
  const contentType = res.headers.get('content-type') || ''
  const text = await res.text()
  if (contentType.includes('text/html')) return ''
  if (text.trim().toLowerCase().startsWith('<!doctype html')) return ''
  return text
}

export default function EducationPage() {
  const [blocks, setBlocks] = useState<ReturnType<typeof parseMarkdownBlocks>>([])

  useEffect(() => {
    fetchText('/content/resume/education.md')
      .then((text) => setBlocks(parseMarkdownBlocks(text)))
      .catch(() => setBlocks([]))
  }, [])

  return (
    <div className="landing">
      <header className="hero">
        <div className="hero__copy">
          <p className="hero__eyebrow">Education</p>
          <h1>학력/교육</h1>
          <div className="hero__cta">
            <Link className="btn" to="/">
              랜딩
            </Link>
          </div>
        </div>
      </header>

      <section className="section">
        {blocks.length === 0 ? (
          <p>내용이 없습니다.</p>
        ) : (
          <div className="doc-blocks">
            {blocks.map((block) => (
              <article className="doc-block" key={block.heading}>
                <div className="doc-header">
                  <div>
                    <div className="doc-title">{block.title}</div>
                    {block.subtitle && <div className="doc-subtitle">{block.subtitle}</div>}
                  </div>
                  {block.period && <div className="doc-period">{block.period}</div>}
                </div>
                {block.paragraphs.map((text) => (
                  <p className="doc-paragraph" key={text}>
                    {text}
                  </p>
                ))}
                {block.bullets.length > 0 && (
                  <ul className="doc-bullets">
                    {block.bullets
                      .filter((bullet) => !bullet.link)
                      .map((bullet, index) => (
                        <li key={`${block.heading}-${index}`}>
                          {bullet.label && <span className="doc-label">{bullet.label}</span>}
                          {bullet.value && <span>{bullet.value}</span>}
                          {bullet.items && (
                            <ul className="doc-sublist">
                              {bullet.items.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                  </ul>
                )}
                {block.bullets.find((bullet) => bullet.link) && (
                  <div className="doc-actions">
                    {block.bullets
                      .filter((bullet) => bullet.link)
                      .map((bullet) => (
                        <a
                          key={bullet.link}
                          className="doc-link"
                          href={bullet.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          코드잇 링크
                        </a>
                      ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
