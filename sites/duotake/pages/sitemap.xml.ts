import { duoTakeAlternates } from "../../../src/core/apps/duotake";

// Only the app pages are listed; the legal pages are noindex.
export function GET() {
    const alternates = duoTakeAlternates
        .map((alternate) => `<xhtml:link rel="alternate" hreflang="${alternate.lang}" href="${alternate.path}" />`)
        .join("\n        ");
    const urls = duoTakeAlternates
        .filter((alternate) => alternate.lang !== "x-default")
        .map((alternate) => `
    <url>
        <loc>${alternate.path}</loc>
        ${alternates}
    </url>`)
        .join("");

    return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}
</urlset>
`, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
        },
    });
}
