import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Clock3, MessageCircle, Play } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const logo = typeof content.logo === 'string' ? content.logo : ''
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

export function toPlainText(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;|&apos;/gi, "'")
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    (typeof post?.summary === 'string' && post.summary) ||
    (typeof content.body === 'string' && content.body) ||
    (typeof content.excerpt === 'string' && content.excerpt) ||
    ''
  const clean = toPlainText(raw)
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

/* ---------- 1. Editorial hero — image-first, dark caption strip ---------- */
export function EditorialFeatureCard({ post, href, label = 'Featured story' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className="group block min-w-0 overflow-hidden rounded-3xl shadow-[0_18px_48px_rgba(28,26,23,0.14)]">
      <div className="relative min-h-[440px] sm:min-h-[500px] lg:min-h-[520px]">
        <img
          src={getEditablePostImage(post)}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,26,23,0.05)_0%,rgba(28,26,23,0.85)_75%)]" />
        <div className="relative z-10 flex h-full min-h-[440px] flex-col justify-end p-7 sm:p-10 sm:min-h-[500px] lg:min-h-[520px]">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--slot4-accent)]">
            {label}
          </span>
          <h3 className="editable-display mt-5 max-w-3xl text-3xl font-black leading-[1.02] tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
            {getEditableExcerpt(post, 160)}
          </p>
          <span className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-bold text-white transition group-hover:gap-3">
            Read the story <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

/* ---------- 2. Rail (compact, ranked, portrait cover) ---------- */
export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link
      href={href}
      className={`group ${dc.layout.minRailCard} block overflow-hidden ${dc.surface.card} ${dc.motion.lift}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img
          src={getEditablePostImage(post)}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
        />
        <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--slot4-accent)] text-xs font-black text-white shadow-md">
          {index + 1}
        </span>
      </div>
      <div className="p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">
          {getEditableCategory(post)}
        </p>
        <h3 className="editable-display mt-2 line-clamp-3 text-lg font-black leading-tight tracking-[-0.01em] text-[var(--slot4-page-text)] transition group-hover:text-[var(--slot4-accent)]">
          {post.title}
        </h3>
      </div>
    </Link>
  )
}

/* ---------- 3. Compact ranked list card (with number badge) ---------- */
export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group block min-w-0 rounded-2xl border ${pal.border} ${pal.surfaceBg} p-4 ${dc.motion.lift}`}>
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-accent)] text-xs font-black text-white">
          {index + 1}
        </span>
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">
            <Clock3 className="h-3.5 w-3.5" /> {getEditableCategory(post)}
          </p>
          <h3 className="editable-display mt-2 line-clamp-2 text-lg font-black leading-tight tracking-[-0.01em] text-[var(--slot4-page-text)] transition group-hover:text-[var(--slot4-accent)]">
            {post.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">
            {getEditableExcerpt(post, 100)}
          </p>
        </div>
      </div>
    </Link>
  )
}

/* ---------- 4. Horizontal editorial (large photo + text column) ---------- */
export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link
      href={href}
      className={`group grid min-w-0 gap-5 overflow-hidden rounded-2xl border ${pal.border} ${pal.surfaceBg} p-4 ${dc.motion.lift} sm:grid-cols-[240px_minmax(0,1fr)]`}
    >
      <div className="relative aspect-[16/12] overflow-hidden rounded-xl bg-[var(--slot4-media-bg)] sm:aspect-auto sm:min-h-[190px]">
        <img
          src={getEditablePostImage(post)}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
        />
      </div>
      <div className="min-w-0 sm:py-3 sm:pr-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">
          No. {String(index + 1).padStart(2, '0')} · {getEditableCategory(post)}
        </p>
        <h2 className="editable-display mt-3 line-clamp-3 text-2xl font-black leading-tight tracking-[-0.01em] text-[var(--slot4-page-text)] transition group-hover:text-[var(--slot4-accent)] sm:text-3xl">
          {post.title}
        </h2>
        <p className="mt-3 line-clamp-2 text-sm leading-7 text-[var(--slot4-muted-text)]">
          {getEditableExcerpt(post, 170)}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--slot4-cta)] transition group-hover:gap-3">
          Read article <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}

/* ---------- 5. Media tile (image + tiny caption, like the "videos" cards) ---------- */
export function MediaTileCard({ post, href, index, showPlay = true }: { post: SitePost; href: string; index?: number; showPlay?: boolean }) {
  return (
    <Link
      href={href}
      className={`group relative block overflow-hidden rounded-2xl border ${pal.border} bg-[var(--slot4-media-bg)] ${dc.motion.lift}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={getEditablePostImage(post)}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(28,26,23,0.85)_100%)]" />
        {typeof index === 'number' ? (
          <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--slot4-accent)] text-[11px] font-black text-white">
            {index + 1}
          </span>
        ) : null}
        {showPlay ? (
          <span className="absolute left-4 bottom-16 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[var(--slot4-page-text)] transition group-hover:scale-110">
            <Play className="h-4 w-4 fill-[var(--slot4-accent)] text-[var(--slot4-accent)]" />
          </span>
        ) : null}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="editable-display line-clamp-2 text-base font-black leading-tight tracking-[-0.01em] text-white sm:text-lg">
            {post.title}
          </h3>
        </div>
      </div>
    </Link>
  )
}

/* ---------- 6. Compact editorial (image left, tight column right) ---------- */
export function EditorialListItem({ post, href, index }: { post: SitePost; href: string; index?: number }) {
  return (
    <Link href={href} className="group flex gap-4 border-b border-[var(--editable-border)] pb-5 last:border-0 last:pb-0">
      <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-xl bg-[var(--slot4-media-bg)] sm:w-32">
        <img
          src={getEditablePostImage(post)}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">
          {typeof index === 'number' ? `${String(index + 1).padStart(2, '0')} · ` : ''}
          {getEditableCategory(post)}
        </p>
        <h3 className="editable-display mt-1.5 line-clamp-2 text-base font-black leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)] transition group-hover:text-[var(--slot4-accent)] sm:text-lg">
          {post.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-[var(--slot4-muted-text)] sm:text-sm">
          {getEditableExcerpt(post, 110)}
        </p>
        <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--slot4-cta)]">
          Read <ArrowUpRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  )
}

/* ---------- 7. News card (image top, headline + comments row) ---------- */
export function NewsCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className={`group block overflow-hidden rounded-2xl border ${pal.border} ${pal.surfaceBg} ${dc.motion.lift}`}>
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img
          src={getEditablePostImage(post)}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
        />
      </div>
      <div className="p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">
          {getEditableCategory(post)}
        </p>
        <h3 className="editable-display mt-2 line-clamp-3 text-lg font-black leading-tight tracking-[-0.01em] text-[var(--slot4-page-text)] transition group-hover:text-[var(--slot4-accent)]">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">
          {getEditableExcerpt(post, 130)}
        </p>
        <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-[var(--slot4-muted-text)]">
          <span className="inline-flex items-center gap-1.5"><MessageCircle className="h-3.5 w-3.5" /> Discuss</span>
          <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" /> {new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</span>
        </div>
      </div>
    </Link>
  )
}
