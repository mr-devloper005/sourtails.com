import Link from 'next/link'
import { ArrowRight, ChevronDown, Radio, Search as SearchIcon, Sparkles } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { getTaskTheme, taskThemeStyle } from '@/editable/theme/task-themes'
import {
  ArticleListCard,
  CompactIndexCard,
  EditorialFeatureCard,
  EditorialListItem,
  MediaTileCard,
  NewsCard,
  RailPostCard,
  getEditableCategory,
  postHref,
  toPlainText,
} from '@/editable/cards/PostCards'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-10'

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return (
    <TaskArchiveView
      task={task}
      posts={posts}
      pagination={pagination}
      category={category}
      basePath={basePath || taskConfig?.route || `/${task}`}
    />
  )
}

export function TaskArchiveView({
  task,
  posts,
  pagination,
  category,
  basePath,
}: {
  task: TaskKey
  posts: SitePost[]
  pagination: SiteFeedPagination
  category: string
  basePath: string
}) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const theme = getTaskTheme(task)
  const page = pagination.page || 1
  const label = taskConfig?.label || task
  const categoryLabel = category === 'all' ? 'All categories' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category

  const deduped = dedupePosts(posts)
  const [heroA, heroB, ...rest] = deduped
  const railPool = deduped.slice(2, 14)
  const railDoubled = railPool.length ? [...railPool, ...railPool] : []
  const magazineLists = deduped.slice(2, 6)
  const magazineNews = deduped.slice(6, 10)
  const magazineMedia = deduped.slice(10, 14)
  const rankedPool = deduped.slice(14, 20)
  const horizontalPool = deduped.slice(20, 24)

  const chipCategories = Array.from(
    new Set(
      deduped
        .slice(0, 8)
        .map((post) => getEditableCategory(post))
        .filter(Boolean)
    )
  ).slice(0, 5)

  const heroWord = label.split(/\s+/)[0] || label
  const heroTitleLead =
    voice?.headline?.replace(new RegExp(`\\b${heroWord}\\b.*$`, 'i'), '').trim() ||
    voice?.headline ||
    `Discover the best ${label.toLowerCase()}`

  return (
    <EditableSiteShell>
      <main style={taskThemeStyle(task)} className="min-h-screen bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        {/* ============== HERO (mirrors EditableHomeHero) ============== */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -left-16 top-8 h-56 w-56 rounded-full bg-[var(--slot4-cta)]/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-[var(--slot4-accent)]/10 blur-3xl" />

          <div className={`${container} pt-10 pb-8 sm:pt-14 lg:pt-16`}>
            <div className="ea-hero-in ea-hero-in-1 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-page-text)] bg-[var(--slot4-surface-bg)] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em]">
                <Radio className="h-3.5 w-3.5 text-[var(--slot4-accent)]" />
                {voice?.eyebrow || theme.kicker}
              </span>
              <span className="text-sm font-semibold text-[var(--slot4-muted-text)]">
                <span className="font-black text-[var(--slot4-page-text)]">{deduped.length}</span> {label.toLowerCase()} · {categoryLabel}
              </span>
            </div>

            <h1 className="ea-hero-in ea-hero-in-2 editable-display mt-6 max-w-5xl text-balance text-4xl font-black leading-[0.98] tracking-[-0.02em] sm:text-6xl lg:text-[4.5rem]">
              {heroTitleLead}
              <span className="ea-underline block text-[var(--slot4-accent)]">{label.toLowerCase()} worth exploring.</span>
            </h1>

            <p className="ea-hero-in ea-hero-in-3 mt-6 max-w-2xl text-lg leading-8 text-[var(--slot4-muted-text)]">
              {voice?.description || theme.note}
            </p>

            <form action={basePath} className="ea-hero-in ea-hero-in-4 mt-8 flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[220px] max-w-sm">
                <select
                  name="category"
                  defaultValue={category}
                  className="h-12 w-full appearance-none rounded-full border border-[var(--slot4-page-text)] bg-[var(--slot4-surface-bg)] pl-5 pr-11 text-sm font-semibold text-[var(--slot4-page-text)] outline-none transition focus:border-[var(--slot4-accent)]"
                  aria-label={voice?.filterLabel || 'Filter category'}
                >
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--slot4-muted-text)]" />
              </div>
              <button className="inline-flex h-12 items-center gap-2 rounded-full bg-[var(--slot4-cta)] px-6 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-[var(--slot4-cta-hover)]">
                <SearchIcon className="h-4 w-4" /> Apply
              </button>
              <Link
                href="/search"
                className="inline-flex h-12 items-center gap-2 rounded-full border-2 border-[var(--slot4-page-text)] px-5 text-sm font-black uppercase tracking-[0.16em] text-[var(--slot4-page-text)] transition hover:bg-[var(--slot4-page-text)] hover:text-[var(--slot4-page-bg)]"
              >
                Search all
              </Link>
            </form>

            {chipCategories.length ? (
              <div className="ea-hero-in ea-hero-in-4 mt-6 flex flex-wrap gap-2">
                <span className="mr-2 pt-2 text-[11px] font-black uppercase tracking-[0.2em] text-[var(--slot4-muted-text)]">Popular:</span>
                {chipCategories.map((chip) => (
                  <Link
                    key={chip}
                    href={`/search?q=${encodeURIComponent(chip)}`}
                    className="rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-1.5 text-xs font-bold text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]"
                  >
                    {chip}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          {heroA || heroB ? (
            <div className={`${container} pb-10`}>
              <div className="grid gap-6 lg:grid-cols-2">
                {heroA ? (
                  <div className="ea-hero-in ea-hero-in-3">
                    <EditorialFeatureCard
                      post={heroA}
                      href={`${basePath}/${heroA.slug}`}
                      label={`Featured ${label.toLowerCase().replace(/s$/, '')}`}
                    />
                  </div>
                ) : null}
                {heroB ? (
                  <div className="ea-hero-in ea-hero-in-4">
                    <EditorialFeatureCard
                      post={heroB}
                      href={`${basePath}/${heroB.slug}`}
                      label={`New this week`}
                    />
                  </div>
                ) : null}
              </div>

              {rest.length ? (
                <div className="ea-marquee mt-10 overflow-hidden rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] py-4">
                  <div className="ea-marquee-track flex w-max items-center gap-8 px-6 text-sm font-black uppercase tracking-[0.24em] text-[var(--slot4-page-text)]">
                    {Array.from({ length: 2 }).flatMap((_, dup) =>
                      rest.slice(0, 10).map((post, i) => (
                        <span key={`${dup}-${post.slug || post.id || i}`} className="flex shrink-0 items-center gap-3">
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--slot4-accent)]" />
                          <Link href={postHref(task, post, basePath)} className="whitespace-nowrap hover:text-[var(--slot4-accent)]">
                            {toPlainText(post.title).slice(0, 60)}
                          </Link>
                        </span>
                      ))
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </section>

        {/* ============== EMPTY STATE ============== */}
        {!deduped.length ? (
          <section className={container}>
            <div className="mx-auto max-w-xl rounded-3xl border border-dashed border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-10 text-center">
              <SearchIcon className="mx-auto h-7 w-7 text-[var(--slot4-muted-text)]" />
              <h2 className="editable-display mt-5 text-2xl font-black tracking-[-0.02em]">Nothing here yet</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--slot4-muted-text)]">
                Try another category, or check back after new {label.toLowerCase()} are published.
              </p>
            </div>
          </section>
        ) : null}

        {/* ============== 3-COLUMN MAGAZINE (mirrors EditableMagazineSplit) ============== */}
        {(magazineLists.length || magazineNews.length || magazineMedia.length) ? (
          <section className="relative py-14 sm:py-20">
            <div className={container}>
              <div className="grid gap-10 lg:grid-cols-3">
                {[
                  { key: 'lists', title: `New ${label}`, accent: 'text-[var(--slot4-accent)]', posts: magazineLists, variant: 'list' as const },
                  { key: 'news', title: `Featured ${label}`, accent: 'text-[var(--slot4-cta)]', posts: magazineNews, variant: 'news' as const },
                  { key: 'videos', title: `Community picks`, accent: 'text-[var(--slot4-accent)]', posts: magazineMedia, variant: 'media' as const },
                ].map((column) => (
                  <div key={column.key} className="min-w-0">
                    <div className="mb-6 flex items-end justify-between border-b-2 border-[var(--slot4-page-text)] pb-3">
                      <h2 className={`editable-display text-2xl font-black tracking-[-0.02em] sm:text-3xl ${column.accent}`}>
                        {column.title}
                      </h2>
                      <Link
                        href={basePath}
                        className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-accent)]"
                      >
                        See all
                      </Link>
                    </div>

                    <div className="grid gap-5">
                      {column.posts.map((post, index) => {
                        const href = `${basePath}/${post.slug}`
                        if (column.variant === 'list') {
                          return <EditorialListItem key={post.id || post.slug} post={post} href={href} index={index} />
                        }
                        if (column.variant === 'news') {
                          if (index === 0) return <NewsCard key={post.id || post.slug} post={post} href={href} />
                          return <EditorialListItem key={post.id || post.slug} post={post} href={href} index={index} />
                        }
                        return <MediaTileCard key={post.id || post.slug} post={post} href={href} index={index} />
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* ============== AUTO RAIL (mirrors EditableStoryRail) ============== */}
        {railDoubled.length ? (
          <section className="relative border-y border-[var(--editable-border)] bg-[var(--slot4-warm)] py-16">
            <div className={`${container} mb-8`}>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-accent)]">Fresh in the {label.toLowerCase()}</p>
                  <h2 className="editable-display mt-2 text-3xl font-black tracking-[-0.02em] sm:text-4xl">Most recent picks</h2>
                </div>
                <Link
                  href={basePath}
                  className="hidden items-center gap-1 text-sm font-bold text-[var(--slot4-cta)] hover:underline sm:inline-flex"
                >
                  Browse all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="ea-marquee relative overflow-hidden">
              <div className="ea-marquee-track ea-marquee-slow flex w-max gap-5 px-4 sm:px-6 lg:px-10">
                {railDoubled.map((post, index) => (
                  <div key={`${post.slug || post.id}-${index}`}>
                    <RailPostCard post={post} href={`${basePath}/${post.slug}`} index={index % railPool.length} />
                  </div>
                ))}
              </div>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-[linear-gradient(90deg,var(--slot4-warm)_0%,transparent_100%)]" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-[linear-gradient(270deg,var(--slot4-warm)_0%,transparent_100%)]" />
            </div>
          </section>
        ) : null}

        {/* ============== HORIZONTAL EDITORIAL ============== */}
        {horizontalPool.length ? (
          <section className="py-16 sm:py-20">
            <div className={container}>
              <div className="mb-10 flex flex-col gap-2">
                <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-cta)]">Editor picks</p>
                <h2 className="editable-display text-3xl font-black tracking-[-0.02em] sm:text-5xl">
                  Handpicked {label.toLowerCase()}
                </h2>
                <p className="max-w-2xl text-sm text-[var(--slot4-muted-text)]">A curated selection worth spending more time with.</p>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                {horizontalPool.map((post, index) => (
                  <ArticleListCard
                    key={post.id || post.slug}
                    post={post}
                    href={`${basePath}/${post.slug}`}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* ============== RANKED LIST ============== */}
        {rankedPool.length ? (
          <section className="border-y border-[var(--editable-border)] bg-[var(--slot4-warm)] py-16 sm:py-20">
            <div className={container}>
              <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-accent)]">Trending now</p>
                  <h2 className="editable-display mt-2 text-3xl font-black tracking-[-0.02em] sm:text-4xl">
                    What people are exploring
                  </h2>
                </div>
                <Link
                  href={basePath}
                  className="inline-flex items-center gap-1 text-sm font-bold text-[var(--slot4-cta)] hover:underline"
                >
                  See all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {rankedPool.map((post, index) => (
                  <CompactIndexCard
                    key={post.id || post.slug}
                    post={post}
                    href={`${basePath}/${post.slug}`}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* ============== PAGINATION ============== */}
        {deduped.length ? (
          <section className={`${container} py-12`}>
            <nav className="flex items-center justify-center gap-3 text-sm">
              {pagination.hasPrevPage ? (
                <Link
                  href={pageHref(basePath, category, page - 1)}
                  className="rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-5 py-2.5 font-black uppercase tracking-[0.14em] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]"
                >
                  Previous
                </Link>
              ) : null}
              <span className="rounded-full bg-[var(--slot4-page-text)] px-5 py-2.5 font-black uppercase tracking-[0.14em] text-[var(--slot4-page-bg)]">
                Page {page} of {pagination.totalPages || 1}
              </span>
              {pagination.hasNextPage ? (
                <Link
                  href={pageHref(basePath, category, page + 1)}
                  className="rounded-full bg-[var(--slot4-cta)] px-5 py-2.5 font-black uppercase tracking-[0.14em] text-white transition hover:bg-[var(--slot4-cta-hover)]"
                >
                  Next
                </Link>
              ) : null}
            </nav>
          </section>
        ) : null}

        {/* ============== CTA BAND ============== */}
        <section className="py-16 sm:py-24">
          <div className={container}>
            <div className="relative overflow-hidden rounded-[2rem] bg-[var(--slot4-page-text)] px-6 py-14 text-center shadow-[0_24px_60px_rgba(28,26,23,0.25)] sm:px-12 sm:py-20">
              <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-[var(--slot4-cta)]/40 blur-3xl" />
              <div className="pointer-events-none absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-[var(--slot4-accent)]/40 blur-3xl" />
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.22em] text-white">
                <Sparkles className="h-3.5 w-3.5" /> Add yours
              </span>
              <h2 className="editable-display mx-auto mt-6 max-w-3xl text-4xl font-black leading-[1.02] tracking-[-0.02em] text-white sm:text-5xl">
                Have a {label.toLowerCase().replace(/s$/, '')} to add?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base text-white/80 sm:text-lg">
                Publish it on {SITE_CONFIG.name} and reach a community actively browsing the {label.toLowerCase()}.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/create"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-cta)] px-7 py-3.5 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-[var(--slot4-cta-hover)]"
                >
                  Add now <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-white/10"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
