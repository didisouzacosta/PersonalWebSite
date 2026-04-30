export const siteUrl = "https://adrianosouzacosta.com.br";
export const defaultOgImage = "https://avatars.githubusercontent.com/u/11352503?v=4";
export const appAssetBaseUrl = "https://pub-81dc0daed73f4a358469301b9b80f493.r2.dev/apps/";

export type SeoLanguage = "en" | "pt-br";

export interface AlternateLocale {
    lang: string;
    path: string;
}

export type JsonLdValue = Record<string, unknown> | Record<string, unknown>[];

export function absoluteUrl(pathOrUrl: string): string {
    if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
        return pathOrUrl;
    }

    return new URL(normalizePath(pathOrUrl), siteUrl).toString();
}

export function normalizePath(path: string): string {
    if (!path || path === "/") {
        return "/";
    }

    const cleanPath = path.split("?")[0].split("#")[0];
    const withLeadingSlash = cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;

    return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
}

export function localizedAlternates(enPath: string, ptBrPath: string): AlternateLocale[] {
    return [
        { lang: "en", path: enPath },
        { lang: "pt-BR", path: ptBrPath },
        { lang: "x-default", path: enPath },
    ];
}

export function getAppAlternates(pathname: string): AlternateLocale[] {
    const normalizedPath = normalizePath(pathname);
    const enPath = normalizedPath.startsWith("/pt-br/")
        ? normalizedPath.replace(/^\/pt-br/, "")
        : normalizedPath;
    const ptBrPath = normalizedPath.startsWith("/pt-br/")
        ? normalizedPath
        : normalizePath(`/pt-br${normalizedPath}`);

    return localizedAlternates(enPath, ptBrPath);
}

export function appStoreUrl(appId?: string): string | undefined {
    if (!appId) {
        return undefined;
    }

    return `https://apps.apple.com/app/${appId}`;
}

export function personJsonLd(language: SeoLanguage = "en"): Record<string, unknown> {
    const isPortuguese = language === "pt-br";

    return {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Adriano Souza Costa",
        url: siteUrl,
        image: defaultOgImage,
        jobTitle: isPortuguese
            ? "Desenvolvedor iOS/macOS e Entusiasta de IA"
            : "iOS/macOS Developer and AI Enthusiast",
        knowsAbout: [
            "iOS",
            "macOS",
            "Swift",
            "SwiftUI",
            "UIKit",
            "Objective-C",
            "SwiftData",
            "CoreData",
            "Clean Architecture",
            "Codex",
            "Claude",
            "Agents",
            "Skills",
        ],
        sameAs: [
            "https://github.com/didisouzacosta",
            "https://www.linkedin.com/in/adrianosouzacosta",
            "https://x.com/didisouzacosta",
        ],
    };
}

export function websiteJsonLd(language: SeoLanguage = "en"): Record<string, unknown> {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Adriano Souza Costa",
        inLanguage: language === "pt-br" ? "pt-BR" : "en",
        publisher: {
            "@id": `${siteUrl}/#person`,
        },
    };
}

export function profilePageJsonLd(path: string, language: SeoLanguage = "en"): Record<string, unknown> {
    return {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${absoluteUrl(path)}#profile-page`,
        url: absoluteUrl(path),
        inLanguage: language === "pt-br" ? "pt-BR" : "en",
        about: {
            "@id": `${siteUrl}/#person`,
        },
        mainEntity: personJsonLd(language),
    };
}

export function softwareApplicationJsonLd({
    name,
    description,
    path,
    appIcon,
    screenshots,
    appId,
    language,
    applicationCategory,
}: {
    name: string;
    description: string;
    path: string;
    appIcon: string;
    screenshots: string[];
    appId?: string;
    language: SeoLanguage;
    applicationCategory: string;
}): Record<string, unknown> {
    const downloadUrl = appStoreUrl(appId);

    return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "@id": `${absoluteUrl(path)}#software-application`,
        name,
        description,
        url: absoluteUrl(path),
        image: absoluteUrl(`${appAssetBaseUrl}${appIcon}`),
        screenshot: screenshots.map((screenshot) => absoluteUrl(`${appAssetBaseUrl}${screenshot}`)),
        operatingSystem: "iOS",
        applicationCategory,
        inLanguage: language === "pt-br" ? "pt-BR" : "en",
        ...(downloadUrl ? { downloadUrl } : {}),
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
        author: {
            "@id": `${siteUrl}/#person`,
        },
    };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): Record<string, unknown> {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: absoluteUrl(item.path),
        })),
    };
}
