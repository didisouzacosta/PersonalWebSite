import { absoluteUrl, localizedAlternates } from "../core/seo";

const pages = [
    {
        path: "/",
        priority: "1.0",
        changefreq: "monthly",
        alternates: localizedAlternates("/", "/pt-br/"),
    },
    {
        path: "/pt-br/",
        priority: "1.0",
        changefreq: "monthly",
        alternates: localizedAlternates("/", "/pt-br/"),
    },
    {
        path: "/resume/",
        priority: "0.8",
        changefreq: "monthly",
        alternates: localizedAlternates("/resume/", "/resume/pt-br/"),
    },
    {
        path: "/resume/pt-br/",
        priority: "0.8",
        changefreq: "monthly",
        alternates: localizedAlternates("/resume/", "/resume/pt-br/"),
    },
    {
        path: "/apps/kuborush/",
        priority: "0.7",
        changefreq: "monthly",
        alternates: localizedAlternates("/apps/kuborush/", "/pt-br/apps/kuborush/"),
    },
    {
        path: "/pt-br/apps/kuborush/",
        priority: "0.7",
        changefreq: "monthly",
        alternates: localizedAlternates("/apps/kuborush/", "/pt-br/apps/kuborush/"),
    },
    {
        path: "/apps/loopsize/",
        priority: "0.7",
        changefreq: "monthly",
        alternates: localizedAlternates("/apps/loopsize/", "/pt-br/apps/loopsize/"),
    },
    {
        path: "/pt-br/apps/loopsize/",
        priority: "0.7",
        changefreq: "monthly",
        alternates: localizedAlternates("/apps/loopsize/", "/pt-br/apps/loopsize/"),
    },
    {
        path: "/apps/duotake/",
        priority: "0.6",
        changefreq: "monthly",
        alternates: localizedAlternates("/apps/duotake/", "/pt-br/apps/duotake/"),
    },
    {
        path: "/pt-br/apps/duotake/",
        priority: "0.6",
        changefreq: "monthly",
        alternates: localizedAlternates("/apps/duotake/", "/pt-br/apps/duotake/"),
    },
];

function escapeXml(value: string): string {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&apos;");
}

export function GET() {
    const urls = pages.map((page) => `
    <url>
        <loc>${escapeXml(absoluteUrl(page.path))}</loc>
        ${page.alternates.map((alternate) => (
            `<xhtml:link rel="alternate" hreflang="${escapeXml(alternate.lang)}" href="${escapeXml(absoluteUrl(alternate.path))}" />`
        )).join("\n        ")}
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>`).join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}
</urlset>
`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
        },
    });
}
