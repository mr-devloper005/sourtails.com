'use client'

import Link from 'next/link'
import { ArrowUpRight, Facebook, Twitter, Linkedin, Rss, Youtube, LogOut, Mail, PenSquare } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  const primaryCol = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Search', href: '/search' },
  ]
  const firstName = session?.name?.split(' ')[0] || session?.email?.split('@')[0] || ''

  return (
    <footer className="relative mt-20 bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="h-[3px] bg-[linear-gradient(90deg,var(--slot4-accent)_0%,var(--slot4-cta)_100%)]" />

      <div className="mx-auto grid max-w-[var(--editable-container)] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_1fr_1.2fr] lg:px-10">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-[var(--slot4-page-text)] bg-[var(--slot4-surface-bg)]">
              <img
                src="/favicon.png"
                alt={SITE_CONFIG.name}
                className="h-9 w-9 object-contain"
              />
            </span>
            <span className="editable-display text-2xl font-black tracking-[-0.02em]">{SITE_CONFIG.name}</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-6 text-[var(--slot4-muted-text)]">
            {globalContent.footer?.description || `Copyright © ${year} ${SITE_CONFIG.name} and respective owners. All rights reserved.`}
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--slot4-muted-text)]">
            © {year} {SITE_CONFIG.name}. All rights reserved.
          </p>
        </div>

        <div>
          <h3 className="editable-display text-xs font-black uppercase tracking-[0.28em] text-[var(--slot4-page-text)]">Site</h3>
          <div className="mt-5 grid gap-3">
            {primaryCol.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-accent)]"
              >
                {item.label}
              </Link>
            ))}
            {taskLinks.slice(0, 2).map((task) => (
              <Link
                key={task.key}
                href={task.route}
                className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-accent)]"
              >
                {task.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="max-w-xs text-sm leading-7 text-[var(--slot4-page-text)]">
            Publish your own writing and reach a curious, engaged community — a friendly place to share stories, guides, and finds.
          </p>

          {session ? (
            <div className="mt-5 grid gap-3">
              <div className="rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--slot4-muted-text)]">Signed in as</p>
                <p className="mt-0.5 truncate text-sm font-bold">{firstName || session.email}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/create"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-cta)] px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.18em] text-white transition hover:bg-[var(--slot4-cta-hover)]"
                >
                  <PenSquare className="h-3.5 w-3.5" /> Create
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-page-text)] px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.18em] text-[var(--slot4-page-text)] transition hover:bg-[var(--slot4-page-text)] hover:text-[var(--slot4-page-bg)]"
                >
                  <Mail className="h-3.5 w-3.5" /> Contact
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-accent)] px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.18em] text-[var(--slot4-accent)] transition hover:bg-[var(--slot4-accent)] hover:text-white"
                >
                  <LogOut className="h-3.5 w-3.5" /> Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-6 py-3 text-[12px] font-black uppercase tracking-[0.16em] text-white transition hover:brightness-95"
              >
                Join Today <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {[
              { icon: Facebook, label: 'Facebook' },
              { icon: Twitter, label: 'Twitter' },
              { icon: Linkedin, label: 'LinkedIn' },
              { icon: Rss, label: 'RSS' },
              { icon: Youtube, label: 'YouTube' },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--slot4-page-text)] text-[var(--slot4-page-bg)] transition hover:bg-[var(--slot4-accent)]"
              >
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--editable-border)]">
        <div className="mx-auto flex max-w-[var(--editable-container)] flex-col items-center gap-3 px-4 py-6 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--slot4-muted-text)] sm:flex-row sm:justify-between sm:px-6 lg:px-10 sm:text-left">
          <span>Made with care · {SITE_CONFIG.name}</span>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link href="/about" className="transition hover:text-[var(--slot4-accent)]">About</Link>
            <Link href="/contact" className="transition hover:text-[var(--slot4-accent)]">Contact</Link>
            {session ? (
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-1.5 rounded-full bg-[var(--slot4-accent)] px-3 py-1 text-[10px] text-white transition hover:bg-[var(--slot4-cta)]"
              >
                <LogOut className="h-3 w-3" /> Logout
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  )
}
