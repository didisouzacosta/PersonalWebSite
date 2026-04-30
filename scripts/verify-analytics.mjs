import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const distDir = "dist";
const expectedEvents = [
    "page_accessed",
    "navigation_clicked",
    "theme_changed",
    "language_changed",
    "resume_download_clicked",
    "resume_contact_clicked",
    "certificate_clicked",
    "project_opened",
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

const missingTracker = htmlFiles.filter((file) => {
    const html = readFileSync(file, "utf8");
    return !html.includes("https://cdn.himetrica.com/tracker.js");
});

if (missingTracker.length > 0) {
    console.error("Missing Himetrica tracker in:");
    missingTracker.forEach((file) => console.error(`- ${file}`));
    process.exit(1);
}

const bundledText = searchableFiles.map((file) => readFileSync(file, "utf8")).join("\n");
const missingEvents = expectedEvents.filter((eventName) => !bundledText.includes(eventName));

if (missingEvents.length > 0) {
    console.error("Missing expected analytics event names:");
    missingEvents.forEach((eventName) => console.error(`- ${eventName}`));
    process.exit(1);
}

console.log(`Analytics verification passed for ${htmlFiles.length} HTML files.`);
