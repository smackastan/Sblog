// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  site: 'https://ashmanlab.com',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: { theme: 'rose-pine-dawn' }, // Using a premium light theme for mdx
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    sitemap(),
  ],
  markdown: {
    shikiConfig: { theme: 'rose-pine-dawn' }, // And plain md
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  }
});