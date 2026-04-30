import { siteUrl } from "../core/seo";

export function GET() {
    return new Response(
        [
            "User-agent: *",
            "Allow: /",
            "",
            "User-agent: OAI-SearchBot",
            "Allow: /",
            "",
            `Sitemap: ${siteUrl}/sitemap.xml`,
            "",
        ].join("\n"),
        {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
            },
        },
    );
}
