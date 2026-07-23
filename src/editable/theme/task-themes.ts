import type { CSSProperties } from 'react'
import type { TaskKey } from '@/lib/site-config'

/*
  Editorial "Story Alley" task tokens.

  Each task inherits one shared identity — cream paper, warm red display accent,
  vibrant violet CTA — matching the homepage. Only kicker/note vary per task.
*/

export type TaskTheme = {
  kicker: string
  note: string
  dark: boolean
  fontDisplay: string
  fontBody: string
  bg: string
  surface: string
  raised: string
  text: string
  muted: string
  line: string
  accent: string
  accentSoft: string
  onAccent: string
  glow: string
  radius: string
}

const DISPLAY_FONT = "'Fraunces', 'Playfair Display', Georgia, serif"
const BODY_FONT = "'Inter', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"

const base = {
  dark: false,
  fontDisplay: DISPLAY_FONT,
  fontBody: BODY_FONT,
  bg: '#f4ecdc',
  surface: '#ffffff',
  raised: '#efe5cf',
  text: '#1c1a17',
  muted: '#5a5347',
  line: '#d9cfb6',
  accent: '#c9432a',
  accentSoft: '#f7dfd6',
  onAccent: '#ffffff',
  glow: 'rgba(201,67,42,0.10)',
  radius: '1rem',
} satisfies Omit<TaskTheme, 'kicker' | 'note'>

export const taskThemes: Record<TaskKey, TaskTheme> = {
  article: { ...base, kicker: 'Reads', note: 'Long-reads, guides, and stories from around the alley.' },
  listing: { ...base, kicker: 'Directory', note: 'Discover and compare businesses in the community index.' },
  classified: { ...base, kicker: 'Notices', note: 'Fresh offers and everyday finds worth acting on.' },
  image: { ...base, kicker: 'Gallery', note: 'A visual feed of standout photography and gallery posts.' },
  sbm: { ...base, kicker: 'Bookmarks', note: 'Curated resources and reading picks worth saving.' },
  pdf: { ...base, kicker: 'Library', note: 'Downloadable guides, reports and reference documents.' },
  profile: { ...base, kicker: 'People', note: 'Discover contributors, makers and community profiles.' },
}

export function getTaskTheme(task: TaskKey): TaskTheme {
  return taskThemes[task] || taskThemes.article
}

export function taskThemeStyle(task: TaskKey): CSSProperties {
  const t = getTaskTheme(task)
  return {
    '--tk-bg': t.bg,
    '--tk-surface': t.surface,
    '--tk-raised': t.raised,
    '--tk-text': t.text,
    '--tk-muted': t.muted,
    '--tk-line': t.line,
    '--tk-accent': t.accent,
    '--tk-accent-soft': t.accentSoft,
    '--tk-on-accent': t.onAccent,
    '--tk-glow': t.glow,
    '--tk-radius': t.radius,
    '--slot4-accent': t.accent,
    '--slot4-accent-fill': t.accent,
    '--editable-font-display': t.fontDisplay,
    '--editable-font-body': t.fontBody,
    fontFamily: t.fontBody,
  } as CSSProperties
}
