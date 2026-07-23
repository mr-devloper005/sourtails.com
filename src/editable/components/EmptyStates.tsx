import Link from 'next/link'
import { ArrowRight, SearchX, MailCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

type EmptyStateProps = {
  title?: string
  description?: string
  actionLabel?: string
  actionHref?: string
  className?: string
}

export function EmptyState({
  title = 'Nothing here yet',
  description = 'Fresh posts will appear here automatically once this section publishes content.',
  actionLabel = 'Back to home',
  actionHref = '/',
  className,
}: EmptyStateProps) {
  return (
    <section
      className={cn(
        'rounded-3xl border border-dashed border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-10 text-center',
        className,
      )}
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
        <SearchX className="h-6 w-6" />
      </div>
      <h2 className="editable-display mt-5 text-2xl font-black tracking-[-0.02em]">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[var(--slot4-muted-text)]">{description}</p>
      <Link
        href={actionHref}
        className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-[var(--slot4-page-text)] px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-[var(--slot4-page-text)] transition hover:bg-[var(--slot4-page-text)] hover:text-[var(--slot4-page-bg)]"
      >
        {actionLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  )
}

export function TaskEmptyState({ taskLabel = 'posts', className }: { taskLabel?: string; className?: string }) {
  return (
    <EmptyState
      className={className}
      title={`No ${taskLabel} available yet`}
      description={`Fresh ${taskLabel} will appear here as soon as they land. The page stays ready in the meantime.`}
      actionLabel="Explore the alley"
      actionHref="/"
    />
  )
}

export function ContactSuccessState({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        'rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-10 text-center',
        className,
      )}
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--slot4-cta)]/15 text-[var(--slot4-cta)]">
        <MailCheck className="h-6 w-6" />
      </div>
      <h2 className="editable-display mt-5 text-2xl font-black tracking-[-0.02em]">Message received</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[var(--slot4-muted-text)]">
        Thanks for reaching out — we read every note and will reply soon.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--slot4-cta)] px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-[var(--slot4-cta-hover)]"
      >
        Back to the alley
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  )
}
