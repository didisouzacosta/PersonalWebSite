import type { ProjectLanguage } from "./projects";

export interface ProfileContent {
    role: string;
    description: string;
    summary: string;
    homepageSkills: string[];
}

export const profileContent: Record<ProjectLanguage, ProfileContent> = {
    en: {
        role: "iOS & macOS Developer • AI Enthusiast",
        description: "iOS/macOS Developer and AI Enthusiast with 10+ years' experience in Swift, SwiftUI, and UIKit. Focused on UX, business rules, design, and clean architecture, using Codex, Claude, Agents and Skills in daily work.",
        summary: "iOS/macOS Developer and AI Enthusiast with 10+ years of experience in Swift, SwiftUI, and UIKit, building scalable apps with a strong focus on UX, performance, and clean architecture. Codex, Claude, Agents and Skills are now part of my daily workflow, allowing me to focus more deeply on business rules, product design, and project architecture.",
        homepageSkills: ["Swift", "SwiftUI", "UIKit", "Objective-C", "SwiftData", "CoreData", "CI/CD", "React Native", "Codex", "Claude", "Agents", "Skills"],
    },
    "pt-br": {
        role: "Desenvolvedor iOS & macOS • Entusiasta de IA",
        description: "Desenvolvedor iOS/macOS com mais de 10 anos de experiência criando apps nativos para o ecossistema Apple. Foco em Swift, SwiftUI, UIKit, UX, performance, escalabilidade e arquitetura limpa.",
        summary: `Desenvolvedor iOS/macOS com mais de 10 anos de experiência criando apps nativos para o ecossistema Apple. Trabalho com Swift, SwiftUI e UIKit, sempre com foco em UX, performance, escalabilidade e arquitetura limpa.

Uso IA de forma ativa em mais de 90% dos meus projetos, combinando Codex, GPT-5.5, Claude, Skills e agentes para acelerar a execução e manter o foco no que mais importa: produto, regras de negócio e qualidade técnica.`,
        homepageSkills: ["Swift", "SwiftUI", "UIKit", "Objective-C", "SwiftData", "CoreData", "CI/CD", "React Native", "Codex", "Claude", "Agents", "Skills"],
    },
};
