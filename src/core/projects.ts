export type ProjectLanguage = "en" | "pt-br";

export interface PortfolioProject {
    name: string;
    url: string;
    resumeUrl?: string;
    imageUrl: string;
    tags: string[];
    isEnabled: boolean;
    target?: "_blank";
    descriptions: Record<ProjectLanguage, {
        card: string;
        resume: string;
    }>;
}

export interface ProjectCardViewModel {
    name: string;
    description: string;
    tags: string[];
    imageUrl: string;
    url: string;
    target?: "_blank";
}

export interface ResumeProjectViewModel {
    title: string;
    url: string;
    description: string;
}

export const portfolioProjects: PortfolioProject[] = [
    {
        name: "DuoTake",
        url: "/apps/duotake",
        resumeUrl: "https://adrianosouzacosta.com.br/apps/duotake",
        imageUrl:
            "https://pub-81dc0daed73f4a358469301b9b80f493.r2.dev/apps/duotake/app-icon.png",
        tags: ["iOS App", "Free", "Camera"],
        isEnabled: false,
        descriptions: {
            en: {
                card: "Front + back camera for reacts",
                resume: "DuoTake lets you record or take photos with the front and back cameras at the same time, with CropOut for cleaner framing that is ideal for reacts.",
            },
            "pt-br": {
                card: "Camera frontal + traseira para reacts",
                resume: "O DuoTake permite gravar e fotografar com a câmera frontal e traseira ao mesmo tempo, com CropOut para um enquadramento mais limpo e ideal para reacts.",
            },
        },
    },
    {
        name: "KuboRush",
        url: "/apps/kuborush",
        resumeUrl: "https://apps.apple.com/app/id6757385646",
        imageUrl:
            "https://pub-81dc0daed73f4a358469301b9b80f493.r2.dev/apps/kuborush/app-icon.png",
        tags: ["iOS App", "Free"],
        isEnabled: true,
        descriptions: {
            en: {
                card: "Block puzzle game",
                resume: "KuboRush is a casual block puzzle game for iOS where you fit pieces, think fast, and clear the board at your own pace. Includes competitive leaderboards and weekly challenges.",
            },
            "pt-br": {
                card: "Jogo puzzle de blocos",
                resume: "KuboRush é um jogo casual de quebra-cabeça de blocos para iOS. Encaixe peças, pense rápido e limpe o tabuleiro no seu ritmo. Inclui ranking global e desafios semanais.",
            },
        },
    },
    {
        name: "LoopSize",
        url: "/apps/loopsize",
        resumeUrl: "https://apps.apple.com/us/app/loopsize-ring-size-converter/id6749704116?itscg=30200&itsct=apps_box_badge&mttnsubad=6450398697",
        imageUrl:
            "https://pub-81dc0daed73f4a358469301b9b80f493.r2.dev/apps/loopsize/app-icon.png",
        tags: ["iOS App", "Free"],
        isEnabled: true,
        descriptions: {
            en: {
                card: "Ring size converter",
                resume: "LoopSize makes it easy to measure and convert ring sizes in BR, US, UK, EU/ISO, JP, CN & IN. Save, share, and export precise measurements in PDF.",
            },
            "pt-br": {
                card: "Conversor de tamanho de anéis",
                resume: "O LoopSize facilita a medição e a conversão de tamanhos de anéis nos seguintes países: Brasil, EUA, Reino Unido, UE/ISO, Japão, China e Índia. Salve, compartilhe e exporte medidas precisas em PDF.",
            },
        },
    },
    {
        name: "CleanerXcode",
        url: "https://github.com/didisouzacosta/CleanerXcode",
        imageUrl:
            "https://pub-81dc0daed73f4a358469301b9b80f493.r2.dev/apps/cleanerxcode/app-icon.png",
        tags: ["macOS App", "Free"],
        target: "_blank",
        isEnabled: true,
        descriptions: {
            en: {
                card: "Xcode cache cleaner",
                resume: "CleanerXcode is a macOS tool designed to remove unnecessary Xcode files, such as Derived Data, build caches, device support files and simulator data.",
            },
            "pt-br": {
                card: "Limpador de cache do Xcode",
                resume: "CleanerXcode é uma ferramenta para macOS projetada para remover arquivos desnecessários do Xcode, como Derived Data, caches de build, arquivos de suporte de dispositivo e dados de simulador.",
            },
        },
    },
    {
        name: "Formidable",
        url: "https://github.com/didisouzacosta/Formidable",
        imageUrl:
            "https://pub-81dc0daed73f4a358469301b9b80f493.r2.dev/apps/formidable/app-icon.png",
        tags: ["Framework"],
        target: "_blank",
        isEnabled: true,
        descriptions: {
            en: {
                card: "Swift form framework",
                resume: "The Formidable protocol is designed for objects that manage forms composed of multiple FormField components. By conforming to this protocol, you can leverage built-in functionality to validate, reset, and check the validity of all form fields at once.",
            },
            "pt-br": {
                card: "Framework de formulários em Swift",
                resume: "O protocolo Formidable é projetado para objetos que gerenciam formulários compostos por múltiplos componentes FormField. Ao aderir a esse protocolo, você pode validar, resetar e verificar a validade de todos os campos de uma só vez.",
            },
        },
    },
    {
        name: "VideoEditorKit",
        url: "https://github.com/didisouzacosta/VideoEditorKit",
        imageUrl:
            "https://pub-81dc0daed73f4a358469301b9b80f493.r2.dev/apps/videoeditorkit/app-icon.png",
        tags: ["Framework", "SwiftUI"],
        target: "_blank",
        isEnabled: true,
        descriptions: {
            en: {
                card: "SwiftUI video editor",
                resume: "VideoEditorKit is a SwiftUI video editor framework for building video editing experiences in Apple apps.",
            },
            "pt-br": {
                card: "Editor de vídeo em SwiftUI",
                resume: "VideoEditorKit é um framework de editor de vídeo em SwiftUI para criar experiências de edição de vídeo em apps Apple.",
            },
        },
    },
];

function getEnabledProjects(): PortfolioProject[] {
    return portfolioProjects
        .filter((project) => project.isEnabled)
        .reverse();
}

export function hasEnabledProjects(): boolean {
    return portfolioProjects.some((project) => project.isEnabled);
}

export function getProjectCards(language: ProjectLanguage): ProjectCardViewModel[] {
    return getEnabledProjects().map((project) => ({
        name: project.name,
        description: project.descriptions[language].card,
        tags: project.tags,
        imageUrl: project.imageUrl,
        url: project.url,
        target: project.target,
    }));
}

export function getResumeProjects(language: ProjectLanguage): ResumeProjectViewModel[] {
    return getEnabledProjects().map((project) => ({
        title: project.name,
        url: project.resumeUrl ?? project.url,
        description: project.descriptions[language].resume,
    }));
}
