import Link from 'next/link'
import { ArrowRight, ArrowUpRight, ChevronRight, PenSquare, Radio, Search } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import {
  postHref,
  EditorialFeatureCard,
  RailPostCard,
  CompactIndexCard,
  ArticleListCard,
  MediaTileCard,
  EditorialListItem,
  NewsCard,
} from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-10'

function categoryOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
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

/* ============================== HERO ============================== */
export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const [featureA, featureB, ...rest] = pool
  const chips = pool.slice(0, 6).map((post) => categoryOf(post)).filter((c, i, arr) => c && arr.indexOf(c) === i).slice(0, 5)
  const heroBadge = pagesContent.home.hero.badge || 'Fresh stories'

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-16 top-8 h-56 w-56 rounded-full bg-[var(--slot4-cta)]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-[var(--slot4-accent)]/10 blur-3xl" />

      <div className={`${container} pt-10 pb-8 sm:pt-14 lg:pt-16`}>
        <div className="ea-hero-in ea-hero-in-1 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-page-text)] bg-[var(--slot4-surface-bg)] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em]">
            <Radio className="h-3.5 w-3.5 text-[var(--slot4-accent)]" />
            {heroBadge}
          </span>
          <span className="text-sm font-semibold text-[var(--slot4-muted-text)]">
            {new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}
          </span>
        </div>

        <h1 className="ea-hero-in ea-hero-in-2 editable-display mt-6 max-w-5xl text-balance text-4xl font-black leading-[0.98] tracking-[-0.02em] sm:text-6xl lg:text-[5rem]">
          Discover local businesses
          <span className="ea-underline block text-[var(--slot4-accent)]">you&rsquo;ll want to visit.</span>
        </h1>

        <p className="ea-hero-in ea-hero-in-3 mt-6 max-w-2xl text-lg leading-8 text-[var(--slot4-muted-text)]">
          {pagesContent.home.hero.description || 'A curated directory of local businesses, services and community spots — updated every day.'}
        </p>

        <form action="/search" className="ea-hero-in ea-hero-in-4 mt-8 flex w-full max-w-2xl overflow-hidden rounded-full border border-[var(--slot4-page-text)] bg-[var(--slot4-surface-bg)] shadow-[0_10px_30px_rgba(28,26,23,0.08)]">
          <div className="flex flex-1 items-center gap-3 pl-5">
            <Search className="h-5 w-5 shrink-0 text-[var(--slot4-accent)]" />
            <input
              name="q"
              placeholder="Search businesses, services, categories…"
              className="w-full bg-transparent py-4 text-sm text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-muted-text)]"
            />
          </div>
          <button className="shrink-0 bg-[var(--slot4-cta)] px-7 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-[var(--slot4-cta-hover)]">
            Search
          </button>
        </form>

        {chips.length ? (
          <div className="ea-hero-in ea-hero-in-4 mt-6 flex flex-wrap gap-2">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--slot4-muted-text)] mr-2 pt-2">Popular:</span>
            {chips.map((chip) => (
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

      {featureA || featureB ? (
        <div className={`${container} pb-10`}>
          <div className="grid gap-6 lg:grid-cols-2">
            {featureA ? (
              <div className="ea-hero-in ea-hero-in-3">
                <EditorialFeatureCard
                  post={featureA}
                  href={postHref(primaryTask, featureA, primaryRoute)}
                  label="Featured listing"
                />
              </div>
            ) : null}
            {featureB ? (
              <div className="ea-hero-in ea-hero-in-4">
                <EditorialFeatureCard
                  post={featureB}
                  href={postHref(primaryTask, featureB, primaryRoute)}
                  label="Fresh on the alley"
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
                      <Link href={postHref(primaryTask, post, primaryRoute)} className="whitespace-nowrap hover:text-[var(--slot4-accent)]">
                        {post.title.slice(0, 60)}
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
  )
}

/* ==================== THREE-COLUMN MAGAZINE BLOCK ==================== */
/* Latest Lists | Latest News | Latest Videos - matching the reference */
export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  if (!pool.length) return null

  const lists = pool.slice(0, 4)
  const news = pool.slice(4, 8).length ? pool.slice(4, 8) : pool.slice(0, 4)
  const videos = pool.slice(8, 12).length ? pool.slice(8, 12) : pool.slice(0, 4)

  const columns: Array<{ key: string; title: string; accent: string; posts: SitePost[]; variant: 'list' | 'news' | 'media' }> = [
    { key: 'lists', title: 'New Listings', accent: 'text-[var(--slot4-accent)]', posts: lists, variant: 'list' },
    { key: 'news', title: 'Featured Businesses', accent: 'text-[var(--slot4-cta)]', posts: news, variant: 'news' },
    { key: 'videos', title: 'Community Picks', accent: 'text-[var(--slot4-accent)]', posts: videos, variant: 'media' },
  ]

  return (
    <section className="relative py-14 sm:py-20">
      <div className={container}>
        <div className="grid gap-10 lg:grid-cols-3">
          {columns.map((column) => (
            <div key={column.key} className="min-w-0">
              <div className="mb-6 flex items-end justify-between border-b-2 border-[var(--slot4-page-text)] pb-3">
                <h2 className={`editable-display text-2xl font-black tracking-[-0.02em] sm:text-3xl ${column.accent}`}>
                  {column.title}
                </h2>
                <Link href={primaryRoute} className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-accent)]">
                  See all
                </Link>
              </div>

              <div className="grid gap-5">
                {column.posts.map((post, index) => {
                  const href = postHref(primaryTask, post, primaryRoute)
                  if (column.variant === 'list') {
                    return <EditorialListItem key={post.id || post.slug} post={post} href={href} index={index} />
                  }
                  if (column.variant === 'news') {
                    if (index === 0) {
                      return <NewsCard key={post.id || post.slug} post={post} href={href} />
                    }
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
  )
}

/* ==================== ENDLESS AUTO-SLIDING RAIL ==================== */
export function EditableStoryRail({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)]).slice(0, 12)
  if (!pool.length) return null

  const doubled = [...pool, ...pool]

  return (
    <section className="relative border-y border-[var(--editable-border)] bg-[var(--slot4-warm)] py-16">
      <div className={`${container} mb-8`}>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-accent)]">Fresh in the directory</p>
            <h2 className="editable-display mt-2 text-3xl font-black tracking-[-0.02em] sm:text-4xl">Most recent listings</h2>
          </div>
          <Link href={primaryRoute} className="hidden items-center gap-1 text-sm font-bold text-[var(--slot4-cta)] hover:underline sm:inline-flex">
            Browse all listings <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="ea-marquee relative overflow-hidden">
        <div className="ea-marquee-track ea-marquee-slow flex w-max gap-5 px-4 sm:px-6 lg:px-10">
          {doubled.map((post, index) => (
            <div key={`${post.slug || post.id}-${index}`}>
              <RailPostCard
                post={post}
                href={postHref(primaryTask, post, primaryRoute)}
                index={index % pool.length}
              />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-[linear-gradient(90deg,var(--slot4-warm)_0%,transparent_100%)]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-[linear-gradient(270deg,var(--slot4-warm)_0%,transparent_100%)]" />
      </div>
    </section>
  )
}

/* ==================== TIME COLLECTIONS (ranked + horizontal) ==================== */
const sectionCopy: Record<string, { eyebrow: string; title: string; sub: string }> = {
  spotlight: { eyebrow: 'This week', title: 'Handpicked listings', sub: 'Fresh businesses chosen for you.' },
  browse: { eyebrow: 'Trending now', title: 'What people are visiting', sub: 'The listings moving through the directory.' },
  index: { eyebrow: 'Long-standing', title: 'Community favorites', sub: 'Trusted businesses worth another look.' },
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 6), href: primaryRoute },
          { key: 'browse', posts: posts.slice(6, 12), href: primaryRoute },
          { key: 'index', posts: posts.slice(12, 18), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((section) => section.posts.length)
  if (!visible.length) return null

  return (
    <>
      {visible.map((section, sectionIndex) => {
        const copy = sectionCopy[section.key] || { eyebrow: 'Discover', title: 'More to explore', sub: 'Keep browsing.' }
        const rankedPosts = section.posts.slice(0, 6)

        if (sectionIndex === 1) {
          // Middle: horizontal editorial list style
          return (
            <section key={section.key} className="py-16 sm:py-20">
              <div className={container}>
                <div className="mb-10 flex flex-col gap-2">
                  <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-cta)]">{copy.eyebrow}</p>
                  <h2 className="editable-display text-3xl font-black tracking-[-0.02em] sm:text-5xl">{copy.title}</h2>
                  <p className="max-w-2xl text-sm text-[var(--slot4-muted-text)]">{copy.sub}</p>
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                  {rankedPosts.slice(0, 4).map((post, index) => (
                    <ArticleListCard
                      key={post.id || post.slug}
                      post={post}
                      href={postHref(primaryTask, post, primaryRoute)}
                      index={index}
                    />
                  ))}
                </div>
                <div className="mt-10 flex justify-center">
                  <Link
                    href={section.href || primaryRoute}
                    className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--slot4-page-text)] bg-[var(--slot4-page-bg)] px-6 py-3 text-sm font-black uppercase tracking-[0.16em] transition hover:bg-[var(--slot4-page-text)] hover:text-[var(--slot4-page-bg)]"
                  >
                    Load more <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>
          )
        }

        // First + last: ranked list block matching the numbered list style
        return (
          <section
            key={section.key}
            className={sectionIndex % 2 === 0 ? 'bg-[var(--slot4-warm)] py-16 sm:py-20 border-y border-[var(--editable-border)]' : 'py-16 sm:py-20'}
          >
            <div className={container}>
              <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{copy.eyebrow}</p>
                  <h2 className="editable-display mt-2 text-3xl font-black tracking-[-0.02em] sm:text-4xl">{copy.title}</h2>
                </div>
                <Link
                  href={section.href || primaryRoute}
                  className="inline-flex items-center gap-1 text-sm font-bold text-[var(--slot4-cta)] hover:underline"
                >
                  See all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {rankedPosts.map((post, index) => (
                  <CompactIndexCard
                    key={post.id || post.slug}
                    post={post}
                    href={postHref(primaryTask, post, primaryRoute)}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}

/* ==================== CTA BAND ==================== */
export function EditableHomeCta() {
  return (
    <section id="get-app" className="scroll-mt-24 py-16 sm:py-24">
      <div className={container}>
        <div className="relative overflow-hidden rounded-[2rem] bg-[var(--slot4-page-text)] px-6 py-14 text-center shadow-[0_24px_60px_rgba(28,26,23,0.25)] sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-[var(--slot4-cta)]/40 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-[var(--slot4-accent)]/40 blur-3xl" />

          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.22em] text-white">
            <PenSquare className="h-3.5 w-3.5" /> List with us
          </span>
          <h2 className="editable-display mx-auto mt-6 max-w-3xl text-4xl font-black leading-[1.02] tracking-[-0.02em] text-white sm:text-5xl">
            Run a business? Add it to the directory.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/80 sm:text-lg">
            Publish your business on the directory and reach neighbors, customers and community members looking for what you offer.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/create"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-cta)] px-7 py-3.5 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-[var(--slot4-cta-hover)]"
            >
              Add a listing <ArrowUpRight className="h-4 w-4" />
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
  )
}
