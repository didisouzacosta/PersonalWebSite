const PORTFOLIO_ORIGIN = "https://adrianosouzacosta.com.br";
const PORTFOLIO_HOSTNAME = new URL(PORTFOLIO_ORIGIN).hostname;
const APP_BASE_PATH = "/apps/duotake";
const PT_BR_APP_BASE_PATH = "/pt-br/apps/duotake";
const EXTERNAL_DOMAIN_STYLE = `
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

    .site-footer .privacy-settings {
        margin-left: 0 !important;
        padding-left: 0 !important;
        border-left: 0 !important;
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
    ["/pt-br/terms-of-use/", `${PT_BR_APP_BASE_PATH}/terms-of-use/`],
    ["/pt-br/privacy-policy/", `${PT_BR_APP_BASE_PATH}/privacy-policy/`],
]);
const UPSTREAM_TO_CLEAN_PATHS = new Map(
    [...CLEAN_TO_UPSTREAM_PATHS].map(([cleanPath, upstreamPath]) => [upstreamPath, cleanPath]),
);

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
    return UPSTREAM_TO_CLEAN_PATHS.get(normalizeCleanPath(pathname)) ?? pathname;
}

function isPagePath(pathname) {
    if (pathname.startsWith("/_astro/")) {
        return false;
    }

    const lastSegment = pathname.split("/").pop() ?? "";

    return !lastSegment.includes(".");
}

// Keeps a single indexable URL per page: https, no www, trailing slash and
// clean paths only. Portfolio pages outside DuoTake go back to the portfolio
// so they are not duplicated under the app domain.
function canonicalRedirect(url) {
    const publicUrl = new URL(url);
    publicUrl.protocol = "https:";

    if (publicUrl.hostname.startsWith("www.")) {
        publicUrl.hostname = publicUrl.hostname.slice(4);
    }

    if (isPagePath(publicUrl.pathname)) {
        const publicPath = mapUpstreamPathToPublic(publicUrl.pathname);

        if (!CLEAN_TO_UPSTREAM_PATHS.has(normalizeCleanPath(publicPath))) {
            return Response.redirect(`${PORTFOLIO_ORIGIN}${normalizeCleanPath(publicUrl.pathname)}${publicUrl.search}`, 301);
        }

        publicUrl.pathname = normalizeCleanPath(publicPath);
    }

    if (publicUrl.toString() !== url.toString()) {
        return Response.redirect(publicUrl.toString(), 301);
    }

    return undefined;
}

function rewriteUrlValue(value, publicOrigin) {
    if (!value || value.startsWith("#") || value.startsWith("mailto:") || value.startsWith("tel:")) {
        return value;
    }

    if (value.startsWith(PORTFOLIO_ORIGIN)) {
        const url = new URL(value);
        const publicUrl = new URL(publicOrigin);
        url.protocol = publicUrl.protocol;
        url.hostname = publicUrl.hostname;
        url.pathname = mapUpstreamPathToPublic(url.pathname);
        return url.toString();
    }

    if (value.startsWith(APP_BASE_PATH) || value.startsWith(PT_BR_APP_BASE_PATH)) {
        return mapUpstreamPathToPublic(value);
    }

    return value;
}

class UrlAttributeRewriter {
    constructor(attributeName, publicOrigin) {
        this.attributeName = attributeName;
        this.publicOrigin = publicOrigin;
    }

    element(element) {
        if (element.hasAttribute("data-preserve-host")) {
            return;
        }

        const value = element.getAttribute(this.attributeName);

        if (value) {
            element.setAttribute(this.attributeName, rewriteUrlValue(value, this.publicOrigin));
        }
    }
}

class ExternalDomainNavigationRewriter {
    element(element) {
        const href = element.getAttribute("href");

        if (href !== "/" && href !== "/pt-br/") {
            element.remove();
        }
    }
}

class SiteFooterSocialLinkRewriter {
    element(element) {
        element.remove();
    }
}

class ExternalDomainHeadRewriter {
    element(element) {
        element.append(`<style id="external-domain-style">${EXTERNAL_DOMAIN_STYLE}</style>`, { html: true });
    }
}

function appRobotsTxt(publicOrigin) {
    return new Response([
        "User-agent: *",
        "Allow: /",
        `Sitemap: ${publicOrigin}/sitemap.xml`,
        "",
    ].join("\n"), {
        headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, max-age=600",
        },
    });
}

function appSitemapXml(publicOrigin) {
    const alternates = [
        ["en", `${publicOrigin}/`],
        ["pt-BR", `${publicOrigin}/pt-br/`],
        ["x-default", `${publicOrigin}/`],
    ].map(([lang, href]) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${href}" />`).join("\n        ");
    const urls = [`${publicOrigin}/`, `${publicOrigin}/pt-br/`].map((loc) => `
    <url>
        <loc>${loc}</loc>
        ${alternates}
    </url>`).join("");

    return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}
</urlset>
`, {
        headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=600",
        },
    });
}

async function fetchFromPortfolio(request, url) {
    const publicOrigin = url.origin;
    const isExternalDomain = url.hostname !== PORTFOLIO_HOSTNAME;
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

    if (!isExternalDomain) {
        return response;
    }

    return new HTMLRewriter()
        .on("head", new ExternalDomainHeadRewriter())
        .on(".site-menu a", new ExternalDomainNavigationRewriter())
        .on(".site-footer nav a", new SiteFooterSocialLinkRewriter())
        .on("a[href]", new UrlAttributeRewriter("href", publicOrigin))
        .on("link[href]", new UrlAttributeRewriter("href", publicOrigin))
        .on("form[action]", new UrlAttributeRewriter("action", publicOrigin))
        .on("meta[content]", new UrlAttributeRewriter("content", publicOrigin))
        .transform(response);
}

export default {
    async fetch(request) {
        const url = new URL(request.url);

        if (url.hostname !== PORTFOLIO_HOSTNAME && url.hostname !== `www.${PORTFOLIO_HOSTNAME}`) {
            const redirect = canonicalRedirect(url);

            if (redirect) {
                return redirect;
            }
        }

        if (url.pathname === "/robots.txt") {
            return appRobotsTxt(url.origin);
        }

        if (url.pathname === "/sitemap.xml") {
            return appSitemapXml(url.origin);
        }

        return fetchFromPortfolio(request, url);
    },
};
