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
        description: "Desenvolvedor iOS/macOS e Entusiasta de IA com mais de 10 anos de experiência em Swift, SwiftUI e UIKit. Focado em UX, regras de negócio, design e arquitetura limpa, usando Codex, Claude, Agents and Skills no dia a dia.",
        summary: "Desenvolvedor iOS/macOS e Entusiasta de IA com mais de 10 anos de experiência em Swift, SwiftUI e UIKit, criando apps escaláveis com forte foco em UX, performance e arquitetura limpa. Atualmente, Codex, Claude, Agents and Skills fazem parte do meu dia a dia, permitindo um foco ainda maior nas regras de negócio, no design do produto e na arquitetura do projeto.",
        homepageSkills: ["Swift", "SwiftUI", "UIKit", "Objective-C", "SwiftData", "CoreData", "CI/CD", "React Native", "Codex", "Claude", "Agents", "Skills"],
    },
};
