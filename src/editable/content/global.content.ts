import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Stories, guides & community picks',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Stories · Listings · Community',
    primaryLinks: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Search', href: '/search' },
    ],
    actions: {
      primary: { label: 'Write a story', href: '/create' },
      secondary: { label: 'Contact', href: '/contact' },
    },
  },
  footer: {
    tagline: 'A friendly place to read, publish & discover.',
    description: `Publish your own writing and reach a curious, engaged community — ${slot4BrandConfig.siteName} is a friendly place to share stories, guides, and useful listings.`,
    columns: [
      {
        title: 'Site',
        links: [
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
          { label: 'Search', href: '/search' },
        ],
      },
      {
        title: 'Support',
        links: [
          { label: 'Privacy Policy', href: '/about' },
          { label: 'FAQ', href: '/about' },
          { label: 'Our Network', href: '/about' },
          { label: 'Partner With Us', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Made with care — story-first, community-driven.',
  },
  commonLabels: {
    readMore: 'Read the story',
    viewAll: 'See all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'You might also like',
    published: 'Published',
  },
} as const
