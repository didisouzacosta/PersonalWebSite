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
        path: "/apps/giggleface/",
        priority: "0.7",
        changefreq: "monthly",
        alternates: localizedAlternates("/apps/giggleface/", "/pt-br/apps/giggleface/"),
    },
    {
        path: "/pt-br/apps/giggleface/",
        priority: "0.7",
        changefreq: "monthly",
        alternates: localizedAlternates("/apps/giggleface/", "/pt-br/apps/giggleface/"),
    },
    {
        path: "/apps/potionpals/",
        priority: "0.6",
        changefreq: "monthly",
        alternates: localizedAlternates("/apps/potionpals/", "/pt-br/apps/potionpals/"),
    },
    {
        path: "/pt-br/apps/potionpals/",
        priority: "0.6",
        changefreq: "monthly",
        alternates: localizedAlternates("/apps/potionpals/", "/pt-br/apps/potionpals/"),
    },
    {
        path: "/apps/telepro/",
        priority: "0.6",
        changefreq: "monthly",
        alternates: localizedAlternates("/apps/telepro/", "/pt-br/apps/telepro/"),
    },
    {
        path: "/pt-br/apps/telepro/",
        priority: "0.6",
        changefreq: "monthly",
        alternates: localizedAlternates("/apps/telepro/", "/pt-br/apps/telepro/"),
    },
    {
        path: "/apps/horsescore/",
        priority: "0.6",
        changefreq: "monthly",
        alternates: localizedAlternates("/apps/horsescore/", "/pt-br/apps/horsescore/"),
    },
    {
        path: "/pt-br/apps/horsescore/",
        priority: "0.6",
        changefreq: "monthly",
        alternates: localizedAlternates("/apps/horsescore/", "/pt-br/apps/horsescore/"),
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
