import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, LogIn, Sparkles } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Sign in', description: pagesContent.auth.login.metadataDescription })
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-10'

export default function LoginPage() {
  const perks = [
    { icon: BookOpen, label: 'Save reads to your library' },
    { icon: Sparkles, label: 'Publish stories and guides' },
    { icon: LogIn, label: 'Pick up where you left off' },
  ]

  return (
    <EditableSiteShell>
      <main className="relative py-16 sm:py-24">
        <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[var(--slot4-cta)]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-[var(--slot4-accent)]/10 blur-3xl" />

        <section className={`${container} grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]`}>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-page-text)] bg-[var(--slot4-surface-bg)] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.24em]">
              <LogIn className="h-3.5 w-3.5 text-[var(--slot4-accent)]" /> {pagesContent.auth.login.badge}
            </span>
            <h1 className="editable-display mt-6 max-w-xl text-4xl font-black leading-[1.02] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
              {pagesContent.auth.login.title}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-[var(--slot4-muted-text)]">{pagesContent.auth.login.description}</p>

            <ul className="mt-8 grid gap-3">
              {perks.map((perk) => (
                <li key={perk.label} className="flex items-center gap-3 rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
                    <perk.icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-bold text-[var(--slot4-page-text)]">{perk.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 shadow-[0_18px_48px_rgba(28,26,23,0.10)] sm:p-9">
            <h2 className="editable-display text-2xl font-black tracking-[-0.01em]">{pagesContent.auth.login.formTitle}</h2>
            <p className="mt-1 text-sm text-[var(--slot4-muted-text)]">Continue with your account.</p>
            <EditableLocalLoginForm />
            <p className="mt-6 text-sm text-[var(--slot4-muted-text)]">
              New here?{' '}
              <Link href="/signup" className="inline-flex items-center gap-1 font-black text-[var(--slot4-cta)] underline-offset-4 hover:underline">
                {pagesContent.auth.login.createCta} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
