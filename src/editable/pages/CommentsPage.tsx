'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { MessageSquare, Search, RefreshCw } from 'lucide-react'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

type StoredComment = {
  id: string
  name: string
  email?: string
  comment: string
  createdAt: string
  articleTitle?: string
  articleSlug?: string
}

const COMMENTS_PER_PAGE = 8
const COMMENT_KEY_PREFIX = 'slot4:article-comments:'

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-10'

const formatDate = (value: string) => {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(value))
  } catch {
    return 'Just now'
  }
}

const readCommentsFromStorage = (): StoredComment[] => {
  const items: StoredComment[] = []
  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index)
    if (!key?.startsWith(COMMENT_KEY_PREFIX)) continue
    const articleSlug = key.replace(COMMENT_KEY_PREFIX, '')
    try {
      const parsed = JSON.parse(window.localStorage.getItem(key) || '[]')
      if (!Array.isArray(parsed)) continue
      for (const item of parsed) {
        if (!item || typeof item !== 'object') continue
        if (typeof item.name !== 'string' || typeof item.comment !== 'string') continue
        items.push({
          id: typeof item.id === 'string' ? item.id : `${articleSlug}-${items.length}`,
          name: item.name,
          email: typeof item.email === 'string' ? item.email : undefined,
          comment: item.comment,
          createdAt: typeof item.createdAt === 'string' ? item.createdAt : new Date().toISOString(),
          articleTitle: typeof item.articleTitle === 'string' ? item.articleTitle : undefined,
          articleSlug: typeof item.articleSlug === 'string' ? item.articleSlug : articleSlug,
        })
      }
    } catch {
      // Ignore corrupted local comment records.
    }
  }

  return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export default function CommentsPage() {
  const [comments, setComments] = useState<StoredComment[]>([])
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    setComments(readCommentsFromStorage())
  }, [])

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return comments
    return comments.filter((item) => {
      return [item.name, item.email, item.comment, item.articleTitle, item.articleSlug]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term))
    })
  }, [comments, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / COMMENTS_PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const visibleComments = filtered.slice((currentPage - 1) * COMMENTS_PER_PAGE, currentPage * COMMENTS_PER_PAGE)

  function refreshComments() {
    setComments(readCommentsFromStorage())
    setPage(1)
  }

  const initial = (name: string) => (name.trim()[0] || 'G').toUpperCase()

  return (
    <EditableSiteShell>
      <main className="py-14 sm:py-20">
        <section className={container}>
          <div className="rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 shadow-[0_18px_48px_rgba(28,26,23,0.10)] sm:p-9">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-page-text)] bg-[var(--slot4-page-bg)] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.24em]">
                  <MessageSquare className="h-3.5 w-3.5 text-[var(--slot4-accent)]" /> Reader notes
                </span>
                <h1 className="editable-display mt-5 text-4xl font-black leading-[1.02] tracking-[-0.02em] sm:text-5xl">Comments</h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--slot4-muted-text)]">
                  Notes saved in this browser from stories you have visited.
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-2 self-start rounded-full border-2 border-[var(--slot4-page-text)] px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-[var(--slot4-page-text)] transition hover:bg-[var(--slot4-page-text)] hover:text-[var(--slot4-page-bg)]"
                onClick={refreshComments}
              >
                <RefreshCw className="h-3.5 w-3.5" /> Refresh
              </button>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-md">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--slot4-muted-text)]" />
                <input
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value)
                    setPage(1)
                  }}
                  placeholder="Search notes..."
                  className="h-11 w-full rounded-full border border-[var(--editable-border)] bg-[var(--slot4-page-bg)] pl-11 pr-4 text-sm font-medium text-[var(--slot4-page-text)] outline-none focus:border-[var(--slot4-accent)]"
                />
              </div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--slot4-muted-text)]">
                {filtered.length} note{filtered.length === 1 ? '' : 's'}
              </p>
            </div>
          </div>

          {visibleComments.length ? (
            <section className="mt-8 grid gap-4">
              {visibleComments.map((item) => (
                <article
                  key={`${item.articleSlug}-${item.id}`}
                  className="rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-5 shadow-[0_2px_8px_rgba(28,26,23,0.06)]"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--slot4-accent)] text-sm font-black text-white">
                        {initial(item.name)}
                      </span>
                      <div>
                        <p className="text-sm font-black text-[var(--slot4-page-text)]">{item.name}</p>
                        <p className="mt-0.5 text-xs text-[var(--slot4-muted-text)]">{formatDate(item.createdAt)}</p>
                      </div>
                    </div>
                    {item.articleSlug ? (
                      <Link href={`/article/${item.articleSlug}`} className="text-[11px] font-black uppercase tracking-[0.16em] text-[var(--slot4-cta)] hover:underline">
                        Open story →
                      </Link>
                    ) : null}
                  </div>
                  {item.articleTitle ? <p className="mt-4 text-sm font-bold text-[var(--slot4-page-text)]">{item.articleTitle}</p> : null}
                  <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[var(--slot4-muted-text)]">{item.comment}</p>
                </article>
              ))}
            </section>
          ) : (
            <section className="mt-8 rounded-2xl border border-dashed border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-10 text-center">
              <h2 className="editable-display text-2xl font-black tracking-[-0.02em]">No notes yet</h2>
              <p className="mt-2 text-sm text-[var(--slot4-muted-text)]">Add a comment on any story and it will appear here.</p>
            </section>
          )}

          {filtered.length > COMMENTS_PER_PAGE ? (
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-4 text-sm text-[var(--slot4-muted-text)]">
              <span className="font-bold">Page {currentPage} of {totalPages}</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded-full border border-[var(--editable-border)] px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] disabled:opacity-40"
                  disabled={currentPage <= 1}
                  onClick={() => setPage((value) => Math.max(1, value - 1))}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="rounded-full bg-[var(--slot4-cta)] px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-white disabled:opacity-40"
                  disabled={currentPage >= totalPages}
                  onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                >
                  Next
                </button>
              </div>
            </div>
          ) : null}
        </section>
      </main>
    </EditableSiteShell>
  )
}
