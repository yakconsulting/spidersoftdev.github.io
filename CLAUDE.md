# SpiderSoft Website - Project Overview

## Project Type
This is a **Hugo static site generator** project for SpiderSoft's company website (spidersoft.com.au). Hugo is a fast, modern static site generator written in Go that builds websites from markdown files and templates.

## Project Description
SpiderSoft is an Australian software development company with offices in Sydney and Poland. The website serves as their business presence, featuring:
- Company information and services
- Technical blog with development tutorials and insights
- Project portfolio and case studies
- Contact information and business policies

## Key Directories & Structure

### Core Hugo Directories
- **`/content/`** - All markdown content files
  - `posts/` - Blog posts dating from 2010-2025 (150+ articles)
  - `about/` - Company information
  - `services/` - Business services offered
  - `projects/` - Open source projects and portfolio
  - `contact-us/`, `privacy-policy/`, `terms-and-conditions/`, `refund-policy/` - Business pages

- **`/layouts/`** - Custom Hugo templates and overrides
  - `_default/` - Base templates (baseof.html, single.html, summary.html)
  - `partials/` - Reusable template components
  - `shortcodes/` - Custom Hugo shortcodes

- **`/static/`** - Static assets served directly
  - `css/` - Custom stylesheets
  - `images/` - Company logo and branding
  - Favicon files and CNAME for deployment

- **`/assets/`** - Source assets processed by Hugo
  - `images/` - Blog post images organized by year (2010-2025)
  - `js/` - JavaScript files

### Build & Deployment
- **`/public/`** - Generated static site (Hugo build output)
- **`/resources/`** - Hugo's resource cache
- **`/themes/mainroad/`** - Hugo theme (Mainroad theme via git submodule)

### Configuration Files
- **`config.toml`** - Main Hugo configuration
- **`content/config.yaml`** - Additional content configuration
- **`.hugo_build.lock`** - Hugo build lock file

## Important Configuration Files

### `config.toml`
Main Hugo configuration containing:
- Site metadata (title, description, URL)
- Theme configuration (using "mainroad" theme)
- Menu structures (main navigation, sidebar, footer)
- SEO settings (Google Analytics, Disqus comments)
- Author information and social media links
- Deployment settings for cloud providers
- Custom CSS and styling parameters

### `themes/mainroad/`
Uses the Mainroad Hugo theme with:
- Responsive, clean design
- Built-in widgets (search, categories, social links)
- WordPress-inspired layout
- Multilingual support capabilities

## Build & Development Commands

### Prerequisites
- Hugo static site generator installed (`hugo` command available)
- Git (for theme submodule management)

### Common Development Commands

```bash
# Development server with live reload
hugo server

# Development server with drafts included
hugo server -D

# Build production site
hugo

# Build production site with minification
hugo --minify

# Check Hugo version
hugo version

# Update theme submodule
git submodule update --remote themes/mainroad
```

### Theme Development (from themes/mainroad/)
```bash
# Install theme dependencies
npm install

# Lint CSS and JavaScript
npm run lint

# Fix styling issues
npm run fix

# Run tests
npm test
```

## Architecture Overview

### Content Management
- **Markdown-based**: All content written in Markdown with YAML front matter
- **Taxonomy system**: Posts categorized by topics (Go Lang, PHP, DevOps, etc.)
- **Date-based organization**: Blog posts organized chronologically
- **SEO optimized**: Meta descriptions, keywords, and structured data

### Theme Architecture
- **Mainroad theme**: Professional, responsive Hugo theme
- **Custom overrides**: Local layouts override theme defaults
- **Widget system**: Configurable sidebar widgets (search, categories, social)
- **Multi-language ready**: Though currently English-only

### Development Workflow
1. Content authored in Markdown files
2. Hugo processes templates and content
3. Static HTML generated in `/public/`
4. Deployment via Hugo's built-in deployment tools
5. Theme managed as git submodule for updates

### Deployment
- **Static hosting**: Configured for various cloud providers (AWS S3, GCS, Azure)
- **CDN integration**: CloudFront configuration included
- **Cache optimization**: Asset caching rules defined
- **Domain**: Custom domain (spidersoft.com.au) with CNAME file

### Analytics & Tracking
- **Google Analytics**: Integrated tracking (UA-629893-49)
- **Disqus Comments**: Social commenting system
- **Social Integration**: Links to GitHub, LinkedIn, Facebook, Twitter

## Content Focus
The website serves as both a business presence and technical knowledge base, with extensive blog content covering:
- Go/Golang development
- PHP and web development
- DevOps and server administration
- AWS and cloud services
- Development tools and workflows
- Business insights and case studies

This is a mature, well-maintained Hugo site representing over a decade of technical blogging and business development.