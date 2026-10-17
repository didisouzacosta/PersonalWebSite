import type { AppPageContent } from "../appTypes";
import { duoTakeSiteUrl, localizedAlternates, type SeoLanguage } from "../seo";
import type { SiteNavigationItem } from "../siteChrome";

// Single source for the DuoTake pages. It is rendered by the portfolio build
// (/apps/duotake/) and by the duotake.app build (sites/duotake), so editing it
// updates both sites.

export type DuoTakeSite = "portfolio" | "standalone";

export interface DuoTakeRoutes {
    home: string;
    termsOfUse: string;
    privacyPolicy: string;
}

export const duoTakeRoutes: Record<DuoTakeSite, Record<SeoLanguage, DuoTakeRoutes>> = {
    portfolio: {
        en: {
            home: "/apps/duotake/",
            termsOfUse: "/apps/duotake/terms-of-use/",
            privacyPolicy: "/apps/duotake/privacy-policy/",
        },
        "pt-br": {
            home: "/pt-br/apps/duotake/",
            termsOfUse: "/pt-br/apps/duotake/terms-of-use/",
            privacyPolicy: "/pt-br/apps/duotake/privacy-policy/",
        },
    },
    standalone: {
        en: {
            home: "/",
            termsOfUse: "/terms-of-use/",
            privacyPolicy: "/privacy-policy/",
        },
        "pt-br": {
            home: "/pt-br/",
            termsOfUse: "/pt-br/terms-of-use/",
            privacyPolicy: "/pt-br/privacy-policy/",
        },
    },
};

// Header and footer used on duotake.app: only the app home, no portfolio links.
export function duoTakeSiteChrome(lang: SeoLanguage): { navigationItems: SiteNavigationItem[]; showSocialLinks: boolean } {
    const home = duoTakeRoutes.standalone[lang].home;

    return {
        navigationItems: [{ label: "Home", href: home, match: home }],
        showSocialLinks: false,
    };
}

export const duoTakeFavicon = "apps/duotake/favicon.png";
export const duoTakeAlternates = localizedAlternates(`${duoTakeSiteUrl}/`, `${duoTakeSiteUrl}/pt-br/`);

export const duoTakeContent: Record<SeoLanguage, AppPageContent> = {
    en: {
        title: "Dual Camera: DuoTake",
        appId: "id6761627384",
        appStoreUrl: "https://apps.apple.com/us/app/dual-camera-duotake/id6761627384",
        appName: "DuoTake",
        pageTitle: "Dual Camera: DuoTake",
        description: "Reaction & Teleprompter",
        appIcon: "duotake/app-icon.png",
        socialImage: "duotake/duotake-share-en.jpg?v=2",
        socialImageAlt: "DuoTake app icon with reaction dual cam app summary.",
        metas: [{ name: "apple-itunes-app", content: "app-id=6761627384" }],
        primaryKeyword: "reaction dual cam app",
        secondaryKeywords: [
            "reaction video app",
            "auto captions",
            "remove silences",
            "front and back camera",
            "teleprompter app",
            "scripted video recording",
            "content creator app",
            "TikTok Reels Shorts",
        ],
        screenshots: [
            {
                url: {
                    en: "duotake/screenshots/en/frame-1.jpg",
                    ptBr: "duotake/screenshots/ptBR/frame-1.jpg",
                },
                alt: "DuoTake dual-camera capture of a barista serving a latte in a café with the creator's smiling face in picture-in-picture.",
                caption: "Record your day and yourself together in a single dual-camera take.",
            },
            {
                url: {
                    en: "duotake/screenshots/en/frame-2.jpg",
                    ptBr: "duotake/screenshots/ptBR/frame-2.jpg",
                },
                alt: "DuoTake react of a creator tasting a hot dog at a street cart, with the vendor in the background.",
                caption: "React to your day without editing, with your reaction and the moment in the same take.",
            },
            {
                url: {
                    en: "duotake/screenshots/en/frame-3.jpg",
                    ptBr: "duotake/screenshots/ptBR/frame-3.jpg",
                },
                alt: "DuoTake review layout with a video of friends cycling in a park on top and a creator commenting below, plus video, image and link import buttons.",
                caption: "Comment on your own videos, photos or web pages while you record.",
            },
            {
                url: {
                    en: "duotake/screenshots/en/frame-4.jpg",
                    ptBr: "duotake/screenshots/ptBR/frame-4.jpg",
                },
                alt: "DuoTake Teleprompter recording screen with a script overlay in front of a creator talking on a balcony.",
                caption: "Keep your script on screen with the premium Teleprompter while recording.",
            },
            {
                url: {
                    en: "duotake/screenshots/en/frame-5.jpg",
                    ptBr: "duotake/screenshots/ptBR/frame-5.jpg",
                },
                alt: "DuoTake Remove silence screen with the cuts marked in red on the timeline and the pause duration setting.",
                caption: "Remove silences automatically and preview every cut before applying.",
            },
            {
                url: {
                    en: "duotake/screenshots/en/frame-6.jpg",
                    ptBr: "duotake/screenshots/ptBR/frame-6.jpg",
                },
                alt: "DuoTake caption editor with a highlighted word, caption style options, highlight colors, position and size controls.",
                caption: "Add auto captions in one tap and pick the style, highlight color, position and size.",
            },
        ],
        facts: [
            { label: "Platform", value: "iPhone" },
            { label: "Version", value: "1.5.2" },
            { label: "Best for", value: "Creators, reviews, reacts" },
            { label: "Requires", value: "iOS 26.6 or later" },
        ],
        features: [
            {
                title: "Photos and videos with two views",
                description: "Capture the scene and your reaction together using both iPhone cameras.",
            },
            {
                title: "Auto captions on your iPhone",
                description: "Transcribe gallery videos on device, without uploading your audio. Choose position and size, and tap any word to fix it. Classic is free; Premium unlocks Highlighted word, Box and Single word.",
            },
            {
                title: "Remove silences",
                description: "Premium finds the pauses without speech, marks the cuts in red on the timeline and keeps your original so you can undo it later.",
            },
            {
                title: "React to imported content with Pro",
                description: "Replace the rear view with an image, video or HTTPS web page. Fill or fit it, trim, loop and balance its volume, then pause, skip or scrub while you record.",
            },
            {
                title: "Four layout styles",
                description: "Compose your take with PiP, Cover, vertical or horizontal split screen, or Cutout.",
            },
            {
                title: "Social media safe margin",
                description: "Switch it on in Settings and PiP, Cover and captions stay in the area social apps keep visible, clear of the crop and the buttons. Nothing cropped when you post.",
            },
            {
                title: "Premium Teleprompter",
                description: "Write or paste a script and keep it visible during video capture.",
            },
            {
                title: "Local gallery",
                description: "Review your captures on your device, export to Photos or choose a destination in the system share sheet.",
            },
            {
                title: "Free and Pro",
                description: "Record up to 15 seconds and caption in the Classic style for free. Pro adds longer recordings, every caption style, Remove silences, automatic saving to Photos and sharing without the temporary watermark.",
            },
        ],
        useCases: [
            {
                title: "Record everything. Including your reaction.",
                description: "DuoTake records with the front and rear cameras at once, showing what is happening and how you react in a single video.",
            },
            {
                title: "Stay on script",
                description: "Use the premium Teleprompter for presentations, reviews, tutorials, vlogs, and scripted reactions without looking away from the camera.",
            },
            {
                title: "Ready to post",
                description: "Add auto captions and cut the silences from your gallery videos so they are ready for TikTok, Reels and Shorts without another editing app.",
            },
        ],
        faq: [
            {
                question: "What is DuoTake?",
                answer: "DuoTake is a dual-camera video app for recording with the front and rear cameras at the same time. It helps you capture the moment, your voice, your script, and your reaction in one composed video.",
            },
            {
                question: "Who is DuoTake for?",
                answer: "DuoTake is made for creators, product reviews, reactions, commentary, tutorials, vlogs, events, travel videos, and anyone who wants to show the moment and their reaction at the same time.",
            },
            {
                question: "How do auto captions work?",
                answer: "Open a video from the gallery, choose the spoken language and tap <em>Generate captions</em>. DuoTake transcribes the speech on your iPhone, without uploading your audio, and works offline once the language's speech model is downloaded. You can place captions at the top, middle or bottom, choose the size, fix any word and show or hide them at any time.",
            },
            {
                question: "Can DuoTake remove the silences from my videos?",
                answer: "Yes. With Premium, Remove silences finds the pauses without speech in a gallery video, marks the cuts in red so you can preview them and lets you choose how much breathing room to keep. Your original is kept, so you can undo the cut later.",
            },
            {
                question: "Can I react to images, videos or web pages?",
                answer: "Yes. Pro lets you import an image, video or HTTPS web page to use in place of the rear-camera view, with framing, trim, loop and volume controls. Only use content you have permission to record and share.",
            },
            {
                question: "Does DuoTake support background removal?",
                answer: "Yes. DuoTake includes Cutout background removal to help keep your reaction clean, focused, and easier to place over the moment you are recording.",
            },
            {
                question: "Does DuoTake include a Teleprompter?",
                answer: "Yes. Premium users can use the Teleprompter to write or paste a script, follow the text during capture, and record presentations, reviews, tutorials, vlogs, and reactions more naturally.",
            },
            {
                question: "Does DuoTake work offline?",
                answer: "Core camera capture, local media processing, Remove silences and auto captions work on your device. Downloading a language's speech model for the first time, loading a web page, purchases and purchase restoration need an internet connection. Saving to Photos requires permission.",
            },
            {
                question: "How do I restore my purchase?",
                answer: "If you already unlocked DuoTake premium features, tap <em>Restore Purchases</em> and the app will ask Apple to verify your previous purchase using the same Apple ID — with no extra charge.",
            },
        ],
        favicon: duoTakeFavicon,
        lang: "en",
        canonicalUrl: `${duoTakeSiteUrl}/`,
        alternateLocales: duoTakeAlternates,
        operatingSystem: "iOS 26.6 or later",
        applicationCategory: "MultimediaApplication",
    },
    "pt-br": {
        title: "Câmera Dupla: DuoTake",
        appId: "id6761627384",
        appStoreUrl: "https://apps.apple.com/br/app/dual-camera-duotake/id6761627384",
        appName: "DuoTake",
        pageTitle: "Câmera Dupla: DuoTake",
        description: "Reação e Teleprompter",
        appIcon: "duotake/app-icon.png",
        socialImage: "duotake/duotake-share-pt-br.jpg?v=2",
        socialImageAlt: "Ícone do app DuoTake com resumo do app de câmera de reação.",
        metas: [{ name: "apple-itunes-app", content: "app-id=6761627384" }],
        primaryKeyword: "câmera de reação",
        secondaryKeywords: [
            "react video",
            "legenda automática",
            "remover silêncios",
            "frontal traseira",
            "teleprompter",
            "gravação com roteiro",
            "criador conteudo",
            "TikTok Reels Shorts",
        ],
        screenshots: [
            {
                url: {
                    en: "duotake/screenshots/en/frame-1.jpg",
                    ptBr: "duotake/screenshots/ptBR/frame-1.jpg",
                },
                alt: "Captura com câmera dupla do DuoTake de uma barista servindo um café em uma cafeteria com o rosto sorridente da criadora em picture-in-picture.",
                caption: "Grave o seu dia e você no mesmo vídeo, em uma única gravação com câmera dupla.",
            },
            {
                url: {
                    en: "duotake/screenshots/en/frame-2.jpg",
                    ptBr: "duotake/screenshots/ptBR/frame-2.jpg",
                },
                alt: "React no DuoTake de uma criadora provando um pastel na feira, com o feirante ao fundo.",
                caption: "Crie reacts do seu dia sem precisar editar, com sua reação e o momento na mesma gravação.",
            },
            {
                url: {
                    en: "duotake/screenshots/en/frame-3.jpg",
                    ptBr: "duotake/screenshots/ptBR/frame-3.jpg",
                },
                alt: "Layout de review do DuoTake com um vídeo de amigos pedalando no parque em cima e um criador comentando embaixo, com botões para importar vídeo, imagem e link.",
                caption: "Comente seus vídeos, fotos ou sites enquanto grava.",
            },
            {
                url: {
                    en: "duotake/screenshots/en/frame-4.jpg",
                    ptBr: "duotake/screenshots/ptBR/frame-4.jpg",
                },
                alt: "Tela do Teleprompter do DuoTake com roteiro sobreposto à imagem de um criador falando em uma varanda durante a gravação.",
                caption: "Seu roteiro na tela com o Teleprompter premium, sua fala no ponto.",
            },
            {
                url: {
                    en: "duotake/screenshots/en/frame-5.jpg",
                    ptBr: "duotake/screenshots/ptBR/frame-5.jpg",
                },
                alt: "Tela Remover silêncio do DuoTake com os cortes marcados em vermelho na linha do tempo e o ajuste de duração da pausa.",
                caption: "Remova o silêncio automaticamente e confira cada corte antes de aplicar.",
            },
            {
                url: {
                    en: "duotake/screenshots/en/frame-6.jpg",
                    ptBr: "duotake/screenshots/ptBR/frame-6.jpg",
                },
                alt: "Editor de legendas do DuoTake com palavra destacada, opções de estilo, cores de destaque e controles de posição e tamanho.",
                caption: "Adicione legendas automáticas em um toque e escolha estilo, cor de destaque, posição e tamanho.",
            },
        ],
        facts: [
            { label: "Plataforma", value: "iPhone" },
            { label: "Versão", value: "1.5.2" },
            { label: "Ideal para", value: "Creators, reviews e reacts" },
            { label: "Requer", value: "iOS 26.6 ou posterior" },
        ],
        features: [
            {
                title: "Fotos e vídeos com duas visões",
                description: "Capture a cena e sua reação juntas usando as duas câmeras do iPhone.",
            },
            {
                title: "Legenda automática no iPhone",
                description: "Transcreva vídeos da galeria no próprio aparelho, sem enviar o áudio. Escolha posição e tamanho e toque em qualquer palavra para corrigi-la. O Clássico é grátis; o Premium libera Palavra em destaque, Caixa e Palavra única.",
            },
            {
                title: "Remover silêncios",
                description: "O Premium encontra as pausas sem fala, marca os cortes em vermelho na linha do tempo e mantém o original para você desfazer depois.",
            },
            {
                title: "Reaja a conteúdo importado com Pro",
                description: "Substitua a visão traseira por uma imagem, vídeo ou página HTTPS. Preencha ou ajuste, escolha o trecho, repita e equilibre o volume, e pause, avance ou arraste enquanto grava.",
            },
            {
                title: "Quatro estilos de layout",
                description: "Componha sua captura com PiP, Cover, tela dividida na vertical ou horizontal ou Cutout.",
            },
            {
                title: "Margem para redes sociais",
                description: "Ligue a opção em Ajustes e o PiP, o Cover e as legendas ficam na área que as redes sociais mantêm visível, longe do corte e dos botões. Nada cortado ao postar.",
            },
            {
                title: "Teleprompter premium",
                description: "Escreva ou cole um roteiro e mantenha o texto visível durante a gravação de vídeo.",
            },
            {
                title: "Galeria local",
                description: "Revise as capturas no dispositivo, salve no Fotos ou escolha um destino no compartilhamento do sistema.",
            },
            {
                title: "Grátis e Pro",
                description: "Grave até 15 segundos e legende no estilo Clássico de graça. O Pro oferece gravações mais longas, todos os estilos de legenda, Remover silêncios, salvamento automático no Fotos e compartilhamento sem a marca d’água temporária.",
            },
        ],
        useCases: [
            {
                title: "Registre tudo. Inclusive sua reação.",
                description: "Com o DuoTake, você grava usando a câmera frontal e traseira ao mesmo tempo, mostrando o que está acontecendo e como você reage em um único vídeo.",
            },
            {
                title: "Grave com roteiro",
                description: "Use o Teleprompter premium para apresentações, reviews, tutoriais, vlogs e reações com roteiro sem desviar o olhar da câmera.",
            },
            {
                title: "Pronto para postar",
                description: "Adicione legenda automática e corte os silêncios dos vídeos da galeria para deixá-los prontos para TikTok, Reels e Shorts sem outro app de edição.",
            },
        ],
        faq: [
            {
                question: "O que é DuoTake?",
                answer: "DuoTake é um app de câmera dupla para gravar com a câmera frontal e traseira ao mesmo tempo. Ele ajuda você a capturar o momento, sua voz, seu roteiro e sua reação em um vídeo composto.",
            },
            {
                question: "Para quem o DuoTake foi feito?",
                answer: "O DuoTake foi feito para creators, reviews de produtos, reacts, comentários, tutoriais, vlogs, eventos, viagens e qualquer pessoa que quer mostrar o momento e sua reação ao mesmo tempo.",
            },
            {
                question: "Como funciona a legenda automática?",
                answer: "Abra um vídeo da galeria, escolha o idioma falado e toque em <em>Gerar legenda</em>. O DuoTake transcreve a fala no seu iPhone, sem enviar o áudio, e funciona offline depois que o modelo de voz do idioma é baixado. Você pode posicionar a legenda no topo, no meio ou na base, escolher o tamanho, corrigir qualquer palavra e mostrar ou ocultar quando quiser.",
            },
            {
                question: "O DuoTake remove os silêncios dos meus vídeos?",
                answer: "Sim. Com o Premium, o Remover silêncios encontra as pausas sem fala em um vídeo da galeria, marca os cortes em vermelho para você conferir e deixa você escolher quanto respiro manter. O original é mantido, então dá para desfazer o corte depois.",
            },
            {
                question: "Posso reagir a imagens, vídeos ou páginas da web?",
                answer: "Sim. O Pro permite importar uma imagem, vídeo ou página HTTPS no lugar da visão da câmera traseira, com controles de enquadramento, trecho, repetição e volume. Use apenas conteúdo que você tenha permissão para gravar e compartilhar.",
            },
            {
                question: "O DuoTake tem remoção de fundo?",
                answer: "Sim. O DuoTake inclui remoção de fundo com Cutout para deixar sua reação mais limpa, focada e fácil de combinar com o momento que você está gravando.",
            },
            {
                question: "O DuoTake tem Teleprompter?",
                answer: "Sim. Usuários premium podem usar o Teleprompter para escrever ou colar um roteiro, acompanhar o texto durante a captura e gravar apresentações, reviews, tutoriais, vlogs e reações com mais naturalidade.",
            },
            {
                question: "O DuoTake funciona offline?",
                answer: "A captura pelas câmeras, o processamento local, o Remover silêncios e a legenda automática funcionam no dispositivo. Baixar o modelo de voz de um idioma pela primeira vez, carregar uma página da web, comprar e restaurar compras exigem internet. Salvar no Fotos requer permissão.",
            },
            {
                question: "Como restaurar minha compra?",
                answer: "Se você já desbloqueou os recursos premium do DuoTake, toque em <em>Restaurar Compras</em> e o app pedirá à Apple para validar sua compra anterior com o mesmo Apple ID — sem custo extra.",
            },
        ],
        favicon: duoTakeFavicon,
        lang: "pt-br",
        canonicalUrl: `${duoTakeSiteUrl}/pt-br/`,
        alternateLocales: duoTakeAlternates,
        operatingSystem: "iOS 26.6 or later",
        applicationCategory: "MultimediaApplication",
    },
};
