# App Template Product, SEO, and AI Discoverability Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Evolve the app landing-page template from a screenshot-and-FAQ page into a stronger product page that explains value, supports SEO, and makes app facts easier for search engines and AI answer engines to understand and cite.

**Architecture:** Keep the current simple Astro architecture. Extend `src/components/app/AppTemplate.astro` with optional declarative content sections so existing app pages keep working, then update each English and Portuguese app page with equivalent localized product data. Keep SEO helpers in `src/core/seo.ts` and avoid adding dependencies.

**Tech Stack:** Astro from this repo (`astro` package currently `^6.1.10`), TypeScript, `.astro` components, existing CSS variables from `src/styles/global.css`, existing JSON-LD helpers in `src/core/seo.ts`, existing `npm run build` verification.

---

## Current State

- `src/components/app/AppTemplate.astro` currently renders: app icon, title, description, App Store badge, screenshots, FAQ, legal links.
- App pages declare their own `description`, `screenshots`, `faq`, `metas`, `applicationCategory`, and localized copy.
- `src/core/seo.ts` already generates `SoftwareApplication` and `BreadcrumbList` JSON-LD, plus canonical and `hreflang` helpers.
- `src/layouts/Layout.astro` already supports canonical URL, alternates, Open Graph, Twitter cards, robots, and JSON-LD.
- The template has no visible product value sections such as features, benefits, use cases, proof points, privacy/offline facts, pricing, or user quotes.

## Product Strategy

Add sections that help a visitor quickly answer:

- What is this app?
- Who is it for?
- What can I do with it?
- Why is it useful compared with a generic alternative?
- What should I know before downloading?

Do not invent claims. Only add testimonials, ratings, awards, download counts, pricing, or performance claims when there is a verifiable source and the same claim is visible on the page.

## SEO Strategy

Focus on stable, maintainable improvements:

- Make each app page target one primary search intent.
- Add scannable `h2` sections with specific app/category language.
- Expand `SoftwareApplication` JSON-LD with visible, accurate fields.
- Keep canonical and localized alternates reciprocal.
- Use richer screenshot alt text and captions so images carry product meaning.
- Add App Store metadata only when `appId` exists.

Google references used for this plan:

- https://developers.google.com/search/docs/appearance/structured-data/software-app
- https://developers.google.com/search/docs/guides/intro-structured-data
- https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- https://developers.google.com/search/docs/appearance/ai-features

## AI Discoverability Strategy

Treat “SEO for AI” as answer clarity and crawlability:

- Keep important product facts in server-rendered HTML, not only inside screenshots.
- Add concise answer-style sections such as “Best for”, “Key features”, “Privacy and offline use”, and “Pricing”.
- Add visible facts that match JSON-LD exactly.
- Allow search-oriented AI crawlers when the goal is citation in AI search.
- Add optional `/llms.txt` later as a curated map of app and portfolio pages, while treating it as an emerging convention rather than a guaranteed ranking mechanism.

AI references used for this plan:

- https://developers.google.com/search/docs/appearance/ai-features
- https://platform.openai.com/docs/bots
- https://openai.com/chatgpt/search-product-discovery/
- https://llmstxt.org/index.html

---

## File Structure

- Modify: `src/components/app/AppTemplate.astro`
  - Add optional props for product sections.
  - Render features, use cases, product facts, testimonials, and richer screenshot context.
  - Preserve current layout and all existing pages when new props are omitted.
- Modify: `src/core/seo.ts`
  - Extend `softwareApplicationJsonLd` input to support `featureList`, `offers`, `aggregateRating`, `sameAs`, and `keywords` only when real and visible.
  - Keep JSON-LD generation centralized.
- Modify: `src/pages/apps/duotake/index.astro`
  - Add English product value data for DuoTake.
- Modify: `src/pages/pt-br/apps/duotake/index.astro`
  - Add equivalent Portuguese product value data for DuoTake.
- Modify: `src/pages/apps/kuborush/index.astro`
  - Add English product value data for KuboRush.
- Modify: `src/pages/pt-br/apps/kuborush/index.astro`
  - Add equivalent Portuguese product value data for KuboRush.
- Modify: `src/pages/apps/loopsize/index.astro`
  - Add English product value data for LoopSize.
- Modify: `src/pages/pt-br/apps/loopsize/index.astro`
  - Add equivalent Portuguese product value data for LoopSize.
- Optional later: `src/pages/robots.txt.ts`
  - If the repo does not already generate robots rules, add crawler policy including `OAI-SearchBot`.
- Optional later: `src/pages/llms.txt.ts`
  - Add a concise AI-readable site map for portfolio, resume, and app pages.

---

### Task 1: Define the Product Content Contract

**Files:**
- Modify: `src/components/app/AppTemplate.astro`

- [ ] **Step 1: Extend `Props` without breaking existing pages**

Add optional props to the existing `Props` interface:

```ts
interface AppFeature {
    title: string;
    description: string;
}

interface AppUseCase {
    title: string;
    description: string;
}

interface AppFact {
    label: string;
    value: string;
}

interface AppTestimonial {
    quote: string;
    author: string;
    context?: string;
}

interface Props {
    appId?: string,
    title: string,
    pageTitle?: string,
    appName?: string,
    favicon: string,
    appIcon: string,
    description: string,
    screenshots: { url: string, alt: string, caption?: string }[],
    faq: { question: string, answer: string }[],
    metas: { name: string, content: string }[],
    lang?: string,
    applicationCategory?: string,
    features?: AppFeature[],
    useCases?: AppUseCase[],
    facts?: AppFact[],
    testimonials?: AppTestimonial[],
    primaryKeyword?: string,
    secondaryKeywords?: string[],
}
```

- [ ] **Step 2: Add defaults in `Astro.props` destructuring**

Use empty arrays so old pages render identically:

```ts
const {
    appId,
    title,
    pageTitle,
    appName,
    metas,
    favicon,
    appIcon,
    description,
    screenshots,
    faq,
    lang,
    applicationCategory = "MobileApplication",
    features = [],
    useCases = [],
    facts = [],
    testimonials = [],
    primaryKeyword,
    secondaryKeywords = [],
} = Astro.props;
```

- [ ] **Step 3: Commit**

```bash
git add src/components/app/AppTemplate.astro
git commit -m "feat: define app product content fields"
```

---

### Task 2: Add Product Value Sections to the Template

**Files:**
- Modify: `src/components/app/AppTemplate.astro`

- [ ] **Step 1: Render a facts strip below the hero**

Place this after `</header>` and before screenshots:

```astro
{facts.length > 0 && (
    <section class="product-facts" aria-label={seoLanguage === "pt-br" ? "Resumo do app" : "App summary"}>
        <div class="container product-facts-inner">
            {facts.map((fact) => (
                <div class="product-fact">
                    <span>{fact.label}</span>
                    <strong>{fact.value}</strong>
                </div>
            ))}
        </div>
    </section>
)}
```

- [ ] **Step 2: Render features**

Place this after the screenshots section:

```astro
{features.length > 0 && (
    <section class="features-section section-sm" aria-labelledby="features-heading">
        <div class="container">
            <h2 id="features-heading">{seoLanguage === "pt-br" ? "Recursos principais" : "Key features"}</h2>
            <div class="feature-grid">
                {features.map((feature) => (
                    <article class="feature-card">
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                    </article>
                ))}
            </div>
        </div>
    </section>
)}
```

- [ ] **Step 3: Render use cases**

Place this after features:

```astro
{useCases.length > 0 && (
    <section class="use-cases-section section-sm" aria-labelledby="use-cases-heading">
        <div class="container">
            <h2 id="use-cases-heading">{seoLanguage === "pt-br" ? "Ideal para" : "Best for"}</h2>
            <div class="use-case-list">
                {useCases.map((useCase) => (
                    <article class="use-case-item">
                        <h3>{useCase.title}</h3>
                        <p>{useCase.description}</p>
                    </article>
                ))}
            </div>
        </div>
    </section>
)}
```

- [ ] **Step 4: Render testimonials only when real**

Place this after use cases. If no app has real testimonials yet, keep the prop supported but do not pass data from pages.

```astro
{testimonials.length > 0 && (
    <section class="testimonials-section section-sm" aria-labelledby="testimonials-heading">
        <div class="container">
            <h2 id="testimonials-heading">{seoLanguage === "pt-br" ? "O que usuários dizem" : "What users say"}</h2>
            <div class="testimonial-list">
                {testimonials.map((testimonial) => (
                    <figure class="testimonial">
                        <blockquote>{testimonial.quote}</blockquote>
                        <figcaption>
                            <strong>{testimonial.author}</strong>
                            {testimonial.context && <span>{testimonial.context}</span>}
                        </figcaption>
                    </figure>
                ))}
            </div>
        </div>
    </section>
)}
```

- [ ] **Step 5: Add screenshot captions**

Inside each screenshot `figure`, add:

```astro
{screenshot.caption && <figcaption>{screenshot.caption}</figcaption>}
```

- [ ] **Step 6: Add CSS using existing theme variables**

Add styles that preserve the current clean Apple-inspired tone:

```css
.product-facts {
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    background: var(--bg);
}

.product-facts-inner {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1px;
}

.product-fact {
    padding: 24px 16px;
    text-align: center;
}

.product-fact span {
    display: block;
    color: var(--text-tertiary);
    font-size: 13px;
    margin-bottom: 6px;
}

.product-fact strong {
    color: var(--text-primary);
    font-size: 17px;
}

.features-section h2,
.use-cases-section h2,
.testimonials-section h2 {
    color: var(--text-primary);
    font-size: 28px;
    letter-spacing: -0.02em;
    margin: 0 0 24px;
}

.feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
}

.feature-card,
.use-case-item,
.testimonial {
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 24px;
    background: var(--bg);
}

.feature-card h3,
.use-case-item h3 {
    color: var(--text-primary);
    font-size: 18px;
    margin: 0 0 8px;
}

.feature-card p,
.use-case-item p,
.testimonial blockquote {
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
}

.use-case-list,
.testimonial-list {
    display: grid;
    gap: 16px;
}

.testimonial figcaption {
    display: flex;
    flex-direction: column;
    gap: 4px;
    color: var(--text-tertiary);
    margin-top: 16px;
}

.screenshots figcaption {
    color: var(--text-tertiary);
    font-size: 13px;
    line-height: 1.5;
    margin-top: 10px;
    text-align: center;
}
```

- [ ] **Step 7: Commit**

```bash
git add src/components/app/AppTemplate.astro
git commit -m "feat: add product sections to app template"
```

---

### Task 3: Enrich SoftwareApplication JSON-LD

**Files:**
- Modify: `src/core/seo.ts`
- Modify: `src/components/app/AppTemplate.astro`

- [ ] **Step 1: Extend the helper input**

Add optional fields to `softwareApplicationJsonLd`:

```ts
featureList?: string[];
keywords?: string[];
sameAs?: string[];
price?: string;
priceCurrency?: string;
```

- [ ] **Step 2: Add optional JSON-LD properties**

Inside the returned object, add only when values exist:

```ts
...(featureList && featureList.length > 0 ? { featureList } : {}),
...(keywords && keywords.length > 0 ? { keywords: keywords.join(", ") } : {}),
...(sameAs && sameAs.length > 0 ? { sameAs } : {}),
offers: {
    "@type": "Offer",
    price: price ?? "0",
    priceCurrency: priceCurrency ?? "USD",
},
```

- [ ] **Step 3: Pass feature and keyword data from `AppTemplate.astro`**

Update the current `softwareApplicationJsonLd` call:

```ts
const appJsonLd = softwareApplicationJsonLd({
    name: structuredAppName,
    description,
    path: currentPath,
    appIcon,
    screenshots: screenshots.map((screenshot) => screenshot.url),
    appId,
    language: seoLanguage,
    applicationCategory,
    featureList: features.map((feature) => feature.title),
    keywords: [primaryKeyword, ...secondaryKeywords].filter(Boolean) as string[],
});
```

- [ ] **Step 4: Do not add ratings or reviews yet**

Skip `aggregateRating` and `review` until the project has a reliable source and visible review content on the page. Google structured data policies require structured data to match page content and avoid misleading markup.

- [ ] **Step 5: Commit**

```bash
git add src/core/seo.ts src/components/app/AppTemplate.astro
git commit -m "feat: enrich app structured data"
```

---

### Task 4: Update App Pages With Real Product Data

**Files:**
- Modify all six app landing pages under `src/pages/apps/*/index.astro` and `src/pages/pt-br/apps/*/index.astro`

- [ ] **Step 1: Add DuoTake English data**

Use data like:

```ts
const facts = [
    { label: "Platform", value: "iPhone" },
    { label: "Best for", value: "Reaction videos" },
    { label: "Capture", value: "Front + back cameras" },
];

const features = [
    {
        title: "Dual-camera capture",
        description: "Record the scene and your reaction at the same time using the front and rear cameras.",
    },
    {
        title: "CropOut framing",
        description: "Create cleaner framing for reaction-style videos without rebuilding your setup after each take.",
    },
    {
        title: "Photo and video modes",
        description: "Capture stills or videos depending on the format you need for your post.",
    },
];

const useCases = [
    {
        title: "Reaction creators",
        description: "Show what you are watching and your response in one ready-to-share capture.",
    },
    {
        title: "Behind-the-scenes posts",
        description: "Record the moment and the person behind the camera without switching apps.",
    },
];
```

- [ ] **Step 2: Add equivalent DuoTake Portuguese data**

Use localized equivalents, not machine-mixed English labels.

- [ ] **Step 3: Add KuboRush English and Portuguese data**

Recommended themes:

- Casual block puzzle for short sessions.
- No-pressure play.
- Power-ups: Hint, Shuffle, Rotate, Undo.
- Competitive modes: Hall of Fame and Weekly Rush.

- [ ] **Step 4: Add LoopSize English and Portuguese data**

Recommended themes:

- Ring size conversion across BR, US, UK, EU/ISO, JP, CN, IN.
- Save and export measurements.
- True-to-scale PDF printing guidance.
- Offline calculations.

- [ ] **Step 5: Pass new props into `AppTemplate`**

Each page should include:

```astro
<AppTemplate
    appId={appId}
    title={title}
    pageTitle={pageTitle}
    metas={metas}
    favicon={favicon}
    appIcon={appIcon}
    description={description}
    screenshots={screenshots}
    faq={faq}
    facts={facts}
    features={features}
    useCases={useCases}
    primaryKeyword={primaryKeyword}
    secondaryKeywords={secondaryKeywords}
    lang="en"
    applicationCategory={applicationCategory}
/>
```

For pages that currently pass a literal `applicationCategory`, keep the literal value instead of creating a new constant. Example for DuoTake:

```ts
const primaryKeyword = "dual camera app";
const secondaryKeywords = ["reaction video app", "front and back camera", "iPhone camera app"];
```

- [ ] **Step 6: Commit**

```bash
git add src/pages/apps src/pages/pt-br/apps
git commit -m "content: expand app landing page product details"
```

---

### Task 5: Improve SEO Copy and Metadata

**Files:**
- Modify all six app landing pages under `src/pages/apps/*/index.astro` and `src/pages/pt-br/apps/*/index.astro`

- [ ] **Step 1: Tighten page titles**

Use this pattern:

- DuoTake EN: `DuoTake | Dual Camera App for Reaction Videos`
- DuoTake PT-BR: `DuoTake | App de Câmera Dupla para Reacts`
- KuboRush EN: `KuboRush | Block Puzzle Game for iOS`
- KuboRush PT-BR: `KuboRush | Jogo de Quebra-Cabeça de Blocos para iOS`
- LoopSize EN: `LoopSize | Ring Size Converter for iPhone`
- LoopSize PT-BR: `LoopSize | Conversor de Tamanho de Anéis para iPhone`

- [ ] **Step 2: Keep descriptions within a concise search-snippet shape**

Each description should include: app name, app category, platform, main benefit, differentiator.

Example:

```ts
const description =
    "LoopSize is an iPhone ring size converter for BR, US, UK, EU/ISO, JP, CN, and IN sizes, with saved measurements and PDF export.";
```

- [ ] **Step 3: Improve screenshot captions**

Captions should explain product value, while `alt` remains descriptive of the image. Example:

```ts
{
    url: "loopsize/screenshots/frame-6.png",
    alt: "LoopSize PDF export screen for saved ring measurements.",
    caption: "Export a measurement sheet when you need a printable reference."
}
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/apps src/pages/pt-br/apps
git commit -m "content: improve app SEO copy"
```

---

### Task 6: Add AI-Oriented Crawl and Citation Support

**Files:**
- Optional create: `src/pages/robots.txt.ts`
- Optional create: `src/pages/llms.txt.ts`

- [ ] **Step 1: Check whether robots already exists**

```bash
rg -n "robots|sitemap" src public astro.config.* package.json
```

- [ ] **Step 2: If missing, add `robots.txt` route**

Create `src/pages/robots.txt.ts`:

```ts
import type { APIRoute } from "astro";
import { siteUrl } from "../core/seo";

export const GET: APIRoute = () => new Response(
    [
        "User-agent: *",
        "Allow: /",
        "",
        "User-agent: OAI-SearchBot",
        "Allow: /",
        "",
        `Sitemap: ${siteUrl}/sitemap.xml`,
        "",
    ].join("\n"),
    {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    },
);
```

- [ ] **Step 3: Optionally add `/llms.txt`**

Create `src/pages/llms.txt.ts`:

```ts
import type { APIRoute } from "astro";
import { absoluteUrl } from "../core/seo";

export const GET: APIRoute = () => new Response(
    [
        "# Adriano Souza Costa",
        "",
        "> Personal website for Adriano Souza Costa, an iOS/macOS developer and AI enthusiast, including resume pages and iOS app landing pages.",
        "",
        "## Main Pages",
        `- [Home](${absoluteUrl("/")}): Portfolio overview, featured projects, and professional profile.`,
        `- [Resume](${absoluteUrl("/resume/")}): English resume with iOS, macOS, Swift, SwiftUI, UIKit, Objective-C, and AI experience.`,
        `- [Curriculo](${absoluteUrl("/resume/pt-br/")}): Portuguese resume.`,
        "",
        "## Apps",
        `- [DuoTake](${absoluteUrl("/apps/duotake/")}): Dual-camera iPhone app for reaction videos and front plus back camera capture.`,
        `- [KuboRush](${absoluteUrl("/apps/kuborush/")}): Casual block puzzle game for iOS with power-ups and weekly competition.`,
        `- [LoopSize](${absoluteUrl("/apps/loopsize/")}): Ring size converter for iPhone with multiple international standards and PDF export.`,
        "",
    ].join("\n"),
    {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    },
);
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/robots.txt.ts src/pages/llms.txt.ts
git commit -m "feat: add AI crawler discovery files"
```

---

### Task 7: Verification

**Files:**
- All modified files

- [ ] **Step 1: Build**

```bash
npm run build
```

Expected: Astro build exits successfully and generates `dist/`.

- [ ] **Step 2: Start local server**

```bash
npm run dev
```

Expected: local server starts at `http://localhost:4321`.

- [ ] **Step 3: Visually inspect app routes**

Check:

- `http://localhost:4321/apps/duotake/`
- `http://localhost:4321/pt-br/apps/duotake/`
- `http://localhost:4321/apps/kuborush/`
- `http://localhost:4321/pt-br/apps/kuborush/`
- `http://localhost:4321/apps/loopsize/`
- `http://localhost:4321/pt-br/apps/loopsize/`

Expected:

- Header remains clean and centered.
- New facts strip does not crowd the first viewport.
- Feature cards and use-case rows are readable in light and dark themes.
- Screenshot lightbox still opens and closes.
- FAQ accordion still works.
- Portuguese pages do not show English section labels.

- [ ] **Step 4: Inspect generated HTML**

```bash
rg -n "SoftwareApplication|featureList|canonical|hreflang|OAI-SearchBot|llms" dist
```

Expected:

- `SoftwareApplication` appears on app pages.
- `featureList` appears only when features are passed.
- canonical and `hreflang` tags exist on localized app pages.
- `OAI-SearchBot` appears only if `robots.txt` was added.
- `llms.txt` appears only if the optional route was added.

- [ ] **Step 5: Final commit**

```bash
git status --short
git add src docs
git commit -m "feat: optimize app template for product SEO"
```

---

## Implementation Notes

- Keep testimonials optional and empty unless real user quotes are available.
- Do not add `aggregateRating` until ratings are sourced from App Store or another reliable public source and represented visibly.
- Do not add broad keyword stuffing. Use specific phrases naturally in headings, descriptions, captions, and FAQs.
- Keep structured data aligned with visible content.
- Prefer fewer, stronger product sections over a long generic landing page.
- Use the existing app template rather than creating per-app custom layouts.

## Suggested Priority

1. Product sections in `AppTemplate.astro`.
2. Real localized data for all current app pages.
3. JSON-LD enrichment based on visible feature data.
4. SEO copy cleanup.
5. Optional `/robots.txt` and `/llms.txt` once sitemap/crawler policy is confirmed.
