export interface HomepageContent {
    lang: string;
    title: string;
    description: string;
    role: string;
    bio: string;
    skills: string[];
    resumeLink: string;
    resumeLabel: string;
    aboutTitle: string;
    projectsTitle: string;
}

export const homepageEn: HomepageContent = {
    lang: 'en',
    title: 'Adriano Souza Costa • iOS/macOS Developer - Swift • SwiftUI • SwiftData/CoreData • Objective-C',
    description: "iOS/macOS Developer with 10+ years' experience in Swift, SwiftUI, and UIKit. Focused on UX, performance, and clean architecture. Skilled in REST APIs, iCloud, and Apple technologies.",
    role: 'iOS & macOS Developer',
    bio: 'iOS/macOS Developer with 10+ years of experience in Swift, SwiftUI, and UIKit, working on the development of scalable apps with a strong focus on UX, performance, and clean architecture. Solid expertise in integrating REST APIs, iCloud, and Apple technologies. Seeking new challenges in impactful projects.',
    skills: ['Swift', 'SwiftUI', 'UIKit', 'Objective-C', 'SwiftData', 'CoreData', 'CI/CD', 'React Native'],
    resumeLink: '/resume',
    resumeLabel: 'See my resume',
    aboutTitle: 'About me',
    projectsTitle: 'Projects',
};

export const homepagePtBr: HomepageContent = {
    lang: 'pt-br',
    title: 'Adriano Souza Costa • Desenvolvedor iOS/macOS - Swift • SwiftUI • SwiftData/CoreData • Objective-C',
    description: 'Desenvolvedor iOS/macOS com mais de 10 anos de experiência em Swift, SwiftUI e UIKit. Focado em UX, performance e arquitetura limpa. Especialista em REST APIs, iCloud e tecnologias Apple.',
    role: 'Desenvolvedor iOS & macOS',
    bio: 'Desenvolvedor iOS/macOS com mais de 10 anos de experiência em Swift, SwiftUI e UIKit, trabalhando no desenvolvimento de apps escaláveis com forte foco em UX, performance e arquitetura limpa. Sólida expertise em integração de REST APIs, iCloud e tecnologias Apple. Em busca de novos desafios em projetos de impacto.',
    skills: ['Swift', 'SwiftUI', 'UIKit', 'Objective-C', 'SwiftData', 'CoreData', 'CI/CD', 'React Native'],
    resumeLink: '/resume/pt-br',
    resumeLabel: 'Ver meu currículo',
    aboutTitle: 'Sobre mim',
    projectsTitle: 'Projetos',
};
