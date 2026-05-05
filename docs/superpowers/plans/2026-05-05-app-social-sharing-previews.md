# App Social Sharing Previews Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve every app page preview so sharing its link on X/Twitter, WhatsApp, LinkedIn, Facebook, Slack, and similar surfaces shows the app icon, app name, short description, and basic app facts reliably.

**Architecture:** Keep social metadata centralized in `src/layouts/Layout.astro`, let `src/components/app/AppTemplate.astro` pass app-specific social preview data, and define localized preview images directly in each app page. Use deterministic static image files under `public/social/apps/` so deployed URLs are stable and GitHub Pages serves them with the site.

**Tech Stack:** Astro 6, TypeScript frontmatter, static public assets, Open Graph metadata, X/Twitter Card metadata, `npm run build`, and a small Node verification script.

---

## Current State

- `src/layouts/Layout.astro` already renders `og:title`, `og:description`, `og:image`, `og:image:width`, `og:image:height`, `twitter:card`, `twitter:title`, `twitter:description`, and `twitter:image`.
- `src/components/app/AppTemplate.astro` currently passes `ogImage={`${appAssetBaseUrl}${appIcon}`}` to `Layout`.
- The app preview image is currently the square app icon, but `Layout` always declares the image as `1200x630`.
- The result is fragile: large social cards expect a wide image, while the current image is icon-shaped and does not contain the basic app information the user wants visible in the share preview.

## Target Behavior

For each app route:

- `/apps/kuborush/`
- `/pt-br/apps/kuborush/`
- `/apps/loopsize/`
- `/pt-br/apps/loopsize/`
- `/apps/duotake/`
- `/pt-br/apps/duotake/`

The generated HTML should include:

```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://adrianosouzacosta.com.br/apps/kuborush/" />
<meta property="og:title" content="KuboRush | Block Puzzle Game for iOS" />
<meta property="og:description" content="KuboRush is a casual block puzzle game..." />
<meta property="og:image" content="https://adrianosouzacosta.com.br/social/apps/kuborush-share-en.jpg" />
<meta property="og:image:secure_url" content="https://adrianosouzacosta.com.br/social/apps/kuborush-share-en.jpg" />
<meta property="og:image:type" content="image/jpeg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="KuboRush app icon with block puzzle app summary." />
<meta property="og:site_name" content="Adriano Souza Costa" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="KuboRush | Block Puzzle Game for iOS" />
<meta name="twitter:description" content="KuboRush is a casual block puzzle game..." />
<meta name="twitter:image" content="https://adrianosouzacosta.com.br/social/apps/kuborush-share-en.jpg" />
<meta name="twitter:image:alt" content="KuboRush app icon with block puzzle app summary." />
```

Portuguese pages should use Portuguese descriptions and Portuguese preview images, for example:

```html
<meta property="og:image" content="https://adrianosouzacosta.com.br/social/apps/kuborush-share-pt-br.jpg" />
<meta property="og:image:alt" content="Icone do app KuboRush com resumo do jogo de blocos." />
```

## Social Image Design Standard

Create one static JPG per app per locale:

- `public/social/apps/kuborush-share-en.jpg`
- `public/social/apps/kuborush-share-pt-br.jpg`
- `public/social/apps/loopsize-share-en.jpg`
- `public/social/apps/loopsize-share-pt-br.jpg`
- `public/social/apps/duotake-share-en.jpg`
- `public/social/apps/duotake-share-pt-br.jpg`

Each image should be:

- `1200x630`.
- JPG.
- Under `300 KB` when possible so WhatsApp previews are more likely to show the image quickly.
- Visually consistent with the current Apple-inspired site style: clean background, system typography feel, soft borders, subtle depth.
- Built around the app icon as the strongest visual element.
- Text-safe with generous margins because social platforms crop differently.
- Composed with:
  - app icon,
  - app name,
  - one short value proposition,
  - three compact facts from the existing `facts` array,
  - small `adrianosouzacosta.com.br` attribution.

Suggested copy:

| App | Locale | Headline | Supporting line | Facts |
| --- | --- | --- | --- | --- |
| KuboRush | en | KuboRush | Casual block puzzle for quick, no-pressure sessions. | iOS, Quick play, Hall of Fame + Weekly Rush |
| KuboRush | pt-br | KuboRush | Quebra-cabeca casual de blocos para partidas rapidas e sem pressao. | iOS, Partidas rapidas, Hall of Fame + Weekly Rush |
| LoopSize | en | LoopSize | Convert ring sizes across BR, US, UK, EU/ISO, JP, CN, and IN. | iPhone, 7 standards, PDF export |
| LoopSize | pt-br | LoopSize | Converta tamanhos de aneis entre BR, US, UK, EU/ISO, JP, CN e IN. | iPhone, 7 padroes, PDF |
| DuoTake | en | DuoTake | Record front and back cameras together for reactions, reviews, and social videos. | iPhone, Dual camera, Reels + Shorts |
| DuoTake | pt-br | DuoTake | Grave cameras frontal e traseira juntas para reacts, reviews e videos sociais. | iPhone, Camera dupla, Reels + Shorts |

Use the existing page language in user-visible strings. Portuguese page titles and descriptions already include accents, so verification code may include those exact strings when it is checking built HTML.

## File Map

- Modify: `src/layouts/Layout.astro`
  - Add typed props for social image size, type, alt text, site name, and Twitter card type.
  - Render `og:image:secure_url`, `og:image:type`, `og:image:alt`, `og:site_name`, and `twitter:image:alt`.
  - Keep defaults so existing non-app pages continue working.

- Modify: `src/components/app/AppTemplate.astro`
  - Add app-level props for `socialImage`, `socialImageAlt`, and optional `socialImageType`.
  - Pass these values through to `Layout`.
  - Keep the existing app icon for the page header and JSON-LD `SoftwareApplication.image`.

- Modify: app pages in `src/pages/apps/*/index.astro` and `src/pages/pt-br/apps/*/index.astro`
  - Add localized `socialImage` and `socialImageAlt` constants.
  - Pass them into `AppTemplate`.

- Create: `public/social/apps/*.jpg`
  - Add the six finalized share-card assets.

- Create: `scripts/verify-social-previews.mjs`
  - Verify generated HTML contains required social metadata.
  - Verify every referenced local social image exists in `dist/social/apps/`.
  - Verify every local social image is no larger than the agreed file-size target.

- Modify: `package.json`
  - Add `verify:social`: `npm run build && node scripts/verify-social-previews.mjs`.

## Task 1: Extend Layout Social Metadata

**Files:**
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Add the new props to `interface Props`**

```ts
interface Props {
    title: string,
    description?: string,
    ogImage?: string,
    ogImageAlt?: string,
    ogImageWidth?: number,
    ogImageHeight?: number,
    ogImageType?: string,
    siteName?: string,
    twitterCard?: "summary" | "summary_large_image",
    favicon?: string,
    lang?: string,
    metas?: { name: string, content: string }[],
    canonicalPath?: string,
    canonicalUrl?: string,
    alternateLocales?: AlternateLocale[],
    jsonLd?: JsonLdValue,
    ogType?: string,
    robots?: string,
}
```

- [ ] **Step 2: Add default values in the props destructuring**

```ts
const {
    title,
    description,
    ogImage = defaultOgImage,
    ogImageAlt,
    ogImageWidth = 1200,
    ogImageHeight = 630,
    ogImageType = "image/jpeg",
    siteName = "Adriano Souza Costa",
    twitterCard = "summary_large_image",
    favicon,
    lang = 'en',
    metas = [],
    canonicalPath,
    canonicalUrl,
    alternateLocales = [],
    jsonLd,
    ogType = 'website',
    robots = 'index, follow',
} = Astro.props;
```

- [ ] **Step 3: Render the additional Open Graph and Twitter tags**

```astro
<meta property="og:image" content={absoluteOgImage} />
<meta property="og:image:secure_url" content={absoluteOgImage} />
<meta property="og:image:type" content={ogImageType} />
<meta property="og:image:width" content={String(ogImageWidth)} />
<meta property="og:image:height" content={String(ogImageHeight)} />
{ogImageAlt && <meta property="og:image:alt" content={ogImageAlt} />}
<meta property="og:site_name" content={siteName} />

<meta name="twitter:card" content={twitterCard} />
<meta name="twitter:title" content={title} />
{description && <meta name="twitter:description" content={description} />}
<meta name="twitter:image" content={absoluteOgImage} />
{ogImageAlt && <meta name="twitter:image:alt" content={ogImageAlt} />}
```

- [ ] **Step 4: Run the build**

Run: `npm run build`

Expected: build completes and existing pages keep their current metadata, now with extra optional tags where values exist.

## Task 2: Add AppTemplate Social Preview Props

**Files:**
- Modify: `src/components/app/AppTemplate.astro`

- [ ] **Step 1: Extend `Props`**

```ts
interface Props {
    appId?: string,
    title: string,
    pageTitle?: string,
    appName?: string,
    favicon: string,
    appIcon: string,
    socialImage?: string,
    socialImageAlt?: string,
    socialImageType?: string,
    description: string,
    screenshots: AppScreenshot[],
    faq: { question: string, answer: string }[],
    metas: { name: string, content: string }[],
    lang?: string,
    applicationCategory?: string,
    features?: AppFeature[],
    useCases?: AppUseCase[],
    facts?: AppFact[],
    testimonials?: AppTestimonial[],
    video?: AppVideo,
    primaryKeyword?: string,
    secondaryKeywords?: string[],
}
```

- [ ] **Step 2: Destructure the new props**

```ts
const {
    appId,
    title,
    pageTitle,
    appName,
    metas,
    favicon,
    appIcon,
    socialImage,
    socialImageAlt,
    socialImageType = "image/jpeg",
    description,
    screenshots,
    faq,
    lang,
    applicationCategory = "MobileApplication",
    features = [],
    useCases = [],
    facts = [],
    testimonials = [],
    video,
    primaryKeyword,
    secondaryKeywords = [],
} = Astro.props;
```

- [ ] **Step 3: Pass the social preview image to `Layout`**

```astro
<Layout
    title={pageTitle ?? title}
    favicon={favicon}
    description={description}
    metas={metas}
    lang={lang}
    canonicalPath={currentPath}
    alternateLocales={getAppAlternates(currentPath)}
    ogImage={socialImage ?? `${appAssetBaseUrl}${appIcon}`}
    ogImageAlt={socialImageAlt ?? `${structuredAppName} app icon`}
    ogImageWidth={1200}
    ogImageHeight={630}
    ogImageType={socialImageType}
    jsonLd={[appJsonLd, breadcrumbJson, ...(videoJsonLd ? [videoJsonLd] : [])]}
>
```

- [ ] **Step 4: Run the build**

Run: `npm run build`

Expected: app pages still build with the old icon fallback before individual pages receive `socialImage`.

## Task 3: Add Localized Social Images To App Pages

**Files:**
- Modify: `src/pages/apps/kuborush/index.astro`
- Modify: `src/pages/pt-br/apps/kuborush/index.astro`
- Modify: `src/pages/apps/loopsize/index.astro`
- Modify: `src/pages/pt-br/apps/loopsize/index.astro`
- Modify: `src/pages/apps/duotake/index.astro`
- Modify: `src/pages/pt-br/apps/duotake/index.astro`

- [ ] **Step 1: Add constants to each English page**

Example for KuboRush:

```ts
const socialImage = "/social/apps/kuborush-share-en.jpg";
const socialImageAlt = "KuboRush app icon with block puzzle app summary.";
```

- [ ] **Step 2: Add constants to each Portuguese page**

Example for KuboRush:

```ts
const socialImage = "/social/apps/kuborush-share-pt-br.jpg";
const socialImageAlt = "Icone do app KuboRush com resumo do jogo de blocos.";
```

- [ ] **Step 3: Pass the constants into `AppTemplate`**

```astro
<AppTemplate
    appId={appId}
    title={title}
    pageTitle={pageTitle}
    metas={metas}
    favicon={favicon}
    appIcon={appIcon}
    socialImage={socialImage}
    socialImageAlt={socialImageAlt}
    description={description}
    screenshots={screenshots}
    faq={faq}
    facts={facts}
    features={features}
    useCases={useCases}
    primaryKeyword={primaryKeyword}
    secondaryKeywords={secondaryKeywords}
    lang="en"
    applicationCategory="GameApplication"
/>
```

- [ ] **Step 4: Repeat for LoopSize and DuoTake**

Use the same prop names and route-specific localized image names.

- [ ] **Step 5: Run the build**

Run: `npm run build`

Expected: build completes, but social image files may still be missing until Task 4 creates them.

## Task 4: Create The Social Preview Images

**Files:**
- Create: `public/social/apps/kuborush-share-en.jpg`
- Create: `public/social/apps/kuborush-share-pt-br.jpg`
- Create: `public/social/apps/loopsize-share-en.jpg`
- Create: `public/social/apps/loopsize-share-pt-br.jpg`
- Create: `public/social/apps/duotake-share-en.jpg`
- Create: `public/social/apps/duotake-share-pt-br.jpg`

- [ ] **Step 1: Create the directory**

Run: `mkdir -p public/social/apps`

Expected: `public/social/apps` exists.

- [ ] **Step 2: Produce six `1200x630` JPGs**

Each image should follow the design standard above. Prefer using the actual app icon from the existing R2 assets as the main visual.

- [ ] **Step 3: Compress every JPG**

Target: each file should be less than `300 KB` where the visual quality remains acceptable.

Run:

```bash
ls -lh public/social/apps/*.jpg
```

Expected: six files are present, each at `1200x630`, and preferably each file is less than `300 KB`.

- [ ] **Step 4: Build and confirm Astro copies the assets**

Run: `npm run build`

Expected:

```text
dist/social/apps/kuborush-share-en.jpg
dist/social/apps/kuborush-share-pt-br.jpg
dist/social/apps/loopsize-share-en.jpg
dist/social/apps/loopsize-share-pt-br.jpg
dist/social/apps/duotake-share-en.jpg
dist/social/apps/duotake-share-pt-br.jpg
```

## Task 5: Add Automated Social Metadata Verification

**Files:**
- Create: `scripts/verify-social-previews.mjs`
- Modify: `package.json`

- [ ] **Step 1: Create `scripts/verify-social-previews.mjs`**

```js
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const distDir = "dist";
const maxImageBytes = 300 * 1024;

const pages = [
    {
        html: "apps/kuborush/index.html",
        image: "/social/apps/kuborush-share-en.jpg",
        title: "KuboRush | Block Puzzle Game for iOS",
    },
    {
        html: "pt-br/apps/kuborush/index.html",
        image: "/social/apps/kuborush-share-pt-br.jpg",
        title: "KuboRush | Jogo de Quebra-Cabeça de Blocos para iOS",
    },
    {
        html: "apps/loopsize/index.html",
        image: "/social/apps/loopsize-share-en.jpg",
        title: "LoopSize | Ring Size Converter for iPhone",
    },
    {
        html: "pt-br/apps/loopsize/index.html",
        image: "/social/apps/loopsize-share-pt-br.jpg",
        title: "LoopSize | Conversor de Tamanho de Anéis para iPhone",
    },
    {
        html: "apps/duotake/index.html",
        image: "/social/apps/duotake-share-en.jpg",
        title: "DuoTake: Dual Camera",
    },
    {
        html: "pt-br/apps/duotake/index.html",
        image: "/social/apps/duotake-share-pt-br.jpg",
        title: "DuoTake: Câmera dupla",
    },
];

const requiredFragments = (page) => [
    `<meta property="og:title" content="${page.title}">`,
    `<meta property="og:image" content="https://adrianosouzacosta.com.br${page.image}">`,
    `<meta property="og:image:secure_url" content="https://adrianosouzacosta.com.br${page.image}">`,
    `<meta property="og:image:type" content="image/jpeg">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt"`,
    `<meta property="og:site_name" content="Adriano Souza Costa">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:image" content="https://adrianosouzacosta.com.br${page.image}">`,
    `<meta name="twitter:image:alt"`,
];

const failures = [];

for (const page of pages) {
    const htmlPath = join(distDir, page.html);
    if (!existsSync(htmlPath)) {
        failures.push(`Missing built page: ${htmlPath}`);
        continue;
    }

    const html = readFileSync(htmlPath, "utf8");
    for (const fragment of requiredFragments(page)) {
        if (!html.includes(fragment)) {
            failures.push(`Missing fragment in ${htmlPath}: ${fragment}`);
        }
    }

    const imagePath = join(distDir, page.image);
    if (!existsSync(imagePath)) {
        failures.push(`Missing social image: ${imagePath}`);
        continue;
    }

    const size = statSync(imagePath).size;
    if (size > maxImageBytes) {
        failures.push(`Social image is larger than 300 KB: ${imagePath} (${size} bytes)`);
    }
}

if (failures.length > 0) {
    console.error(failures.join("\n"));
    process.exit(1);
}

console.log(`Verified ${pages.length} app social previews.`);
```

- [ ] **Step 2: Add the package script**

```json
"verify:social": "npm run build && node scripts/verify-social-previews.mjs"
```

- [ ] **Step 3: Run verification**

Run: `npm run verify:social`

Expected:

```text
Verified 6 app social previews.
```

## Task 6: Manual Preview QA After Deploy

**Files:**
- No code files.

- [ ] **Step 1: Deploy through the existing GitHub Pages workflow**

Expected: each app page is live at `https://adrianosouzacosta.com.br/...`.

- [ ] **Step 2: Validate X/Twitter cards**

Use the X Card Validator or share a draft/private post with:

```text
https://adrianosouzacosta.com.br/apps/kuborush/
https://adrianosouzacosta.com.br/apps/loopsize/
https://adrianosouzacosta.com.br/apps/duotake/
```

Expected: each preview uses the wide social image, app title, and app description.

- [ ] **Step 3: Validate WhatsApp**

Paste each English and Portuguese app URL into a WhatsApp chat.

Expected: each preview shows the social image, title, and description. If WhatsApp shows an old preview, use a never-shared cache-busting URL once for validation, such as:

```text
https://adrianosouzacosta.com.br/apps/kuborush/?preview=v1
```

- [ ] **Step 4: Validate Facebook/LinkedIn/Slack**

Use each platform preview/debugger where available.

Expected: preview image is not cropped awkwardly and localized URLs show localized title/description.

## Completion Criteria

- All six app routes have localized Open Graph and Twitter metadata.
- All six app routes use a dedicated `1200x630` JPG, not the square icon alone.
- The app icon is prominent inside each preview image.
- Basic app information is visible either in the metadata text or inside the image itself.
- `npm run verify:social` passes.
- `npm run build` passes.
- Live URLs show the intended preview in X/Twitter and WhatsApp after crawler cache refresh.

## Reference Notes

- Open Graph basic metadata expects `og:title`, `og:type`, `og:image`, and `og:url`; `og:image:alt` is recommended when `og:image` exists.
- X Summary Large Image cards use `twitter:card=summary_large_image`, a concise title, description, image URL, and optional alt text. X supports JPG, PNG, WEBP, and GIF for card images, but SVG is not supported.
