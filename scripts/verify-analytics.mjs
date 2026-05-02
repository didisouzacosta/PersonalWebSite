import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const distDir = "dist";
const expectedEvents = [
    "navigation_clicked",
    "theme_changed",
    "language_changed",
    "resume_print_requested",
    "resume_contact_clicked",
    "certificate_clicked",
    "social_link_clicked",
    "app_store_clicked",
    "app_legal_link_clicked",
    "screenshot_opened",
    "screenshot_closed",
    "faq_toggled",
    "hero_orbit_interacted",
    "internal_link_clicked",
    "external_link_clicked",
    "control_clicked",
];
const forbiddenEvents = [
    "page_accessed",
    "project_opened",
];
const expectedAnalyticsTitles = [
    { file: "dist/index.html", title: "Home" },
    { file: "dist/resume/index.html", title: "Curriculo" },
    { file: "dist/apps/kuborush/index.html", title: "Projeto / Kubo Rush" },
    { file: "dist/apps/kuborush/terms-of-use/index.html", title: "Projeto / Kubo Rush / Terms of Use" },
    { file: "dist/apps/kuborush/privacy-policy/index.html", title: "Projeto / Kubo Rush / Privacy Policy" },
    { file: "dist/pt-br/apps/kuborush/index.html", title: "Projeto / Kubo Rush" },
];
const expectedPageTypes = [
    { file: "dist/apps/kuborush/terms-of-use/index.html", pageType: "page" },
    { file: "dist/apps/kuborush/privacy-policy/index.html", pageType: "page" },
    { file: "dist/apps/loopsize/terms-of-use/index.html", pageType: "page" },
    { file: "dist/apps/loopsize/privacy-policy/index.html", pageType: "page" },
    { file: "dist/apps/duotake/terms-of-use/index.html", pageType: "page" },
    { file: "dist/apps/duotake/privacy-policy/index.html", pageType: "page" },
];
const forbiddenPageTypes = [
    "app_legal",
    "legal",
];

const walk = (dir, matcher, files = []) => {
    for (const entry of readdirSync(dir)) {
        const path = join(dir, entry);

        if (statSync(path).isDirectory()) {
            walk(path, matcher, files);
        } else if (matcher(path)) {
            files.push(path);
        }
    }

    return files;
};

const htmlFiles = walk(distDir, (path) => path.endsWith(".html"));
const searchableFiles = walk(distDir, (path) => path.endsWith(".js") || path.endsWith(".html"));

const directTracker = htmlFiles.filter((file) => {
    const html = readFileSync(file, "utf8");
    return /<script[^>]+src=["']https:\/\/cdn\.himetrica\.com\/tracker\.js["']/.test(html);
});

if (directTracker.length > 0) {
    console.error("Found Himetrica tracker loaded before consent in:");
    directTracker.forEach((file) => console.error(`- ${file}`));
    process.exit(1);
}

const bundledText = searchableFiles.map((file) => readFileSync(file, "utf8")).join("\n");
const missingEvents = expectedEvents.filter((eventName) => !bundledText.includes(eventName));

if (missingEvents.length > 0) {
    console.error("Missing expected analytics event names:");
    missingEvents.forEach((eventName) => console.error(`- ${eventName}`));
    process.exit(1);
}

const forbiddenEventsFound = forbiddenEvents.filter((eventName) => bundledText.includes(eventName));

if (forbiddenEventsFound.length > 0) {
    console.error("Found forbidden analytics event names:");
    forbiddenEventsFound.forEach((eventName) => console.error(`- ${eventName}`));
    process.exit(1);
}

const missingAnalyticsTitles = expectedAnalyticsTitles.filter(({ file, title }) => {
    const html = readFileSync(file, "utf8");
    return !html.includes(`"analyticsTitle":"${title}"`);
});

if (missingAnalyticsTitles.length > 0) {
    console.error("Missing expected normalized analytics titles:");
    missingAnalyticsTitles.forEach(({ file, title }) => console.error(`- ${file}: ${title}`));
    process.exit(1);
}

const missingPageTypes = expectedPageTypes.filter(({ file, pageType }) => {
    const html = readFileSync(file, "utf8");
    return !html.includes(`"pageType":"${pageType}"`);
});

if (missingPageTypes.length > 0) {
    console.error("Missing expected analytics page types:");
    missingPageTypes.forEach(({ file, pageType }) => console.error(`- ${file}: ${pageType}`));
    process.exit(1);
}

const forbiddenPageTypesFound = forbiddenPageTypes.filter((pageType) => bundledText.includes(`"pageType":"${pageType}"`));

if (forbiddenPageTypesFound.length > 0) {
    console.error("Found forbidden analytics page types:");
    forbiddenPageTypesFound.forEach((pageType) => console.error(`- ${pageType}`));
    process.exit(1);
}

console.log(`Analytics verification passed for ${htmlFiles.length} HTML files.`);
