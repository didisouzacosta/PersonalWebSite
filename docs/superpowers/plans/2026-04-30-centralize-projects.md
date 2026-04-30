# Centralize Projects Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Centralize portfolio project data so the home and `/resume` project lists are identical, alphabetically ordered, and maintained from one source.

**Architecture:** Move project data and sorting helpers into `src/core/projects.ts`. The home project cards and resume data will consume that module instead of keeping separate hardcoded arrays. Add the `@build-web-apps` project instruction to `AGENTS.md` so future frontend/site work uses the requested plugin.

**Tech Stack:** Astro 5, TypeScript, existing `.astro` components, existing `npm run build` verification.

---

## File Structure

- Modify: `AGENTS.md`
  - Add an explicit instruction to always use `@build-web-apps` for this project.
- Create: `src/core/projects.ts`
  - Own the canonical project list, localized descriptions, image URLs, tags, visibility, external targets, and alphabetical ordering helpers.
- Modify: `src/components/resume/AboutMe.astro`
  - Pass the current homepage language into the project card component.
- Modify: `src/components/resume/Projects.astro`
  - Remove local project data and render the centralized, sorted list.
- Modify: `src/core/resume.tsx`
  - Replace duplicated English and Portuguese `projects.items` arrays with `getResumeProjects("en")` and `getResumeProjects("pt-br")`.

## Expected Behavior

- Home project cards are displayed alphabetically by project name.
- `/resume` and `/resume/pt-br` show the same visible project set as the home project section.
- The resume no longer has project entries that are absent from the home project list, unless those entries are added to the shared source and enabled.
- New projects are added once in `src/core/projects.ts`.
- External links still use `target="_blank"` and `rel="noopener noreferrer"`.
- R2 image URLs remain declared in one shared place.

### Canonical Visible Project Set After This Change

Alphabetical order:

1. CleanerXcode
2. Formidable
3. KuboRush
4. LoopSize
5. VideoEditorKit

`DuoTake` can remain in the shared source with `isEnabled: false`, so it does not appear in either home or resume until enabled. `Uncompress` should be removed from the rendered resume list because it is not currently displayed on the home project list.

---

### Task 1: Document Required Build Web Apps Usage

**Files:**
- Modify: `AGENTS.md`

- [ ] **Step 1: Add the project workflow instruction**

In `AGENTS.md`, under `## Padrões do Projeto`, add this bullet after the architecture bullet:

```markdown
- Sempre utilize `@build-web-apps` para tarefas neste projeto, especialmente alterações de frontend, UI, rotas, componentes, estilos e conteúdo visual.
```

- [ ] **Step 2: Verify the instruction exists**

Run:

```bash
rg -n "@build-web-apps|Sempre utilize" AGENTS.md
```

Expected:

```text
AGENTS.md:<line>:- Sempre utilize `@build-web-apps` para tarefas neste projeto, especialmente alterações de frontend, UI, rotas, componentes, estilos e conteúdo visual.
```

- [ ] **Step 3: Commit**

Run:

```bash
git add AGENTS.md
git commit -m "docs: require build web apps workflow"
```

---

### Task 2: Create the Canonical Project Data Module

**Files:**
- Create: `src/core/projects.ts`

- [ ] **Step 1: Create the shared project module**

Create `src/core/projects.ts` with:

```ts
export type ProjectLanguage = "en" | "pt-br";

export interface PortfolioProject {
    name: string;
    url: string;
    imageUrl: string;
    tags: string[];
    isEnabled: boolean;
    target?: "_blank";
    descriptions: Record<ProjectLanguage, {
        card: string;
        resume: string;
    }>;
}

export interface ProjectCardViewModel {
    name: string;
    description: string;
    tags: string[];
    imageUrl: string;
    url: string;
    target?: "_blank";
}

export interface ResumeProjectViewModel {
    title: string;
    url: string;
    description: string;
}

export const portfolioProjects: PortfolioProject[] = [
    {
        name: "DuoTake",
        url: "/apps/duotake",
        imageUrl:
            "https://pub-81dc0daed73f4a358469301b9b80f493.r2.dev/apps/duotake/app-icon.png",
        tags: ["iOS App", "Free", "Camera"],
        isEnabled: false,
        descriptions: {
            en: {
                card: "Front + back camera for reacts",
                resume: "DuoTake lets you record or take photos with the front and back cameras at the same time, with CropOut for cleaner framing that is ideal for reacts.",
            },
            "pt-br": {
                card: "Camera frontal + traseira para reacts",
                resume: "O DuoTake permite gravar e fotografar com a câmera frontal e traseira ao mesmo tempo, com CropOut para um enquadramento mais limpo e ideal para reacts.",
            },
        },
    },
    {
        name: "KuboRush",
        url: "/apps/kuborush",
        imageUrl:
            "https://pub-81dc0daed73f4a358469301b9b80f493.r2.dev/apps/kuborush/app-icon.png",
        tags: ["iOS App", "Free"],
        isEnabled: true,
        descriptions: {
            en: {
                card: "Block puzzle game",
                resume: "KuboRush is a casual block puzzle game for iOS where you fit pieces, think fast, and clear the board at your own pace. Includes competitive leaderboards and weekly challenges.",
            },
            "pt-br": {
                card: "Jogo puzzle de blocos",
                resume: "KuboRush é um jogo casual de quebra-cabeça de blocos para iOS. Encaixe peças, pense rápido e limpe o tabuleiro no seu ritmo. Inclui ranking global e desafios semanais.",
            },
        },
    },
    {
        name: "LoopSize",
        url: "/apps/loopsize",
        imageUrl:
            "https://pub-81dc0daed73f4a358469301b9b80f493.r2.dev/apps/loopsize/app-icon.png",
        tags: ["iOS App", "Free"],
        isEnabled: true,
        descriptions: {
            en: {
                card: "Ring size converter",
                resume: "LoopSize makes it easy to measure and convert ring sizes in BR, US, UK, EU/ISO, JP, CN & IN. Save, share, and export precise measurements in PDF.",
            },
            "pt-br": {
                card: "Conversor de tamanho de anéis",
                resume: "O LoopSize facilita a medição e a conversão de tamanhos de anéis nos seguintes países: Brasil, EUA, Reino Unido, UE/ISO, Japão, China e Índia. Salve, compartilhe e exporte medidas precisas em PDF.",
            },
        },
    },
    {
        name: "CleanerXcode",
        url: "https://github.com/didisouzacosta/CleanerXcode",
        imageUrl:
            "https://pub-81dc0daed73f4a358469301b9b80f493.r2.dev/apps/cleanerxcode/app-icon.png",
        tags: ["macOS App", "Free"],
        target: "_blank",
        isEnabled: true,
        descriptions: {
            en: {
                card: "Xcode cache cleaner",
                resume: "CleanerXcode is a macOS tool designed to remove unnecessary Xcode files, such as Derived Data, build caches, device support files and simulator data.",
            },
            "pt-br": {
                card: "Limpador de cache do Xcode",
                resume: "CleanerXcode é uma ferramenta para macOS projetada para remover arquivos desnecessários do Xcode, como Derived Data, caches de build, arquivos de suporte de dispositivo e dados de simulador.",
            },
        },
    },
    {
        name: "Formidable",
        url: "https://github.com/didisouzacosta/Formidable",
        imageUrl:
            "https://pub-81dc0daed73f4a358469301b9b80f493.r2.dev/apps/formidable/app-icon.png",
        tags: ["Framework"],
        target: "_blank",
        isEnabled: true,
        descriptions: {
            en: {
                card: "Swift form framework",
                resume: "The Formidable protocol is designed for objects that manage forms composed of multiple FormField components. By conforming to this protocol, you can leverage built-in functionality to validate, reset, and check the validity of all form fields at once.",
            },
            "pt-br": {
                card: "Framework de formulários em Swift",
                resume: "O protocolo Formidable é projetado para objetos que gerenciam formulários compostos por múltiplos componentes FormField. Ao aderir a esse protocolo, você pode validar, resetar e verificar a validade de todos os campos de uma só vez.",
            },
        },
    },
    {
        name: "VideoEditorKit",
        url: "https://github.com/didisouzacosta/VideoEditorKit",
        imageUrl:
            "https://pub-81dc0daed73f4a358469301b9b80f493.r2.dev/apps/videoeditorkit/app-icon.png",
        tags: ["Framework", "SwiftUI"],
        target: "_blank",
        isEnabled: true,
        descriptions: {
            en: {
                card: "SwiftUI video editor",
                resume: "VideoEditorKit is a SwiftUI video editor framework for building video editing experiences in Apple apps.",
            },
            "pt-br": {
                card: "Editor de vídeo em SwiftUI",
                resume: "VideoEditorKit é um framework de editor de vídeo em SwiftUI para criar experiências de edição de vídeo em apps Apple.",
            },
        },
    },
];

const projectNameCollator = new Intl.Collator("en", {
    sensitivity: "base",
    numeric: true,
});

function getEnabledProjects(): PortfolioProject[] {
    return portfolioProjects
        .filter((project) => project.isEnabled)
        .slice()
        .sort((first, second) => projectNameCollator.compare(first.name, second.name));
}

export function getProjectCards(language: ProjectLanguage): ProjectCardViewModel[] {
    return getEnabledProjects().map((project) => ({
        name: project.name,
        description: project.descriptions[language].card,
        tags: project.tags,
        imageUrl: project.imageUrl,
        url: project.url,
        target: project.target,
    }));
}

export function getResumeProjects(language: ProjectLanguage): ResumeProjectViewModel[] {
    return getEnabledProjects().map((project) => ({
        title: project.name,
        url: project.url,
        description: project.descriptions[language].resume,
    }));
}
```

- [ ] **Step 2: Verify TypeScript parses through the Astro build**

Run:

```bash
npm run build
```

Expected at this point: PASS if the file is not imported yet. If it fails, fix syntax before continuing.

- [ ] **Step 3: Commit**

Run:

```bash
git add src/core/projects.ts
git commit -m "feat: centralize project data"
```

---

### Task 3: Make Home Project Cards Consume the Shared Source

**Files:**
- Modify: `src/components/resume/AboutMe.astro`
- Modify: `src/components/resume/Projects.astro`

- [ ] **Step 1: Pass homepage language into `Projects.astro`**

In `src/components/resume/AboutMe.astro`, replace:

```astro
<Projects />
```

with:

```astro
<Projects lang={content.lang} />
```

- [ ] **Step 2: Replace local project data in `Projects.astro`**

In `src/components/resume/Projects.astro`, replace the whole frontmatter block with:

```astro
---
import { getProjectCards, type ProjectLanguage } from "../../core/projects";

interface Props {
    lang?: ProjectLanguage;
}

const { lang = "en" } = Astro.props;
const enabledApps = getProjectCards(lang);
---
```

Keep the existing markup and styles, but update the image `alt` to use the current language:

```astro
alt={lang === "pt-br" ? `Ícone do app ${app.name}` : `${app.name} app icon`}
```

- [ ] **Step 3: Verify the local array is gone**

Run:

```bash
rg -n "const apps|interface AppProject|VideoEditorKit|CleanerXcode" src/components/resume/Projects.astro
```

Expected:

```text
src/components/resume/Projects.astro:<line>:const enabledApps = getProjectCards(lang);
```

There should be no local `const apps`, no local `interface AppProject`, and no hardcoded project names in this component.

- [ ] **Step 4: Verify build**

Run:

```bash
npm run build
```

Expected:

```text
[build] Complete!
```

- [ ] **Step 5: Commit**

Run:

```bash
git add src/components/resume/AboutMe.astro src/components/resume/Projects.astro
git commit -m "refactor: render home projects from shared data"
```

---

### Task 4: Make Resume Projects Consume the Same Shared Source

**Files:**
- Modify: `src/core/resume.tsx`

- [ ] **Step 1: Import the shared resume helper**

At the top of `src/core/resume.tsx`, replace:

```ts
import type { Resume } from "./types";
```

with:

```ts
import { getResumeProjects } from "./projects";
import type { Resume } from "./types";
```

- [ ] **Step 2: Replace English resume project items**

In `export const eng: Resume`, replace the entire `projects` block with:

```ts
    projects: {
        title: "Projects",
        items: getResumeProjects("en")
    },
```

- [ ] **Step 3: Replace Portuguese resume project items**

In `export const ptBr: Resume`, replace the entire `projects` block with:

```ts
    projects: {
        title: "Projetos",
        items: getResumeProjects("pt-br")
    },
```

- [ ] **Step 4: Verify removed duplicated project literals**

Run:

```bash
rg -n "Uncompress|Simple library to decompress|Biblioteca simples para descompactar|title: \"VideoEditorKit\"|title: \"CleanerXcode\"" src/core/resume.tsx
```

Expected: no output. Project names should now live in `src/core/projects.ts`.

- [ ] **Step 5: Verify build**

Run:

```bash
npm run build
```

Expected:

```text
[build] Complete!
```

- [ ] **Step 6: Commit**

Run:

```bash
git add src/core/resume.tsx
git commit -m "refactor: use shared projects in resume"
```

---

### Task 5: Verify Alphabetical Order and Route Parity

**Files:**
- No production code changes expected unless verification finds an issue.

- [ ] **Step 1: Verify the centralized source is alphabetically rendered**

Run:

```bash
npm run build
```

Expected:

```text
[build] Complete!
```

- [ ] **Step 2: Start the local server**

Run:

```bash
npm run dev
```

Expected:

```text
Local http://localhost:4321/
```

- [ ] **Step 3: Browser-check English home**

Open `http://localhost:4321/`.

Verify the project cards appear in this order:

```text
CleanerXcode
Formidable
KuboRush
LoopSize
VideoEditorKit
```

- [ ] **Step 4: Browser-check Portuguese home**

Open `http://localhost:4321/pt-br/`.

Verify the project cards appear in this order:

```text
CleanerXcode
Formidable
KuboRush
LoopSize
VideoEditorKit
```

- [ ] **Step 5: Browser-check English resume**

Open `http://localhost:4321/resume/`.

Verify the projects section appears in this order and contains no `DuoTake` or `Uncompress`:

```text
CleanerXcode
Formidable
KuboRush
LoopSize
VideoEditorKit
```

- [ ] **Step 6: Browser-check Portuguese resume**

Open `http://localhost:4321/resume/pt-br/`.

Verify the projects section appears in this order and contains no `DuoTake` or `Uncompress`:

```text
CleanerXcode
Formidable
KuboRush
LoopSize
VideoEditorKit
```

- [ ] **Step 7: Commit any verification fixes**

If verification required fixes, run:

```bash
git add AGENTS.md src/core/projects.ts src/components/resume/AboutMe.astro src/components/resume/Projects.astro src/core/resume.tsx
git commit -m "fix: align project list rendering"
```

If no fixes were needed, do not create an empty commit.

---

## Self-Review Checklist

- Requirement 1, always use `@build-web-apps`: covered by Task 1 in `AGENTS.md`.
- Requirement 2, alphabetical project list: covered by `Intl.Collator` sorting in `getEnabledProjects()`.
- Requirement 3, `/resume` uses the same project list as home: covered by `getProjectCards()` and `getResumeProjects()` sharing the same filtered and sorted source.
- No new dependencies are introduced.
- Existing visual style is preserved because `Projects.astro` markup and CSS stay essentially the same.
- Accessibility is preserved through existing `aria-label`, `alt`, and external link `rel` behavior.
- `dist/` remains a build artifact and is not manually edited.
