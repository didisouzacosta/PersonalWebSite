import { appAssetBaseUrl } from "./seo";

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

const appIconUrl = (slug: string) => `${appAssetBaseUrl}${slug}/app-icon.png`;

export const portfolioProjects: PortfolioProject[] = [
    {
        name: "DuoTake",
        url: "https://duotake.app/",
        resumeUrl: "https://duotake.app/",
        imageUrl: appIconUrl("duotake"),
        tags: ["iOS App", "Free", "Camera"],
        isEnabled: true,
        descriptions: {
            en: {
                card: "Reaction dual cam",
                resume: "DuoTake records with the front and rear cameras at the same time, combining the moment, your reaction, creator layouts, Cutout, and a premium Teleprompter in one video.",
            },
            "pt-br": {
                card: "Câmera de reação",
                resume: "O DuoTake grava com a câmera frontal e traseira ao mesmo tempo, combinando o momento, sua reação, layouts de creator, Cutout e Teleprompter premium em um vídeo.",
            },
        },
    },
    {
        name: "KuboRush",
        url: "/apps/kuborush/",
        resumeUrl: "https://apps.apple.com/app/id6757385646",
        imageUrl: appIconUrl("kuborush"),
        tags: ["iOS App", "Free"],
        isEnabled: true,
        descriptions: {
            en: {
                card: "Quick relaxing block puzzle",
                resume: "KuboRush is a smart and relaxing block puzzle game for quick 2-minute breaks. Place pieces, use Hint, Shuffle, Rotate, and Undo, then compete in Hall of Fame and Weekly Rush.",
            },
            "pt-br": {
                card: "Puzzle de blocos relaxante",
                resume: "KuboRush é um jogo inteligente e relaxante de quebra-cabeça de blocos para pausas rápidas de 2 minutos. Encaixe peças, use Dica, Embaralhar, Girar e Desfazer, e compita no Hall da Fama e no Rush Semanal.",
            },
        },
    },
    {
        name: "LoopSize",
        url: "/apps/loopsize/",
        resumeUrl: "https://apps.apple.com/us/app/loopsize-ring-size-converter/id6749704116?itscg=30200&itsct=apps_box_badge&mttnsubad=6450398697",
        imageUrl: appIconUrl("loopsize"),
        tags: ["iOS App", "Free"],
        isEnabled: true,
        descriptions: {
            en: {
                card: "Ring measurement tool",
                resume: "LoopSize measures, converts, saves, and shares ring sizes with BR, US, UK, EU/ISO, JP, CN, and IN standards, precise dimensions, iCloud sync, history, and branded PDF export.",
            },
            "pt-br": {
                card: "Tamanho e medidor de anéis",
                resume: "LoopSize mede, converte, salva e compartilha tamanhos de anéis com padrões BR, US, UK, EU/ISO, JP, CN e IN, dimensões precisas, iCloud, histórico e PDF com marca.",
            },
        },
    },
    {
        name: "CleanerXcode",
        url: "https://github.com/didisouzacosta/CleanerXcode",
        imageUrl: appIconUrl("cleanerxcode"),
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
        imageUrl: appIconUrl("formidable"),
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
        imageUrl: appIconUrl("videoeditorkit"),
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
    {
        name: "WhatsNewKit",
        url: "https://github.com/didisouzacosta/WhatsNewKit",
        imageUrl: appIconUrl("whatsnewkit"),
        tags: ["Framework", "SwiftUI"],
        target: "_blank",
        isEnabled: true,
        descriptions: {
            en: {
                card: "What's new feature sheets",
                resume: "WhatsNewKit is a SwiftUI framework for presenting what's new screens and feature announcements in Apple apps.",
            },
            "pt-br": {
                card: "Telas de novidades no app",
                resume: "WhatsNewKit é um framework SwiftUI para apresentar telas de novidades e anúncios de recursos em apps Apple.",
            },
        },
    },
    {
        name: "GlowEffectKit",
        url: "https://github.com/didisouzacosta/GlowEffectKit",
        imageUrl: appIconUrl("gloweffectkit"),
        tags: ["SDK", "SwiftUI"],
        target: "_blank",
        isEnabled: true,
        descriptions: {
            en: {
                card: "SwiftUI glow effects SDK",
                resume: "GlowEffectKit is a SwiftUI SDK for adding polished glow-style visual effects and interactions to Apple app interfaces.",
            },
            "pt-br": {
                card: "SDK de efeitos em SwiftUI",
                resume: "GlowEffectKit é um SDK SwiftUI para adicionar efeitos visuais e interações de brilho refinadas a interfaces de apps Apple.",
            },
        },
    },
    {
        name: "GiggleFace",
        url: "/apps/giggleface/",
        resumeUrl: "https://adrianosouzacosta.com.br/apps/giggleface/",
        imageUrl: appIconUrl("giggleface"),
        tags: ["iOS App", "macOS App"],
        isEnabled: true,
        descriptions: {
            en: {
                card: "Real-time face effects",
                resume: "GiggleFace turns any image into a custom face effect you can use live on iPhone and Mac, records video at up to 60 fps with audio, lets you share masks, and works as a virtual camera in compatible macOS apps — all with on-device processing.",
            },
            "pt-br": {
                card: "Efeitos faciais em tempo real",
                resume: "O GiggleFace transforma qualquer imagem em um efeito facial personalizado para usar ao vivo no iPhone e no Mac, grava vídeos em até 60 fps com áudio, permite compartilhar máscaras e funciona como câmera virtual em apps compatíveis do macOS — tudo com processamento local.",
            },
        },
    },
    {
        name: "PotionPals",
        url: "/apps/potionpals/",
        resumeUrl: "https://adrianosouzacosta.com.br/apps/potionpals/",
        imageUrl: appIconUrl("potionpals"),
        tags: ["iOS App", "Game"],
        isEnabled: true,
        descriptions: {
            en: {
                card: "Water sort potion puzzle",
                resume: "PotionPals: Water Sort turns the classic color sorting puzzle into a cozy jelly potion shop, with 300 levels in 13 chapters, Story, Casual, Endurance and Challenger modes, 12 friends to rescue, new mechanics every chapter, iCloud backup and Game Center leaderboards.",
            },
            "pt-br": {
                card: "Puzzle de separar poções",
                resume: "PotionPals: Water Sort transforma o clássico puzzle de separar cores numa lojinha de poções de gelatina, com 300 fases em 13 capítulos, os modos História, Casual, Endurance e Challenger, 12 amigos para resgatar, mecânicas novas a cada capítulo, backup no iCloud e placares do Game Center.",
            },
        },
    },
    {
        name: "TelePro",
        url: "/apps/telepro/",
        resumeUrl: "https://adrianosouzacosta.com.br/apps/telepro/",
        imageUrl: appIconUrl("telepro"),
        tags: ["iOS App", "Video"],
        isEnabled: true,
        descriptions: {
            en: {
                card: "Teleprompter camera",
                resume: "TelePro turns the iPhone into a teleprompter camera: the script scrolls next to the lens while you record, then it removes silences and adds auto captions on the device, fully offline and without an account.",
            },
            "pt-br": {
                card: "Teleprompter com câmera",
                resume: "O TelePro transforma o iPhone num teleprompter com câmera: o roteiro rola ao lado da lente enquanto você grava e, depois, o app remove os silêncios e cria legendas automáticas no próprio aparelho, totalmente offline e sem conta.",
            },
        },
    },
    {
        name: "Pillo",
        url: "/apps/pillo/",
        resumeUrl: "https://adrianosouzacosta.com.br/apps/pillo/",
        imageUrl: appIconUrl("pillo"),
        tags: ["iOS App", "Health"],
        isEnabled: true,
        descriptions: {
            en: {
                card: "Medicine expiry reminders",
                resume: "Pillo keeps track of the expiry dates of the medicines at home: it reads the box with the camera on the device, reminds you before each one expires and summarizes the official leaflet from ANVISA in plain words, without an account.",
            },
            "pt-br": {
                card: "Validade e lembrete de remédios",
                resume: "O Pillo organiza a validade dos remédios da casa: lê a caixa com a câmera no próprio aparelho, avisa antes de cada remédio vencer e resume a bula oficial da ANVISA em palavras simples, sem conta.",
            },
        },
    },
    {
        name: "HorseScore",
        url: "/apps/horsescore/",
        resumeUrl: "https://adrianosouzacosta.com.br/apps/horsescore/",
        imageUrl: "/apps/horsescore/app-icon.png",
        tags: ["iOS App", "AI"],
        isEnabled: false,
        descriptions: {
            en: {
                card: "Body condition screening for horses",
                resume: "HorseScore turns four guided photos into a visual estimate of the Henneke body condition score and cresty neck score of horses and ponies, with AI reading the photos and fixed, tested rules deciding the risk classification.",
            },
            "pt-br": {
                card: "Triagem da condição corporal de equinos",
                resume: "HorseScore transforma quatro fotos guiadas numa estimativa visual do escore de condição corporal Henneke e da crista do pescoço de cavalos e pôneis, com a IA lendo as fotos e regras fixas e testadas decidindo a classificação de risco.",
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
