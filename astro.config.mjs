import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFile, readdir, writeFile } from 'node:fs/promises';

// The galaxy's 3D code is a dynamic import, so the browser only learns about
// it after the page script has loaded and run. This starts those downloads
// from the homepage <head> instead. Save-Data visitors get the text archive
// and never use the 3D code, so they are skipped (same test as World.astro).
const preloadGalaxy = () => ({
  name: 'preload-galaxy',
  hooks: {
    'astro:build:done': async ({ dir, logger }) => {
      const files = await readdir(new URL('_astro/', dir));
      const chunks = [/^preload-helper\..+\.js$/, /^three\.module\..+\.js$/, /^float\..+\.js$/].map((name) =>
        files.find((file) => name.test(file)),
      );
      if (chunks.some((chunk) => !chunk)) {
        logger.warn('3D chunks not found; homepage ships without the preload.');
        return;
      }
      const urls = JSON.stringify(chunks.map((chunk) => `/_astro/${chunk}`));
      const script = `<script>if(!((navigator.connection&&navigator.connection.saveData)||matchMedia('(prefers-reduced-data: reduce)').matches))for(const u of ${urls}){const l=document.createElement('link');l.rel='modulepreload';l.href=u;document.head.append(l)}</script>`;
      const page = new URL('index.html', dir);
      const html = await readFile(page, 'utf8');
      // Right after the charset, ahead of the stylesheets: an inline script
      // further down would wait for them before it could run.
      const charset = /<meta charset="[^"]*">/i;
      if (!charset.test(html)) {
        logger.warn('Homepage has no charset meta; skipped the 3D preload.');
        return;
      }
      await writeFile(page, html.replace(charset, (tag) => `${tag}${script}`));
    },
  },
});

export default defineConfig({
  site: 'https://chrisswimlee.com',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // Legacy names redirect; keep them out of the index.
      // The Connecting Captions build story is noindex; the product page is the one to rank.
      filter: (page) => !/\/(tutor|fluidTranslation|fluidSubtitles|world|3d|map)\//.test(page) && !page.endsWith('/work/connectingCaptions/'),
      changefreq: 'monthly',
      priority: 0.7,
      serialize(item) {
        if (item.url === 'https://chrisswimlee.com/') item.priority = 1.0;
        if (item.url.endsWith('/connectingCaptions/') || item.url.endsWith('/hire/')) item.priority = 0.9;
        return item;
      },
    }),
    preloadGalaxy(),
  ],
  redirects: {
    '/world': '/',
    '/town': '/',
    '/3d': '/',
    '/tutor': '/engage/',
    '/fluidTranslation': '/connectingCaptions/',
    '/fluidSubtitles': '/connectingCaptions/',
    '/fluidSubtitles/license': '/connectingCaptions/license/',
    '/map': '/resume/',
  },
});
