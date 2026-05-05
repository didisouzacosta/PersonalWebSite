import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const distDir = "dist";
const maxImageBytes = 300 * 1024;

const pages = [
    {
        html: "apps/kuborush/index.html",
        image: "/social/apps/kuborush-share-en.jpg",
        title: "KuboRush | Block Puzzle Game for iOS",
    },
    {
        html: "pt-br/apps/kuborush/index.html",
        image: "/social/apps/kuborush-share-pt-br.jpg",
        title: "KuboRush | Jogo de Quebra-Cabeça de Blocos para iOS",
    },
    {
        html: "apps/loopsize/index.html",
        image: "/social/apps/loopsize-share-en.jpg",
        title: "LoopSize | Ring Size Converter for iPhone",
    },
    {
        html: "pt-br/apps/loopsize/index.html",
        image: "/social/apps/loopsize-share-pt-br.jpg",
        title: "LoopSize | Conversor de Tamanho de Anéis para iPhone",
    },
    {
        html: "apps/duotake/index.html",
        image: "/social/apps/duotake-share-en.jpg",
        title: "DuoTake: Dual Camera",
    },
    {
        html: "pt-br/apps/duotake/index.html",
        image: "/social/apps/duotake-share-pt-br.jpg",
        title: "DuoTake: Câmera dupla",
    },
];

const requiredFragments = (page) => [
    `<meta property="og:title" content="${page.title}">`,
    `<meta property="og:image" content="https://adrianosouzacosta.com.br${page.image}">`,
    `<meta property="og:image:secure_url" content="https://adrianosouzacosta.com.br${page.image}">`,
    `<meta property="og:image:type" content="image/jpeg">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt"`,
    `<meta property="og:site_name" content="Adriano Souza Costa">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:image" content="https://adrianosouzacosta.com.br${page.image}">`,
    `<meta name="twitter:image:alt"`,
];

const failures = [];

for (const page of pages) {
    const htmlPath = join(distDir, page.html);
    if (!existsSync(htmlPath)) {
        failures.push(`Missing built page: ${htmlPath}`);
        continue;
    }

    const html = readFileSync(htmlPath, "utf8");
    for (const fragment of requiredFragments(page)) {
        if (!html.includes(fragment)) {
            failures.push(`Missing fragment in ${htmlPath}: ${fragment}`);
        }
    }

    const imagePath = join(distDir, page.image);
    if (!existsSync(imagePath)) {
        failures.push(`Missing social image: ${imagePath}`);
        continue;
    }

    const size = statSync(imagePath).size;
    if (size > maxImageBytes) {
        failures.push(`Social image is larger than 300 KB: ${imagePath} (${size} bytes)`);
    }
}

if (failures.length > 0) {
    console.error(failures.join("\n"));
    process.exit(1);
}

console.log(`Verified ${pages.length} app social previews.`);
