import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
type AwardItem = {
  title: string
  meta: string
  note?: string
  link?: string
}

type AwardSection = {
  title: string
  items: AwardItem[]
}

const fetchText = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) return ''
  const contentType = res.headers.get('content-type') || ''
  const text = await res.text()
  if (contentType.includes('text/html')) return ''
  if (text.trim().toLowerCase().startsWith('<!doctype html')) return ''
  return text
}

const normalizeValue = (value: string) => {
  const cleaned = value.trim()
  if (!cleaned || cleaned === '-') return ''
  return cleaned
}

const parseLine = (line: string): AwardItem | null => {
  const raw = line.replace(/^-\s*/, '')
  const fields = raw.split('|').reduce<Record<string, string>>((acc, part) => {
    const [key, ...rest] = part.split(':')
    if (!key || rest.length === 0) return acc
    acc[key.trim()] = rest.join(':').trim()
    return acc
  }, {})
  const date = normalizeValue(fields['일자'] || '')
  const title = normalizeValue(fields['수상명'] || fields['대회'] || '')
  const grade = normalizeValue(fields['등급'] || fields['수상내역'] || '')
  const host = normalizeValue(fields['주관'] || fields['기관'] || '')
  const note = normalizeValue(fields['비고'] || fields['대상'] || '')
  const link = normalizeValue(fields['링크'] || '')
  const metaParts = [date, grade, host].filter(Boolean)
  const meta = metaParts.join(' · ')
  return {
    title,
    meta,
    note: note || undefined,
    link: link || undefined,
  }
}

const parseAwards = (text: string): AwardSection[] => {
  const lines = text.split('\n').map((line) => line.trim())
  const sections: AwardSection[] = []
  let current: AwardSection | null = null

  for (const line of lines) {
    if (!line) continue
    if (line.startsWith('# ')) continue
    if (line.startsWith('##')) {
      const cleaned = line.replace(/^##\s*/, '').replace(/^#+\s*/, '').trim()
      current = { title: cleaned, items: [] }
      sections.push(current)
      continue
    }
    if (line.startsWith('#')) continue
    if (line.startsWith('- ')) {
      const item = parseLine(line)
      if (item && current) current.items.push(item)
    }
  }

  return sections
}

export default function AwardsPage() {
  const [sections, setSections] = useState<AwardSection[]>([])

  useEffect(() => {
    fetchText('/content/awards/all.md')
      .then((text) => setSections(parseAwards(text)))
      .catch(() => setSections([]))
  }, [])

  return (
    <div className="landing">
      <header className="hero">
        <div className="hero__copy">
          <p className="hero__eyebrow">수상</p>
          <h1>전체 수상 목록</h1>
          <div className="hero__cta">
            <Link className="btn" to="/">
              랜딩
            </Link>
          </div>
        </div>
      </header>

      <section className="section">
        {sections.length === 0 ? (
          <p>내용이 없습니다.</p>
        ) : (
          <div className="awards">
            {sections.map((section) => (
              <div className="awards__section" key={section.title}>
                <h2>{section.title} 수상</h2>
                <ul className="awards__list">
                  {section.items.map((item, index) => (
                    <li className="awards__item" key={`${section.title}-${index}`}>
                      <div className="awards__title">{item.title}</div>
                      {item.meta && <div className="awards__meta">{item.meta}</div>}
                      {item.note && <div className="awards__note">{item.note}</div>}
                      {item.link && (
                        <a className="awards__link" href={item.link} target="_blank" rel="noreferrer">
                          상세 링크
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
