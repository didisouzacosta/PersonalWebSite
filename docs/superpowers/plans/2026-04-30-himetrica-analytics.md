# Himetrica Analytics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrar Himetrica como camada de analytics client-side, com page views claros, eventos para todas as interacoes relevantes e uma abstracao trocavel para futuras ferramentas.

**Architecture:** O script oficial da Himetrica continua carregando no browser via `src/layouts/Layout.astro`. A aplicacao passa a falar somente com uma abstracao em `src/core/analytics.ts`, que conhece o provider atual (`window.himetrica`) e expoe funcoes sem acoplar componentes ao vendor. Um componente `src/components/Analytics.astro` injeta contexto da pagina e inicializa listeners globais de clique/toggle no cliente.

**Tech Stack:** Astro 6, TypeScript, scripts client-side nativos, Himetrica Web Tracker via `<script defer src="https://cdn.himetrica.com/tracker.js">`.

---

## Documentacao Base

- Himetrica Web Tracker: `https://www.himetrica.com/docs/web`
- Usar script `defer` no `<head>` ou antes de `</body>`.
- Eventos customizados: `window.himetrica.track('event_name', { key: 'value' })`.
- Identificacao: `window.himetrica.identify({ userId?, name?, email?, ...metadata })`.
- Page views: o tracker detecta automaticamente, mas tambem permite page views manuais via `himetrica.pageview(...)` e referencia `trackPageView(path?)`.
- Privacidade: manter nomes de propriedades consistentes e evitar dados sensiveis.

## Arquivos e Responsabilidades

- Modify: `src/layouts/Layout.astro`
  - Manter o tracker Himetrica no `<head>`.
  - Renderizar `Analytics.astro` em todas as paginas HTML.
  - Adicionar atributos de analytics em navegacao principal e footer.

- Create: `src/components/Analytics.astro`
  - Receber contexto estatico da pagina a partir do layout.
  - Serializar `window.__SITE_ANALYTICS_CONTEXT__`.
  - Inicializar a abstracao client-side uma unica vez no browser.

- Create: `src/core/analytics.ts`
  - Definir contrato `AnalyticsProvider`.
  - Implementar adapter `HimetricaAnalyticsProvider`.
  - Expor `trackAnalyticsEvent`, `trackPageAccess`, `identifyAnalyticsUser`, `resetAnalytics`, `initializeAnalytics`.
  - Delegar cliques/toggles globais para capturar interacoes sem duplicar listeners por componente.

- Create: `src/core/analyticsContext.ts`
  - Criar contexto de pagina a partir de `pathname`, `title`, `lang` e `canonical`.
  - Classificar paginas como `home`, `resume`, `app`, `app_legal`, `legal`, `system`.
  - Extrair `project_slug` para rotas como `/apps/kuborush/` e `/pt-br/apps/kuborush/`.

- Modify: `src/components/Controls.astro`
  - Trackear `theme_changed`.
  - Trackear `language_changed`.

- Modify: `src/components/resume/Resume.astro`
  - Transformar o botao de curriculo em link de download usando `resume.download.url`.
  - Trackear `resume_download_clicked`.
  - Trackear contatos, certificados e projetos clicados.

- Modify: `src/components/resume/AboutMe.astro`
  - Trackear CTA de curriculo, links sociais, links de projetos e a primeira interacao com a orbita visual.

- Modify: `src/components/app/AppTemplate.astro`
  - Trackear download na App Store.
  - Trackear abertura/fechamento de screenshots.
  - Trackear links legais de apps.

- Modify: `src/components/FaqAccordion.astro`
  - Trackear abertura/fechamento de FAQs.

- Create: `scripts/verify-analytics.mjs`
  - Verificar build estatico: todos os HTMLs possuem o script Himetrica e assets gerados contem nomes de eventos esperados.

- Modify: `package.json`
  - Adicionar script `"verify:analytics": "npm run build && node scripts/verify-analytics.mjs"`.

---

## Event Contract

Todos os eventos devem passar por `trackAnalyticsEvent(name, props)` e receber automaticamente:

```ts
{
    page_path: window.location.pathname,
    page_title: document.title,
    page_type: context.pageType,
    page_language: context.lang,
    project_slug: context.projectSlug,
    timestamp: new Date().toISOString()
}
```

Propriedades permitidas seguem a documentacao da Himetrica: strings, numbers e booleans. Arrays/objetos devem ser serializados para string curta quando necessario.

### Eventos Obrigatorios

```ts
type AnalyticsEventName =
    | "page_accessed"
    | "navigation_clicked"
    | "theme_changed"
    | "language_changed"
    | "resume_download_clicked"
    | "resume_contact_clicked"
    | "certificate_clicked"
    | "project_opened"
    | "social_link_clicked"
    | "app_store_clicked"
    | "app_legal_link_clicked"
    | "screenshot_opened"
    | "screenshot_closed"
    | "faq_toggled"
    | "hero_orbit_interacted"
    | "internal_link_clicked"
    | "external_link_clicked"
    | "control_clicked";
```

### Page Access

Cada HTML renderizado deve disparar:

```ts
trackPageAccess({
    source: "analytics_initializer"
});
```

Para KuboRush, por exemplo:

```ts
{
    event: "page_accessed",
    page_path: "/apps/kuborush/",
    page_type: "app",
    project_slug: "kuborush",
    page_language: "en"
}
```

Para `/pt-br/apps/kuborush/`:

```ts
{
    event: "page_accessed",
    page_path: "/pt-br/apps/kuborush/",
    page_type: "app",
    project_slug: "kuborush",
    page_language: "pt-BR"
}
```

---

## Task 1: Criar Contexto de Pagina

**Files:**
- Create: `src/core/analyticsContext.ts`

- [ ] **Step 1: Criar o arquivo com tipos e classificacao de rotas**

```ts
export type AnalyticsPageType =
    | "home"
    | "resume"
    | "app"
    | "app_legal"
    | "legal"
    | "system";

export interface AnalyticsPageContext {
    path: string;
    canonical: string;
    title: string;
    lang: "en" | "pt-BR";
    pageType: AnalyticsPageType;
    projectSlug?: string;
}

interface CreateAnalyticsPageContextInput {
    path: string;
    canonical: string;
    title: string;
    lang: string;
}

const normalizePath = (path: string) => {
    if (!path || path === "/") return "/";
    return path.endsWith("/") ? path : `${path}/`;
};

const extractProjectSlug = (path: string) => {
    const match = normalizePath(path).match(/^\/(?:pt-br\/)?apps\/([^/]+)\//);
    return match?.[1];
};

const getPageType = (path: string): AnalyticsPageType => {
    const normalizedPath = normalizePath(path);

    if (normalizedPath === "/" || normalizedPath === "/pt-br/") return "home";
    if (normalizedPath === "/resume/" || normalizedPath === "/resume/pt-br/") return "resume";
    if (/^\/(?:pt-br\/)?apps\/[^/]+\/(?:terms-of-use|privacy-policy)\/$/.test(normalizedPath)) return "app_legal";
    if (/^\/(?:pt-br\/)?apps\/[^/]+\/$/.test(normalizedPath)) return "app";
    if (normalizedPath.endsWith("/terms-of-use/") || normalizedPath.endsWith("/privacy-policy/")) return "legal";

    return "system";
};

export function createAnalyticsPageContext(input: CreateAnalyticsPageContextInput): AnalyticsPageContext {
    const path = normalizePath(input.path);
    const lang = input.lang === "pt-br" || input.lang === "pt-BR" ? "pt-BR" : "en";

    return {
        path,
        canonical: input.canonical,
        title: input.title,
        lang,
        pageType: getPageType(path),
        projectSlug: extractProjectSlug(path),
    };
}
```

- [ ] **Step 2: Verificar classificacao manualmente**

Run:

```bash
npm run build
```

Expected: `astro build` termina com exit code `0`.

---

## Task 2: Criar Abstracao Client-Side de Analytics

**Files:**
- Create: `src/core/analytics.ts`

- [ ] **Step 1: Criar contrato e adapter Himetrica**

```ts
import type { AnalyticsPageContext } from "./analyticsContext";

type Primitive = string | number | boolean | undefined;
export type AnalyticsProperties = Record<string, Primitive>;

export interface AnalyticsIdentifyPayload {
    userId?: string;
    name?: string;
    email?: string;
    [key: string]: Primitive;
}

interface HimetricaGlobal {
    track?: (name: string, props?: AnalyticsProperties) => void;
    identify?: (payload: AnalyticsIdentifyPayload) => void;
    pageview?: (props?: { title?: string; path?: string; referrer?: string }) => void;
    trackPageView?: (path?: string) => void;
    getVisitorId?: () => string | undefined;
    reset?: () => void;
    flush?: () => void;
}

declare global {
    interface Window {
        himetrica?: HimetricaGlobal;
        __SITE_ANALYTICS_CONTEXT__?: AnalyticsPageContext;
        __SITE_ANALYTICS_INITIALIZED__?: boolean;
    }
}

const pendingEvents: Array<{ name: string; props: AnalyticsProperties }> = [];

const getContext = () => window.__SITE_ANALYTICS_CONTEXT__;

const getBaseProperties = (): AnalyticsProperties => {
    const context = getContext();

    return {
        page_path: window.location.pathname,
        page_title: document.title,
        page_type: context?.pageType,
        page_language: context?.lang,
        project_slug: context?.projectSlug,
        timestamp: new Date().toISOString(),
    };
};

const getProvider = () => window.himetrica;

const sendPendingEvents = () => {
    const provider = getProvider();
    if (!provider?.track) return;

    while (pendingEvents.length > 0) {
        const event = pendingEvents.shift();
        if (event) provider.track(event.name, event.props);
    }
};

export function trackAnalyticsEvent(name: string, props: AnalyticsProperties = {}) {
    if (typeof window === "undefined") return;

    const eventProps = {
        ...getBaseProperties(),
        ...props,
    };

    const provider = getProvider();

    if (provider?.track) {
        provider.track(name, eventProps);
        return;
    }

    pendingEvents.push({ name, props: eventProps });
    window.setTimeout(sendPendingEvents, 250);
}

export function trackPageAccess(props: AnalyticsProperties = {}) {
    if (typeof window === "undefined") return;

    const context = getContext();
    const provider = getProvider();

    if (provider?.trackPageView) {
        provider.trackPageView(context?.path ?? window.location.pathname);
    } else if (provider?.pageview) {
        provider.pageview({
            title: context?.title ?? document.title,
            path: context?.path ?? window.location.pathname,
            referrer: document.referrer,
        });
    }

    trackAnalyticsEvent("page_accessed", {
        canonical: context?.canonical,
        source: "analytics_initializer",
        referrer: document.referrer,
        ...props,
    });
}

export function identifyAnalyticsUser(payload: AnalyticsIdentifyPayload) {
    if (typeof window === "undefined") return;
    getProvider()?.identify?.(payload);
}

export function resetAnalytics() {
    if (typeof window === "undefined") return;
    getProvider()?.reset?.();
}
```

- [ ] **Step 2: Adicionar tracking global de cliques**

Append no mesmo arquivo:

```ts
const getText = (element: Element) => (element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 120);

const getDefaultClickEvent = (element: HTMLElement) => {
    if (element instanceof HTMLAnchorElement) {
        const url = new URL(element.href, window.location.href);
        return url.origin === window.location.origin ? "internal_link_clicked" : "external_link_clicked";
    }

    return "control_clicked";
};

const getClickProperties = (element: HTMLElement): AnalyticsProperties => {
    const anchor = element instanceof HTMLAnchorElement ? element : element.closest("a");

    return {
        label: element.dataset.analyticsLabel || element.getAttribute("aria-label") || getText(element),
        location: element.dataset.analyticsLocation,
        href: anchor?.href,
        target: anchor?.target,
        project_slug: element.dataset.analyticsProject || getContext()?.projectSlug,
    };
};

const setupGlobalClickTracking = () => {
    document.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;

        const element = target.closest<HTMLElement>("a, button, summary, [role='button'], [data-analytics-event]");
        if (!element || element.dataset.analyticsIgnore === "true") return;

        const eventName = element.dataset.analyticsEvent || getDefaultClickEvent(element);
        trackAnalyticsEvent(eventName, getClickProperties(element));
    });
};

export function initializeAnalytics() {
    if (typeof window === "undefined") return;
    if (window.__SITE_ANALYTICS_INITIALIZED__) return;

    window.__SITE_ANALYTICS_INITIALIZED__ = true;
    setupGlobalClickTracking();

    window.addEventListener("load", sendPendingEvents, { once: true });
    trackPageAccess();
}
```

- [ ] **Step 3: Rodar build**

Run:

```bash
npm run build
```

Expected: `astro build` termina com exit code `0`.

---

## Task 3: Criar Componente Analytics e Ligar no Layout

**Files:**
- Create: `src/components/Analytics.astro`
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Criar `src/components/Analytics.astro`**

```astro
---
import type { AnalyticsPageContext } from "../core/analyticsContext";

interface Props {
    context: AnalyticsPageContext;
}

const { context } = Astro.props;
---

<script
    defer
    src="https://cdn.himetrica.com/tracker.js"
    data-api-key="hm_9af92516047479ef85a412f32cb9fcee4d1e48b236e72a65"
></script>

<script is:inline set:html={`window.__SITE_ANALYTICS_CONTEXT__ = ${JSON.stringify(context)};`} />

<script>
    import { initializeAnalytics } from "../core/analytics";

    initializeAnalytics();
</script>
```

- [ ] **Step 2: Atualizar `src/layouts/Layout.astro`**

No frontmatter, adicionar imports:

```astro
import Analytics from '../components/Analytics.astro';
import { createAnalyticsPageContext } from '../core/analyticsContext';
```

Depois de `const canonical = ...`, adicionar:

```ts
const analyticsContext = createAnalyticsPageContext({
    path: currentPath,
    canonical,
    title,
    lang,
});
```

Substituir o script Himetrica atual por:

```astro
<Analytics context={analyticsContext} />
```

- [ ] **Step 3: Adicionar atributos na navegacao do layout**

Em links de `navigationItems.map`, adicionar:

```astro
data-analytics-event="navigation_clicked"
data-analytics-location="site-header"
data-analytics-label={item.label}
```

Em links de `footerLinks.map`, adicionar:

```astro
data-analytics-event="social_link_clicked"
data-analytics-location="site-footer"
data-analytics-label={link.label}
```

- [ ] **Step 4: Rodar build**

Run:

```bash
npm run build
```

Expected: `astro build` termina com exit code `0`.

---

## Task 4: Trackear Tema e Idioma

**Files:**
- Modify: `src/components/Controls.astro`

- [ ] **Step 1: Importar tracking no script client-side**

Substituir o script final por:

```astro
<script>
    import { trackAnalyticsEvent } from "../core/analytics";

    const themeBtn = document.getElementById('theme-toggle');
    const languageLink = document.querySelector<HTMLAnchorElement>('[data-analytics-event="language_changed"]');

    function applyTheme(theme: string) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    themeBtn?.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';

        applyTheme(next);
        trackAnalyticsEvent('theme_changed', {
            from_theme: current,
            to_theme: next,
            location: 'site-controls',
        });
    });

    languageLink?.addEventListener('click', () => {
        trackAnalyticsEvent('language_changed', {
            from_language: languageLink.dataset.analyticsFromLanguage,
            to_language: languageLink.dataset.analyticsToLanguage,
            href: languageLink.href,
            location: 'site-controls',
        });
    });
</script>
```

- [ ] **Step 2: Marcar botao de tema como ignorado pelo click tracker generico**

No `<button id="theme-toggle"...>`, adicionar:

```astro
data-analytics-ignore="true"
```

- [ ] **Step 3: Marcar link de idioma**

No `<a href={altLangUrl}...>`, adicionar:

```astro
data-analytics-event="language_changed"
data-analytics-ignore="true"
data-analytics-from-language={isPtBr ? 'pt-BR' : 'en'}
data-analytics-to-language={isPtBr ? 'en' : 'pt-BR'}
data-analytics-location="site-controls"
data-analytics-label={altLangLabel}
```

- [ ] **Step 4: Rodar build**

Run:

```bash
npm run build
```

Expected: `astro build` termina com exit code `0`.

---

## Task 5: Trackear Curriculo, Contatos e Projetos

**Files:**
- Modify: `src/components/resume/Resume.astro`
- Modify: `src/components/resume/AboutMe.astro`

- [ ] **Step 1: Converter botao de curriculo em download real**

Em `Resume.astro`, trocar:

```astro
<button onclick="window.print()" class="download-button no-print">
    {resume.download.label}
</button>
```

por:

```astro
<a
    href={resume.download.url}
    class="download-button no-print"
    target="_blank"
    rel="noopener noreferrer"
    data-analytics-event="resume_download_clicked"
    data-analytics-location="resume-page"
    data-analytics-label={resume.download.label}
>
    {resume.download.label}
</a>
```

- [ ] **Step 2: Marcar contatos do curriculo**

Em `resume.contacts.map`, trocar o link por:

```astro
<a
    href={contact.url}
    data-analytics-event="resume_contact_clicked"
    data-analytics-location="resume-contact"
    data-analytics-label={contact.label}
>
    {contact.description}
</a>
```

- [ ] **Step 3: Marcar certificados**

Em `resume.certificates.items.map`, adicionar no link:

```astro
data-analytics-event="certificate_clicked"
data-analytics-location="resume-certificates"
data-analytics-label={certificate.title}
```

- [ ] **Step 4: Marcar projetos do curriculo**

Em `resume.projects.items.map`, adicionar no link:

```astro
data-analytics-event="project_opened"
data-analytics-location="resume-projects"
data-analytics-label={project.title}
data-analytics-project={project.title.toLowerCase().replace(/\s+/g, '-')}
```

- [ ] **Step 5: Marcar CTA e links sociais da homepage**

Em `AboutMe.astro`, no CTA de curriculo:

```astro
data-analytics-event="navigation_clicked"
data-analytics-location="home-hero"
data-analytics-label={content.resumeLabel}
```

Nos links sociais, adicionar:

```astro
data-analytics-event="social_link_clicked"
data-analytics-location="home-hero"
data-analytics-label="GitHub"
```

ajustando o label para `X`, `GitHub` e `LinkedIn`.

- [ ] **Step 6: Marcar links de apps na orbita**

No link `.hero-app-link`, adicionar:

```astro
data-analytics-event="project_opened"
data-analytics-location="home-hero-orbit"
data-analytics-label={app.name}
data-analytics-project={app.slug}
```

- [ ] **Step 7: Trackear primeira interacao com a orbita**

No script de `AboutMe.astro`, importar:

```ts
import { trackAnalyticsEvent } from "../core/analytics";
```

Antes de `appIconStages.forEach`, adicionar:

```ts
let hasTrackedOrbitInteraction = false;
```

Dentro do listener `pointermove`, antes de calcular `rect`, adicionar:

```ts
if (!hasTrackedOrbitInteraction) {
    hasTrackedOrbitInteraction = true;
    trackAnalyticsEvent("hero_orbit_interacted", {
        interaction: "pointermove",
        location: "home-hero-orbit",
    });
}
```

- [ ] **Step 8: Rodar build**

Run:

```bash
npm run build
```

Expected: `astro build` termina com exit code `0`.

---

## Task 6: Trackear Paginas de Apps, App Store, Screenshots e FAQ

**Files:**
- Modify: `src/components/app/AppTemplate.astro`
- Modify: `src/components/FaqAccordion.astro`

- [ ] **Step 1: Marcar download na App Store**

No link App Store em `AppTemplate.astro`, adicionar:

```astro
data-analytics-event="app_store_clicked"
data-analytics-location="app-header"
data-analytics-label={structuredAppName}
data-analytics-project={structuredAppName.toLowerCase()}
```

- [ ] **Step 2: Marcar imagens de screenshots**

No `<img>` de screenshots, adicionar:

```astro
data-analytics-event="screenshot_opened"
data-analytics-location="app-screenshots"
data-analytics-label={screenshot.alt}
data-analytics-project={structuredAppName.toLowerCase()}
```

- [ ] **Step 3: Importar tracking no script do lightbox**

Substituir o script final de `AppTemplate.astro` por:

```astro
<script>
    import { trackAnalyticsEvent } from "../../core/analytics";

    const dialog = document.getElementById('screenshot-lightbox') as HTMLDialogElement;
    const lightboxImg = document.getElementById('lightbox-img') as HTMLImageElement;
    const closeBtn = document.getElementById('lightbox-close');

    document.querySelectorAll('.screenshots figure img').forEach(img => {
        img.addEventListener('click', () => {
            const image = img as HTMLImageElement;
            lightboxImg.src = image.src;
            lightboxImg.alt = image.alt;
            dialog.showModal();

            trackAnalyticsEvent("screenshot_opened", {
                label: image.alt,
                location: "app-screenshots",
            });
        });
    });

    const closeLightbox = (source: string) => {
        dialog.close();
        trackAnalyticsEvent("screenshot_closed", {
            source,
            location: "app-screenshots",
        });
    };

    closeBtn?.addEventListener('click', () => closeLightbox("close-button"));

    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) closeLightbox("backdrop");
    });
</script>
```

Marcar as screenshots com `data-analytics-ignore="true"` para nao duplicar o evento global.

- [ ] **Step 4: Marcar links legais de apps**

Nos links de `Terms of use` e `Privacy policy`, adicionar:

```astro
data-analytics-event="app_legal_link_clicked"
data-analytics-location="app-footer"
```

- [ ] **Step 5: Trackear FAQ**

Em `FaqAccordion.astro`, adicionar atributos:

```astro
<details
    class="faq-item"
    data-analytics-faq
    data-analytics-label={item.question}
    {...{ open: i === 0 }}
>
```

Adicionar script ao fim:

```astro
<script>
    import { trackAnalyticsEvent } from "../core/analytics";

    document.querySelectorAll<HTMLDetailsElement>("[data-analytics-faq]").forEach((details) => {
        details.addEventListener("toggle", () => {
            trackAnalyticsEvent("faq_toggled", {
                label: details.dataset.analyticsLabel,
                state: details.open ? "opened" : "closed",
                location: "app-faq",
            });
        });
    });
</script>
```

- [ ] **Step 6: Rodar build**

Run:

```bash
npm run build
```

Expected: `astro build` termina com exit code `0`.

---

## Task 7: Criar Verificacao Automatizada de Analytics

**Files:**
- Create: `scripts/verify-analytics.mjs`
- Modify: `package.json`

- [ ] **Step 1: Criar `scripts/verify-analytics.mjs`**

```js
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const distDir = "dist";
const expectedEvents = [
    "page_accessed",
    "navigation_clicked",
    "theme_changed",
    "language_changed",
    "resume_download_clicked",
    "project_opened",
    "social_link_clicked",
    "app_store_clicked",
    "screenshot_opened",
    "faq_toggled",
];

const walk = (dir, matcher, files = []) => {
    for (const entry of readdirSync(dir)) {
        const path = join(dir, entry);
        if (statSync(path).isDirectory()) {
            walk(path, matcher, files);
        } else if (matcher(path)) {
            files.push(path);
        }
    }
    return files;
};

const htmlFiles = walk(distDir, (path) => path.endsWith(".html"));
const assetFiles = walk(distDir, (path) => path.endsWith(".js") || path.endsWith(".html"));

const missingTracker = htmlFiles.filter((file) => {
    const html = readFileSync(file, "utf8");
    return !html.includes("https://cdn.himetrica.com/tracker.js");
});

if (missingTracker.length > 0) {
    console.error("Missing Himetrica tracker in:");
    missingTracker.forEach((file) => console.error(`- ${file}`));
    process.exit(1);
}

const bundledText = assetFiles.map((file) => readFileSync(file, "utf8")).join("\n");
const missingEvents = expectedEvents.filter((eventName) => !bundledText.includes(eventName));

if (missingEvents.length > 0) {
    console.error("Missing expected analytics event names:");
    missingEvents.forEach((eventName) => console.error(`- ${eventName}`));
    process.exit(1);
}

console.log(`Analytics verification passed for ${htmlFiles.length} HTML files.`);
```

- [ ] **Step 2: Adicionar script no `package.json`**

Adicionar em `scripts`:

```json
"verify:analytics": "npm run build && node scripts/verify-analytics.mjs"
```

- [ ] **Step 3: Rodar verificacao**

Run:

```bash
npm run verify:analytics
```

Expected:

```text
Analytics verification passed for 16 HTML files.
```

---

## Task 8: QA Manual no Browser

**Files:**
- No source files unless bugs are found.

- [ ] **Step 1: Subir servidor local**

Run:

```bash
npm run dev
```

Expected: Astro dev server em `localhost:4321`.

- [ ] **Step 2: Validar page access**

Abrir:

```text
http://localhost:4321/
http://localhost:4321/pt-br/
http://localhost:4321/apps/kuborush/
http://localhost:4321/pt-br/apps/kuborush/
http://localhost:4321/resume/
```

Expected: cada pagina dispara `page_accessed` com `page_type`, `page_language` e `project_slug` correto quando aplicavel.

- [ ] **Step 3: Validar interacoes principais**

Executar no browser:

```js
window.himetrica.track = (name, props) => console.log("[analytics]", name, props);
```

Clicar:

- Toggle light/dark: expected `theme_changed`.
- Toggle EN/PT: expected `language_changed`.
- Link Resume/Curriculo na homepage: expected `navigation_clicked`.
- Download do curriculo: expected `resume_download_clicked`.
- Link de projeto KuboRush na homepage/resume: expected `project_opened`.
- App Store em KuboRush: expected `app_store_clicked`.
- Screenshot de app: expected `screenshot_opened` e depois `screenshot_closed`.
- FAQ: expected `faq_toggled`.

- [ ] **Step 4: Validar que nao existe chamada server-side**

Run:

```bash
rg -n "himetrica\\.(track|identify|pageview|trackPageView)|window\\.himetrica" src
```

Expected: chamadas diretas ao vendor aparecem somente em `src/core/analytics.ts`; componentes usam `trackAnalyticsEvent` ou atributos `data-analytics-*`.

---

## Commit Plan

- [ ] Commit 1: `feat: add analytics abstraction`
  - `src/core/analytics.ts`
  - `src/core/analyticsContext.ts`
  - `src/components/Analytics.astro`
  - `src/layouts/Layout.astro`

- [ ] Commit 2: `feat: track site interactions`
  - `src/components/Controls.astro`
  - `src/components/resume/Resume.astro`
  - `src/components/resume/AboutMe.astro`
  - `src/components/app/AppTemplate.astro`
  - `src/components/FaqAccordion.astro`

- [ ] Commit 3: `test: verify analytics instrumentation`
  - `scripts/verify-analytics.mjs`
  - `package.json`

## Self-Review

- Spec coverage:
  - Todas as interacoes deliberadas: cobertas por listener global e eventos especificos.
  - Light/dark mode: `theme_changed`.
  - Download do curriculo: `resume_download_clicked`.
  - Acesso claro a paginas: `page_accessed` com `page_type` e `project_slug`, incluindo KuboRush.
  - Abstracao trocavel: componentes dependem de `src/core/analytics.ts`, nao de `window.himetrica`.
  - Documentacao Himetrica: usa script client-side, `track`, `identify`, page view manual e evita dados sensiveis.

- Placeholder scan:
  - Nao ha marcadores pendentes nem instrucoes genericas sem snippet.
  - Cada alteracao principal tem caminho, snippet e comando de verificacao.

- Riscos e decisoes:
  - Nao trackear todo `pointermove` continuamente; trackear apenas a primeira interacao da orbita para evitar excesso de eventos.
  - Page view automatico da Himetrica sera complementado por `page_accessed` customizado para segmentacao por projeto.
  - Como o site nao tem login, `identifyAnalyticsUser` fica disponivel na abstracao mas nao sera chamado ate existir fluxo de autenticacao/consentimento.
