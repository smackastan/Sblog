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

## GitHub & Deployment

### Repository Information
- **URL**: `https://github.com/smackastan/Sblog`
- **Branch**: `main` (default for deployment)
- **Deployment URL**: `https://smackastan.github.io/Sblog/`

### Authentication for Agents
FUTURE AGENT: If you encounter authentication issues when pushing to this repository, follow these steps:
1. **Token Requirement**: You need a GitHub Personal Access Token (classic) with at least `repo` and `workflow` scopes.
   - `repo`: For pushing code.
   - `workflow`: For modifying `.github/workflows/` files.
2. **Login Command**:
   ```bash
   # If you have the token string from the user:
   echo "YOUR_TOKEN" | gh auth login --with-token
   ```
3. **Troubleshooting 403 Errors**:
   - If `git push` fails with a 403, it likely means the current token lacks `workflow` scope (if you edited a workflow file) or has expired.
   - Solution: Ask the user to generate a new token with the correct scopes.

### Build Pipeline (CI/CD)
- **Local Build**: Run `npm run build` to verify the site builds without errors before pushing.
- **Automated Deployment**:
  - The file `.github/workflows/deploy.yml` runs on every push to `main`.
  - It uses `withastro/action` to build and deploy to GitHub Pages.
  - **Important**: Ensure "Read and write permissions" are enabled for `GITHUB_TOKEN` in the repository settings (Settings -> Actions -> General -> Workflow permissions).

## Aesthetics ("Research Lab")
- Keep the design clean, minimalist, and "academic".
- Use semantic HTML.
- Ensure the Table of Contents (TOC) is present for long posts.

## Troubleshooting
- If LaTeX doesn't render, check `astro.config.mjs` to ensure `remark-math` and `rehype-katex` are strictly configured in the `markdown` object.
- If styles are missing, verify `tailwind.config.mjs` includes the correct content paths.
