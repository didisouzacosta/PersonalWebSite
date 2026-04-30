import type { ProjectLanguage } from "./projects";
import { profileContent } from "./profile";

export interface HomepageContent {
    lang: ProjectLanguage;
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
    description: profileContent.en.description,
    role: profileContent.en.role,
    bio: profileContent.en.summary,
    skills: profileContent.en.homepageSkills,
    resumeLink: '/resume',
    resumeLabel: 'Resume',
    aboutTitle: 'About me',
    projectsTitle: 'Projects',
};

export const homepagePtBr: HomepageContent = {
    lang: 'pt-br',
    title: 'Adriano Souza Costa • Desenvolvedor iOS/macOS - Swift • SwiftUI • SwiftData/CoreData • Objective-C',
    description: profileContent["pt-br"].description,
    role: profileContent["pt-br"].role,
    bio: profileContent["pt-br"].summary,
    skills: profileContent["pt-br"].homepageSkills,
    resumeLink: '/resume/pt-br',
    resumeLabel: 'Currículo',
    aboutTitle: 'Sobre mim',
    projectsTitle: 'Projetos',
};
