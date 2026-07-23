import type { TaskKey } from '@/lib/site-config'

export type TaskPageVoice = {
  eyebrow: string
  headline: string
  description: string
  filterLabel: string
  secondaryNote: string
  chips: string[]
}

export const taskPageVoices = {
  article: {
    eyebrow: 'Reading desk',
    headline: 'Long-reads, guides & stories from around the alley.',
    description: 'Essays, guides and long-reads picked for you. Grab a coffee and settle in.',
    filterLabel: 'Choose topic',
    secondaryNote: 'Fresh reads land here every week.',
    chips: ['Long-reads', 'Essays', 'Guides', 'Explainers'],
  },
  classified: {
    eyebrow: 'Notices',
    headline: 'Fresh offers and everyday finds, ready to act on.',
    description: 'A running board of time-sensitive offers, items and everyday notices from the community.',
    filterLabel: 'Filter notice type',
    secondaryNote: 'Prices and availability move fast — check the details before you act.',
    chips: ['Everyday finds', 'Offers', 'Community', 'Local'],
  },
  sbm: {
    eyebrow: 'Bookmarks',
    headline: 'Curated resources and reads worth saving.',
    description: 'A shelf of useful reads, references and tools — hand-picked from around the web.',
    filterLabel: 'Filter collection',
    secondaryNote: 'Save one, save them all — no login required.',
    chips: ['Collections', 'References', 'Tools', 'Reads'],
  },
  profile: {
    eyebrow: 'People',
    headline: 'Meet the contributors, makers & community.',
    description: 'Profiles of writers, makers and small businesses sharing their work in the alley.',
    filterLabel: 'Filter profile type',
    secondaryNote: 'Every profile links back to the person or team behind it.',
    chips: ['Writers', 'Makers', 'Community', 'Businesses'],
  },
  pdf: {
    eyebrow: 'Library',
    headline: 'Downloadable guides, reports and references.',
    description: 'A small library of guides and reference documents — read online or take a copy with you.',
    filterLabel: 'Filter document type',
    secondaryNote: 'All files open in-browser and are free to download.',
    chips: ['Guides', 'Reports', 'References', 'Reading'],
  },
  listing: {
    eyebrow: 'Directory',
    headline: 'Business listings, made for real discovery.',
    description: 'A calm, useful directory to find, compare and connect with local businesses and services.',
    filterLabel: 'Filter business category',
    secondaryNote: 'Details are contributed by owners and community members — reach out through the listing to confirm.',
    chips: ['Directory', 'Local', 'Compare', 'Discover'],
  },
  image: {
    eyebrow: 'Gallery',
    headline: 'Photo stories, visual essays & gallery posts.',
    description: 'A visual feed of standout photography, small essays and gallery posts from contributors.',
    filterLabel: 'Filter visual category',
    secondaryNote: 'Let the images lead — captions add the story.',
    chips: ['Photography', 'Visual essays', 'Gallery', 'Series'],
  },
} satisfies Record<TaskKey, TaskPageVoice>
