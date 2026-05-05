const APP_DOMAIN = "duotake.app";
const APP_ORIGIN = `https://${APP_DOMAIN}`;
const PORTFOLIO_ORIGIN = "https://adrianosouzacosta.com.br";
const APP_BASE_PATH = "/apps/duotake";
const PT_BR_APP_BASE_PATH = "/pt-br/apps/duotake";
const APP_DOMAIN_STYLE = `
    .screenshots {
        --screenshots-padding-left: calc(32px + var(--safe-area-left)) !important;
        --screenshots-padding-right: calc(32px + var(--safe-area-right)) !important;
        display: flex !important;
        align-items: flex-start !important;
        justify-content: center !important;
        margin-right: auto !important;
        margin-left: auto !important;
        overflow-x: clip !important;
        padding-right: var(--screenshots-padding-right) !important;
        padding-left: var(--screenshots-padding-left) !important;
        scroll-snap-type: none !important;
    }

    .screenshots li {
        flex: 0 0 clamp(170px, calc((100vw - 154px) / 6), 252px) !important;
        scroll-snap-align: center !important;
    }

    .screenshots figure {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
    }

    .screenshots figure img {
        display: block !important;
        margin-right: auto !important;
        margin-left: auto !important;
    }

    @media (max-width: 760px) {
        .screenshots {
            justify-content: flex-start !important;
            overflow-x: auto !important;
            overscroll-behavior-x: contain !important;
            padding-right: var(--safe-page-padding-right) !important;
            padding-left: var(--safe-page-padding-left) !important;
            scroll-padding-inline-start: var(--safe-page-padding-left) !important;
            scroll-padding-inline-end: var(--safe-page-padding-right) !important;
            scroll-snap-type: x proximity !important;
        }

        .screenshots li {
            flex-basis: clamp(206px, 72vw, 252px) !important;
        }
    }
`;

const CLEAN_TO_UPSTREAM_PATHS = new Map([
    ["/", `${APP_BASE_PATH}/`],
    ["/pt-br/", `${PT_BR_APP_BASE_PATH}/`],
    ["/terms-of-use/", `${APP_BASE_PATH}/terms-of-use/`],
    ["/privacy-policy/", `${APP_BASE_PATH}/privacy-policy/`],
]);

function normalizeCleanPath(pathname) {
    if (!pathname || pathname === "/") {
        return "/";
    }

    return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

function mapRequestPath(pathname) {
    const cleanPath = normalizeCleanPath(pathname);
    const mappedPath = CLEAN_TO_UPSTREAM_PATHS.get(cleanPath);

    if (mappedPath) {
        return mappedPath;
    }

    return pathname;
}

function mapUpstreamPathToPublic(pathname) {
    const cleanPath = normalizeCleanPath(pathname);

    if (cleanPath === `${APP_BASE_PATH}/`) {
        return "/";
    }

    if (cleanPath === `${PT_BR_APP_BASE_PATH}/`) {
        return "/pt-br/";
    }

    if (cleanPath === `${APP_BASE_PATH}/terms-of-use/`) {
        return "/terms-of-use/";
    }

    if (cleanPath === `${APP_BASE_PATH}/privacy-policy/`) {
        return "/privacy-policy/";
    }

    return pathname;
}

function rewriteUrlValue(value) {
    if (!value || value.startsWith("#") || value.startsWith("mailto:") || value.startsWith("tel:")) {
        return value;
    }

    if (value.startsWith(PORTFOLIO_ORIGIN)) {
        const url = new URL(value);
        url.protocol = "https:";
        url.hostname = APP_DOMAIN;
        url.pathname = mapUpstreamPathToPublic(url.pathname);
        return url.toString();
    }

    if (value.startsWith(APP_BASE_PATH) || value.startsWith(PT_BR_APP_BASE_PATH)) {
        return mapUpstreamPathToPublic(value);
    }

    return value;
}

class UrlAttributeRewriter {
    constructor(attributeName) {
        this.attributeName = attributeName;
    }

    element(element) {
        const value = element.getAttribute(this.attributeName);

        if (value) {
            element.setAttribute(this.attributeName, rewriteUrlValue(value));
        }
    }
}

class AppDomainNavigationRewriter {
    element(element) {
        const href = element.getAttribute("href");

        if (href !== "/" && href !== "/pt-br/") {
            element.remove();
        }
    }
}

class SiteFooterSocialRewriter {
    element(element) {
        element.remove();
    }
}

class AppDomainHeadRewriter {
    element(element) {
        element.append(`<style id="duotake-domain-style">${APP_DOMAIN_STYLE}</style>`, { html: true });
    }
}

function appRobotsTxt() {
    return new Response([
        "User-agent: *",
        "Allow: /",
        `Sitemap: ${APP_ORIGIN}/sitemap.xml`,
        "",
    ].join("\n"), {
        headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, max-age=600",
        },
    });
}

function appSitemapXml() {
    return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>${APP_ORIGIN}/</loc></url>
    <url><loc>${APP_ORIGIN}/pt-br/</loc></url>
    <url><loc>${APP_ORIGIN}/terms-of-use/</loc></url>
    <url><loc>${APP_ORIGIN}/privacy-policy/</loc></url>
</urlset>
`, {
        headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=600",
        },
    });
}

async function fetchFromPortfolio(request, url) {
    const upstreamUrl = new URL(url);
    const portfolioUrl = new URL(PORTFOLIO_ORIGIN);
    upstreamUrl.protocol = portfolioUrl.protocol;
    upstreamUrl.hostname = portfolioUrl.hostname;
    upstreamUrl.pathname = mapRequestPath(url.pathname);

    const upstreamRequest = new Request(upstreamUrl.toString(), request);
    const response = await fetch(upstreamRequest);
    const contentType = response.headers.get("content-type") ?? "";

    if (!contentType.includes("text/html")) {
        return response;
    }

    return new HTMLRewriter()
        .on("head", new AppDomainHeadRewriter())
        .on(".site-menu a", new AppDomainNavigationRewriter())
        .on(".site-footer a", new SiteFooterSocialRewriter())
        .on("a[href]", new UrlAttributeRewriter("href"))
        .on("link[href]", new UrlAttributeRewriter("href"))
        .on("form[action]", new UrlAttributeRewriter("action"))
        .on("meta[content]", new UrlAttributeRewriter("content"))
        .transform(response);
}

export default {
    async fetch(request) {
        const url = new URL(request.url);

        if (url.hostname === `www.${APP_DOMAIN}`) {
            url.hostname = APP_DOMAIN;
            return Response.redirect(url.toString(), 301);
        }

        if (url.pathname === "/robots.txt") {
            return appRobotsTxt();
        }

        if (url.pathname === "/sitemap.xml") {
            return appSitemapXml();
        }

        return fetchFromPortfolio(request, url);
    },
};
