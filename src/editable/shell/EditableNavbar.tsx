'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, X, PenSquare, ChevronDown, LogOut, LogIn, UserPlus, Home, Info, Mail, Building2 } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const baseNav = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'About', href: '/about', icon: Info },
  { label: 'Listing', href: '/listing', icon: Building2 },
  { label: 'Contact', href: '/contact', icon: Mail },
  { label: 'Search', href: '/search', icon: Search },
]

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()

  const taskNav = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({ label: task.label, href: task.route })),
    []
  )

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
  const firstName = session?.name?.split(' ')[0] || session?.email?.split('@')[0] || ''

  return (
    <header className="sticky top-0 z-50 bg-[var(--editable-nav-bg)]/95 text-[var(--editable-nav-text)] backdrop-blur-md">
      <div className="h-[3px] bg-[linear-gradient(90deg,var(--slot4-accent)_0%,var(--slot4-cta)_100%)]" />

      <nav className="mx-auto flex min-h-[84px] w-full max-w-[var(--editable-container)] items-center gap-6 px-4 sm:px-6 lg:px-10">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-[var(--slot4-page-text)] bg-[var(--slot4-surface-bg)] transition group-hover:border-[var(--slot4-accent)]">
            <img
              src="/favicon.png"
              alt={SITE_CONFIG.name}
              className="h-9 w-9 object-contain"
            />
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="editable-display block max-w-[220px] truncate text-2xl font-black leading-none tracking-[-0.02em]">
              {SITE_CONFIG.name}
            </span>
            <span className="mt-1 hidden max-w-[220px] truncate text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-muted-text)] md:block">
              {globalContent.nav?.tagline || SITE_CONFIG.tagline}
            </span>
          </span>
        </Link>

        <div className="ml-6 hidden items-center gap-1 lg:flex">
          {baseNav.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-2 text-[13px] font-bold uppercase tracking-[0.16em] transition ${
                  active ? 'text-[var(--slot4-accent)]' : 'text-[var(--slot4-page-text)] hover:text-[var(--slot4-accent)]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}

          {taskNav.length ? (
            <div
              className="relative"
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => setMoreOpen(false)}
            >
              <button
                type="button"
                onClick={() => setMoreOpen((v) => !v)}
                className="inline-flex items-center gap-1 px-3.5 py-2 text-[13px] font-bold uppercase tracking-[0.16em] text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-accent)]"
              >
                Sections <ChevronDown className={`h-3.5 w-3.5 transition ${moreOpen ? 'rotate-180' : ''}`} />
              </button>
              {moreOpen ? (
                <div className="absolute right-0 top-full z-40 w-56 rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-2 shadow-[0_18px_48px_rgba(28,26,23,0.14)]">
                  {taskNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-lg px-3.5 py-2.5 text-[13px] font-semibold text-[var(--slot4-page-text)] transition hover:bg-[var(--slot4-panel-bg)] hover:text-[var(--slot4-accent)]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Search"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)] md:inline-flex"
          >
            <Search className="h-4 w-4" />
          </button>

          {session ? (
            <>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserOpen((v) => !v)}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-3 py-1.5 text-[12px] font-bold text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--slot4-accent)] text-[11px] font-black uppercase text-white">
                    {(firstName[0] || 'U').toUpperCase()}
                  </span>
                  <span className="hidden max-w-[100px] truncate sm:inline">{firstName || 'Account'}</span>
                  <ChevronDown className={`hidden h-3.5 w-3.5 transition sm:inline ${userOpen ? 'rotate-180' : ''}`} />
                </button>
                {userOpen ? (
                  <div className="absolute right-0 top-full z-40 mt-2 w-52 rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-2 shadow-[0_18px_48px_rgba(28,26,23,0.16)]">
                    <div className="border-b border-[var(--editable-border)] px-3 py-2">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--slot4-muted-text)]">Signed in as</p>
                      <p className="mt-0.5 truncate text-sm font-bold text-[var(--slot4-page-text)]">{firstName || session.email}</p>
                    </div>
                    <Link href="/create" onClick={() => setUserOpen(false)} className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[var(--slot4-page-text)] transition hover:bg-[var(--slot4-panel-bg)]">
                      <PenSquare className="h-4 w-4 text-[var(--slot4-cta)]" /> Create
                    </Link>
                    <button
                      type="button"
                      onClick={() => { setUserOpen(false); logout() }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-[var(--slot4-page-text)] transition hover:bg-[var(--slot4-accent-soft)] hover:text-[var(--slot4-accent)]"
                    >
                      <LogOut className="h-4 w-4" /> Logout
                    </button>
                  </div>
                ) : null}
              </div>
            </>
          ) : (
            <>
              <Link
                href="/signup"
                className="hidden items-center gap-2 px-3 py-2 text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-accent)] sm:inline-flex"
              >
                <UserPlus className="h-4 w-4" /> Sign up
              </Link>
              <Link
                href="/login"
                className="hidden items-center gap-2 rounded-full border border-[var(--slot4-page-text)] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--slot4-page-text)] transition hover:bg-[var(--slot4-page-text)] hover:text-[var(--slot4-page-bg)] sm:inline-flex"
              >
                <LogIn className="h-4 w-4" /> Sign in
              </Link>
            </>
          )}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-2 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {searchOpen ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]">
          <form action="/search" className="mx-auto flex w-full max-w-[var(--editable-container)] items-center gap-3 px-4 py-4 sm:px-6 lg:px-10">
            <Search className="h-4 w-4 shrink-0 text-[var(--slot4-accent)]" />
            <input
              name="q"
              autoFocus
              type="search"
              placeholder="Search stories, listings, topics…"
              className="flex-1 bg-transparent text-sm font-medium text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-muted-text)]"
            />
            <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search">
              <X className="h-4 w-4 text-[var(--slot4-muted-text)]" />
            </button>
          </form>
        </div>
      ) : null}

      <div className="h-px bg-[var(--editable-border)]" />

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--editable-nav-bg)] px-4 py-5 lg:hidden">
          <form action="/search" className="mb-5 flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-2.5">
            <Search className="h-4 w-4 text-[var(--slot4-accent)]" />
            <input name="q" type="search" placeholder="Search…" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-muted-text)]" />
          </form>
          <div className="grid gap-1">
            {[...baseNav, ...taskNav].map((item) => {
              const active = isActive(item.href)
              const Icon = ('icon' in item ? item.icon : null) as React.ComponentType<{ className?: string }> | null
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-[0.14em] ${
                    active
                      ? 'bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]'
                      : 'text-[var(--slot4-page-text)] hover:bg-[var(--slot4-panel-bg)]'
                  }`}
                >
                  {Icon ? <Icon className="h-4 w-4" /> : null}
                  {item.label}
                </Link>
              )
            })}
            {session ? (
              <>
                <div className="mt-3 flex items-center justify-between rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-3">
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--slot4-muted-text)]">Signed in</p>
                    <p className="mt-0.5 truncate text-sm font-bold text-[var(--slot4-page-text)]">{firstName || session.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setOpen(false); logout() }}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-accent)] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--slot4-accent)]"
                  >
                    <LogOut className="h-3.5 w-3.5" /> Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-2 grid gap-2">
                <Link href="/signup" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl border border-[var(--editable-border)] px-4 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[var(--slot4-page-text)]">
                  <UserPlus className="h-4 w-4" /> Sign up
                </Link>
                <Link href="/login" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl border border-[var(--slot4-page-text)] px-4 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[var(--slot4-page-text)]">
                  <LogIn className="h-4 w-4" /> Sign in
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
