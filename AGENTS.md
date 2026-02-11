# AGENTS.md

## Overview
This file contains technical instructions for AI agents working on this Data Science Portfolio and Blog. Use this as a guide when adding content, modifying the build pipeline, or updating the design.

## Architecture
- **Framework**: Astro (Static Site Generation)
- **Styling**: Tailwind CSS
- **Content**: Markdown/MDX with Frontmatter
- **Math Support**: `remark-math` + `rehype-katex`
- **Syntax Highlighting**: Shiki (configured in `astro.config.mjs`)
- **Deployment**: GitHub Actions -> GitHub Pages

## Adding Blog Posts
1. Create a new `.md` or `.mdx` file in `src/content/blog/`.
2. Filename format: `YYYY-MM-DD-slug.md` (e.g., `2024-03-15-my-post.md`).
3. Required Frontmatter:
   ```yaml
   ---
   title: "Post Title"
   description: "Brief description of the post."
   pubDate: "YYYY-MM-DD"
   updatedDate: "YYYY-MM-DD" (optional)
   heroImage: "/blog-placeholder-1.jpg" (optional)
   ---
   ```
4. **Images**: Place images in `public/` and reference them as `/image.png`.

## Code & Math blocks
- **Code**: Use standard markdown fences with language tags (e.g., \`\`\`python).
- **Math**: Use `$` for inline math and `$$` for block math.

## Build Pipeline
- Run `npm run build` to generate the static site in `dist/`.
- The GitHub Action `.github/workflows/deploy.yml` handles deployment to GitHub Pages.
- NOTE: The `withastro/action` requires the `GITHUB_TOKEN` to be set in the repo secrets/permissions.

## Aesthetics ("Research Lab")
- Keep the design clean, minimalist, and "academic".
- Use semantic HTML.
- Ensure the Table of Contents (TOC) is present for long posts.

## Troubleshooting
- If LaTeX doesn't render, check `astro.config.mjs` to ensure `remark-math` and `rehype-katex` are strictly configured in the `markdown` object.
- If styles are missing, verify `tailwind.config.mjs` includes the correct content paths.
