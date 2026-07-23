import Link from 'next/link'
import { ArrowRight, PenSquare, Sparkles, Users } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-10'

export default function AboutPage() {
  const stats = [
    { label: 'Stories published', value: '2.4k+' },
    { label: 'Contributors', value: '380+' },
    { label: 'Community picks / week', value: '60+' },
  ]

  return (
    <EditableSiteShell>
      <main>
        <section className="relative overflow-hidden pt-16 pb-14 sm:pt-24 sm:pb-20">
          <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[var(--slot4-cta)]/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-[var(--slot4-accent)]/10 blur-3xl" />
          <div className={container}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-page-text)] bg-[var(--slot4-surface-bg)] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.24em]">
              <Sparkles className="h-3.5 w-3.5 text-[var(--slot4-accent)]" /> {pagesContent.about.badge}
            </span>
            <h1 className="editable-display mt-6 max-w-4xl text-balance text-4xl font-black leading-[1.02] tracking-[-0.02em] sm:text-6xl">
              About <span className="text-[var(--slot4-accent)]">{SITE_CONFIG.name}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--slot4-muted-text)]">{pagesContent.about.description}</p>
          </div>
        </section>

        <section className={`${container} pb-16`}>
          <div className="grid gap-6 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 shadow-[0_2px_8px_rgba(28,26,23,0.06)]">
                <p className="editable-display text-4xl font-black tracking-[-0.02em] text-[var(--slot4-accent)]">{stat.value}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--slot4-muted-text)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-[var(--editable-border)] bg-[var(--slot4-warm)] py-16 sm:py-20">
          <div className={container}>
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <article>
                <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-cta)]">Our story</p>
                <h2 className="editable-display mt-3 text-3xl font-black tracking-[-0.02em] sm:text-5xl">{pagesContent.about.title}</h2>
                <div className="mt-6 space-y-4 text-base leading-8 text-[var(--slot4-muted-text)]">
                  {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/create" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-cta)] px-6 py-3 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-[var(--slot4-cta-hover)]">
                    <PenSquare className="h-4 w-4" /> Write a story
                  </Link>
                  <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--slot4-page-text)] px-6 py-3 text-sm font-black uppercase tracking-[0.14em] text-[var(--slot4-page-text)] transition hover:bg-[var(--slot4-page-text)] hover:text-[var(--slot4-page-bg)]">
                    Say hi <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>

              <aside className="grid gap-4">
                {pagesContent.about.values.map((value, i) => (
                  <div
                    key={value.title}
                    className="rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 shadow-[0_2px_8px_rgba(28,26,23,0.06)]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--slot4-accent)] text-sm font-black text-white">{i + 1}</span>
                      <h3 className="editable-display text-xl font-black tracking-[-0.01em]">{value.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
                  </div>
                ))}
              </aside>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className={container}>
            <div className="relative overflow-hidden rounded-[2rem] bg-[var(--slot4-page-text)] px-8 py-16 text-center sm:px-14 sm:py-20">
              <div className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 rounded-full bg-[var(--slot4-cta)]/30 blur-3xl" />
              <div className="pointer-events-none absolute -right-12 -bottom-12 h-48 w-48 rounded-full bg-[var(--slot4-accent)]/30 blur-3xl" />
              <Users className="mx-auto h-8 w-8 text-white/80" />
              <h2 className="editable-display mx-auto mt-5 max-w-2xl text-3xl font-black leading-[1.05] tracking-[-0.02em] text-white sm:text-4xl">
                Join a friendly community of readers and writers.
              </h2>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/signup" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-cta)] px-7 py-3.5 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-[var(--slot4-cta-hover)]">
                  Join today
                </Link>
                <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-white/10">
                  Browse the alley <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
