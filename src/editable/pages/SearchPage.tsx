import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Filter, Search as SearchIcon } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { toPlainText } from '@/editable/cards/PostCards'
import { pagesContent } from '@/editable/content/pages.content'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-10'

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const compactRaw = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const getImage = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.find((item) => typeof item?.url === 'string')?.url : ''
  const images = Array.isArray(content.images) ? content.images.find((item) => typeof item === 'string') as string | undefined : ''
  return media || compactRaw(content.featuredImage) || compactRaw(content.image) || compactRaw(content.thumbnail) || images || ''
}
const summaryOf = (post: SitePost) => {
  const content = getContent(post)
  return toPlainText(
    (typeof post.summary === 'string' && post.summary) ||
    compactRaw(content.description) ||
    compactRaw(content.excerpt) ||
    compactRaw(content.body) ||
    '',
  )
}

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

function SearchResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const taskRoute = SITE_CONFIG.tasks.find((item) => item.key === task)?.route
  const href = `${taskRoute || `/${task || 'article'}`}/${post.slug}`
  const image = getImage(post)
  const summary = summaryOf(post)
  const taskLabel = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Post'
  const strong = index % 5 === 0

  return (
    <Link
      href={href}
      className={`group block overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] shadow-[0_2px_8px_rgba(28,26,23,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(28,26,23,0.14)] ${strong ? 'md:col-span-2' : ''}`}
    >
      {image ? (
        <div className={`relative overflow-hidden bg-[var(--slot4-media-bg)] ${strong ? 'aspect-[16/7]' : 'aspect-[16/10]'}`}>
          <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-accent)]">{taskLabel}</span>
        </div>
      ) : null}
      <div className="p-5 sm:p-6">
        {!image ? <span className="inline-flex rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-accent)]">{taskLabel}</span> : null}
        <h2 className="editable-display mt-3 line-clamp-3 text-xl font-black leading-tight tracking-[-0.01em] transition group-hover:text-[var(--slot4-accent)] sm:text-2xl">{post.title}</h2>
        {summary ? <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{summary}</p> : null}
        <span className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--slot4-cta)]">Open result <ArrowRight className="h-4 w-4" /></span>
      </div>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.filter((item) => item.enabled).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled)

  return (
    <EditableSiteShell>
      <main>
        <section className="relative py-14 sm:py-20">
          <div className="pointer-events-none absolute -left-24 top-8 h-64 w-64 rounded-full bg-[var(--slot4-cta)]/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-[var(--slot4-accent)]/10 blur-3xl" />

          <div className={container}>
            <div className="grid gap-10 rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 shadow-[0_18px_48px_rgba(28,26,23,0.08)] md:grid-cols-[0.9fr_1.1fr] lg:p-10">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-page-text)] bg-[var(--slot4-page-bg)] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.24em]">
                  <SearchIcon className="h-3.5 w-3.5 text-[var(--slot4-accent)]" /> {pagesContent.search.hero.badge}
                </span>
                <h1 className="editable-display mt-5 text-4xl font-black leading-[1.02] tracking-[-0.02em] sm:text-5xl">{pagesContent.search.hero.title}</h1>
                <p className="mt-5 max-w-xl text-base leading-7 text-[var(--slot4-muted-text)]">{pagesContent.search.hero.description}</p>
              </div>
              <form action="/search" className="self-end rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-page-bg)] p-4 sm:p-5">
                <input type="hidden" name="master" value="1" />
                <label className="flex items-center gap-3 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-3">
                  <SearchIcon className="h-5 w-5 text-[var(--slot4-accent)]" />
                  <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className="min-w-0 flex-1 bg-transparent text-base font-semibold text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-muted-text)]" />
                </label>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <label className="flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-3">
                    <Filter className="h-4 w-4 text-[var(--slot4-muted-text)]" />
                    <input name="category" defaultValue={category} placeholder="Category" className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-muted-text)]" />
                  </label>
                  <select name="task" defaultValue={task} className="rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-3 text-sm font-bold text-[var(--slot4-page-text)] outline-none">
                    <option value="">All content types</option>
                    {enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
                  </select>
                </div>
                <button className="mt-3 inline-flex h-12 w-full items-center justify-center rounded-full bg-[var(--slot4-cta)] px-6 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-[var(--slot4-cta-hover)]" type="submit">
                  Search
                </button>
              </form>
            </div>

            <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{results.length} results</p>
                <h2 className="editable-display mt-2 text-2xl font-black tracking-[-0.02em] sm:text-3xl">
                  {query ? `Results for "${query}"` : pagesContent.search.resultsTitle}
                </h2>
              </div>
              <Link href="/article" className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--slot4-page-text)] px-5 py-2.5 text-sm font-black uppercase tracking-[0.14em] transition hover:bg-[var(--slot4-page-text)] hover:text-[var(--slot4-page-bg)]">
                Browse latest <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {results.length ? (
              <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {results.map((post, index) => <SearchResultCard key={post.id || post.slug} post={post} index={index} />)}
              </div>
            ) : (
              <div className="mt-8 rounded-3xl border border-dashed border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-10 text-center">
                <p className="editable-display text-2xl font-black tracking-[-0.02em]">No matching posts found.</p>
                <p className="mt-3 text-sm text-[var(--slot4-muted-text)]">Try a different keyword, content type, or category.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
