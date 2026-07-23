import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Local business listings & community directory',
      description: `Discover, compare and connect with local businesses on ${slot4BrandConfig.siteName} — a curated directory refreshed daily.`,
      openGraphTitle: `${slot4BrandConfig.siteName} — a friendly local business directory`,
      openGraphDescription: 'Discover, compare and connect with businesses in your area — one clean, community-driven directory.',
      keywords: ['business listings', 'local directory', 'business finder', 'services near me', 'community listings'],
    },
    hero: {
      badge: 'Fresh listings today',
      title: ['Discover local businesses', 'you’ll want to visit.'],
      description: 'Browse a curated directory of local businesses, services and community spots — updated every day.',
      primaryCta: { label: 'Browse all listings', href: '/listing' },
      secondaryCta: { label: 'Add your business', href: '/create' },
      searchPlaceholder: 'Search businesses, services, and categories…',
      focusLabel: 'Focus',
      featureCardBadge: 'Featured listing',
      featureCardTitle: 'A featured business leads the directory each day.',
      featureCardDescription: 'Fresh listings and community favorites stay front and center so the directory never feels stale.',
    },
    intro: {
      badge: 'What is this place',
      title: 'A calmer home to find, compare and connect with businesses.',
      paragraphs: [
        'The directory brings together local businesses and services in one clean place so you can browse and compare without hopping between sites.',
        'Every listing shares the same clear layout — photos, contact details, hours, location — so it is easy to shortlist and reach out.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Business-first home with room for photos, contact details and hours.',
        'A unified visual system across every listing on the site.',
        'Contributed by owners and community members — friendly and easy to browse.',
        'Fast pages, gentle motion, no clutter.',
      ],
      primaryLink: { label: 'Browse listings', href: '/listing' },
      secondaryLink: { label: 'Contact us', href: '/contact' },
    },
    cta: {
      badge: 'List with us',
      title: 'Run a business? Add it to the directory.',
      description: 'Publish your business on the directory and reach neighbors, customers and community members looking for what you offer.',
      primaryCta: { label: 'Add a listing', href: '/create' },
      secondaryCta: { label: 'Contact us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'The freshest picks in this section.',
    },
  },
  about: {
    badge: 'Our Story',
    title: `A calmer, friendlier way to read and browse.`,
    description: `${slot4BrandConfig.siteName} is a friendly home for reading, browsing and publishing — one place where stories, guides, and community listings all live together.`,
    paragraphs: [
      'The alley started with a simple idea: reading and browsing should feel calm, useful, and human. Not a firehose of noise, and not a lonely archive either.',
      'Every section shares the same rhythm and look, so exploring feels natural. Read a story, follow a listing, save a guide — nothing pulls you out of the flow.',
      'It is open to anyone with something thoughtful to publish. If you have a story, a guide, or a useful listing to share, you are welcome to join in.',
    ],
    values: [
      {
        title: 'Reading-first, always',
        description: 'Clear typography, calm spacing, and a rhythm that makes long stories a pleasure to read on any device.',
      },
      {
        title: 'One connected home',
        description: 'Stories, listings, guides and community picks all share one visual system so discovery feels natural.',
      },
      {
        title: 'Friendly and open',
        description: 'A welcoming place for readers and contributors. If you have something thoughtful to share, publish it.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Get in touch — we read every message.',
    description: 'Tell us what you would like to publish, fix, or ask about. We reply through the right lane instead of routing everything through the same inbox.',
    formTitle: 'Send us a note',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search stories, listings, guides and community picks across the alley.',
    },
    hero: {
      badge: 'Search the alley',
      title: 'Find a story, a listing, a guide.',
      description: 'Search by keyword, topic or category — instantly across every section of the site.',
      placeholder: 'Search by keyword, topic, or headline…',
    },
    resultsTitle: 'Latest matching posts',
  },
  create: {
    metadata: {
      title: 'Write a story',
      description: 'Publish a story, guide or listing on the alley.',
    },
    locked: {
      badge: 'Contributor access',
      title: 'Sign in to start writing.',
      description: 'Use your account to open the writing workspace and publish stories, guides or listings on the alley.',
    },
    hero: {
      badge: 'Writing workspace',
      title: 'Publish a story, guide or listing.',
      description: 'Pick a format, add your details, and share something thoughtful with the community.',
    },
    formTitle: 'Post details',
    submitLabel: 'Publish post',
    successTitle: 'Post published — thanks for sharing!',
  },
  auth: {
    login: {
      metadataDescription: `Sign in to your ${slot4BrandConfig.siteName} account.`,
      badge: 'Welcome back',
      title: 'Sign in to keep writing and saving.',
      description: 'Sign in to publish new stories, save posts to read later, and pick up where you left off.',
      formTitle: 'Sign in',
      submitLabel: 'Continue',
      noAccount: 'No account matched those details. Try again, or create an account first.',
      success: 'Signed in. Redirecting…',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: `Create your ${slot4BrandConfig.siteName} account.`,
      badge: 'Join the alley',
      title: 'Create an account and start writing.',
      description: 'Set up a free account to publish stories and guides, save posts, and join in the conversation.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created — redirecting…',
      loginCta: 'Sign in',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'You might also like',
      fallbackTitle: 'Story details',
    },
    listing: {
      relatedTitle: 'More listings nearby',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'More from the gallery',
      fallbackTitle: 'Photo story',
    },
    profile: {
      relatedTitle: 'Suggested reads',
      fallbackDescription: 'Contributor details will appear here once available.',
      visitButton: 'Visit website',
    },
  },
} as const
