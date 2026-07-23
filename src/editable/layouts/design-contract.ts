import type { CSSProperties } from 'react'

/*
  Editorial "Story Alley" palette — cream paper, warm red accent, vibrant
  violet CTA. Every editable surface reads these tokens.
*/
export const editableRootStyle = {
  '--slot4-page-bg': '#f4ecdc',
  '--slot4-page-text': '#1c1a17',
  '--slot4-panel-bg': '#efe5cf',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#5a5347',
  '--slot4-soft-muted-text': '#8a8172',
  '--slot4-accent': '#c9432a',
  '--slot4-accent-fill': '#c9432a',
  '--slot4-accent-soft': '#f7dfd6',
  '--slot4-on-accent': '#ffffff',
  '--slot4-cta': '#a544d9',
  '--slot4-cta-hover': '#8a2fc4',
  '--slot4-dark-bg': '#1c1a17',
  '--slot4-dark-text': '#f4ecdc',
  '--slot4-media-bg': '#e8dfc8',
  '--slot4-cream': '#f4ecdc',
  '--slot4-warm': '#efe5cf',
  '--slot4-lavender': '#efe5f7',
  '--slot4-gray': '#eee6d1',
  '--slot4-body-gradient': 'radial-gradient(1200px 600px at 10% -10%, #f7e7cf 0%, transparent 55%), radial-gradient(900px 500px at 100% 10%, #f0e3f5 0%, transparent 60%)',
  '--editable-page-bg': '#f4ecdc',
  '--editable-page-text': '#1c1a17',
  '--editable-container': '1280px',
  '--editable-border': '#d9cfb6',
  '--editable-nav-bg': '#f4ecdc',
  '--editable-nav-text': '#1c1a17',
  '--editable-nav-active': '#c9432a',
  '--editable-nav-active-text': '#ffffff',
  '--editable-cta-bg': '#a544d9',
  '--editable-cta-text': '#ffffff',
  '--editable-search-bg': '#ffffff',
  '--editable-footer-bg': '#efe5cf',
  '--editable-footer-text': '#1c1a17',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  onAccentText: 'text-[var(--slot4-on-accent)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[var(--editable-border)]',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_2px_8px_rgba(28,26,23,0.06)]',
  shadowStrong: 'shadow-[0_18px_48px_rgba(28,26,23,0.14)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.72))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
    sectionY: 'py-14 sm:py-16 lg:py-20',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[240px] shrink-0 snap-start sm:w-[260px]',
  },
  type: {
    eyebrow: 'text-xs font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]',
    heroTitle: 'text-4xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-5xl lg:text-[3.25rem]',
    sectionTitle: 'text-3xl font-semibold tracking-[-0.02em] sm:text-4xl',
    body: 'text-base leading-relaxed',
  },
  surface: {
    card: `rounded-2xl border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-2xl border ${editablePalette.border} ${editablePalette.panelBg}`,
    dark: `rounded-2xl ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-cta)] px-6 py-3 text-sm font-bold tracking-[0.02em] text-white transition duration-200 hover:bg-[var(--slot4-cta-hover)] active:scale-[0.98]`,
    secondary: `inline-flex items-center justify-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-6 py-3 text-sm font-bold tracking-[0.02em] text-[var(--slot4-page-text)] transition duration-200 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)] active:scale-[0.98]`,
    accent: `inline-flex items-center justify-center gap-2 rounded-full ${editablePalette.accentBg} px-6 py-3 text-sm font-bold text-[var(--slot4-on-accent)] transition duration-200 hover:brightness-95 active:scale-[0.98]`,
  },
  media: {
    frame: `relative overflow-hidden rounded-2xl ${editablePalette.mediaBg}`,
    ratio: 'aspect-[16/10]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(28,26,23,0.18)]',
    fade: 'transition duration-300 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'Editorial cream + red + violet palette. Every editable surface consumes CSS vars from editableRootStyle.',
  'Keep home structure inside HomeSections.tsx so AI can redesign the whole home experience in one file.',
  'Use editorial rails and column blocks; posts should feel like a magazine index.',
  'Keep dynamic post fetching intact; do not replace posts with mock arrays.',
  'Use postHref() for all post links so task-specific routes keep working.',
] as const
