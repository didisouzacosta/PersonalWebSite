export type AnalyticsPageType =
    | "home"
    | "resume"
    | "app"
    | "page"
    | "system";

export interface AnalyticsPageContext {
    path: string;
    canonical: string;
    title: string;
    analyticsTitle: string;
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

const projectTitles: Record<string, string> = {
    duotake: "Duo Take",
    kuborush: "Kubo Rush",
    loopsize: "Loop Size",
};

const getProjectTitle = (projectSlug?: string) => {
    if (!projectSlug) return undefined;
    return projectTitles[projectSlug] ?? projectSlug
        .split("-")
        .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
        .join(" ");
};

const getPageType = (path: string): AnalyticsPageType => {
    const normalizedPath = normalizePath(path);

    if (normalizedPath === "/" || normalizedPath === "/pt-br/") return "home";
    if (normalizedPath === "/resume/" || normalizedPath === "/resume/pt-br/") return "resume";
    if (/^\/(?:pt-br\/)?apps\/[^/]+\/(?:terms-of-use|privacy-policy)\/$/.test(normalizedPath)) return "page";
    if (/^\/(?:pt-br\/)?apps\/[^/]+\/$/.test(normalizedPath)) return "app";
    if (normalizedPath.endsWith("/terms-of-use/") || normalizedPath.endsWith("/privacy-policy/")) return "page";

    return "system";
};

const getLegalTitle = (path: string) => {
    const normalizedPath = normalizePath(path);

    if (normalizedPath.endsWith("/terms-of-use/")) return "Terms of Use";
    if (normalizedPath.endsWith("/privacy-policy/")) return "Privacy Policy";

    return "Legal";
};

const getAnalyticsTitle = (path: string, pageType: AnalyticsPageType, fallbackTitle: string) => {
    const projectTitle = getProjectTitle(extractProjectSlug(path));

    if (pageType === "home") return "Home";
    if (pageType === "resume") return "Curriculo";
    if (pageType === "app" && projectTitle) return `Projeto / ${projectTitle}`;
    if (pageType === "page" && projectTitle) return `Projeto / ${projectTitle} / ${getLegalTitle(path)}`;
    if (pageType === "page") return `Legal / ${getLegalTitle(path)}`;

    return fallbackTitle;
};

export function createAnalyticsPageContext(input: CreateAnalyticsPageContextInput): AnalyticsPageContext {
    const path = normalizePath(input.path);
    const lang = input.lang === "pt-br" || input.lang === "pt-BR" ? "pt-BR" : "en";
    const pageType = getPageType(path);

    return {
        path,
        canonical: input.canonical,
        title: input.title,
        analyticsTitle: getAnalyticsTitle(path, pageType, input.title),
        lang,
        pageType,
        projectSlug: extractProjectSlug(path),
    };
}
