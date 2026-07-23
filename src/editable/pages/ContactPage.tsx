'use client'

import { Building2, FileText, Image as ImageIcon, Mail, MapPin, MessageCircle, Phone, Sparkles, Bookmark, Send } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-10'

function getLanes(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return [
      { icon: Building2, title: 'Add or claim a listing', body: 'Publish a new listing or update details for a business you already run.' },
      { icon: Phone, title: 'Community partnerships', body: 'Talk to us about featured placements, local collaborations, and bulk publishing.' },
      { icon: MapPin, title: 'Suggest a category', body: 'Need a lane we don\'t cover yet? Send it over and we\'ll shape the directory around it.' },
    ]
  }
  if (kind === 'editorial') {
    return [
      { icon: FileText, title: 'Pitch a story', body: 'Send essays, columns, and long-form ideas that fit the alley\'s calm reading rhythm.' },
      { icon: Mail, title: 'Newsletter collabs', body: 'Get in touch about sponsorships, collaborations, and issue-level partnerships.' },
      { icon: Sparkles, title: 'Writer support', body: 'Questions on voice, formatting, or the publishing workflow — we\'re here.' },
    ]
  }
  if (kind === 'visual') {
    return [
      { icon: ImageIcon, title: 'Photo & gallery pitches', body: 'Share visual essays, galleries, and campaigns you\'d like to publish.' },
      { icon: Sparkles, title: 'Licensing & rights', body: 'Reach out about commercial use, licensing, and visual partnerships.' },
      { icon: Mail, title: 'Media kits', body: 'Request creator decks, editorial support, or feature placements.' },
    ]
  }
  return [
    { icon: Bookmark, title: 'Suggest a resource', body: 'Send links, boards or collections you think belong on the alley.' },
    { icon: Mail, title: 'Content partnerships', body: 'Discuss curation projects, reference pages and link programs.' },
    { icon: Sparkles, title: 'Curator support', body: 'Need help organizing shelves or collections? Drop us a line.' },
  ]
}

export default function ContactPage() {
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const lanes = getLanes(productKind)

  return (
    <EditableSiteShell>
      <main>
        <section className="relative overflow-hidden py-16 sm:py-20">
          <div className="pointer-events-none absolute -right-32 top-8 h-72 w-72 rounded-full bg-[var(--slot4-cta)]/10 blur-3xl" />
          <div className={container}>
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-page-text)] bg-[var(--slot4-surface-bg)] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.24em]">
                  <MessageCircle className="h-3.5 w-3.5 text-[var(--slot4-accent)]" /> {pagesContent.contact.eyebrow}
                </span>
                <h1 className="editable-display mt-5 text-4xl font-black leading-[1.04] tracking-[-0.02em] sm:text-6xl">
                  {pagesContent.contact.title}
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.contact.description}</p>

                <div className="mt-8 grid gap-4">
                  {lanes.map((lane) => (
                    <div
                      key={lane.title}
                      className="group flex items-start gap-4 rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-5 transition hover:-translate-y-0.5 hover:border-[var(--slot4-accent)] hover:shadow-[0_16px_40px_rgba(28,26,23,0.12)]"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)] transition group-hover:bg-[var(--slot4-accent)] group-hover:text-white">
                        <lane.icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="editable-display text-lg font-black tracking-[-0.01em]">{lane.title}</h3>
                        <p className="mt-1.5 text-sm leading-7 text-[var(--slot4-muted-text)]">{lane.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 shadow-[0_18px_48px_rgba(28,26,23,0.10)] sm:p-9">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--slot4-cta)] text-white">
                    <Send className="h-4 w-4" />
                  </span>
                  <h2 className="editable-display text-2xl font-black tracking-[-0.01em]">{pagesContent.contact.formTitle}</h2>
                </div>
                <EditableContactLeadForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
