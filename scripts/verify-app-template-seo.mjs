import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const read = (path) => readFileSync(join(root, path), "utf8");

const checks = [
    {
        file: "src/components/app/AppTemplate.astro",
        tokens: [
            "interface AppFeature",
            "interface AppUseCase",
            "interface AppFact",
            "interface AppTestimonial",
            "product-facts",
            "features-section",
            "use-cases-section",
            "testimonials-section",
            "primaryKeyword",
            "secondaryKeywords",
            "featureList: features.map",
        ],
    },
    {
        file: "src/core/seo.ts",
        tokens: [
            "featureList?: string[]",
            "keywords?: string[]",
            "sameAs?: string[]",
            "price?: string",
            "priceCurrency?: string",
            "keywords.join",
        ],
    },
    ...[
        "src/pages/apps/duotake/index.astro",
        "src/pages/pt-br/apps/duotake/index.astro",
        "src/pages/apps/kuborush/index.astro",
        "src/pages/pt-br/apps/kuborush/index.astro",
        "src/pages/apps/loopsize/index.astro",
        "src/pages/pt-br/apps/loopsize/index.astro",
    ].map((file) => ({
        file,
        tokens: [
            "const facts =",
            "const features =",
            "const useCases =",
            "const primaryKeyword =",
            "const secondaryKeywords =",
            "facts={facts}",
            "features={features}",
            "useCases={useCases}",
            "primaryKeyword={primaryKeyword}",
            "secondaryKeywords={secondaryKeywords}",
            "caption:",
        ],
    })),
    {
        file: "src/pages/robots.txt.ts",
        tokens: ["OAI-SearchBot", "Sitemap:"],
    },
    {
        file: "src/pages/llms.txt.ts",
        tokens: ["# Adriano Souza Costa", "## Apps", "DuoTake", "KuboRush", "LoopSize"],
    },
];

const failures = [];

for (const check of checks) {
    let content = "";

    try {
        content = read(check.file);
    } catch {
        failures.push(`${check.file}: file is missing`);
        continue;
    }

    for (const token of check.tokens) {
        if (!content.includes(token)) {
            failures.push(`${check.file}: missing "${token}"`);
        }
    }
}

if (failures.length > 0) {
    console.error("App template SEO verification failed:");
    for (const failure of failures) {
        console.error(`- ${failure}`);
    }
    process.exit(1);
}

console.log("App template SEO verification passed.");
