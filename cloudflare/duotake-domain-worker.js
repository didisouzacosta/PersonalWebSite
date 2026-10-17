// Serves the static duotake.app build (dist-duotake, see astro.config.duotake.mjs).
// The pages are already generated for this domain, so the Worker only keeps a
// single indexable URL per page before handing the request to the assets.
const PUBLIC_ORIGIN = "https://duotake.app";
const PORTFOLIO_ORIGIN = "https://adrianosouzacosta.com.br";

// Old portfolio paths that were reachable on this domain while it proxied the portfolio.
const LEGACY_PATHS = new Map([
    ["/apps/duotake/", "/"],
    ["/apps/duotake/terms-of-use/", "/terms-of-use/"],
    ["/apps/duotake/privacy-policy/", "/privacy-policy/"],
    ["/pt-br/apps/duotake/", "/pt-br/"],
    ["/pt-br/apps/duotake/terms-of-use/", "/pt-br/terms-of-use/"],
    ["/pt-br/apps/duotake/privacy-policy/", "/pt-br/privacy-policy/"],
]);

// Portfolio sections that should not be duplicated under the app domain.
const PORTFOLIO_PREFIXES = ["/apps/", "/pt-br/apps/", "/resume/"];

function withTrailingSlash(pathname) {
    return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

function isPagePath(pathname) {
    const lastSegment = pathname.split("/").pop() ?? "";

    return !lastSegment.includes(".");
}

function canonicalRedirect(url) {
    const pathname = isPagePath(url.pathname) ? withTrailingSlash(url.pathname) : url.pathname;
    const legacyPath = LEGACY_PATHS.get(pathname);

    if (legacyPath) {
        return `${PUBLIC_ORIGIN}${legacyPath}${url.search}`;
    }

    if (PORTFOLIO_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
        return `${PORTFOLIO_ORIGIN}${pathname}${url.search}`;
    }

    const publicUrl = `${PUBLIC_ORIGIN}${pathname}${url.search}`;

    return publicUrl === url.toString() ? undefined : publicUrl;
}

export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        // Local `wrangler dev` runs on localhost; only canonicalize the real domain.
        if (url.hostname.endsWith("duotake.app")) {
            const redirect = canonicalRedirect(url);

            if (redirect) {
                return Response.redirect(redirect, 301);
            }
        }

        return env.ASSETS.fetch(request);
    },
};
