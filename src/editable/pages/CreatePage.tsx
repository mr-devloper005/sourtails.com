'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileText, ImageIcon, Lock, PenSquare, PlusCircle, Radio, Send, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-10'

const taskIcon: Record<string, typeof FileText> = {
  article: FileText,
  listing: Sparkles,
  classified: PlusCircle,
  image: ImageIcon,
  profile: Sparkles,
  pdf: FileText,
  sbm: ArrowRight,
}

const fieldClass = 'rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-3 text-sm font-semibold text-[var(--slot4-page-text)] outline-none transition placeholder:text-[var(--slot4-muted-text)] focus:border-[var(--slot4-accent)]'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const enabledTasks = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled), [])
  const [task, setTask] = useState<TaskKey>((enabledTasks[0]?.key || 'listing') as TaskKey)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const activeTask = enabledTasks.find((item) => item.key === task) || enabledTasks[0]

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  // ===================== LOCKED (not signed in) =====================
  if (!session) {
    return (
      <EditableSiteShell>
        <main>
          <section className="relative overflow-hidden">
            <div className="pointer-events-none absolute -left-16 top-8 h-56 w-56 rounded-full bg-[var(--slot4-cta)]/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-[var(--slot4-accent)]/10 blur-3xl" />

            <div className={`${container} pt-10 pb-8 sm:pt-14 lg:pt-16`}>
              <div className="ea-hero-in ea-hero-in-1 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-page-text)] bg-[var(--slot4-surface-bg)] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em]">
                  <Lock className="h-3.5 w-3.5 text-[var(--slot4-accent)]" /> {pagesContent.create.locked.badge}
                </span>
              </div>

              <h1 className="ea-hero-in ea-hero-in-2 editable-display mt-6 max-w-4xl text-balance text-4xl font-black leading-[0.98] tracking-[-0.02em] sm:text-6xl lg:text-[4.5rem]">
                Sign in to add your
                <span className="ea-underline block text-[var(--slot4-accent)]">business or listing.</span>
              </h1>

              <p className="ea-hero-in ea-hero-in-3 mt-6 max-w-2xl text-lg leading-8 text-[var(--slot4-muted-text)]">
                {pagesContent.create.locked.description}
              </p>

              <div className="ea-hero-in ea-hero-in-4 mt-8 flex flex-wrap gap-3">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-cta)] px-7 py-3.5 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-[var(--slot4-cta-hover)]"
                >
                  Sign in <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--slot4-page-text)] px-7 py-3.5 text-sm font-black uppercase tracking-[0.16em] text-[var(--slot4-page-text)] transition hover:bg-[var(--slot4-page-text)] hover:text-[var(--slot4-page-bg)]"
                >
                  Create account
                </Link>
              </div>
            </div>

            <div className={`${container} pb-16`}>
              <div className="ea-hero-in ea-hero-in-4 grid gap-6 sm:grid-cols-3">
                {[
                  { title: 'Reach neighbors', body: 'Local browsers actively looking for what you offer.' },
                  { title: 'Own your card', body: 'Photos, contact, hours and category — all under your control.' },
                  { title: 'Free to publish', body: 'Add and update your listing anytime without a paywall.' },
                ].map((perk) => (
                  <div key={perk.title} className="rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-5 shadow-[0_2px_8px_rgba(28,26,23,0.06)]">
                    <p className="editable-display text-lg font-black tracking-[-0.01em]">{perk.title}</p>
                    <p className="mt-2 text-sm text-[var(--slot4-muted-text)]">{perk.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  // ===================== UNLOCKED (writing) =====================
  return (
    <EditableSiteShell>
      <main>
        {/* Hero — mirrors the homepage hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -left-16 top-8 h-56 w-56 rounded-full bg-[var(--slot4-cta)]/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-[var(--slot4-accent)]/10 blur-3xl" />

          <div className={`${container} pt-10 pb-6 sm:pt-14 lg:pt-16`}>
            <div className="ea-hero-in ea-hero-in-1 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-page-text)] bg-[var(--slot4-surface-bg)] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em]">
                <Radio className="h-3.5 w-3.5 text-[var(--slot4-accent)]" />
                {pagesContent.create.hero.badge}
              </span>
              <span className="text-sm font-semibold text-[var(--slot4-muted-text)]">
                Signed in as <span className="font-black text-[var(--slot4-page-text)]">{session.name || session.email}</span>
              </span>
            </div>

            <h1 className="ea-hero-in ea-hero-in-2 editable-display mt-6 max-w-5xl text-balance text-4xl font-black leading-[0.98] tracking-[-0.02em] sm:text-6xl lg:text-[4.5rem]">
              Publish something
              <span className="ea-underline block text-[var(--slot4-accent)]">worth exploring.</span>
            </h1>

            <p className="ea-hero-in ea-hero-in-3 mt-6 max-w-2xl text-lg leading-8 text-[var(--slot4-muted-text)]">
              {pagesContent.create.hero.description}
            </p>
          </div>
        </section>

        {/* Type picker (magazine chips) + form */}
        <section className="py-8 sm:py-12">
          <div className={container}>
            <div className="mb-6 flex items-end justify-between border-b-2 border-[var(--slot4-page-text)] pb-3">
              <h2 className="editable-display text-2xl font-black tracking-[-0.02em] sm:text-3xl">Choose a format</h2>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--slot4-muted-text)]">
                {enabledTasks.length} formats
              </span>
            </div>

            <div className="ea-hero-in ea-hero-in-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {enabledTasks.map((item) => {
                const Icon = taskIcon[item.key] || FileText
                const active = item.key === task
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setTask(item.key)}
                    className={`group rounded-2xl border p-5 text-left transition ${
                      active
                        ? 'border-[var(--slot4-accent)] bg-[var(--slot4-page-text)] text-[var(--slot4-page-bg)] shadow-[0_16px_40px_rgba(28,26,23,0.18)]'
                        : 'border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] hover:-translate-y-1 hover:border-[var(--slot4-accent)] hover:shadow-[0_16px_40px_rgba(28,26,23,0.10)]'
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        active ? 'bg-[var(--slot4-cta)] text-white' : 'bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)] group-hover:bg-[var(--slot4-accent)] group-hover:text-white'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="editable-display mt-4 block text-lg font-black tracking-[-0.01em]">{item.label}</span>
                    <span className="mt-1 block text-xs font-medium opacity-75">{item.description}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Form + tips (two-column magazine layout) */}
        <section className="pb-16 sm:pb-24">
          <div className={container}>
            <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
              <form
                onSubmit={submit}
                className="rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 shadow-[0_18px_48px_rgba(28,26,23,0.10)] sm:p-9"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--slot4-accent)]">
                      Create {activeTask?.label || 'post'}
                    </p>
                    <h2 className="editable-display mt-1 text-2xl font-black tracking-[-0.02em] sm:text-3xl">
                      {pagesContent.create.formTitle}
                    </h2>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-page-bg)] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.16em]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--slot4-accent)]" />
                    {activeTask?.label || 'Post'}
                  </span>
                </div>

                <div className="mt-6 grid gap-4">
                  <input
                    className={fieldClass}
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Post title"
                    required
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      className={fieldClass}
                      value={category}
                      onChange={(event) => setCategory(event.target.value)}
                      placeholder="Category"
                    />
                    <input
                      className={fieldClass}
                      value={url}
                      onChange={(event) => setUrl(event.target.value)}
                      placeholder="Website or source URL"
                    />
                  </div>
                  <input
                    className={fieldClass}
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                    placeholder="Featured image URL"
                  />
                  <textarea
                    className={`${fieldClass} min-h-24`}
                    value={summary}
                    onChange={(event) => setSummary(event.target.value)}
                    placeholder="Short summary"
                    required
                  />
                  <textarea
                    className={`${fieldClass} min-h-48`}
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                    placeholder="Main content, details, notes, or description"
                    required
                  />
                </div>

                {created ? (
                  <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-black">{pagesContent.create.successTitle}</p>
                      <p className="mt-1 truncate text-sm font-semibold opacity-80">{created.title}</p>
                    </div>
                  </div>
                ) : null}

                <button
                  type="submit"
                  className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--slot4-cta)] px-6 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-[var(--slot4-cta-hover)]"
                >
                  <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
                </button>
              </form>

              <aside className="grid gap-4 self-start lg:sticky lg:top-24">
                <div className="rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-warm)] p-6">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--slot4-accent)]">Writing tips</p>
                  <h3 className="editable-display mt-2 text-xl font-black tracking-[-0.01em]">Make it easy to scan.</h3>
                  <ul className="mt-4 grid gap-3 text-sm leading-6 text-[var(--slot4-muted-text)]">
                    <li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--slot4-accent)]" /> Lead with a clear, specific title.</li>
                    <li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--slot4-accent)]" /> Use the summary as a friendly one-liner.</li>
                    <li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--slot4-accent)]" /> Add a featured image URL when you can.</li>
                    <li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--slot4-accent)]" /> Break the body into short paragraphs.</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--slot4-cta)]">Need a hand?</p>
                  <h3 className="editable-display mt-2 text-xl font-black tracking-[-0.01em]">We&rsquo;re here.</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--slot4-muted-text)]">
                    Not sure how to describe your listing or where it fits? Send a note and we&rsquo;ll help you shape it.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-[var(--slot4-page-text)] px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.16em] text-[var(--slot4-page-text)] transition hover:bg-[var(--slot4-page-text)] hover:text-[var(--slot4-page-bg)]"
                  >
                    <PenSquare className="h-3.5 w-3.5" /> Contact us
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
