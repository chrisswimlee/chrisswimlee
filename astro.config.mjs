import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://chrisswimlee.com',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // Legacy names redirect; keep them out of the index.
      filter: (page) => !/\/(tutor|fluidTranslation|fluidSubtitles|world|3d)\//.test(page),
      changefreq: 'monthly',
      priority: 0.7,
      serialize(item) {
        if (item.url === 'https://chrisswimlee.com/') item.priority = 1.0;
        if (item.url.endsWith('/connectingCaptions/') || item.url.endsWith('/hire/')) item.priority = 0.9;
        return item;
      },
    }),
  ],
  redirects: {
    '/world': '/',
    '/3d': '/',
    '/tutor': '/engage/',
    '/fluidTranslation': '/connectingCaptions/',
    '/fluidSubtitles': '/connectingCaptions/',
    '/fluidSubtitles/license': '/connectingCaptions/license/',
  },
});
