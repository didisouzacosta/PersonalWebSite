# SEO Optimization Plan

## Goals

- Make every public page indexable with the correct canonical URL, language alternates, Open Graph URL, title, and description.
- Separate SEO intent for the homepage, resume pages, and each app page instead of reusing generic site-level metadata.
- Add structured data where it describes real page content and can be maintained safely.
- Keep the site bilingual without creating canonical or hreflang conflicts.
- Establish a repeatable checklist for every future app page.

## Current Findings

- `src/layouts/Layout.astro` currently hardcodes `rel="canonical"` and `og:url` to `https://adrianosouzacosta.com.br` for every page. This should be page-specific.
- English and Portuguese pages exist for the homepage, resume, and app pages, but there are no `hreflang` alternates.
- App pages have strong content, screenshots, FAQ sections, and app icons, but they do not expose `SoftwareApplication` structured data yet.
- Resume pages are rendered through `src/components/resume/Resume.astro`; they need dedicated metadata and structured data separate from the homepage.
- There is no visible sitemap or robots file in the project tree.

## Implementation Priorities

### Priority 1: Metadata Foundation

Update `src/layouts/Layout.astro` to accept page-specific SEO props:

- `canonicalPath` or `canonicalUrl`
- `ogType`
- `alternateLocales`
- `jsonLd`
- optional `robots`

Default behavior should build absolute URLs from a single site constant:

```ts
const siteUrl = "https://adrianosouzacosta.com.br";
```

Each page should output:

- unique `<title>`
- unique `<meta name="description">`
- page-specific `<link rel="canonical">`
- page-specific `og:url`
- `og:locale` and `og:locale:alternate` when applicable
- Twitter metadata matching Open Graph

Google treats canonical annotations as a strong signal, and recommends absolute canonical URLs in the document head. Source: Google Search Central canonicalization docs.

### Priority 2: Hreflang For Bilingual Pages

Add reciprocal alternates for each bilingual pair:

- `/` ↔ `/pt-br/`
- `/resume/` ↔ `/resume/pt-br/`
- `/apps/kuborush/` ↔ `/pt-br/apps/kuborush/`
- `/apps/loopsize/` ↔ `/pt-br/apps/loopsize/`
- `/apps/duotake/` ↔ `/pt-br/apps/duotake/`

Use:

- `hreflang="en"`
- `hreflang="pt-BR"`
- `hreflang="x-default"` pointing to the English page for global fallback

Every localized version should reference itself and its counterpart. Source: Google Search Central localized versions docs.

### Priority 3: Sitemap And Robots

Add static generation for:

- `/sitemap.xml`
- `/robots.txt`

The sitemap should include canonical public URLs only:

- homepage routes
- resume routes
- app landing pages
- legal pages only if they should appear in search

For each bilingual page, include `xhtml:link` alternates in the sitemap or keep alternates in HTML only. Use one consistent method first: HTML alternates are easier to maintain in this Astro project.

Robots should allow crawling and reference the sitemap:

```txt
User-agent: *
Allow: /

Sitemap: https://adrianosouzacosta.com.br/sitemap.xml
```

### Priority 4: Structured Data

Add JSON-LD per page type:

- Homepage: `Person` with `name`, `url`, `jobTitle`, `sameAs`, `knowsAbout`, and links to apps/projects.
- Resume: `ProfilePage` or `Person` plus `sameAs`, work/skill summary, and canonical resume URL.
- App pages: `SoftwareApplication` with `name`, `operatingSystem`, `applicationCategory`, `description`, `image`, `url`, `offers` when pricing is known, and `downloadUrl` for App Store apps.
- Site-wide: optional `WebSite` on the homepage.
- Breadcrumbs: `BreadcrumbList` for app and legal pages.

Do not add FAQ structured data for app FAQs as a primary strategy. Google currently limits FAQ rich results to well-known authoritative government or health sites, so app FAQ markup is unlikely to produce rich results and can create maintenance noise. Source: Google Search Central FAQ structured data docs.

### Priority 5: Page-Specific Content Strategy

#### Homepage

Search intent:

- Adriano Souza Costa
- iOS/macOS Developer
- Swift, SwiftUI, UIKit, Objective-C
- AI Engineer / Codex workflow

Recommended metadata:

- Title: `Adriano Souza Costa | iOS/macOS Developer & AI Engineer`
- Description: concise value proposition with experience, Swift ecosystem, UX, architecture, and AI-assisted product work.

Content improvements:

- Keep the H1 as the name.
- Ensure the visible body text mentions iOS, macOS, Swift, SwiftUI, UIKit, Objective-C, AI Engineer, and product architecture naturally.
- Add internal links from project cards to app pages where available.

#### Resume Pages

Search intent:

- Adriano Souza Costa resume
- iOS developer resume
- Swift developer resume
- macOS developer resume

Recommended metadata:

- English title: `Resume | Adriano Souza Costa`
- Portuguese title: `Currículo | Adriano Souza Costa`
- Descriptions should mention senior iOS/macOS development, Swift/SwiftUI, UIKit, Objective-C, and AI engineering.

Content improvements:

- Ensure resume pages have a single `h1`.
- Keep downloadable resume URLs canonicalized or noindexed if duplicate PDF/HTML versions later appear.
- Add `Person`/`ProfilePage` JSON-LD.

#### App Pages

Search intent should be specific to each product:

- KuboRush: block puzzle game, iOS puzzle game, weekly challenges, leaderboards.
- LoopSize: ring size converter, ring measurement, BR/US/UK/EU/ISO sizes, PDF export.
- DuoTake: front and back camera, reaction video camera, dual camera capture.

Recommended page pattern:

- Title: `{App Name} | {Primary Use Case}`
- Description: one sentence with app type, platform, core benefit, and differentiator.
- H1: app name or app name plus product category.
- H2 sections: screenshots, FAQ, privacy/legal where useful.

Structured data:

- Add `SoftwareApplication` JSON-LD to every app page.
- Include App Store URL for apps with `appId`.
- Use app icon as `image`.
- Use screenshots as supporting visible media, not necessarily as structured data unless needed later.

### Priority 6: Technical SEO QA

Add build-time checks or a manual checklist:

- Every indexable page has exactly one canonical URL.
- Canonical URL matches the deployed path.
- English and Portuguese pairs have reciprocal hreflang tags.
- `og:url` matches canonical URL.
- `og:image` is absolute and valid.
- Descriptions are present and unique.
- JSON-LD parses in Rich Results Test.
- Sitemap only includes canonical URLs.
- Legal pages are intentionally indexable or intentionally excluded.

### Priority 7: Post-Launch Validation

After deployment:

- Submit sitemap in Google Search Console.
- Inspect homepage, resume, and each app URL.
- Validate canonical selection in URL Inspection.
- Test structured data with Rich Results Test.
- Monitor coverage, enhancements, and performance by page group:
  - Home
  - Resume
  - Apps
  - Legal

## Recommended Implementation Order

1. Refactor `Layout.astro` SEO props and site URL handling.
2. Add canonical and Open Graph URL per route.
3. Add hreflang alternates for bilingual pages.
4. Add sitemap and robots routes.
5. Add JSON-LD support to `Layout.astro`.
6. Add homepage and resume structured data.
7. Add app structured data through `AppTemplate.astro`.
8. Review page titles/descriptions for homepage, resume, and each app.
9. Validate production output and submit sitemap.

## References

- Google Search Central SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Search Central canonicalization: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google Search Central localized versions: https://developers.google.com/search/docs/specialty/international/localized-versions
- Google Search Central SoftwareApplication structured data: https://developers.google.com/search/docs/appearance/structured-data/software-app
- Google Search Central FAQ structured data: https://developers.google.com/search/docs/appearance/structured-data/faqpage
- Google Search Central snippets and meta descriptions: https://developers.google.com/search/docs/appearance/snippet
