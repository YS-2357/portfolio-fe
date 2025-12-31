export type Bullet = {
  label?: string
  value?: string
  items?: string[]
  link?: string
}

export type DocBlock = {
  heading: string
  title: string
  subtitle?: string
  period?: string
  bullets: Bullet[]
  paragraphs: string[]
}

const parseHeading = (heading: string) => {
  const parts = heading.split(' | ').map((part) => part.trim()).filter(Boolean)
  if (parts.length === 0) {
    return { title: heading }
  }
  if (parts.length === 1) {
    return { title: parts[0] }
  }
  if (parts.length === 2) {
    return { title: parts[0], subtitle: parts[1] }
  }
  return {
    title: parts[0],
    subtitle: parts.slice(1, -1).join(' | '),
    period: parts[parts.length - 1],
  }
}

export const parseMarkdownBlocks = (text: string): DocBlock[] => {
  const lines = text.split('\n')
  const blocks: DocBlock[] = []
  let current: DocBlock | null = null

  for (const line of lines) {
    if (!line.trim()) continue
    if (line.startsWith('# ')) continue
    if (line.startsWith('## ')) {
      const heading = line.replace(/^##\s*/, '').trim()
      const { title, subtitle, period } = parseHeading(heading)
      current = {
        heading,
        title,
        subtitle,
        period,
        bullets: [],
        paragraphs: [],
      }
      blocks.push(current)
      continue
    }

    if (!current) continue

    const isIndentedBullet = /^\s+-\s+/.test(line) && line.startsWith('  ')
    if (isIndentedBullet) {
      const item = line.trim().replace(/^-\s+/, '')
      const last = current.bullets[current.bullets.length - 1]
      if (last) {
        if (!last.items) last.items = []
        last.items.push(item)
      }
      continue
    }

    if (line.trim().startsWith('- ')) {
      const content = line.trim().replace(/^-\s+/, '')
      const [rawLabel, ...rest] = content.split(':')
      if (rest.length > 0) {
        const value = rest.join(':').trim()
        const label = rawLabel.trim()
        current.bullets.push({
          label,
          value: value || undefined,
          link: label === '링크' && value.startsWith('http') ? value : undefined,
        })
      } else {
        current.bullets.push({ value: content })
      }
      continue
    }

    current.paragraphs.push(line.trim())
  }

  return blocks
}
