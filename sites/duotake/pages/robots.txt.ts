import { duoTakeSiteUrl } from "../../../src/core/seo";

export function GET() {
    return new Response([
        "User-agent: *",
        "Allow: /",
        `Sitemap: ${duoTakeSiteUrl}/sitemap.xml`,
        "",
    ].join("\n"), {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    });
}
