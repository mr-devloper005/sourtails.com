import Link from 'next/link'
import { ArrowRight, ChevronLeft } from 'lucide-react'
import type { SitePost, SiteFeedPagination } from '@/lib/site-connector'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { ArticleListCard, postHref } from '@/editable/cards/PostCards'

export function EditableArticleArchive({
  posts,
  pagination,
  category = 'all',
  basePath = '/article',
}: {
  posts: SitePost[]
  pagination: SiteFeedPagination
  category?: string
  basePath?: string
}) {
  const voice = taskPageVoices.article
  const page = pagination.page || 1
  const pageHref = (nextPage: number) =>
    `${basePath}?${new URLSearchParams({ ...(category && category !== 'all' ? { category } : {}), page: String(nextPage) }).toString()}`

  return (
    <main className={dc.shell.page}>
      <section className={`${dc.shell.section} pt-14 sm:pt-20`}>
        <div className="rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 shadow-[0_18px_48px_rgba(28,26,23,0.10)] sm:p-10 lg:p-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-page-text)] bg-[var(--slot4-page-bg)] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.24em]">
            {voice.eyebrow}
          </span>
          <h1 className="editable-display mt-5 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
            {voice.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--slot4-muted-text)]">{voice.description}</p>
          <form action={basePath} className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <select
              name="category"
              defaultValue={category || 'all'}
              className="min-w-0 flex-1 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-page-bg)] px-5 py-3 text-sm font-semibold text-[var(--slot4-page-text)] outline-none focus:border-[var(--slot4-accent)]"
            >
              <option value="all">All categories</option>
              {CATEGORY_OPTIONS.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
            <button className="rounded-full bg-[var(--slot4-cta)] px-6 py-3 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-[var(--slot4-cta-hover)]">
              Filter
            </button>
          </form>
        </div>
      </section>

      <section className={`${dc.shell.section} ${dc.shell.sectionY}`}>
        {posts.length ? (
          <div className="grid gap-5 sm:grid-cols-2">
            {posts.map((post, index) => (
              <ArticleListCard
                key={post.id}
                post={post}
                href={postHref('article', post, basePath)}
                index={index + (page - 1) * pagination.limit}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-10 text-center">
            <h2 className="editable-display text-2xl font-black tracking-[-0.02em]">No stories yet</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">Try another category or return to all stories.</p>
          </div>
        )}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {pagination.hasPrevPage ? (
            <Link
              href={pageHref(page - 1)}
              className="rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-5 py-3 text-sm font-black"
            >
              Previous
            </Link>
          ) : null}
          <span className="rounded-full bg-[var(--slot4-page-text)] px-5 py-3 text-sm font-black text-[var(--slot4-page-bg)]">
            Page {page} of {pagination.totalPages || 1}
          </span>
          {pagination.hasNextPage ? (
            <Link
              href={pageHref(page + 1)}
              className="rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-5 py-3 text-sm font-black"
            >
              Next
            </Link>
          ) : null}
        </div>
      </section>
    </main>
  )
}

export function EditableArticleDetailShell({ slug, post }: { slug: string; post: SitePost | null }) {
  const voice = taskPageVoices.article
  return (
    <main className={dc.shell.page}>
      <section className={`${dc.shell.section} pt-14 sm:pt-20`}>
        <div className="grid gap-6 rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 shadow-[0_18px_48px_rgba(28,26,23,0.10)] lg:grid-cols-[minmax(0,1fr)_320px] lg:p-10">
          <div className="min-w-0">
            <Link
              href="/article"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-page-bg)] px-4 py-2 text-sm font-black text-[var(--slot4-page-text)]"
            >
              <ChevronLeft className="h-4 w-4" /> All stories
            </Link>
            <span className="mt-8 inline-flex text-[11px] font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">
              {voice.eyebrow}
            </span>
            <h1 className="editable-display mt-3 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
              {post?.title || pagesContent.detailPages.article.fallbackTitle}
            </h1>
          </div>
          <aside className="min-w-0 rounded-2xl bg-[var(--slot4-page-text)] p-6 text-white">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Reading note</p>
            <p className="mt-4 text-sm leading-7 text-white/80">{voice.secondaryNote}</p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--slot4-cta)] px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-[var(--slot4-cta-hover)]"
            >
              Contact <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </section>
      <section className="mx-auto w-full max-w-5xl px-4 pb-16 pt-6 sm:px-6 lg:px-10 lg:pb-24">
        <div className="rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 shadow-[0_18px_48px_rgba(28,26,23,0.08)] sm:p-8 lg:p-10">
          <p className="text-base leading-8 text-[var(--slot4-muted-text)]">
            {post?.summary || `Story detail content for ${slug} will render through the editable detail page.`}
          </p>
        </div>
      </section>
    </main>
  )
}
