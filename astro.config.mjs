import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://chrisswimlee.com',
  trailingSlash: 'always',
  redirects: {
    '/tutor': '/engage',
    '/fluidTranslation': '/connectingCaptions/',
    '/fluidSubtitles': '/connectingCaptions/',
    '/fluidSubtitles/license': '/connectingCaptions/license/',
  },
});
