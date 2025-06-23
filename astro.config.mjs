// @ts-check
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import rehypeExternalLinks from 'rehype-external-links';
import cleanOriginalImages from './src/utils/cleanOriginalImages.js';

// https://astro.build/config
export default defineConfig({
  site: 'https://jaynarol.github.io',
  outDir: './docs',
  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true,
    },
    rehypePlugins: [
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }]
    ],
  },
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    sitemap(),
    cleanOriginalImages({
      dryRun: false,
      extensions: ['png', 'jpg', 'jpeg'],
      verbose: true
    })
  ]
});