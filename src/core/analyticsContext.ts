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
